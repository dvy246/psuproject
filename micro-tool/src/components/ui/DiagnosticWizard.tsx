/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import rulesData from '../../data/diagnostic-rules.json';
import gpuData from '../../data/index/gpus.index.json';

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

export default function DiagnosticWizard() {
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
    const map: Record<string, string> = {
      psu_failure: 'Power Supply Component Failure',
      front_panel: 'Faulty Front Panel Button / Headers',
      outlet_issue: 'External Power Outlet or Cable Fault',
      short_circuit: 'Short Circuit Protection (SCP) Active',
      psu_overload: 'PSU Rail Overload / Insufficient Capacity',
      motherboard_dead: 'Motherboard VRM or Chipset Failure',
      psu_protection: 'Over-Current Protection (OCP) Triggered',
      gpu_instability: 'GPU Core / VRAM Instability',
      ram_instability: 'System RAM / XMP Instability',
      psu_droop: 'Voltage Rail Droop Under Load',
      cpu_thermal: 'CPU Thermal Throttling / Cooling Fail',
      psu_transient: 'Transient Spike Excursion (GPU Triggered)',
      motherboard_vr: 'Motherboard VRM Overheating',
      psu_overheating: 'PSU Thermal Protection (OTP) Triggered',
      thermal_throttling: 'System Thermal Throttling (CPU/GPU)',
      driver_issue: 'OS File Corruption or Driver State Failure',
      psu_ripple: 'High Voltage Ripple / Aging Capacitors',
      normal_resonance: 'Inductor Vibration (Normal Coil Whine)',
      psu_defect: 'PSU Inductor Defect (Abnormal Coil Whine)',
      psu_aging: 'Capacitor Wear & Tear (PSU Aging)',
      dirty_power: 'Dirty AC Wall Power / Harmonic Ripple',
      cpu_voltage_droop: 'CPU Vcore Droop / Unstable Overclock',
      psu_rail_instability: 'PSU +12V Rail Voltage Drops',
      cpu_overclock: 'Unstable CPU Core Offset Tuning',
      ram_defect: 'Faulty Memory Module (RAM Defect)',
      cpu_memory_controller: 'Unstable Memory Controller (IMC) Voltage',
      software_driver: 'Outdated GPU Driver / Windows Registry Loop',
      system_corruption: 'Corrupt System Boot Sectors',
      normal_zero_rpm: 'Eco/Zero-RPM Fan Mode Active',
      fan_failure: 'PSU Fan Bearing / Motor Failure',
      normal_low_speed: 'Eco Low-Speed fan cooling profile',
      pending_test: 'Awaiting Paperclip Test Results'
    };
    return map[cause] || cause;
  };

  const getActionRecommendation = (topCause: string) => {
    switch (topCause) {
      case 'psu_failure':
      case 'psu_droop':
      case 'psu_transient':
      case 'psu_overload':
        return {
          title: 'PSU Upgrade or Replacement Recommended',
          text: 'The power supply appears unable to maintain stable voltage rails under load or has suffered component failure. We recommend replacing it with a high-quality model.',
          link: '/psu-replacement-calculator',
          linkText: 'Check Upgrade Compatibility'
        };
      case 'short_circuit':
        return {
          title: 'Isolate Hardware Short Circuits',
          text: 'The power supply is shutting down instantly to prevent fire damage. Unplug your GPU, remove all but one RAM stick, and boot using motherboard integrated graphics to isolate the short circuit.',
          link: '/guides/how-to-test-a-psu',
          linkText: 'Read Troubleshooting Guide'
        };
      case 'pending_test':
        return {
          title: 'Perform the Paperclip Test',
          text: 'To determine if the power supply is completely dead, perform a manual jump test using a paperclip on pins 16 and 17 of the 24-pin cable. Always disconnect all components before doing this test.',
          link: '/guides/how-to-test-a-psu',
          linkText: 'How to perform Paperclip Test'
        };
      case 'gpu_instability':
      case 'normal_resonance':
        return {
          title: 'Isolate GPU Power Delivery',
          text: 'The symptoms point to GPU-level instability or normal coil resonance. Try running two separate PCIe power cables from the PSU to the GPU rather than using a single daisy-chain pigtail cable.',
          link: '/guides/gpu-power-connectors',
          linkText: 'Read GPU Connector Guide'
        };
      default:
        return {
          title: 'Conduct a Hardware Swap Test',
          text: 'Diagnostic indications are mixed. The most reliable way to confirm a power supply issue is to test the system using a known-working backup power supply.',
          link: '/psu-calculator',
          linkText: 'Recalculate Power Draw'
        };
    }
  };

  const verdicts = step === 'results' ? calculateVerdicts() : [];
  const recommendation = verdicts.length > 0 ? getActionRecommendation(verdicts[0].cause) : null;

  return (
    <div class="diagnostic-wizard-container">
      {/* ── STEP 1: SELECT SYMPTOM ── */}
      {step === 'select_symptom' && (
        <div>
          <h2 class="text-xl font-bold font-display" style="margin-bottom: 1.5rem; color:var(--text-primary);">
            What is the primary symptom your PC is experiencing?
          </h2>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            {symptoms.map(sym => (
              <button
                key={sym.id}
                onClick={() => handleSymptomSelect(sym.id)}
                class="card btn-card"
                style="text-align:left; width:100%; transition:all 150ms var(--ease-out);"
                type="button"
              >
                <div style="font-weight:700; color:var(--accent-primary); font-size:1.05rem; display:flex; align-items:center; gap:0.5rem;">
                  {sym.id === 'burning-smell' ? '⚠️' : '⚡'} {sym.name}
                </div>
                <div style="font-size:0.875rem; color:var(--text-secondary); margin-top:0.25rem;">
                  {sym.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 2: HARDWARE SPECIFICATION PROFILE ── */}
      {step === 'hardware_info' && (
        <div class="card" style="padding:1.5rem; border:1px solid var(--border-default);">
          <h2 class="text-xl font-bold font-display" style="margin-bottom: 1rem;">
            Configure Hardware Profile
          </h2>
          <p class="text-secondary" style="font-size:0.875rem; margin-bottom:1.5rem;">
            Inputting your power supply age and tier allows the engine to calibrate wear-and-tear degradation indices.
          </p>

          <div style="display:flex; flex-direction:column; gap:1.25rem;">
            {/* Age Slider */}
            <div>
              <label style="display:flex; justify-content:space-between; font-weight:600; font-size:0.9rem; margin-bottom:0.25rem;">
                <span>Power Supply Age:</span>
                <span style="color:var(--accent-primary);">{psuAge} Years</span>
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
                Power Supply Quality Tier:
              </label>
              <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:0.5rem;">
                {[
                  { key: 'A', name: 'Tier A (High-End)' },
                  { key: 'B', name: 'Tier B (Mid-Range)' },
                  { key: 'C', name: 'Tier C (Budget)' },
                  { key: 'Avoid', name: 'Avoid (Low-Quality)' }
                ].map(t => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setPsuTier(t.key as any)}
                    class={`btn btn-sm ${psuTier === t.key ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {t.key}
                  </button>
                ))}
              </div>
            </div>

            {/* GPU Selector */}
            <div>
              <label style="display:block; font-weight:600; font-size:0.9rem; margin-bottom:0.5rem;">
                Graphics Card (GPU):
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
              <button onClick={resetWizard} class="btn btn-secondary" style="flex:1;">Back</button>
              <button onClick={handleHardwareSubmit} class="btn btn-primary" style="flex:1;">Next Step</button>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 3: QUESTIONS FLOW ── */}
      {step === 'questions' && activeQuestions[currentQuestionIdx] && (
        <div class="card" style="padding:1.5rem; border:1px solid var(--border-default);">
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:700; color:var(--text-tertiary); margin-bottom:1rem; text-transform:uppercase;">
            <span>Question {currentQuestionIdx + 1} of {activeQuestions.length}</span>
            <span style="color:var(--accent-primary);">{Math.round(((currentQuestionIdx) / activeQuestions.length) * 100)}% Complete</span>
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
            ← Previous Question
          </button>
        </div>
      )}

      {/* ── STEP 4: EMERGENCY SAFETY SHORT-CIRCUIT ALERT ── */}
      {step === 'safety_alert' && (
        <div class="card border-danger" style="padding:2rem; background:rgba(255, 68, 68, 0.05);">
          <h2 class="text-2xl font-bold text-danger" style="margin-bottom:1rem; color:var(--feedback-error-border); display:flex; align-items:center; gap:0.5rem;">
            ⚠️ CRITICAL ELECTRICAL SAFETY ALERT
          </h2>
          <div style="line-height:1.6; color:var(--text-primary); display:flex; flex-direction:column; gap:1rem;">
            <p>
              Odor of hot plastic, burning insulation, visible sparks, or smoke indicate active, high-risk hardware failure inside your power supply or motherboard.
            </p>
            <p style="font-weight:700; color:var(--feedback-error-border);">
              DO NOT attempt to boot the computer, troubleshoot components, or leave the PC connected to wall power.
            </p>
            <ol style="list-style-type:decimal; margin-left:1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
              <li>Immediately turn off the power switch on the back of the PSU.</li>
              <li>Unplug the AC power cord from the wall outlet.</li>
              <li>Wait at least 30 minutes for capacitors to discharge before removing any parts.</li>
              <li>Do not reuse this power supply; it must be replaced.</li>
            </ol>
            <div style="margin-top:1.5rem; display:flex; gap:0.75rem;">
              <button onClick={resetWizard} class="btn btn-secondary" style="flex:1;">Restart Diagnosis</button>
              <a href="/psu-replacement-calculator" class="btn btn-primary" style="flex:1; text-decoration:none; text-align:center;">Find a Replacement PSU</a>
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
              📊 Differential Diagnosis Results
            </h2>

            <div style="display:flex; flex-direction:column; gap:1.25rem;">
              {verdicts.map((v, idx) => (
                <div key={v.cause}>
                  <div style="display:flex; justify-content:space-between; font-size:0.9rem; font-weight:600; margin-bottom:0.25rem;">
                    <span style={idx === 0 ? 'color:var(--accent-primary); font-weight:700;' : 'color:var(--text-secondary);'}>
                      {idx === 0 ? '🏆 ' : ''}{getCauseTitle(v.cause)}
                    </span>
                    <span style={idx === 0 ? 'color:var(--accent-primary);' : 'color:var(--text-tertiary);'}>
                      {v.percentage}% Match
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
                💡 Recommended Action: {recommendation.title}
              </h3>
              <p class="text-secondary" style="line-height:1.6; margin-bottom:1.5rem; font-size:0.95rem;">
                {recommendation.text}
              </p>
              <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                <a href={recommendation.link} class="btn btn-primary" style="text-decoration:none;">{recommendation.linkText}</a>
                <button onClick={resetWizard} class="btn btn-secondary">Restart Diagnostics</button>
              </div>
            </div>
          )}

          {/* EEAT Disclaimer block */}
          <div style="padding:1.25rem; background:var(--bg-deep); border:1px solid var(--border-subtle); border-radius:6px; font-size:0.825rem; color:var(--text-secondary); line-height:1.5;">
            <strong>Medical-Grade Hardware Disclaimer:</strong> This diagnostic tool runs a client-side probability ruleset to narrow down faulty components. 
            However, no software can substitute manual multi-meter sweeps or backup component swaps. 
            Always confirm voltage stability and safety steps before purchasing replacement hardware.
          </div>
        </div>
      )}
    </div>
  );
}
