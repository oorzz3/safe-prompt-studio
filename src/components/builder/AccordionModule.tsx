import { useState,type ReactNode } from 'react'

export function AccordionModule({index,title,eyebrow,summary,defaultOpen=false,children}:{index:string;title:string;eyebrow:string;summary:string;defaultOpen?:boolean;children:ReactNode}){
  const [open,setOpen]=useState(defaultOpen);const panelId=`module-${index}`
  return <section className={`accordion-module ${open?'is-open':''}`}>
    <button className="accordion-trigger" type="button" aria-expanded={open} aria-controls={panelId} onClick={()=>setOpen(value=>!value)}>
      <span className="module-number">{index}</span><span className="module-identity"><small>{eyebrow}</small><b>{title}</b></span><span className="module-summary">{summary}</span><span className="chevron" aria-hidden="true">{open?'−':'+'}</span>
    </button>
    {open&&<div className="accordion-content" id={panelId}>{children}</div>}
  </section>
}
