import { useEffect,useMemo,useRef,useState } from 'react'
import { useBuilder } from '../../context/BuilderContext'
import { copyToClipboard } from '../../utils/clipboard'
import { buildAllPrompts,buildCharacterSummary,buildHighImpactPrompt,buildNaturalPrompt,buildNegativePrompt } from '../../utils/promptBuilderV2'

export function PromptOutput(){
  const{state}=useBuilder();const[toast,setToast]=useState('');const timer=useRef<number|undefined>(undefined)
  const outputs=useMemo(()=>({summary:buildCharacterSummary(state),natural:buildNaturalPrompt(state),impact:buildHighImpactPrompt(state),negative:buildNegativePrompt()}),[state])
  useEffect(()=>()=>window.clearTimeout(timer.current),[])
  const notify=(message:string)=>{window.clearTimeout(timer.current);setToast(message);timer.current=window.setTimeout(()=>setToast(''),2400)}
  const copy=async(text:string,label:string)=>{try{await copyToClipboard(text);notify(`已複製${label}`)}catch{notify('複製失敗，請手動選取文字')}}
  return <aside className="output-panel">
    <div className="output-header"><span><i className="live-dot"/>角色輸出</span><small>FICTIONAL / LIVE</small></div>
    <OutputBlock label="角色摘要" sublabel="CHARACTER SUMMARY" text={outputs.summary} accent="violet" onCopy={()=>copy(outputs.summary,'角色摘要')} pre/>
    <OutputBlock label="自然寫真版" sublabel="NATURAL PORTRAIT PROMPT" text={outputs.natural} accent="blue" onCopy={()=>copy(outputs.natural,'自然寫真版')}/>
    <OutputBlock label="高衝擊時尚版" sublabel="HIGH-IMPACT EDITORIAL" text={outputs.impact} accent="amber" onCopy={()=>copy(outputs.impact,'高衝擊時尚版')}/>
    <OutputBlock label="Negative Prompt" sublabel="SAFETY & QUALITY" text={outputs.negative} accent="rose" onCopy={()=>copy(outputs.negative,' Negative Prompt')}/>
    <button className="copy-all" type="button" aria-label="複製角色摘要與全部 Prompt" onClick={()=>copy(buildAllPrompts(state),'全部內容')}><span>複製全部內容</span><small>COPY COMPLETE SET</small></button>
    <div className={`toast ${toast?'is-visible':''}`} role="status" aria-live="polite">{toast}</div>
  </aside>
}
function OutputBlock({label,sublabel,text,accent,onCopy,pre=false}:{label:string;sublabel:string;text:string;accent:string;onCopy:()=>void;pre?:boolean}){return <section className={`output-block ${accent}`}><div className="output-title"><div><h2>{label}</h2><small>{sublabel}</small></div><button type="button" aria-label={`複製${label}`} onClick={onCopy}>複製</button></div><p className={pre?'is-summary':''} tabIndex={0}>{text}</p></section>}
