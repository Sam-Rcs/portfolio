"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

const BASE_LEN  = 72;    // natural rope length
const DOT_COUNT = 14;    // rope dot beads
const AX        = 14;    // anchor x inside SVG coords
const THRESHOLD = 35;   // ky (pixels) needed to toggle (lowered for responsive feel)

// ── Beaded dot rope: draws dots from anchor → knob ──────────────────────────
function DotRope({ toX, toY, color }: { toX: number; toY: number; color: string }) {
  return (
    <>
      {Array.from({ length: DOT_COUNT }, (_, i) => {
        const t = (i + 1) / (DOT_COUNT + 1);
        const x = AX + (toX - AX) * t;
        const y = (toY) * t;
        const big = i % 4 === 0;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={big ? 3.2 : 2}
            fill={big ? color : color + "cc"}
          />
        );
      })}
    </>
  );
}

export default function LampToggle() {
  const [isDark,   setIsDark]   = useState(false);
  const [toggling, setToggling] = useState(false);
  const [end,      setEnd]      = useState({ x: AX, y: BASE_LEN });

  // Framer-motion drag values (x/y offsets from rest position)
  const kx = useMotionValue(0);
  const ky = useMotionValue(0);

  // Rebuild rope on every drag frame
  useMotionValueEvent(kx, "change", () =>
    setEnd({ x: AX + kx.get(), y: BASE_LEN + ky.get() })
  );
  useMotionValueEvent(ky, "change", () =>
    setEnd({ x: AX + kx.get(), y: BASE_LEN + ky.get() })
  );

  useEffect(() => {
    const s = localStorage.getItem("portfolio-theme");
    if (s === "dark") {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    setToggling(true);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("portfolio-theme", next ? "dark" : "light");
    setTimeout(() => setToggling(false), 600);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) => {
    const pulledY = ky.get();
    const offsetY = info?.offset?.y ?? 0;
    if (pulledY >= THRESHOLD || offsetY >= THRESHOLD) {
      toggleTheme();
    }
    // Spring back
    animate(kx, 0, { type: "spring", stiffness: 240, damping: 15, mass: 1 });
    animate(ky, 0, { type: "spring", stiffness: 240, damping: 15, mass: 1 });
  };

  const dotColor    = isDark ? "#38bdf8" : "#64748b";
  const anchorColor = isDark ? "#38bdf8" : "#94a3b8";
  const knobBg      = isDark ? "#0f172a" : "#f1f5f9";
  const knobBorder  = isDark ? "#38bdf8" : "#94a3b8";
  const glowColor   = isDark ? "rgba(56,189,248,0.7)" : "rgba(251,191,36,0.7)";

  return (
    <>
      {/* Thin gradient strip — looks like the rope is attached to the top edge */}
      <div
        className="fixed top-0 right-0 z-[499] pointer-events-none"
        style={{
          width: 80,
          height: 2,
          background: `linear-gradient(to left, ${anchorColor}99, transparent)`,
          transition: "background 0.5s ease",
        }}
      />

      {/* ── Rope container — fixed top-right ── */}
      <div
        className="fixed top-0 right-5 z-[500]"
        style={{ width: 30, pointerEvents: "none" }}
      >
        {/* Anchor dot — attaches to top bar */}
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: anchorColor,
            margin: "0 auto",
            boxShadow: isDark ? `0 0 6px ${anchorColor}` : "none",
            transition: "background 0.5s ease",
          }}
        />

        {/* SVG overlay: the dot rope (overflow:visible lets it swing freely) */}
        <svg
          style={{
            position: "absolute",
            top: 6,
            left: 0,
            width: 30,
            height: BASE_LEN,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <DotRope toX={end.x} toY={end.y} color={dotColor} />
        </svg>

        {/* ── Draggable knob — positioned at rope natural end ── */}
        <motion.div
          drag
          dragConstraints={{ top: -8, bottom: 220, left: -140, right: 60 }}
          dragElastic={{ top: 0.4, bottom: 0.8, left: 0.75, right: 0.65 }}
          onDragEnd={handleDragEnd}
          onTap={() => {
            if (Math.abs(ky.get()) < 15 && Math.abs(kx.get()) < 15) {
              toggleTheme();
            }
          }}
          style={{
            x: kx,
            y: ky,
            position: "absolute",
            top: BASE_LEN - 4,
            left: "50%",
            marginLeft: -14,
            pointerEvents: "auto",
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: knobBg,
            border: `2px solid ${knobBorder}`,
            boxShadow: toggling
              ? `0 0 22px ${glowColor}, 0 4px 12px rgba(0,0,0,0.2)`
              : `0 3px 10px rgba(0,0,0,0.15)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            cursor: "grab",
            userSelect: "none",
            transition: "background 0.5s ease, border-color 0.5s ease",
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9, cursor: "grabbing" }}
          title="Pull down to toggle dark / light"
        >
          {isDark ? "🌙" : "☀️"}
        </motion.div>
      </div>
    </>
  );
}
