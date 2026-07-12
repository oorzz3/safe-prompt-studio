import type { PromptLibrary } from '../types/prompt'

export const figureOptions: PromptLibrary = {
  schemaVersion: 1,
  dataVersion: '0.1.0',
  options: [
    { id: 'figure-natural', category: 'build', labelZh: '自然勻稱', labelEn: 'Natural', prompt: { zh: '自然勻稱的成年女性體態', en: 'a naturally proportioned adult woman' }, tags: ['adult', 'realistic'], conflictsWith: [], requires: [], enabled: true },
    { id: 'figure-curvy', category: 'build', labelZh: '自然曲線', labelEn: 'Natural curves', prompt: { zh: '自然且勻稱的曲線體態', en: 'a naturally curvy and balanced figure' }, tags: ['adult', 'realistic', 'non-explicit'], conflictsWith: [], requires: [], enabled: true },
    { id: 'figure-athletic', category: 'build', labelZh: '健康健美', labelEn: 'Athletic', prompt: { zh: '健康而結實的體態線條', en: 'a healthy athletic physique with balanced proportions' }, tags: ['adult', 'fitness'], conflictsWith: [], requires: [], enabled: true },
  ],
}

