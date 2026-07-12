import type { V2Option } from '../../types/builderV2'
export function ChoiceField({label,options,value,onChange,multiple=false}:{label:string;options:readonly V2Option[];value:string|string[];onChange:(id:string)=>void;multiple?:boolean}){
  const values=Array.isArray(value)?value:[value]
  return <fieldset className="choice-field"><legend><span>{label}</span><small>{multiple?'可複選':'單選'}</small></legend><div className="choice-grid">{options.map(option=>{const active=values.includes(option.id);return <button key={option.id} type="button" aria-pressed={active} className={`choice-chip ${active?'is-active':''}`} onClick={()=>onChange(option.id)}><span>{option.labelZh}</span><small>{option.labelEn}</small></button>})}</div></fieldset>
}
