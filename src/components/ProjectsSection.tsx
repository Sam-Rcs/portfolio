"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Server, Database, Smartphone } from "lucide-react";

type ProjectType = {
  title: string;
  date: string;
  description: string;
  tech: string[];
  details: {
    frontend?: string[];
    mobile?: string[];
    backend?: string[];
    database?: string[];
  };
};

const projects: ProjectType[] = [
  {
    title: "Coach Konnects",
    date: "Independent",
    description: "Built an independent, full-stack coaching platform. Designed and developed the complete architecture encompassing Web applications.",
    tech: ["Spring Boot", "React", "WebAuthn"],
    details: {
      frontend: ["React (Web)"],
      backend: ["Spring Boot", "WebAuthn API"],
      database: ["PostgreSQL"]
    }
  },
  {
    title: "Amagi Payment System",
    date: "Oct 2025 – Present",
    description: "Built payment platform with secure transactions and API integrations. Implemented real-time chat using WebSockets and created analytics dashboards.",
    tech: ["Spring Boot", "React", "WebSockets"],
    details: {
      frontend: ["React.js", "TailwindCSS"],
      backend: ["Spring Boot", "WebSockets (Chat)"],
      database: ["MySQL", "Redis (Cache)"]
    }
  },
  {
    title: "NT Nation Trust Bank",
    date: "Oct 2025 – Present",
    description: "Developed banking modules with approval workflows. Implemented RBAC and secure APIs, improving legacy systems with modern architecture.",
    tech: ["Java", "Spring Boot", "Microservices"],
    details: {
      frontend: ["Internal Dashboards"],
      backend: ["Java", "Spring Boot", "Microservices (REST)"],
      database: ["Oracle DB"]
    }
  },
  {
    title: "Hotel Management App",
    date: "Full Stack",
    description: "Developed a comprehensive hotel management application supporting cross-platform usage across Web, Android, and iOS devices.",
    tech: ["Node.js", "Swift", "Kotlin"],
    details: {
      frontend: ["React"],
      mobile: ["Swift (iOS)", "Kotlin (Android)"],
      backend: ["Node.js", "Express.js"],
      database: ["MongoDB"]
    }
  },
  {
    title: "Warehouse Software",
    date: "Logistics",
    description: "Built an application for managing drivers and tracking assets efficiently across warehouses and transit routes.",
    tech: ["Spring Boot", "MySQL", "React"],
    details: {
      frontend: ["React.js"],
      backend: ["Spring Boot"],
      database: ["MySQL"]
    }
  },
  {
    title: "IG Tool (Multi-Module)",
    date: "Team Lead",
    description: "Developed invoice, asset, and GRN modules. Led the development team and significantly improved operational efficiency.",
    tech: ["Node.js", "React", "MySQL"],
    details: {
      frontend: ["React"],
      backend: ["Node.js"],
      database: ["MySQL"]
    }
  },
  {
    title: "DHL (AMS / SIMS)",
    date: "Full Stack",
    description: "Enhanced asset management systems and fixed critical issues to streamline operations for DHL.",
    tech: ["Spring Boot", "Java", "React"],
    details: {
      frontend: ["React"],
      backend: ["Java", "Spring Boot"],
      database: ["Oracle DB"]
    }
  },
  {
    title: "Zomato Hyperpure",
    date: "Full Stack",
    description: "Built and optimized procurement features for the B2B restaurant supply platform.",
    tech: ["Spring Boot", "React"],
    details: {
      frontend: ["React"],
      backend: ["Spring Boot"],
      database: ["PostgreSQL"]
    }
  },
  {
    title: "Expense Module",
    date: "Mar 2025 – Present",
    description: "Developing an internal financial tracking module to monitor corporate expenses.",
    tech: ["Java", "Spring Boot", "React"],
    details: {
      frontend: ["React"],
      backend: ["Java", "Spring Boot"],
      database: ["MySQL"]
    }
  }
];

