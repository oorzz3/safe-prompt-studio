import { group, library } from './createLibrary'

const groups = [group('outfit-type', '服裝類型', 'Outfit type'), group('outfit-color', '顏色', 'Color'), group('outfit-style', '服裝風格', 'Outfit style')]
const item = (id: string, groupId: string, labelZh: string, labelEn: string, zh: string, en: string) => ({ id, category: 'outfit', groupId, labelZh, labelEn, prompt: { zh, en }, tags: ['adult', 'fashion', 'non-explicit'] })

export const outfitOptions = library(groups, [
  item('outfit-one-piece', 'outfit-type', '連身泳裝', 'One-piece swimsuit', '剪裁簡潔的連身泳裝', 'an elegant one-piece swimsuit'),
  item('outfit-sport-bikini', 'outfit-type', '運動型比基尼', 'Sporty bikini', '包覆合宜的運動型比基尼', 'a well-fitted sporty bikini'),
  item('outfit-elegant-swimwear', 'outfit-type', '優雅泳裝', 'Elegant swimwear', '設計優雅的泳裝', 'elegant designer swimwear'),
  item('outfit-sports-bra-leggings', 'outfit-type', '運動內衣與瑜珈褲', 'Sports bra & leggings', '專業運動內衣與瑜珈褲', 'a professional sports bra and yoga leggings'),
  item('outfit-yoga-set', 'outfit-type', '合身瑜珈套裝', 'Fitted yoga set', '合身而專業的瑜珈套裝', 'a fitted professional yoga set'),
  item('outfit-resort', 'outfit-type', '夏季度假穿搭', 'Summer resort wear', '輕盈的夏季度假穿搭', 'light summer resort wear'),
  item('outfit-cover-up', 'outfit-type', '沙灘罩衫', 'Beach cover-up', '優雅輕盈的沙灘罩衫', 'an elegant lightweight beach cover-up'),
  item('color-black', 'outfit-color', '黑色', 'Black', '黑色', 'in black'), item('color-white', 'outfit-color', '白色', 'White', '白色', 'in white'),
  item('color-navy', 'outfit-color', '深藍', 'Navy', '深藍色', 'in deep navy'), item('color-sky', 'outfit-color', '天空藍', 'Sky blue', '天空藍', 'in sky blue'),
  item('color-orange', 'outfit-color', '暖橘', 'Warm orange', '暖橘色', 'in warm orange'), item('color-pink', 'outfit-color', '柔粉', 'Soft pink', '柔粉色', 'in soft pink'),
  item('color-earth', 'outfit-color', '大地色', 'Earth tone', '大地色系', 'in earthy tones'),
  item('outfit-style-minimal', 'outfit-style', '簡約', 'Minimal', '簡約風格', 'with minimal styling'),
  item('outfit-style-sporty', 'outfit-style', '運動感', 'Sporty', '俐落運動風格', 'with clean sporty styling'),
  item('outfit-style-elegant', 'outfit-style', '優雅', 'Elegant', '優雅風格', 'with elegant styling'),
  item('outfit-style-fresh', 'outfit-style', '清爽', 'Fresh', '清爽明亮的風格', 'with fresh, light styling'),
  item('outfit-style-editorial', 'outfit-style', '時尚寫真', 'Fashion editorial', '時尚寫真風格', 'with fashion-editorial styling'),
])
