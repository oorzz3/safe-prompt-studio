export type SliderKey = 'bustFullness' | 'waistDefinition' | 'hipWidth' | 'gluteRoundness' | 'gluteProjection' | 'thighFullness' | 'legProportion' | 'visualImpact'

export interface BuilderStateV2 {
  schemaVersion: 2
  dataVersion: '0.2.0'
  persona: { regionStyle: string; ageBand: string; archetype: string; vibes: string[] }
  face: { faceShape: string; featureVibe: string; hairstyle: string; makeup: string; expression: string }
  body: { frame: string; bustFullness: number; waistDefinition: number; hipWidth: number; gluteRoundness: number; gluteProjection: number; thighFullness: number; legProportion: number; visualImpact: number }
  outfit: { type: string; color: string; style: string; fit: string; accessories: string[] }
  pose: { basePose: string; yogaPose: string; bodyDirection: string; headDirection: string; handPosition: string; legPosition: string }
  scene: { location: string; time: string; atmosphere: string }
  camera: { framing: string; height: string; direction: string; photographyType: string; lensStyle: string }
  lighting: { lightType: string; visualStyle: string; rimLight: string; colorTone: string }
  systemLocks: { clearlyAdult: true; fictionalCharacter: true; nonExplicit: true; anatomyGuard: true }
}

export type BuilderSection = keyof Omit<BuilderStateV2, 'schemaVersion' | 'systemLocks'>

export interface V2Option {
  id: string
  labelZh: string
  labelEn: string
  prompt: { zh: string; en: string }
}

export interface SliderDefinition {
  key: SliderKey
  labelZh: string
  labelEn: string
  description: string
}

export interface CharacterPreset {
  id: string
  name: string
  eyebrow: string
  description: string
  state: BuilderStateV2
}

export interface ValidationResult { isValid: boolean; messages: string[] }
