# Safe Prompt Studio v0.2.0-alpha.2.1

**主題依賴 × 智慧相容引擎版**

## Alpha.2.1 Prompt 平衡

- 七支身形滑桿維持 0–100，數值不會直接輸出或被降低。
- 身形先排序主要輪廓，Natural 最多突出一項、High-Impact 最多兩項。
- 下半身圓潤度與側面立體度同時入選時，會合併成一組完整描述。
- 多支高值會啟用整體輪廓壓縮，避免七段局部形容詞堆疊。
- `visualImpact` 單獨負責構圖、剪影、輪廓光與 Editorial 張力；`dramatic` 最多使用一次。
- 高值代表攝影與輪廓強度，不代表裸露或露骨程度。
- 平台判定不由本工具控制，本工具不保證任何 Prompt 一定通過審查。

### 人工外部測試紀錄

| 測試日期 | 使用平台 | Prompt 模式 | 滑桿組合 | 是否生成 | 生成前阻擋 | 生成後隱藏 | 畫面符合設定 | 人體自然 | 備註 |
|---|---|---|---|---|---|---|---|---|---|
|  |  | Natural / High-Impact |  |  |  |  |  |  |  |

虛構成年女性角色與寫真構圖 Prompt Builder。公開網站：<https://oorzz3.github.io/safe-prompt-studio/>

## 本版重點

- Builder State V3：`schemaVersion: 3`、`dataVersion: "0.2.1"`。
- 姿態改為 `pose.mode + pose.poseId`，不再同時保存一般姿態與瑜珈姿態。
- 身體方向與拍攝方向合併為唯一 `camera.subjectView`。
- 具體姿勢由動作包提供 implied values、欄位鎖定、可用視角與鏡位。
- compatibilityEngine 集中處理依賴、鎖定、Disabled 原因、變更預覽與驗證。
- 小型修正直接套用並顯示 Notice；三項以上變更使用確認 Dialog。
- Prompt Builder V3 只讀取解析後狀態，分開建立姿勢、支撐結構與主體視角片段。
- `poseId` 負責人物動作、`subjectView` 負責攝影機方向、`headDirection` 負責頭部與視線；後方鏡位不會僅因地面動作而被全面封鎖。
- 規則分為會破壞動作的 hard constraint，以及仍可選取的 recommendation／warning；柔和回望只顯示自然度提醒。
- 明確成年、完全虛構、非露骨、解剖保護永遠固定啟用。

## 動作模式與姿勢包

支援一般站姿、一般坐姿、動態、伸展、瑜珈與自訂模式。骨架姿勢包含自然站姿、側身站立、轉身回望、自然坐姿、自然行走、側向伸展、戰士式、下犬式、貓牛式、坐姿前屈與溫和橋式。

下犬式、貓牛式與橋式只鎖定完成動作必要的手腳及支撐結構。正面、側面、前後三分之四與背面視角仍可依攝影需求選擇；柔和回望由後方視角搭配頭部方向組成。真正不相容的景別或支撐選項才會 Disabled 並附原因。

## 開發

```bash
npm install
npm run dev
npm run build
npm run preview
```

GitHub Pages base 維持 `/safe-prompt-studio/`，`main` push 後由既有 GitHub Actions 發布。

## 已知限制

- 相容引擎目前集中於姿勢、手腳結構、主體視角與鏡位。
- 服裝與姿勢、場景與光線的完整條件依賴尚未建立。
- 尚未提供收藏、LocalStorage 或資料匯出。
- 不提供真人素材修改，也不保證其他圖像平台接受輸出。

## 下一階段

v0.2.0-alpha.3：都會職場 × 結構剪裁 × 曲線塑形，包括職場服裝家族、領口與開度、上身結構、腰線、下身輪廓及服裝與姿勢相容規則。
