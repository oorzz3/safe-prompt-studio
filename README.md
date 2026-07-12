# Safe Prompt Studio v0.2.0-alpha.1

**虛構成年女性角色 × 寫真構圖 Prompt Builder**

Safe Prompt Studio 是一套從零建立明確成年、完全虛構且非露骨的女性角色與攝影構圖提示詞工作台。使用者可組合角色氣質、臉部髮妝、身形曲線、服裝、姿態、場景與鏡位，並同步取得自然寫真版及高衝擊 Editorial Prompt。

公開網站：[https://oorzz3.github.io/safe-prompt-studio/](https://oorzz3.github.io/safe-prompt-studio/)

## 產品定位與安全範圍

- 僅建立原創、明確成年、虛構且非露骨的女性角色。
- 不進行真人身分保留、真人臉孔修改、名人相似生成或真人素材情色化。
- 不提供未成年人、年齡不明、裸露、露骨、偷拍、脅迫或非自願內容。
- Clearly Adult、Fictional Character、Non-Explicit、Anatomy Guard 為不可關閉的固定安全鎖。
- Negative Prompt 是生成輔助，不保證其他平台一定接受生成內容。

## v0.2.0-alpha.1 骨架功能

- 八大 Accordion 模組：角色原型、臉部髮妝、身形曲線、服裝、姿態、場景、鏡位及光線。
- 地區文化風格、明確成年年齡帶、角色原型與複選氣質。
- 臉型、五官氣質、髮型、妝容及表情。
- 基礎體態與八支 0–100 語意滑桿。
- `visualImpact` 視覺衝擊控制器，只影響輪廓、姿態張力、構圖、光線與 Editorial 語氣。
- 三個快速角色原型，套用後仍可逐項修改。
- 角色摘要、Natural Portrait Prompt、High-Impact Editorial Prompt 與 Negative Prompt。
- 四區獨立複製與全部複製。
- 桌面 Sticky Output、獨立捲動及手機單欄 RWD。

## Builder State V2

新版狀態使用 `schemaVersion: 2`，分為：

```text
persona → regionStyle / ageBand / archetype / vibes
face → faceShape / featureVibe / hairstyle / makeup / expression
body → frame / 7 個部位滑桿 / visualImpact
outfit → type / color / style / fit / accessories
pose → basePose / yogaPose / bodyDirection / headDirection / handPosition / legPosition
scene → location / time / atmosphere
camera → framing / height / direction / photographyType / lensStyle
lighting → lightType / visualStyle / rimLight / colorTone
systemLocks → clearlyAdult / fictionalCharacter / nonExplicit / anatomyGuard
```

資料版本為 `dataVersion: "0.2.0"` 的角色骨架方向；目前沒有啟用 LocalStorage。未來若遇到舊 `schemaVersion: 1` 配方，將安全忽略或恢復新版預設，不進行複雜遷移。

## 身形滑桿

身形數值不會直接輸出到 Prompt。`mapSliderToPromptFragment()` 會依 0–20、21–40、41–60、61–80、81–100 五段，把每個部位轉成專屬、解剖合理的英文片段。即使使用極端值，固定結尾仍保留 `anatomically coherent proportions` 與 `realistic anatomy`。

## 開發與部署

需求：Node.js 22 及 npm。

```bash
npm install
npm run dev
npm run build
npm run preview
```

Vite GitHub Pages base 固定為 `/safe-prompt-studio/`。Push 到 `main` 後，`.github/workflows/deploy.yml` 會執行 `npm ci`、建置並發布 `dist`。

## 已知限制

- 詞庫仍是證明新版資料流的骨架版，尚未補滿所有排列組合。
- 尚未完成可由使用者管理的角色預設。
- 尚未提供收藏、LocalStorage、JSON 匯入／匯出或舊配方遷移。
- 不提供真人素材修圖模式。
- 不保證 Prompt 一定被其他生成平台接受。
- 剪貼簿需在 HTTPS 或瀏覽器允許的安全環境使用。

## 下一階段 Roadmap

- 完整角色原型與臉部髮妝詞庫。
- 更細緻的身形滑桿語意。
- 角色預設管理與收藏配方。
- JSON 匯入／匯出及 schema 驗證。
- Prompt 平台適配模式。
- 更多瑜珈動作與攝影構圖預設。
