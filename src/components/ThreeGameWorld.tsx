"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import Link from "next/link";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  RotateCcw,
  Camera,
  ExternalLink,
  Sparkles,
  Trophy,
  X,
  Gamepad2,
  Home,
  Film
} from "lucide-react";
import { gameAudio } from "@/utils/gameAudio";

// Project Data for Interactive 3D Kiosks
const gameProjects = [
  {
    id: "amagi",
    name: "Amagi Payment System",
    category: "Fintech & WebSockets",
    color: "#f59e0b", // Amber
    pos: { x: -28, z: -25 },
    desc: "Engineered a high-throughput, sub-second payment settlement platform featuring live WebSocket customer communication, transaction ledgers, and fraud monitoring dashboards.",
    humor: "Transactions are atomic and race conditions fear to tread.",
    tech: ["Spring Boot", "React.js", "WebSockets", "Redis", "MySQL"],
  },
  {
    id: "bank",
    name: "NT Nation Trust Bank",
    category: "Enterprise Core Banking",
    color: "#f97316", // Orange
    pos: { x: 28, z: -25 },
    desc: "Architected multi-tier core banking approval modules, strict RBAC governance, and distributed microservices, migrating legacy systems into modern fault-tolerant architectures.",
    humor: "Strict approval workflows: Even our bugs require manager sign-off.",
    tech: ["Java", "Spring Boot", "Microservices", "Oracle DB"],
  },
  {
    id: "konnects",
    name: "Coach Konnects",
    category: "Full Stack & WebAuthn",
    color: "#06b6d4", // Cyan
    pos: { x: -28, z: 25 },
    desc: "Designed an independent full-stack coaching platform featuring passwordless WebAuthn biometric security, real-time schedule synchronization, and interactive dashboards.",
    humor: "Zero passwords stored: Biometrics so sharp you can't fake being yourself.",
    tech: ["Spring Boot", "React", "WebAuthn", "PostgreSQL"],
  },
  {
    id: "logistics",
    name: "DHL & Zomato Logistics",
    category: "High-Throughput Supply",
    color: "#10b981", // Emerald
    pos: { x: 28, z: 25 },
    desc: "Streamlined asset management systems, driver dispatch routes, and high-volume B2B restaurant supply procurement pipelines with zero packet drops.",
    humor: "Moving freight across continents without dropping a single semicolon.",
    tech: ["Spring Boot", "Java", "React", "Distributed APIs", "Oracle DB"],
  },
];

type ActiveProject = (typeof gameProjects)[0];

interface PhysicsObject {
  mesh: THREE.Mesh;
  vx: number;
  vy: number;
  vz: number;
  rx: number;
  ry: number;
  rz: number;
  initialPos: THREE.Vector3;
  initialRot: THREE.Euler;
  isBowlingPin?: boolean;
  knocked?: boolean;
}

