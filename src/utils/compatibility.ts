import { optionMap } from '../data/libraries'
import type { BuilderSelections, ValidationResult } from '../types/prompt'

export function resolveConflicts(selections: BuilderSelections, incomingId: string): BuilderSelections {
  const incoming = optionMap.get(incomingId)
  if (!incoming?.enabled) return selections

  const next = Object.fromEntries(
    Object.entries(selections).map(([key, ids]) => [
      key,
      ids.filter((id) => !incoming.conflictsWith.includes(id) && !optionMap.get(id)?.conflictsWith.includes(incomingId)),
    ]),
  ) as BuilderSelections

  return next
}

export function validateSelections(selections: BuilderSelections): ValidationResult {
  const ids = Object.values(selections).flat()
  const messages: string[] = []
  ids.forEach((id) => {
    const option = optionMap.get(id)
    if (!option) messages.push(`找不到選項：${id}`)
    if (option && option.requires.some((required) => !ids.includes(required))) {
      messages.push(`${option.labelZh} 缺少必要搭配`)
    }
  })
  return { isValid: messages.length === 0, messages }
}

