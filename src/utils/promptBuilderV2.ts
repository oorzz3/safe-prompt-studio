import { findOption } from '../data/builderOptions'
import { findCompositionOption } from '../data/compositionOptions'
import { negativePromptTerms } from '../data/negativePrompt'
import type { BuilderStateV2, CharacterPreset, SliderKey, ValidationResult } from '../types/builderV2'

const unique = (items:string[]) => [...new Set(items.map(item=>item.trim()).filter(Boolean))]
const selected = (id:string,lang:'zh'|'en') => (findOption(id) ?? findCompositionOption(id))?.prompt[lang] ?? ''

const sliderPhrases:Record<Exclude<SliderKey,'visualImpact'>,string[]> = {
  bustFullness:['a subtle upper-body silhouette','a natural understated upper-body silhouette','a softly fuller upper-body silhouette','a prominently full yet proportionally balanced upper-body silhouette','a dramatically full, stylized yet anatomically coherent upper-body silhouette'],
  waistDefinition:['a softly natural waistline','an understated natural waistline','a gently defined waistline','a strongly defined yet anatomically coherent waistline','a dramatically defined, stylized yet coherent waistline'],
  hipWidth:['a slender balanced hip structure','a natural hip width','a softly fuller hip structure','a prominently wider yet balanced hip structure','a dramatic stylized hip structure with coherent anatomy'],
  gluteRoundness:['subtle natural hip and glute contours','natural understated hip and glute contours','softly rounded hip and glute contours','prominently rounded hip and glute contours with balanced anatomy','dramatically rounded, stylized yet anatomically coherent contours'],
  gluteProjection:['a subtle side-profile contour','a natural side-profile contour','a softly dimensional glute contour','a prominently projected yet balanced side-profile contour','a dramatic stylized projection with coherent anatomy'],
  thighFullness:['slender yet healthy thigh contours','natural thigh proportions','softly fuller thigh contours','prominently full yet balanced thigh contours','dramatically full, stylized yet anatomically coherent thigh contours'],
  legProportion:['a naturally compact leg-to-body ratio','a balanced leg-to-body ratio','a softly elongated leg line','a prominently elongated yet plausible leg line','a dramatic model-like leg line with coherent proportions'],
}

const band = (value:number) => value<=20?0:value<=40?1:value<=60?2:value<=80?3:4

export function getSliderSemantic(key:SliderKey,value:number) {
  const index=band(value)
  if(key==='visualImpact') {
    const zh=['自然生活寫真','自然曲線強調','時尚編輯感','強烈輪廓與視覺張力','戲劇化 Editorial 視覺'][index]
    const en=['Natural lifestyle','Curves emphasized','Fashion editorial','Strong visual tension','Dramatic editorial'][index]
    return {zh,en,description:`${zh}，只調整構圖與視覺語氣。`}
  }
  const zhBands=['細緻收斂','自然低調','柔和明確','鮮明但平衡','戲劇化但解剖合理']
  return {zh:zhBands[index],en:['Subtle','Natural','Softly defined','Prominent & balanced','Dramatic & coherent'][index],description:sliderPhrases[key][index]}
}

export function mapSliderToPromptFragment(key:SliderKey,value:number,mode:'natural'|'impact'='natural'):string {
  if(key==='visualImpact') {
    const natural=['natural lifestyle portrait restraint','subtle emphasis on natural silhouette','polished fashion-editorial presence','controlled silhouette emphasis and editorial tension','refined dramatic editorial presence'][band(value)]
    const impact=['clean lifestyle composition','defined natural silhouette','strong editorial composition','sculpted visual contour, powerful three-quarter composition, defined rim-lit silhouette','dramatic editorial presence, sculpted visual contour, dynamic fashion framing, rim-lit silhouette'][band(value)]
    return mode==='impact'?impact:natural
  }
  return sliderPhrases[key][band(value)]
}

