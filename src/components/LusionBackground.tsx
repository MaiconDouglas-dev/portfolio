'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LusionBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene & Atmosphere
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0014);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      2500
    );
    camera.position.set(0, 280, 560);
    camera.lookAt(0, -40, -180);

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

    // 3. Ambient & Luminous Accent Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const crimsonLight = new THREE.PointLight(0xff2d55, 3.5, 900);
    crimsonLight.position.set(280, 120, 100);
    scene.add(crimsonLight);

    const cyanLight = new THREE.PointLight(0x0a84ff, 3.0, 900);
    cyanLight.position.set(-280, 100, -100);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 2.5, 800);
    violetLight.position.set(0, 200, -300);
    scene.add(violetLight);

    // 4. Cybernetic Topographic Mesh / Flow Fabric
    // We create a family of continuous contour spline lines forming a 3D landscape of data waves
    const lineCount = 48; // Number of horizontal contour lines
    const pointsPerLine = 84; // Resolution of each curve
    const width = 1700;
    const depth = 1500;
    const baseY = -120;

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

    // Shared Line Material with Additive Blending for high-tech glowing caustics
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
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

        // Base color initialization (deep midnight violet)
        colors[j * 3] = 0.08;
        colors[j * 3 + 1] = 0.05;
        colors[j * 3 + 2] = 0.18;
      }

      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
      );
      geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage)
      );

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

    // 5. Longitudinal Perspective Ribs (16 subtle transversal depth lines)
    const ribCount = 18;
    const ribPoints = 48;
    const ribLines: { geometry: THREE.BufferGeometry; positions: Float32Array; colors: Float32Array; ribIndex: number; baseX: number }[] = [];

    const ribMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
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

        colors[k * 3] = 0.04;
        colors[k * 3 + 1] = 0.08;
        colors[k * 3 + 2] = 0.16;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));

      const rib = new THREE.Line(geometry, ribMaterial);
      linesGroup.add(rib);

      ribLines.push({ geometry, positions, colors, ribIndex: r, baseX });
    }

    // 6. Traveling Light Pulses (Data Transmission Packets along the grid)
    interface DataPulse {
      lineIdx: number;
      progress: number;
      speed: number;
      length: number;
      color: { r: number; g: number; b: number };
    }

    const pulses: DataPulse[] = [
      { lineIdx: 6, progress: 0.1, speed: 0.28, length: 0.14, color: { r: 1.0, g: 0.18, b: 0.33 } }, // Crimson
      { lineIdx: 14, progress: 0.4, speed: 0.35, length: 0.12, color: { r: 0.04, g: 0.52, b: 1.0 } }, // Cyan
      { lineIdx: 22, progress: 0.7, speed: 0.25, length: 0.18, color: { r: 0.55, g: 0.36, b: 0.96 } }, // Violet
      { lineIdx: 30, progress: 0.2, speed: 0.32, length: 0.15, color: { r: 0.19, g: 0.82, b: 0.35 } }, // Green
      { lineIdx: 38, progress: 0.85, speed: 0.30, length: 0.12, color: { r: 1.0, g: 0.18, b: 0.33 } }, // Crimson
      { lineIdx: 18, progress: 0.5, speed: 0.40, length: 0.16, color: { r: 0.04, g: 0.52, b: 1.0 } }, // Cyan
    ];

    // 7. Mouse Raycasting to 3D Ground Plane
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const mouseWorld = new THREE.Vector3(0, baseY, 0);
    const mouseWorldTarget = new THREE.Vector3(0, baseY, 0);

    const raycaster = new THREE.Raycaster();
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -baseY); // Plane at y = baseY

    let scrollTargetY = 0;
    let scrollY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Project mouse vector to 3D ground plane for exact spatial alignment
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

    // 8. Interactive Wave Math Function
    // Calculates height y at any given 3D (x, z) location based on harmonics & mouse wake
    const calculateElevation = (x: number, z: number, time: number): { y: number; mouseInfluence: number } => {
      // Harmonic undulating ocean of data
      const wave1 = Math.sin(x * 0.0035 + time * 1.1) * 32;
      const wave2 = Math.cos(z * 0.0045 + time * 0.85) * 28;
      const wave3 = Math.sin((x * 0.002 + z * 0.003) + time * 1.4) * 18;
      const ripple = Math.cos((x - z) * 0.003 - time * 0.7) * 12;

      let y = baseY + wave1 + wave2 + wave3 + ripple;

      // Interactive Mouse Fluid Ripple
      // As the cursor passes, it creates an elastic organic elevation/swell
      const dx = x - mouseWorld.x;
      const dz = z - mouseWorld.z;
      const distSq = dx * dx + dz * dz;
      const influenceRadius = 260;
      const radiusSq = influenceRadius * influenceRadius;

      let mouseInfluence = 0;

      if (distSq < radiusSq) {
        const factor = 1 - distSq / radiusSq;
        // Smooth cubic falloff for liquid displacement
        const smoothFactor = factor * factor * (3 - 2 * factor);
        // Ripple oscillation based on distance
        const rippleWave = Math.sin(Math.sqrt(distSq) * 0.06 - time * 6) * 16;
        const elevationSwell = smoothFactor * 55 + rippleWave * smoothFactor;
        y += elevationSwell;
        mouseInfluence = smoothFactor;
      }

      return { y, mouseInfluence };
    };

    // 9. Main Animation Loop (60-120fps)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Fluid interpolation for mouse position & scroll
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      mouseWorld.lerp(mouseWorldTarget, 0.08);
      scrollY += (scrollTargetY - scrollY) * 0.05;

      // Cinematic camera response: tilts gently with mouse and deepens with scroll
      camera.position.x = mouse.x * 70;
      camera.position.y = 280 - scrollY * 0.12 + mouse.y * 35;
      camera.position.z = 560 + scrollY * 0.05;
      camera.lookAt(mouse.x * 20, -40 - scrollY * 0.08, -180);

      // Subtle dynamic lighting pulsation
      crimsonLight.position.x = Math.sin(time * 0.6) * 350;
      crimsonLight.position.z = Math.cos(time * 0.5) * 300;
      cyanLight.position.x = -Math.cos(time * 0.7) * 350;
      cyanLight.position.z = -Math.sin(time * 0.6) * 300;

      // Update Traveling Data Pulses
      pulses.forEach((p) => {
        p.progress += p.speed * delta;
        if (p.progress > 1.2) {
          p.progress = -0.2;
        }
      });

      // Update Horizontal Contour Wave Lines
      waveLines.forEach((wl) => {
        const { positions, colors, geometry, baseZ, lineIndex } = wl;

        // Check active pulses on this line
        const activePulse = pulses.find((p) => p.lineIdx === lineIndex);

        for (let j = 0; j < pointsPerLine; j++) {
          const idx3 = j * 3;
          const x = positions[idx3];
          const z = baseZ;

          const { y, mouseInfluence } = calculateElevation(x, z, time);
          positions[idx3 + 1] = y;

          // Color calculation based on height, depth, and mouse reaction
          const normalizedHeight = THREE.MathUtils.clamp((y - (baseY - 40)) / 140, 0, 1);
          const normalizedZDepth = THREE.MathUtils.clamp((z + 800) / depth, 0, 1);

          // Base palette interpolation:
          // Low: deep midnight violet (#120422)
          // Mid: electric blue (#0a84ff) & violet (#8b5cf6)
          // High crest: Apple Crimson Red (#ff2d55) & luminous white highlight
          let r = 0.06 + normalizedHeight * 0.75 + mouseInfluence * 0.5;
          let g = 0.04 + normalizedHeight * 0.15 + (1 - normalizedHeight) * normalizedZDepth * 0.35;
          let b = 0.18 + (1 - normalizedHeight) * 0.55 + normalizedHeight * 0.25;

          // Mouse excitation turns lines radiant crimson/ruby
          if (mouseInfluence > 0.01) {
            r = THREE.MathUtils.lerp(r, 1.0, mouseInfluence);
            g = THREE.MathUtils.lerp(g, 0.22, mouseInfluence);
            b = THREE.MathUtils.lerp(b, 0.42, mouseInfluence);
          }

          // Data Pulse Boost (traveling photon packet along the line)
          if (activePulse) {
            const normalizedXPos = j / (pointsPerLine - 1);
            const distToPulse = Math.abs(normalizedXPos - activePulse.progress);
            if (distToPulse < activePulse.length) {
              const intensity = (1 - distToPulse / activePulse.length) * 1.6;
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

      // Update Longitudinal Ribs
      ribLines.forEach((rl) => {
        const { positions, colors, geometry, baseX } = rl;

        for (let k = 0; k < ribPoints; k++) {
          const idx3 = k * 3;
          const z = positions[idx3 + 2];
          const x = baseX;

          const { y, mouseInfluence } = calculateElevation(x, z, time);
          positions[idx3 + 1] = y;

          // Subtle cyan/violet depth guidance
          const depthFade = THREE.MathUtils.clamp((z + 700) / depth, 0.1, 0.7);
          colors[idx3] = 0.08 + mouseInfluence * 0.4;
          colors[idx3 + 1] = (0.12 + mouseInfluence * 0.2) * depthFade;
          colors[idx3 + 2] = (0.28 + mouseInfluence * 0.4) * depthFade;
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 10. Memory Safe Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      waveLines.forEach((wl) => {
        wl.geometry.dispose();
      });
      ribLines.forEach((rl) => {
        rl.geometry.dispose();
      });
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
