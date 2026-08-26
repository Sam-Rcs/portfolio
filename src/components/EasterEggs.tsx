"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function EasterEggs() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Console Message Easter Egg
    console.log(
      "%c If you're reading this, congratulations. The API responded. – Sam",
      "color: #00f0ff; font-size: 14px; font-weight: bold; background: #050505; padding: 10px; border-radius: 5px; border: 1px solid #00f0ff;"
    );

    // Konami Code / Debug sequence Easter Egg
    let inputSequence = "";
    const secretCode = "debug";

    const handleKeyDown = (e: KeyboardEvent) => {
      inputSequence += e.key.toLowerCase();
      if (inputSequence.length > secretCode.length) {
        inputSequence = inputSequence.slice(1);
      }
      
      if (inputSequence === secretCode) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000); // Hide after 5s
        inputSequence = ""; // reset
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] glass-panel px-6 py-3 rounded-full border border-[var(--color-primary)] shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          <p className="font-mono text-sm text-[var(--color-primary)] whitespace-nowrap">
            You weren't supposed to find this. Anyway… respect.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
