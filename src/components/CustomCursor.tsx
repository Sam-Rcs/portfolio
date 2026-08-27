"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Custom cursor ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 12),
          y: mousePosition.y - (isHovering ? 20 : 12),
          width: isHovering ? 40 : 24,
          height: isHovering ? 40 : 24,
        }}
        style={{
          background: isHovering ? "rgba(0,212,255,0.15)" : "transparent",
          border: isHovering ? "1px solid rgba(0,212,255,0.6)" : "1.5px solid rgba(0,212,255,0.7)",
          boxShadow: isHovering
            ? "0 0 15px rgba(0,212,255,0.3), inset 0 0 10px rgba(0,212,255,0.1)"
            : "0 0 8px rgba(0,212,255,0.4)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
      />

      {/* Cursor dot */}
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

      {/* Flashlight spotlight */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-10 mix-blend-screen"
        animate={{
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 255, 0.12), transparent 40%)`
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />
      <motion.div
        className="fixed inset-0 pointer-events-none z-20 mix-blend-overlay"
        animate={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.08), transparent 40%)`
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />
    </>
  );
}
