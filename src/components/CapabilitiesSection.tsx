"use client";

import { useReveal } from "@/hooks/useReveal";

const CAPABILITIES = [
  {
    title: "Full-Stack Engineering",
    outcome: "End-to-end product delivery from UI to database",
    items: [
      "Frontend architecture & component systems",
      "Backend services & API development",
      "Database design & query optimization",
      "Third-party integrations & data pipelines",
    ],
    techs: ["[ADD PRIMARY FRONTEND]", "[ADD PRIMARY BACKEND]", "[ADD DATABASE]", "[ADD TOOLS]"],
  },
  {
    title: "Enterprise Systems",
    outcome: "Business applications built for organizational complexity",
    items: [
      "Workflow & approval systems",
      "Role-based access control",
      "Multi-tenant architecture",
      "Enterprise integrations (ERP, CRM, etc.)",
    ],
    techs: ["[ADD TECHNOLOGIES]"],
  },
  {
    title: "Architecture & Design",
    outcome: "Systems that scale, adapt, and remain maintainable",
    items: [
      "Scalable system architecture",
      "Modular, composable design",
      "API-first development",
      "System integration patterns",
    ],
    techs: ["[ADD TECHNOLOGIES]"],
  },
  {
    title: "Automation & Optimization",
    outcome: "Eliminating repetitive work, improving throughput",
    items: [
      "Workflow automation",
      "Process digitization",
      "CI/CD pipeline design",
      "Performance profiling & tuning",
    ],
    techs: ["[ADD TECHNOLOGIES]"],
  },
  {
    title: "Security & Reliability",
    outcome: "Applications built with trust and resilience as defaults",
    items: [
      "Secure authentication & authorization",
      "Input validation & sanitization",
      "Vulnerability awareness",
      "Error handling & monitoring",
    ],
    techs: ["[ADD TECHNOLOGIES]"],
  },
  {
    title: "Business Technology",
    outcome: "Technical decisions grounded in business value",
    items: [
      "Requirement analysis & scoping",
      "Solution mapping & feasibility",
      "Process improvement consulting",
      "Stakeholder & cross-team collaboration",
    ],
    techs: ["Domain expertise, not just tools"],
  },
];

export default function CapabilitiesSection() {
  const [ref, visible] = useReveal();

  return (
    <section id="capabilities" className="section-padding relative">
      <div className="section-container" ref={ref}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <span className="section-number">05 — Engineering Capabilities</span>
          <h2 className="text-[var(--color-foreground)] mt-4 mb-4 max-w-2xl">
            Capabilities organized by{" "}
            <span className="text-[var(--color-accent)]">outcomes.</span>
          </h2>
          <p className="text-[var(--color-foreground-secondary)] max-w-xl text-lg mb-16">
            Not a list of buzzwords. Each capability maps to a category of
            problems I can solve.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.title}
              className={`reveal ${visible ? "visible" : ""} reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className="card p-6 h-full flex flex-col group">
                <h3 className="text-lg font-medium text-[var(--color-foreground)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs text-[var(--color-accent)] font-mono mb-4">
                  {cap.outcome}
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-[var(--color-foreground-secondary)] flex items-start gap-2"
                    >
                      <span className="text-[var(--color-foreground-muted)] mt-1 shrink-0 text-[10px]">
                        ▸
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-[var(--color-border)]">
                  <div className="flex flex-wrap gap-1.5">
                    {cap.techs.map((tech, j) => (
                      <span key={j} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
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
