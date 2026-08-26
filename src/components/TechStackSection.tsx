"use client";

import { useReveal } from "@/hooks/useReveal";

const TECH_STACK: Record<string, { items: string[]; highlight?: boolean }> = {
  Frontend: {
    items: ["[ADD — e.g., React]", "[ADD — e.g., Next.js]", "[ADD — e.g., TypeScript]", "[ADD — e.g., Tailwind CSS]"],
    highlight: true,
  },
  Backend: {
    items: ["[ADD — e.g., Node.js]", "[ADD — e.g., Express]", "[ADD — e.g., Python]"],
    highlight: true,
  },
  Database: {
    items: ["[ADD — e.g., PostgreSQL]", "[ADD — e.g., MongoDB]", "[ADD — e.g., Redis]"],
  },
  "Cloud & Infrastructure": {
    items: ["[ADD — e.g., AWS]", "[ADD — e.g., Docker]", "[ADD — e.g., Vercel]"],
  },
  DevOps: {
    items: ["[ADD — e.g., GitHub Actions]", "[ADD — e.g., Docker]", "[ADD — e.g., Terraform]"],
  },
  Testing: {
    items: ["[ADD — e.g., Jest]", "[ADD — e.g., Cypress]", "[ADD — e.g., Playwright]"],
  },
  Architecture: {
    items: ["REST APIs", "Microservices", "Event-Driven", "Monolith-First"],
  },
  Tools: {
    items: ["[ADD — e.g., Git]", "[ADD — e.g., Figma]", "[ADD — e.g., Jira]", "[ADD — e.g., VS Code]"],
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
