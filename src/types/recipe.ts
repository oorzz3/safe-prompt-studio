import type { BuilderSelections } from './prompt'

export interface SavedRecipe {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  selections: BuilderSelections
}

export interface RecipeExportData {
  schemaVersion: 1
  appVersion: string
  recipes: SavedRecipe[]
}

