import { useState } from "react";
import type {
  QuoteState,
  ServiceChoice,
  WebsiteTier,
  VoiceAgentTier,
  CallVolume,
  BusinessType,
} from "./types";
import { ProgressBar } from "./ProgressBar";
import { StepBusinessType } from "./StepBusinessType";
import { StepServices } from "./StepServices";
import { StepWebsite } from "./StepWebsite";
import { StepVoiceAgent } from "./StepVoiceAgent";
import { StepEstimate } from "./StepEstimate";

const INITIAL_STATE: QuoteState = {
  businessType: null,
  service: null,
  website: null,
  voiceAgent: null,
};

export function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<QuoteState>(INITIAL_STATE);

  const needsWebsite = state.service === "website" || state.service === "both";
  const needsVoice = state.service === "voice" || state.service === "both";

  const totalSteps = () => {
    if (!state.service) return 5;
    if (state.service === "both") return 5;
    return 4; // website-only or voice-only skips one middle step
  };

  const handleNext = () => {
    if (step === 2) {
      if (state.service === "voice") {
        setStep(4);
        return;
      }
    }
    if (step === 3 && !needsVoice) {
      setStep(5);
      return;
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step === 4 && state.service === "voice") {
      setStep(2);
      return;
    }
    if (step === 5 && state.service === "website") {
      setStep(3);
      return;
    }
    setStep((s) => s - 1);
  };

  const reset = () => {
    setStep(1);
    setState(INITIAL_STATE);
  };

  const displayStep = () => {
    if (state.service === "voice") {
      if (step === 4) return 3;
      if (step === 5) return 4;
    }
    if (state.service === "website") {
      if (step === 5) return 4;
    }
    return step;
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container-x max-w-2xl mx-auto px-6">
        <ProgressBar current={displayStep()} total={totalSteps()} />
        <div className="animate-fade-in">
          {step === 1 && (
            <StepBusinessType
              value={state.businessType}
              onChange={(v: BusinessType) =>
                setState((s) => ({ ...s, businessType: v }))
              }
              onNext={handleNext}
            />
          )}
          {step === 2 && (
            <StepServices
              value={state.service}
              onChange={(v: ServiceChoice) => {
                setState((s) => ({
                  ...s,
                  service: v,
                  website:
                    v === "voice"
                      ? null
                      : s.website ?? { tier: "basic", rush: false },
                  voiceAgent:
                    v === "website"
                      ? null
                      : s.voiceAgent ?? { tier: "standard", volume: "small" },
                }));
              }}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 3 && needsWebsite && (
            <StepWebsite
              tier={state.website?.tier ?? "basic"}
              rush={state.website?.rush ?? false}
              onTierChange={(t: WebsiteTier) =>
                setState((s) => ({
                  ...s,
                  website: { tier: t, rush: s.website?.rush ?? false },
                }))
              }
              onRushChange={(r: boolean) =>
                setState((s) => ({
                  ...s,
                  website: { tier: s.website?.tier ?? "basic", rush: r },
                }))
              }
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 4 && needsVoice && (
            <StepVoiceAgent
              tier={state.voiceAgent?.tier ?? "standard"}
              volume={state.voiceAgent?.volume ?? "small"}
              onTierChange={(t: VoiceAgentTier) =>
                setState((s) => ({
                  ...s,
                  voiceAgent: { tier: t, volume: s.voiceAgent?.volume ?? "small" },
                }))
              }
              onVolumeChange={(v: CallVolume) =>
                setState((s) => ({
                  ...s,
                  voiceAgent: { tier: s.voiceAgent?.tier ?? "standard", volume: v },
                }))
              }
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 5 && (
            <StepEstimate state={state} onBack={handleBack} onReset={reset} />
          )}
        </div>
      </div>
    </div>
  );
}
