"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Apple3DDeviceProps {
  scrollProgress: number; // 0 to 1
  isAutoRotating?: boolean;
}

export default function Apple3DDevice({ scrollProgress, isAutoRotating = false }: Apple3DDeviceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  const isAutoRef = useRef(isAutoRotating);
  isAutoRef.current = isAutoRotating;

  const dragRef = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    rotX: 0,
    rotY: 0,
    velX: 0,
    velY: 0,
  });

  const mouseParallaxRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.1, 7.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    const topRimLight = new THREE.DirectionalLight(0x2997ff, 2.8);
    topRimLight.position.set(-6, 6, -3);
    scene.add(topRimLight);

    const fillLight = new THREE.PointLight(0xa1a1a6, 2.5, 30);
    fillLight.position.set(0, -4, 4);
    scene.add(fillLight);

    // --- Materials ---
    const metalMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#18181b"),
      metalness: 0.94,
      roughness: 0.22,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      reflectivity: 0.95,
    });

    const darkAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.7,
      metalness: 0.2,
    });

    // --- Screen Texture: SAMEER KHAN'S ACTUAL CODE & PORTFOLIO TELEMETRY ---
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 1600;
    screenCanvas.height = 1000;
    const ctx = screenCanvas.getContext("2d");
    if (ctx) {
      // Dark IDE Background
      ctx.fillStyle = "#0c0d12";
      ctx.fillRect(0, 0, 1600, 1000);

      // Window Header
      ctx.fillStyle = "#16171f";
      ctx.fillRect(0, 0, 1600, 70);

      // Window Controls
      ctx.fillStyle = "#ff5f56";
      ctx.beginPath();
      ctx.arc(45, 35, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffbd2e";
      ctx.beginPath();
      ctx.arc(75, 35, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#27c93f";
      ctx.beginPath();
      ctx.arc(105, 35, 10, 0, Math.PI * 2);
      ctx.fill();

      // Tab Title
      ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
      ctx.fillStyle = "#f5f5f7";
      ctx.fillText("AmagiPaymentGateway.java — Sameer Khan (RCS Tec)", 150, 44);

      // Real Code Lines (Spring Boot, WebSockets, REST APIs)
      ctx.font = "26px 'JetBrains Mono', 'SF Mono', monospace";
      const lines = [
        { text: "package dev.sameerkhan.portfolio.systems;", color: "#5c6370" },
        { text: "", color: "#fff" },
        { text: "@RestController", color: "#e5c07b" },
        { text: "@RequestMapping(\"/api/v1/payments\")", color: "#98c379" },
        { text: "public class AmagiPaymentOrchestrator {", color: "#61afef" },
        { text: "    @Autowired private SimpMessagingTemplate websocket;", color: "#e06c75" },
        { text: "    @Autowired private TransactionLedger ledger;", color: "#e06c75" },
        { text: "", color: "#fff" },
        { text: "    @PostMapping(\"/process\")", color: "#98c379" },
        { text: "    public ResponseEntity<TransactionResult> executePayment(", color: "#61afef" },
        { text: "        @RequestBody PaymentPayload payload) {", color: "#abb2bf" },
        { text: "        // Sameer Khan: End-to-end transaction settlement", color: "#5c6370" },
        { text: "        var tx = ledger.commitWithZeroLatency(payload);", color: "#d19a66" },
        { text: "        websocket.convertAndSend(\"/topic/feed\", tx);", color: "#c678dd" },
        { text: "        return ResponseEntity.ok(tx);", color: "#98c379" },
        { text: "    }", color: "#abb2bf" },
        { text: "}", color: "#61afef" },
      ];

      lines.forEach((line, idx) => {
        ctx.fillStyle = line.color;
        ctx.fillText(line.text, 50, 130 + idx * 42);
      });

      // Right Stats Sidebar: Sameer's actual credentials
      ctx.fillStyle = "rgba(41, 151, 255, 0.08)";
      ctx.strokeStyle = "rgba(41, 151, 255, 0.4)";
      ctx.lineWidth = 3;
      ctx.roundRect(1100, 110, 450, 810, 24);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#2997ff";
      ctx.font = "bold 22px -apple-system, sans-serif";
      ctx.fillText("SAMEER KHAN // CREDENTIALS", 1140, 170);

      ctx.fillStyle = "#f5f5f7";
      ctx.font = "bold 38px -apple-system, sans-serif";
      ctx.fillText("Full Stack Dev", 1140, 230);

      ctx.fillStyle = "#86868b";
      ctx.font = "20px -apple-system, sans-serif";
      ctx.fillText("RCS Tec · Apr 2024 – Present", 1140, 265);

      ctx.fillStyle = "#f5f5f7";
      ctx.font = "bold 38px -apple-system, sans-serif";
      ctx.fillText("9+ Systems", 1140, 360);

      ctx.fillStyle = "#86868b";
      ctx.font = "20px -apple-system, sans-serif";
      ctx.fillText("Production Deployed Projects", 1140, 395);

      ctx.fillStyle = "#f5f5f7";
      ctx.font = "bold 26px -apple-system, sans-serif";
      ctx.fillText("Core Stack:", 1140, 480);

      ctx.fillStyle = "#2997ff";
      ctx.font = "20px monospace";
      ctx.fillText("Spring Boot · React · Java", 1140, 520);
      ctx.fillText("MySQL · Redis · WebSockets", 1140, 555);
      ctx.fillText("Node.js · Swift · Kotlin", 1140, 590);

      ctx.fillStyle = "#30d158";
      ctx.font = "bold 22px -apple-system, sans-serif";
      ctx.fillText("● PRODUCTION STABLE", 1140, 680);
    }

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.anisotropy = 8;
    const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });

    // --- Build 3D MacBook ---
    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);

    const baseW = 3.6;
    const baseD = 2.4;
    const baseH = 0.12;

    // Base Housing
    const baseGeometry = new THREE.BoxGeometry(baseW, baseH, baseD);
    const baseMesh = new THREE.Mesh(baseGeometry, metalMaterial);
    baseMesh.position.y = -baseH / 2;
    laptopGroup.add(baseMesh);

    // Keyboard well
    const kbWellGeo = new THREE.PlaneGeometry(baseW * 0.88, baseD * 0.44);
    const kbWellMesh = new THREE.Mesh(kbWellGeo, darkAccentMaterial);
    kbWellMesh.rotation.x = -Math.PI / 2;
    kbWellMesh.position.set(0, 0.001, -0.3);
    laptopGroup.add(kbWellMesh);

    // Trackpad
    const trackpadGeo = new THREE.PlaneGeometry(1.2, 0.8);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f23,
      metalness: 0.8,
      roughness: 0.3,
    });
    const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpadMesh.rotation.x = -Math.PI / 2;
    trackpadMesh.position.set(0, 0.001, 0.6);
    laptopGroup.add(trackpadMesh);

    // Lid / Screen Group
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0, -baseD / 2);
    laptopGroup.add(lidGroup);

    const lidH = baseD;
    const lidThickness = 0.08;
    const lidGeo = new THREE.BoxGeometry(baseW, lidH, lidThickness);
    const lidMesh = new THREE.Mesh(lidGeo, metalMaterial);
    lidMesh.position.set(0, lidH / 2, -lidThickness / 2);
    lidGroup.add(lidMesh);

    // Display Glass
    const displayGeo = new THREE.PlaneGeometry(baseW * 0.94, lidH * 0.92);
    const displayMesh = new THREE.Mesh(displayGeo, screenMaterial);
    displayMesh.position.set(0, lidH / 2, 0.002);
    lidGroup.add(displayMesh);

    // Apple Logo
    const logoGeo = new THREE.CircleGeometry(0.18, 32);
    const logoMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.set(0, lidH / 2, -lidThickness - 0.001);
    logoMesh.rotation.y = Math.PI;
    lidGroup.add(logoMesh);

    // Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(8, 6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.55,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.4;
    scene.add(shadowMesh);

    // --- Pointer & Drag Interactions ---
    const onPointerDown = (e: PointerEvent) => {
      dragRef.current.isDragging = true;
      dragRef.current.prevX = e.clientX;
      dragRef.current.prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseParallaxRef.current.targetX = x * 0.35;
      mouseParallaxRef.current.targetY = y * 0.25;

      if (dragRef.current.isDragging) {
        const deltaX = e.clientX - dragRef.current.prevX;
        const deltaY = e.clientY - dragRef.current.prevY;
        dragRef.current.velX = deltaX * 0.005;
        dragRef.current.velY = deltaY * 0.005;
        dragRef.current.rotY += deltaX * 0.005;
        dragRef.current.rotX += deltaY * 0.005;
        dragRef.current.prevX = e.clientX;
        dragRef.current.prevY = e.clientY;
      }
    };

    const onPointerUp = () => {
      dragRef.current.isDragging = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // --- Animation Loop ---
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Parallax
      mouseParallaxRef.current.x += (mouseParallaxRef.current.targetX - mouseParallaxRef.current.x) * 0.05;
      mouseParallaxRef.current.y += (mouseParallaxRef.current.targetY - mouseParallaxRef.current.y) * 0.05;

      // Inertia
      dragRef.current.velX *= 0.92;
      dragRef.current.velY *= 0.92;
      dragRef.current.rotY += dragRef.current.velX;
      dragRef.current.rotX += dragRef.current.velY;

      const p = scrollRef.current;

      let autoRotY = 0;
      if (isAutoRef.current) {
        autoRotY = Date.now() * 0.0008;
      }

      // Lid Open
      let targetLidAngle = 0;
      if (p < 0.15) {
        targetLidAngle = (p / 0.15) * 0.15;
      } else if (p < 0.55) {
        const t = (p - 0.15) / 0.4;
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        targetLidAngle = 0.15 + ease * 1.8;
      } else {
        targetLidAngle = 1.95;
      }
      lidGroup.rotation.x = targetLidAngle;

      // Base Orientation
      const baseRotY = (1 - Math.min(p / 0.5, 1)) * 0.85 - 0.4;
      const baseRotX = 0.35 + (p > 0.55 ? (p - 0.55) * 0.2 : 0);

      laptopGroup.rotation.y = baseRotY + mouseParallaxRef.current.x * 0.3 + dragRef.current.rotY + autoRotY;
      laptopGroup.rotation.x = baseRotX - mouseParallaxRef.current.y * 0.2 + dragRef.current.rotX;
      laptopGroup.position.y = -0.25 + Math.sin(Date.now() * 0.001) * 0.04;

      // Camera Zoom into Screen
      if (p < 0.5) {
        camera.position.z = 7.0 - p * 1.4;
        camera.position.y = 1.1 - p * 0.3;
      } else {
        const zoomP = (p - 0.5) / 0.5;
        camera.position.z = 6.3 - zoomP * 2.5;
        camera.position.y = 0.95 + zoomP * 0.45;
      }
      camera.lookAt(0, laptopGroup.position.y + 0.3, 0);

      shadowMesh.position.y = -1.3 - p * 0.3;
      shadowMat.opacity = 0.55 - p * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      baseGeometry.dispose();
      kbWellGeo.dispose();
      trackpadGeo.dispose();
      lidGeo.dispose();
      displayGeo.dispose();
      logoGeo.dispose();
      shadowGeo.dispose();
      metalMaterial.dispose();
      darkAccentMaterial.dispose();
      trackpadMat.dispose();
      screenMaterial.dispose();
      screenTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: "none" }}
    />
  );
}
