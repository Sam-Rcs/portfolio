"use client";

import { useReveal } from "@/hooks/useReveal";

export default function SnapshotSection() {
  const [ref, visible] = useReveal();

  return (
    <section id="snapshot" className="section-padding relative">
      <div className="section-container" ref={ref}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <span className="section-number">01 — Professional Snapshot</span>
        </div>

        <div className="grid md:grid-cols-12 gap-12 mt-8">
          {/* Left — Statement */}
          <div className={`md:col-span-5 reveal ${visible ? "visible" : ""} reveal-delay-1`}>
            <h2 className="text-[var(--color-foreground)] mb-6">
              Engineering full-stack systems that{" "}
              <span className="text-[var(--color-accent)]">
                deliver real impact.
              </span>
            </h2>
            <div className="w-12 h-px bg-[var(--color-accent)] mb-6" />
            <p className="text-[var(--color-foreground-secondary)] text-lg leading-relaxed">
              I&apos;m a Full Stack Developer & Team Lead at RCS Tec with a proven track record of architecting scalable web applications, real-time banking modules, live SaaS platforms, and multi-platform mobile apps (iOS & Android).
            </p>
          </div>

          {/* Right — Key Dimensions */}
          <div className={`md:col-span-7 reveal ${visible ? "visible" : ""} reveal-delay-2`}>
            <div className="grid gap-6">
              {[
                {
                  marker: "01",
                  title: "Full-Stack & Mobile Depth",
                  desc: "Expertise across Java, Spring Boot, Node.js, React, React Native (iOS & Android), MySQL, and MongoDB. Building end-to-end web and mobile products.",
                },
                {
                  marker: "02",
                  title: "Team Leadership & Code Quality",
                  desc: "Leading developer teams at RCS Tec, managing code reviews, architecting multi-module systems, and enforcing high engineering & security standards.",
                },
                {
                  marker: "03",
                  title: "Live Production Systems",
                  desc: "Track record of delivering production software — from solo apps like CoachKonnets to live Hotel & Godown management systems, Amagi payments, and banking microservices.",
                },
              ].map((item) => (
                <div key={item.marker} className="card p-6 group">
                  <div className="flex gap-4">
                    <span className="font-mono text-xs text-[var(--color-accent)] mt-1 shrink-0">
                      {item.marker}
                    </span>
                    <div>
                      <h3 className="text-[var(--color-foreground)] text-lg font-medium mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[var(--color-foreground-secondary)] text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
