import type { PromptLibrary } from '../types/prompt'

export const poseOptions: PromptLibrary = {
  schemaVersion: 1,
  dataVersion: '0.1.0',
  options: [
    { id: 'pose-standing', category: 'base', labelZh: '自然站姿', labelEn: 'Standing', prompt: { zh: '以放鬆自然的站姿入鏡', en: 'standing in a relaxed natural pose' }, tags: ['standing'], conflictsWith: ['pose-downward-dog'], requires: [], enabled: true },
    { id: 'pose-seated', category: 'base', labelZh: '優雅坐姿', labelEn: 'Seated', prompt: { zh: '以優雅放鬆的坐姿入鏡', en: 'seated in an elegant relaxed pose' }, tags: ['seated'], conflictsWith: ['pose-standing'], requires: [], enabled: true },
    { id: 'pose-side-view', category: 'direction', labelZh: '自然側身', labelEn: 'Side view', prompt: { zh: '身體自然側向鏡頭', en: 'body turned naturally to the side' }, tags: ['direction'], conflictsWith: [], requires: [], enabled: true },
    { id: 'pose-downward-dog', category: 'yoga', labelZh: '下犬式', labelEn: 'Downward dog', prompt: { zh: '做出穩定且專業的下犬式瑜珈動作', en: 'performing a stable professional downward-facing dog yoga pose' }, tags: ['yoga', 'grounded'], conflictsWith: ['pose-standing', 'pose-seated'], requires: [], enabled: true },
  ],
}

