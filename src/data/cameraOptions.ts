import { group, library } from './createLibrary'

const groups = [group('camera-framing', '景別', 'Framing'), group('camera-height', '鏡頭高度', 'Camera height'), group('camera-direction', '拍攝方向', 'Shooting direction'), group('camera-type', '攝影類型', 'Photography type')]
const item = (id: string, groupId: string, labelZh: string, labelEn: string, zh: string, en: string) => ({ id, category: 'camera', groupId, labelZh, labelEn, prompt: { zh, en }, tags: ['camera', 'safe-composition'] })
export const cameraOptions = library(groups, [
  item('camera-full-body', 'camera-framing', '全身', 'Full body', '全身景別', 'full-body framing'), item('camera-thigh-up', 'camera-framing', '大腿以上', 'Thigh-up', '大腿以上景別', 'thigh-up framing'),
  item('camera-half-body', 'camera-framing', '半身', 'Half body', '半身景別', 'waist-up framing'), item('camera-portrait', 'camera-framing', '肖像特寫', 'Portrait close-up', '臉部與肩頸為主的肖像特寫', 'tasteful face-and-shoulders portrait close-up'),
  item('camera-eye', 'camera-height', '平視', 'Eye level', '平視角度', 'eye-level camera angle'), item('camera-low', 'camera-height', '微低角度', 'Slightly low', '微低鏡頭角度', 'slightly low camera angle'), item('camera-high', 'camera-height', '微高角度', 'Slightly high', '微高鏡頭角度', 'slightly high camera angle'),
  item('shot-front', 'camera-direction', '正面拍攝', 'Front view', '正面拍攝', 'front-view composition'), item('shot-side', 'camera-direction', '側面拍攝', 'Side view', '側面拍攝', 'side-view composition'),
  item('shot-three-quarter', 'camera-direction', '三分之四側拍', 'Three-quarter view', '三分之四側拍', 'three-quarter-view composition'), item('shot-back-look', 'camera-direction', '背面回望構圖', 'Back look', '背面回望構圖', 'tasteful over-the-shoulder composition'),
  item('photo-editorial', 'camera-type', 'editorial', 'Editorial', '時尚編輯攝影', 'editorial photography'), item('photo-portrait', 'camera-type', 'portrait', 'Portrait', '人像攝影', 'portrait photography'),
  item('photo-lifestyle', 'camera-type', 'lifestyle', 'Lifestyle', '生活風格攝影', 'lifestyle photography'), item('photo-fitness', 'camera-type', 'fitness photography', 'Fitness', '健身主題攝影', 'fitness photography'),
])
