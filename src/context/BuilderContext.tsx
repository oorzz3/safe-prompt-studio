import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { BuilderSelections, ModuleKey } from '../types/prompt'
import { updateSelection, validateSelections } from '../utils/compatibility'

export const defaultSelections: BuilderSelections = {
  figure: ['figure-natural', 'upper-natural', 'waist-natural', 'hip-natural', 'strength-subtle', 'realism-high'],
  outfit: ['outfit-one-piece', 'color-navy', 'outfit-style-elegant'],
  pose: ['pose-standing', 'yoga-none', 'body-three-quarter', 'head-distance', 'hands-natural', 'legs-standing'],
  scene: ['scene-beach', 'time-sunset', 'mood-relaxed'],
  camera: ['camera-full-body', 'camera-eye', 'shot-three-quarter', 'photo-editorial'],
  lighting: ['light-sunset', 'style-fashion', 'safety-non-explicit'],
}

const emptySelections = (): BuilderSelections => ({ figure: [], outfit: [], pose: [], scene: [], camera: [], lighting: ['safety-non-explicit'] })

interface BuilderContextValue {
  selections: BuilderSelections
  messages: string[]
  select: (module: ModuleKey, optionId: string) => void
  clear: () => void
  reset: () => void
}

const BuilderContext = createContext<BuilderContextValue | null>(null)

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<BuilderSelections>(defaultSelections)
  const [messages, setMessages] = useState<string[]>([])

  const select = (module: ModuleKey, optionId: string) => {
    setSelections((current) => {
      const result = updateSelection(current, module, optionId)
      setMessages([...result.messages, ...validateSelections(result.selections).messages])
      return result.selections
    })
  }

  const value = useMemo(() => ({
    selections,
    messages,
    select,
    clear: () => { setSelections(emptySelections()); setMessages([]) },
    reset: () => { setSelections(defaultSelections); setMessages([]) },
  }), [messages, selections])
  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
}

export function useBuilder() {
  const context = useContext(BuilderContext)
  if (!context) throw new Error('useBuilder must be used inside BuilderProvider')
  return context
}
