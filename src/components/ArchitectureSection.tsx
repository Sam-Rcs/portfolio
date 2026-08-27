"use client";

import { motion } from "framer-motion";
import { Database, Server, Smartphone, Globe, Lock } from "lucide-react";
import SectionBanner from "./SectionBanner";

const flowNodes = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Client Apps",
    subtitle: "React / React Native",
    badge: null,
    color: "var(--color-foreground)",
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "API Service",
    subtitle: "Spring Boot / Node.js",
    badge: { icon: <Lock className="w-3 h-3" />, label: "JWT / RBAC", color: "#4ade80" },
    color: "var(--color-primary)",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Data Persistence",
    subtitle: "MySQL / PostgreSQL",
    badge: { icon: null, label: "RELIABLE", color: "var(--color-accent)" },
    color: "var(--color-accent)",
  },
];

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="py-28 bg-[var(--color-background)] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">

        {/* Header */}
        <SectionBanner
          eyebrow="system.flow"
          title="SYSTEM"
          highlight="FLOW"
          gradient="from-cyan-500 to-blue-600"
          description="JWT auth · Role-based access control · Data persistence across the preferred stack."
        />

        {/* Flow Diagram */}
        <div className="flex flex-col items-center max-w-sm mx-auto gap-0">
          {flowNodes.map((node, index) => (
            <div key={index} className="flex flex-col items-center w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -3 }}
                className="w-full rounded-2xl p-5 flex items-center justify-between group"
                style={{
                  background: "var(--color-surface)",
                  boxShadow:
                    index === 1
                      ? `8px 8px 20px var(--color-shadow-dark), -8px -8px 20px var(--color-shadow-light), 0 0 24px rgba(0,212,255,0.1)`
                      : `6px 6px 16px var(--color-shadow-dark), -6px -6px 16px var(--color-shadow-light)`,
                  border: index === 1 ? "1px solid rgba(0,212,255,0.15)" : "1px solid rgba(255,255,255,0.04)",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "var(--color-surface)",
                      boxShadow: "inset 3px 3px 8px var(--color-shadow-dark), inset -3px -3px 8px var(--color-shadow-light)",
                      color: node.color,
                    }}
                  >
                    {node.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--color-foreground)]">{node.title}</h3>
                    <p className="text-xs text-[var(--color-muted)] font-mono">{node.subtitle}</p>
                  </div>
                </div>

                {node.badge && (
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                    style={{
                      background: "var(--color-surface)",
                      boxShadow: "inset 2px 2px 6px var(--color-shadow-dark), inset -2px -2px 6px var(--color-shadow-light)",
                      border: `1px solid ${node.badge.color}33`,
                      color: node.badge.color,
                    }}
                  >
                    {node.badge.icon}
                    <span className="text-[10px] font-mono tracking-wider">{node.badge.label}</span>
                  </div>
                )}
              </motion.div>

              {/* Animated connector line */}
              {index < flowNodes.length - 1 && (
                <div className="relative w-0.5 h-14 bg-[var(--color-shadow-light)] overflow-hidden my-1">
                  <motion.div
                    className="absolute top-0 w-full rounded-full"
                    style={{ background: "linear-gradient(to bottom, var(--color-primary), var(--color-accent))", boxShadow: "0 0 6px rgba(0,212,255,0.8)" }}
                    animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: index * 0.4 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Background ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 60%)", filter: "blur(60px)" }}
      />
    </section>
  );
}
