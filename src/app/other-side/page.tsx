"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, ChevronRight, Moon, Sun } from "lucide-react";
import GoldenBulletShowcase from "@/components/other-side/GoldenBulletShowcase";
import GoldenBento from "@/components/other-side/GoldenBento";
import GoldenProjects from "@/components/other-side/GoldenProjects";

export default function OtherSidePage() {
  const [isDark, setIsDark] = useState(true);

  // Sync theme with LampToggle & document data-theme
  useEffect(() => {
    const checkTheme = () => {
      const themeAttr = document.documentElement.getAttribute("data-theme");
      const stored = localStorage.getItem("portfolio-theme");
      const isDarkMode = themeAttr === "dark" || stored === "dark" || (!themeAttr && !stored);
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Listen to attribute changes on <html> caused by LampToggle
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "data-theme") {
          checkTheme();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });
    window.addEventListener("storage", checkTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", checkTheme);
    };
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-700 selection:bg-amber-400 selection:text-black relative ${
        isDark ? "bg-[#060402] text-[#fef3c7]" : "bg-[#fbf8f2] text-[#451a03]"
      }`}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Outfit", "Segoe UI", sans-serif',
      }}
    >
      {/* Royal Black & Gold Minimal Top Navigation */}
      <header
        className="sticky top-0 z-50 w-full px-6 py-3.5 flex items-center justify-between border-b transition-colors duration-500"
        style={{
          borderColor: isDark ? "rgba(251, 191, 36, 0.15)" : "rgba(217, 119, 6, 0.15)",
          background: isDark ? "rgba(6, 4, 2, 0.85)" : "rgba(251, 248, 242, 0.85)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all duration-300"
            style={{
              borderColor: isDark ? "rgba(251, 191, 36, 0.25)" : "rgba(217, 119, 6, 0.25)",
              background: isDark ? "rgba(251, 191, 36, 0.05)" : "rgba(217, 119, 6, 0.05)",
              color: isDark ? "#fef3c7" : "#78350f",
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400 transition-transform group-hover:-translate-x-1" />
            <span>Standard Portfolio</span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-amber-400/90 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            SAMEER KHAN &bull; GOLDEN GALAXY
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Indicator */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border"
            style={{
              borderColor: isDark ? "rgba(251, 191, 36, 0.2)" : "rgba(217, 119, 6, 0.2)",
              color: isDark ? "#fef3c7" : "#78350f",
            }}
          >
            {isDark ? <Moon className="w-3 h-3 text-amber-400" /> : <Sun className="w-3 h-3 text-amber-600" />}
            <span>{isDark ? "Obsidian Gold Mode" : "Champagne Pearl Mode"}</span>
          </div>

          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            Exit
          </Link>
        </div>
      </header>

      {/* Main Experience */}
      <main>
        {/* The Golden Bullet Piercing Scroll Showcase */}
        <GoldenBulletShowcase isDark={isDark} />

        {/* Royal Black & Gold Bento Grid */}
        <GoldenBento isDark={isDark} />

        {/* Deployed Systems Showcase */}
        <GoldenProjects isDark={isDark} />
      </main>

      {/* Return Footer */}
      <footer
        className="py-24 px-6 border-t text-center transition-colors duration-500"
        style={{
          borderColor: isDark ? "rgba(251, 191, 36, 0.15)" : "rgba(217, 119, 6, 0.15)",
          background: isDark ? "rgba(6, 4, 2, 0.95)" : "rgba(251, 248, 242, 0.95)",
        }}
      >
        <div className="max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest text-amber-400 uppercase border border-amber-500/20">
            <Sparkles className="w-3 h-3" />
            <span>End of Galaxy Realm</span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Return to the standard portfolio.
          </h4>
          <p className="text-sm text-neutral-400 leading-relaxed">
            All systems verified and accessible in standard format for review.
          </p>
          <div className="pt-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)]"
            >
              <span>Return to Main Portfolio</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
