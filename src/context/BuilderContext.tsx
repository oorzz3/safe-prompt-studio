import { createContext,useContext,useMemo,useState,type ReactNode } from 'react'
import { defaultState,emptyState } from '../data/presets'
import type { BuilderSection,BuilderStateV2,CharacterPreset,SliderKey } from '../types/builderV2'
import { applyCharacterPreset,validateBuilderState } from '../utils/promptBuilderV2'

interface BuilderContextValue {state:BuilderStateV2;messages:string[];setChoice:(section:BuilderSection,field:string,value:string)=>void;toggleList:(section:'persona'|'outfit',field:'vibes'|'accessories',value:string)=>void;setSlider:(key:SliderKey,value:number)=>void;applyPreset:(preset:CharacterPreset)=>void;clear:()=>void;reset:()=>void}
const BuilderContext=createContext<BuilderContextValue|null>(null)
const safeClone=(state:BuilderStateV2)=>structuredClone(state)

export function BuilderProvider({children}:{children:ReactNode}){
  const [state,setState]=useState<BuilderStateV2>(()=>safeClone(defaultState));const [messages,setMessages]=useState<string[]>([])
  const commit=(next:BuilderStateV2)=>{next.systemLocks={clearlyAdult:true,fictionalCharacter:true,nonExplicit:true,anatomyGuard:true};setMessages(validateBuilderState(next).messages);setState(next)}
  const setChoice=(section:BuilderSection,field:string,value:string)=>{const next=safeClone(state);(next[section] as unknown as Record<string,unknown>)[field]=value;commit(next)}
  const toggleList=(section:'persona'|'outfit',field:'vibes'|'accessories',value:string)=>{const next=safeClone(state);const record=next[section] as unknown as Record<string,unknown>;const current=record[field] as string[];record[field]=current.includes(value)?current.filter(id=>id!==value):[...current,value];commit(next)}
  const setSlider=(key:SliderKey,value:number)=>{const next=safeClone(state);next.body[key]=Math.max(0,Math.min(100,value));commit(next)}
  const value=useMemo(()=>({state,messages,setChoice,toggleList,setSlider,applyPreset:(preset:CharacterPreset)=>commit(applyCharacterPreset(preset)),clear:()=>commit(emptyState()),reset:()=>commit(safeClone(defaultState))}),[state,messages])
  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
}
export function useBuilder(){const value=useContext(BuilderContext);if(!value)throw new Error('useBuilder must be used inside BuilderProvider');return value}