export default function ThreeGameWorld() {
  const mountRef = useRef<HTMLDivElement>(null);

  // HUD State
  const [speedDisplay, setSpeedDisplay] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [pinsKnockedCount, setPinsKnockedCount] = useState(0);
  const [showStrikeBanner, setShowStrikeBanner] = useState(false);
  const [cameraMode, setCameraMode] = useState<"chase" | "isometric" | "top">("chase");
  const [activeProject, setActiveProject] = useState<ActiveProject | null>(null);
  const [proximityPrompt, setProximityPrompt] = useState<string | null>(null);

  // Virtual Joypad / Touch Control state
  const touchControls = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // Game Engine References
  const gameRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    car: THREE.Group;
    wheels: THREE.Mesh[];
    headlights: THREE.SpotLight[];
    taillights: THREE.MeshBasicMaterial;
    physicsObjects: PhysicsObject[];
    carPhysics: {
      x: number;
      y: number;
      z: number;
      rotation: number;
      speed: number;
      steering: number;
      verticalVelocity: number;
      isGrounded: boolean;
    };
    keys: { [key: string]: boolean };
    activeZoneProject: ActiveProject | null;
    cleanup: () => void;
  } | null>(null);

  // ── Initialize Three.js Game World ──────────────────────────────────────────
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#08090f");
    scene.fog = new THREE.FogExp2("#08090f", 0.011);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );
    camera.position.set(0, 18, 32);

    // 3. Renderer (Hardware Accelerated)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight("#222738", 2.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight("#fff5db", 2.8);
    sunLight.position.set(40, 60, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 160;
    sunLight.shadow.camera.left = -60;
    sunLight.shadow.camera.right = 60;
    sunLight.shadow.camera.top = 60;
    sunLight.shadow.camera.bottom = -60;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Accent Cyber Rim Lights
    const cyanRim = new THREE.PointLight("#00e5ff", 3, 50);
    cyanRim.position.set(-35, 10, -35);
    scene.add(cyanRim);

    const amberRim = new THREE.PointLight("#f59e0b", 3, 50);
    amberRim.position.set(35, 10, 35);
    scene.add(amberRim);

    // 5. Stylized Grid Arena Floor
    const arenaRadius = 75;
    const floorGeo = new THREE.PlaneGeometry(arenaRadius * 2, arenaRadius * 2, 64, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: "#0c0e17",
      roughness: 0.8,
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid Overlay
    const gridHelper = new THREE.GridHelper(arenaRadius * 2, 40, "#f59e0b", "#1a2035");
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // Arena Perimeter Glowing Border Wall
    const borderGeo = new THREE.RingGeometry(arenaRadius - 0.5, arenaRadius + 1.5, 64);
    const borderMat = new THREE.MeshBasicMaterial({
      color: "#f59e0b",
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const border = new THREE.Mesh(borderGeo, borderMat);
    border.rotation.x = -Math.PI / 2;
    border.position.y = 0.05;
    scene.add(border);

    // 6. Build the Driveable RC Buggy
    const car = new THREE.Group();
    car.position.set(0, 0.45, 0);

    // Car Body / Chassis
    const bodyMat = new THREE.MeshStandardMaterial({
      color: "#eab308", // Cyber Golden Yellow
      roughness: 0.35,
      metalness: 0.6,
    });
    const bodyGeo = new THREE.BoxGeometry(1.6, 0.55, 3.2);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.35;
    body.castShadow = true;
    body.receiveShadow = true;
    car.add(body);

    // Cockpit Glass
    const cockpitMat = new THREE.MeshStandardMaterial({
      color: "#0f172a",
      roughness: 0.1,
      metalness: 0.9,
    });
    const cockpitGeo = new THREE.BoxGeometry(1.2, 0.45, 1.4);
    const cockpit = new THREE.Mesh(cockpitGeo, cockpitMat);
    cockpit.position.set(0, 0.75, -0.2);
    cockpit.castShadow = true;
    car.add(cockpit);

    // Rear Racing Spoiler
    const spoilerMat = new THREE.MeshStandardMaterial({ color: "#111827", roughness: 0.5 });
    const wingGeo = new THREE.BoxGeometry(1.8, 0.08, 0.45);
    const wing = new THREE.Mesh(wingGeo, spoilerMat);
    wing.position.set(0, 1.05, 1.4);
    wing.castShadow = true;
    car.add(wing);

    const mountL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.1), spoilerMat);
    mountL.position.set(-0.6, 0.85, 1.4);
    car.add(mountL);
    const mountR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.1), spoilerMat);
    mountR.position.set(0.6, 0.85, 1.4);
    car.add(mountR);

    // Headlights (Functional Spotlights)
    const headlightMat = new THREE.MeshBasicMaterial({ color: "#fffbeb" });
    const hlGeom = new THREE.BoxGeometry(0.35, 0.15, 0.1);
    const hlLeft = new THREE.Mesh(hlGeom, headlightMat);
    hlLeft.position.set(-0.55, 0.4, -1.62);
    car.add(hlLeft);

    const hlRight = new THREE.Mesh(hlGeom, headlightMat);
    hlRight.position.set(0.55, 0.4, -1.62);
    car.add(hlRight);

    const spotLeft = new THREE.SpotLight("#fff7ed", 4, 30, Math.PI / 6, 0.3);
    spotLeft.position.set(-0.55, 0.4, -1.65);
    spotLeft.target.position.set(-0.55, 0, -12);
    car.add(spotLeft);
    car.add(spotLeft.target);

    const spotRight = new THREE.SpotLight("#fff7ed", 4, 30, Math.PI / 6, 0.3);
    spotRight.position.set(0.55, 0.4, -1.65);
    spotRight.target.position.set(0.55, 0, -12);
    car.add(spotRight);
    car.add(spotRight.target);

    // Taillights
    const taillightMat = new THREE.MeshBasicMaterial({ color: "#ef4444" });
    const tlGeom = new THREE.BoxGeometry(0.4, 0.15, 0.08);
    const tlLeft = new THREE.Mesh(tlGeom, taillightMat);
    tlLeft.position.set(-0.55, 0.45, 1.62);
    car.add(tlLeft);

    const tlRight = new THREE.Mesh(tlGeom, taillightMat);
    tlRight.position.set(0.55, 0.45, 1.62);
    car.add(tlRight);

    // 4 Animated Rubber Wheels
    const wheels: THREE.Mesh[] = [];
    const wheelMat = new THREE.MeshStandardMaterial({
      color: "#18181b",
      roughness: 0.9,
    });
    const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.35, 18);
    wheelGeo.rotateZ(Math.PI / 2);

    const wheelPositions = [
      { x: -0.95, y: 0.38, z: -1.0 }, // Front Left
      { x: 0.95, y: 0.38, z: -1.0 },  // Front Right
      { x: -1.0, y: 0.42, z: 1.1 },   // Rear Left
      { x: 1.0, y: 0.42, z: 1.1 },    // Rear Right
    ];

    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(pos.x, pos.y, pos.z);
      wheel.castShadow = true;
      car.add(wheel);
      wheels.push(wheel);
    });

    scene.add(car);

    // 7. Interactive World Zones

    // ── Zone 1: Project Kiosks ────────────────────────────────────────────────
    gameProjects.forEach((proj) => {
      const group = new THREE.Group();
      group.position.set(proj.pos.x, 0, proj.pos.z);

      // Glowing Ground Trigger Pad
      const padGeo = new THREE.CylinderGeometry(4.5, 4.5, 0.15, 32);
      const padMat = new THREE.MeshStandardMaterial({
        color: proj.color,
        roughness: 0.4,
        metalness: 0.5,
        transparent: true,
        opacity: 0.85,
      });
      const pad = new THREE.Mesh(padGeo, padMat);
      pad.position.y = 0.08;
      pad.receiveShadow = true;
      group.add(pad);

      // Neon Ring
      const ringGeo = new THREE.RingGeometry(4.6, 5.0, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: proj.color,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.12;
      group.add(ring);

      // 3D Kiosk Pillar Stand
      const pillarGeo = new THREE.BoxGeometry(1.2, 4.5, 0.8);
      const pillarMat = new THREE.MeshStandardMaterial({
        color: "#1e293b",
        roughness: 0.3,
      });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(0, 2.25, 0);
      pillar.castShadow = true;
      group.add(pillar);

      // 3D Holographic Screen Billboard
      const screenGeo = new THREE.BoxGeometry(4.8, 2.6, 0.3);
      const screenMat = new THREE.MeshStandardMaterial({
        color: "#0f172a",
        emissive: proj.color,
        emissiveIntensity: 0.35,
        roughness: 0.2,
      });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.set(0, 4.8, 0);
      screen.castShadow = true;
      group.add(screen);

      // Beacon Light
      const beacon = new THREE.PointLight(proj.color, 2.5, 18);
      beacon.position.set(0, 6.2, 0);
      group.add(beacon);

      scene.add(group);
    });

    // ── Zone 2: Destructible "Legacy Code" Brick Wall ──────────────────────────
    const physicsObjects: PhysicsObject[] = [];
    const brickMat = new THREE.MeshStandardMaterial({
      color: "#dc2626", // Red bricks
      roughness: 0.6,
      metalness: 0.1,
    });
    const brickGeo = new THREE.BoxGeometry(1.8, 0.8, 0.8);

    const wallBaseX = 0;
    const wallBaseZ = -45;
    const wallCols = 6;
    const wallRows = 4;

    for (let r = 0; r < wallRows; r++) {
      for (let c = 0; c < wallCols; c++) {
        const brick = new THREE.Mesh(brickGeo, brickMat);
        const offsetX = (c - wallCols / 2 + 0.5) * 1.9;
        const offsetY = r * 0.85 + 0.45;
        brick.position.set(wallBaseX + offsetX, offsetY, wallBaseZ);
        brick.castShadow = true;
        brick.receiveShadow = true;
        scene.add(brick);

        physicsObjects.push({
          mesh: brick,
          vx: 0,
          vy: 0,
          vz: 0,
          rx: 0,
          ry: 0,
          rz: 0,
          initialPos: brick.position.clone(),
          initialRot: brick.rotation.clone(),
        });
      }
    }

    // 3D Sign above the brick wall
    const wallBannerGeo = new THREE.BoxGeometry(12, 1.2, 0.4);
    const wallBannerMat = new THREE.MeshStandardMaterial({
      color: "#991b1b",
      emissive: "#ef4444",
      emissiveIntensity: 0.3,
    });
    const wallBanner = new THREE.Mesh(wallBannerGeo, wallBannerMat);
    wallBanner.position.set(wallBaseX, wallRows * 0.85 + 1.2, wallBaseZ);
    wallBanner.castShadow = true;
    scene.add(wallBanner);

    // ── Zone 3: Stunt Launch Ramp & Turbo Pad ──────────────────────────────────
    const rampGroup = new THREE.Group();
    rampGroup.position.set(0, 0, 15);

    // Wedge Ramp Geometry
    const rampShape = new THREE.Shape();
    rampShape.moveTo(-2.5, 0);
    rampShape.lineTo(2.5, 0);
    rampShape.lineTo(2.5, 2.2);
    rampShape.lineTo(-2.5, 0);

    const extrudeSettings = { depth: 6, bevelEnabled: false };
    const rampGeo = new THREE.ExtrudeGeometry(rampShape, extrudeSettings);
    const rampMat = new THREE.MeshStandardMaterial({
      color: "#f59e0b",
      roughness: 0.4,
      metalness: 0.4,
    });
    const rampMesh = new THREE.Mesh(rampGeo, rampMat);
    rampMesh.rotation.y = Math.PI / 2;
    rampMesh.position.set(3, 0, 0);
    rampMesh.receiveShadow = true;
    rampMesh.castShadow = true;
    rampGroup.add(rampMesh);

    // Turbo Boost Arrows on Ground before ramp
    const turboGeo = new THREE.PlaneGeometry(3.5, 5);
    const turboMat = new THREE.MeshBasicMaterial({
      color: "#f97316",
      transparent: true,
      opacity: 0.85,
    });
    const turboPad = new THREE.Mesh(turboGeo, turboMat);
    turboPad.rotation.x = -Math.PI / 2;
    turboPad.position.set(0, 0.08, -5);
    rampGroup.add(turboPad);

    scene.add(rampGroup);

    // ── Zone 4: Bowling Pins Formation ────────────────────────────────────────
    const pinGeo = new THREE.CylinderGeometry(0.3, 0.45, 1.6, 12);
    const pinMat = new THREE.MeshStandardMaterial({
      color: "#fafafa",
      roughness: 0.3,
    });
    const bowlingBaseZ = 45;

    // Classic 10-Pin Triangle
    const pinRows = 4;
    let pinIndex = 0;
    for (let r = 0; r < pinRows; r++) {
      const pinsInRow = r + 1;
      for (let p = 0; p < pinsInRow; p++) {
        const pin = new THREE.Mesh(pinGeo, pinMat);
        const px = (p - (pinsInRow - 1) / 2) * 1.3;
        const pz = bowlingBaseZ + r * 1.4;
        pin.position.set(px, 0.8, pz);
        pin.castShadow = true;
        scene.add(pin);

        physicsObjects.push({
          mesh: pin,
          vx: 0,
          vy: 0,
          vz: 0,
          rx: 0,
          ry: 0,
          rz: 0,
          initialPos: pin.position.clone(),
          initialRot: pin.rotation.clone(),
          isBowlingPin: true,
          knocked: false,
        });
        pinIndex++;
      }
    }

    // ── Zone 5: Tech Stack Physics Cubes ───────────────────────────────────────
    const techCubes = [
      { name: "Spring Boot", color: "#10b981", x: -14, z: -8 },
      { name: "React", color: "#06b6d4", x: -12, z: -8 },
      { name: "Redis", color: "#ef4444", x: -13, z: -8 },
      { name: "WebSockets", color: "#8b5cf6", x: -13, z: -6.5 },
      { name: "Microservices", color: "#f59e0b", x: -11, z: -6.5 },
    ];

    techCubes.forEach((cubeData, idx) => {
      const cubeGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
      const cubeMeshMat = new THREE.MeshStandardMaterial({
        color: cubeData.color,
        roughness: 0.4,
      });
      const cube = new THREE.Mesh(cubeGeo, cubeMeshMat);
      cube.position.set(cubeData.x, 0.7 + (idx % 2 === 0 ? 0 : 1.4), cubeData.z);
      cube.castShadow = true;
      cube.receiveShadow = true;
      scene.add(cube);

      physicsObjects.push({
        mesh: cube,
        vx: 0,
        vy: 0,
        vz: 0,
        rx: 0,
        ry: 0,
        rz: 0,
        initialPos: cube.position.clone(),
        initialRot: cube.rotation.clone(),
      });
    });

    // 8. Keyboard Listeners
    const keys: { [key: string]: boolean } = {};
    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;

      // Single action triggers
      if (e.key.toLowerCase() === "h") {
        gameAudio.playHorn();
      }
      if (e.key.toLowerCase() === "r") {
        resetVehicle();
      }
      if (e.key.toLowerCase() === "c") {
        cycleCameraMode();
      }
      if (e.key === " " && gameRef.current?.activeZoneProject) {
        setActiveProject(gameRef.current.activeZoneProject);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // 9. Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Save Game State
    gameRef.current = {
      scene,
      camera,
      renderer,
      car,
      wheels,
      headlights: [spotLeft, spotRight],
      taillights: taillightMat,
      physicsObjects,
      carPhysics: {
        x: 0,
        y: 0.45,
        z: 0,
        rotation: Math.PI,
        speed: 0,
        steering: 0,
        verticalVelocity: 0,
        isGrounded: true,
      },
      keys,
      activeZoneProject: null,
      cleanup: () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
        window.removeEventListener("resize", handleResize);
        gameAudio.stopEngine();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      },
    };

    // 10. Main Game Animation & Physics Loop
    let animId: number;

    const gameLoop = () => {
      animId = requestAnimationFrame(gameLoop);

      const state = gameRef.current;
      if (!state) return;

      const { car, carPhysics, wheels, physicsObjects, keys } = state;
      const tc = touchControls.current;

      // ── Vehicle Controls & Accelerations ────────────────────────────────────
      const isThrottle = keys["w"] || keys["arrowup"] || tc.forward;
      const isReverse = keys["s"] || keys["arrowdown"] || tc.backward;
      const isTurnLeft = keys["a"] || keys["arrowleft"] || tc.left;
      const isTurnRight = keys["d"] || keys["arrowright"] || tc.right;
      const isBraking = keys[" "];

      const accel = 0.024;
      const maxForward = 0.82;
      const maxReverse = -0.35;
      const friction = 0.958;

      if (isThrottle) {
        carPhysics.speed = Math.min(carPhysics.speed + accel, maxForward);
      } else if (isReverse) {
        carPhysics.speed = Math.max(carPhysics.speed - accel * 0.8, maxReverse);
      } else {
        carPhysics.speed *= friction;
        if (Math.abs(carPhysics.speed) < 0.005) carPhysics.speed = 0;
      }

      if (isBraking) {
        carPhysics.speed *= 0.86;
        state.taillights.color.set("#ff0000");
      } else {
        state.taillights.color.set(isReverse ? "#ffffff" : "#ef4444");
      }

      // Steering
      const steerTarget = isTurnLeft ? 0.045 : isTurnRight ? -0.045 : 0;
      carPhysics.steering += (steerTarget - carPhysics.steering) * 0.2;

      // Only turn if moving
      if (Math.abs(carPhysics.speed) > 0.01) {
        const turnDir = carPhysics.speed > 0 ? 1 : -1;
        carPhysics.rotation += carPhysics.steering * turnDir * (Math.abs(carPhysics.speed) / maxForward);
      }

      // Audio engine pitch
      gameAudio.updateEngineSpeed(carPhysics.speed / maxForward);

      // Update position along facing angle
      carPhysics.x -= Math.sin(carPhysics.rotation) * carPhysics.speed;
      carPhysics.z -= Math.cos(carPhysics.rotation) * carPhysics.speed;

      // Jump / Ramp vertical physics
      carPhysics.y += carPhysics.verticalVelocity;
      if (carPhysics.y > 0.45) {
        carPhysics.verticalVelocity -= 0.035; // Gravity
        carPhysics.isGrounded = false;
      } else {
        carPhysics.y = 0.45;
        carPhysics.verticalVelocity = 0;
        carPhysics.isGrounded = true;
      }

      // Arena boundary bounce
      const distFromCenter = Math.sqrt(carPhysics.x * carPhysics.x + carPhysics.z * carPhysics.z);
      if (distFromCenter > arenaRadius - 2) {
        carPhysics.speed *= -0.6;
        const angle = Math.atan2(carPhysics.z, carPhysics.x);
        carPhysics.x = Math.cos(angle) * (arenaRadius - 2.5);
        carPhysics.z = Math.sin(angle) * (arenaRadius - 2.5);
        gameAudio.playImpact(0.8);
      }

      // Apply to 3D Mesh
      car.position.set(carPhysics.x, carPhysics.y, carPhysics.z);
      car.rotation.y = carPhysics.rotation;

      // Subtle suspension tilt during turning & speed
      car.rotation.z = -carPhysics.steering * (carPhysics.speed / maxForward) * 1.5;
      car.rotation.x = isThrottle ? 0.04 : isBraking ? -0.05 : 0;

      // Rotate wheels with speed and front wheel turn angle
      wheels.forEach((wheel, idx) => {
        wheel.rotation.x += carPhysics.speed * 1.8;
        if (idx < 2) {
          wheel.rotation.y = carPhysics.steering * 8;
        }
      });

      // ── Ramp Launch Detection ───────────────────────────────────────────────
      if (
        Math.abs(carPhysics.x) < 3.5 &&
        carPhysics.z > 9 &&
        carPhysics.z < 18 &&
        carPhysics.speed > 0.3
      ) {
        if (carPhysics.isGrounded) {
          carPhysics.verticalVelocity = 0.55;
          gameAudio.playBoost();
        }
      }

      // ── Physics Prop Collisions (Bricks, Cubes, Bowling Pins) ───────────────
      const carRadius = 1.8;
      const carSpeedVal = Math.abs(carPhysics.speed);

      physicsObjects.forEach((obj) => {
        // Distance check
        const dx = obj.mesh.position.x - carPhysics.x;
        const dz = obj.mesh.position.z - carPhysics.z;
        const dist = Math.sqrt(dx * dx + dz * dz);

        if (dist < carRadius + 0.9 && carSpeedVal > 0.05) {
          // Collision impact vector
          const normalX = dx / (dist || 1);
          const normalZ = dz / (dist || 1);
          const impactSpeed = Math.max(carSpeedVal * 1.4, 0.2);

          obj.vx = normalX * impactSpeed + (Math.random() - 0.5) * 0.15;
          obj.vz = normalZ * impactSpeed + (Math.random() - 0.5) * 0.15;
          obj.vy = Math.min(impactSpeed * 0.8, 0.45);

          obj.rx = (Math.random() - 0.5) * 0.35;
          obj.rz = (Math.random() - 0.5) * 0.35;

          gameAudio.playImpact(impactSpeed);

          // Slight recoil on car
          carPhysics.speed *= 0.75;

          // Bowling Pin Strike Tracking
          if (obj.isBowlingPin && !obj.knocked) {
            obj.knocked = true;
            setPinsKnockedCount((prev) => {
              const updated = prev + 1;
              if (updated === 10) {
                setShowStrikeBanner(true);
                gameAudio.playStrike();
                setTimeout(() => setShowStrikeBanner(false), 4500);
              }
              return updated;
            });
          }
        }

        // Prop movement and ground bounce
        if (Math.abs(obj.vx) > 0.005 || Math.abs(obj.vz) > 0.005 || obj.mesh.position.y > 0.45) {
          obj.mesh.position.x += obj.vx;
          obj.mesh.position.z += obj.vz;
          obj.mesh.position.y += obj.vy;

          obj.mesh.rotation.x += obj.rx;
          obj.mesh.rotation.z += obj.rz;

          obj.vx *= 0.92;
          obj.vz *= 0.92;
          obj.rx *= 0.92;
          obj.rz *= 0.92;

          if (obj.mesh.position.y > 0.45) {
            obj.vy -= 0.035; // Gravity
          } else {
            obj.mesh.position.y = 0.45;
            obj.vy = -obj.vy * 0.3; // Rebound bounce
          }
        }
      });

      // ── Proximity Detection for Project Showcases ───────────────────────────
      let currentNearProject: ActiveProject | null = null;
      gameProjects.forEach((proj) => {
        const pdx = proj.pos.x - carPhysics.x;
        const pdz = proj.pos.z - carPhysics.z;
        const pdist = Math.sqrt(pdx * pdx + pdz * pdz);

        if (pdist < 5.0) {
          currentNearProject = proj;
        }
      });

      state.activeZoneProject = currentNearProject;
      if (currentNearProject) {
        setProximityPrompt(`[SPACE or TAP] Inspect ${(currentNearProject as ActiveProject).name}`);
      } else {
        setProximityPrompt(null);
      }

      // ── Camera Tracking Follow Modes ────────────────────────────────────────
      const camera = state.camera;

      if (cameraMode === "chase") {
        // Smooth dynamic follow camera behind the car
        const cameraDist = 14;
        const cameraHeight = 7.5;
        const targetX = carPhysics.x + Math.sin(carPhysics.rotation) * cameraDist;
        const targetZ = carPhysics.z + Math.cos(carPhysics.rotation) * cameraDist;

        camera.position.x += (targetX - camera.position.x) * 0.08;
        camera.position.y += (carPhysics.y + cameraHeight - camera.position.y) * 0.08;
        camera.position.z += (targetZ - camera.position.z) * 0.08;

        const lookAtTarget = new THREE.Vector3(
          carPhysics.x - Math.sin(carPhysics.rotation) * 4,
          carPhysics.y + 1.5,
          carPhysics.z - Math.cos(carPhysics.rotation) * 4
        );
        camera.lookAt(lookAtTarget);
      } else if (cameraMode === "isometric") {
        // Bruno Simon-style fixed angle isometric view
        const isoX = carPhysics.x + 22;
        const isoY = carPhysics.y + 24;
        const isoZ = carPhysics.z + 24;

        camera.position.x += (isoX - camera.position.x) * 0.06;
        camera.position.y += (isoY - camera.position.y) * 0.06;
        camera.position.z += (isoZ - camera.position.z) * 0.06;
        camera.lookAt(carPhysics.x, carPhysics.y + 1, carPhysics.z);
      } else {
        // Satellite Top-Down View
        camera.position.x += (carPhysics.x - camera.position.x) * 0.08;
        camera.position.y += (45 - camera.position.y) * 0.08;
        camera.position.z += (carPhysics.z - camera.position.z) * 0.08;
        camera.lookAt(carPhysics.x, 0, carPhysics.z);
      }

      // HUD Speed update (scaled to km/h)
      setSpeedDisplay(Math.round(Math.abs(carPhysics.speed) * 140));

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animId);
      gameRef.current?.cleanup();
    };
  }, [cameraMode]);

  // ── Helper Actions ──────────────────────────────────────────────────────────
  const resetVehicle = useCallback(() => {
    const state = gameRef.current;
    if (!state) return;
    state.carPhysics.x = 0;
    state.carPhysics.y = 0.45;
    state.carPhysics.z = 0;
    state.carPhysics.rotation = Math.PI;
    state.carPhysics.speed = 0;
    state.carPhysics.steering = 0;
    state.carPhysics.verticalVelocity = 0;

    // Reset physics props
    state.physicsObjects.forEach((obj) => {
      obj.mesh.position.copy(obj.initialPos);
      obj.mesh.rotation.copy(obj.initialRot);
      obj.vx = 0;
      obj.vy = 0;
      obj.vz = 0;
      obj.rx = 0;
      obj.ry = 0;
      obj.rz = 0;
      obj.knocked = false;
    });

    setPinsKnockedCount(0);
    gameAudio.playHorn();
  }, []);

  const cycleCameraMode = () => {
    setCameraMode((prev) => (prev === "chase" ? "isometric" : prev === "isometric" ? "top" : "chase"));
  };

  const toggleSound = () => {
    const muted = gameAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      gameAudio.startEngine();
    }
  };

  // Start Engine sound on first interaction
  const handleUserInteract = () => {
    gameAudio.startEngine();
  };

  return (
    <div
      onClick={handleUserInteract}
      className="relative w-full h-screen overflow-hidden bg-[#08090f] text-white select-none font-sans"
    >
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* ── Top Floating Minimalist Glassmorphism Header ───────────────────────── */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6 flex items-center justify-between pointer-events-none">
        {/* Left Title & Status */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <Link
            href="/"
            className="w-10 h-10 rounded-2xl bg-black/70 border border-white/15 flex items-center justify-center font-bold text-amber-300 shadow-2xl backdrop-blur-xl hover:scale-105 active:scale-95 transition-all"
            title="Return to Main Portfolio"
          >
            SK
          </Link>

          <div className="hidden sm:flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-white">Sameer's 3D Playground</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[11px] font-mono text-neutral-400">Physics RC Car &amp; Project Kiosks</span>
          </div>
        </div>

        {/* Right Navigation & Mode Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Audio Mute Toggle */}
          <button
            onClick={toggleSound}
            className="p-2.5 rounded-full bg-black/70 border border-white/15 text-neutral-300 hover:text-white backdrop-blur-xl hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Camera Mode Toggle */}
          <button
            onClick={cycleCameraMode}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/70 border border-white/15 text-xs font-mono text-neutral-200 hover:text-white backdrop-blur-xl hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
            title="Switch Camera Perspective (C)"
          >
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline uppercase">{cameraMode}</span>
          </button>

          {/* Reset Vehicle */}
          <button
            onClick={resetVehicle}
            className="p-2.5 rounded-full bg-black/70 border border-white/15 text-neutral-300 hover:text-white backdrop-blur-xl hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
            title="Reset Vehicle to Center (R)"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
          </button>

          {/* Portals to other pages */}
          <Link
            href="/other-side"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/70 border border-amber-500/30 text-xs font-mono text-amber-300 hover:bg-amber-500/10 backdrop-blur-xl transition-all shadow-lg"
          >
            <Film className="w-3.5 h-3.5" />
            <span>3D Cinema</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold font-mono tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </Link>
        </div>
      </header>

      {/* ── Proximity Project Inspection Prompt Banner ────────────────────────── */}
      {proximityPrompt && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-auto animate-bounce">
          <button
            onClick={() => {
              if (gameRef.current?.activeZoneProject) {
                setActiveProject(gameRef.current.activeZoneProject);
              }
            }}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-amber-400 text-black font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_35px_rgba(245,158,11,0.8)] cursor-pointer hover:scale-105 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{proximityPrompt}</span>
          </button>
        </div>
      )}

      {/* ── Bowling Alley Strike Celebration Banner ────────────────────────────── */}
      {showStrikeBanner && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-sm">
          <div className="text-center p-8 rounded-3xl bg-black/80 border-2 border-amber-400 shadow-[0_0_60px_rgba(245,158,11,0.8)] animate-pulse">
            <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-3" />
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
              PERFECT STRIKE!
            </h1>
            <p className="text-sm sm:text-lg font-mono text-amber-300 mt-2">
              100% Bugs Demolished &bull; Production Ready
            </p>
          </div>
        </div>
      )}

      {/* ── Bottom HUD HUD Bar (Speedometer, Pins, Controls) ──────────────────── */}
      <footer className="absolute bottom-6 left-6 right-6 z-30 flex items-end justify-between pointer-events-none">
        {/* Left: Speedometer & Bowling Score */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Speedometer Gauge */}
          <div className="p-3.5 sm:p-4 rounded-3xl bg-black/70 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col items-center min-w-[90px]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">SPEED</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {speedDisplay}
              </span>
              <span className="text-[10px] font-mono text-neutral-400">KM/H</span>
            </div>
          </div>

          {/* Bowling Pins Counter */}
          <div className="p-3.5 sm:p-4 rounded-3xl bg-black/70 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col items-center min-w-[90px]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">PINS</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
                {pinsKnockedCount}
              </span>
              <span className="text-[10px] font-mono text-neutral-400">/ 10</span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Controls Legend */}
        <div className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-xl text-xs font-mono text-neutral-300 shadow-2xl">
          <span className="text-amber-400 font-bold">DRIVE:</span>
          <span>W/A/S/D or Arrows</span>
          <span className="text-white/20">&bull;</span>
          <span className="text-cyan-400 font-bold">HORN:</span>
          <span>[H]</span>
          <span className="text-white/20">&bull;</span>
          <span className="text-rose-400 font-bold">RESET:</span>
          <span>[R]</span>
          <span className="text-white/20">&bull;</span>
          <span className="text-emerald-400 font-bold">INSPECT:</span>
          <span>[SPACE]</span>
        </div>

        {/* Right: Mobile Touch Controller (Visible on touch/mobile) */}
        <div className="flex md:hidden flex-col items-end gap-2 pointer-events-auto">
          <div className="flex gap-2">
            <button
              onTouchStart={() => (touchControls.current.left = true)}
              onTouchEnd={() => (touchControls.current.left = false)}
              className="w-14 h-14 rounded-2xl bg-black/70 border border-white/20 flex items-center justify-center font-bold text-xl active:bg-amber-400 active:text-black"
            >
              ◀
            </button>
            <button
              onTouchStart={() => (touchControls.current.forward = true)}
              onTouchEnd={() => (touchControls.current.forward = false)}
              className="w-14 h-14 rounded-2xl bg-amber-400 text-black flex items-center justify-center font-bold text-xl active:scale-90"
            >
              ▲
            </button>
            <button
              onTouchStart={() => (touchControls.current.right = true)}
              onTouchEnd={() => (touchControls.current.right = false)}
              className="w-14 h-14 rounded-2xl bg-black/70 border border-white/20 flex items-center justify-center font-bold text-xl active:bg-amber-400 active:text-black"
            >
              ▶
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => gameAudio.playHorn()}
              className="w-14 h-12 rounded-xl bg-black/70 border border-white/20 text-xs font-mono active:bg-white/20"
            >
              HORN
            </button>
            <button
              onTouchStart={() => (touchControls.current.backward = true)}
              onTouchEnd={() => (touchControls.current.backward = false)}
              className="w-14 h-12 rounded-xl bg-rose-500/80 text-white flex items-center justify-center font-bold active:scale-90"
            >
              ▼ REV
            </button>
          </div>
        </div>
      </footer>

      {/* ── Interactive Project Showcase Modal (Sarthak Prakash Inspired) ──────── */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0c0d16] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category Pill */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold"
                style={{
                  backgroundColor: `${activeProject.color}22`,
                  color: activeProject.color,
                  border: `1px solid ${activeProject.color}44`,
                }}
              >
                {activeProject.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
              {activeProject.name}
            </h2>

            {/* Description */}
            <p className="text-sm text-neutral-300 leading-relaxed mb-4">
              {activeProject.desc}
            </p>

            {/* Humor Reality Check */}
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 mb-6 text-xs font-mono text-neutral-300">
              <span className="text-amber-400 font-semibold">&gt; Reality Check:</span> {activeProject.humor}
            </div>

            {/* Tech Chips */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {activeProject.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveProject(null)}
                className="px-5 py-2.5 rounded-full text-xs font-mono text-neutral-400 hover:text-white border border-white/10 hover:bg-white/5 transition-all cursor-pointer"
              >
                Back to Driving
              </button>

              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold font-mono tracking-wide text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all"
              >
                <span>View Full Architecture</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