const bodySliderKeys:Exclude<SliderKey,'visualImpact'>[]=['bustFullness','waistDefinition','hipWidth','gluteRoundness','gluteProjection','thighFullness','legProportion']
const coreParts=(state:BuilderStateV2)=>[
  'a completely fictional, clearly adult woman',selected(state.persona.regionStyle,'en'),selected(state.persona.ageBand,'en'),selected(state.persona.archetype,'en'),...state.persona.vibes.map(id=>selected(id,'en')),
  selected(state.face.faceShape,'en'),selected(state.face.featureVibe,'en'),selected(state.face.hairstyle,'en'),selected(state.face.makeup,'en'),selected(state.face.expression,'en'),selected(state.body.frame,'en'),
  ...bodySliderKeys.map(key=>mapSliderToPromptFragment(key,state.body[key])),selected(state.outfit.type,'en'),selected(state.outfit.color,'en'),selected(state.outfit.style,'en'),selected(state.outfit.fit,'en'),...state.outfit.accessories.map(id=>selected(id,'en')),
  selected(state.pose.yogaPose,'en')||selected(state.pose.basePose,'en'),selected(state.pose.bodyDirection,'en'),selected(state.pose.headDirection,'en'),selected(state.pose.handPosition,'en'),selected(state.pose.legPosition,'en'),
  selected(state.scene.location,'en'),selected(state.scene.time,'en'),selected(state.scene.atmosphere,'en'),selected(state.camera.framing,'en'),selected(state.camera.height,'en'),selected(state.camera.direction,'en'),selected(state.camera.photographyType,'en'),selected(state.camera.lensStyle,'en'),
  selected(state.lighting.lightType,'en'),selected(state.lighting.rimLight,'en'),selected(state.lighting.colorTone,'en'),selected(state.lighting.visualStyle,'en')
]
const safetyEnd=['mature adult presence','tasteful non-explicit photography','anatomically coherent proportions','realistic anatomy','original fictional identity','no resemblance to any real person']

export function buildNaturalPrompt(state:BuilderStateV2){return unique([...coreParts(state),mapSliderToPromptFragment('visualImpact',state.body.visualImpact,'natural'),...safetyEnd]).join(', ')}
export function buildHighImpactPrompt(state:BuilderStateV2){return unique([...coreParts(state),mapSliderToPromptFragment('visualImpact',state.body.visualImpact,'impact'),'controlled pose tension','editorial lighting with coherent body contours',...safetyEnd]).join(', ')}
export function buildCharacterSummary(state:BuilderStateV2){
  const vibes=state.persona.vibes.map(id=>findOption(id)?.labelZh).filter(Boolean).join('、')
  return unique([findOption(state.persona.archetype)?.labelZh??'虛構成年女性',findOption(state.persona.ageBand)?.labelZh??'明確成年',vibes,findOption(state.face.faceShape)?.labelZh??'',findOption(state.face.hairstyle)?.labelZh??'',findOption(state.face.makeup)?.labelZh??'',findOption(state.body.frame)?.labelZh??'',`視覺衝擊 ${state.body.visualImpact}`]).join('\n')
}
export function buildNegativePrompt(){return unique([...negativePromptTerms,'real person likeness','celebrity likeness','known public figure','identity preservation','fetishized body-part close-up']).join(', ')}
export function buildAllPrompts(state:BuilderStateV2){return `角色摘要\n────────\n${buildCharacterSummary(state)}\n\nNatural Portrait Prompt\n──────────────────────\n${buildNaturalPrompt(state)}\n\nHigh-Impact Editorial Prompt\n────────────────────────────\n${buildHighImpactPrompt(state)}\n\nNegative Prompt\n───────────────\n${buildNegativePrompt()}`}
export function validateBuilderState(state:BuilderStateV2):ValidationResult {const messages:string[]=[];if(state.schemaVersion!==2||state.dataVersion!=='0.2.0')messages.push('不支援的 Builder 資料版本。');if(Object.values(state.systemLocks).some(lock=>lock!==true))messages.push('固定安全鎖已恢復。');return{isValid:messages.length===0,messages}}
export function applyCharacterPreset(preset:CharacterPreset):BuilderStateV2{return structuredClone(preset.state)}
