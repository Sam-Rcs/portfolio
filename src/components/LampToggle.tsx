"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const LAMP_H = 44;        // height of the SVG lamp shade
const ROPE_BASE = 52;     // default rope length (not pulled)
const KNOB_SIZE = 20;     // diameter of the pull knob
const PULL_THRESHOLD = 90; // drag distance to trigger toggle

export default function LampToggle() {
  const [isDark, setIsDark] = useState(false);
  const [toggling, setToggling] = useState(false);

  // The single motion value shared between drag and rope stretch
  const y = useMotionValue(0);

  // Rope visual height grows with drag
  const ropeHeight = useTransform(y, (yVal) => ROPE_BASE + Math.max(0, yVal));

  // Bulb glow brightens as rope is pulled past threshold
  const glowOpacity = useTransform(y, [0, PULL_THRESHOLD], [0, 1], { clamp: true });
  const glowScale   = useTransform(y, [0, PULL_THRESHOLD], [0.8, 1.4], { clamp: true });

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const handleDragEnd = () => {
    const pulled = y.get();
    if (pulled >= PULL_THRESHOLD) {
      const next = !isDark;
      setIsDark(next);
      setToggling(true);
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
      setTimeout(() => setToggling(false), 700);
    }
    // Elastic snap back
    animate(y, 0, {
      type: "spring",
      stiffness: 280,
      damping: 18,
      mass: 0.9,
    });
  };

  const mount   = isDark ? "#1e2a3a" : "#c8d1dc";
  const shade   = isDark ? "#1a2234" : "#dde5f0";
  const shadeBd = isDark ? "#2a3a52" : "#b8c4d4";
  const wire    = isDark ? "#334155" : "#94a3b8";
  const ropeClr = isDark ? "#475569" : "#94a3b8";
  const knobBg  = isDark ? "#1e293b" : "#dde5f0";
  const knobRing = isDark ? "#38bdf8" : "#94a3b8";

  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[500] flex flex-col items-center select-none"
      style={{ width: 60 }}
    >
      {/* ── Ceiling Mount ── */}
      <div
        className="w-10 h-2.5 rounded-b-lg"
        style={{ background: mount, transition: "background 0.5s ease" }}
      />

      {/* ── Wire from ceiling into lamp ── */}
      <div className="w-px h-3" style={{ background: wire, transition: "background 0.5s ease" }} />

      {/* ── Lamp Shade SVG ── */}
      <svg
        width="60"
        height={LAMP_H}
        viewBox="0 0 60 44"
        fill="none"
        style={{ filter: isDark ? "drop-shadow(0 4px 12px rgba(56,189,248,0.15))" : "none", transition: "filter 0.5s ease" }}
      >
        {/* Shade body (trapezoid) */}
        <path d="M12 4 L48 4 L42 36 L18 36 Z" fill={shade} stroke={shadeBd} strokeWidth="1.2" style={{ transition: "fill 0.5s ease, stroke 0.5s ease" }} />
        {/* Top cap */}
        <rect x="8" y="1" width="44" height="6" rx="3" fill={mount} style={{ transition: "fill 0.5s ease" }} />

        {/* Bulb glow ring — visible when pulling */}
        <motion.circle
          cx="30" cy="37" r="10"
          fill={isDark ? "rgba(251,191,36,0.25)" : "rgba(253,224,71,0.3)"}
          style={{ opacity: glowOpacity, scale: glowScale }}
        />

        {/* Bulb body */}
        <circle
          cx="30" cy="37" r="5"
          fill={isDark ? "#fde68a" : "#f1f5f9"}
          style={{
            filter: isDark
              ? "drop-shadow(0 0 8px #fbbf24)"
              : toggling ? "drop-shadow(0 0 6px #fbbf24)" : "none",
            transition: "filter 0.5s ease, fill 0.5s ease",
          }}
        />
      </svg>

      {/* ─── Rope + Knob layout using absolute positioning inside relative box ─── */}
      <div
        className="relative flex flex-col items-center"
        style={{ width: 60, height: ROPE_BASE + KNOB_SIZE + 160 }} // tall enough for max pull
      >
        {/* Stretchy Rope — grows with drag */}
        <motion.div
          className="absolute"
          style={{
            top: 0,
            left: "50%",
            marginLeft: -1,
            width: 2,
            height: ropeHeight,
            background: `linear-gradient(to bottom, ${ropeClr}, ${ropeClr}88)`,
            borderRadius: 1,
            transition: "background 0.5s ease",
          }}
        />

        {/* Pull Knob — draggable, sits at rope end */}
        <div
          className="absolute"
          style={{
            top: ROPE_BASE - KNOB_SIZE / 2,
            left: "50%",
            marginLeft: -KNOB_SIZE / 2,
          }}
        >
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.75 }}
            style={{ y }}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing"
            title={isDark ? "Pull to turn on lights ☀️" : "Pull to turn off lights 🌙"}
            whileHover={{ scale: 1.15 }}
          >
            <motion.div
              className="rounded-full flex items-center justify-center"
              style={{
                width: KNOB_SIZE,
                height: KNOB_SIZE,
                background: knobBg,
                boxShadow: isDark
                  ? `0 0 0 2px ${knobRing}, 0 2px 8px rgba(0,0,0,0.5), ${toggling ? "0 0 16px rgba(56,189,248,0.8)" : ""}`
                  : `0 0 0 2px ${knobRing}, 0 2px 8px rgba(0,0,0,0.15), ${toggling ? "0 0 16px rgba(251,191,36,0.6)" : ""}`,
                transition: "background 0.5s ease, box-shadow 0.3s ease",
              }}
              animate={toggling ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <span style={{ fontSize: 9, lineHeight: 1 }}>
                {isDark ? "🌙" : "☀️"}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Hint text */}
      <p
        className="text-[8px] font-mono tracking-[0.2em] uppercase mt-1 opacity-30 hover:opacity-60 transition-opacity"
        style={{ color: "var(--color-muted)" }}
      >
        pull
      </p>
    </div>
  );
}
