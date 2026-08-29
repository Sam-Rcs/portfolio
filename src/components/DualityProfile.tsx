"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Zap, Shield, Coffee, Compass, Sparkles } from "lucide-react";

export default function DualityProfile() {
  const [activeMode, setActiveMode] = useState<"dev" | "rider">("dev");

  return (
    <div className="w-full my-10">
      {/* Top Toggle Switch with Neumorphic Styling */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-muted)]">
            Duality Protocol // The Two Sides
          </span>
        </div>

        <div
          className="inline-flex p-1.5 rounded-full items-center gap-2"
          style={{
            background: "var(--color-surface)",
            boxShadow:
              "inset 4px 4px 10px var(--color-shadow-dark), inset -4px -4px 10px var(--color-shadow-light)",
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <button
            onClick={() => setActiveMode("dev")}
            className="relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer"
            style={{
              color:
                activeMode === "dev"
                  ? "var(--color-primary)"
                  : "var(--color-muted)",
            }}
          >
            {activeMode === "dev" && (
              <motion.div
                layoutId="mode-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "var(--color-surface)",
                  boxShadow:
                    "4px 4px 10px var(--color-shadow-dark), -4px -4px 10px var(--color-shadow-light)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">👔 Software Engineer</span>
          </button>

          <button
            onClick={() => setActiveMode("rider")}
            className="relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer"
            style={{
              color:
                activeMode === "rider"
                  ? "var(--color-secondary)"
                  : "var(--color-muted)",
            }}
          >
            {activeMode === "rider" && (
              <motion.div
                layoutId="mode-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "var(--color-surface)",
                  boxShadow:
                    "4px 4px 10px var(--color-shadow-dark), -4px -4px 10px var(--color-shadow-light)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">🏍️ Midnight Rider</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Photo Card (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col">
          <motion.div
            className="relative rounded-3xl overflow-hidden p-3 flex-1 flex flex-col justify-between group"
            style={{
              background: "var(--color-surface)",
              boxShadow:
                "10px 10px 25px var(--color-shadow-dark), -10px -10px 25px var(--color-shadow-light)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            {/* Image Frame with Neumorphic Inset */}
            <div
              className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden"
              style={{
                boxShadow:
                  "inset 3px 3px 8px rgba(0,0,0,0.2), inset -3px -3px 8px rgba(255,255,255,0.2)",
              }}
            >
              <AnimatePresence mode="wait">
                {activeMode === "dev" ? (
                  <motion.div
                    key="dev-img"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <img
                      src="/images/developer-mode.jpg"
                      alt="Sameer Khan - Software Engineer Mode"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-[10px] font-mono font-semibold uppercase tracking-wider mb-1.5">
                        <Terminal className="w-3 h-3" />
                        Mode 01: The Architect
                      </div>
                      <p className="text-sm font-semibold text-white drop-shadow">
                        &quot;Build. Solve. Repeat. (Coffee)&quot;
                      </p>
                      <p className="text-[11px] text-slate-300 font-mono">
                        Desk setup · 42 open tabs · Clean Architecture
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="rider-img"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <img
                      src="/images/rider-mode.jpg"
                      alt="Sameer Khan - Biker Mode"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600/80 backdrop-blur-md text-[10px] font-mono font-semibold uppercase tracking-wider mb-1.5">
                        <Zap className="w-3 h-3" />
                        Mode 02: Zero Latency
                      </div>
                      <p className="text-sm font-semibold text-white drop-shadow">
                        &quot;No speed limits on highways or execution.&quot;
                      </p>
                      <p className="text-[11px] text-slate-300 font-mono">
                        Leather jacket · Helmet on · High octane
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick interactive hint */}
            <div className="flex items-center justify-between px-3 py-2 mt-2">
              <span className="text-[10px] font-mono text-[var(--color-muted)]">
                {activeMode === "dev" ? "STATUS: COMPILING" : "STATUS: CRUSING"}
              </span>
              <button
                onClick={() =>
                  setActiveMode(activeMode === "dev" ? "rider" : "dev")
                }
                className="text-[10px] font-mono text-[var(--color-primary)] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Switch view ⇄
              </button>
            </div>
          </motion.div>
        </div>

        {/* Narrative & Humor Card (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div
            className="rounded-3xl p-6 md:p-8 flex-1 flex flex-col justify-between relative overflow-hidden"
            style={{
              background: "var(--color-surface)",
              boxShadow:
                "10px 10px 25px var(--color-shadow-dark), -10px -10px 25px var(--color-shadow-light)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider bg-[var(--color-background)] text-[var(--color-primary)] border border-blue-500/20 font-bold">
                  // BEYOND THE SCREEN
                </span>
                <span className="text-xs text-[var(--color-muted)] font-mono">
                  Sameer Khan (Sam)
                </span>
              </div>

              {/* Catchy Headline */}
              <h3 className="text-2xl md:text-3xl font-black text-[var(--color-foreground)] tracking-tight leading-snug mb-4">
                Who said developers have to be{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-rose-600">
                  boring robots?
                </span>{" "}
                🤖✖️
              </h3>

              {/* Dynamic story based on selected mode */}
              <AnimatePresence mode="wait">
                {activeMode === "dev" ? (
                  <motion.div
                    key="dev-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 text-[var(--color-muted)] text-sm md:text-base leading-relaxed"
                  >
                    <p>
                      By day, I architect enterprise backends, tune database queries,
                      and obsess over sub-second API response times. If there is a
                      cleaner way to structure a microservice, I will rewrite it at 1:00 AM.
                    </p>
                    <p>
                      Mug motto:{" "}
                      <span className="text-[var(--color-foreground)] font-semibold">
                        &quot;Debugging my life since day 1&quot;
                      </span>
                      . I own features end-to-end — from database schemas to smooth UI pixels.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="rider-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 text-[var(--color-muted)] text-sm md:text-base leading-relaxed"
                  >
                    <p>
                      When the terminal closes, the helmet goes on. Midnight rides,
                      empty highways, and zero latency. Because high-performance code
                      demands high-performance adrenaline.
                    </p>
                    <p>
                      Balance is key:{" "}
                      <span className="text-[var(--color-foreground)] font-semibold">
                        clean code in the IDE, clear mind on the asphalt.
                      </span>{" "}
                      No bugs on the road (except the ones on the visor).
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Badges / Stats Bar */}
            <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5">
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-muted)] mb-3">
                Current Attributes & Hobbies
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { icon: <Coffee className="w-3.5 h-3.5 text-amber-500" />, label: "Espresso Fueled" },
                  { icon: <Zap className="w-3.5 h-3.5 text-rose-500" />, label: "Midnight Biker" },
                  { icon: <Terminal className="w-3.5 h-3.5 text-blue-500" />, label: "Full Stack Engineer" },
                  { icon: <Shield className="w-3.5 h-3.5 text-emerald-500" />, label: "Production Defender" },
                  { icon: <Compass className="w-3.5 h-3.5 text-violet-500" />, label: "Always Exploring" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[var(--color-foreground)]"
                    style={{
                      background: "var(--color-surface)",
                      boxShadow:
                        "3px 3px 8px var(--color-shadow-dark), -3px -3px 8px var(--color-shadow-light)",
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
