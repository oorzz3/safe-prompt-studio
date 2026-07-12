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
      <div className="module-groups">
        {library.groups.map((group) => (
          <fieldset className="option-group" key={group.id}>
            <legend>
              <span>{group.labelZh}</span>
              <small>{group.selectionMode === 'fixed' ? '固定啟用' : group.selectionMode === 'multiple' ? '可複選' : '單選'}</small>
            </legend>
            <div className="option-grid">
              {library.options.filter((option) => option.groupId === group.id).map((option) => {
                const active = selections[moduleKey].includes(option.id)
                const disabled = !option.enabled || option.selectionMode === 'fixed'
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`option-chip ${active ? 'is-active' : ''}`}
                    disabled={disabled}
                    aria-pressed={active}
                    aria-label={`${group.labelZh}：${option.labelZh}${disabled ? '，固定啟用' : ''}`}
                    onClick={() => select(moduleKey, option.id)}
                  >
                    <span>{option.labelZh}</span><small>{option.labelEn}</small>
                  </button>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  )
}
