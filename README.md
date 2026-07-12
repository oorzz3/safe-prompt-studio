# Safe Prompt Studio v0.2.0-alpha.3.1

**主題依賴 × 智慧相容引擎版**

## Alpha.3.1 上身體積與 Full-bust 剪裁

- 新增五種上身體積呈現方式，以及胸省、公主線、胸下支撐、前片立體容量與 Full-bust 專屬版型。
- `bustFullness` 81–90 與 91–100 改用不同的三維體積及胸腰落差語意；60／100 對照不再只差一般程度形容詞。
- 曲線聚焦真正接管主要特徵排序，Impact Source 分別控制身形、服裝剪裁或鏡位光線的表達策略。
- 姿勢、手部、景別與視角只產生非阻擋式呈現建議，不會修改使用者身形、姿勢或鏡位設定。
- Prompt 建構階段合併重複的 `structured`、`tailored` 與 `shaped` 描述；`fully opaque`、`secure coverage` 各保留一次。
- 高上圍值透過服裝版型、三維體積與胸腰落差呈現，不透過裸露、衣物破裂或鈕扣繃開表達。

平台最終生成結果仍不由本工具保證。

## Alpha.3 都會職場與結構剪裁

- 新增 Swimwear、Activewear、Resort Wear、Urban Office Editorial 四個服裝家族。
- 職場服裝可分別設定上身、領口、開放程度、胸腰結構、腰線、下身輪廓、材質及外套。
- 結構式深 V 是設計完成且具有 secure coverage 的服裝剪裁，不是無限制解開鈕扣。
- 所有職場材質固定 `opacityLock: true`，Prompt 固定加入 fully opaque 與 secure structured coverage。
- 曲線聚焦只調整 Prompt 優先順序，不修改身形滑桿；Impact Source 決定衝擊主要來自身形、剪裁或鏡位光線。
- 地面瑜珈與限制腿部活動的職場裙裝會由相容引擎阻擋並建議切換運動服裝；西裝褲搭配戰士式只提供建議，不全面禁止。
- 新增台灣都會主管、高衝擊職場 Editorial、知性成熟上班族三個快速預設。

高衝擊來自剪裁、輪廓、構圖與光線；不提供透明、走光、衣物破裂、鈕扣繃開或露骨職場描述。本工具不保證其他平台接受輸出。

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

- Builder State V4：`schemaVersion: 5`、`dataVersion: "0.2.3"`。
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
