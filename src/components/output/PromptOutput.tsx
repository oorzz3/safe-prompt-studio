import { useEffect, useMemo, useRef, useState } from 'react'
import { useBuilder } from '../../context/BuilderContext'
import { copyToClipboard } from '../../utils/clipboard'
import { buildAllPrompts, buildChinesePrompt, buildEnglishPrompt, buildNegativePrompt } from '../../utils/promptBuilder'

export function PromptOutput() {
  const { selections } = useBuilder()
  const [toast, setToast] = useState('')
  const timer = useRef<number | undefined>(undefined)
  const prompts = useMemo(() => ({ zh: buildChinesePrompt(selections), en: buildEnglishPrompt(selections), negative: buildNegativePrompt() }), [selections])

  useEffect(() => () => window.clearTimeout(timer.current), [])
  const showToast = (message: string) => {
    window.clearTimeout(timer.current)
    setToast(message)
    timer.current = window.setTimeout(() => setToast(''), 2600)
  }
  const copy = async (value: string, successMessage: string) => {
    try { await copyToClipboard(value); showToast(successMessage) }
    catch { showToast('複製失敗，請手動選取文字') }
  }

  return (
    <aside className="output-panel">
      <div className="output-header"><span><i className="live-dot" />即時輸出</span><small>LIVE COMPOSITION</small></div>
      <OutputBlock label="中文描述" value={prompts.zh} accent="violet" onCopy={() => copy(prompts.zh, '已複製中文描述')} />
      <OutputBlock label="English Prompt" value={prompts.en} accent="blue" onCopy={() => copy(prompts.en, '已複製 English Prompt')} />
      <OutputBlock label="Negative Prompt" value={prompts.negative} accent="rose" onCopy={() => copy(prompts.negative, '已複製 Negative Prompt')} />
      <button className="copy-all" type="button" aria-label="複製中文、英文及 Negative Prompt 全部內容" onClick={() => copy(buildAllPrompts(selections), '已複製全部內容')}>
        <span>複製全部內容</span><small>COPY ALL OUTPUTS</small>
      </button>
      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">{toast}</div>
    </aside>
  )
}

function OutputBlock({ label, value, accent, onCopy }: { label: string; value: string; accent: string; onCopy: () => void }) {
  return (
    <section className={`output-block ${accent}`}>
      <div className="output-title"><h2>{label}</h2><button type="button" onClick={onCopy} aria-label={`複製${label}`}>複製</button></div>
      <p tabIndex={0}>{value}</p>
    </section>
  )
}
