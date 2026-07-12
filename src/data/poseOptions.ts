import { group, library } from './createLibrary'

const groups = [
  group('pose-base', '基礎姿態', 'Base pose'), group('pose-yoga', '瑜珈動作', 'Yoga pose'),
  group('pose-body-direction', '身體方向', 'Body direction'), group('pose-head', '頭部方向', 'Head direction'),
  group('pose-hands', '手部位置', 'Hands'), group('pose-legs', '腿部姿態', 'Legs'),
]
const item = (id: string, groupId: string, labelZh: string, labelEn: string, zh: string, en: string, extra = {}) => ({ id, category: 'pose', groupId, labelZh, labelEn, prompt: { zh, en }, tags: ['adult', 'pose'], ...extra })

export const poseOptions = library(groups, [
  item('pose-standing', 'pose-base', '自然站姿', 'Natural standing', '自然放鬆地站立', 'standing in a relaxed natural pose'),
  item('pose-seated', 'pose-base', '自然坐姿', 'Natural seated', '以自然放鬆的坐姿呈現', 'seated in a relaxed natural pose'),
  item('pose-squat', 'pose-base', '半蹲姿態', 'Half squat', '以穩定自然的半蹲姿態呈現', 'in a stable natural half-squat pose'),
  item('pose-side-stand', 'pose-base', '側身站立', 'Side standing', '自然側身站立', 'standing naturally in side profile'),
  item('pose-look-back', 'pose-base', '轉身回望', 'Turned look-back', '自然轉身回望', 'turning back with a natural over-the-shoulder glance'),
  item('pose-relaxed-stretch', 'pose-base', '放鬆伸展', 'Relaxed stretch', '做出放鬆柔和的伸展姿態', 'performing a gentle relaxed stretch'),
  item('yoga-none', 'pose-yoga', '無瑜珈動作', 'No yoga pose', '', ''),
  item('yoga-warrior', 'pose-yoga', '戰士式', 'Warrior pose', '做出穩定的戰士式瑜珈動作', 'performing a stable warrior yoga pose'),
  item('yoga-seated-fold', 'pose-yoga', '坐姿前屈', 'Seated forward fold', '做出舒展的坐姿前屈', 'performing a controlled seated forward fold'),
  item('yoga-side-stretch', 'pose-yoga', '側向伸展', 'Side stretch', '做出流暢的側向伸展', 'performing a graceful side stretch'),
  item('yoga-downward-dog', 'pose-yoga', '下犬式', 'Downward dog', '做出穩定且專業的下犬式', 'performing a stable professional downward-facing dog pose'),
  item('yoga-cat-cow', 'pose-yoga', '貓牛式', 'Cat-cow', '做出穩定流暢的貓牛式', 'performing a controlled cat-cow yoga pose'),
  item('yoga-bridge', 'pose-yoga', '溫和橋式', 'Gentle bridge', '做出安全溫和的橋式', 'performing a gentle supported bridge pose'),
  item('body-front', 'pose-body-direction', '正面', 'Front-facing', '身體朝向正面', 'body facing forward'),
  item('body-side', 'pose-body-direction', '側面', 'Side-facing', '身體朝向側面', 'body oriented to the side'),
  item('body-three-quarter', 'pose-body-direction', '三分之四側面', 'Three-quarter', '身體呈三分之四側面', 'body in a three-quarter angle'),
  item('body-back-look', 'pose-body-direction', '背面回望', 'Back look', '背向鏡頭並自然回望', 'body turned away with a tasteful look back'),
  item('head-camera', 'pose-head', '看向鏡頭', 'Look at camera', '頭部自然看向鏡頭', 'head turned naturally toward the camera'),
  item('head-side', 'pose-head', '看向側邊', 'Look sideways', '頭部看向側邊', 'gaze directed to the side'),
  item('head-distance', 'pose-head', '看向遠方', 'Look into distance', '視線看向遠方', 'gaze directed into the distance'),
  item('head-down', 'pose-head', '自然低頭', 'Gaze down', '頭部自然微低', 'head gently lowered'),
  item('hands-natural', 'pose-hands', '自然垂放', 'Relaxed hands', '雙手自然垂放', 'arms and hands resting naturally'),
  item('hands-waist', 'pose-hands', '輕扶腰部', 'Hand at waist', '一手輕扶腰部', 'one hand resting lightly at the waist'),
  item('hands-hair', 'pose-hands', '撥動頭髮', 'Touching hair', '一手自然撥動頭髮', 'one hand naturally adjusting the hair'),
  item('hands-thigh', 'pose-hands', '放在大腿', 'Hands on thigh', '雙手自然放在大腿上', 'hands resting naturally on the thighs'),
  item('hands-ground', 'pose-hands', '支撐地面', 'Ground support', '雙手穩定支撐地面', 'hands placed firmly on the ground for support', { requires: ['ground-compatible-pose'] }),
  item('hands-up', 'pose-hands', '向上伸展', 'Arms extended', '雙手向上自然伸展', 'arms extended gracefully upward'),
  item('legs-standing', 'pose-legs', '自然直立', 'Natural standing', '雙腿自然直立', 'legs in a natural standing position'),
  item('legs-crossed', 'pose-legs', '雙腿交錯', 'Crossed legs', '雙腿自然交錯', 'legs gently crossed'),
  item('legs-bent', 'pose-legs', '單腿微彎', 'One leg bent', '單腿自然微彎', 'one leg gently bent'),
  item('legs-seated-stretch', 'pose-legs', '坐姿伸展', 'Seated stretch', '雙腿呈坐姿伸展狀態', 'legs extended in a seated stretch'),
  item('legs-yoga-stand', 'pose-legs', '穩定瑜珈站姿', 'Yoga stance', '雙腿呈穩定瑜珈站姿', 'legs grounded in a stable yoga stance'),
])
