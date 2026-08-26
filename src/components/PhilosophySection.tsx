"use client";

import { useReveal } from "@/hooks/useReveal";

const PRINCIPLES = [
  {
    number: "01",
    title: "Business context drives technical decisions.",
    desc: "Technology is a tool, not a goal. Every architectural choice should trace back to a business need, a user outcome, or a measurable constraint.",
  },
  {
    number: "02",
    title: "Architecture should serve the problem, not the résumé.",
    desc: "I choose the simplest architecture that solves the problem at the required scale. Overengineering is a liability, not a feature.",
  },
  {
    number: "03",
    title: "Automate what humans shouldn't repeat.",
    desc: "If a process is manual, error-prone, and recurring — it's a candidate for automation. I actively look for these opportunities.",
  },
  {
    number: "04",
    title: "Simple systems compound. Complex systems collapse.",
    desc: "Maintainability, readability, and clarity are not compromises — they are engineering strengths that scale over time.",
  },
  {
    number: "05",
    title: "Every technical decision has a business consequence.",
    desc: "Choosing a database, defining an API contract, or skipping a test — these are business decisions wearing technical disguises.",
  },
  {
    number: "06",
    title: "Speed without quality is rework. Quality without speed is irrelevance.",
    desc: "Senior engineering means calibrating the right balance of velocity, reliability, security, and maintainability for each context.",
  },
];

export default function PhilosophySection() {
  const [ref, visible] = useReveal();

  return (
    <section id="philosophy" className="section-padding relative">
      <div className="section-container" ref={ref}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <span className="section-number">08 — Engineering Philosophy</span>
          <h2 className="text-[var(--color-foreground)] mt-4 mb-4 max-w-2xl">
            Principles I engineer by.
          </h2>
          <p className="text-[var(--color-foreground-secondary)] max-w-xl text-lg mb-16">
            Not platitudes — operational principles that shape every
            architecture decision, code review, and system design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PRINCIPLES.map((p) => (
            <div
              key={p.number}
              className={`reveal ${visible ? "visible" : ""} reveal-delay-${Math.min(parseInt(p.number), 4)}`}
            >
              <div className="group flex gap-5 p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent-dark)] transition-all duration-300">
                <span className="font-mono text-sm text-[var(--color-accent)] shrink-0 mt-0.5">
                  {p.number}
                </span>
                <div>
                  <h3 className="text-[var(--color-foreground)] font-medium text-base mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[var(--color-foreground-secondary)] leading-relaxed">
                    {p.desc}
                  </p>
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
