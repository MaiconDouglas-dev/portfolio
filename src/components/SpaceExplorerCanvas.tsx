'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { soundManager } from '@/utils/audio';

export default function SpaceExplorerCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 360;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 7.8);

    // 2. High-Quality WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. Cinematic Studio Lighting (Lusion Space Aesthetic)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Key Light (Warm Ruby/Rose)
    const keyLight = new THREE.DirectionalLight(0xff2d55, 2.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Fill Light (Electric Cyan)
    const fillLight = new THREE.DirectionalLight(0x00f0ff, 2.4);
    fillLight.position.set(-5, 2, 4);
    scene.add(fillLight);

    // Rim Light (Top-Back Diamond White for edge glow)
    const rimLight = new THREE.DirectionalLight(0xffffff, 3.5);
    rimLight.position.set(0, 6, -4);
    scene.add(rimLight);

    // 4. Procedural 3D Space Explorer (Astronaut)
    const astronautGroup = new THREE.Group();
    scene.add(astronautGroup);

    // Materials
    const suitMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5fa,
      roughness: 0.35,
      metalness: 0.15,
    });

    const suitJointMaterial = new THREE.MeshStandardMaterial({
      color: 0x222228,
      roughness: 0.6,
      metalness: 0.2,
    });

    const backpackMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8d8e5,
      roughness: 0.4,
      metalness: 0.25,
    });

    // Helmet Base
    const helmetGeo = new THREE.SphereGeometry(1.05, 32, 28);
    helmetGeo.scale(1.0, 1.08, 1.05);
    const helmetMesh = new THREE.Mesh(helmetGeo, suitMaterial);
    helmetMesh.position.y = 1.25;
    astronautGroup.add(helmetMesh);

    // Visor Material (Glossy Jet-Black with high reflection)
    const visorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x05050a,
      roughness: 0.08,
      metalness: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });

    const visorGeo = new THREE.SphereGeometry(0.86, 32, 24);
    visorGeo.scale(1.02, 0.72, 0.88);
    const visorMesh = new THREE.Mesh(visorGeo, visorMaterial);
    visorMesh.position.set(0, 1.28, 0.36);
    astronautGroup.add(visorMesh);

    // Visor LED Matrix Face (Cyan glowing digital eyes / smile from Lusion video)
    const ledCanvas = document.createElement('canvas');
    ledCanvas.width = 256;
    ledCanvas.height = 256;
    const ledCtx = ledCanvas.getContext('2d')!;

    const renderLedFace = (t: number) => {
      ledCtx.clearRect(0, 0, 256, 256);

      // Cyan neon glow
      ledCtx.fillStyle = '#00f0ff';
      ledCtx.shadowColor = '#00f0ff';
      ledCtx.shadowBlur = 14;

      const blink = Math.sin(t * 1.8) > 0.96;

      if (!blink) {
        // Digital eye dots
        // Left Eye (3x3 dot matrix style)
        ledCtx.fillRect(72, 100, 12, 12);
        ledCtx.fillRect(88, 100, 12, 12);
        ledCtx.fillRect(72, 116, 12, 12);
        ledCtx.fillRect(88, 116, 12, 12);

        // Right Eye
        ledCtx.fillRect(156, 100, 12, 12);
        ledCtx.fillRect(172, 100, 12, 12);
        ledCtx.fillRect(156, 116, 12, 12);
        ledCtx.fillRect(172, 116, 12, 12);

        // Digital Smile Curve
        ledCtx.fillRect(84, 156, 12, 10);
        ledCtx.fillRect(100, 164, 14, 10);
        ledCtx.fillRect(118, 168, 20, 10);
        ledCtx.fillRect(142, 164, 14, 10);
        ledCtx.fillRect(160, 156, 12, 10);
      } else {
        // Blinking line
        ledCtx.fillRect(72, 112, 28, 6);
        ledCtx.fillRect(156, 112, 28, 6);
      }
    };

    renderLedFace(0);
    const ledTexture = new THREE.CanvasTexture(ledCanvas);
    const ledMaterial = new THREE.MeshBasicMaterial({
      map: ledTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.9,
    });

    const ledScreenGeo = new THREE.PlaneGeometry(0.9, 0.7);
    const ledScreenMesh = new THREE.Mesh(ledScreenGeo, ledMaterial);
    ledScreenMesh.position.set(0, 1.28, 1.05);
    astronautGroup.add(ledScreenMesh);

    // Torso / Suit Core
    const torsoGeo = new THREE.CylinderGeometry(0.85, 0.78, 1.6, 24);
    const torsoMesh = new THREE.Mesh(torsoGeo, suitMaterial);
    torsoMesh.position.y = -0.15;
    astronautGroup.add(torsoMesh);

    // Chest Life-Support Pack & Control Module
    const chestPackGeo = new THREE.BoxGeometry(0.8, 0.6, 0.32);
    const chestPackMesh = new THREE.Mesh(chestPackGeo, suitJointMaterial);
    chestPackMesh.position.set(0, 0.05, 0.82);
    astronautGroup.add(chestPackMesh);

    // Chest Status Indicator LED (Pulsing Apple Green & Cyan)
    const ledGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x30d158 });
    const ledBulb = new THREE.Mesh(ledGeo, ledMat);
    ledBulb.position.set(-0.2, 0.12, 0.98);
    astronautGroup.add(ledBulb);

    const ledBulb2 = new THREE.Mesh(
      ledGeo,
      new THREE.MeshBasicMaterial({ color: 0x0a84ff })
    );
    ledBulb2.position.set(0.2, 0.12, 0.98);
    astronautGroup.add(ledBulb2);

    // Backpack (Oxygen / Thruster Unit)
    const backpackGeo = new THREE.BoxGeometry(1.3, 1.6, 0.65);
    const backpackMesh = new THREE.Mesh(backpackGeo, backpackMaterial);
    backpackMesh.position.set(0, 0.05, -0.85);
    astronautGroup.add(backpackMesh);

    // Thruster Nozzles (bottom of backpack)
    const thrusterGeo = new THREE.CylinderGeometry(0.18, 0.26, 0.4, 16);
    const thrusterMat = new THREE.MeshStandardMaterial({ color: 0x18181f, metalness: 0.8 });
    const thrusterL = new THREE.Mesh(thrusterGeo, thrusterMat);
    thrusterL.position.set(-0.35, -0.85, -0.85);
    astronautGroup.add(thrusterL);

    const thrusterR = new THREE.Mesh(thrusterGeo, thrusterMat);
    thrusterR.position.set(0.35, -0.85, -0.85);
    astronautGroup.add(thrusterR);

    // Arm Groups (for articulated floating and waving)
    // Right Waving Arm (Friendly Wave to Recruiters)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.95, 0.45, 0);

    const shoulderGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const shoulderR = new THREE.Mesh(shoulderGeo, suitMaterial);
    rightArmGroup.add(shoulderR);

    const upperArmGeo = new THREE.CylinderGeometry(0.25, 0.22, 0.75, 16);
    const upperArmR = new THREE.Mesh(upperArmGeo, suitMaterial);
    upperArmR.position.set(0.22, 0.4, 0.15);
    upperArmR.rotation.z = -0.55;
    upperArmR.rotation.x = 0.35;
    rightArmGroup.add(upperArmR);

    const forearmRGroup = new THREE.Group();
    forearmRGroup.position.set(0.5, 0.75, 0.25);

    const forearmGeo = new THREE.CylinderGeometry(0.22, 0.2, 0.65, 16);
    const forearmR = new THREE.Mesh(forearmGeo, suitMaterial);
    forearmR.position.set(0.05, 0.3, 0);
    forearmRGroup.add(forearmR);

    // Glove Hand
    const gloveGeo = new THREE.SphereGeometry(0.26, 16, 16);
    gloveGeo.scale(1.2, 0.9, 0.8);
    const gloveR = new THREE.Mesh(gloveGeo, suitJointMaterial);
    gloveR.position.set(0.05, 0.68, 0);
    forearmRGroup.add(gloveR);

    rightArmGroup.add(forearmRGroup);
    astronautGroup.add(rightArmGroup);

    // Left Arm (Relaxed Zero-G Float)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.95, 0.45, 0);

    const shoulderL = new THREE.Mesh(shoulderGeo, suitMaterial);
    leftArmGroup.add(shoulderL);

    const upperArmL = new THREE.Mesh(upperArmGeo, suitMaterial);
    upperArmL.position.set(-0.25, -0.4, 0.1);
    upperArmL.rotation.z = 0.4;
    leftArmGroup.add(upperArmL);

    const gloveL = new THREE.Mesh(gloveGeo, suitJointMaterial);
    gloveL.position.set(-0.45, -0.85, 0.15);
    leftArmGroup.add(gloveL);
    astronautGroup.add(leftArmGroup);

    // Legs (Floating Zero-G)
    const legGeo = new THREE.CylinderGeometry(0.3, 0.26, 1.2, 16);
    const legL = new THREE.Mesh(legGeo, suitMaterial);
    legL.position.set(-0.45, -1.5, -0.1);
    legL.rotation.x = 0.2;
    legL.rotation.z = 0.15;
    astronautGroup.add(legL);

    const legR = new THREE.Mesh(legGeo, suitMaterial);
    legR.position.set(0.45, -1.45, -0.15);
    legR.rotation.x = 0.35;
    legR.rotation.z = -0.12;
    astronautGroup.add(legR);

    // Boots
    const bootGeo = new THREE.BoxGeometry(0.42, 0.35, 0.7);
    const bootL = new THREE.Mesh(bootGeo, suitJointMaterial);
    bootL.position.set(-0.55, -2.15, 0.1);
    astronautGroup.add(bootL);

    const bootR = new THREE.Mesh(bootGeo, suitJointMaterial);
    bootR.position.set(0.55, -2.1, 0.18);
    astronautGroup.add(bootR);

    // 5. Floating Diamond Crystals (From 48s-52s in the Lusion Video)
    const diamondGroup = new THREE.Group();
    scene.add(diamondGroup);

    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.65,
      opacity: 0.92,
      transparent: true,
      roughness: 0.08,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95,
      ior: 2.4, // Real diamond index of refraction
    });

    const diamondCount = 14;
    const diamonds: { mesh: THREE.Mesh; rotSpeed: THREE.Vector3; floatSpeed: number; floatPhase: number }[] = [];

    for (let d = 0; d < diamondCount; d++) {
      const size = 0.14 + Math.random() * 0.22;
      const diamondGeo = new THREE.OctahedronGeometry(size, 0);
      const diamondMesh = new THREE.Mesh(diamondGeo, diamondMaterial);

      const angle = (d / diamondCount) * Math.PI * 2;
      const radius = 2.4 + Math.random() * 1.5;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 3.2;
      const z = Math.sin(angle) * (radius * 0.8) - 0.5;

      diamondMesh.position.set(x, y, z);
      diamondGroup.add(diamondMesh);

      diamonds.push({
        mesh: diamondMesh,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 1.8,
          (Math.random() - 0.5) * 2.2,
          (Math.random() - 0.5) * 1.5
        ),
        floatSpeed: 0.8 + Math.random() * 1.2,
        floatPhase: Math.random() * Math.PI * 2,
      });
    }

    // 6. Interaction & Mouse Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;
    };

    const handleClick = () => {
      soundManager.playSuccess();
      // Wave celebration boost
      forearmRGroup.rotation.z = 0.8;
      setTimeout(() => {
        forearmRGroup.rotation.z = 0;
      }, 350);
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('click', handleClick);

    // 7. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Zero-G Gentle Astronaut Floating Float
      const floatY = Math.sin(time * 1.2) * 0.18;
      const floatX = Math.cos(time * 0.8) * 0.08;
      astronautGroup.position.set(floatX, floatY - 0.1, 0);

      // Body tilting toward mouse cursor
      astronautGroup.rotation.y = mouse.x * 0.45;
      astronautGroup.rotation.x = -mouse.y * 0.25;
      astronautGroup.rotation.z = -mouse.x * 0.12 + Math.sin(time * 0.9) * 0.04;

      // Friendly Waving Hand Animation
      const waveAngle = Math.sin(time * 4.2) * 0.45;
      forearmRGroup.rotation.z = -0.3 + waveAngle;
      forearmRGroup.rotation.x = 0.2 + Math.cos(time * 3.5) * 0.15;

      // Left Arm Float
      leftArmGroup.rotation.z = Math.sin(time * 1.4) * 0.1;
      leftArmGroup.rotation.x = Math.cos(time * 1.2) * 0.12;

      // Legs Subtle Zero-G Drift
      legL.rotation.x = 0.2 + Math.sin(time * 1.1) * 0.08;
      legR.rotation.x = 0.35 + Math.cos(time * 1.3) * 0.08;

      // Animate Visor LED Face Blinking & Smile
      renderLedFace(time);
      ledTexture.needsUpdate = true;

      // Rotate and float the diamonds
      diamonds.forEach((d) => {
        d.mesh.rotation.x += d.rotSpeed.x * 0.012;
        d.mesh.rotation.y += d.rotSpeed.y * 0.014;
        d.mesh.rotation.z += d.rotSpeed.z * 0.01;
        d.mesh.position.y += Math.sin(time * d.floatSpeed + d.floatPhase) * 0.003;
      });

      // Slowly revolve diamond field around the astronaut
      diamondGroup.rotation.y = time * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 380;
      const h = container.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      helmetGeo.dispose();
      visorGeo.dispose();
      torsoGeo.dispose();
      chestPackGeo.dispose();
      backpackGeo.dispose();
      thrusterGeo.dispose();
      shoulderGeo.dispose();
      upperArmGeo.dispose();
      forearmGeo.dispose();
      gloveGeo.dispose();
      legGeo.dispose();
      bootGeo.dispose();
      ledScreenGeo.dispose();
      ledTexture.dispose();

      suitMaterial.dispose();
      visorMaterial.dispose();
      suitJointMaterial.dispose();
      backpackMaterial.dispose();
      thrusterMat.dispose();
      diamondMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-80 sm:h-96 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      title="Astronauta Interativo 3D — Mova o mouse ou clique para interagir!"
    />
  );
}
