import type { PromptLibrary } from '../types/prompt'

export const outfitOptions: PromptLibrary = {
  schemaVersion: 1,
  dataVersion: '0.1.0',
  options: [
    { id: 'outfit-one-piece', category: 'swimwear', labelZh: '連身泳裝', labelEn: 'One-piece swimsuit', prompt: { zh: '穿著剪裁簡潔的連身泳裝', en: 'wearing an elegant one-piece swimsuit' }, tags: ['adult', 'swimwear'], conflictsWith: [], requires: [], enabled: true },
    { id: 'outfit-activewear', category: 'fitness', labelZh: '運動套裝', labelEn: 'Activewear set', prompt: { zh: '穿著合身而專業的運動套裝', en: 'wearing a fitted professional activewear set' }, tags: ['adult', 'fitness'], conflictsWith: [], requires: [], enabled: true },
    { id: 'outfit-resort', category: 'resort', labelZh: '渡假穿搭', labelEn: 'Resort wear', prompt: { zh: '穿著輕盈優雅的夏季度假服裝', en: 'wearing elegant light summer resort wear' }, tags: ['adult', 'fashion'], conflictsWith: [], requires: [], enabled: true },
  ],
}

