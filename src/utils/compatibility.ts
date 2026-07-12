import { libraries, optionMap } from '../data/libraries'
import type { BuilderSelections, ModuleKey, SelectionUpdate, ValidationResult } from '../types/prompt'

const clone = (selections: BuilderSelections): BuilderSelections => Object.fromEntries(
  Object.entries(selections).map(([key, ids]) => [key, [...ids]]),
) as BuilderSelections

const removeIds = (selections: BuilderSelections, ids: string[]) => {
  Object.keys(selections).forEach((key) => {
    const moduleKey = key as ModuleKey
    selections[moduleKey] = selections[moduleKey].filter((id) => !ids.includes(id))
  })
}

const hasAny = (selections: BuilderSelections, ids: string[]) => Object.values(selections).flat().some((id) => ids.includes(id))

const groundedPoses = ['pose-seated', 'pose-relaxed-stretch', 'yoga-seated-fold', 'yoga-downward-dog', 'yoga-cat-cow', 'yoga-bridge']
const standingBases = ['pose-standing', 'pose-side-stand', 'pose-squat']

function enforcePoseRules(selections: BuilderSelections, incomingId: string, messages: string[]) {
  const removeWithMessage = (ids: string[], message: string) => {
    if (hasAny(selections, ids)) {
      removeIds(selections, ids)
      messages.push(message)
    }
  }

  if (incomingId === 'yoga-downward-dog') removeWithMessage(standingBases, '已移除一般站姿，避免與下犬式衝突。')
  if (incomingId === 'yoga-cat-cow') removeWithMessage(standingBases, '已移除一般站姿，貓牛式改採地面支撐。')
  if (incomingId === 'yoga-seated-fold') removeWithMessage(['pose-standing', 'pose-side-stand', 'pose-squat'], '已移除站姿與半蹲，改採坐姿前屈。')
  if (incomingId === 'yoga-bridge') removeWithMessage(['pose-standing', 'pose-side-stand', 'pose-seated', 'pose-look-back'], '已移除不適合橋式的基礎姿態。')

  if (['yoga-downward-dog', 'yoga-cat-cow'].includes(incomingId)) {
    replaceGroupSelection(selections, 'pose', 'pose-hands', 'hands-ground')
  }
  if (incomingId === 'yoga-seated-fold') replaceGroupSelection(selections, 'pose', 'pose-legs', 'legs-seated-stretch')

  if (incomingId === 'hands-ground' && !hasAny(selections, groundedPoses)) {
    removeIds(selections, ['hands-ground'])
    messages.push('「支撐地面」需搭配坐姿、伸展或地面瑜珈動作，這次未加入。')
  }
  if (incomingId === 'legs-seated-stretch') removeWithMessage(standingBases, '已移除站姿，避免與坐姿伸展衝突。')

  if (standingBases.includes(incomingId)) {
    removeWithMessage(['yoga-downward-dog', 'yoga-cat-cow', 'yoga-seated-fold', 'yoga-bridge'], '已移除與站姿不相容的瑜珈動作。')
    if (!selections.pose.some((id) => optionMap.get(id)?.groupId === 'pose-yoga')) selections.pose.push('yoga-none')
  }
}

function replaceGroupSelection(selections: BuilderSelections, moduleKey: ModuleKey, groupId: string, optionId: string) {
  selections[moduleKey] = selections[moduleKey].filter((id) => optionMap.get(id)?.groupId !== groupId)
  selections[moduleKey].push(optionId)
}

export function updateSelection(current: BuilderSelections, moduleKey: ModuleKey, incomingId: string): SelectionUpdate {
  const incoming = optionMap.get(incomingId)
  if (!incoming?.enabled || incoming.category !== moduleKey) return { selections: current, messages: ['此選項目前無法使用。'] }
  if (incoming.selectionMode === 'fixed') return { selections: current, messages: ['安全限定為固定啟用，無法關閉。'] }

  const next = clone(current)
  const messages: string[] = []
  const alreadySelected = next[moduleKey].includes(incomingId)

  if (incoming.selectionMode === 'multiple' && alreadySelected) {
    next[moduleKey] = next[moduleKey].filter((id) => id !== incomingId)
  } else {
    if (incoming.selectionMode === 'single') replaceGroupSelection(next, moduleKey, incoming.groupId, incomingId)
    else if (!alreadySelected) next[moduleKey].push(incomingId)

    const conflictIds = Object.values(next).flat().filter((id) => {
      const selected = optionMap.get(id)
      return id !== incomingId && (incoming.conflictsWith.includes(id) || Boolean(selected?.conflictsWith.includes(incomingId)))
    })
    if (conflictIds.length) {
      removeIds(next, conflictIds)
      messages.push('已自動移除不相容的舊選項。')
    }
    enforcePoseRules(next, incomingId, messages)
  }

  next.lighting = [...new Set([...next.lighting.filter((id) => id !== 'safety-non-explicit'), 'safety-non-explicit'])]
  return { selections: next, messages }
}

export function validateSelections(selections: BuilderSelections): ValidationResult {
  const messages: string[] = []
  const ids = Object.values(selections).flat()
  ids.forEach((id) => {
    const option = optionMap.get(id)
    if (!option) messages.push(`已忽略不存在的選項：${id}`)
    else if (!option.enabled) messages.push(`已忽略停用選項：${option.labelZh}`)
  })
  if (ids.includes('hands-ground') && !hasAny(selections, groundedPoses)) messages.push('支撐地面需要相容的坐姿、伸展或瑜珈動作。')
  return { isValid: messages.length === 0, messages }
}

export function sanitizeSelections(selections: BuilderSelections): BuilderSelections {
  const clean = clone(selections)
  Object.keys(clean).forEach((key) => {
    const moduleKey = key as ModuleKey
    const validIds = new Set(libraries[moduleKey].options.filter((option) => option.enabled).map((option) => option.id))
    clean[moduleKey] = [...new Set(clean[moduleKey].filter((id) => validIds.has(id)))]
  })
  if (!clean.lighting.includes('safety-non-explicit')) clean.lighting.push('safety-non-explicit')
  return clean
}
