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

    // 6. Floating Cyber Stardust / Micro-Data Sparks (Lusion-style ambient depth)
    const sparkCount = 140;
    const sparkGeometry = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkColors = new Float32Array(sparkCount * 3);
    const sparkOriginals: { x: number; y: number; z: number; speed: number; phase: number }[] = [];

    const sparkPalette = [
      new THREE.Color(0xff2d55), // Apple Ruby
      new THREE.Color(0x0a84ff), // Cyan
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0xffffff), // White spark
    ];

    for (let s = 0; s < sparkCount; s++) {
      const sx = (Math.random() - 0.5) * 1600;
      const sy = baseY + Math.random() * 320;
      const sz = (Math.random() - 0.5) * 1400 - 100;

      sparkPositions[s * 3] = sx;
      sparkPositions[s * 3 + 1] = sy;
      sparkPositions[s * 3 + 2] = sz;

      const col = sparkPalette[Math.floor(Math.random() * sparkPalette.length)];
      sparkColors[s * 3] = col.r;
      sparkColors[s * 3 + 1] = col.g;
      sparkColors[s * 3 + 2] = col.b;

      sparkOriginals.push({
        x: sx,
        y: sy,
        z: sz,
        speed: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      });
    }

    sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    sparkGeometry.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3));

    const sparkMaterial = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const sparkPoints = new THREE.Points(sparkGeometry, sparkMaterial);
    scene.add(sparkPoints);

    // 7. Traveling Data Laser Pulses (Packets)
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

    // 8. Fluid Mouse & Touch Tracking & Kinetic Wake
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

    const projectPointerTo3D = (clientX: number, clientY: number) => {
      mouse.targetX = (clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(mouse.targetX, mouse.targetY), camera);
      const hit = new THREE.Vector3();
      const intersect = raycaster.ray.intersectPlane(groundPlane, hit);
      if (intersect) {
        mouseWorldTarget.copy(hit);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      projectPointerTo3D(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        projectPointerTo3D(event.touches[0].clientX, event.touches[0].clientY);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        projectPointerTo3D(event.touches[0].clientX, event.touches[0].clientY);
      }
    };

    const onDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma !== null && event.beta !== null) {
        const tiltX = THREE.MathUtils.clamp(event.gamma / 28, -1, 1);
        const tiltY = THREE.MathUtils.clamp((event.beta - 40) / 28, -1, 1);
        mouse.targetX = tiltX * 0.65;
        mouse.targetY = -tiltY * 0.65;
      }
    };

    const onScroll = () => {
      scrollTargetY = window.scrollY;
    };

    const updateViewportConfig = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;

      camera.aspect = width / height;
      camera.fov = isMobile ? 68 : 55;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.75 : 2));
    };

    updateViewportConfig();

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateViewportConfig);
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
    }

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

      const scrollDelta = scrollTargetY - scrollY;
      const scrollVelocity = Math.abs(scrollDelta);
      scrollY += scrollDelta * 0.08;

      const totalScrollable = Math.max(
        (typeof document !== 'undefined' ? document.documentElement.scrollHeight : 2000) - window.innerHeight,
        1
      );
      const scrollFraction = THREE.MathUtils.clamp(scrollY / totalScrollable, 0, 1);

      // Dynamic surge from cursor speed + scroll velocity (feels like Lusion's fluid responsive canvas)
      const scrollInertiaBoost = Math.min(scrollVelocity * 0.008, 0.8);
      const kineticBoost = THREE.MathUtils.clamp(mouse.speed * 8 + scrollInertiaBoost, 0, 1.8);

      // Scroll-linked 3D Camera Flight Path:
      // Hero (0.0): High angle horizon overview
      // Projects (~0.25 - 0.5): Sweeps lower into the cybernetic data grid
      // Skills (~0.5 - 0.75): Tilts to reveal transversal lattice and data laser pulses
      // Contact (~0.75 - 1.0): Deep cosmic perspective
      const baseCamY = 270 - Math.sin(scrollFraction * Math.PI) * 110 - scrollFraction * 60;
      const baseCamZ = 560 - Math.sin(scrollFraction * Math.PI) * 160 + scrollFraction * 40;
      const targetLookY = -35 - scrollFraction * 80;

      camera.position.x = mouse.x * 75 + Math.sin(scrollFraction * Math.PI * 2) * 40;
      camera.position.y = baseCamY + mouse.y * 38;
      camera.position.z = baseCamZ;
      camera.rotation.z = -mouse.x * 0.025 + Math.sin(scrollFraction * Math.PI) * 0.02;
      camera.rotation.x = -0.34 + mouse.y * 0.035 - (scrollFraction * 0.08);
      camera.lookAt(mouse.x * 20, targetLookY, -180);

      // Light rotation & pulsation
      crimsonLight.position.x = Math.sin(time * 0.7) * 380;
      crimsonLight.position.z = Math.cos(time * 0.6) * 320;
      cyanLight.position.x = -Math.cos(time * 0.8) * 380;
      cyanLight.position.z = -Math.sin(time * 0.7) * 320;

      // Scroll-reactive lighting mood
      if (scrollFraction < 0.35) {
        crimsonLight.intensity = 4.0;
        cyanLight.intensity = 3.0;
      } else if (scrollFraction < 0.7) {
        crimsonLight.intensity = 4.8;
        cyanLight.intensity = 4.5;
        violetLight.intensity = 3.8;
      } else {
        crimsonLight.intensity = 3.5;
        cyanLight.intensity = 4.2;
      }

      // Update Data Pulses with scroll speed surge
      const pulseSpeedMultiplier = 1 + Math.min(scrollVelocity * 0.015, 2.0);
      pulses.forEach((p) => {
        p.progress += p.speed * pulseSpeedMultiplier * delta;
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

      // Update ambient cyber sparks drift
      const sparkPosAttr = sparkGeometry.attributes.position;
      for (let s = 0; s < sparkCount; s++) {
        const orig = sparkOriginals[s];
        const sY = orig.y + Math.sin(time * orig.speed + orig.phase) * 16;
        const sX = orig.x + Math.cos(time * 0.35 * orig.speed + orig.phase) * 10;
        sparkPositions[s * 3] = sX;
        sparkPositions[s * 3 + 1] = sY;
      }
      sparkPosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateViewportConfig);
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', onDeviceOrientation);
      }

      waveLines.forEach((wl) => wl.geometry.dispose());
      ribLines.forEach((rl) => rl.geometry.dispose());
      sparkGeometry.dispose();
      sparkMaterial.dispose();
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
