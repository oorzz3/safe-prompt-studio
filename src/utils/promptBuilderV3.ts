import { findOption } from '../data/builderOptions'
import { findCompositionOption } from '../data/compositionOptions'
import { findOfficeOption } from '../data/officeOptions'
import { negativePromptTerms } from '../data/negativePrompt'
import { getPose } from '../data/poseDefinitions'
import type { BuilderStateV3, CharacterPreset, SliderKey, ValidationResult } from '../types/builderV3'
import { validateFinalPrompt } from './compatibilityEngine'

const find = (id: string) => (findOption(id) ?? findCompositionOption(id) ?? findOfficeOption(id))?.prompt.en ?? ''
const unique = (items: string[]) => [...new Set(items.map(item => item.trim()).filter(Boolean))]
const band = (value: number) => value <= 20 ? 0 : value <= 40 ? 1 : value <= 60 ? 2 : value <= 80 ? 3 : 4
const bustBand = (value: number) => value <= 20 ? 0 : value <= 40 ? 1 : value <= 60 ? 2 : value <= 80 ? 3 : value <= 90 ? 4 : 5
type BodyKey = Exclude<SliderKey, 'visualImpact'>
const bodyKeys: BodyKey[] = ['bustFullness', 'waistDefinition', 'hipWidth', 'gluteRoundness', 'gluteProjection', 'thighFullness', 'legProportion']
const labels: Record<BodyKey, string> = { bustFullness: '上半身豐滿度', waistDefinition: '腰線', hipWidth: '胯部寬度', gluteRoundness: '下半身圓潤度', gluteProjection: '側面立體度', thighFullness: '大腿豐盈度', legProportion: '腿身比例' }
const bustPhrases = [
  'a subtle upper-body silhouette',
  'a naturally balanced upper-body silhouette',
  'a softly fuller upper-body silhouette',
  'a prominently full upper-body silhouette with balanced volume',
  'a very full upper-body silhouette with clearly visible three-dimensional volume and a pronounced chest-to-waist transition',
  'a highly prominent full-bust silhouette with substantial three-dimensional volume, a strong chest-to-waist contrast and coherent anatomical structure',
]
const phrases: Record<Exclude<BodyKey, 'bustFullness'>, string[]> = {
  waistDefinition: ['a softly natural waistline', 'an understated waistline', 'a clearly defined waistline', 'a strongly defined waistline', 'an exceptionally defined, anatomically coherent waistline'],
  hipWidth: ['a slender hip structure', 'a natural hip structure', 'a softly fuller hip structure', 'a prominently broader hip structure', 'a distinctly broad, curvaceous hip structure'],
  gluteRoundness: ['subtle lower-body contours', 'natural rounded lower-body contours', 'softly rounded lower-body contours', 'prominently rounded lower-body contours', 'strongly rounded, anatomically coherent lower-body contours'],
  gluteProjection: ['a subtle side-profile contour', 'a natural side-profile contour', 'a softly dimensional side-profile contour', 'a pronounced side-profile contour', 'a highly dimensional, anatomically coherent side-profile contour'],
  thighFullness: ['slender yet healthy thigh contours', 'natural thigh proportions', 'softly fuller thigh contours', 'prominently full thigh contours', 'very full, proportionally integrated thigh contours'],
  legProportion: ['naturally compact leg proportions', 'balanced leg-to-body proportions', 'softly elongated leg lines', 'prominently elongated yet plausible leg lines', 'strongly elongated, anatomically plausible leg proportions'],
}

export const getSliderSemantic = (key: SliderKey, value: number) => ({ en: ['Subtle', 'Natural', 'Defined', 'Prominent', 'Very high'][band(value)], zh: ['細緻收斂', '自然低調', '柔和明確', '鮮明平衡', '高值但合理'][band(value)], description: key === 'visualImpact' ? '只調整構圖、剪影、光線與 Editorial 語氣。' : key })
export const mapSliderToPromptFragment = (key: SliderKey, value: number, mode: 'natural' | 'impact' = 'natural') => key === 'visualImpact' ? (mode === 'impact' ? ['clean lifestyle composition', 'defined silhouette composition', 'strong fashion-editorial composition', 'sculpted visual contour with controlled pose tension and defined rim lighting', 'powerful editorial composition with a sculpted whole-figure silhouette and controlled rim-lit visual tension'][band(value)] : ['lifestyle restraint', 'subtle silhouette emphasis', 'polished editorial presence', 'strong but controlled silhouette emphasis', 'refined high-impact editorial presence with powerful, coherent visual framing'][band(value)]) : key === 'bustFullness' ? bustPhrases[bustBand(value)] : phrases[key][band(value)]

