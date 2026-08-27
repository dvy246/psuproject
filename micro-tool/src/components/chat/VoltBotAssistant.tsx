/** @jsxImportSource preact */
import { useState, useEffect, useRef } from 'preact/hooks';
import { useTranslations, l, type Locale } from '../../i18n';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: { label: string; action: () => void }[];
  actionLink?: { text: string; url: string; badge?: string };
  warning?: boolean;
}

interface Props {
  currentLang?: Locale;
}

export default function VoltBotAssistant({ currentLang = 'en' }: Props) {
  const t = useTranslations(currentLang);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Initial Welcome Dialogue
  const startConversation = () => {
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: t.voltBot.welcome,
        options: [
          { label: t.voltBot.btnSizeBuild, action: () => handleNewBuildFlow() },
          { label: t.voltBot.btnCheckGpu, action: () => handleGpuUpgradeFlow() },
          { label: t.voltBot.btnTroubleshoot, action: () => handleTroubleshootFlow() },
          { label: t.voltBot.btnCables, action: () => handleCableFlow() },
          { label: t.voltBot.btnUpsBreaker, action: () => handleUpsBreakerFlow() },
          { label: t.voltBot.btnBestPsu, action: () => handleBestPsuFlow() },
        ],
      },
    ]);
  };

  useEffect(() => {
    startConversation();
  }, [currentLang]);

  // Bot response helper with subtle typing delay simulation
  const addBotMessage = (msg: Omit<Message, 'id' | 'sender'>) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}-${Math.random()}`,
          sender: 'bot',
          ...msg,
        },
      ]);
    }, 350);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text,
      },
    ]);
  };

  // -------------------------------------------------------------
  // BRANCH 1: New Build Sizing
  // -------------------------------------------------------------
  const handleNewBuildFlow = () => {
    addUserMessage('Size a New PC Build');
    addBotMessage({
      text: 'Awesome! Which graphics card tier are you targeting for this build?',
      options: [
        {
          label: '🚀 Flagship 4K (RTX 5090 / 5080 / 4090)',
          action: () => {
            addUserMessage('Flagship 4K (RTX 5090 / 5080 / 4090)');
            addBotMessage({
              text: 'Flagship GPUs have high transient spikes up to 1.57x rated TBP. For RTX 5090 / 5080 with high-end Ryzen 9 or Intel Core Ultra CPUs, we recommend an **850W–1000W+ ATX 3.1 PSU** with native 12V-2x6 high-power cables.',
              actionLink: {
                text: 'Open Sizing Workbench (RTX 5090 + 9800X3D) →',
                url: '/psu-calculator?gpu=rtx-5090&cpu=ryzen-7-9800x3d',
                badge: 'Recommended 1000W',
              },
              options: [
                { label: '📋 View Full 5090 Build Blueprint', action: () => handleBlueprintPick('rtx-5090-ryzen-9-9950x-ultimate') },
                { label: '🔄 Start Over', action: () => startConversation() },
              ],
            });
          },
        },
        {
          label: '🎯 1440p High-FPS (RTX 5070 Ti / 4070 Ti / RX 9070 XT)',
          action: () => {
            addUserMessage('1440p High-FPS Tier');
            addBotMessage({
              text: 'For modern 1440p performance GPUs (250W–300W TBP), a **750W–850W Gold PSU** provides optimal efficiency and headroom for sub-1ms load excursions.',
              actionLink: {
                text: 'Configure 1440p Sweetspot in Calculator →',
                url: '/psu-calculator?gpu=rtx-5070-ti&cpu=ryzen-7-9800x3d',
                badge: 'Recommended 750W',
              },
              options: [
                { label: '📋 View 9800X3D + 5070 Ti Reference Build', action: () => handleBlueprintPick('ryzen-7-9800x3d-rtx-5070-ti-sweetspot') },
                { label: '🔄 Start Over', action: () => startConversation() },
              ],
            });
          },
        },
        {
          label: '💰 Budget / 1080p (RTX 5060 / 4060 / RX 7600)',
          action: () => {
            addUserMessage('Budget / 1080p Tier');
            addBotMessage({
              text: 'For 1080p gaming builds (115W–170W GPU), a **550W–650W PSU** is plenty of capacity while keeping build costs low.',
              actionLink: {
                text: 'Open Budget PSU Calculator →',
                url: '/psu-calculator?gpu=rtx-4060&cpu=ryzen-5-7600',
                badge: 'Recommended 550W–650W',
              },
              options: [
                { label: '🛠️ Full Multi-Part PC Builder', action: () => handleGoToPage('/pc-builder') },
                { label: '🔄 Start Over', action: () => startConversation() },
              ],
            });
          },
        },
      ],
    });
  };

  const handleBlueprintPick = (slug: string) => {
    addBotMessage({
      text: 'Taking you to the full hardware breakdown and power telemetry sheet:',
      actionLink: {
        text: 'View Completed Build Diagnostics →',
        url: `/build/${slug}/`,
      },
    });
  };

  // -------------------------------------------------------------
  // BRANCH 2: GPU Upgrade Safety Check
  // -------------------------------------------------------------
  const handleGpuUpgradeFlow = () => {
    addUserMessage('Check GPU Upgrade & PSU Safety');
    addBotMessage({
      text: 'What wattage is your current installed power supply?',
      options: [
        { label: '550W – 650W', action: () => handleUpgradeWithWattage(650) },
        { label: '750W', action: () => handleUpgradeWithWattage(750) },
        { label: '850W', action: () => handleUpgradeWithWattage(850) },
        { label: '1000W+', action: () => handleUpgradeWithWattage(1000) },
      ],
    });
  };

  const handleUpgradeWithWattage = (wattage: number) => {
    addUserMessage(`My PSU is ${wattage}W`);
    addBotMessage({
      text: `Got it (${wattage}W). Which GPU do you want to upgrade to?`,
      options: [
        {
          label: 'NVIDIA RTX 5090 / 4090',
          action: () => {
            addUserMessage('Upgrading to RTX 5090 / 4090');
            if (wattage < 850) {
              addBotMessage({
                text: `🚨 **PSU Upgrade Required**: A ${wattage}W PSU cannot safely sustain an RTX 5090/4090 (450W–600W sustained + 900W+ micro-spikes). You need at least an 850W–1000W ATX 3.1 unit.`,
                warning: true,
                actionLink: {
                  text: 'Audit GPU Upgrade Headroom & Connectors →',
                  url: '/compare/gpu-upgrade-checker',
                },
              });
            } else {
              addBotMessage({
                text: `✅ A ${wattage}W PSU can handle sustained load, but check if you have a native **ATX 3.1 12V-2x6 connector** to avoid bulky adapter cable melting risks.`,
                actionLink: {
                  text: 'Check Cable & Upgrade Headroom →',
                  url: '/compare/gpu-upgrade-checker',
                },
              });
            }
          },
        },
        {
          label: 'NVIDIA RTX 5080 / 5070 Ti',
          action: () => {
            addUserMessage('Upgrading to RTX 5080 / 5070 Ti');
            addBotMessage({
              text: wattage >= 750 
                ? `✅ Your ${wattage}W PSU has adequate headroom for the RTX 5080/5070 Ti.` 
                : `⚠️ Marginal: A ${wattage}W PSU is tight for a 5080 under peak gaming transients. We recommend stepping up to 750W–850W.`,
              actionLink: {
                text: 'Launch Upgrade Headroom Matrix →',
                url: '/compare/gpu-upgrade-checker',
              },
            });
          },
        },
        {
          label: 'AMD Radeon RX 9070 XT / 7900 XTX',
          action: () => {
            addUserMessage('Upgrading to RX 9070 XT / 7900 XTX');
            addBotMessage({
              text: `Radeon high-end GPUs require 3x 8-pin PCIe or 12V-2x6 connections with recommended 750W–850W capacity.`,
              actionLink: {
                text: 'Check Radeon Power Requirements →',
                url: '/power-consumption/rx-9070-xt/',
              },
            });
          },
        },
      ],
    });
  };

  // -------------------------------------------------------------
  // BRANCH 3: Troubleshooting & Diagnostics
  // -------------------------------------------------------------
  const handleTroubleshootFlow = () => {
    addUserMessage('Troubleshoot PSU / Sudden Shutdowns');
    addBotMessage({
      text: 'What symptom are you experiencing with your computer?',
      options: [
        {
          label: '🔥 Sparks, burning smell, or smoke',
          action: () => {
            addUserMessage('Sparks / Burning Smell / Smoke');
            addBotMessage({
              text: '🚨 **CRITICAL ELECTRICAL HAZARD**: Unplug your PC from the wall immediately! Do not attempt to turn it back on. This indicates an internal capacitor rupture or short circuit.',
              warning: true,
              actionLink: {
                text: 'Emergency Safety Protocol →',
                url: '/diagnose/',
              },
            });
          },
        },
        {
          label: '🔄 Random shutdown or black screen during gaming',
          action: () => {
            addUserMessage('Random shutdown while gaming');
            addBotMessage({
              text: 'This is a classic sign of **OCP (Over-Current Protection)** or **OPP (Over-Power Protection)** triggering due to sub-millisecond GPU power excursion spikes crossing your PSU trip threshold.',
              actionLink: {
                text: 'Run Interactive Diagnostic Wizard →',
                url: '/diagnose/',
              },
            });
          },
        },
        {
          label: '🔊 High-pitched buzzing or whining noise',
          action: () => {
            addUserMessage('High-pitched buzzing / Coil Whine');
            addBotMessage({
              text: 'This is typically **Coil Whine** (inductor electromagnetic vibration under high FPS or switching loads). While annoying, it does not cause component damage.',
              actionLink: {
                text: 'Diagnose Noise & Voltage Ripple →',
                url: '/diagnose/',
              },
            });
          },
        },
        {
          label: '⏳ PSU is 5+ years old and system is unstable',
          action: () => {
            addUserMessage('Old PSU degradation check');
            addBotMessage({
              text: 'Electrolytic capacitors lose ~5% capacity per year after year 3 under continuous heat load. An older 750W unit may only output ~600W safely today.',
              actionLink: {
                text: 'Check Capacitor Aging & Replacement Matrix →',
                url: '/psu-replacement/',
              },
            });
          },
        },
      ],
    });
  };

  // -------------------------------------------------------------
  // BRANCH 4: Cable Compatibility
  // -------------------------------------------------------------
  const handleCableFlow = () => {
    addUserMessage('Modular Cable Compatibility');
    addBotMessage({
      text: '⚠️ **CRITICAL WARNING**: Modular PSU pinouts are **NOT standardized** between brands or even across generations of the same brand. Plugging a Corsair cable into a Seasonic or EVGA PSU can send +12V into ground pins and fry your motherboard or GPU instantly.',
      warning: true,
      actionLink: {
        text: 'Check Cross-Brand Cable Pinout Rules →',
        url: '/compatibility/',
      },
      options: [
        { label: '📖 Read ATX 3.1 & 12V-2x6 Cable Guide', action: () => handleGoToPage('/guides/atx-3-1-guide') },
        { label: '🔄 Start Over', action: () => startConversation() },
      ],
    });
  };

  // -------------------------------------------------------------
  // BRANCH 5: UPS & Breaker Sizer
  // -------------------------------------------------------------
  const handleUpsBreakerFlow = () => {
    addUserMessage('UPS Battery & Wall Breaker Sizer');
    addBotMessage({
      text: 'Which electrical calculation do you need?',
      options: [
        {
          label: '🔋 Size UPS Battery Backup for Outages',
          action: () => {
            addUserMessage('Size UPS Battery');
            addBotMessage({
              text: 'Calculate VA rating, Pure Sine Wave requirements, and runtime (minutes) to save your work during blackouts:',
              actionLink: {
                text: 'Open UPS Sizing Hub →',
                url: '/ups-for/',
              },
            });
          },
        },
        {
          label: '🔌 Check if PC will trip Room Circuit Breaker',
          action: () => {
            addUserMessage('Circuit Breaker Check');
            addBotMessage({
              text: 'Audit total amperage on your 15A/20A 120V household branch circuit following the NEC 80% continuous load derating rule:',
              actionLink: {
                text: 'Open Circuit Breaker Auditor →',
                url: '/compare/breaker-calculator',
              },
            });
          },
        },
      ],
    });
  };

  // -------------------------------------------------------------
  // BRANCH 6: Best PSU Recommendations
  // -------------------------------------------------------------
  const handleBestPsuFlow = () => {
    addUserMessage('Best PSU Tier Recommendations');
    addBotMessage({
      text: 'VoltForge evaluates power supplies using real Cybenetics noise & efficiency certifications. Which wattage category do you want to explore?',
      options: [
        { label: '🏆 Tier A Best PSUs (All Wattages)', action: () => handleGoToPage('/best-psu') },
        { label: '⚡ 750W vs 850W Comparison Guide', action: () => handleGoToPage('/guides/750w-vs-850w-psu') },
        { label: '📊 PSU Reliability & Failure Database', action: () => handleGoToPage('/psu-reliability/') },
      ],
    });
  };

  const handleGoToPage = (url: string) => {
    addBotMessage({
      text: 'Here is the direct tool page you requested:',
      actionLink: {
        text: 'Go to Page →',
        url,
      },
    });
  };

  // Free-form input submit with keyword parsing
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    addUserMessage(query);
    setInputValue('');

    const lower = query.toLowerCase();

    if (lower.includes('5090') || lower.includes('5080') || lower.includes('4090')) {
      addBotMessage({
        text: `For high-TBP GPUs like the RTX 5090/5080/4090, transient power spikes can reach 900W+. We recommend an **850W–1000W ATX 3.1 PSU** with native 12V-2x6 connectors.`,
        actionLink: {
          text: 'Open Sizing Workbench →',
          url: '/psu-calculator?gpu=rtx-5090&cpu=ryzen-7-9800x3d',
        },
      });
    } else if (lower.includes('shut') || lower.includes('crash') || lower.includes('restart') || lower.includes('black screen')) {
      addBotMessage({
        text: `Sudden restarts under heavy gaming load are usually caused by PSU over-current protection (OCP) tripping on transient spikes.`,
        actionLink: {
          text: 'Run Diagnostic Triage →',
          url: '/diagnose/',
        },
      });
    } else if (lower.includes('cable') || lower.includes('pinout') || lower.includes('modular')) {
      addBotMessage({
        text: `⚠️ Never mix modular cables from different PSU brands. Corsair, Seasonic, EVGA, and be quiet! all use incompatible pin configurations on the PSU side.`,
        warning: true,
        actionLink: {
          text: 'View Modular Cable Safety Matrix →',
          url: '/compatibility/',
        },
      });
    } else if (lower.includes('ups') || lower.includes('battery') || lower.includes('outage')) {
      addBotMessage({
        text: `To protect your PC during power outages, select a Pure Sine Wave UPS rated with at least 25% VA headroom above your transient peak.`,
        actionLink: {
          text: 'Open UPS Sizer →',
          url: '/ups-for/',
        },
      });
    } else if (lower.includes('breaker') || lower.includes('amp') || lower.includes('trip')) {
      addBotMessage({
        text: `Check your 15A/20A wall breaker capacity under the 80% NEC continuous load rule:`,
        actionLink: {
          text: 'Open Circuit Breaker Calculator →',
          url: '/compare/breaker-calculator',
        },
      });
    } else if (lower.includes('build') || lower.includes('pc') || lower.includes('cost')) {
      addBotMessage({
        text: `You can plan and calculate the total cost and power of a full multi-part PC build in our workbench:`,
        actionLink: {
          text: 'Open Full PC Builder →',
          url: '/pc-builder',
        },
      });
    } else {
      addBotMessage({
        text: `I found several tools that match your query. Choose an option or try asking about a specific GPU (e.g. 5090), PSU wattage (e.g. 750W), or symptom (e.g. shutdown):`,
        options: [
          { label: '⚡ PSU Sizing Calculator', action: () => handleGoToPage('/psu-calculator') },
          { label: '🛠️ Full PC Builder', action: () => handleGoToPage('/pc-builder') },
          { label: '🔄 GPU Upgrade Checker', action: () => handleGoToPage('/compare/gpu-upgrade-checker') },
          { label: '🔍 PSU Diagnostic Wizard', action: () => handleGoToPage('/diagnose/') },
        ],
      });
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <aside aria-label="AI Hardware Assistant">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close AI Hardware Assistant' : 'Open AI Hardware Assistant'}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '9999px',
            backgroundColor: 'var(--color-surface-raised, #111118)',
            color: 'var(--color-text-primary, #ffffff)',
            border: '1px solid var(--color-accent-cyan, #00e5ff)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 229, 255, 0.2)',
            cursor: 'pointer',
            fontFamily: 'var(--font-display, inherit)',
            fontWeight: 700,
            fontSize: '0.875rem',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
          className="voltbot-launcher"
        >
          <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>⚡</span>
          <span>Ask VoltBot</span>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#00e676',
              boxShadow: '0 0 6px #00e676',
            }}
          />
        </button>

        {/* Chatbot Window */}
        {isOpen && (
          <div
            role="dialog"
            aria-label="VoltBot AI Hardware Sizing Assistant"
            style={{
              position: 'fixed',
              bottom: '5.25rem',
              right: '1.5rem',
              width: 'min(380px, calc(100vw - 2rem))',
              height: '520px',
              maxHeight: 'calc(100vh - 7rem)',
              zIndex: 1000,
              backgroundColor: 'var(--color-surface-base, #0a0a0f)',
              border: '1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.12))',
              borderRadius: '16px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 229, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '0.875rem 1rem',
                backgroundColor: 'var(--color-surface-sunken, #050507)',
                borderBottom: '1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08))',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 229, 255, 0.15)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                  }}
                >
                  ⚡
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--color-text-primary, #ffffff)' }}>
                    VoltBot Assistant
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary, #94a3b8)' }}>
                    Deterministic Hardware Sizer
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button
                  onClick={startConversation}
                  aria-label="Restart Conversation"
                  title="Restart Conversation"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-text-secondary, #94a3b8)',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: '6px',
                    fontSize: '0.8125rem',
                  }}
                >
                  🔄
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Assistant"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-text-secondary, #94a3b8)',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: '6px',
                    fontSize: '1.1rem',
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div
              style={{
                flex: 1,
                padding: '1rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.875rem',
              }}
            >
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    gap: '0.375rem',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '88%',
                      padding: '0.75rem 0.875rem',
                      borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      backgroundColor: msg.sender === 'user'
                        ? 'var(--color-accent-cyan, #00e5ff)'
                        : msg.warning
                        ? 'rgba(239, 68, 68, 0.12)'
                        : 'var(--color-surface-raised, #161622)',
                      color: msg.sender === 'user'
                        ? '#050507'
                        : msg.warning
                        ? '#ef4444'
                        : 'var(--color-text-primary, #f1f5f9)',
                      border: msg.sender === 'user'
                        ? 'none'
                        : msg.warning
                        ? '1px solid rgba(239, 68, 68, 0.3)'
                        : '1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08))',
                      fontSize: '0.8125rem',
                      lineHeight: 1.5,
                      fontWeight: msg.sender === 'user' ? 600 : 400,
                    }}
                  >
                    {msg.text}
                  </div>

                  {/* Direct Action Link Card */}
                  {msg.actionLink && (
                    <a
                      href={msg.actionLink.url}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        padding: '0.625rem 0.875rem',
                        backgroundColor: 'rgba(0, 229, 255, 0.1)',
                        border: '1px solid var(--color-accent-cyan, #00e5ff)',
                        borderRadius: '8px',
                        color: 'var(--color-accent-cyan, #00e5ff)',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        maxWidth: '88%',
                        marginTop: '0.25rem',
                      }}
                    >
                      <span>{msg.actionLink.text}</span>
                      {msg.actionLink.badge && (
                        <span style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(0, 229, 255, 0.2)' }}>
                          {msg.actionLink.badge}
                        </span>
                      )}
                    </a>
                  )}

                  {/* Option Choice Chips */}
                  {msg.options && msg.options.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.375rem' }}>
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={opt.action}
                          style={{
                            padding: '5px 10px',
                            backgroundColor: 'var(--color-surface-raised, #1a1a28)',
                            color: 'var(--color-text-primary, #e2e8f0)',
                            border: '1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.15))',
                            borderRadius: '9999px',
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'border-color 150ms ease, background 150ms ease',
                          }}
                          className="hover-chip"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0.5rem', color: 'var(--color-text-tertiary, #94a3b8)', fontSize: '0.75rem' }}>
                  <span>VoltBot is thinking</span>
                  <span className="dot-pulse">...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* User Input Bar */}
            <form
              onSubmit={handleSubmit}
              style={{
                padding: '0.625rem 0.75rem',
                backgroundColor: 'var(--color-surface-sunken, #050507)',
                borderTop: '1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08))',
                display: 'flex',
                gap: '0.5rem',
              }}
            >
              <input
                type="text"
                value={inputValue}
                onInput={(e: any) => setInputValue(e.target.value)}
                placeholder="Ask about 5090, 750W, shutdown..."
                aria-label="Ask VoltBot a hardware sizing question"
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-surface-base, #0a0a0f)',
                  border: '1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.15))',
                  color: 'var(--color-text-primary, #ffffff)',
                  fontSize: '0.75rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                aria-label="Send Message"
                style={{
                  padding: '0.5rem 0.875rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-accent-cyan, #00e5ff)',
                  color: '#050507',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </aside>

      <style>{`
        .voltbot-launcher:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 229, 255, 0.35) !important;
        }
        .hover-chip:hover {
          border-color: var(--color-accent-cyan, #00e5ff) !important;
          background-color: rgba(0, 229, 255, 0.1) !important;
          color: var(--color-accent-cyan, #00e5ff) !important;
        }
        @keyframes pulse-dots {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .dot-pulse {
          animation: pulse-dots 1.2s infinite;
        }
      `}</style>
    </>
  );
}
