"use client";

import { useReveal } from "@/hooks/useReveal";

const STEPS = [
  {
    number: "01",
    label: "Understand",
    desc: "Clarify the business objective, user needs, and success criteria before writing a single line of code.",
    detail: "Stakeholder interviews · Domain mapping · Goal definition",
  },
  {
    number: "02",
    label: "Analyze",
    desc: "Identify constraints, dependencies, risks, and root causes. Map the problem space thoroughly.",
    detail: "Constraint analysis · Dependency mapping · Risk assessment",
  },
  {
    number: "03",
    label: "Design",
    desc: "Define the solution architecture, data models, API contracts, and integration points.",
    detail: "System design · API spec · Data modeling · Trade-off analysis",
  },
  {
    number: "04",
    label: "Build",
    desc: "Implement robust, maintainable, well-tested software with clean interfaces and clear documentation.",
    detail: "Full-stack development · Code review · Testing · Documentation",
  },
  {
    number: "05",
    label: "Validate",
    desc: "Test against both technical requirements and business acceptance criteria. Verify end-to-end.",
    detail: "Unit tests · Integration tests · UAT · Performance testing",
  },
  {
    number: "06",
    label: "Optimize",
    desc: "Measure real-world performance. Identify bottlenecks. Automate. Iterate toward excellence.",
    detail: "Monitoring · Profiling · Automation · Continuous improvement",
  },
];

export default function ProcessSection() {
  const [ref, visible] = useReveal();

  return (
    <section id="process" className="section-padding relative">
      <div className="section-container" ref={ref}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <span className="section-number">09 — Working Model</span>
          <h2 className="text-[var(--color-foreground)] mt-4 mb-4 max-w-2xl">
            How I approach{" "}
            <span className="text-[var(--color-accent)]">problems.</span>
          </h2>
          <p className="text-[var(--color-foreground-secondary)] max-w-xl text-lg mb-16">
            A structured methodology for translating business problems into
            engineered solutions — not a waterfall, but a disciplined
            progression.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)] rounded-lg overflow-hidden">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`bg-[var(--color-surface)] p-8 group hover:bg-[var(--color-surface-elevated)] transition-colors duration-300 reveal ${visible ? "visible" : ""} reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-2xl font-light text-[var(--color-accent)]">
                  {step.number}
                </span>
                <h3 className="text-lg font-medium text-[var(--color-foreground)]">
                  {step.label}
                </h3>
              </div>
              <p className="text-sm text-[var(--color-foreground-secondary)] leading-relaxed mb-4">
                {step.desc}
              </p>
              <p className="font-mono text-[10px] text-[var(--color-foreground-muted)] tracking-wide">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
