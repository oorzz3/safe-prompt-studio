import { AccordionModule } from "./components/builder/AccordionModule";
import { ChoiceField } from "./components/builder/ChoiceField";
import { QuickPresets } from "./components/builder/QuickPresets";
import { SliderField } from "./components/builder/SliderField";
import { PromptOutput } from "./components/output/PromptOutput";
import { useBuilder } from "./context/BuilderContext";
import { options, findOption } from "./data/builderOptions";
import {
  compositionOptions as c,
  findCompositionOption,
} from "./data/compositionOptions";
import { officeOptions as oo, findOfficeOption } from "./data/officeOptions";
import { poseDefinitions, poseModes, getPose } from "./data/poseDefinitions";
import { sliderDefinitions } from "./data/sliderDefinitions";
import {
  createChangePreview,
  getDisabledReason,
  getFieldLock,
} from "./utils/compatibilityEngine";
import {
  getBodyPromptStrategy,
  getPresentationGuidance,
} from "./utils/promptBuilderV3";
const label = (id: string) =>
  (findOption(id) ?? findCompositionOption(id) ?? findOfficeOption(id))
    ?.labelZh ??
  getPose(id)?.labelZh ??
  poseModes.find((x) => x.id === id)?.labelZh ??
  "未設定";
const poseOpts = poseDefinitions.map((p) => ({
  id: p.id,
  labelZh: p.labelZh,
  labelEn: p.labelEn,
  prompt: p.prompt,
}));
export default function App() {
  const {
    state,
    resolution,
    notice,
    pending,
    setChoice,
    toggleList,
    setSlider,
    clear,
    reset,
    confirm,
    cancel,
  } = useBuilder();
  const bodyStrategy = getBodyPromptStrategy(state),
    presentationGuidance = getPresentationGuidance(state),
    office = state.outfit.family === "family-office",
    upperOptions = office
      ? oo.upper.filter(
          (x) =>
            !["upper-one-piece", "upper-yoga", "upper-resort"].includes(x.id),
        )
      : oo.upper.filter(
          (x) =>
            x.id ===
            (
              {
                "family-swim": "upper-one-piece",
                "family-active": "upper-yoga",
                "family-resort": "upper-resort",
              } as Record<string, string>
            )[state.outfit.family],
        );
  const disabled = (field: string, ids: string[]) =>
    Object.fromEntries(
      ids.map((id) => [id, getDisabledReason(resolution, field, id)]),
    );
  const lock = (field: string) => {
    const l = getFieldLock(resolution, field);
    return l
      ? { source: getPose(l.sourceId)?.labelZh ?? l.sourceId, reason: l.reason }
      : undefined;
  };
  const currentPoses = poseOpts.filter(
    (p) => getPose(p.id)?.mode === state.pose.mode,
  );
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark">S</span>
          <span>
            <b>Safe Prompt Studio</b>
            <small>UPPER-BODY VOLUME / 0.2.0-alpha.3.1</small>
          </span>
        </a>
        <div className="header-actions">
          <button className="text-button" onClick={clear}>
            清空
          </button>
          <button className="reset-button" onClick={reset}>
            恢復預設
          </button>
        </div>
      </header>
      <main id="top">
        <section className="intro">
          <div>
            <p className="kicker">THEME-AWARE CHARACTER BUILDER</p>
            <h1>
              先決定她正在做什麼，
              <br />
              再讓系統守住<em>動作的一致性。</em>
            </h1>
          </div>
          <p className="intro-copy">
            具體姿勢會主動限制手腳支撐、主體視角與鏡位，避免互相打結的 Prompt。
          </p>
        </section>
        <section className="safety-note">
          <span>◇</span>
          <p>
            <b>智慧相容引擎</b>　虛構、明確成年、非露骨與解剖保護固定啟用。
          </p>
        </section>
        <div className="system-locks">
          {[
            "Clearly Adult",
            "Fictional Character",
            "Non-Explicit",
            "Anatomy Guard",
          ].map((x) => (
            <span key={x}>✓ {x}</span>
          ))}
        </div>
        <QuickPresets />
        <div className="workspace">
          <div className="builder-column">
            <AccordionModule
              index="01"
              title="角色原型"
              eyebrow="PERSONA"
              defaultOpen
              summary={`${label(state.persona.archetype)}／${label(state.persona.ageBand)}`}
            >
              <ChoiceField
                label="地區風格"
                options={options.regionStyle}
                value={state.persona.regionStyle}
                onChange={(v) => setChoice("persona", "regionStyle", v)}
              />
              <ChoiceField
                label="成年年齡帶"
                options={options.ageBand}
                value={state.persona.ageBand}
                onChange={(v) => setChoice("persona", "ageBand", v)}
              />
              <ChoiceField
                label="角色原型"
                options={options.archetype}
                value={state.persona.archetype}
                onChange={(v) => setChoice("persona", "archetype", v)}
              />
              <ChoiceField
                label="氣質"
                multiple
                options={options.vibes}
                value={state.persona.vibes}
                onChange={(v) => toggleList("persona", "vibes", v)}
              />
            </AccordionModule>
            <AccordionModule
              index="02"
              title="臉部與髮妝"
              eyebrow="FACE"
              summary={`${label(state.face.faceShape)}／${label(state.face.hairstyle)}`}
            >
              <ChoiceField
                label="臉型"
                options={options.faceShape}
                value={state.face.faceShape}
                onChange={(v) => setChoice("face", "faceShape", v)}
              />
              <ChoiceField
                label="髮型"
                options={options.hairstyle}
                value={state.face.hairstyle}
                onChange={(v) => setChoice("face", "hairstyle", v)}
              />
              <ChoiceField
                label="妝容"
                options={options.makeup}
                value={state.face.makeup}
                onChange={(v) => setChoice("face", "makeup", v)}
              />
            </AccordionModule>
            <AccordionModule
              index="03"
              title="身形與曲線"
              eyebrow="BODY"
              summary={`${label(state.body.frame)}／衝擊 ${state.body.visualImpact}`}
            >
              <ChoiceField
                label="基礎體態"
                options={options.bodyFrame}
                value={state.body.frame}
                onChange={(v) => setChoice("body", "frame", v)}
              />
              <div className="slider-grid">
                {sliderDefinitions.map((d) => (
                  <SliderField
                    key={d.key}
                    definition={d}
                    value={state.body[d.key]}
                    onChange={(v) => setSlider(d.key, v)}
                  />
                ))}
              </div>
              <div className="body-strategy">
                <b>Prompt 輸出策略</b>
                <span>
                  目前曲線焦點：{label(state.outfit.styling.curveFocus)}
                </span>
                <span>主要輪廓：{bodyStrategy.features.join("、")}</span>
                <span>
                  輸出方式：已合併為 {bodyStrategy.groups} 組主要曲線描述
                </span>
                <span>
                  攝影衝擊：由視覺衝擊 {bodyStrategy.impact}{" "}
                  控制構圖、剪影與光線
                </span>
                {bodyStrategy.compressed && (
                  <em>
                    多個曲線數值較高，系統已整合為整體輪廓描述，避免 Prompt
                    重複聚焦單一身體部位。
                  </em>
                )}
              </div>
              <div className="presentation-guidance">
                <div>
                  <small>PRESENTATION GUIDANCE</small>
                  <b>造型呈現建議</b>
                </div>
                <span>上身體積設定：{state.body.bustFullness >= 81 ? "高" : state.body.bustFullness >= 61 ? "中高" : "自然"}</span>
                <span>目前姿勢：{label(state.pose.poseId)}／{label(state.camera.framing)}／{label(state.camera.subjectView)}</span>
                {presentationGuidance.map((guidance) => (
                  <p key={guidance}>{guidance}</p>
                ))}
              </div>
            </AccordionModule>
            <AccordionModule
              index="04"
              title="服裝與造型"
              eyebrow="OUTFIT V4"
              summary={`${label(state.outfit.family)}／${label(state.outfit.upper.garment)}／${label(state.outfit.styling.impactSource)}`}
            >
              <ChoiceField
                label="服裝家族"
                options={oo.family}
                value={state.outfit.family}
                onChange={(v) => setChoice("outfit", "family", v)}
              />
              <ChoiceField
                label="上身服裝"
                options={upperOptions}
                value={state.outfit.upper.garment}
                onChange={(v) => setChoice("outfit", "upper.garment", v)}
              />
              {office && (
                <>
                  <ChoiceField
                    label="領口設計"
                    options={oo.neckline}
                    value={state.outfit.upper.neckline}
                    onChange={(v) => setChoice("outfit", "upper.neckline", v)}
                  />
                  <ChoiceField
                    label="領口開放程度"
                    options={oo.opening}
                    value={state.outfit.upper.opening}
                    onChange={(v) => setChoice("outfit", "upper.opening", v)}
                  />
                  <ChoiceField
                    label="上身結構"
                    options={oo.structure}
                    value={state.outfit.upper.structure}
                    onChange={(v) => setChoice("outfit", "upper.structure", v)}
                  />
                  <ChoiceField
                    label="上身體積呈現"
                    options={oo.volumePresentation}
                    value={state.outfit.upper.volumePresentation}
                    onChange={(v) =>
                      setChoice("outfit", "upper.volumePresentation", v)
                    }
                  />
                  <ChoiceField
                    label="上身立體結構"
                    options={oo.bustTailoring}
                    value={state.outfit.upper.bustTailoring}
                    onChange={(v) =>
                      setChoice("outfit", "upper.bustTailoring", v)
                    }
                  />
                  <ChoiceField
                    label="貼合程度"
                    options={oo.fit}
                    value={state.outfit.upper.fit}
                    onChange={(v) => setChoice("outfit", "upper.fit", v)}
                  />
                  <ChoiceField
                    label="腰線結構"
                    options={oo.waist}
                    value={state.outfit.waist.construction}
                    onChange={(v) =>
                      setChoice("outfit", "waist.construction", v)
                    }
                  />
                  <ChoiceField
                    label="下身服裝"
                    options={oo.lower}
                    value={state.outfit.lower.garment}
                    disabledReasons={disabled(
                      "outfit.lower.garment",
                      oo.lower.map((x) => x.id),
                    )}
                    onChange={(v) => setChoice("outfit", "lower.garment", v)}
                  />
                  <ChoiceField
                    label="下身輪廓"
                    options={oo.lowerShape}
                    value={state.outfit.lower.silhouette}
                    onChange={(v) => setChoice("outfit", "lower.silhouette", v)}
                  />
                  <ChoiceField
                    label="主材質"
                    options={oo.material}
                    value={state.outfit.material.primary}
                    onChange={(v) => setChoice("outfit", "material.primary", v)}
                  />
                  <ChoiceField
                    label="表面質感"
                    options={oo.surface}
                    value={state.outfit.material.surface}
                    onChange={(v) => setChoice("outfit", "material.surface", v)}
                  />
                  <ChoiceField
                    label="外套層次"
                    options={oo.outerwear}
                    value={state.outfit.outerwear}
                    onChange={(v) => setChoice("outfit", "outerwear", v)}
                  />
                  <ChoiceField
                    label="曲線聚焦"
                    options={oo.curveFocus}
                    value={state.outfit.styling.curveFocus}
                    onChange={(v) =>
                      setChoice("outfit", "styling.curveFocus", v)
                    }
                  />
                  <ChoiceField
                    label="視覺衝擊來源"
                    options={oo.impactSource}
                    value={state.outfit.styling.impactSource}
                    onChange={(v) =>
                      setChoice("outfit", "styling.impactSource", v)
                    }
                  />
                </>
              )}
              <div className="outfit-summary">
                <b>服裝視覺摘要</b>
                <span>家族：{label(state.outfit.family)}</span>
                <span>
                  主要剪裁：{label(state.outfit.upper.neckline)}、
                  {label(state.outfit.upper.structure)}
                </span>
                {office && (
                  <span>
                    上身體積：{label(state.outfit.upper.volumePresentation)}、
                    {label(state.outfit.upper.bustTailoring)}
                  </span>
                )}
                <span>
                  腰臀呈現：{label(state.outfit.waist.construction)}、
                  {label(state.outfit.lower.garment)}
                </span>
                <span>
                  衝擊來源：{label(state.outfit.styling.impactSource)}
                </span>
                <em>🔒 完全不透明／結構包覆已啟用</em>
              </div>
            </AccordionModule>
            <AccordionModule
              index="05"
              title="姿態與動作"
              eyebrow="POSE ENGINE"
              defaultOpen
              summary={`${label(state.pose.mode)}／${label(state.pose.poseId)}／${resolution.lockedFields.length ? "手腳由動作鎖定" : "可自由調整"}`}
            >
              <ChoiceField
                label="動作模式"
                options={poseModes}
                value={state.pose.mode}
                onChange={(v) => {
                  const first = poseDefinitions.find((p) => p.mode === v);
                  if (first) setChoice("pose", "poseId", first.id);
                }}
              />
              <ChoiceField
                label="具體姿勢"
                options={currentPoses}
                value={state.pose.poseId}
                onChange={(v) => setChoice("pose", "poseId", v)}
              />
              <ChoiceField
                label="手部位置"
                options={c.v3Hands}
                value={state.pose.handPosition}
                lock={lock("pose.handPosition")}
                disabledReasons={disabled(
                  "pose.handPosition",
                  c.v3Hands.map((x) => x.id),
                )}
                onChange={(v) => setChoice("pose", "handPosition", v)}
              />
              <ChoiceField
                label="腿部姿態"
                options={c.v3Legs}
                value={state.pose.legPosition}
                lock={lock("pose.legPosition")}
                disabledReasons={disabled(
                  "pose.legPosition",
                  c.v3Legs.map((x) => x.id),
                )}
                onChange={(v) => setChoice("pose", "legPosition", v)}
              />
              <ChoiceField
                label="頭部與視線"
                options={c.headDirection}
                value={state.pose.headDirection}
                onChange={(v) => setChoice("pose", "headDirection", v)}
              />
              <div className="compatibility-summary">
                <b>{label(state.pose.poseId)}</b>
                <span>{getPose(state.pose.poseId)?.explanation}</span>
              </div>
            </AccordionModule>
            <AccordionModule
              index="06"
              title="場景與氛圍"
              eyebrow="SCENE"
              summary={`${label(state.scene.location)}／${label(state.scene.time)}`}
            >
              <ChoiceField
                label="場景"
                options={c.location}
                value={state.scene.location}
                onChange={(v) => setChoice("scene", "location", v)}
              />
            </AccordionModule>
            <AccordionModule
              index="07"
              title="鏡位與構圖"
              eyebrow="CAMERA"
              defaultOpen
              summary={`${label(state.camera.subjectView)}／${label(state.camera.framing)}／${label(state.camera.height)}`}
            >
              <ChoiceField
                label="主體與鏡頭關係"
                options={c.subjectView}
                value={state.camera.subjectView}
                lock={lock("camera.subjectView")}
                disabledReasons={disabled(
                  "camera.subjectView",
                  c.subjectView.map((x) => x.id),
                )}
                onChange={(v) => setChoice("camera", "subjectView", v)}
              />
              <ChoiceField
                label="景別"
                options={c.framing}
                value={state.camera.framing}
                lock={lock("camera.framing")}
                disabledReasons={disabled(
                  "camera.framing",
                  c.framing.map((x) => x.id),
                )}
                onChange={(v) => setChoice("camera", "framing", v)}
              />
              <ChoiceField
                label="鏡頭高度"
                options={c.cameraHeight}
                value={state.camera.height}
                disabledReasons={disabled(
                  "camera.height",
                  c.cameraHeight.map((x) => x.id),
                )}
                onChange={(v) => setChoice("camera", "height", v)}
              />
            </AccordionModule>
            <AccordionModule
              index="08"
              title="光線與攝影風格"
              eyebrow="LIGHT"
              summary={`${label(state.lighting.lightType)}／${label(state.lighting.visualStyle)}`}
            >
              <ChoiceField
                label="光線"
                options={c.lightType}
                value={state.lighting.lightType}
                onChange={(v) => setChoice("lighting", "lightType", v)}
              />
            </AccordionModule>
          </div>
          <PromptOutput />
        </div>
        {notice && (
          <div className="engine-toast" role="status">
            {notice}
          </div>
        )}
      </main>
      {pending && (
        <div className="dialog-backdrop">
          <div className="confirm-dialog" role="dialog" aria-modal="true">
            <small>COMPATIBILITY PREVIEW</small>
            <h2>套用「{label(pending.nextState.pose.poseId)}」相容設定？</h2>
            <p>這次主題切換會調整多個欄位：</p>
            <ul>
              {createChangePreview(pending).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div>
              <button onClick={cancel}>取消切換</button>
              <button onClick={() => {
                cancel()
                setChoice('pose', 'poseId', 'pose-neutral')
              }}>改用一般站姿</button>
              <button className="confirm" onClick={confirm}>
                套用相容設定
              </button>
            </div>
          </div>
        </div>
      )}
      <footer>
        <span>SAFE PROMPT STUDIO</span>
        <span>© {new Date().getFullYear()} · COMPATIBILITY ENGINE V3</span>
      </footer>
    </div>
  );
}
