export type ModuleKey = 'figure' | 'outfit' | 'pose' | 'scene' | 'camera' | 'lighting'
export type SelectionMode = 'single' | 'multiple' | 'fixed'

export interface PromptFragment {
  zh: string
  en: string
}

export interface PromptOption {
  id: string
  category: string
  groupId: string
  selectionMode: SelectionMode
  labelZh: string
  labelEn: string
  prompt: PromptFragment
  tags: string[]
  conflictsWith: string[]
  requires: string[]
  enabled: boolean
}

export interface PromptGroup {
  id: string
  labelZh: string
  labelEn: string
  selectionMode: SelectionMode
}

export interface PromptLibrary {
  schemaVersion: 1
  dataVersion: string
  groups: PromptGroup[]
  options: PromptOption[]
}

export type BuilderSelections = Record<ModuleKey, string[]>

export interface ValidationResult {
  isValid: boolean
  messages: string[]
}

export interface SelectionUpdate {
  selections: BuilderSelections
  messages: string[]
}
