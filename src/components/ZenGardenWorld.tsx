"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import Link from "next/link";
import {
  Volume2,
  VolumeX,
  Compass,
  Bell,
  Home,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  X,
  ExternalLink,
  Play,
  Pause,
  MapPin
} from "lucide-react";
import { zenAudio } from "@/utils/zenAudio";

// ── Zen Garden Shrines / Project Stations ─────────────────────────────────────
interface ZenStation {
  id: string;
  kanji: string;
  title: string;
  subtitle: string;
  haiku: string[];
  description: string;
  humor: string;
  tech: string[];
  pathProgress: number; // 0.0 to 1.0 along the path
  position: THREE.Vector3;
}

const zenStations: ZenStation[] = [
  {
    id: "entrance",
    kanji: "門",
    title: "Torii of New Beginnings",
    subtitle: "The Zen of Full Stack Development",
    haiku: [
      "Silent lines of code,",
      "Servers hum in harmony,",
      "Morning tea is poured."
    ],
    description: "Welcome to Sameer's Zen Garden. Step onto the stone path, leave the noise of production behind, and take a peaceful meditative walk through my architecture and craft.",
    humor: "In this garden, there are no merge conflicts, no broken builds, and zero emergency Slack pings.",
    tech: ["Full Stack", "Clean Architecture", "Mindful Engineering"],
    pathProgress: 0.05,
    position: new THREE.Vector3(0, 0, -42),
  },
  {
    id: "amagi",
    kanji: "桜",
    title: "Sakura Pavilion",
    subtitle: "Amagi Payment Settlement Platform",
    haiku: [
      "Petals drift in wind,",
      "Ledgers balance in a flash,",
      "Sub-second payments."
    ],
    description: "Architected a high-throughput, sub-second payment settlement platform featuring live WebSocket customer communications, transactional ledgers, and fraud monitoring dashboards.",
    humor: "Transactions are strictly atomic. Peace of mind is guaranteed even when millions flow per minute.",
    tech: ["Spring Boot", "React.js", "WebSockets", "Redis", "MySQL"],
    pathProgress: 0.28,
    position: new THREE.Vector3(-18, 0, -22),
  },
  {
    id: "bank",
    kanji: "竹",
    title: "Bamboo Grove Sanctuary",
    subtitle: "NT Nation Trust Bank Enterprise Core",
    haiku: [
      "Hollow stems stand tall,",
      "Strict approvals guard the vault,",
      "Bending, never breaks."
    ],
    description: "Engineered core banking modules with multi-tier approval workflows, strict RBAC governance, and distributed microservices, migrating legacy systems into modern fault-tolerant architectures.",
    humor: "Like the resilient bamboo bending with the typhoon, our banking microservices gracefully withstand traffic spikes.",
    tech: ["Java", "Spring Boot", "Microservices", "Oracle DB"],
    pathProgress: 0.48,
    position: new THREE.Vector3(16, 0, -5),
  },
  {
    id: "konnects",
    kanji: "橋",
    title: "Lantern Bridge",
    subtitle: "Coach Konnects Platform",
    haiku: [
      "Across wooden bridge,",
      "Passkeys unlock without words,",
      "Biometrics bloom."
    ],
    description: "Designed an independent full-stack coaching platform featuring passwordless WebAuthn biometric security, real-time schedule synchronization, and interactive dashboards.",
    humor: "No passwords stored in the database. When users forget their passwords, we simply smile and use fingerprint auth.",
    tech: ["Spring Boot", "React", "WebAuthn", "PostgreSQL"],
    pathProgress: 0.70,
    position: new THREE.Vector3(-14, 0, 18),
  },
  {
    id: "logistics",
    kanji: "池",
    title: "Koi Pond Teahouse",
    subtitle: "DHL & Zomato High-Throughput Logistics",
    haiku: [
      "Ripples in the pond,",
      "Cargo moves across the seas,",
      "Every parcel safe."
    ],
    description: "Streamlined asset management systems, driver dispatch routes, and high-volume B2B restaurant supply procurement pipelines with zero packet drops.",
    humor: "Moving freight across 4 continents with the tranquility of a koi gliding through morning water.",
    tech: ["Spring Boot", "Java", "React", "Distributed APIs", "Oracle DB"],
    pathProgress: 0.90,
    position: new THREE.Vector3(14, 0, 36),
  },
  {
    id: "departure",
    kanji: "月",
    title: "Moon Gate of Connections",
    subtitle: "Let's Build Something Serene",
    haiku: [
      "Garden path concludes,",
      "New creations wait ahead,",
      "Let our spirits meet."
    ],
    description: "You have walked the stone path of the Zen Garden. If you value clean architecture, thoughtful execution, and peaceful reliable systems, I would love to collaborate with you.",
    humor: "Available for high-impact roles. Coffee consumption is negotiable; code quality is absolute.",
    tech: ["sameer6306khan@gmail.com", "+91 7985835954", "Open to Opportunities"],
    pathProgress: 0.98,
    position: new THREE.Vector3(0, 0, 48),
  },
];

