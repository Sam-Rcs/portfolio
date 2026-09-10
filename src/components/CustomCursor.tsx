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

  // On 3D page, use native high-performance cursor to avoid GPU readback overhead & lag
  if (is3DPage) {
    return null;
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
