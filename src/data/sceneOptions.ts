import type { PromptLibrary } from '../types/prompt'

export const sceneOptions: PromptLibrary = {
  schemaVersion: 1,
  dataVersion: '0.1.0',
  options: [
    { id: 'scene-beach', category: 'location', labelZh: '海灘', labelEn: 'Beach', prompt: { zh: '場景位於開闊乾淨的海灘', en: 'on a clean open beach' }, tags: ['outdoor'], conflictsWith: [], requires: [], enabled: true },
    { id: 'scene-yoga-studio', category: 'location', labelZh: '瑜珈教室', labelEn: 'Yoga studio', prompt: { zh: '場景位於寧靜明亮的瑜珈教室', en: 'inside a calm bright yoga studio' }, tags: ['indoor', 'fitness'], conflictsWith: [], requires: [], enabled: true },
    { id: 'scene-photo-studio', category: 'location', labelZh: '攝影棚', labelEn: 'Photo studio', prompt: { zh: '場景位於乾淨現代的室內攝影棚', en: 'inside a clean modern photo studio' }, tags: ['indoor', 'editorial'], conflictsWith: [], requires: [], enabled: true },
  ],
}

