import { OptionModule } from './components/builder/OptionModule'
import { PromptOutput } from './components/output/PromptOutput'
import { useBuilder } from './context/BuilderContext'
import { libraries } from './data/libraries'

const modules = [
  ['figure', 'BODY / FIGURE', '身形輪廓', '01'],
  ['outfit', 'OUTFIT', '服裝造型', '02'],
  ['pose', 'POSE', '姿態與方向', '03'],
  ['scene', 'SCENE', '場景氛圍', '04'],
  ['camera', 'CAMERA', '鏡位與構圖', '05'],
  ['lighting', 'LIGHT & STYLE', '光線與風格', '06'],
] as const

export default function App() {
  const { clear, reset } = useBuilder()
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Safe Prompt Studio 首頁">
          <span className="brand-mark">S</span><span><b>Safe Prompt</b><small>STUDIO / 0.1</small></span>
        </a>
        <div className="header-actions">
          <button className="text-button" type="button" onClick={clear}>清空</button>
          <button className="reset-button" type="button" onClick={reset}>恢復預設</button>
        </div>
      </header>

      <main id="top">
        <section className="intro">
          <div><p className="kicker">PROMPT COMPOSITION DESK</p><h1>把零散想法，整理成<br /><em>安全而精準</em>的畫面語言。</h1></div>
          <p className="intro-copy">專為明確成年、非露骨的時尚、泳裝、健身、瑜珈與生活寫真設計。</p>
        </section>

        <section className="safety-note">
          <span aria-hidden="true">◇</span>
          <p><b>內容使用範圍</b>　本工具僅用於明確成年、非露骨的寫真提示詞整理。請僅使用本人、虛構人物或已獲合法授權的素材。</p>
        </section>

        <div className="workspace">
          <div className="builder-column">
            <div className="column-label"><span>BUILD PARAMETERS</span><span>六個模組</span></div>
            {modules.map(([key, eyebrow, title, index]) => <OptionModule key={key} moduleKey={key} eyebrow={eyebrow} title={title} index={index} library={libraries[key]} />)}
          </div>
          <PromptOutput />
        </div>
      </main>
      <footer><span>SAFE PROMPT STUDIO</span><span>© {new Date().getFullYear()} · CLEARLY ADULT · NON-EXPLICIT</span></footer>
    </div>
  )
}

