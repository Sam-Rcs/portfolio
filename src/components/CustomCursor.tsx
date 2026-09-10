"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const pathname = usePathname();
  const is3DPage = pathname === "/other-side";

  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 2000);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".neu-raised") ||
        target.closest(".neu-btn")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearTimeout(timeout);
    };
  }, []);

  // ── Ultra-Sleek Cursor for 3D Canvas Scrubbing Page ──────────────────────────
  if (is3DPage) {
    return (
      <>
        {/* Sleek Outer Ring / Scrub Pill */}
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
          animate={{
            x: mousePosition.x - (isHovering ? 24 : isMouseDown ? 16 : 20),
            y: mousePosition.y - (isHovering ? 24 : isMouseDown ? 16 : 20),
            width: isHovering ? 48 : isMouseDown ? 32 : 40,
            height: isHovering ? 48 : isMouseDown ? 32 : 40,
            scale: isMouseDown ? 0.85 : isHovering ? 1.25 : 1,
          }}
          transition={{ type: "spring", stiffness: 550, damping: 32, mass: 0.4 }}
        >
          <div
            className={`w-full h-full rounded-full transition-all duration-300 flex items-center justify-center ${
              isHovering
                ? "border-2 border-white bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                : "border border-white/70 bg-white/5 backdrop-blur-[1px]"
            }`}
          >
            {/* Subtle Horizontal Scrub Indicator when on 3D Canvas */}
            {!isHovering && !isMouseDown && (
              <div className="flex items-center gap-1 text-[8px] font-mono text-white opacity-60 tracking-tighter select-none">
                <span>‹</span>
                <span>›</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Precision Center Dot */}
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] bg-white mix-blend-difference"
          animate={{
            x: mousePosition.x - 3,
            y: mousePosition.y - 3,
            scale: isHovering ? 0 : isMouseDown ? 1.5 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 850, damping: 38 }}
        />
      </>
    );
  }

  // ── Default Clean Cursor for Main Homepage ──────────────────────────────────
  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 12),
          y: mousePosition.y - (isHovering ? 20 : 12),
          width: isHovering ? 40 : 24,
          height: isHovering ? 40 : 24,
          scale: isMouseDown ? 0.9 : 1,
        }}
        style={{
          background: isHovering ? "rgba(0,212,255,0.12)" : "transparent",
          border: isHovering ? "1px solid rgba(0,212,255,0.7)" : "1.5px solid rgba(0,212,255,0.5)",
          boxShadow: isHovering ? "0 0 15px rgba(0,212,255,0.25)" : "0 0 8px rgba(0,212,255,0.2)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: isHovering ? 0 : 1,
        }}
        style={{ background: "var(--color-primary)", boxShadow: "0 0 6px rgba(0,212,255,0.8)" }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
      />

      {/* Flashlight Spotlight on Main Page only */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-10 mix-blend-screen"
        animate={{
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 255, 0.08), transparent 40%)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />
    </>
  );
}
