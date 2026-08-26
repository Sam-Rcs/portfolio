"use client";

import { useReveal } from "@/hooks/useReveal";

export default function AboutSection() {
  const [ref, visible] = useReveal();

  return (
    <section id="about" className="section-padding relative">
      <div className="section-container" ref={ref}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <span className="section-number">10 — About</span>
        </div>

        <div className="grid md:grid-cols-12 gap-12 mt-8">
          {/* Left column */}
          <div className={`md:col-span-5 reveal ${visible ? "visible" : ""} reveal-delay-1`}>
            <h2 className="text-[var(--color-foreground)] mb-6">
              Sameer Khan
            </h2>
            <div className="w-12 h-px bg-[var(--color-accent)] mb-6" />

            {/* Quick facts */}
            <div className="space-y-3 mb-8">
              {[
                { label: "Location", value: "[CITY, COUNTRY]" },
                { label: "Experience", value: "[X]+ years" },
                { label: "Focus", value: "Full-Stack Engineering × Business Strategy" },
                { label: "Education", value: "[DEGREE] — [INSTITUTION]" },
              ].map((fact) => (
                <div key={fact.label} className="flex gap-4">
                  <span className="font-mono text-xs text-[var(--color-foreground-muted)] w-20 shrink-0 mt-0.5">
                    {fact.label}
                  </span>
                  <span className="text-sm text-[var(--color-foreground-secondary)]">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-mono text-[10px] tracking-widest text-[var(--color-foreground-muted)] uppercase mb-3">
                Certifications
              </h4>
              <div className="space-y-1.5">
                <p className="text-sm text-[var(--color-foreground-secondary)]">
                  [ADD CERTIFICATION — e.g., AWS Certified Solutions Architect]
                </p>
                <p className="text-sm text-[var(--color-foreground-secondary)]">
                  [ADD CERTIFICATION]
                </p>
              </div>
            </div>
          </div>

          {/* Right column — narrative */}
          <div className={`md:col-span-7 reveal ${visible ? "visible" : ""} reveal-delay-2`}>
            <div className="space-y-5 text-[var(--color-foreground-secondary)] leading-relaxed">
              <p>
                I&apos;m a senior full-stack engineer with [X]+ years of
                experience building enterprise applications and business
                systems. My work sits at the intersection of software
                engineering and business strategy — I don&apos;t just implement
                features, I analyze requirements, design architectures, and
                deliver systems that solve real operational problems.
              </p>
              <p>
                [ADD — Describe your engineering background. What industries
                have you worked in? What types of systems have you built?
                What scale have you operated at?]
              </p>
              <p>
                What differentiates my approach is a deep interest in
                understanding <em>why</em> software needs to exist before
                deciding <em>how</em> to build it. I work closely with
                business stakeholders, product teams, and engineering teams
                to ensure that technical decisions create measurable business
                value — not just technical elegance.
              </p>
              <p>
                [ADD — What types of problems do you enjoy solving? What
                motivates you technically? What are your professional
                interests?]
              </p>
              <p>
                I gravitate toward complex problems: systems that require
                integrating multiple services, automating manual workflows,
                designing role-based architectures, or modernizing legacy
                systems. I believe that the best engineering doesn&apos;t just
                ship code — it ships outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
