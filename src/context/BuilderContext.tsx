import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { BuilderSelections, ModuleKey } from '../types/prompt'
import { resolveConflicts } from '../utils/compatibility'

export const defaultSelections: BuilderSelections = {
  figure: ['figure-natural'],
  outfit: ['outfit-one-piece'],
  pose: ['pose-standing'],
  scene: ['scene-beach'],
  camera: ['camera-full-body'],
  lighting: ['lighting-sunset', 'style-editorial'],
}

const emptySelections = (): BuilderSelections => ({ figure: [], outfit: [], pose: [], scene: [], camera: [], lighting: [] })

interface BuilderContextValue {
  selections: BuilderSelections
  select: (module: ModuleKey, optionId: string) => void
  clear: () => void
  reset: () => void
}

const BuilderContext = createContext<BuilderContextValue | null>(null)

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<BuilderSelections>(defaultSelections)

  const select = (module: ModuleKey, optionId: string) => {
    setSelections((current) => {
      const resolved = resolveConflicts(current, optionId)
      return { ...resolved, [module]: [optionId] }
    })
  }

  const value = useMemo(() => ({ selections, select, clear: () => setSelections(emptySelections()), reset: () => setSelections(defaultSelections) }), [selections])
  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
}

export function useBuilder() {
  const context = useContext(BuilderContext)
  if (!context) throw new Error('useBuilder must be used inside BuilderProvider')
  return context
}

