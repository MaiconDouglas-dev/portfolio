'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LusionBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 400);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    // 3. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xff2d55, 2.5, 600);
    redLight.position.set(200, 100, 200);
    scene.add(redLight);

    const blueLight = new THREE.PointLight(0x0a84ff, 2.5, 600);
    blueLight.position.set(-200, -100, 200);
    scene.add(blueLight);

    const greenLight = new THREE.PointLight(0x30d158, 2, 500);
    greenLight.position.set(0, 200, 100);
    scene.add(greenLight);

    // 4. Distributed Systems Node Constellation
    const nodeCount = 75;
    const nodePositions: THREE.Vector3[] = [];
    const nodeOriginals: THREE.Vector3[] = [];
    const nodeVelocities: THREE.Vector3[] = [];
    const nodeColors: THREE.Color[] = [];

    const palette = [
      new THREE.Color(0xff2d55), // Crimson Red
      new THREE.Color(0x0a84ff), // Electric Blue
      new THREE.Color(0x30d158), // Apple Green
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0xffffff), // Clean White
    ];

    const group = new THREE.Group();
    scene.add(group);

    // Create Spherical Geometric Nodes
    const nodeGeo = new THREE.SphereGeometry(2.5, 12, 12);
    const nodesMeshGroup = new THREE.Group();
    group.add(nodesMeshGroup);

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 650,
        (Math.random() - 0.5) * 550,
        (Math.random() - 0.5) * 450
      );
      nodePositions.push(pos.clone());
      nodeOriginals.push(pos.clone());
      nodeVelocities.push(new THREE.Vector3());

      const color = palette[Math.floor(Math.random() * palette.length)];
      nodeColors.push(color);

      const mat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.85,
      });

      const sphere = new THREE.Mesh(nodeGeo, mat);
      sphere.position.copy(pos);
      nodesMeshGroup.add(sphere);
    }

    // 5. Dynamic Circuit Connectors (Lines between close nodes)
    const maxDistance = 140;
    const maxConnections = 300;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    lineGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(linesMesh);

    // 6. Deep Floating Packet / Star Field
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColorAttr = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 1200;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 1000 - 150;

      const c = palette[Math.floor(Math.random() * palette.length)];
      starColorAttr[i * 3] = c.r;
      starColorAttr[i * 3 + 1] = c.g;
      starColorAttr[i * 3 + 2] = c.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColorAttr, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 7. Mouse & Scroll Tracking with Inertia
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      worldX: 0,
      worldY: 0,
    };

    let scrollTargetY = 0;
    let scrollY = 0;

    const onMouseMove = (event: MouseEvent) => {
      // Normalized Device Coordinates (-1 to 1)
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;

      mouse.worldX = (event.clientX - window.innerWidth / 2) * 0.45;
      mouse.worldY = -(event.clientY - window.innerHeight / 2) * 0.45;
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

    // 8. Main 60-120fps Animation Loop with Fluid Physics
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Fluid exponential damping for mouse & scroll
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scrollY += (scrollTargetY - scrollY) * 0.06;

      // 3D Camera responds to scroll and cursor
      camera.position.x = mouse.x * 60;
      camera.position.y = -scrollY * 0.18 + mouse.y * 50;
      camera.position.z = 400 - (scrollY * 0.08) % 300;
      camera.lookAt(0, -scrollY * 0.15, 0);

      // Subtle scene ambient drift
      group.rotation.y = time * 0.03 + mouse.x * 0.12;
      group.rotation.x = Math.sin(time * 0.05) * 0.04 - mouse.y * 0.08;

      // Pulse Point Lights
      redLight.position.x = Math.sin(time * 0.8) * 280;
      redLight.position.y = Math.cos(time * 0.6) * 200;
      blueLight.position.x = Math.cos(time * 0.7) * -280;
      blueLight.position.y = Math.sin(time * 0.5) * -200;

      // Node Physics (Spring force toward origin + mouse disturbance)
      for (let i = 0; i < nodeCount; i++) {
        const pos = nodePositions[i];
        const orig = nodeOriginals[i];
        const vel = nodeVelocities[i];

        // Harmonic oscillator toward original position
        const springX = (orig.x - pos.x) * 1.5;
        const springY = (orig.y - pos.y) * 1.5;
        const springZ = (orig.z - pos.z) * 1.5;

        // Natural micro-wave motion
        const waveX = Math.sin(time * 0.9 + i) * 0.4;
        const waveY = Math.cos(time * 0.7 + i * 0.5) * 0.4;

        // Mouse repulsive field in 3D
        const dx = pos.x - mouse.worldX;
        const dy = pos.y - (mouse.worldY - scrollY * 0.15);
        const distSq = dx * dx + dy * dy;
        const radiusSq = 160 * 160;

        if (distSq < radiusSq && distSq > 0.01) {
          const force = (1 - distSq / radiusSq) * 35;
          const dist = Math.sqrt(distSq);
          vel.x += (dx / dist) * force;
          vel.y += (dy / dist) * force;
        }

        // Apply velocities with friction damping
        vel.x = (vel.x + springX * delta) * 0.88;
        vel.y = (vel.y + springY * delta) * 0.88;
        vel.z = (vel.z + springZ * delta) * 0.88;

        pos.x += vel.x + waveX;
        pos.y += vel.y + waveY;
        pos.z += vel.z;

        // Update sphere mesh
        const sphereMesh = nodesMeshGroup.children[i] as THREE.Mesh;
        if (sphereMesh) {
          sphereMesh.position.copy(pos);
          const scale = 1 + Math.sin(time * 2 + i) * 0.25;
          sphereMesh.scale.set(scale, scale, scale);
        }
      }

      // Rebuild Dynamic Line Connectors between near nodes
      let lineVertexIdx = 0;
      let lineCount = 0;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (lineCount >= maxConnections) break;

          const p1 = nodePositions[i];
          const p2 = nodePositions[j];
          const dist = p1.distanceTo(p2);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance);
            const c1 = nodeColors[i];
            const c2 = nodeColors[j];

            linePositions[lineVertexIdx] = p1.x;
            linePositions[lineVertexIdx + 1] = p1.y;
            linePositions[lineVertexIdx + 2] = p1.z;

            lineColors[lineVertexIdx] = c1.r * alpha;
            lineColors[lineVertexIdx + 1] = c1.g * alpha;
            lineColors[lineVertexIdx + 2] = c1.b * alpha;

            linePositions[lineVertexIdx + 3] = p2.x;
            linePositions[lineVertexIdx + 4] = p2.y;
            linePositions[lineVertexIdx + 5] = p2.z;

            lineColors[lineVertexIdx + 3] = c2.r * alpha;
            lineColors[lineVertexIdx + 4] = c2.g * alpha;
            lineColors[lineVertexIdx + 5] = c2.b * alpha;

            lineVertexIdx += 6;
            lineCount++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineCount * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Slowly rotate starfield for infinite cosmic depth
      starField.rotation.y = time * 0.01;
      starField.rotation.x = time * 0.005;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      nodeGeo.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      starGeo.dispose();
      starMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="lusion-canvas-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black"
      aria-hidden="true"
    />
  );
}
