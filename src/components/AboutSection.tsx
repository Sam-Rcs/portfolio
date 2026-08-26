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
                { label: "Location", value: "India" },
                { label: "Experience", value: "2+ years (Full-Stack & Mobile)" },
                { label: "Current Role", value: "Full Stack Developer & Team Lead at RCS Tec" },
                { label: "Education", value: "BCA — Chhatrapati Shahu Ji Maharaj University (2020–2023)" },
              ].map((fact) => (
                <div key={fact.label} className="flex gap-4">
                  <span className="font-mono text-xs text-[var(--color-foreground-muted)] w-24 shrink-0 mt-0.5">
                    {fact.label}
                  </span>
                  <span className="text-sm text-[var(--color-foreground-secondary)]">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Core Competencies */}
            <div>
              <h4 className="font-mono text-[10px] tracking-widest text-[var(--color-foreground-muted)] uppercase mb-3">
                Core Stack
              </h4>
              <div className="space-y-1.5">
                <p className="text-sm text-[var(--color-foreground-secondary)]">
                  Java • Spring Boot • Node.js • React • React Native (iOS & Android)
                </p>
                <p className="text-sm text-[var(--color-foreground-secondary)]">
                  MySQL • MongoDB • REST APIs • WebSockets • Microservices
                </p>
              </div>
            </div>
          </div>

          {/* Right column — narrative */}
          <div className={`md:col-span-7 reveal ${visible ? "visible" : ""} reveal-delay-2`}>
            <div className="space-y-5 text-[var(--color-foreground-secondary)] leading-relaxed">
              <p>
                I&apos;m Sameer Khan, a Full Stack Developer and Team Lead with experience architecting, building, and deploying scalable web applications and cross-platform mobile apps.
              </p>
              <p>
                At <strong>RCS Tec</strong>, I lead developer teams to build high-stakes enterprise applications — including payment systems with real-time WebSocket chat (Amagi Payment System), banking modules with multi-tier RBAC (NT Nation Trust Bank, Sri Lanka), multi-module enterprise suites (IG Tool for Invoices, Assets, and GRN), procurement tools (Zomato Hyperpure), and logistics platforms (DHL AMS/SIMS).
              </p>
              <p>
                Beyond my team leadership role, I am an active creator of end-to-end software: single-handedly building <strong>CoachKonnets</strong> (a full-fledged coaching web app), deploying a live <strong>Hotel Management System</strong> used daily in production, and engineering a multi-platform <strong>Warehouse & Godown Management Software</strong> running across Web, iOS, and Android platforms.
              </p>
              <p>
                My engineering approach combines clean backend architecture with responsive, intuitive UI design and robust database modeling. Whether leading a team sprint or coding an entire application solo, I focus on delivering reliable, production-ready software.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
