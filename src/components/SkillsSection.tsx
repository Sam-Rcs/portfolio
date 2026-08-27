"use client";

import { motion } from "framer-motion";
import { Code, Database, Server, Layout, GitBranch, Terminal } from "lucide-react";

const skills = [
  { name: "Java",         icon: <Terminal className="w-6 h-6" />,  tooltip: "Brewed with unreasonable amounts of coffee." },
  { name: "Spring Boot",  icon: <Server className="w-6 h-6" />,    tooltip: "Enterprise ready. Debugging: never." },
  { name: "Golang",       icon: <Terminal className="w-6 h-6" />,  tooltip: null },
  { name: "Node.js",      icon: <Server className="w-6 h-6" />,    tooltip: null },
  { name: "React",        icon: <Layout className="w-6 h-6" />,    tooltip: null },
  { name: "Android",      icon: <Code className="w-6 h-6" />,      tooltip: "Kotlin & Java both." },
  { name: "iOS",          icon: <Code className="w-6 h-6" />,      tooltip: "Swift. Xcode build times: not swift." },
  { name: "PostgreSQL",   icon: <Database className="w-6 h-6" />,  tooltip: null },
  { name: "MySQL",        icon: <Database className="w-6 h-6" />,  tooltip: null },
  { name: "MongoDB",      icon: <Database className="w-6 h-6" />,  tooltip: null },
  { name: "REST APIs",    icon: <Code className="w-6 h-6" />,      tooltip: null },
  { name: "WebSockets",   icon: <Terminal className="w-6 h-6" />,  tooltip: null },
  { name: "Microservices",icon: <Server className="w-6 h-6" />,    tooltip: null },
  { name: "Git",          icon: <GitBranch className="w-6 h-6" />, tooltip: "git commit -m 'fix: fingers crossed'" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-28 bg-[var(--color-background)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-[var(--color-primary)] font-mono text-xs tracking-[0.4em] uppercase mb-4">
            tech.stack
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--color-foreground)] tracking-tight">
            TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">ARSENAL</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="neu-raised rounded-2xl p-5 flex flex-col items-center justify-center gap-3 group cursor-pointer relative overflow-visible"
              style={{ transition: "box-shadow 0.25s ease, transform 0.25s ease" }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ boxShadow: "inset 0 0 20px rgba(0,212,255,0.06), 0 0 20px rgba(0,212,255,0.08)" }}
              />

              {/* Tooltip */}
              {skill.tooltip && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform duration-200 neu-raised text-[var(--color-primary)] text-[9px] font-mono px-3 py-1.5 rounded-xl whitespace-nowrap pointer-events-none z-20">
                  {skill.tooltip}
                </div>
              )}

              {/* Icon */}
              <div className="neu-inset w-12 h-12 rounded-xl flex items-center justify-center text-[var(--color-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {skill.icon}
              </div>

              {/* Name */}
              <span className="text-xs font-mono tracking-wider text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition-colors duration-300 text-center leading-tight">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
