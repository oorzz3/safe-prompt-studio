import { getPose } from '../data/poseDefinitions'
import type { BuilderStateV3, CompatibilityChange, CompatibilityResolution, DisabledOption, FieldLock } from '../types/builderV3'

const get = (state: BuilderStateV3, path: string) => path.split('.').reduce((value: any, key) => value?.[key], state as any)
const set = (state: BuilderStateV3, path: string, value: string) => {
  const keys = path.split('.')
  let target: any = state
  for (const key of keys.slice(0, -1)) target = target[key]
  target[keys.at(-1)!] = value
}
const change = (state: BuilderStateV3, changes: CompatibilityChange[], field: string, value: string, reason: string) => {
  const previousValue = get(state, field)
  if (previousValue !== value) {
    set(state, field, value)
    changes.push({ field, previousValue, nextValue: value, reason })
  }
}

const groundPoses = ['pose-cat-cow', 'pose-down-dog', 'pose-bridge', 'pose-seated-fold']
const allByField: Record<string, string[]> = {
  'camera.subjectView': ['view-front', 'view-side', 'view-three-front', 'view-three-side', 'view-back'],
  'camera.framing': ['frame-full', 'frame-thigh', 'frame-half', 'frame-portrait'],
  'camera.height': ['cam-eye', 'cam-low', 'cam-high'],
}

export function resolveDependencies(state: BuilderStateV3): CompatibilityResolution {
  const next = structuredClone(state)
  const pose = getPose(next.pose.poseId) ?? getPose('pose-neutral')!
  const changes: CompatibilityChange[] = []
  next.pose.mode = pose.mode
  for (const [field, value] of Object.entries(pose.impliedValues)) change(next, changes, field, value, pose.explanation)
  const lockedFields: FieldLock[] = pose.lockedFields.map(field => ({ field, value: get(next, field), sourceId: pose.id, reason: pose.explanation }))
  const disabledOptions: DisabledOption[] = []
  for (const [field, allowed] of Object.entries(pose.allowedValues)) {
    if (!allowed.includes(get(next, field))) change(next, changes, field, allowed[0], pose.explanation)
    for (const option of allByField[field] ?? []) {
      if (!allowed.includes(option)) disabledOptions.push({ optionId: option, field, reason: `${pose.labelZh}僅支援相容的動作結構與鏡位。` })
    }
  }
  if (groundPoses.includes(pose.id) && next.outfit.family === 'family-office' && ['lower-pencil', 'lower-narrow', 'lower-midi'].includes(next.outfit.lower.garment)) {
    const reason = '此地面動作需要完整腿部活動，目前職場裙裝不相容。'
    change(next, changes, 'outfit.family', 'family-active', reason)
    change(next, changes, 'outfit.upper.garment', 'upper-yoga', reason)
    change(next, changes, 'outfit.lower.garment', 'lower-active', reason)
    change(next, changes, 'outfit.upper.structure', 'structure-fitted', reason)
  }
  if (pose.id === 'pose-warrior' && next.outfit.family === 'family-office') {
    disabledOptions.push({ optionId: 'lower-pencil', field: 'outfit.lower.garment', reason: '鉛筆裙會限制戰士式腿部開展；西裝褲可使用但建議保持活動餘裕。' })
  }
  if (pose.mode === 'standing') disabledOptions.push({ optionId: 'hands-ground', field: 'pose.handPosition', reason: '一般站姿不可使用地面支撐。' })
  const messages = changes.length ? [`已套用${pose.labelZh}與服裝相容設定。`] : []
  if (pose.id === 'pose-warrior' && next.outfit.family === 'family-office' && ['lower-trouser', 'lower-slim-trouser', 'lower-wide'].includes(next.outfit.lower.garment)) {
    messages.push('西裝褲可搭配戰士式，建議保留足夠活動餘裕。')
  }
  return { nextState: next, changes, lockedFields, disabledOptions, messages, requiresConfirmation: changes.length >= 3 }
}

const familyDefaults: Record<string, Record<string, string>> = {
  'family-swim': { 'outfit.upper.garment': 'upper-one-piece', 'outfit.lower.garment': '', 'outfit.outerwear': 'outer-none' },
  'family-active': { 'outfit.upper.garment': 'upper-yoga', 'outfit.lower.garment': 'lower-active', 'outfit.outerwear': 'outer-none' },
  'family-resort': { 'outfit.upper.garment': 'upper-resort', 'outfit.lower.garment': '', 'outfit.outerwear': 'outer-none' },
  'family-office': { 'outfit.upper.garment': 'upper-business-shirt', 'outfit.lower.garment': 'lower-trouser', 'outfit.upper.neckline': 'neck-standard', 'outfit.upper.opening': 'open-one', 'outfit.upper.structure': 'structure-tailored', 'outfit.upper.volumePresentation': 'volume-natural', 'outfit.upper.bustTailoring': 'bust-none', 'outfit.waist.construction': 'waist-subtle', 'outfit.material.primary': 'mat-poplin', 'outfit.outerwear': 'outer-none' },
}

export const applySelection = (state: BuilderStateV3, field: string, value: string) => {
  const next = structuredClone(state)
  const familyChanges: CompatibilityChange[] = []
  set(next, field, value)
  if (field === 'outfit.family') {
    for (const [path, defaultValue] of Object.entries(familyDefaults[value] ?? {})) change(next, familyChanges, path, defaultValue, '切換服裝家族並套用相容預設。')
  }
  const result = resolveDependencies(next)
  result.changes.unshift(...familyChanges)
  if (field === 'outfit.family' && familyChanges.length >= 3) result.requiresConfirmation = true
  if (field === 'pose.poseId' && groundPoses.includes(value)) result.requiresConfirmation = true
  if ((field === 'pose.headDirection' && value === 'head-look-back') || (field === 'camera.subjectView' && ['view-back', 'view-three-side'].includes(value) && result.nextState.pose.headDirection === 'head-look-back')) {
    result.messages.push('自然回望請保持柔和幅度，避免頸部與脊椎過度扭轉。')
  }
  return result
}

export const getDisabledReason = (result: CompatibilityResolution, field: string, id: string) => result.disabledOptions.find(item => item.field === field && item.optionId === id)?.reason
export const getFieldLock = (result: CompatibilityResolution, field: string) => result.lockedFields.find(item => item.field === field)
export const getAvailableOptions = (result: CompatibilityResolution, field: string, ids: string[]) => ids.filter(id => !getDisabledReason(result, field, id))
export const validateResolvedState = (result: CompatibilityResolution) => ({ isValid: Object.values(result.nextState.systemLocks).every(Boolean), messages: [] })
export const validateFinalPrompt = (text: string) => ({ isValid: !text.includes('undefined'), messages: text.includes('undefined') ? ['包含 undefined'] : [] })
export const createChangePreview = (result: CompatibilityResolution) => result.changes.map(item => `${item.field}：${String(item.nextValue)}`)
export { resolveDependencies as applyImpliedValues, resolveDependencies as removeInvalidSelections, resolveDependencies as applyLockedValues }
