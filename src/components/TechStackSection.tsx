"use client";

import { useReveal } from "@/hooks/useReveal";

const TECH_STACK: Record<string, { items: string[]; highlight?: boolean }> = {
  Frontend: {
    items: ["React", "Next.js", "HTML5", "CSS3", "JavaScript"],
    highlight: true,
  },
  Backend: {
    items: ["Spring Boot", "Java", "Node.js", "Express", "REST APIs", "Microservices"],
    highlight: true,
  },
  "Mobile Apps": {
    items: ["React Native", "iOS", "Android", "Mobile Barcode Scanner"],
    highlight: true,
  },
  Database: {
    items: ["MySQL", "MongoDB"],
  },
  "Real-Time & Sync": {
    items: ["WebSockets", "Event-Driven", "Real-Time Chat"],
  },
  "Security & Access": {
    items: ["RBAC", "JWT Security", "Approval Workflows"],
  },
  Architecture: {
    items: ["Microservices", "Multi-Module Architecture", "Tiered SaaS"],
  },
  "Tools & Process": {
    items: ["Git", "Jira", "Team Leadership", "Code Reviews"],
  },
};

export default function TechStackSection() {
  const [ref, visible] = useReveal();

  return (
    <section id="tech-stack" className="section-padding relative">
      <div className="section-container" ref={ref}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <span className="section-number">06 — Technology Ecosystem</span>
          <h2 className="text-[var(--color-foreground)] mt-4 mb-4">
            Technology Stack
          </h2>
          <p className="text-[var(--color-foreground-secondary)] max-w-xl text-lg mb-16">
            Technologies I use in production — prioritized by depth of
            expertise and daily usage.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(TECH_STACK).map(([category, data], i) => (
            <div
              key={category}
              className={`reveal ${visible ? "visible" : ""} reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className={`p-5 rounded-lg border ${
                data.highlight
                  ? "border-[var(--color-accent-dark)] bg-[var(--color-surface)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)]"
              }`}>
                <h4 className={`font-mono text-xs tracking-widest uppercase mb-4 ${
                  data.highlight
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-foreground-muted)]"
                }`}>
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.items.map((tech, j) => (
                    <span
                      key={j}
                      className="inline-block px-3 py-1.5 text-xs font-mono text-[var(--color-foreground-secondary)] bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded hover:border-[var(--color-accent-dark)] hover:text-[var(--color-foreground)] transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
