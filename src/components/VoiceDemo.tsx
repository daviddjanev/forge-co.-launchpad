import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { SilverSurferScene } from "./SilverSurferScene";

/**
 * Voice agent demo block.
 *
 * Designed to be wired to ElevenLabs Conversational AI via the
 * `@elevenlabs/react` `useConversation` hook. The integration point is
 * intentionally isolated to the `start()` and `stop()` callbacks below —
 * once the user creates the agent, swap the placeholder logic for:
 *
 *   import { useConversation } from "@elevenlabs/react";
 *   const conversation = useConversation({ ... });
 *   await conversation.startSession({ agentId: "...", connectionType: "webrtc" });
 *
 * Until then, this renders a fully animated mock so the visual + UX are
 * production-ready.
 */
type Status = "idle" | "connecting" | "live" | "ending";

export function VoiceDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [seconds, setSeconds] = useState(0);
  const [bars, setBars] = useState<number[]>(() => Array(28).fill(0.1));
  const rafRef = useRef<number | null>(null);
  const startedAtRef = useRef<number>(0);

  // Animate the visualizer + duration while "live"
  useEffect(() => {
    if (status !== "live") return;
    startedAtRef.current = performance.now();
    const tick = (now: number) => {
      const t = (now - startedAtRef.current) / 1000;
      setSeconds(Math.floor(t));
      // Synth waveform — replace with conversation.getOutputByteFrequencyData()
      const next = Array.from({ length: 28 }, (_, i) => {
        const phase = i * 0.45;
        const v =
          Math.sin(t * 6 + phase) * 0.4 +
          Math.sin(t * 13 + phase * 1.7) * 0.3 +
          Math.sin(t * 21 + phase * 0.6) * 0.2;
        return 0.15 + Math.abs(v) * 0.85;
      });
      setBars(next);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [status]);

  const start = useCallback(async () => {
    setStatus("connecting");
    try {
      // INTEGRATION POINT — when the ElevenLabs agent exists:
      //   await navigator.mediaDevices.getUserMedia({ audio: true });
      //   const { data } = await fetch("/api/elevenlabs/token").then(r => r.json());
      //   await conversation.startSession({ conversationToken: data.token, connectionType: "webrtc" });
      await new Promise((r) => setTimeout(r, 900));
      setStatus("live");
    } catch (e) {
      console.error(e);
      setStatus("idle");
    }
  }, []);

  const stop = useCallback(async () => {
    setStatus("ending");
    // INTEGRATION POINT: await conversation.endSession();
    await new Promise((r) => setTimeout(r, 350));
    setStatus("idle");
    setSeconds(0);
  }, []);

  const isLive = status === "live";
  const isConnecting = status === "connecting";

  return (
    <section
      id="demo"
      className="relative bg-background border-t border-border overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-gold opacity-50 pointer-events-none" />
      <div className="container-x max-w-[1400px] mx-auto py-24 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              ⟶ Live demo
            </div>
            <h2 className="font-display text-5xl md:text-6xl leading-[0.95] mt-4">
              Talk to a Forge agent.
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
              No forms. No "book a demo". Tap the mic and ask anything you'd ask
              a real receptionist — pricing, availability, how we work. The
              agent handles the rest.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              {[
                "Sub-second response time",
                "Interruptible, like a real person",
                "Voice tuned to brand tone",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-border bg-surface/80 backdrop-blur p-8 md:p-10 shadow-elevated">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isLive
                        ? "bg-gold animate-glow-pulse"
                        : isConnecting
                          ? "bg-gold/70"
                          : "bg-border-strong"
                    }`}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {isLive
                      ? `Live · ${formatTime(seconds)}`
                      : isConnecting
                        ? "Connecting…"
                        : "Idle"}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">
                  Forge Receptionist · v1
                </span>
              </div>

              {/* Visualizer — gold Silver Surfer reacting to the agent */}
              <div className="mt-8 relative h-[340px] md:h-[400px] rounded-2xl border border-border/60 bg-gradient-to-b from-surface/40 to-background/20 overflow-hidden">
                <div className="absolute inset-0 bg-radial-gold opacity-40 pointer-events-none" />
                <SilverSurferScene level={level} speaking={isLive} />
                <div className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/70">
                  <span className={`h-1 w-1 rounded-full ${isLive ? "bg-gold animate-glow-pulse" : "bg-border-strong"}`} />
                  {isLive ? "Agent · listening" : "Agent · standby"}
                </div>
                {/* Slim waveform strip below the bust */}
                <div className="absolute bottom-0 left-0 right-0 h-10 flex items-end justify-center gap-[3px] px-6 pb-2 pointer-events-none">
                  {bars.map((h, i) => (
                    <span
                      key={i}
                      className={`w-[2px] rounded-full ${isLive ? "bg-gold" : "bg-border-strong"}`}
                      style={{
                        height: `${(isLive ? h : 0.12) * 100}%`,
                        opacity: isLive ? 0.5 + h * 0.5 : 0.4,
                        transition: isLive ? "height 80ms linear" : "height 400ms cubic-bezier(0.22,1,0.36,1)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Control */}
              <div className="mt-10 flex flex-col items-center gap-4">
                <button
                  type="button"
                  onClick={isLive ? stop : start}
                  disabled={isConnecting || status === "ending"}
                  className={`group relative inline-flex h-20 w-20 items-center justify-center rounded-full transition-all ${
                    isLive
                      ? "bg-surface border border-gold/60 hover:border-gold"
                      : "bg-gradient-gold text-primary-foreground hover:shadow-gold disabled:opacity-70"
                  }`}
                  aria-label={isLive ? "End call" : "Start call"}
                >
                  {isConnecting ? (
                    <Loader2 className="h-7 w-7 animate-spin text-gold" />
                  ) : isLive ? (
                    <MicOff className="h-7 w-7 text-gold" />
                  ) : (
                    <Mic className="h-7 w-7" />
                  )}
                  {isLive && (
                    <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping" />
                  )}
                </button>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {isLive ? "Tap to end" : isConnecting ? "Granting mic…" : "Tap to talk"}
                </span>
              </div>

              <p className="mt-8 text-center text-[11px] text-muted-foreground/70 max-w-sm mx-auto">
                Demo runs locally in your browser. Microphone audio is streamed
                only while the call is live.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}`;
}
