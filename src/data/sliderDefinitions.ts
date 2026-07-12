import type { SliderDefinition } from '../types/builderV3'

export const sliderDefinitions: SliderDefinition[] = [
  { key:'bustFullness',labelZh:'上圍豐滿度',labelEn:'Bust fullness',description:'調整上半身輪廓，始終維持衣著與合理比例。' },
  { key:'waistDefinition',labelZh:'腰線收束度',labelEn:'Waist definition',description:'控制腰線從自然到鮮明的視覺程度。' },
  { key:'hipWidth',labelZh:'胯部寬度',labelEn:'Hip width',description:'調整胯部輪廓相對於整體骨架的寬度。' },
  { key:'gluteRoundness',labelZh:'臀部圓潤度',labelEn:'Glute roundness',description:'控制臀胯輪廓的圓潤感，不涉及裸露描述。' },
  { key:'gluteProjection',labelZh:'臀部立體度',labelEn:'Glute projection',description:'調整側面輪廓立體度並維持自然解剖。' },
  { key:'thighFullness',labelZh:'大腿豐盈度',labelEn:'Thigh fullness',description:'控制腿部線條從纖細到豐盈的平衡。' },
  { key:'legProportion',labelZh:'腿身比例',labelEn:'Leg proportion',description:'調整腿部在全身構圖中的修長感。' },
  { key:'visualImpact',labelZh:'視覺衝擊',labelEn:'Visual impact',description:'影響姿態張力、構圖、輪廓光與 Editorial 語氣，不控制露骨程度。' },
]
