"use client";

import { motion } from "framer-motion";
import { Code, Database, Server, Layout, GitBranch, Terminal } from "lucide-react";

const skills = [
  { name: "Java", icon: <Terminal className="w-6 h-6" /> },
  { name: "Spring Boot", icon: <Server className="w-6 h-6" /> },
  { name: "Golang", icon: <Terminal className="w-6 h-6" /> },
  { name: "Node.js", icon: <Server className="w-6 h-6" /> },
  { name: "React", icon: <Layout className="w-6 h-6" /> },
  { name: "Android", icon: <Code className="w-6 h-6" /> },
  { name: "iOS", icon: <Code className="w-6 h-6" /> },
  { name: "PostgreSQL", icon: <Database className="w-6 h-6" /> },
  { name: "MySQL", icon: <Database className="w-6 h-6" /> },
  { name: "MongoDB", icon: <Database className="w-6 h-6" /> },
  { name: "REST APIs", icon: <Code className="w-6 h-6" /> },
  { name: "WebSockets", icon: <Terminal className="w-6 h-6" /> },
  { name: "Microservices", icon: <Server className="w-6 h-6" /> },
  { name: "Git", icon: <GitBranch className="w-6 h-6" /> },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            TECHNICAL <span className="text-[var(--color-primary)]">ARSENAL</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-panel p-6 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:neon-border transition-all duration-300 rounded-xl relative"
            >
              {/* Subtle Developer Humor Tooltip */}
              {(skill.name === "Java" || skill.name === "Spring Boot") && (
                <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 bg-black/90 text-[var(--color-primary)] text-[10px] font-mono px-3 py-1 rounded whitespace-nowrap border border-[var(--color-primary)]/30 pointer-events-none z-20">
                  Built with unreasonable amounts of debugging.
                </div>
              )}

              <div className="text-gray-400 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {skill.icon}
              </div>
              <span className="text-sm font-mono tracking-wider text-gray-300 group-hover:text-white transition-colors duration-300 text-center">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--color-accent)] opacity-5 blur-[150px] pointer-events-none" />
    </section>
  );
}