export default function ZenGardenWorld() {
  const mountRef = useRef<HTMLDivElement>(null);

  // Zen HUD States
  const [isMuted, setIsMuted] = useState(true);
  const [activeStation, setActiveStation] = useState<ZenStation | null>(null);
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [isAutoStrolling, setIsAutoStrolling] = useState(false);
  const [strollProgress, setStrollProgress] = useState(0.05); // 0 to 1
  const [zenNotification, setZenNotification] = useState<string | null>("Welcome to the Zen Garden. Drag or scroll to stroll.");

  // References for Animation & Game Loop
  const progressRef = useRef(0.05);
  const targetProgressRef = useRef(0.05);
  const isAutoStrollingRef = useRef(false);
  const activeStationRef = useRef<ZenStation | null>(null);

  // ── Curving Garden Path Curve Definition ────────────────────────────────────
  const pathCurve = useRef(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, -45),    // Torii Gate
      new THREE.Vector3(-8, 0, -35),
      new THREE.Vector3(-18, 0, -22),  // Sakura Pavilion (Station 2)
      new THREE.Vector3(-10, 0, -12),
      new THREE.Vector3(5, 0, -8),
      new THREE.Vector3(16, 0, -5),    // Bamboo Sanctuary (Station 3)
      new THREE.Vector3(12, 0, 6),
      new THREE.Vector3(-3, 0.4, 12),  // Bridge start
      new THREE.Vector3(-14, 0.6, 18), // Lantern Bridge (Station 4)
      new THREE.Vector3(-8, 0.2, 26),  // Bridge end
      new THREE.Vector3(4, 0, 30),
      new THREE.Vector3(14, 0, 36),    // Koi Teahouse (Station 5)
      new THREE.Vector3(8, 0, 42),
      new THREE.Vector3(0, 0, 48),     // Moon Gate Departure (Station 6)
    ])
  );

  // ── Notification Toast Helper ───────────────────────────────────────────────
  const notifyTimer = useRef<NodeJS.Timeout | null>(null);
  const triggerNotification = useCallback((msg: string) => {
    setZenNotification(msg);
    if (notifyTimer.current) clearTimeout(notifyTimer.current);
    notifyTimer.current = setTimeout(() => setZenNotification(null), 3500);
  }, []);

  // ── Three.js Scene Setup ───────────────────────────────────────────────────
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Serene Twilight Atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#161522"); // Deep calming twilight violet
    scene.fog = new THREE.FogExp2("#161522", 0.018); // Soft morning mist

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      250
    );

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 4. Peaceful Ambient & Warm Directional Sun/Lantern Lighting
    const ambientLight = new THREE.AmbientLight("#a594c7", 0.85); // Soft lavender ambient
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight("#ffe0b2", 1.4); // Warm morning sun
    sunLight.position.set(35, 45, -25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 120;
    const d = 45;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Subtle cyan rim light for koi water reflection
    const waterRimLight = new THREE.DirectionalLight("#38bdf8", 0.4);
    waterRimLight.position.set(-30, 20, 30);
    scene.add(waterRimLight);

    // 5. Rolling Green Moss Ground & Zen Sand Ripples
    const groundGeo = new THREE.PlaneGeometry(160, 160, 48, 48);
    // Displace vertices subtly for natural rolling contours
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      // Gentle rolling hillocks
      const zVal = Math.sin(x * 0.05) * Math.cos(y * 0.05) * 0.75;
      posAttr.setZ(i, zVal);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: "#1d2a21", // Deep mossy forest green
      roughness: 0.85,
      metalness: 0.05,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 6. Zen Stone Stepping Path (Tobi-ishi) along the curve
    const pathSamples = 70;
    const stoneGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.18, 9);
    const stoneMat = new THREE.MeshStandardMaterial({
      color: "#6b7280", // Natural river stone grey
      roughness: 0.9,
    });

    for (let i = 0; i <= pathSamples; i++) {
      const t = i / pathSamples;
      const point = pathCurve.current.getPoint(t);
      const stone = new THREE.Mesh(stoneGeo, stoneMat);
      // Slightly irregular organic positioning
      stone.position.set(
        point.x + (Math.sin(i * 1.5) * 0.25),
        point.y + 0.08,
        point.z
      );
      stone.scale.set(
        1 + (Math.sin(i * 3) * 0.18),
        1,
        1 + (Math.cos(i * 2.5) * 0.18)
      );
      stone.rotation.y = Math.sin(i) * 0.6;
      stone.receiveShadow = true;
      stone.castShadow = true;
      scene.add(stone);
    }

    // 7. Traditional Vermillion Red Torii Gate at Entrance (Station 1)
    const createToriiGate = (x: number, z: number, rotationY = 0) => {
      const toriiGroup = new THREE.Group();
      const redMat = new THREE.MeshStandardMaterial({ color: "#dc2626", roughness: 0.4 });
      const blackMat = new THREE.MeshStandardMaterial({ color: "#18181b", roughness: 0.3 });

      // Pillars (Hashira)
      const pillarGeo = new THREE.CylinderGeometry(0.35, 0.4, 7.5, 12);
      const leftPillar = new THREE.Mesh(pillarGeo, redMat);
      leftPillar.position.set(-3.2, 3.75, 0);
      leftPillar.castShadow = true;
      toriiGroup.add(leftPillar);

      const rightPillar = new THREE.Mesh(pillarGeo, redMat);
      rightPillar.position.set(3.2, 3.75, 0);
      rightPillar.castShadow = true;
      toriiGroup.add(rightPillar);

      // Top Curved Lintel (Kasagi)
      const kasagiGeo = new THREE.BoxGeometry(9.2, 0.65, 0.85);
      const kasagi = new THREE.Mesh(kasagiGeo, blackMat);
      kasagi.position.set(0, 7.2, 0);
      kasagi.castShadow = true;
      toriiGroup.add(kasagi);

      // Lower Tie Beam (Nuki)
      const nukiGeo = new THREE.BoxGeometry(7.8, 0.45, 0.55);
      const nuki = new THREE.Mesh(nukiGeo, redMat);
      nuki.position.set(0, 5.8, 0);
      nuki.castShadow = true;
      toriiGroup.add(nuki);

      // Small central tablet plaque (Gakuzuka)
      const tabletGeo = new THREE.BoxGeometry(0.8, 1.1, 0.3);
      const tablet = new THREE.Mesh(tabletGeo, blackMat);
      tablet.position.set(0, 6.5, 0);
      toriiGroup.add(tablet);

      toriiGroup.position.set(x, 0, z);
      toriiGroup.rotation.y = rotationY;
      scene.add(toriiGroup);
      return toriiGroup;
    };

    createToriiGate(0, -42, 0); // Entrance Torii Gate
    createToriiGate(0, 48, Math.PI); // Moon Gate Departure Torii

    // 8. Sakura (Cherry Blossom) Trees with Fluffy Pink Foliage
    const sakuraTrees: THREE.Group[] = [];
    const trunkMat = new THREE.MeshStandardMaterial({ color: "#452d21", roughness: 0.9 });
    const blossomMat = new THREE.MeshStandardMaterial({
      color: "#fbcfe8", // Gentle soft pink
      roughness: 0.7,
      emissive: "#f472b6",
      emissiveIntensity: 0.08,
    });
    const blossomAccentMat = new THREE.MeshStandardMaterial({
      color: "#f472b6", // Deep petal pink
      roughness: 0.65,
    });

    const treePositions = [
      { x: -22, z: -25, scale: 1.2 },
      { x: -14, z: -18, scale: 0.95 },
      { x: -26, z: -12, scale: 1.1 },
      { x: 22, z: -22, scale: 1.15 },
      { x: 18, z: 22, scale: 1.05 },
      { x: -20, z: 32, scale: 1.1 },
    ];

    treePositions.forEach((tp) => {
      const tree = new THREE.Group();
      // Twisted Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.4, 0.7, 5, 8);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 2.5;
      trunk.castShadow = true;
      tree.add(trunk);

      // 4-5 Soft Blossom Spheres
      const blossomOffsets = [
        { x: 0, y: 5.2, z: 0, r: 2.2, mat: blossomMat },
        { x: -1.3, y: 4.6, z: 0.8, r: 1.7, mat: blossomAccentMat },
        { x: 1.2, y: 4.8, z: -0.6, r: 1.8, mat: blossomMat },
        { x: 0.6, y: 5.8, z: 0.9, r: 1.5, mat: blossomAccentMat },
        { x: -0.8, y: 4.2, z: -1.1, r: 1.6, mat: blossomMat },
      ];

      blossomOffsets.forEach((b) => {
        const bGeo = new THREE.SphereGeometry(b.r, 9, 8);
        const bMesh = new THREE.Mesh(bGeo, b.mat);
        bMesh.position.set(b.x, b.y, b.z);
        bMesh.castShadow = true;
        bMesh.receiveShadow = true;
        tree.add(bMesh);
      });

      tree.position.set(tp.x, 0, tp.z);
      tree.scale.setScalar(tp.scale);
      scene.add(tree);
      sakuraTrees.push(tree);
    });

    // 9. Floating Sakura Petals Particle System (280 Petals gently swirling)
    const petalCount = 280;
    const petalGeo = new THREE.BufferGeometry();
    const petalPositions = new Float32Array(petalCount * 3);
    const petalRotations = new Float32Array(petalCount * 3);
    const petalSpeeds = new Float32Array(petalCount);

    for (let i = 0; i < petalCount; i++) {
      petalPositions[i * 3 + 0] = (Math.random() - 0.5) * 70;
      petalPositions[i * 3 + 1] = Math.random() * 14 + 0.5;
      petalPositions[i * 3 + 2] = (Math.random() - 0.5) * 95;

      petalRotations[i * 3 + 0] = Math.random() * Math.PI;
      petalRotations[i * 3 + 1] = Math.random() * Math.PI;
      petalRotations[i * 3 + 2] = Math.random() * Math.PI;

      petalSpeeds[i] = 0.02 + Math.random() * 0.035;
    }

    petalGeo.setAttribute("position", new THREE.BufferAttribute(petalPositions, 3));

    // Petal texture drawn procedurally on Canvas for zero download overhead
    const petalCanvas = document.createElement("canvas");
    petalCanvas.width = 64;
    petalCanvas.height = 64;
    const pCtx = petalCanvas.getContext("2d")!;
    pCtx.fillStyle = "#fbcfe8";
    pCtx.beginPath();
    pCtx.ellipse(32, 32, 24, 12, Math.PI / 4, 0, Math.PI * 2);
    pCtx.fill();

    const petalTexture = new THREE.CanvasTexture(petalCanvas);
    const petalMat = new THREE.PointsMaterial({
      color: "#fbcfe8",
      size: 0.55,
      map: petalTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const petalParticles = new THREE.Points(petalGeo, petalMat);
    scene.add(petalParticles);

    // 10. Bamboo Grove Clusters (Slender Green Segmented Stalks)
    const bambooMat = new THREE.MeshStandardMaterial({ color: "#22c55e", roughness: 0.5 });
    const bambooClusterCenter = { x: 22, z: -5 };

    for (let i = 0; i < 32; i++) {
      const bx = bambooClusterCenter.x + (Math.random() - 0.5) * 14;
      const bz = bambooClusterCenter.z + (Math.random() - 0.5) * 14;
      const height = 8 + Math.random() * 4;

      const stalkGeo = new THREE.CylinderGeometry(0.12, 0.16, height, 6);
      const stalk = new THREE.Mesh(stalkGeo, bambooMat);
      stalk.position.set(bx, height / 2, bz);
      stalk.rotation.z = (Math.random() - 0.5) * 0.08;
      stalk.castShadow = true;
      scene.add(stalk);
    }

    // 11. Stone Lanterns (Ishi-Dōrō) with Warm Flickering Ember Light
    const lanternPositions = [
      new THREE.Vector3(-15, 0, -20), // Sakura Shrine
      new THREE.Vector3(14, 0, -3),   // Bamboo Shrine
      new THREE.Vector3(-12, 0, 16),  // Lantern Bridge
      new THREE.Vector3(12, 0, 34),   // Koi Teahouse
      new THREE.Vector3(0, 0, 46),    // Moon Gate
    ];

    const lanternLights: THREE.PointLight[] = [];

    lanternPositions.forEach((pos) => {
      const lanternGroup = new THREE.Group();
      const stoneMat = new THREE.MeshStandardMaterial({ color: "#52525b", roughness: 0.8 });

      // Base pedestal
      const baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 0.4, 6), stoneMat);
      baseMesh.position.y = 0.2;
      baseMesh.castShadow = true;
      lanternGroup.add(baseMesh);

      // Post
      const postMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 1.4, 6), stoneMat);
      postMesh.position.y = 0.9;
      postMesh.castShadow = true;
      lanternGroup.add(postMesh);

      // Middle platform
      const midMesh = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.25, 1.1), stoneMat);
      midMesh.position.y = 1.65;
      lanternGroup.add(midMesh);

      // Light chamber (Firebox)
      const fireboxGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
      const fireboxMat = new THREE.MeshBasicMaterial({ color: "#fbbf24" }); // Glowing amber core
      const firebox = new THREE.Mesh(fireboxGeo, fireboxMat);
      firebox.position.y = 2.05;
      lanternGroup.add(firebox);

      // Roof (Kasa)
      const roofMesh = new THREE.Mesh(new THREE.ConeGeometry(1.2, 0.65, 4), stoneMat);
      roofMesh.position.y = 2.65;
      roofMesh.rotation.y = Math.PI / 4;
      roofMesh.castShadow = true;
      lanternGroup.add(roofMesh);

      // Warm amber point light
      const pLight = new THREE.PointLight("#f59e0b", 1.8, 12);
      pLight.position.set(0, 2.05, 0);
      lanternGroup.add(pLight);
      lanternLights.push(pLight);

      lanternGroup.position.copy(pos);
      scene.add(lanternGroup);
    });

    // 12. Peaceful Koi Pond with Arched Bridge & Water Lilies
    const pondGeo = new THREE.CylinderGeometry(14, 14, 0.8, 24);
    const waterMat = new THREE.MeshStandardMaterial({
      color: "#0284c7",
      roughness: 0.15,
      metalness: 0.35,
      transparent: true,
      opacity: 0.88,
    });
    const pond = new THREE.Mesh(pondGeo, waterMat);
    pond.position.set(-8, -0.3, 16);
    scene.add(pond);

    // Arched Bridge over pond
    const bridgeGroup = new THREE.Group();
    const bridgeWoodMat = new THREE.MeshStandardMaterial({ color: "#b91c1c", roughness: 0.4 }); // Vermillion arched bridge

    const archCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-1, 0.1, 0),
      new THREE.Vector3(5, 1.6, 0),
      new THREE.Vector3(11, 0.1, 0)
    );
    const bridgePlankGeo = new THREE.BoxGeometry(1.8, 0.15, 0.5);

    for (let p = 0; p <= 16; p++) {
      const pt = p / 16;
      const bPos = archCurve.getPoint(pt);
      const plank = new THREE.Mesh(bridgePlankGeo, bridgeWoodMat);
      plank.position.set(bPos.x, bPos.y, bPos.z);
      plank.castShadow = true;
      bridgeGroup.add(plank);
    }

    bridgeGroup.position.set(-14, 0, 16);
    bridgeGroup.rotation.y = Math.PI / 3.5;
    scene.add(bridgeGroup);

    // 13. Stylized Traveler Character Avatar (Minimalist Zen Pilgrim)
    const travelerGroup = new THREE.Group();

    // Body / Kimono Robe
    const robeGeo = new THREE.ConeGeometry(0.65, 1.8, 8);
    const robeMat = new THREE.MeshStandardMaterial({ color: "#334155", roughness: 0.7 }); // Navy charcoal
    const robe = new THREE.Mesh(robeGeo, robeMat);
    robe.position.y = 0.9;
    robe.castShadow = true;
    travelerGroup.add(robe);

    // Head
    const headGeo = new THREE.SphereGeometry(0.3, 10, 10);
    const headMat = new THREE.MeshStandardMaterial({ color: "#fed7aa", roughness: 0.6 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.95;
    travelerGroup.add(head);

    // Conical Straw Bamboo Hat (Kasa)
    const hatGeo = new THREE.ConeGeometry(0.95, 0.42, 10);
    const hatMat = new THREE.MeshStandardMaterial({ color: "#d97706", roughness: 0.8 }); // Straw amber
    const hat = new THREE.Mesh(hatGeo, hatMat);
    hat.position.y = 2.22;
    hat.castShadow = true;
    travelerGroup.add(hat);

    // Wooden Walking Staff
    const staffGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.4, 6);
    const staffMat = new THREE.MeshStandardMaterial({ color: "#78350f", roughness: 0.9 });
    const staff = new THREE.Mesh(staffGeo, staffMat);
    staff.position.set(0.65, 1.1, 0.25);
    staff.rotation.z = -0.12;
    staff.castShadow = true;
    travelerGroup.add(staff);

    scene.add(travelerGroup);

    // 14. Input Listeners (Drag, Scroll, Arrow Keys)
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaY = e.clientY - previousPointerY;
      const deltaX = e.clientX - previousPointerX;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;

      // Vertical drag moves forward/back along path
      const movement = (deltaY * 0.0018) + (deltaX * 0.0012);
      targetProgressRef.current = THREE.MathUtils.clamp(
        targetProgressRef.current + movement,
        0.02,
        0.99
      );
      zenAudio.playFootstep();
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      const delta = e.deltaY * 0.0006;
      targetProgressRef.current = THREE.MathUtils.clamp(
        targetProgressRef.current + delta,
        0.02,
        0.99
      );
      zenAudio.playFootstep();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "arrowup" || key === "w" || key === "d") {
        targetProgressRef.current = THREE.MathUtils.clamp(
          targetProgressRef.current + 0.035,
          0.02,
          0.99
        );
        zenAudio.playFootstep();
      } else if (key === "arrowdown" || key === "s" || key === "a") {
        targetProgressRef.current = THREE.MathUtils.clamp(
          targetProgressRef.current - 0.035,
          0.02,
          0.99
        );
        zenAudio.playFootstep();
      } else if (key === "m") {
        setIsMuted(zenAudio.toggleMute());
      } else if (key === "b") {
        zenAudio.playTempleBell();
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    // 15. Resize Listener
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 16. Animation & Game Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Auto Strolling progression
      if (isAutoStrollingRef.current) {
        targetProgressRef.current += 0.00045;
        if (targetProgressRef.current >= 0.99) {
          targetProgressRef.current = 0.02; // Loop smoothly
        }
      }

      // Smooth progress interpolation
      progressRef.current = THREE.MathUtils.lerp(
        progressRef.current,
        targetProgressRef.current,
        0.08
      );
      setStrollProgress(progressRef.current);

      // Character Position along Curve
      const currentPoint = pathCurve.current.getPoint(progressRef.current);
      const lookAheadPoint = pathCurve.current.getPoint(
        Math.min(progressRef.current + 0.02, 1)
      );

      travelerGroup.position.x = currentPoint.x;
      travelerGroup.position.z = currentPoint.z;

      // Subtle walking bobbing animation
      const isMoving = Math.abs(progressRef.current - targetProgressRef.current) > 0.001;
      const bobY = isMoving ? Math.sin(elapsedTime * 9) * 0.08 : 0;
      travelerGroup.position.y = currentPoint.y + bobY;

      // Character faces direction of travel
      if (lookAheadPoint) {
        travelerGroup.lookAt(lookAheadPoint.x, travelerGroup.position.y, lookAheadPoint.z);
      }

      // Gentle Camera Follow (Over-the-shoulder third-person serene framing)
      const tangent = pathCurve.current.getTangent(progressRef.current);
      const cameraOffset = tangent.clone().multiplyScalar(-9).add(new THREE.Vector3(0, 5.2, 0));
      const targetCamPos = currentPoint.clone().add(cameraOffset);

      camera.position.lerp(targetCamPos, 0.06);
      camera.lookAt(currentPoint.x, currentPoint.y + 1.6, currentPoint.z);

      // Animate Sakura Petals Drifting in Wind
      const petalPositions = petalGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < petalCount; i++) {
        // Fall down slowly
        petalPositions[i * 3 + 1] -= petalSpeeds[i];
        // Drift in wind (X and Z wave)
        petalPositions[i * 3 + 0] += Math.sin(elapsedTime + i) * 0.015 + 0.01;
        petalPositions[i * 3 + 2] += Math.cos(elapsedTime + i * 0.5) * 0.01;

        // Wrap around when hitting ground
        if (petalPositions[i * 3 + 1] < 0.2) {
          petalPositions[i * 3 + 1] = 14;
          petalPositions[i * 3 + 0] = currentPoint.x + (Math.random() - 0.5) * 45;
          petalPositions[i * 3 + 2] = currentPoint.z + (Math.random() - 0.5) * 45;
        }
      }
      petalGeo.attributes.position.needsUpdate = true;

      // Lantern Light subtle warm flicker
      lanternLights.forEach((light, idx) => {
        light.intensity = 1.6 + Math.sin(elapsedTime * 3.5 + idx) * 0.35;
      });

      // Station Proximity Check
      let closestStation: ZenStation | null = null;
      let closestIdx = 0;
      let minDist = Infinity;

      zenStations.forEach((st, idx) => {
        const dist = Math.abs(progressRef.current - st.pathProgress);
        if (dist < 0.075 && dist < minDist) {
          minDist = dist;
          closestStation = st;
          closestIdx = idx;
        }
      });

      if (closestStation !== activeStationRef.current) {
        activeStationRef.current = closestStation;
        setActiveStation(closestStation);
        setCurrentStationIndex(closestIdx);
        if (closestStation) {
          zenAudio.playWindChime();
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", handleResize);

      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
      renderer.dispose();
      zenAudio.stopAmbience();
    };
  }, []);

  // ── Helper Handlers ────────────────────────────────────────────────────────
  const handleToggleMute = () => {
    const muted = zenAudio.toggleMute();
    setIsMuted(muted);
    triggerNotification(muted ? "Audio Muted" : "Playing Zen Soundscape (Koto & Chimes)");
  };

  const handleToggleAutoStroll = () => {
    const next = !isAutoStrolling;
    setIsAutoStrolling(next);
    isAutoStrollingRef.current = next;
    triggerNotification(next ? "Meditation Auto-Stroll Engaged" : "Manual Stroll Active");
  };

  const handleWalkToStation = (station: ZenStation) => {
    targetProgressRef.current = station.pathProgress;
    triggerNotification(`Strolling toward ${station.title}...`);
    zenAudio.playFootstep();
  };

  const handlePlayBell = () => {
    zenAudio.playTempleBell();
    triggerNotification("Temple Bell Sounded 🔔");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-[#161522] text-white">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* ── Top Floating Minimalist Zen Header ────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 py-5 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 hover:bg-black/70 border border-white/15 text-xs font-mono tracking-wider backdrop-blur-xl transition-all shadow-lg hover:scale-105"
          >
            <Home className="w-3.5 h-3.5 text-amber-300" />
            <span>Portfolio Home</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 text-[11px] font-mono text-neutral-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            <span>Sakura Season · Zen Garden</span>
          </div>
        </div>

        {/* Audio & Bell Controls */}
        <div className="flex items-center gap-2.5">
          {/* Temple Bell */}
          <button
            onClick={handlePlayBell}
            title="Sound Temple Bell (B)"
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 border border-white/15 text-amber-300 hover:text-amber-200 backdrop-blur-xl transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Auto Stroll / Meditate */}
          <button
            onClick={handleToggleAutoStroll}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono backdrop-blur-xl border transition-all shadow-lg hover:scale-105 active:scale-95 ${
              isAutoStrolling
                ? "bg-amber-500/20 border-amber-400/50 text-amber-300"
                : "bg-black/50 border-white/15 text-neutral-300 hover:text-white"
            }`}
          >
            {isAutoStrolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isAutoStrolling ? "Pause Tour" : "Auto Meditate"}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleMute}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono backdrop-blur-xl border transition-all shadow-lg hover:scale-105 active:scale-95 ${
              !isMuted
                ? "bg-pink-500/20 border-pink-400/50 text-pink-300 shadow-[0_0_20px_rgba(244,114,182,0.25)]"
                : "bg-black/50 border-white/15 text-neutral-400 hover:text-white"
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4 text-pink-400" /> : <VolumeX className="w-4 h-4" />}
            <span>{!isMuted ? "Music On" : "Music Off"}</span>
          </button>
        </div>
      </header>

      {/* ── Zen Notification Toast ───────────────────────────────────────────── */}
      {zenNotification && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 px-5 py-2 rounded-full bg-black/60 border border-white/15 text-xs font-mono text-neutral-200 backdrop-blur-xl shadow-2xl transition-all pointer-events-none flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>{zenNotification}</span>
        </div>
      )}

      {/* ── Floating Station Discovery Scroll Modal (When Near A Station) ─────── */}
      {activeStation && (
        <div className="absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl pointer-events-auto">
          <div
            className="rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            style={{
              background: "linear-gradient(135deg, rgba(26,22,38,0.92) 0%, rgba(18,16,28,0.96) 100%)",
            }}
          >
            {/* Japanese Brushstroke Kanji Watermark */}
            <div className="absolute right-4 top-2 text-8xl font-serif text-white/5 pointer-events-none select-none">
              {activeStation.kanji}
            </div>

            {/* Header Badge */}
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-pink-500/10 border border-pink-500/30 text-pink-300">
                <span>{activeStation.kanji}</span>
                <span>{activeStation.subtitle}</span>
              </div>

              <button
                onClick={() => setActiveStation(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Station Title */}
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-3 relative z-10">
              {activeStation.title}
            </h2>

            {/* Poetic Haiku Card */}
            <div className="mb-4 p-3.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-pink-200/90 leading-relaxed italic relative z-10">
              {activeStation.haiku.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>

            {/* Project Description */}
            <p className="text-sm text-neutral-300 leading-relaxed mb-4 relative z-10 font-light">
              {activeStation.description}
            </p>

            {/* Witty Zen Reflection */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-200 mb-5 relative z-10">
              <span className="font-semibold text-amber-300">💡 Zen Observation:</span> {activeStation.humor}
            </div>

            {/* Tech Arsenal Tags */}
            <div className="flex flex-wrap gap-2 relative z-10">
              {activeStation.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom Garden Trail Waypoint Navigator ────────────────────────────── */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-auto">
        {/* Stone Path Progress Bar */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {zenStations.map((st, idx) => {
              const isCurrent = idx === currentStationIndex;
              return (
                <button
                  key={st.id}
                  onClick={() => handleWalkToStation(st)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                    isCurrent
                      ? "bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105"
                      : "bg-black/40 hover:bg-black/60 border border-white/10 text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="text-[10px]">{st.kanji}</span>
                  <span className="hidden md:inline">{st.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interaction Hint */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-neutral-400">
          <span>Drag or Scroll to Stroll</span>
          <span>·</span>
          <span>Press [M] to toggle Music</span>
          <span>·</span>
          <span>Press [B] for Temple Bell</span>
        </div>
      </footer>
    </div>
  );
}
