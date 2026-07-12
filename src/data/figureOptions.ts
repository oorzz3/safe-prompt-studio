import { group, library } from './createLibrary'

const groups = [
  group('figure-shape', '整體體態', 'Figure shape'),
  group('figure-upper', '上半身曲線', 'Upper-body line'),
  group('figure-waist', '腰部線條', 'Waist line'),
  group('figure-hip', '臀胯曲線', 'Hip line'),
  group('figure-strength', '調整強度', 'Adjustment'),
  group('figure-realism', '解剖真實度', 'Anatomy realism'),
]

const item = (id: string, groupId: string, labelZh: string, labelEn: string, zh: string, en: string) => ({ id, category: 'figure', groupId, labelZh, labelEn, prompt: { zh, en }, tags: ['adult', 'realistic', 'non-explicit'] })

export const figureOptions = library(groups, [
  item('figure-slender', 'figure-shape', '纖細勻稱', 'Slender', '纖細而勻稱的整體體態', 'a slender, well-balanced figure'),
  item('figure-natural', 'figure-shape', '自然勻稱', 'Natural', '自然勻稱的整體體態', 'a naturally proportioned figure'),
  item('figure-soft', 'figure-shape', '微肉柔和', 'Soft', '柔和而自然的微肉體態', 'a softly rounded, natural figure'),
  item('figure-curvy', 'figure-shape', '自然曲線', 'Natural curves', '自然且勻稱的曲線體態', 'a naturally curvy, balanced figure'),
  item('figure-athletic', 'figure-shape', '健美體態', 'Athletic', '健康結實的健美體態', 'a healthy athletic physique'),
  item('upper-natural', 'figure-upper', '自然比例', 'Natural proportion', '上半身比例自然', 'natural upper-body proportions'),
  item('upper-soft-full', 'figure-upper', '柔和豐滿', 'Soft fullness', '上半身曲線柔和豐滿', 'soft, fuller upper-body contours'),
  item('upper-defined-natural', 'figure-upper', '較明顯但自然', 'Defined but natural', '上半身曲線較明顯但維持自然', 'more defined yet natural upper-body contours'),
  item('waist-natural', 'figure-waist', '自然腰線', 'Natural waist', '腰線自然流暢', 'a natural waistline'),
  item('waist-defined', 'figure-waist', '線條明顯', 'Defined waist', '腰部線條清楚但合理', 'a clearly defined yet realistic waistline'),
  item('waist-slim', 'figure-waist', '較纖細腰線', 'Slender waist', '腰線較纖細且比例協調', 'a slender waist with balanced proportions'),
  item('hip-natural', 'figure-hip', '自然比例', 'Natural proportion', '臀胯維持自然比例', 'natural hip proportions'),
  item('hip-rounded', 'figure-hip', '圓潤曲線', 'Rounded curves', '臀胯呈現圓潤自然曲線', 'gently rounded hip contours'),
  item('hip-defined-ratio', 'figure-hip', '明顯但合理', 'Defined ratio', '腰臀比例明顯但合理', 'a defined yet realistic waist-to-hip ratio'),
  item('strength-subtle', 'figure-strength', '輕微', 'Subtle', '僅做輕微寫真調整', 'subtle photographic refinement'),
  item('strength-medium', 'figure-strength', '中度', 'Moderate', '做適度且自然的寫真調整', 'moderate, natural photographic refinement'),
  item('strength-editorial', 'figure-strength', '寫真美化', 'Editorial polish', '以寫真感適度美化線條', 'tasteful editorial figure refinement'),
  item('realism-high', 'figure-realism', '高真實', 'High realism', '維持高度真實的人體解剖', 'highly realistic anatomy'),
  item('realism-photo', 'figure-realism', '寫真美化', 'Photo polish', '在真實解剖基礎上寫真美化', 'photo-polished yet realistic anatomy'),
  item('realism-stylized', 'figure-realism', '風格化但合理', 'Stylized realism', '風格化呈現但保持合理解剖', 'stylized but anatomically plausible proportions'),
])
