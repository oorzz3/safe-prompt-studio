import type { PromptLibrary } from '../types/prompt'

export const lightingOptions: PromptLibrary = {
  schemaVersion: 1,
  dataVersion: '0.1.0',
  options: [
    { id: 'lighting-natural', category: 'light', labelZh: '柔和自然光', labelEn: 'Soft natural light', prompt: { zh: '以柔和自然光呈現', en: 'soft natural light' }, tags: ['light'], conflictsWith: [], requires: [], enabled: true },
    { id: 'lighting-sunset', category: 'light', labelZh: '黃昏暖光', labelEn: 'Golden hour', prompt: { zh: '沐浴在黃昏暖色光線中', en: 'warm golden-hour lighting' }, tags: ['light', 'cinematic'], conflictsWith: [], requires: [], enabled: true },
    { id: 'style-editorial', category: 'style', labelZh: '時尚編輯風格', labelEn: 'Fashion editorial', prompt: { zh: '呈現乾淨現代的時尚編輯攝影感', en: 'clean modern fashion editorial photography' }, tags: ['style', 'non-explicit'], conflictsWith: [], requires: [], enabled: true },
  ],
}

