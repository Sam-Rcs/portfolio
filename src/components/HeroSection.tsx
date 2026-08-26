"use client";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Architectural accent lines */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent opacity-40 hidden lg:block" style={{ right: '15%' }} />
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent opacity-20 hidden lg:block" style={{ right: '30%' }} />

      {/* Top-right monogram */}
      <div className="absolute top-24 right-8 lg:right-16 hidden md:block">
        <div className="font-mono text-[8rem] lg:text-[12rem] leading-none text-[var(--color-border-subtle)] select-none opacity-60">
          SK
        </div>
      </div>

      <div className="section-container relative z-10 py-32 md:py-0">
        <div className="max-w-3xl">
          {/* Status indicator */}
          <div className="flex items-center gap-2.5 mb-8 animate-fade-in">
            <div className="status-dot" />
            <span className="font-mono text-xs tracking-widest text-[var(--color-status-green)] uppercase">
              Available for new projects & opportunities
            </span>
          </div>

          {/* Name */}
          <div className="animate-fade-in-up">
            <p className="font-mono text-sm tracking-widest text-[var(--color-foreground-muted)] mb-3 uppercase">
              Sameer Khan
            </p>
          </div>

          {/* Title */}
          <h1 className="text-[var(--color-foreground)] mb-4 animate-fade-in-up delay-100">
            Full-Stack Developer{" "}
            <span className="text-[var(--color-accent)]">×</span>{" "}
            Team Lead
          </h1>

          {/* Positioning statement */}
          <p className="text-xl md:text-2xl text-[var(--color-foreground-secondary)] font-light leading-relaxed mb-6 animate-fade-in-up delay-200 max-w-2xl">
            I build scalable web applications, real-time banking & payment systems, live SaaS, and cross-platform mobile apps (iOS & Android) using Spring Boot, Node.js, React, and MySQL.
          </p>

          {/* Supporting line */}
          <p className="text-[var(--color-foreground-muted)] text-sm md:text-base mb-10 animate-fade-in-up delay-300 max-w-xl font-mono">
            Full-stack engineering, team leadership, and cross-platform product delivery.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up delay-400">
            <a href="#case-studies" className="btn-primary">
              View All Projects
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="ml-1"
              >
                <path
                  d="M1 7h12m0 0L8 2m5 5L8 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </div>

          {/* Micro stats */}
          <div className="flex gap-8 mt-16 pt-8 border-t border-[var(--color-border)] animate-fade-in-up delay-500">
            <div>
              <p className="text-2xl font-light text-[var(--color-foreground)]">
                2+
              </p>
              <p className="font-mono text-xs text-[var(--color-foreground-muted)] tracking-wide mt-1">
                Years Experience
              </p>
            </div>
            <div className="w-px bg-[var(--color-border)]" />
            <div>
              <p className="text-2xl font-light text-[var(--color-foreground)]">
                9+
              </p>
              <p className="font-mono text-xs text-[var(--color-foreground-muted)] tracking-wide mt-1">
                Major Projects
              </p>
            </div>
            <div className="w-px bg-[var(--color-border)]" />
            <div>
              <p className="text-2xl font-light text-[var(--color-foreground)]">
                Web & Mobile
              </p>
              <p className="font-mono text-xs text-[var(--color-foreground-muted)] tracking-wide mt-1">
                Web, iOS & Android
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
