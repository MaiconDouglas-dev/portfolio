'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LusionBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene & Depth Atmosphere
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0013);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      2500
    );
    camera.position.set(0, 270, 560);
    camera.lookAt(0, -35, -180);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    // 3. Dynamic Accent Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const crimsonLight = new THREE.PointLight(0xff2d55, 4.0, 1000);
    crimsonLight.position.set(300, 140, 120);
    scene.add(crimsonLight);

    const cyanLight = new THREE.PointLight(0x0a84ff, 3.5, 1000);
    cyanLight.position.set(-300, 120, -120);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 2.8, 900);
    violetLight.position.set(0, 220, -320);
    scene.add(violetLight);

    // 4. Cybernetic Topographic Mesh / Flow Fabric
    const lineCount = 50; // Horizontal contour curves
    const pointsPerLine = 88; // Points resolution for silky smooth curves
    const width = 1800;
    const depth = 1600;
    const baseY = -115;

    const linesGroup = new THREE.Group();
    scene.add(linesGroup);

    interface WaveLine {
      geometry: THREE.BufferGeometry;
      positions: Float32Array;
      colors: Float32Array;
      lineIndex: number;
      baseZ: number;
    }

    const waveLines: WaveLine[] = [];

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      linewidth: 1,
    });

    for (let i = 0; i < lineCount; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(pointsPerLine * 3);
      const colors = new Float32Array(pointsPerLine * 3);

      const normalizedZ = i / (lineCount - 1);
      const baseZ = (normalizedZ - 0.5) * depth - 100;

      for (let j = 0; j < pointsPerLine; j++) {
        const normalizedX = j / (pointsPerLine - 1);
        const x = (normalizedX - 0.5) * width;

        positions[j * 3] = x;
        positions[j * 3 + 1] = baseY;
        positions[j * 3 + 2] = baseZ;

        colors[j * 3] = 0.08;
        colors[j * 3 + 1] = 0.05;
        colors[j * 3 + 2] = 0.18;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));

      const line = new THREE.Line(geometry, lineMaterial);
      linesGroup.add(line);

      waveLines.push({
        geometry,
        positions,
        colors,
        lineIndex: i,
        baseZ,
      });
    }

    // 5. Longitudinal Perspective Ribs (Transversal Lattice)
    const ribCount = 20;
    const ribPoints = 50;
    const ribLines: { geometry: THREE.BufferGeometry; positions: Float32Array; colors: Float32Array; ribIndex: number; baseX: number }[] = [];

    const ribMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      linewidth: 1,
    });

    for (let r = 0; r < ribCount; r++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(ribPoints * 3);
      const colors = new Float32Array(ribPoints * 3);

      const normalizedX = r / (ribCount - 1);
      const baseX = (normalizedX - 0.5) * width;

      for (let k = 0; k < ribPoints; k++) {
        const normalizedZ = k / (ribPoints - 1);
        const z = (normalizedZ - 0.5) * depth - 100;

        positions[k * 3] = baseX;
        positions[k * 3 + 1] = baseY;
        positions[k * 3 + 2] = z;

        colors[k * 3] = 0.05;
        colors[k * 3 + 1] = 0.08;
        colors[k * 3 + 2] = 0.18;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));

      const rib = new THREE.Line(geometry, ribMaterial);
      linesGroup.add(rib);

      ribLines.push({ geometry, positions, colors, ribIndex: r, baseX });
    }

    // 6. Traveling Data Laser Pulses (Packets)
    interface DataPulse {
      lineIdx: number;
      progress: number;
      speed: number;
      length: number;
      color: { r: number; g: number; b: number };
    }

    const pulses: DataPulse[] = [
      { lineIdx: 6, progress: 0.1, speed: 0.32, length: 0.15, color: { r: 1.0, g: 0.18, b: 0.35 } },
      { lineIdx: 12, progress: 0.45, speed: 0.38, length: 0.14, color: { r: 0.04, g: 0.55, b: 1.0 } },
      { lineIdx: 20, progress: 0.75, speed: 0.28, length: 0.18, color: { r: 0.65, g: 0.38, b: 1.0 } },
      { lineIdx: 28, progress: 0.2, speed: 0.35, length: 0.15, color: { r: 0.19, g: 0.85, b: 0.4 } },
      { lineIdx: 36, progress: 0.88, speed: 0.32, length: 0.13, color: { r: 1.0, g: 0.18, b: 0.35 } },
      { lineIdx: 44, progress: 0.3, speed: 0.42, length: 0.16, color: { r: 0.04, g: 0.55, b: 1.0 } },
      { lineIdx: 16, progress: 0.6, speed: 0.34, length: 0.16, color: { r: 1.0, g: 0.62, b: 0.04 } }, // Gold pulse
    ];

    // 7. Fluid Mouse Tracking & Kinetic Wake
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      prevX: 0,
      prevY: 0,
      speed: 0,
    };

    const mouseWorld = new THREE.Vector3(0, baseY, 0);
    const mouseWorldTarget = new THREE.Vector3(0, baseY, 0);
    const trailWorld = new THREE.Vector3(0, baseY, 0);

    const raycaster = new THREE.Raycaster();
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -baseY);

    let scrollTargetY = 0;
    let scrollY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Project into 3D space
      raycaster.setFromCamera(new THREE.Vector2(mouse.targetX, mouse.targetY), camera);
      const hit = new THREE.Vector3();
      const intersect = raycaster.ray.intersectPlane(groundPlane, hit);
      if (intersect) {
        mouseWorldTarget.copy(hit);
      }
    };

    const onScroll = () => {
      scrollTargetY = window.scrollY;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // 8. Kinetic Fluid Elevation Calculator
    // Combines organic harmonics, directional mouse swell, and trailing wake
    const calculateElevation = (
      x: number,
      z: number,
      time: number,
      kineticBoost: number
    ): { y: number; mouseInfluence: number } => {
      // Layered mathematical ocean frequencies
      const wave1 = Math.sin(x * 0.0032 + time * 1.25) * 34;
      const wave2 = Math.cos(z * 0.0042 + time * 0.95) * 30;
      const wave3 = Math.sin((x * 0.0022 + z * 0.0032) + time * 1.5) * 20;
      const ripple = Math.cos((x - z) * 0.0035 - time * 0.8) * 14;

      let y = baseY + wave1 + wave2 + wave3 + ripple;

      // Primary cursor ripple
      const dx1 = x - mouseWorld.x;
      const dz1 = z - mouseWorld.z;
      const distSq1 = dx1 * dx1 + dz1 * dz1;
      const influenceRadius = 280 + kineticBoost * 80;
      const radiusSq1 = influenceRadius * influenceRadius;

      let totalInfluence = 0;

      if (distSq1 < radiusSq1) {
        const factor1 = 1 - distSq1 / radiusSq1;
        const smooth1 = factor1 * factor1 * (3 - 2 * factor1);
        const dist1 = Math.sqrt(distSq1);
        // Concentric outward wave dispersion
        const ripple1 = Math.sin(dist1 * 0.055 - time * 7.5) * (18 + kineticBoost * 12);
        const swell1 = smooth1 * (60 + kineticBoost * 25) + ripple1 * smooth1;
        y += swell1;
        totalInfluence += smooth1;
      }

      // Secondary trailing wake (creates a liquid trailing tail behind cursor motion)
      const dx2 = x - trailWorld.x;
      const dz2 = z - trailWorld.z;
      const distSq2 = dx2 * dx2 + dz2 * dz2;
      const radiusSq2 = 220 * 220;

      if (distSq2 < radiusSq2) {
        const factor2 = 1 - distSq2 / radiusSq2;
        const smooth2 = factor2 * factor2 * (3 - 2 * factor2);
        const trailingSwell = smooth2 * 25;
        y += trailingSwell;
        totalInfluence += smooth2 * 0.5;
      }

      return { y, mouseInfluence: THREE.MathUtils.clamp(totalInfluence, 0, 1) };
    };

    // 9. Main High-FPS Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Fluid interpolation with higher responsiveness
      const mouseDeltaX = mouse.targetX - mouse.x;
      const mouseDeltaY = mouse.targetY - mouse.y;
      mouse.speed = Math.sqrt(mouseDeltaX * mouseDeltaX + mouseDeltaY * mouseDeltaY);

      mouse.x += mouseDeltaX * 0.08;
      mouse.y += mouseDeltaY * 0.08;

      // Primary world target interpolation
      mouseWorld.lerp(mouseWorldTarget, 0.11);
      // Trailing wake point lags behind for liquid sensation
      trailWorld.lerp(mouseWorld, 0.045);

      scrollY += (scrollTargetY - scrollY) * 0.06;

      const kineticBoost = THREE.MathUtils.clamp(mouse.speed * 8, 0, 1.2);

      // Camera gyro micro-tilt & depth travel
      camera.position.x = mouse.x * 85;
      camera.position.y = 270 - scrollY * 0.12 + mouse.y * 42;
      camera.position.z = 560 + scrollY * 0.05;
      camera.rotation.z = -mouse.x * 0.028;
      camera.rotation.x = -0.36 + mouse.y * 0.035;
      camera.lookAt(mouse.x * 25, -35 - scrollY * 0.08, -180);

      // Light rotation & pulsation
      crimsonLight.position.x = Math.sin(time * 0.7) * 380;
      crimsonLight.position.z = Math.cos(time * 0.6) * 320;
      cyanLight.position.x = -Math.cos(time * 0.8) * 380;
      cyanLight.position.z = -Math.sin(time * 0.7) * 320;

      // Update Data Pulses
      pulses.forEach((p) => {
        p.progress += p.speed * delta;
        if (p.progress > 1.25) p.progress = -0.25;
      });

      // Update Horizontal Wave Lines
      waveLines.forEach((wl) => {
        const { positions, colors, geometry, baseZ, lineIndex } = wl;
        const activePulse = pulses.find((p) => p.lineIdx === lineIndex);

        for (let j = 0; j < pointsPerLine; j++) {
          const idx3 = j * 3;
          const x = positions[idx3];
          const z = baseZ;

          const { y, mouseInfluence } = calculateElevation(x, z, time, kineticBoost);
          positions[idx3 + 1] = y;

          const normalizedHeight = THREE.MathUtils.clamp((y - (baseY - 40)) / 150, 0, 1);
          const normalizedZDepth = THREE.MathUtils.clamp((z + 850) / depth, 0, 1);

          // Deep base palette
          let r = 0.06 + normalizedHeight * 0.75 + mouseInfluence * 0.55;
          let g = 0.04 + normalizedHeight * 0.18 + (1 - normalizedHeight) * normalizedZDepth * 0.38;
          let b = 0.18 + (1 - normalizedHeight) * 0.6 + normalizedHeight * 0.3;

          // Mouse excitation: turns lines radiant crimson/neon ruby with white-hot apex
          if (mouseInfluence > 0.01) {
            r = THREE.MathUtils.lerp(r, 1.0, mouseInfluence);
            g = THREE.MathUtils.lerp(g, 0.28, mouseInfluence);
            b = THREE.MathUtils.lerp(b, 0.48, mouseInfluence);
          }

          // Traveling Data Photon Boost
          if (activePulse) {
            const normalizedXPos = j / (pointsPerLine - 1);
            const distToPulse = Math.abs(normalizedXPos - activePulse.progress);
            if (distToPulse < activePulse.length) {
              const intensity = (1 - distToPulse / activePulse.length) * 1.8;
              r = THREE.MathUtils.clamp(r + activePulse.color.r * intensity, 0, 1);
              g = THREE.MathUtils.clamp(g + activePulse.color.g * intensity, 0, 1);
              b = THREE.MathUtils.clamp(b + activePulse.color.b * intensity, 0, 1);
            }
          }

          colors[idx3] = r;
          colors[idx3 + 1] = g;
          colors[idx3 + 2] = b;
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
      });

      // Update Transversal Ribs
      ribLines.forEach((rl) => {
        const { positions, colors, geometry, baseX } = rl;

        for (let k = 0; k < ribPoints; k++) {
          const idx3 = k * 3;
          const z = positions[idx3 + 2];
          const x = baseX;

          const { y, mouseInfluence } = calculateElevation(x, z, time, kineticBoost);
          positions[idx3 + 1] = y;

          const depthFade = THREE.MathUtils.clamp((z + 750) / depth, 0.1, 0.75);
          colors[idx3] = 0.08 + mouseInfluence * 0.45;
          colors[idx3 + 1] = (0.12 + mouseInfluence * 0.25) * depthFade;
          colors[idx3 + 2] = (0.3 + mouseInfluence * 0.45) * depthFade;
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      waveLines.forEach((wl) => wl.geometry.dispose());
      ribLines.forEach((rl) => rl.geometry.dispose());
      lineMaterial.dispose();
      ribMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