export default function ProjectsSection() {
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            SYSTEM <span className="text-[var(--color-primary)]">PROJECTS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start pb-20">
          {projects.map((project, index) => {
            const isExpanded = expandedProjectId === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex justify-center"
              >
                {/* Flowchart Pop-out Nodes */}
                <AnimatePresence>
                  {isExpanded && (
                    <>
                      {/* Backend Node (Pops Top) */}
                      {project.details.backend && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ type: "spring", damping: 15 }}
                          className="absolute -top-6 left-1/2 -translate-x-1/2 z-40 bg-black/90 border border-[var(--color-primary)] shadow-[0_0_20px_rgba(0,240,255,0.2)] p-3 rounded-xl flex items-center gap-2 w-auto min-w-[140px] backdrop-blur-md"
                        >
                          <Server className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-[9px] text-[var(--color-primary)] font-mono uppercase tracking-widest">Service</span>
                            {project.details.backend.map(t => <span key={t} className="text-[11px] text-white font-bold leading-tight">{t}</span>)}
                          </div>
                        </motion.div>
                      )}

                      {/* Frontend/Mobile Node (Pops Left) */}
                      {(project.details.frontend || project.details.mobile) && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ type: "spring", damping: 15, delay: 0.05 }}
                          className="absolute top-1/2 -left-8 -translate-y-1/2 z-40 bg-black/90 border border-[var(--color-secondary)] shadow-[0_0_20px_rgba(255,0,255,0.15)] p-3 rounded-xl flex items-center gap-2 w-auto min-w-[140px] backdrop-blur-md"
                        >
                          {project.details.mobile ? <Smartphone className="w-4 h-4 text-[var(--color-secondary)] shrink-0" /> : <Code2 className="w-4 h-4 text-[var(--color-secondary)] shrink-0" />}
                          <div className="flex flex-col">
                            <span className="text-[9px] text-[var(--color-secondary)] font-mono uppercase tracking-widest">Client</span>
                            {project.details.frontend?.map(t => <span key={t} className="text-[11px] text-white font-bold leading-tight">{t}</span>)}
                            {project.details.mobile?.map(t => <span key={t} className="text-[11px] text-[var(--color-accent)] font-bold leading-tight">{t}</span>)}
                          </div>
                        </motion.div>
                      )}

                      {/* Database Node (Pops Right) */}
                      {project.details.database && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ type: "spring", damping: 15, delay: 0.1 }}
                          className="absolute top-1/2 -right-8 -translate-y-1/2 z-40 bg-black/90 border border-gray-500 shadow-[0_0_20px_rgba(156,163,175,0.15)] p-3 rounded-xl flex items-center gap-2 w-auto min-w-[140px] backdrop-blur-md"
                        >
                          <Database className="w-4 h-4 text-gray-400 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest">Database</span>
                            {project.details.database.map(t => <span key={t} className="text-[11px] text-white font-bold leading-tight">{t}</span>)}
                          </div>
                        </motion.div>
                      )}
                    </>
                  )}
                </AnimatePresence>

                {/* Main Card */}
                <div 
                  onClick={() => setExpandedProjectId(isExpanded ? null : index)}
                  className={`glass-panel w-full rounded-xl hover:neon-border transition-all duration-300 relative group cursor-pointer z-30 bg-[#0d0d0d] ${isExpanded ? 'border-[var(--color-primary)] shadow-[0_0_30px_rgba(0,240,255,0.15)] scale-[1.02]' : ''}`}
                >
                  <div className="p-8 relative z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors pr-4">
                        {project.title}
                      </h3>
                      <span className="font-mono text-xs text-[var(--color-secondary)] hidden sm:inline shrink-0">
                        {project.date}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* CTA Card: Waiting for your project */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="glass-panel w-full rounded-xl border border-dashed border-gray-700 hover:border-[var(--color-primary)] hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all duration-300 relative group cursor-pointer bg-black/40 flex flex-col items-center justify-center min-h-[250px]"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none rounded-xl" />
            <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center mb-4 group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition-colors text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-400 group-hover:text-white transition-colors mb-2">
              Waiting for your project...
            </h3>
            <p className="text-sm font-mono text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
              &gt; Let's build something _
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
