import { useMemo } from 'react'
import { useBuilder } from '../../context/BuilderContext'
import { buildChinesePrompt, buildEnglishPrompt, buildNegativePrompt } from '../../utils/promptBuilder'

export function PromptOutput() {
  const { selections } = useBuilder()
  const prompts = useMemo(() => ({
    zh: buildChinesePrompt(selections),
    en: buildEnglishPrompt(selections),
    negative: buildNegativePrompt(),
  }), [selections])

  return (
    <aside className="output-panel" aria-live="polite">
      <div className="output-header"><span className="live-dot" />即時輸出</div>
      <OutputBlock label="中文描述" value={prompts.zh} accent="violet" />
      <OutputBlock label="English Prompt" value={prompts.en} accent="blue" />
      <OutputBlock label="Negative Prompt" value={prompts.negative} accent="rose" />
    </aside>
  )
}

function OutputBlock({ label, value, accent }: { label: string; value: string; accent: string }) {
  return <section className={`output-block ${accent}`}><h2>{label}</h2><p>{value}</p></section>
}

