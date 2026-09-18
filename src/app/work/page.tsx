"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Server,
  Database,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  Code2,
  Sparkles,
  Layers,
  Terminal,
  Cpu
} from "lucide-react";
import { allProjects, ProjectType } from "@/components/ProjectsSection";

export default function WorkShowcasePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeProject = allProjects[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : allProjects.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < allProjects.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] py-8 px-4 sm:px-8 flex flex-col justify-between select-none">
      {/* ── Top Header ────────────────────────────────────────────────────────── */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 border-b border-black/5 dark:border-white/5">
        <Link
          href="/"
          className="neu-btn px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio Home</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[var(--color-muted)] hidden sm:inline">
            Project {currentIndex + 1} of {allProjects.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              title="Previous Project (Left Arrow)"
              className="neu-btn p-2.5 rounded-xl hover:text-[var(--color-primary)] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              title="Next Project (Right Arrow)"
              className="neu-btn p-2.5 rounded-xl hover:text-[var(--color-primary)] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Case Study Deck Viewport ─────────────────────────────────────── */}
      <div className="max-w-6xl w-full mx-auto my-8 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full rounded-3xl p-8 sm:p-12 relative overflow-hidden"
            style={{
              background: "var(--color-surface)",
              boxShadow: "12px 12px 30px var(--color-shadow-dark), -12px -12px 30px var(--color-shadow-light)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Ambient Background Accent Glow */}
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
              style={{ background: activeProject.highlightColor }}
            />

            {/* Category & Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: activeProject.highlightColor, boxShadow: `0 0 10px ${activeProject.highlightColor}` }}
                />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)] font-bold">
                  {activeProject.categoryLabel}
                </span>
                {activeProject.featured && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 text-amber-500 font-bold border border-amber-500/30">
                    FLAGSHIP SYSTEM
                  </span>
                )}
              </div>

              <span className="font-mono text-xs text-[var(--color-muted)]">
                {activeProject.date}
              </span>
            </div>

            {/* Giant Bold Project Title */}
            <h1 className="text-3xl sm:text-5xl font-black text-[var(--color-foreground)] tracking-tight mb-4 relative z-10">
              {activeProject.title}
            </h1>

            {/* Comprehensive Description */}
            <p className="text-base sm:text-lg text-[var(--color-muted)] font-light leading-relaxed max-w-4xl mb-8 relative z-10">
              {activeProject.description}
            </p>

            {/* Key Technical Wins & Metrics */}
            <div className="mb-8 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--color-muted)] mb-3">
                Key Deliverables &amp; Architectural Wins
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {activeProject.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="neu-inset px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 text-[var(--color-foreground)] border border-black/5 dark:border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Stack Breakdown */}
            <div className="mb-8 p-6 rounded-2xl neu-inset relative z-10 border border-black/5 dark:border-white/5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary)] mb-4 flex items-center gap-2 font-bold">
                <Layers className="w-4 h-4" />
                <span>Full Architectural Stack</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                {activeProject.details.backend && (
                  <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-black/5 dark:border-white/5">
                    <span className="text-[10px] text-blue-500 uppercase tracking-wider block mb-1.5 font-bold">
                      Backend &amp; Services
                    </span>
                    {activeProject.details.backend.map(b => (
                      <span key={b} className="block text-[var(--color-foreground)] font-semibold">{b}</span>
                    ))}
                  </div>
                )}

                {(activeProject.details.frontend || activeProject.details.mobile) && (
                  <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-black/5 dark:border-white/5">
                    <span className="text-[10px] text-violet-500 uppercase tracking-wider block mb-1.5 font-bold">
                      Frontend &amp; Interface
                    </span>
                    {[...(activeProject.details.frontend ?? []), ...(activeProject.details.mobile ?? [])].map(f => (
                      <span key={f} className="block text-[var(--color-foreground)] font-semibold">{f}</span>
                    ))}
                  </div>
                )}

                {activeProject.details.database && (
                  <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-black/5 dark:border-white/5">
                    <span className="text-[10px] text-cyan-500 uppercase tracking-wider block mb-1.5 font-bold">
                      Persistence &amp; Cache
                    </span>
                    {activeProject.details.database.map(d => (
                      <span key={d} className="block text-[var(--color-foreground)] font-semibold">{d}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Developer Humor Note */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-500 mb-6 flex items-start gap-2 relative z-10">
              <span className="shrink-0 text-base">💡</span>
              <p className="leading-relaxed">
                <strong className="text-amber-500 font-bold">Behind The Code:</strong> {activeProject.humor}
              </p>
            </div>

            {/* Technologies Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 dark:border-white/5 relative z-10">
              {activeProject.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono bg-[var(--color-surface)] border border-black/5 dark:border-white/5 text-[var(--color-muted)] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom Selector Deck Pill ─────────────────────────────────────────── */}
      <footer className="max-w-6xl w-full mx-auto pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Project Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1 no-scrollbar">
          {allProjects.map((p, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-105"
                    : "neu-inset text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                }`}
              >
                <span>{idx + 1}. {p.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Keyboard navigation hint */}
        <div className="text-xs font-mono text-[var(--color-muted)] shrink-0 hidden md:block">
          Use ← / → arrow keys to flip through projects
        </div>
      </footer>
    </main>
  );
}
