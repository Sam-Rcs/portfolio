"use client";

import { motion } from "framer-motion";
import { Database, Server, Smartphone, Globe, ArrowDown, Lock } from "lucide-react";

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            SYSTEM <span className="text-[var(--color-primary)]">FLOW</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            A typical request path mapping out secure JWT auth, role-based access control, and data persistence across my preferred stack.
          </p>
        </motion.div>

        <div className="relative flex flex-col items-center max-w-3xl mx-auto">
          {/* Client Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-6 rounded-xl flex items-center justify-between w-full max-w-md border border-gray-700 hover:neon-border transition-all group z-10 bg-black/60"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-lg text-gray-300 group-hover:text-white">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Client Apps</h3>
                <p className="text-sm text-gray-400 font-mono">React / React Native</p>
              </div>
            </div>
            <Smartphone className="w-5 h-5 text-[var(--color-primary)]" />
          </motion.div>

          {/* Animated Line */}
          <div className="relative h-16 w-0.5 bg-gray-800">
            <motion.div 
              className="absolute top-0 w-full bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]"
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* API Gateway Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 rounded-xl flex items-center justify-between w-full max-w-md border border-[var(--color-primary)] shadow-[0_0_20px_rgba(0,240,255,0.1)] z-10 bg-black/60"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[var(--color-primary)]/10 rounded-lg text-[var(--color-primary)]">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">API Service</h3>
                <p className="text-sm text-gray-400 font-mono">Spring Boot / Node.js</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-400" />
              <span className="text-xs font-mono text-green-400">JWT/RBAC</span>
            </div>
          </motion.div>

          {/* Animated Line */}
          <div className="relative h-16 w-0.5 bg-gray-800">
            <motion.div 
              className="absolute top-0 w-full bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]"
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
            />
          </div>

          {/* Database Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-6 rounded-xl flex items-center justify-between w-full max-w-md border border-gray-700 hover:neon-border transition-all group z-10 bg-black/60"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-lg text-gray-300 group-hover:text-[var(--color-accent)]">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Data Persistence</h3>
                <p className="text-sm text-gray-400 font-mono">MySQL / PostgreSQL</p>
              </div>
            </div>
            <span className="text-xs font-mono text-[var(--color-accent)] border border-[var(--color-accent)] px-2 py-1 rounded">RELIABLE</span>
          </motion.div>
        </div>
      </div>
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary)] opacity-5 blur-[150px] pointer-events-none" />
    </section>
  );
}
