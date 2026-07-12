import { group, library } from './createLibrary'

const groups = [group('lighting-light', '光線', 'Lighting'), group('lighting-style', '影像風格', 'Visual style'), group('lighting-safety', '安全限定', 'Safety', 'fixed')]
const item = (id: string, groupId: string, labelZh: string, labelEn: string, zh: string, en: string, extra = {}) => ({ id, category: 'lighting', groupId, labelZh, labelEn, prompt: { zh, en }, tags: ['adult', 'style', 'non-explicit'], ...extra })
export const lightingOptions = library(groups, [
  item('light-natural', 'lighting-light', '自然光', 'Natural light', '自然光', 'natural light'), item('light-dawn', 'lighting-light', '清晨柔光', 'Dawn light', '清晨柔光', 'soft early-morning light'),
  item('light-sunset', 'lighting-light', '黃昏暖光', 'Golden-hour light', '黃昏暖色光線', 'warm golden-hour lighting'), item('light-indoor', 'lighting-light', '柔和室內光', 'Soft indoor light', '柔和室內光', 'soft indoor lighting'),
  item('light-backlit', 'lighting-light', '電影感逆光', 'Cinematic backlight', '電影感逆光', 'cinematic backlighting'), item('light-studio', 'lighting-light', '攝影棚柔光', 'Studio soft light', '攝影棚柔光', 'soft studio lighting'),
  item('style-fashion', 'lighting-style', 'fashion editorial', 'Fashion editorial', '時尚編輯影像風格', 'fashion editorial style'),
  item('style-fitness', 'lighting-style', 'fitness-inspired', 'Fitness-inspired', '健身靈感影像風格', 'fitness-inspired style'),
  item('style-lifestyle', 'lighting-style', 'lifestyle portrait', 'Lifestyle portrait', '生活感人像風格', 'lifestyle portrait style'),
  item('style-cinematic', 'lighting-style', 'cinematic portrait', 'Cinematic portrait', '電影感人像風格', 'cinematic portrait style'),
  item('style-clean', 'lighting-style', 'clean modern photography', 'Clean modern', '乾淨現代攝影風格', 'clean modern photography'),
  item('style-glamour', 'lighting-style', 'tasteful adult glamour', 'Tasteful glamour', '成熟雅緻的成人寫真風格', 'tasteful adult glamour photography'),
  item('safety-non-explicit', 'lighting-safety', 'non-explicit', 'Non-explicit', '非露骨呈現', 'non-explicit', { selectionMode: 'fixed' as const }),
])
