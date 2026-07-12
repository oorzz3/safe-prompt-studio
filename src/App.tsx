import { AccordionModule } from './components/builder/AccordionModule'
import { ChoiceField } from './components/builder/ChoiceField'
import { QuickPresets } from './components/builder/QuickPresets'
import { SliderField } from './components/builder/SliderField'
import { PromptOutput } from './components/output/PromptOutput'
import { useBuilder } from './context/BuilderContext'
import { findOption,options } from './data/builderOptions'
import { compositionOptions as c,findCompositionOption } from './data/compositionOptions'
import { sliderDefinitions } from './data/sliderDefinitions'

const label=(id:string)=>(findOption(id)??findCompositionOption(id))?.labelZh??'未設定'
const short=(items:string[])=>items.map(label).join('、')||'未設定'

export default function App(){const{state,setChoice,toggleList,setSlider,clear,reset}=useBuilder()
  return <div className="app-shell">
    <header className="site-header"><a className="brand" href="#top" aria-label="Safe Prompt Studio 首頁"><span className="brand-mark">S</span><span><b>Safe Prompt Studio</b><small>FICTIONAL ADULT PORTRAIT BUILDER / 0.2.0-alpha.1</small></span></a><div className="header-actions"><button className="text-button" type="button" onClick={clear}>清空</button><button className="reset-button" type="button" onClick={reset}>恢復預設</button></div></header>
    <main id="top">
      <section className="intro"><div><p className="kicker">FICTIONAL ADULT PORTRAIT BUILDER</p><h1>從零建立一位虛構成年角色，<br/>再把她放進<em>你想要的畫面。</em></h1></div><p className="intro-copy">從角色氣質、臉部髮妝、身形曲線，到服裝、姿態與鏡位，將零散構想整理成自然版與高衝擊版 Prompt。</p></section>
      <section className="safety-note"><span aria-hidden="true">◇</span><p><b>虛構角色安全範圍</b>　本工具僅用於從零建立明確成年、虛構且非露骨的女性角色與攝影構圖提示詞。不用於真人身分變造、未授權真人情色化或未成年人內容。</p></section>
      <div className="system-locks" aria-label="固定系統安全狀態">{['Clearly Adult','Fictional Character','Non-Explicit','Anatomy Guard'].map(item=><span key={item}>✓ {item}</span>)}</div>
      <QuickPresets/>
      <div className="workspace"><div className="builder-column"><div className="column-label"><span>CHARACTER CONSTRUCTION DESK</span><span>八個模組</span></div>
        <AccordionModule index="01" title="角色原型" eyebrow="PERSONA" defaultOpen summary={`${label(state.persona.archetype)}／${label(state.persona.ageBand)}／${short(state.persona.vibes)}`}>
          <ChoiceField label="地區／文化風格" options={options.regionStyle} value={state.persona.regionStyle} onChange={id=>setChoice('persona','regionStyle',id)}/><ChoiceField label="明確成年年齡帶" options={options.ageBand} value={state.persona.ageBand} onChange={id=>setChoice('persona','ageBand',id)}/><ChoiceField label="角色原型" options={options.archetype} value={state.persona.archetype} onChange={id=>setChoice('persona','archetype',id)}/><ChoiceField label="角色氣質" options={options.vibes} value={state.persona.vibes} multiple onChange={id=>toggleList('persona','vibes',id)}/>
        </AccordionModule>
        <AccordionModule index="02" title="臉部與髮妝" eyebrow="FACE / HAIR / MAKEUP" summary={`${label(state.face.faceShape)}／${label(state.face.hairstyle)}／${label(state.face.makeup)}`}>
          <ChoiceField label="臉型" options={options.faceShape} value={state.face.faceShape} onChange={id=>setChoice('face','faceShape',id)}/><ChoiceField label="五官氣質" options={options.featureVibe} value={state.face.featureVibe} onChange={id=>setChoice('face','featureVibe',id)}/><ChoiceField label="髮型" options={options.hairstyle} value={state.face.hairstyle} onChange={id=>setChoice('face','hairstyle',id)}/><ChoiceField label="妝容" options={options.makeup} value={state.face.makeup} onChange={id=>setChoice('face','makeup',id)}/><ChoiceField label="表情" options={options.expression} value={state.face.expression} onChange={id=>setChoice('face','expression',id)}/>
        </AccordionModule>
        <AccordionModule index="03" title="身形與曲線" eyebrow="BODY / CURVE CONTROL" defaultOpen summary={`${label(state.body.frame)}／上圍 ${state.body.bustFullness}／臀部圓潤 ${state.body.gluteRoundness}／衝擊 ${state.body.visualImpact}`}>
          <ChoiceField label="基礎體態" options={options.bodyFrame} value={state.body.frame} onChange={id=>setChoice('body','frame',id)}/><div className="slider-grid">{sliderDefinitions.map(def=><SliderField key={def.key} definition={def} value={state.body[def.key]} onChange={value=>setSlider(def.key,value)}/>)}</div>
        </AccordionModule>
        <AccordionModule index="04" title="服裝與造型" eyebrow="OUTFIT / STYLING" summary={`${label(state.outfit.type)}／${label(state.outfit.color)}／${label(state.outfit.fit)}`}>
          <ChoiceField label="服裝類型" options={c.outfitType} value={state.outfit.type} onChange={id=>setChoice('outfit','type',id)}/><ChoiceField label="服裝顏色" options={c.outfitColor} value={state.outfit.color} onChange={id=>setChoice('outfit','color',id)}/><ChoiceField label="服裝風格" options={c.outfitStyle} value={state.outfit.style} onChange={id=>setChoice('outfit','style',id)}/><ChoiceField label="合身程度" options={c.outfitFit} value={state.outfit.fit} onChange={id=>setChoice('outfit','fit',id)}/><ChoiceField label="配件" options={c.accessories} value={state.outfit.accessories} multiple onChange={id=>toggleList('outfit','accessories',id)}/>
        </AccordionModule>
        <AccordionModule index="05" title="姿態與動作" eyebrow="POSE / ACTION" summary={`${state.pose.yogaPose&&state.pose.yogaPose!=='yoga-none'?label(state.pose.yogaPose):label(state.pose.basePose)}／${label(state.pose.bodyDirection)}／${label(state.pose.headDirection)}`}>
          <ChoiceField label="基礎姿態" options={c.basePose} value={state.pose.basePose} onChange={id=>setChoice('pose','basePose',id)}/><ChoiceField label="瑜珈動作" options={c.yogaPose} value={state.pose.yogaPose} onChange={id=>setChoice('pose','yogaPose',id)}/><ChoiceField label="身體方向" options={c.bodyDirection} value={state.pose.bodyDirection} onChange={id=>setChoice('pose','bodyDirection',id)}/><ChoiceField label="頭部方向" options={c.headDirection} value={state.pose.headDirection} onChange={id=>setChoice('pose','headDirection',id)}/><ChoiceField label="手部位置" options={c.handPosition} value={state.pose.handPosition} onChange={id=>setChoice('pose','handPosition',id)}/><ChoiceField label="腿部姿態" options={c.legPosition} value={state.pose.legPosition} onChange={id=>setChoice('pose','legPosition',id)}/>
        </AccordionModule>
        <AccordionModule index="06" title="場景與氛圍" eyebrow="SCENE / MOOD" summary={`${label(state.scene.location)}／${label(state.scene.time)}／${label(state.scene.atmosphere)}`}>
          <ChoiceField label="場景地點" options={c.location} value={state.scene.location} onChange={id=>setChoice('scene','location',id)}/><ChoiceField label="時間" options={c.time} value={state.scene.time} onChange={id=>setChoice('scene','time',id)}/><ChoiceField label="氣氛" options={c.atmosphere} value={state.scene.atmosphere} onChange={id=>setChoice('scene','atmosphere',id)}/>
        </AccordionModule>
        <AccordionModule index="07" title="鏡位與構圖" eyebrow="CAMERA / COMPOSITION" summary={`${label(state.camera.framing)}／${label(state.camera.height)}／${label(state.camera.lensStyle)}`}>
          <ChoiceField label="景別" options={c.framing} value={state.camera.framing} onChange={id=>setChoice('camera','framing',id)}/><ChoiceField label="鏡頭高度" options={c.cameraHeight} value={state.camera.height} onChange={id=>setChoice('camera','height',id)}/><ChoiceField label="拍攝方向" options={c.cameraDirection} value={state.camera.direction} onChange={id=>setChoice('camera','direction',id)}/><ChoiceField label="攝影類型" options={c.photographyType} value={state.camera.photographyType} onChange={id=>setChoice('camera','photographyType',id)}/><ChoiceField label="焦段感" options={c.lensStyle} value={state.camera.lensStyle} onChange={id=>setChoice('camera','lensStyle',id)}/>
        </AccordionModule>
        <AccordionModule index="08" title="光線與攝影風格" eyebrow="LIGHT / VISUAL STYLE" summary={`${label(state.lighting.lightType)}／${label(state.lighting.visualStyle)}／${label(state.lighting.colorTone)}`}>
          <ChoiceField label="光線" options={c.lightType} value={state.lighting.lightType} onChange={id=>setChoice('lighting','lightType',id)}/><ChoiceField label="影像風格" options={c.visualStyle} value={state.lighting.visualStyle} onChange={id=>setChoice('lighting','visualStyle',id)}/><ChoiceField label="輪廓光" options={c.rimLight} value={state.lighting.rimLight} onChange={id=>setChoice('lighting','rimLight',id)}/><ChoiceField label="色調" options={c.colorTone} value={state.lighting.colorTone} onChange={id=>setChoice('lighting','colorTone',id)}/>
        </AccordionModule>
      </div><PromptOutput/></div>
    </main><footer><span>SAFE PROMPT STUDIO</span><span>© {new Date().getFullYear()} · FICTIONAL · CLEARLY ADULT · NON-EXPLICIT</span></footer>
  </div>
}
