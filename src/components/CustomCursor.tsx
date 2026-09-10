"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const pathname = usePathname();
  const isGoldenPage = pathname === "/other-side";

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

  // Colors based on page theme
  const ringBorder = isGoldenPage
    ? isHovering
      ? "1.5px solid rgba(255, 215, 0, 0.95)"
      : "1.5px solid rgba(251, 191, 36, 0.8)"
    : isHovering
      ? "1px solid rgba(0,212,255,0.6)"
      : "1.5px solid rgba(0,212,255,0.7)";

  const ringBg = isGoldenPage
    ? isHovering
      ? "rgba(255, 215, 0, 0.18)"
      : "transparent"
    : isHovering
      ? "rgba(0,212,255,0.15)"
      : "transparent";

  const ringShadow = isGoldenPage
    ? isHovering
      ? "0 0 25px rgba(255, 215, 0, 0.6), inset 0 0 12px rgba(255, 215, 0, 0.25)"
      : "0 0 10px rgba(251, 191, 36, 0.5)"
    : isHovering
      ? "0 0 15px rgba(0,212,255,0.3), inset 0 0 10px rgba(0,212,255,0.1)"
      : "0 0 8px rgba(0,212,255,0.4)";

  const dotBg = isGoldenPage ? "#ffd700" : "var(--color-primary)";
  const dotShadow = isGoldenPage
    ? "0 0 10px rgba(255, 215, 0, 1)"
    : "0 0 6px rgba(0,212,255,0.8)";

  const spot1 = isGoldenPage
    ? `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 191, 36, 0.14), transparent 45%)`
    : `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 255, 0.12), transparent 40%)`;

  const spot2 = isGoldenPage
    ? `radial-gradient(280px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.08), transparent 40%)`
    : `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.08), transparent 40%)`;

  return (
    <>
      {/* Custom cursor ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - (isHovering ? 22 : 12),
          y: mousePosition.y - (isHovering ? 22 : 12),
          width: isHovering ? 44 : 24,
          height: isHovering ? 44 : 24,
        }}
        style={{
          background: ringBg,
          border: ringBorder,
          boxShadow: ringShadow,
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
        style={{ background: dotBg, boxShadow: dotShadow }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
      />

      {/* Flashlight spotlights */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-10 mix-blend-screen"
        animate={{ background: spot1 }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />
      <motion.div
        className="fixed inset-0 pointer-events-none z-20 mix-blend-overlay"
        animate={{ background: spot2 }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />
    </>
  );
}
