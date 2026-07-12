import type { BuilderStateV2, CharacterPreset } from '../types/builderV2'

const locks = { clearlyAdult:true, fictionalCharacter:true, nonExplicit:true, anatomyGuard:true } as const

export const defaultState: BuilderStateV2 = {
  schemaVersion:2,
  dataVersion:'0.2.0',
  persona:{regionStyle:'region-taiwan-urban',ageBand:'age-35-40',archetype:'arch-taiwan-sister',vibes:['vibe-confident','vibe-intellectual']},
  face:{faceShape:'face-oval',featureVibe:'features-intellectual',hairstyle:'hair-long-wave',makeup:'makeup-urban',expression:'expr-smile'},
  body:{frame:'frame-curvy',bustFullness:58,waistDefinition:58,hipWidth:54,gluteRoundness:58,gluteProjection:52,thighFullness:48,legProportion:55,visualImpact:55},
  outfit:{type:'outfit-one-piece',color:'color-navy',style:'ostyle-editorial',fit:'fit-fitted',accessories:['acc-earrings']},
  pose:{basePose:'pose-side',yogaPose:'yoga-none',bodyDirection:'body-three',headDirection:'head-distance',handPosition:'hands-waist',legPosition:'legs-bent'},
  scene:{location:'scene-beach',time:'time-sunset',atmosphere:'mood-warm'},
  camera:{framing:'frame-full',height:'cam-low',direction:'shot-three',photographyType:'photo-editorial',lensStyle:'lens-50'},
  lighting:{lightType:'light-sunset',visualStyle:'style-fashion',rimLight:'rim-soft',colorTone:'tone-warm'},
  systemLocks:locks,
}

const createPreset = (id:string,name:string,eyebrow:string,description:string,mutate:(state:BuilderStateV2)=>void):CharacterPreset => {
  const state = structuredClone(defaultState); mutate(state); return {id,name,eyebrow,description,state}
}

export const characterPresets: CharacterPreset[] = [
  createPreset('preset-urban','台灣都會御姊','URBAN EDITORIAL','自信知性的成熟都會角色，適合時尚寫真。',s=>{s.persona={regionStyle:'region-taiwan-urban',ageBand:'age-35-40',archetype:'arch-executive',vibes:['vibe-confident','vibe-intellectual']};s.face={faceShape:'face-long',featureVibe:'features-cool',hairstyle:'hair-long-wave',makeup:'makeup-urban',expression:'expr-focused'};s.body.frame='frame-curvy';s.body.visualImpact=60}),
  createPreset('preset-yoga','成熟瑜珈教練','FITNESS PORTRAIT','健康有力量的成熟教練角色，採自然運動攝影。',s=>{s.persona={regionStyle:'region-east-asia',ageBand:'age-30-35',archetype:'arch-yoga',vibes:['vibe-energetic','vibe-calm']};s.face={faceShape:'face-oval',featureVibe:'features-fresh',hairstyle:'hair-high-pony',makeup:'makeup-sport',expression:'expr-focused'};s.body.frame='frame-athletic';s.body.visualImpact=45;s.outfit.type='outfit-yoga';s.outfit.style='ostyle-sport';s.pose={basePose:'pose-standing',yogaPose:'yoga-warrior',bodyDirection:'body-three',headDirection:'head-camera',handPosition:'hands-natural',legPosition:'legs-yoga'};s.scene={location:'scene-yoga',time:'time-day',atmosphere:'mood-active'};s.camera.height='cam-eye';s.camera.photographyType='photo-fitness';s.lighting={lightType:'light-natural',visualStyle:'style-fitness',rimLight:'rim-none',colorTone:'tone-neutral'}}),
  createPreset('preset-island','海島度假御姊','RESORT STORY','優雅放鬆的虛構旅人，帶有夕陽與度假光澤。',s=>{s.persona={regionStyle:'region-taiwan-island',ageBand:'age-30-35',archetype:'arch-island',vibes:['vibe-elegant','vibe-gentle']};s.face={faceShape:'face-oval',featureVibe:'features-gentle',hairstyle:'hair-wet-beach',makeup:'makeup-resort',expression:'expr-distance'};s.body.frame='frame-soft';s.body.visualImpact=65;s.outfit.type='outfit-resort';s.outfit.style='ostyle-elegant';s.scene={location:'scene-beach',time:'time-sunset',atmosphere:'mood-relaxed'}}),
]

export const emptyState = ():BuilderStateV2 => ({
  schemaVersion:2,dataVersion:'0.2.0',persona:{regionStyle:'',ageBand:'',archetype:'',vibes:[]},face:{faceShape:'',featureVibe:'',hairstyle:'',makeup:'',expression:''},
  body:{frame:'',bustFullness:0,waistDefinition:0,hipWidth:0,gluteRoundness:0,gluteProjection:0,thighFullness:0,legProportion:0,visualImpact:0},
  outfit:{type:'',color:'',style:'',fit:'',accessories:[]},pose:{basePose:'',yogaPose:'',bodyDirection:'',headDirection:'',handPosition:'',legPosition:''},
  scene:{location:'',time:'',atmosphere:''},camera:{framing:'',height:'',direction:'',photographyType:'',lensStyle:''},lighting:{lightType:'',visualStyle:'',rimLight:'',colorTone:''},systemLocks:locks,
})
