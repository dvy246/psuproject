/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import rulesData from '../../data/diagnostic-rules.json';
import gpuData from '../../data/index/gpus.index.json';
import { useTranslations, l, type Locale } from '../../i18n';
import { getDiagnosticTranslations } from '../../i18n/diagnostics';

interface Symptom {
  id: string;
  name: string;
  description: string;
}

interface Option {
  text: string;
  weights: Record<string, number>;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface Props {
  currentLang?: Locale;
}

export default function DiagnosticWizard({ currentLang = 'en' }: Props) {
  const t = useTranslations(currentLang);
  const dt = getDiagnosticTranslations(currentLang);
  const [step, setStep] = useState<'select_symptom' | 'hardware_info' | 'questions' | 'results' | 'safety_alert'>('select_symptom');
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');
  
  // Hardware profile states
  const [psuAge, setPsuAge] = useState<number>(2);
  const [psuTier, setPsuTier] = useState<'A' | 'B' | 'C' | 'Avoid'>('B');
  const [gpuId, setGpuId] = useState<string>('rtx-4070-super');

  // Q&A states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const symptoms = rulesData.symptoms as Symptom[];
  const questionsMap = rulesData.questions as Record<string, Question[]>;
  const activeQuestions = selectedSymptom ? questionsMap[selectedSymptom] || [] : [];
  const gpus = gpuData.items;

  const handleSymptomSelect = (id: string) => {
    setSelectedSymptom(id);
    if (id === 'burning-smell') {
      setStep('safety_alert');
    } else {
      setStep('hardware_info');
    }
  };

  const handleHardwareSubmit = () => {
    if (activeQuestions.length > 0) {
      setStep('questions');
      setCurrentQuestionIdx(0);
      setAnswers({});
    } else {
      setStep('results');
    }
  };

  const handleAnswerSelect = (optionIdx: number) => {
    const currentQuestion = activeQuestions[currentQuestionIdx];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIdx }));

    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setStep('results');
    }
  };

  const resetWizard = () => {
    setStep('select_symptom');
    setSelectedSymptom('');
    setPsuAge(2);
    setPsuTier('B');
    setGpuId('rtx-4070-super');
    setCurrentQuestionIdx(0);
    setAnswers({});
  };

  // Calculate results
  const calculateVerdicts = () => {
    const rawScores: Record<string, number> = {};

    // 1. Tally rule weights
    activeQuestions.forEach(q => {
      const selectedOptionIdx = answers[q.id];
      if (selectedOptionIdx !== undefined) {
        const option = q.options[selectedOptionIdx];
        Object.entries(option.weights).forEach(([cause, weight]) => {
          rawScores[cause] = (rawScores[cause] || 0) + weight;
        });
      }
    });

    // 2. Apply hardware age & quality multipliers
    if (psuAge > 5) {
      rawScores['psu_failure'] = (rawScores['psu_failure'] || 0) + 25;
      rawScores['psu_aging'] = (rawScores['psu_aging'] || 0) + 30;
      rawScores['psu_droop'] = (rawScores['psu_droop'] || 0) + 15;
    }
    if (psuTier === 'Avoid') {
      rawScores['psu_failure'] = (rawScores['psu_failure'] || 0) + 40;
      rawScores['psu_defect'] = (rawScores['psu_defect'] || 0) + 30;
    } else if (psuTier === 'A') {
      // Reduce PSU failure risk
      if (rawScores['psu_failure']) rawScores['psu_failure'] = Math.max(rawScores['psu_failure'] - 20, 5);
      if (rawScores['psu_defect']) rawScores['psu_defect'] = Math.max(rawScores['psu_defect'] - 15, 0);
    }

    // 3. Normalize to percentage (scale total to 100%)
    const scoreSum = Object.values(rawScores).reduce((a, b) => a + b, 0);
    const normalized = Object.entries(rawScores).map(([cause, score]) => {
      const percentage = scoreSum > 0 ? Math.round((score / scoreSum) * 100) : 0;
      return { cause, percentage };
    });

    return normalized.sort((a, b) => b.percentage - a.percentage);
  };

  const getCauseTitle = (cause: string) => {
    return dt.causeTitles[cause] || cause;
  };

  const getActionRecommendation = (topCause: string) => {
    const isPsuDirect = ['psu_failure', 'psu_overload', 'psu_protection', 'psu_transient', 'psu_overheating', 'psu_droop', 'psu_ripple', 'psu_defect', 'psu_aging'].includes(topCause);

    if (isPsuDirect) {
      return {
        title: dt.findReplacementPsuBtn,
        text: currentLang === 'de'
          ? 'Die Diagnose weist auf ein Problem mit der Stromversorgung hin. Überprüfen Sie Ihre Systemleistung in unserem Rechner.'
          : currentLang === 'es'
          ? 'El diagnóstico indica un fallo o sobrecarga en la fuente de alimentación. Recalcula el consumo de tu equipo.'
          : currentLang === 'fr'
          ? 'Le diagnostic indique un problème lié à l\'alimentation. Recalculez la consommation de votre configuration.'
          : currentLang === 'ja'
          ? '診断の結果、電源ユニットの容量不足または不具合の可能性が高いです。推奨W数を再計算してください。'
          : currentLang === 'zh'
          ? '诊断结果显示电源存在过载或元器件老化故障，建议重新核算整机真实功耗需求。'
          : 'Diagnostic findings strongly indicate power supply instability or overload.',
        link: l('/psu-calculator', currentLang),
        linkText: t.nav.psuCalculator
      };
    }

    return {
      title: dt.resultsHeading,
      text: currentLang === 'de'
        ? 'Die Messwerte sind uneinheitlich. Führen Sie einen Hardware-Tauschtest durch.'
        : currentLang === 'es'
        ? 'Los indicios son mixtos. Realiza una prueba cruzada con otra fuente de alimentación.'
        : currentLang === 'fr'
        ? 'Résultats mixtes. Effectuez un test croisé avec un autre composant.'
        : currentLang === 'ja'
        ? '判定が分かれています。最小構成での起動テストや代替パーツでの検証を推奨します。'
        : currentLang === 'zh'
        ? '检测特征较为分散，建议使用替换法对关键配件进行交叉测试。'
        : 'Diagnostic indications are mixed. Test system components using a backup.',
      link: l('/psu-calculator', currentLang),
      linkText: t.nav.psuCalculator
    };
  };

  const verdicts = step === 'results' ? calculateVerdicts() : [];
  const recommendation = verdicts.length > 0 ? getActionRecommendation(verdicts[0].cause) : null;

  return (
    <div class="diagnostic-wizard-container">
      {/* ── STEP 1: SELECT SYMPTOM ── */}
      {step === 'select_symptom' && (
        <div>
          <h2 class="text-xl font-bold font-display" style="margin-bottom: 1.5rem; color:var(--text-primary);">
            {dt.selectSymptomHeading}
          </h2>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            {symptoms.map(sym => {
              const locSym = dt.symptoms[sym.id] || sym;
              return (
                <button
                  key={sym.id}
                  onClick={() => handleSymptomSelect(sym.id)}
                  class="card btn-card"
                  style="text-align:left; width:100%; transition:all 150ms var(--ease-out);"
                  type="button"
                >
                  <div style="font-weight:700; color:var(--accent-primary); font-size:1.05rem; display:flex; align-items:center; gap:0.5rem;">
                    {sym.id === 'burning-smell' ? '⚠️' : '⚡'} {locSym.name}
                  </div>
                  <div style="font-size:0.875rem; color:var(--text-secondary); margin-top:0.25rem;">
                    {locSym.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── STEP 2: HARDWARE SPECIFICATION PROFILE ── */}
      {step === 'hardware_info' && (
        <div class="card" style="padding:1.5rem; border:1px solid var(--border-default);">
          <h2 class="text-xl font-bold font-display" style="margin-bottom: 1rem;">
            {dt.hardwareProfileHeading}
          </h2>
          <p class="text-secondary" style="font-size:0.875rem; margin-bottom:1.5rem;">
            {dt.hardwareProfileSubtitle}
          </p>

          <div style="display:flex; flex-direction:column; gap:1.25rem;">
            {/* Age Slider */}
            <div>
              <label style="display:flex; justify-content:space-between; font-weight:600; font-size:0.9rem; margin-bottom:0.25rem;">
                <span>{dt.psuAgeLabel}</span>
                <span style="color:var(--accent-primary);">{psuAge} {dt.yearsSuffix}</span>
              </label>
              <input
                type="range"
                min="0"
                max="15"
                value={psuAge}
                onInput={(e) => setPsuAge(parseInt((e.target as HTMLInputElement).value, 10))}
                style="width: 100%; margin-top:0.25rem;"
              />
            </div>

            {/* Quality Tier Selector */}
            <div>
              <label style="display:block; font-weight:600; font-size:0.9rem; margin-bottom:0.5rem;">
                {dt.qualityTierLabel}
              </label>
              <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:0.5rem;">
                {[
                  { key: 'A', name: dt.tierNames.A },
                  { key: 'B', name: dt.tierNames.B },
                  { key: 'C', name: dt.tierNames.C },
                  { key: 'Avoid', name: dt.tierNames.Avoid }
                ].map(item => (
                  <button
                    key={item.key}
                    type="button"
                    title={item.name}
                    onClick={() => setPsuTier(item.key as any)}
                    class={`btn btn-sm ${psuTier === item.key ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {item.key}
                  </button>
                ))}
              </div>
            </div>

            {/* GPU Selector */}
            <div>
              <label style="display:block; font-weight:600; font-size:0.9rem; margin-bottom:0.5rem;">
                {dt.gpuLabel}
              </label>
              <select
                value={gpuId}
                onChange={(e) => setGpuId((e.target as HTMLSelectElement).value)}
                style="width:100%; padding:0.5rem; background:var(--bg-primary); border:1px solid var(--border-subtle); border-radius:4px; color:var(--text-primary);"
              >
                {gpus.map(gpu => (
                  <option key={gpu.id} value={gpu.id}>
                    {gpu.name} ({gpu.tbp}W TBP)
                  </option>
                ))}
              </select>
            </div>

            <div style="display:flex; gap:0.75rem; margin-top:1rem;">
              <button onClick={resetWizard} class="btn btn-secondary" style="flex:1;">{dt.backBtn}</button>
              <button onClick={handleHardwareSubmit} class="btn btn-primary" style="flex:1;">{dt.nextStepBtn}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 3: QUESTIONS FLOW ── */}
      {step === 'questions' && activeQuestions[currentQuestionIdx] && (
        <div class="card" style="padding:1.5rem; border:1px solid var(--border-default);">
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:700; color:var(--text-tertiary); margin-bottom:1rem; text-transform:uppercase;">
            <span>{dt.questionOf(currentQuestionIdx + 1, activeQuestions.length)}</span>
            <span style="color:var(--accent-primary);">{dt.completePercent(Math.round(((currentQuestionIdx) / activeQuestions.length) * 100))}</span>
          </div>

          <h2 class="text-xl font-bold font-display" style="margin-bottom: 1.5rem; line-height:1.4;">
            {activeQuestions[currentQuestionIdx].text}
          </h2>

          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            {activeQuestions[currentQuestionIdx].options.map((opt, optIdx) => (
              <button
                key={optIdx}
                onClick={() => handleAnswerSelect(optIdx)}
                class="btn btn-secondary"
                style="text-align:left; padding:1rem; font-weight:500; font-size:0.95rem; justify-content:flex-start; height:auto; line-height:1.4;"
                type="button"
              >
                {opt.text}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (currentQuestionIdx > 0) {
                setCurrentQuestionIdx(prev => prev - 1);
              } else {
                setStep('hardware_info');
              }
            }}
            class="btn btn-secondary"
            style="margin-top:1.5rem; width:100%;"
            type="button"
          >
            {dt.previousQuestionBtn}
          </button>
        </div>
      )}

      {/* ── STEP 4: EMERGENCY SAFETY SHORT-CIRCUIT ALERT ── */}
      {step === 'safety_alert' && (
        <div class="card border-danger" style="padding:2rem; background:rgba(255, 68, 68, 0.05);">
          <h2 class="text-2xl font-bold text-danger" style="margin-bottom:1rem; color:var(--feedback-error-border); display:flex; align-items:center; gap:0.5rem;">
            {dt.criticalSafetyTitle}
          </h2>
          <div style="line-height:1.6; color:var(--text-primary); display:flex; flex-direction:column; gap:1rem;">
            <p>
              Odor of hot plastic, burning insulation, visible sparks, or smoke indicate active, high-risk hardware failure inside your power supply or motherboard.
            </p>
            <p style="font-weight:700; color:var(--feedback-error-border);">
              {dt.criticalSafetyWarning}
            </p>
            <ol style="list-style-type:decimal; margin-left:1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
              <li>{dt.criticalSafetyStep1}</li>
              <li>{dt.criticalSafetyStep2}</li>
              <li>{dt.criticalSafetyStep3}</li>
              <li>{dt.criticalSafetyStep4}</li>
            </ol>
            <div style="margin-top:1.5rem; display:flex; gap:0.75rem;">
              <button onClick={resetWizard} class="btn btn-secondary" style="flex:1;">{dt.restartDiagnosisBtn}</button>
              <a href={l('/psu-replacement-calculator', currentLang)} class="btn btn-primary" style="flex:1; text-decoration:none; text-align:center;">{dt.findReplacementPsuBtn}</a>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 5: DIAGNOSTIC RESULTS VERDICTS ── */}
      {step === 'results' && (
        <div style="display:flex; flex-direction:column; gap:2rem;">
          {/* Likelihood breakdown bento */}
          <div class="card" style="padding:2rem; border:1px solid var(--border-default);">
            <h2 class="text-2xl font-bold font-display" style="margin-bottom:1.5rem;">
              {dt.resultsHeading}
            </h2>

            <div style="display:flex; flex-direction:column; gap:1.25rem;">
              {verdicts.map((v, idx) => (
                <div key={v.cause}>
                  <div style="display:flex; justify-content:space-between; font-size:0.9rem; font-weight:600; margin-bottom:0.25rem;">
                    <span style={idx === 0 ? 'color:var(--accent-primary); font-weight:700;' : 'color:var(--text-secondary);'}>
                      {idx === 0 ? '🏆 ' : ''}{getCauseTitle(v.cause)}
                    </span>
                    <span style={idx === 0 ? 'color:var(--accent-primary);' : 'color:var(--text-tertiary);'}>
                      {v.percentage}{dt.matchSuffix}
                    </span>
                  </div>
                  <div class="progress-bar-container" style="background: var(--bg-primary); height: 8px; border-radius: 4px; overflow: hidden; border: 1px solid var(--border-subtle);">
                    <div style={`background: ${idx === 0 ? 'var(--accent-primary)' : 'var(--text-secondary)'}; width: ${v.percentage}%; height: 100%;`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable recommendation card */}
          {recommendation && (
            <div class="card border-accent" style="padding:2rem;">
              <h3 class="text-xl font-bold font-display" style="margin-bottom:0.75rem; color:var(--accent-primary);">
                {dt.recommendedActionHeading} {recommendation.title}
              </h3>
              <p class="text-secondary" style="line-height:1.6; margin-bottom:1.5rem; font-size:0.95rem;">
                {recommendation.text}
              </p>
              <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                <a href={recommendation.link} class="btn btn-primary" style="text-decoration:none;">{recommendation.linkText}</a>
                <button onClick={resetWizard} class="btn btn-secondary">{dt.restartDiagnosisBtn}</button>
              </div>
            </div>
          )}

          {/* EEAT Disclaimer block */}
          <div style="padding:1.25rem; background:var(--bg-deep); border:1px solid var(--border-subtle); border-radius:6px; font-size:0.825rem; color:var(--text-secondary); line-height:1.5;">
            {dt.eeatDisclaimer}
          </div>
        </div>
      )}
    </div>
  );
}
