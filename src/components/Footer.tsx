"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-[var(--color-border)] rounded flex items-center justify-center">
              <span className="font-mono text-[8px] text-[var(--color-foreground-muted)]">
                SK
              </span>
            </div>
            <span className="font-mono text-xs text-[var(--color-foreground-muted)]">
              © {year} Sameer Khan. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="mailto:sameer6306khan@gmail.com"
              className="font-mono text-xs text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              Email: sameer6306khan@gmail.com
            </a>
            <a
              href="tel:7985835954"
              className="font-mono text-xs text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              Phone: +91 7985835954
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