const focusOrder: Record<string, BodyKey[]> = {
  'focus-upper': ['bustFullness', 'waistDefinition', 'hipWidth', 'thighFullness', 'legProportion', 'gluteRoundness', 'gluteProjection'],
  'focus-waist': ['waistDefinition', 'bustFullness', 'hipWidth', 'gluteRoundness', 'thighFullness', 'legProportion', 'gluteProjection'],
  'focus-waist-hip': ['waistDefinition', 'hipWidth', 'gluteRoundness', 'bustFullness', 'thighFullness', 'legProportion', 'gluteProjection'],
  'focus-hip': ['gluteRoundness', 'gluteProjection', 'hipWidth', 'waistDefinition', 'thighFullness', 'bustFullness', 'legProportion'],
  'focus-legs': ['legProportion', 'thighFullness', 'hipWidth', 'waistDefinition', 'bustFullness', 'gluteRoundness', 'gluteProjection'],
  'focus-hourglass': ['bustFullness', 'waistDefinition', 'hipWidth', 'gluteRoundness', 'gluteProjection', 'thighFullness', 'legProportion'],
}
export function rankBodyFeatures(state: BuilderStateV3) {
  const order = focusOrder[state.outfit.styling.curveFocus]
  const ground = ['pose-cat-cow', 'pose-down-dog', 'pose-bridge', 'pose-seated-fold'].includes(state.pose.poseId)
  return bodyKeys.map(key => ({ key, value: state.body[key], priority: order?.indexOf(key) ?? 99 })).sort((a, b) => order ? a.priority - b.priority || b.value - a.value : (b.value - (ground && b.key === 'legProportion' ? 35 : 0)) - (a.value - (ground && a.key === 'legProportion' ? 35 : 0)))
}
export function selectDominantBodyFeatures(state: BuilderStateV3, limit: number) {
  if (state.outfit.styling.curveFocus === 'focus-hourglass') return [{ key: 'bustFullness' as BodyKey, value: state.body.bustFullness }]
  const grouped = rankBodyFeatures(state).filter(item => item.key !== 'gluteProjection')
  const lower = grouped.find(item => item.key === 'gluteRoundness')
  if (lower) lower.value = Math.max(state.body.gluteRoundness, state.body.gluteProjection)
  return grouped.slice(0, limit)
}
export function mergeRelatedBodyFeatures(features: { key: BodyKey; value: number }[]) { return features }
export function buildHolisticBodyDescriptor(state: BuilderStateV3) {
  const values = bodyKeys.map(key => state.body[key])
  if (state.outfit.styling.curveFocus === 'focus-upper' && state.body.bustFullness >= 81 && state.body.bustFullness >= Math.max(...values.filter((_, index) => index !== 0))) return 'a high-volume curvaceous silhouette led by a strongly prominent upper-body presence and a clearly defined waist transition'
  if (values.filter(value => value >= 81).length >= 3) return 'a high-volume curvaceous silhouette with strongly defined transitions and coherent anatomy'
  if (values.filter(value => value >= 61).length >= 3) return 'a prominently curvaceous body silhouette with well-integrated proportions'
  return 'a coherent body silhouette with natural overall proportions'
}
const featurePhrase = (feature: { key: BodyKey; value: number }, state: BuilderStateV3) => {
  if (state.outfit.styling.curveFocus === 'focus-hourglass') return `a complete hourglass silhouette integrating ${bustPhrases[bustBand(state.body.bustFullness)].replace(/^a /, '')}, a clearly defined waist transition and curvaceous hip contours`
  return mapSliderToPromptFragment(feature.key, feature.value)
}
export function buildNaturalBodyPrompt(state: BuilderStateV3) { return unique([buildHolisticBodyDescriptor(state), ...selectDominantBodyFeatures(state, 1).map(feature => featurePhrase(feature, state)), 'proportionally integrated with the whole figure and realistic anatomy']) }
export function buildImpactBodyPrompt(state: BuilderStateV3) { return unique([buildHolisticBodyDescriptor(state), ...selectDominantBodyFeatures(state, 2).map(feature => featurePhrase(feature, state)), state.outfit.styling.curveFocus === 'focus-upper' ? '' : 'a clearly defined waist-to-hip transition with sound anatomy']) }
export function getBodyPromptStrategy(state: BuilderStateV3) {
  const top = selectDominantBodyFeatures(state, 2)
  return { features: top.map(item => labels[item.key]), groups: top.length, compressed: bodyKeys.filter(key => state.body[key] >= 81).length >= 3, impact: state.body.visualImpact }
}

