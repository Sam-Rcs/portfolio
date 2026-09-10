"use client";

import { useEffect, useRef } from "react";

interface GalaxyStarfieldProps {
  isDark: boolean;
  bulletSpark?: { x: number; y: number; active: boolean };
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  color: string;
  twinkleSpeed: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function GalaxyStarfield({ isDark, bulletSpark }: GalaxyStarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Generate Stars
    const starCount = Math.floor((width * height) / 3800);
    const stars: Star[] = [];
    const goldTones = isDark
      ? ["#ffd700", "#fbbf24", "#f59e0b", "#fffbeb", "#ffffff"]
      : ["#d97706", "#b45309", "#92400e", "#f59e0b", "#78350f"];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        speed: (Math.random() - 0.5) * 0.15,
        color: goldTones[Math.floor(Math.random() * goldTones.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Nebula Cosmic Clouds
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        50,
        width * 0.5,
        height * 0.5,
        width * 0.7
      );

      if (isDark) {
        gradient.addColorStop(0, "rgba(245, 158, 11, 0.08)");
        gradient.addColorStop(0.35, "rgba(217, 119, 6, 0.04)");
        gradient.addColorStop(0.7, "rgba(120, 53, 15, 0.02)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        gradient.addColorStop(0, "rgba(245, 158, 11, 0.09)");
        gradient.addColorStop(0.4, "rgba(251, 191, 36, 0.04)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }
        star.y += star.speed;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = star.color;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // 3. Bullet Sparks
      if (bulletSpark && bulletSpark.active) {
        // Spawn sparks at bullet location
        for (let k = 0; k < 4; k++) {
          const angle = Math.PI + (Math.random() - 0.5) * 1.5;
          const speed = Math.random() * 6 + 2;
          sparksRef.current.push({
            x: bulletSpark.x,
            y: bulletSpark.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 3 + 1,
            life: 0,
            maxLife: Math.random() * 25 + 15,
            color: Math.random() > 0.4 ? "#ffd700" : "#ffedd5",
          });
        }
      }

      // Update & Draw Sparks
      for (let j = sparksRef.current.length - 1; j >= 0; j--) {
        const s = sparksRef.current[j];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08; // gravity
        s.vx *= 0.96;

        const progress = s.life / s.maxLife;
        const alpha = 1 - progress;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ffd700";
        ctx.fill();

        if (s.life >= s.maxLife) {
          sparksRef.current.splice(j, 1);
        }
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark, bulletSpark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}
