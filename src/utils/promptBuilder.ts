import { negativePromptTerms } from '../data/negativePrompt'
import { optionMap } from '../data/libraries'
import type { BuilderSelections, PromptOption } from '../types/prompt'

const unique = (values: string[]) => [...new Set(values.map((value) => value.trim()).filter(Boolean))]
const getOptions = (selections: BuilderSelections, module: keyof BuilderSelections) => selections[module]
  .map((id) => optionMap.get(id))
  .filter((option): option is PromptOption => Boolean(option?.enabled))
const byGroup = (options: PromptOption[], groupId: string, language: 'zh' | 'en') => unique(options.filter((option) => option.groupId === groupId).map((option) => option.prompt[language])).join(language === 'zh' ? '、' : ', ')
const joinPresent = (parts: string[], separator = '、') => unique(parts).join(separator)

export function buildChinesePrompt(selections: BuilderSelections): string {
  const figure = getOptions(selections, 'figure')
  const outfit = getOptions(selections, 'outfit')
  const pose = getOptions(selections, 'pose')
  const scene = getOptions(selections, 'scene')
  const camera = getOptions(selections, 'camera')
  const lighting = getOptions(selections, 'lighting')
  const sentences = ['一位明確成年的女性。']

  const figureText = joinPresent(['figure-shape', 'figure-upper', 'figure-waist', 'figure-hip', 'figure-strength', 'figure-realism'].map((group) => byGroup(figure, group, 'zh')))
  if (figureText) sentences.push(`她呈現${figureText}。`)
  const outfitText = joinPresent(['outfit-color', 'outfit-type', 'outfit-style'].map((group) => byGroup(outfit, group, 'zh')))
  if (outfitText) sentences.push(`她身穿${outfitText}。`)
  const poseMain = byGroup(pose, 'pose-yoga', 'zh') || byGroup(pose, 'pose-base', 'zh')
  const poseDetails = joinPresent(['pose-body-direction', 'pose-head', 'pose-hands', 'pose-legs'].map((group) => byGroup(pose, group, 'zh')))
  if (poseMain || poseDetails) sentences.push(`她${joinPresent([poseMain, poseDetails])}。`)
  const sceneText = joinPresent(['scene-place', 'scene-time', 'scene-mood'].map((group) => byGroup(scene, group, 'zh')))
  if (sceneText) sentences.push(`場景位於${sceneText}。`)
  const cameraText = joinPresent(['camera-framing', 'camera-height', 'camera-direction', 'camera-type'].map((group) => byGroup(camera, group, 'zh')))
  if (cameraText) sentences.push(`畫面使用${cameraText}構圖。`)
  const lightText = joinPresent(['lighting-light', 'lighting-style'].map((group) => byGroup(lighting, group, 'zh')))
  if (lightText) sentences.push(`搭配${lightText}。`)
  sentences.push('整體保持成熟、自信、非露骨，並維持真實自然的人體結構。')
  return sentences.join('')
}

export function buildEnglishPrompt(selections: BuilderSelections): string {
  const order: (keyof BuilderSelections)[] = ['figure', 'outfit', 'pose', 'scene', 'camera', 'lighting']
  const fragments = order.flatMap((module) => getOptions(selections, module))
    .filter((option) => option.id !== 'yoga-none' && option.id !== 'safety-non-explicit')
    .map((option) => option.prompt.en)
  return unique(['a clearly adult woman', ...fragments, 'mature and confident presence', 'realistic anatomy', 'tasteful non-explicit photography']).join(', ')
}

export function buildNegativePrompt(): string {
  return unique(negativePromptTerms).join(', ')
}

export function buildAllPrompts(selections: BuilderSelections): string {
  return `中文描述\n---------\n${buildChinesePrompt(selections)}\n\nEnglish Prompt\n--------------\n${buildEnglishPrompt(selections)}\n\nNegative Prompt\n---------------\n${buildNegativePrompt()}`
}
