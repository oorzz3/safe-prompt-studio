import type { ModuleKey, PromptLibrary, PromptOption } from '../types/prompt'
import { cameraOptions } from './cameraOptions'
import { figureOptions } from './figureOptions'
import { lightingOptions } from './lightingOptions'
import { outfitOptions } from './outfitOptions'
import { poseOptions } from './poseOptions'
import { sceneOptions } from './sceneOptions'

export const libraries: Record<ModuleKey, PromptLibrary> = {
  figure: figureOptions,
  outfit: outfitOptions,
  pose: poseOptions,
  scene: sceneOptions,
  camera: cameraOptions,
  lighting: lightingOptions,
}

export const optionMap = new Map<string, PromptOption>(
  Object.values(libraries).flatMap((library) => library.options).map((option) => [option.id, option]),
)

