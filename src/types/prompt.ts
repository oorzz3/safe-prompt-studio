export type ModuleKey = 'figure' | 'outfit' | 'pose' | 'scene' | 'camera' | 'lighting'

export interface PromptFragment {
  zh: string
  en: string
}

export interface PromptOption {
  id: string
  category: string
  labelZh: string
  labelEn: string
  prompt: PromptFragment
  tags: string[]
  conflictsWith: string[]
  requires: string[]
  enabled: boolean
}

export interface PromptLibrary {
  schemaVersion: 1
  dataVersion: string
  options: PromptOption[]
}

export type BuilderSelections = Record<ModuleKey, string[]>

export interface ValidationResult {
  isValid: boolean
  messages: string[]
}

