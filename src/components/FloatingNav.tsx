"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About",        id: "about" },
  { label: "Flow",         id: "architecture" },
  { label: "Skills",       id: "skills" },
  { label: "Projects",     id: "projects" },
  { label: "Experience",   id: "experience" },
  { label: "Education",    id: "education" },
];

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 80% of viewport height
      setVisible(window.scrollY > window.innerHeight * 0.8);

      // Determine active section
      const scrollY = window.scrollY + window.innerHeight / 2;
      let current = "";
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollY) {
          current = item.id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]"
        >
          <div
            className="flex items-center gap-1 px-3 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
              border: "1px solid rgba(255,255,255,0.6)",
            }}
          >
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
                  style={{
                    color: isActive ? "var(--color-primary)" : "var(--color-muted)",
                    background: isActive ? "rgba(37,99,235,0.08)" : "transparent",
                  }}
                >
                  {/* Active dot indicator */}
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300 shrink-0"
                    style={{
                      background: isActive ? "var(--color-primary)" : "var(--color-muted)",
                      opacity: isActive ? 1 : 0.4,
                      boxShadow: isActive ? "0 0 6px rgba(37,99,235,0.6)" : "none",
                    }}
                  />
                  <span className="hidden sm:inline tracking-wide">{item.label}</span>

                  {/* Active pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(37,99,235,0.08)", zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