export function getPresentationGuidance(state: BuilderStateV3) {
  const guidance: string[] = []
  if (['hands-up', 'hands-yoga-extension'].includes(state.pose.handPosition) || state.pose.poseId === 'pose-side-stretch') guidance.push('手臂上舉會拉長上身與布料線條，較容易強調腰線和全身延伸感；高體積上身輪廓可能比手臂自然放置時更收斂。')
  if (state.camera.framing === 'frame-full') guidance.push('全身景別能保留完整沙漏輪廓，但局部上身體積在畫面中的占比會較小。')
  if (['frame-half', 'frame-thigh'].includes(state.camera.framing)) guidance.push('較近景別可提升上身服裝結構及胸腰落差的可見度。')
  if (state.camera.subjectView === 'view-front') guidance.push('正面視角適合呈現左右對稱的上身結構與腰線。')
  if (['view-three-front', 'view-three-side'].includes(state.camera.subjectView)) guidance.push('三分之四視角通常更容易呈現上身三維體積、胸腰轉折及側面深度。')
  if (state.camera.subjectView === 'view-side') guidance.push('側面視角更容易呈現前後體積，但可能降低腰線左右對稱感。')
  return guidance
}

export const buildPosePrompt = (state: BuilderStateV3) => getPose(state.pose.poseId)?.prompt.en ?? 'a coherent neutral pose'
export const buildSupportStructurePrompt = (state: BuilderStateV3) => unique([find(state.pose.handPosition), find(state.pose.legPosition)]).join(', ')
export const buildSubjectViewPrompt = (state: BuilderStateV3) => find(state.camera.subjectView)
const identity = (state: BuilderStateV3) => ['a completely fictional, clearly adult woman', find(state.persona.regionStyle), find(state.persona.ageBand), find(state.persona.archetype), ...state.persona.vibes.map(find), find(state.face.faceShape), find(state.face.featureVibe), find(state.face.hairstyle), find(state.face.makeup), find(state.face.expression)]
const scene = (state: BuilderStateV3) => [find(state.scene.location), find(state.scene.time), find(state.scene.atmosphere), find(state.lighting.lightType), find(state.lighting.rimLight), find(state.lighting.visualStyle)]

const mergeOfficeTailoring = (state: BuilderStateV3, mode: 'natural' | 'impact') => {
  const upper = state.outfit.upper
  const detail = mode === 'impact' || state.outfit.styling.impactSource === 'impact-tailoring'
  if (!detail || upper.bustTailoring === 'bust-none') return find(upper.structure)
  if (upper.bustTailoring === 'bust-full-pattern' && upper.structure === 'structure-bodice') return 'full-bust patterning with shaped bodice paneling and three-dimensional front-panel volume'
  if (upper.bustTailoring === 'bust-underbust' && upper.structure === 'structure-bodice') return 'shaped bodice paneling with supportive underbust seaming'
  return unique([find(upper.bustTailoring), find(upper.structure)]).join(' with ')
}
const cameraImpact = (state: BuilderStateV3) => state.outfit.styling.impactSource === 'impact-camera' ? 'front or three-quarter upper-body readability, sculpted rim lighting, a clear torso contour and editorial full-figure composition' : ''
export function buildOutfitPrompt(state: BuilderStateV3, mode: 'natural' | 'impact') {
  const outfit = state.outfit
  if (outfit.family !== 'family-office') return unique([find(outfit.family), find(outfit.upper.garment), find(outfit.styling.color), 'a fully opaque, fully covered outfit'])
  const detail = mode === 'impact' || outfit.styling.impactSource === 'impact-tailoring'
  const waist = state.body.waistDefinition >= 61 ? `a defined waistline emphasized by ${find(outfit.waist.construction)}` : find(outfit.waist.construction)
  const selectedVolume = find(outfit.upper.volumePresentation).replace(/^a highly prominent full-bust silhouette with /i, '')
  const volume = mode === 'impact' && (state.body.bustFullness >= 61 || outfit.styling.curveFocus === 'focus-upper') ? selectedVolume : ''
  return unique([find(outfit.family), find(outfit.upper.garment), find(outfit.upper.neckline).replace(/ with secure coverage/i, ''), find(outfit.upper.opening).replace(/ with secure coverage/i, ''), volume, mergeOfficeTailoring(state, mode), find(outfit.upper.fit), waist, find(outfit.lower.garment).replace(/ with secure coverage/i, ''), detail ? find(outfit.lower.silhouette) : '', find(outfit.material.primary), find(outfit.material.surface), find(outfit.outerwear), find(outfit.styling.color), cameraImpact(state), 'fully opaque fabric with secure coverage', 'tasteful editorial styling'])
}
const shared = (state: BuilderStateV3, body: string[], mode: 'natural' | 'impact') => [...identity(state), ...body, ...buildOutfitPrompt(state, mode), buildPosePrompt(state), buildSupportStructurePrompt(state), buildSubjectViewPrompt(state), find(state.pose.headDirection), find(state.camera.framing), find(state.camera.height), ...scene(state)]
const safety = ['mature adult presence', 'tasteful non-explicit photography', 'anatomically coherent proportions', 'realistic anatomy', 'original fictional identity', 'no resemblance to any real person']
export const dedupePromptDescriptors = (items: string[]) => unique(items)
export const enforcePromptWordBudget = (items: string[], max = 260) => { const result: string[] = []; let count = 0; for (const item of items) { const words = item.split(/\s+/).length; if (count + words > max) break; result.push(item); count += words } return result }
const completePrompt = (items: string[]) => unique([...enforcePromptWordBudget(items), ...safety]).join(', ')
export const buildNaturalPrompt = (state: BuilderStateV3) => completePrompt([...shared(state, buildNaturalBodyPrompt(state), 'natural'), mapSliderToPromptFragment('visualImpact', state.body.visualImpact, 'natural')])
export const buildHighImpactPrompt = (state: BuilderStateV3) => completePrompt([...shared(state, buildImpactBodyPrompt(state), 'impact'), mapSliderToPromptFragment('visualImpact', state.body.visualImpact, 'impact')])

