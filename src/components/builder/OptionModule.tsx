import { useBuilder } from '../../context/BuilderContext'
import type { ModuleKey, PromptLibrary } from '../../types/prompt'

interface OptionModuleProps {
  moduleKey: ModuleKey
  eyebrow: string
  title: string
  index: string
  library: PromptLibrary
}

export function OptionModule({ moduleKey, eyebrow, title, index, library }: OptionModuleProps) {
  const { selections, select } = useBuilder()
  return (
    <section className="module-card" aria-labelledby={`${moduleKey}-title`}>
      <div className="module-heading">
        <span className="module-index">{index}</span>
        <div><p>{eyebrow}</p><h2 id={`${moduleKey}-title`}>{title}</h2></div>
      </div>
      <div className="option-grid">
        {library.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`option-chip ${selections[moduleKey].includes(option.id) ? 'is-active' : ''}`}
            disabled={!option.enabled}
            aria-pressed={selections[moduleKey].includes(option.id)}
            onClick={() => select(moduleKey, option.id)}
          >
            <span>{option.labelZh}</span><small>{option.labelEn}</small>
          </button>
        ))}
      </div>
    </section>
  )
}

