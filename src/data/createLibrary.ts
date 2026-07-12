import type { PromptGroup, PromptLibrary, PromptOption, SelectionMode } from '../types/prompt'

type OptionInput = Pick<PromptOption, 'id' | 'category' | 'groupId' | 'labelZh' | 'labelEn' | 'prompt'> & Partial<Pick<PromptOption, 'tags' | 'conflictsWith' | 'requires' | 'enabled' | 'selectionMode'>>

export const group = (id: string, labelZh: string, labelEn: string, selectionMode: SelectionMode = 'single'): PromptGroup => ({ id, labelZh, labelEn, selectionMode })

export function option(input: OptionInput, groups: PromptGroup[]): PromptOption {
  const groupDefinition = groups.find((item) => item.id === input.groupId)
  if (!groupDefinition) throw new Error(`Unknown option group: ${input.groupId}`)
  return {
    tags: [],
    conflictsWith: [],
    requires: [],
    enabled: true,
    ...input,
    selectionMode: input.selectionMode ?? groupDefinition.selectionMode,
  }
}

export function library(groups: PromptGroup[], inputs: OptionInput[]): PromptLibrary {
  return { schemaVersion: 1, dataVersion: '0.1.0', groups, options: inputs.map((input) => option(input, groups)) }
}