export function validatePromptBalance(prompt: string): ValidationResult {
  const count = (term: string) => (prompt.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) ?? []).length
  const messages: string[] = []
  const limits: Record<string, number> = { dramatic: 1, balanced: 2, coherent: 2, structured: 3, tailored: 3, 'full-bust': 2, 'upper-body': 2, 'chest-to-waist': 2, 'secure coverage': 1, 'fully opaque': 1, tasteful: 2 }
  for (const [term, limit] of Object.entries(limits)) if (count(term) > limit) messages.push(`${term} 超過 ${limit} 次`)
  if (prompt.includes('undefined')) messages.push('包含 undefined')
  for (const forbidden of [/buttons? (?:about to )?burst(?:ing)?/i, /buttons? straining/i, /straining buttons?/i, /barely (?:covered|contained)/i, /transparent(?: wet)? shirt/i, /oversized breasts?/i, /enormous breasts?/i, /massive bust/i, /extreme cleavage/i, /exposed chest/i, /sexual office fantasy/i, /seductive secretary/i, /fetish pencil skirt/i, /voyeuristic office scene/i]) if (forbidden.test(prompt)) messages.push(`包含不安全職場語意：${forbidden.source}`)
  if (/urban office editorial/i.test(prompt) && !/(tailored|structured|business shirt|blouse|waistcoat|blazer|patterning|paneling)/i.test(prompt)) messages.push('職場造型缺少結構剪裁語意')
  if (/urban office editorial/i.test(prompt) && !prompt.includes('fully opaque')) messages.push('職場造型缺少 fully opaque')
  if (/deep V/i.test(prompt) && !prompt.includes('secure coverage')) messages.push('深 V 造型缺少 secure coverage')
  if (/urban office editorial/i.test(prompt) && /(swimsuit|bikini)/i.test(prompt)) messages.push('職場與泳裝語意混用')
  for (const required of ['clearly adult', 'fictional', 'non-explicit', 'realistic anatomy', 'anatomically coherent']) if (!prompt.includes(required)) messages.push(`缺少 ${required}`)
  return { isValid: !messages.length, messages }
}

export const buildCharacterSummary = (state: BuilderStateV3) => unique([findOption(state.persona.archetype)?.labelZh ?? '', findOption(state.persona.ageBand)?.labelZh ?? '', getPose(state.pose.poseId)?.labelZh ?? '', findCompositionOption(state.camera.subjectView)?.labelZh ?? '', findCompositionOption(state.camera.framing)?.labelZh ?? '', `視覺衝擊 ${state.body.visualImpact}`]).join('\n')
export const buildNegativePrompt = () => negativePromptTerms.join(', ')
export const buildAllPrompts = (state: BuilderStateV3) => `角色摘要\n${buildCharacterSummary(state)}\n\n自然寫真版\n${buildNaturalPrompt(state)}\n\n高衝擊時尚版\n${buildHighImpactPrompt(state)}\n\nNegative Prompt\n${buildNegativePrompt()}`
export const validateBuilderState = (state: BuilderStateV3): ValidationResult => { const messages: string[] = []; if (state.schemaVersion !== 5 || state.dataVersion !== '0.2.3') messages.push('State schema 版本不符'); if (!state.outfit.material.opacityLock) messages.push('opacityLock 未啟用'); if (!Object.values(state.systemLocks).every(Boolean)) messages.push('systemLocks 未完整啟用'); return { isValid: !messages.length, messages } }
export const validateResolvedPrompt = (state: BuilderStateV3) => { const structure = validateFinalPrompt(buildNaturalPrompt(state)); const balance = validatePromptBalance(buildHighImpactPrompt(state)); return { isValid: structure.isValid && balance.isValid, messages: [...structure.messages, ...balance.messages] } }
export const applyCharacterPreset = (preset: CharacterPreset) => structuredClone(preset.state)
