import { group, library } from './createLibrary'

const groups = [group('scene-place', '場景地點', 'Location'), group('scene-time', '時間', 'Time'), group('scene-mood', '氣氛', 'Mood')]
const item = (id: string, groupId: string, labelZh: string, labelEn: string, zh: string, en: string) => ({ id, category: 'scene', groupId, labelZh, labelEn, prompt: { zh, en }, tags: ['adult', 'scene'] })
export const sceneOptions = library(groups, [
  item('scene-beach', 'scene-place', '海灘', 'Beach', '開闊乾淨的海灘', 'on a clean open beach'),
  item('scene-pool', 'scene-place', '泳池邊', 'Poolside', '現代渡假泳池邊', 'beside a modern resort pool'),
  item('scene-resort', 'scene-place', '渡假飯店', 'Resort hotel', '雅緻的渡假飯店', 'at an elegant resort hotel'),
  item('scene-balcony', 'scene-place', '海景陽台', 'Ocean balcony', '視野開闊的海景陽台', 'on a spacious ocean-view balcony'),
  item('scene-yoga-studio', 'scene-place', '瑜珈教室', 'Yoga studio', '寧靜明亮的瑜珈教室', 'inside a calm bright yoga studio'),
  item('scene-gym', 'scene-place', '健身空間', 'Fitness space', '乾淨現代的健身空間', 'inside a clean modern fitness space'),
  item('scene-photo-studio', 'scene-place', '室內攝影棚', 'Photo studio', '乾淨現代的室內攝影棚', 'inside a clean modern photo studio'),
  item('scene-home-light', 'scene-place', '居家自然光', 'Natural-light home', '採光柔和的居家空間', 'inside a softly lit home interior'),
  item('time-dawn', 'scene-time', '清晨', 'Dawn', '清晨時分', 'in the early morning'), item('time-day', 'scene-time', '白天', 'Daytime', '明亮白天', 'during bright daytime'),
  item('time-dusk', 'scene-time', '黃昏', 'Golden dusk', '黃昏時分', 'at golden dusk'), item('time-sunset', 'scene-time', '日落', 'Sunset', '日落時分', 'at sunset'),
  item('time-night-indoor', 'scene-time', '夜間室內', 'Indoor night', '夜間室內時段', 'in an evening interior'),
  item('mood-fresh', 'scene-mood', '清新', 'Fresh', '氣氛清新', 'with a fresh atmosphere'), item('mood-warm', 'scene-mood', '溫暖', 'Warm', '氣氛溫暖', 'with a warm atmosphere'),
  item('mood-relaxed', 'scene-mood', '放鬆愜意', 'Relaxed', '氣氛放鬆愜意', 'with a relaxed resort mood'), item('mood-active', 'scene-mood', '健康活力', 'Active', '氣氛健康而有活力', 'with a healthy energetic mood'),
  item('mood-elegant', 'scene-mood', '優雅時尚', 'Elegant', '氣氛優雅時尚', 'with an elegant fashionable mood'), item('mood-cinematic', 'scene-mood', '電影感', 'Cinematic', '氣氛富有電影感', 'with a cinematic atmosphere'),
])
