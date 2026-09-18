"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function EasterEggs() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Console Message Easter Egg
    console.log(
      "%c🚀 Welcome to Sameer's DevTools console! If you're reading this, you're either an awesome developer or a recruiter with F12 superpowers. Respect! 🤝",
      "color: #00f0ff; font-size: 13px; font-weight: bold; background: #080914; padding: 8px 12px; border-radius: 6px; border: 1px solid #00f0ff;"
    );
    console.log(
      "%c💡 Pro-tip: Try typing hire() or coffee() in this console.",
      "color: #10b981; font-size: 12px; font-style: italic;"
    );

    // Global Console Functions
    if (typeof window !== "undefined") {
      (window as unknown as { hire: () => string; coffee: () => string }).hire = () => {
        return "🎉 OUTSTANDING DECISION! Send an email to sameer6306khan@gmail.com with subject: 'You are hired + unlimited coffee stipend'!";
      };
      (window as unknown as { hire: () => string; coffee: () => string }).coffee = () => {
        return "☕ Caffeine buffer replenished to 100%. Ready to architect 4 high-throughput microservices without breaking a sweat.";
      };
    }

    // Keyboard Easter Eggs
    let buffer = "";
    const secrets: { [key: string]: string } = {
      debug: "🐛 Debug mode engaged: All bugs have been successfully renamed to 'features'.",
      coffee: "☕ *Coffee deployed*: Developer productivity boosted by 420%.",
      hire: "💼 Offer accepted! Preparing to commit high-quality code to your repo.",
      bugs: "🦗 0 bugs found in memory. (Please do not check the legacy microservice).",
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if ((e.target as HTMLElement)?.tagName === "INPUT" || (e.target as HTMLElement)?.tagName === "TEXTAREA") {
        return;
      }

      buffer += e.key.toLowerCase();
      if (buffer.length > 10) buffer = buffer.slice(-10);

      for (const [code, msg] of Object.entries(secrets)) {
        if (buffer.endsWith(code)) {
          setToastMessage(msg);
          setTimeout(() => setToastMessage(null), 5000);
          buffer = "";
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] px-6 py-3.5 rounded-full neu-raised border border-[var(--color-primary)]/40 shadow-[0_0_25px_rgba(0,240,255,0.25)] bg-[var(--color-background)]/90 backdrop-blur-xl"
        >
          <p className="font-mono text-xs sm:text-sm text-[var(--color-primary)] whitespace-nowrap flex items-center gap-2">
            <span>✨</span>
            <span>{toastMessage}</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
