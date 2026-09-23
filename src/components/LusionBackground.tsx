'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { soundManager } from '@/utils/audio';

export default function LusionBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene & Atmospheric Cosmic Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.00085);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 68 : 55,
      window.innerWidth / window.innerHeight,
      1,
      3500
    );
    camera.position.set(0, 270, 560);
    camera.lookAt(0, -35, -180);

    // 2. High-Performance WebGL Renderer (Optimized DPR for guaranteed 60-120fps on Safari & Mobile)
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5));
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    // 3. Infinite Cybernetic Expanse (Borderless Horizon)
    // Scale expanded to 4600x3400 with procedural edge falloff so it never looks bounded
    const width = 4600;
    const depth = 3400;
    const baseY = -115;

    const lineCount = isMobile ? 50 : 70;
    const pointsPerLine = isMobile ? 220 : 320;
    const ribCount = isMobile ? 22 : 34;
    const ribPoints = isMobile ? 150 : 220;

    const totalWaveVertices = lineCount * pointsPerLine;
    const totalRibVertices = ribCount * ribPoints;
    const totalVertices = totalWaveVertices + totalRibVertices;

    const positions = new Float32Array(totalVertices * 3);
    const aNormX = new Float32Array(totalVertices);
    const aLineIdx = new Float32Array(totalVertices);
    const aIsRib = new Float32Array(totalVertices);

    const indices: number[] = [];

    // Populate Horizontal Wave Lines
    for (let i = 0; i < lineCount; i++) {
      const normalizedZ = i / (lineCount - 1);
      const z = (normalizedZ - 0.5) * depth - 100;
      const lineOffset = i * pointsPerLine;

      for (let j = 0; j < pointsPerLine; j++) {
        const vIdx = lineOffset + j;
        const normalizedX = j / (pointsPerLine - 1);
        const x = (normalizedX - 0.5) * width;

        positions[vIdx * 3] = x;
        positions[vIdx * 3 + 1] = baseY;
        positions[vIdx * 3 + 2] = z;

        aNormX[vIdx] = normalizedX;
        aLineIdx[vIdx] = i;
        aIsRib[vIdx] = 0.0;

        if (j < pointsPerLine - 1) {
          indices.push(vIdx, vIdx + 1);
        }
      }
    }

    // Populate Longitudinal Perspective Ribs
    for (let r = 0; r < ribCount; r++) {
      const normalizedX = r / (ribCount - 1);
      const x = (normalizedX - 0.5) * width;
      const ribOffset = totalWaveVertices + r * ribPoints;

      for (let k = 0; k < ribPoints; k++) {
        const vIdx = ribOffset + k;
        const normalizedZ = k / (ribPoints - 1);
        const z = (normalizedZ - 0.5) * depth - 100;

        positions[vIdx * 3] = x;
        positions[vIdx * 3 + 1] = baseY;
        positions[vIdx * 3 + 2] = z;

        aNormX[vIdx] = normalizedX;
        aLineIdx[vIdx] = -1.0;
        aIsRib[vIdx] = 1.0;

        if (k < ribPoints - 1) {
          indices.push(vIdx, vIdx + 1);
        }
      }
    }

    const meshGeometry = new THREE.BufferGeometry();
    meshGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    meshGeometry.setAttribute('aNormX', new THREE.BufferAttribute(aNormX, 1));
    meshGeometry.setAttribute('aLineIdx', new THREE.BufferAttribute(aLineIdx, 1));
    meshGeometry.setAttribute('aIsRib', new THREE.BufferAttribute(aIsRib, 1));
    meshGeometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));

    // Data Pulses (Traveling Photon Packets)
    interface DataPulse {
      lineIdx: number;
      progress: number;
      speed: number;
      length: number;
      color: THREE.Vector3;
    }

    const pulses: DataPulse[] = [
      { lineIdx: 8, progress: 0.1, speed: 0.28, length: 0.14, color: new THREE.Vector3(1.0, 0.18, 0.35) },
      { lineIdx: 18, progress: 0.45, speed: 0.34, length: 0.13, color: new THREE.Vector3(0.04, 0.55, 1.0) },
      { lineIdx: 28, progress: 0.75, speed: 0.25, length: 0.16, color: new THREE.Vector3(0.65, 0.38, 1.0) },
      { lineIdx: 38, progress: 0.2, speed: 0.31, length: 0.14, color: new THREE.Vector3(0.19, 0.85, 0.4) },
      { lineIdx: 48, progress: 0.88, speed: 0.28, length: 0.12, color: new THREE.Vector3(1.0, 0.18, 0.35) },
      { lineIdx: 58, progress: 0.3, speed: 0.36, length: 0.15, color: new THREE.Vector3(0.04, 0.55, 1.0) },
      { lineIdx: 22, progress: 0.6, speed: 0.3, length: 0.14, color: new THREE.Vector3(1.0, 0.62, 0.04) },
    ];

    const pulseVectors = pulses.map((p) => new THREE.Vector4(p.progress, p.length, p.lineIdx, 1.0));
    const pulseColorVectors = pulses.map((p) => p.color);

    // 4. Hardware-Accelerated Vertex & Fragment Shaders for the 3D Terrain
    const vertexShader = `
      uniform float uTime;
      uniform vec3 uMouse;
      uniform vec3 uTrail;
      uniform float uKineticBoost;
      uniform float uInfluenceRadius;
      uniform float uBaseY;
      uniform float uWidth;
      uniform float uDepth;
      uniform vec4 uPulses[7];
      uniform vec3 uPulseColors[7];
      uniform vec2 uShockwaveCenter;
      uniform float uShockwaveTime;

      attribute float aNormX;
      attribute float aLineIdx;
      attribute float aIsRib;

      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec3 pos = position;
        float x = pos.x;
        float z = pos.z;

        // 1. Organic, broad ocean harmonics
        float wave1 = sin(x * 0.0016 + uTime * 0.95) * 32.0;
        float wave2 = cos(z * 0.0022 + uTime * 0.75) * 28.0;
        float wave3 = sin(x * 0.0011 + z * 0.0018 + uTime * 1.15) * 20.0;
        float ripple = cos((x * 0.0015 - z * 0.0015) - uTime * 0.65) * 14.0;

        // Subtle planetary horizon drop into the fog
        float farZ = max(0.0, -z - 100.0);
        float horizonDrop = (farZ * farZ) * 0.000045;

        float y = uBaseY + wave1 + wave2 + wave3 + ripple - horizonDrop;

        // 2. Primary cursor fluid deformation
        vec2 diff1 = vec2(x - uMouse.x, z - uMouse.z);
        float distSq1 = dot(diff1, diff1);
        float radiusSq1 = uInfluenceRadius * uInfluenceRadius;

        float totalInfluence = 0.0;

        if (distSq1 < radiusSq1) {
          float ratio1 = distSq1 / radiusSq1;
          float w1 = 1.0 - ratio1;
          // Quintic Perlin smootherstep: 6w^5 - 15w^4 + 10w^3 (zero 1st & 2nd derivatives at borders)
          float smooth1 = w1 * w1 * w1 * (w1 * (w1 * 6.0 - 15.0) + 10.0);

          // Core damping: eliminates central cone/crease ("quebra de linha")
          float coreDamp = distSq1 / (distSq1 + 1200.0);
          float dist1 = sqrt(distSq1);

          // Silky liquid harmonic ripple
          float ripple1 = cos(dist1 * 0.026 - uTime * 4.4) * coreDamp * (16.0 + uKineticBoost * 12.0);
          float dome1 = smooth1 * (72.0 + uKineticBoost * 28.0);
          y += dome1 + ripple1 * smooth1;
          totalInfluence += smooth1;
        }

        // 3. Trailing liquid wake
        vec2 diff2 = vec2(x - uTrail.x, z - uTrail.z);
        float distSq2 = dot(diff2, diff2);
        float radiusSq2 = 260.0 * 260.0;
        if (distSq2 < radiusSq2) {
          float ratio2 = distSq2 / radiusSq2;
          float w2 = 1.0 - ratio2;
          float smooth2 = w2 * w2 * w2 * (w2 * (w2 * 6.0 - 15.0) + 10.0);
          y += smooth2 * (26.0 + uKineticBoost * 10.0);
          totalInfluence += smooth2 * 0.45;
        }

        // 3.5 Dynamic Click Shockwave Ripple
        if (uShockwaveTime >= 0.0 && uShockwaveTime < 2.4) {
          vec2 diffSW = vec2(x - uShockwaveCenter.x, z - uShockwaveCenter.y);
          float distSW = length(diffSW);
          float swSpeed = 750.0;
          float currentRadius = uShockwaveTime * swSpeed;
          float ringDist = abs(distSW - currentRadius);
          float ringWidth = 110.0;
          if (ringDist < ringWidth) {
            float fadeTime = 1.0 - uShockwaveTime / 2.4;
            float swFactor = (1.0 - ringDist / ringWidth) * fadeTime;
            float swWave = sin(ringDist * 0.09) * swFactor * 48.0;
            y += swWave;
            totalInfluence += swFactor * 0.75;
          }
        }

        pos.y = y;

        // 4. Seamless Boundless Horizon (Edge opacity dissolves to 0 before physical limits)
        float normDistX = abs(x) / (uWidth * 0.5);
        float fadeX = smoothstep(1.0, 0.62, normDistX);

        float normDistZFar = clamp((-z - 100.0) / (uDepth * 0.55), 0.0, 1.0);
        float fadeZFar = smoothstep(1.0, 0.40, normDistZFar);

        float normDistZNear = clamp((z - 250.0) / (uDepth * 0.35), 0.0, 1.0);
        float fadeZNear = smoothstep(1.0, 0.0, normDistZNear);

        float infiniteFade = fadeX * fadeZFar * fadeZNear;

        // 5. Color computation
        float normHeight = clamp((y - (uBaseY - 40.0)) / 160.0, 0.0, 1.0);
        float depthFade = clamp((z + 1400.0) / uDepth, 0.15, 1.0);

        vec3 col;
        float alpha;

        if (aIsRib > 0.5) {
          col = vec3(
            0.08 + totalInfluence * 0.45,
            (0.12 + totalInfluence * 0.25) * depthFade,
            (0.30 + totalInfluence * 0.45) * depthFade
          );
          alpha = 0.38 * infiniteFade;
        } else {
          col = vec3(
            0.06 + normHeight * 0.75 + totalInfluence * 0.55,
            0.04 + normHeight * 0.18 + (1.0 - normHeight) * depthFade * 0.38,
            0.18 + (1.0 - normHeight) * 0.60 + normHeight * 0.30
          );

          if (totalInfluence > 0.01) {
            col = mix(col, vec3(1.0, 0.28, 0.48), clamp(totalInfluence, 0.0, 1.0));
          }

          // Traveling Photon Pulses
          for (int p = 0; p < 7; p++) {
            if (abs(aLineIdx - uPulses[p].z) < 0.5) {
              float pulseDist = abs(aNormX - uPulses[p].x);
              float pulseLen = uPulses[p].y;
              if (pulseDist < pulseLen) {
                float intensity = (1.0 - pulseDist / pulseLen) * 1.8;
                col += uPulseColors[p] * intensity;
              }
            }
          }

          alpha = 0.92 * infiniteFade;
        }

        vColor = col;
        vAlpha = alpha;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        gl_FragColor = vec4(vColor, vAlpha);
      }
    `;

    const meshMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(0, baseY, 0) },
        uTrail: { value: new THREE.Vector3(0, baseY, 0) },
        uKineticBoost: { value: 0 },
        uInfluenceRadius: { value: 320 },
        uBaseY: { value: baseY },
        uWidth: { value: width },
        uDepth: { value: depth },
        uPulses: { value: pulseVectors },
        uPulseColors: { value: pulseColorVectors },
        uShockwaveCenter: { value: new THREE.Vector2(0, 0) },
        uShockwaveTime: { value: -100.0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const terrainMesh = new THREE.LineSegments(meshGeometry, meshMaterial);
    scene.add(terrainMesh);

    // ============================================================================
    // 5. Authentic Realistic White Starfield (Astronomical Diamond-White Stars)
    // Pure white spectrum with natural twinkling, uniform elegant sizing
    // ============================================================================
    const starCount = isMobile ? 480 : 850;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starTwinkleSpeeds = new Float32Array(starCount);
    const starTwinklePhases = new Float32Array(starCount);

    // Realistic astronomical white star temperatures (pure diamond white & subtle silver white)
    const starPalette = [
      new THREE.Color(0xffffff), // Pure white
      new THREE.Color(0xffffff), // Pure white
      new THREE.Color(0xf6f9ff), // Diamond icy white (Sirius / Vega)
      new THREE.Color(0xffffff), // Pure white
      new THREE.Color(0xfffdfc), // Natural starlight white
      new THREE.Color(0xffffff), // Pure white
    ];

    for (let s = 0; s < starCount; s++) {
      let sx: number;
      let sy: number;
      let sz: number;

      // 60% of stars along the upper celestial galaxy band
      if (s < starCount * 0.6) {
        const t = (Math.random() - 0.5) * 4600;
        const angle = -0.28;
        const spreadY = (Math.random() - 0.5) * 450;
        const spreadZ = (Math.random() - 0.5) * 600;
        sx = t;
        sy = baseY + 260 + t * Math.sin(angle) * 0.14 + spreadY;
        sz = t * Math.cos(angle) * 0.26 + spreadZ - 250;
      } else {
        // 40% scattered across the upper celestial sky
        sx = (Math.random() - 0.5) * 4600;
        sy = baseY + 140 + Math.random() * 750;
        sz = (Math.random() - 0.5) * 3600 - 200;
      }

      starPositions[s * 3] = sx;
      starPositions[s * 3 + 1] = sy;
      starPositions[s * 3 + 2] = sz;

      // White starlight
      const col = starPalette[Math.floor(Math.random() * starPalette.length)];
      starColors[s * 3] = col.r;
      starColors[s * 3 + 1] = col.g;
      starColors[s * 3 + 2] = col.b;

      // Natural, balanced size distribution: none grow overly large
      const randType = Math.random();
      if (randType > 0.88) {
        starSizes[s] = 5.2 + Math.random() * 2.2; // Brighter anchor stars (max ~7.4)
      } else if (randType > 0.50) {
        starSizes[s] = 3.6 + Math.random() * 1.4; // Medium stars
      } else {
        starSizes[s] = 2.4 + Math.random() * 1.0; // Fine stardust
      }

      starTwinkleSpeeds[s] = 0.8 + Math.random() * 1.6;
      starTwinklePhases[s] = Math.random() * Math.PI * 2;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('aColor', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('aSize', new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute('aTwinkleSpeed', new THREE.BufferAttribute(starTwinkleSpeeds, 1));
    starGeometry.setAttribute('aTwinklePhase', new THREE.BufferAttribute(starTwinklePhases, 1));

    const starVertexShader = `
      uniform float uTime;
      uniform float uPixelRatio;

      attribute float aSize;
      attribute float aTwinkleSpeed;
      attribute float aTwinklePhase;
      attribute vec3 aColor;

      varying vec3 vStarColor;
      varying float vTwinkle;

      void main() {
        vec3 pos = position;

        // Subtle cosmic drift
        pos.y += sin(uTime * 0.5 * aTwinkleSpeed + aTwinklePhase) * 10.0;
        pos.x += cos(uTime * 0.25 * aTwinkleSpeed + aTwinklePhase) * 8.0;

        // Smooth natural twinkling without harsh spikes
        float t = uTime * aTwinkleSpeed + aTwinklePhase;
        float twinkle = 0.72 + 0.28 * sin(t);

        vStarColor = aColor;
        vTwinkle = twinkle;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        // Strictly clamped point size between 2.0px and 16.0px so none grow too large
        gl_PointSize = clamp((aSize * twinkle * (460.0 / max(280.0, -mvPosition.z))) * uPixelRatio, 2.0, 16.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const starFragmentShader = `
      varying vec3 vStarColor;
      varying float vTwinkle;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);

        if (dist > 0.5) discard;

        // 1. Hot brilliant star core
        float core = exp(-dist * 10.0);

        // 2. Soft natural celestial halo
        float halo = exp(-dist * 3.8) * 0.55;

        // 3. Subtle delicate diffraction spike
        float crossX = max(0.0, 1.0 - abs(coord.x) * 12.0) * max(0.0, 1.0 - abs(coord.y) * 2.5);
        float crossY = max(0.0, 1.0 - abs(coord.y) * 12.0) * max(0.0, 1.0 - abs(coord.x) * 2.5);
        float flare = (crossX + crossY) * 0.25;

        float brightness = core * 1.5 + halo + flare;
        float alpha = clamp(brightness * vTwinkle * 1.1, 0.0, 1.0);

        // All stars render pure crisp white
        gl_FragColor = vec4(vec3(1.0), alpha);
      }
    `;

    const starMaterial = new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // ============================================================================
    // 5.5 3D Cyber Tesseract & Hyperspace Warp Corridor (Lusion 30s-40s Experience)
    // Deep perspective cyber tunnel with rotating 4D tesseracts & neon portal frames
    // ============================================================================
    const corridorGroup = new THREE.Group();
    corridorGroup.visible = false;
    scene.add(corridorGroup);

    // 1. Cyber Portal Frames along Z axis
    const portalCount = 16;
    const portalSpacing = 160;
    const portalStartZ = 100;
    const portalWidth = isMobile ? 380 : 540;
    const portalHeight = isMobile ? 260 : 360;

    const portalFramePositions: number[] = [];
    const portalRubyFramePositions: number[] = [];

    for (let p = 0; p < portalCount; p++) {
      const pz = portalStartZ - p * portalSpacing;
      const hw = portalWidth * 0.5;
      const hh = portalHeight * 0.5;
      const py = 60;

      const targetArr = p % 3 === 0 ? portalRubyFramePositions : portalFramePositions;
      targetArr.push(
        -hw, py - hh, pz,   hw, py - hh, pz,
         hw, py - hh, pz,   hw, py + hh, pz,
         hw, py + hh, pz,  -hw, py + hh, pz,
        -hw, py + hh, pz,  -hw, py - hh, pz
      );
    }

    const portalFrameGeo = new THREE.BufferGeometry();
    portalFrameGeo.setAttribute('position', new THREE.Float32BufferAttribute(portalFramePositions, 3));
    const portalMatCyan = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const portalCyanMesh = new THREE.LineSegments(portalFrameGeo, portalMatCyan);
    corridorGroup.add(portalCyanMesh);

    const portalRubyGeo = new THREE.BufferGeometry();
    portalRubyGeo.setAttribute('position', new THREE.Float32BufferAttribute(portalRubyFramePositions, 3));
    const portalMatRuby = new THREE.LineBasicMaterial({
      color: 0xff2d55,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const portalRubyMesh = new THREE.LineSegments(portalRubyGeo, portalMatRuby);
    corridorGroup.add(portalRubyMesh);

    // 2. Procedural 4D Tesseract (Hypercube) Geometry Builder
    const buildTesseractGeo = (outerSize: number, innerSize: number) => {
      const o = outerSize * 0.5;
      const i = innerSize * 0.5;
      const signs = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
      ];
      const cubeEdges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];
      const posArr: number[] = [];
      // Outer
      for (const [v1, v2] of cubeEdges) {
        posArr.push(signs[v1][0] * o, signs[v1][1] * o, signs[v1][2] * o);
        posArr.push(signs[v2][0] * o, signs[v2][1] * o, signs[v2][2] * o);
      }
      // Inner
      for (const [v1, v2] of cubeEdges) {
        posArr.push(signs[v1][0] * i, signs[v1][1] * i, signs[v1][2] * i);
        posArr.push(signs[v2][0] * i, signs[v2][1] * i, signs[v2][2] * i);
      }
      // 8 Interconnecting Hypercube diagonals
      for (let k = 0; k < 8; k++) {
        posArr.push(signs[k][0] * o, signs[k][1] * o, signs[k][2] * o);
        posArr.push(signs[k][0] * i, signs[k][1] * i, signs[k][2] * i);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(posArr, 3));
      return geo;
    };

    const tesseractMatCyan = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const tesseractMatRuby = new THREE.LineBasicMaterial({
      color: 0xff2d55,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const tesseractGeos: THREE.BufferGeometry[] = [];
    const tesseracts: {
      mesh: THREE.LineSegments;
      rotSpeed: THREE.Vector3;
      basePos: THREE.Vector3;
    }[] = [];

    const tesseractConfigs = [
      { x: -280, y: 120, z: -350, size: 75, isRuby: false },
      { x: 290, y: 140, z: -680, size: 85, isRuby: true },
      { x: -310, y: 40, z: -1050, size: 70, isRuby: false },
      { x: 300, y: 50, z: -1420, size: 80, isRuby: true },
      { x: -270, y: 150, z: -1750, size: 75, isRuby: false },
      { x: 280, y: 110, z: -2100, size: 90, isRuby: false },
    ];

    tesseractConfigs.forEach((cfg) => {
      const geo = buildTesseractGeo(cfg.size, cfg.size * 0.52);
      tesseractGeos.push(geo);
      const mesh = new THREE.LineSegments(geo, cfg.isRuby ? tesseractMatRuby : tesseractMatCyan);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      corridorGroup.add(mesh);

      tesseracts.push({
        mesh,
        rotSpeed: new THREE.Vector3(
          0.4 + Math.random() * 0.6,
          0.5 + Math.random() * 0.7,
          0.3 + Math.random() * 0.5
        ),
        basePos: mesh.position.clone(),
      });
    });

    // 3. Hyperspace Warp Speed Streamers
    const streamerCount = isMobile ? 24 : 44;
    const streamerLength = 220;
    const streamerPositions = new Float32Array(streamerCount * 6);
    const streamerSpeeds = new Float32Array(streamerCount);

    for (let s = 0; s < streamerCount; s++) {
      const rad = 140 + Math.random() * 320;
      const ang = (s / streamerCount) * Math.PI * 2 + Math.random() * 0.2;
      const sx = Math.cos(ang) * rad;
      const sy = 60 + Math.sin(ang) * (rad * 0.65);
      const sz = portalStartZ - Math.random() * 2400;

      streamerPositions[s * 6] = sx;
      streamerPositions[s * 6 + 1] = sy;
      streamerPositions[s * 6 + 2] = sz;

      streamerPositions[s * 6 + 3] = sx;
      streamerPositions[s * 6 + 4] = sy;
      streamerPositions[s * 6 + 5] = sz - streamerLength;

      streamerSpeeds[s] = 480 + Math.random() * 420;
    }

    const streamerGeo = new THREE.BufferGeometry();
    const streamerPosAttr = new THREE.BufferAttribute(streamerPositions, 3);
    streamerGeo.setAttribute('position', streamerPosAttr);

    const streamerMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const streamerMesh = new THREE.LineSegments(streamerGeo, streamerMat);
    corridorGroup.add(streamerMesh);

    // 6. Fluid Mouse & Touch Tracking & Kinetic Wake
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
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
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 768;

      camera.aspect = w / h;
      camera.fov = mobile ? 68 : 55;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      const dpr = Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.5);
      renderer.setPixelRatio(dpr);
      starMaterial.uniforms.uPixelRatio.value = dpr;
    };

    let shockwaveStartTime = -100.0;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
      const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY;
      projectPointerTo3D(clientX, clientY);
      meshMaterial.uniforms.uShockwaveCenter.value.set(mouseWorldTarget.x, mouseWorldTarget.z);
      shockwaveStartTime = clock.getElapsedTime();
    };

    window.addEventListener('mousedown', onPointerDown, { passive: true });
    window.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateViewportConfig);
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
    }

    // 7. Ultra-Lightweight GPU-Driven Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let isRunning = true;

    const onVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          clock.start();
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animate = () => {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Fluid interpolation
      const mouseDeltaX = mouse.targetX - mouse.x;
      const mouseDeltaY = mouse.targetY - mouse.y;
      mouse.speed = Math.sqrt(mouseDeltaX * mouseDeltaX + mouseDeltaY * mouseDeltaY);

      mouse.x += mouseDeltaX * 0.075;
      mouse.y += mouseDeltaY * 0.075;

      mouseWorld.lerp(mouseWorldTarget, 0.09);
      trailWorld.lerp(mouseWorld, 0.038);

      const scrollDelta = scrollTargetY - scrollY;
      const scrollVelocity = Math.abs(scrollDelta);
      scrollY += scrollDelta * 0.08;

      const totalScrollable = Math.max(
        (typeof document !== 'undefined' ? document.documentElement.scrollHeight : 2000) - window.innerHeight,
        1
      );
      const scrollFraction = THREE.MathUtils.clamp(scrollY / totalScrollable, 0, 1);

      const scrollInertiaBoost = Math.min(scrollVelocity * 0.008, 0.8);
      const kineticBoost = THREE.MathUtils.clamp(mouse.speed * 8 + scrollInertiaBoost, 0, 1.8);
      const influenceRadius = 340 + kineticBoost * 90;

      // Subtle interactive kinetic audio modulation
      if (kineticBoost > 0.08) {
        soundManager.onKineticDisturbance(kineticBoost);
      }

      // Update Shockwave Time
      const swElapsed = shockwaveStartTime > 0 ? (time - shockwaveStartTime) : -100.0;
      meshMaterial.uniforms.uShockwaveTime.value = swElapsed;

      // 3D Camera Flight Path
      const baseCamY = 270 - Math.sin(scrollFraction * Math.PI) * 110 - scrollFraction * 60;
      const baseCamZ = 560 - Math.sin(scrollFraction * Math.PI) * 160 + scrollFraction * 40;
      const targetLookY = -35 - scrollFraction * 80;

      camera.position.x = mouse.x * 75 + Math.sin(scrollFraction * Math.PI * 2) * 40;
      camera.position.y = baseCamY + mouse.y * 38;
      camera.position.z = baseCamZ;
      camera.rotation.z = -mouse.x * 0.025 + Math.sin(scrollFraction * Math.PI) * 0.02;
      camera.rotation.x = -0.34 + mouse.y * 0.035 - (scrollFraction * 0.08);
      camera.lookAt(mouse.x * 20, targetLookY, -180);

      // Update Terrain Shader Uniforms (GPU execution only)
      meshMaterial.uniforms.uTime.value = time;
      meshMaterial.uniforms.uMouse.value.copy(mouseWorld);
      meshMaterial.uniforms.uTrail.value.copy(trailWorld);
      meshMaterial.uniforms.uKineticBoost.value = kineticBoost;
      meshMaterial.uniforms.uInfluenceRadius.value = influenceRadius;

      // Update Twinkling Stars Shader Uniform
      starMaterial.uniforms.uTime.value = time;

      // Update pulses
      const pulseSpeedMultiplier = 1 + Math.min(scrollVelocity * 0.015, 2.0);
      pulses.forEach((p, idx) => {
        p.progress += p.speed * pulseSpeedMultiplier * delta;
        if (p.progress > 1.25) p.progress = -0.25;
        pulseVectors[idx].x = p.progress;
      });

      // ============================================================================
      // 3D Cyber Tesseract & Hyperspace Warp Corridor Update (Lusion Transition)
      // ============================================================================
      const corridorAlpha = THREE.MathUtils.smoothstep(scrollFraction, 0.38, 0.72);
      corridorGroup.visible = corridorAlpha > 0.01;

      if (corridorGroup.visible) {
        portalMatCyan.opacity = corridorAlpha * 0.45;
        portalMatRuby.opacity = corridorAlpha * 0.38;
        tesseractMatCyan.opacity = corridorAlpha * 0.70;
        tesseractMatRuby.opacity = corridorAlpha * 0.65;
        streamerMat.opacity = corridorAlpha * 0.65;

        // Rotate Tesseracts along the corridor
        tesseracts.forEach((t) => {
          t.mesh.rotation.x += t.rotSpeed.x * delta;
          t.mesh.rotation.y += t.rotSpeed.y * delta;
          t.mesh.rotation.z += t.rotSpeed.z * delta;
          t.mesh.position.y = t.basePos.y + Math.sin(time * 1.5 + t.basePos.x) * 12;
        });

        // Advance Warp Speed Streamers
        const streamerSpeedBoost = 1 + scrollVelocity * 0.08;
        const posArray = streamerPosAttr.array as Float32Array;
        for (let s = 0; s < streamerCount; s++) {
          const idx = s * 6;
          const currentSpeed = streamerSpeeds[s] * streamerSpeedBoost * delta;
          posArray[idx + 2] += currentSpeed;
          posArray[idx + 5] = posArray[idx + 2] - (streamerLength + scrollVelocity * 2.2);

          if (posArray[idx + 2] > 260) {
            posArray[idx + 2] = portalStartZ - 2400;
            posArray[idx + 5] = posArray[idx + 2] - streamerLength;
          }
        }
        streamerPosAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateViewportConfig);
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', onDeviceOrientation);
      }

      meshGeometry.dispose();
      meshMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      portalFrameGeo.dispose();
      portalRubyGeo.dispose();
      portalMatCyan.dispose();
      portalMatRuby.dispose();
      tesseractMatCyan.dispose();
      tesseractMatRuby.dispose();
      tesseractGeos.forEach((g) => g.dispose());
      streamerGeo.dispose();
      streamerMat.dispose();
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
