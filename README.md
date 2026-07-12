# Safe Prompt Studio v0.1.0-alpha.2

**Phase 2｜Builder 核心功能版**

Safe Prompt Studio 是一套明確成年人、非露骨的時尚、泳裝、健身、瑜珈及生活寫真提示詞建構工具。使用者可透過選項式工作台，把零散構想整理成自然中文描述、結構化 English Prompt 與 Negative Prompt。

公開網站：[https://oorzz3.github.io/safe-prompt-studio/](https://oorzz3.github.io/safe-prompt-studio/)

## 安全範圍

- 僅提供明確成年、非露骨的寫真提示詞。
- 僅應使用本人、虛構人物或已獲合法授權的素材。
- 不提供未成年、年齡不明、裸體、露骨、偷拍、脅迫或非自願內容選項。
- Negative Prompt 僅為生成輔助，不保證符合其他平台規範。

## Phase 2 功能

- 六大 Builder 模組與細分組。
- 同組單選、跨組共存及固定安全限定。
- 中文、英文與 Negative Prompt 即時組合。
- 個別複製中文、英文、Negative Prompt，或一次複製全部內容。
- 非阻塞式複製成功／失敗提示。
- 姿態與瑜珈動作的基本相容處理。
- 清空、恢復預設及手機版上下排列。

## 六大模組

1. **身形**：整體體態、上半身曲線、腰部、臀胯、調整強度、解剖真實度。
2. **服裝**：服裝類型、顏色、服裝風格。
3. **姿態**：基礎姿態、瑜珈動作、身體與頭部方向、手部、腿部。
4. **場景**：地點、時間、氣氛。
5. **鏡位與構圖**：景別、鏡頭高度、拍攝方向、攝影類型。
6. **光線與風格**：光線、影像風格、固定啟用的 non-explicit 安全限定。

選項資料由 `src/data/` 內的 TypeScript 詞庫驅動。每個選項包含 `category`、`groupId`、`selectionMode`、中英文 Prompt、標籤、衝突、依賴及啟用狀態；詞庫維持 `schemaVersion: 1` 與 `dataVersion: "0.1.0"`。

## 相容規則

- 同一細分組僅保留最後選取的單一項目。
- 下犬式、貓牛式、坐姿前屈與橋式會移除不相容的站姿或坐姿。
- 下犬式與貓牛式自動採地面支撐。
- 坐姿伸展不會與一般站姿並存。
- 不合條件的地面支撐不會加入組合，介面會顯示原因。
- 停用選項與不存在的 ID 不會進入有效輸出。

## 開發與建置

需求：Node.js 22 及 npm。

```bash
npm install
npm run dev
npm run build
npm run preview
```

Vite 的 GitHub Pages base 固定為 `/safe-prompt-studio/`。Push 到 `main` 後，`.github/workflows/deploy.yml` 會執行 `npm ci`、建置並發布 `dist`。

## 專案結構

```text
src/
├─ components/   Builder 與輸出元件
├─ context/      Builder 共用狀態
├─ data/         六大模組詞庫與安全負面詞
├─ types/        Prompt 與未來收藏資料型別
├─ utils/        Prompt、相容規則及剪貼簿工具
└─ styles/       全站工作台樣式與 RWD
```

## 已知限制

- 尚未提供收藏配方、LocalStorage 或 JSON 匯入／匯出。
- 相容邏輯僅處理 Phase 2 明確規則，不是完整動作學規則引擎。
- 剪貼簿功能需要 HTTPS 或瀏覽器允許的安全環境。
- Google Fonts 無法載入時會使用後備字型。

## Phase 3 Roadmap

- 收藏配方與 LocalStorage。
- 配方載入及刪除。
- 損壞資料容錯。
- JSON 匯入／匯出。
- 收藏資料 `schemaVersion` 與遷移驗證。
