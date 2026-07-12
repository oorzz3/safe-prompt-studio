import { negativePromptTerms } from '../data/negativePrompt'
import { optionMap } from '../data/libraries'
import type { BuilderSelections, PromptOption } from '../types/prompt'

const ORDER = ['figure', 'outfit', 'pose', 'scene', 'camera', 'lighting'] as const
const unique = (values: string[]) => [...new Set(values.filter(Boolean))]

function selectedOptions(selections: BuilderSelections): PromptOption[] {
  return ORDER.flatMap((key) => selections[key])
    .map((id) => optionMap.get(id))
    .filter((option): option is PromptOption => Boolean(option?.enabled))
}

export function buildChinesePrompt(selections: BuilderSelections): string {
  const fragments = unique(selectedOptions(selections).map((option) => option.prompt.zh))
  const detail = fragments.length ? `，${fragments.join('，')}` : ''
  return `一位明確成年的女性${detail}。整體呈現成熟、自信、非露骨的時尚寫真氛圍，保留真實自然的人體結構。`
}

export function buildEnglishPrompt(selections: BuilderSelections): string {
  const fragments = unique(selectedOptions(selections).map((option) => option.prompt.en))
  return unique([
    'a clearly adult woman',
    ...fragments,
    'mature and confident presence',
    'realistic anatomy',
    'tasteful non-explicit photography',
  ]).join(', ')
}

export function buildNegativePrompt(): string {
  return unique(negativePromptTerms).join(', ')
}

