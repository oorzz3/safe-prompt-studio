import type { PromptLibrary } from '../types/prompt'

export const cameraOptions: PromptLibrary = {
  schemaVersion: 1,
  dataVersion: '0.1.0',
  options: [
    { id: 'camera-full-body', category: 'framing', labelZh: '全身構圖', labelEn: 'Full body', prompt: { zh: '採全身構圖與自然視角', en: 'full-body composition at eye level' }, tags: ['framing'], conflictsWith: ['camera-portrait'], requires: [], enabled: true },
    { id: 'camera-half-body', category: 'framing', labelZh: '半身構圖', labelEn: 'Half body', prompt: { zh: '採平視半身構圖', en: 'waist-up composition at eye level' }, tags: ['framing'], conflictsWith: ['camera-full-body', 'camera-portrait'], requires: [], enabled: true },
    { id: 'camera-portrait', category: 'framing', labelZh: '肖像特寫', labelEn: 'Portrait close-up', prompt: { zh: '採臉部與肩頸為主的肖像特寫', en: 'tasteful face-and-shoulders portrait close-up' }, tags: ['portrait', 'safe-close-up'], conflictsWith: ['camera-full-body', 'camera-half-body'], requires: [], enabled: true },
  ],
}

