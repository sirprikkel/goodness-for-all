"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Subtle, warm floating-particle field rendered behind the impact quote.
 * Brand-palette colors, slow organic drift, respects prefers-reduced-motion,
 * pauses when scrolled out of view, and cleans up all GPU resources on unmount.
 */
export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container: HTMLDivElement | null = containerRef.current;
    if (!container) return;
    // Local non-null alias so nested closures keep the narrowed type.
    const el: HTMLDivElement = container;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const COUNT = 110;
    // Brand palette — evergreen, harvest-orange, asparagus (drop the pale beige
    // so particles stay visible against the sandstone background).
    const PALETTE = [0x334e1f, 0xed961d, 0x7ca84c, 0xed961d];

    const scene = new THREE.Scene();

    let width = el.clientWidth || 1;
    let height = el.clientHeight || 1;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Geometry: one BufferGeometry holding all particle positions + per-vertex color.
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    // Per-particle drift speed/phase kept in plain arrays (not uploaded to GPU).
    const speed = new Float32Array(COUNT);
    const phase = new Float32Array(COUNT);
    const color = new THREE.Color();

    const SPREAD_X = 26;
    const SPREAD_Y = 12;
    const SPREAD_Z = 10;

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD_X;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z;

      color.set(PALETTE[i % PALETTE.length]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Vary by index (Math.random is unavailable in workflow scripts but fine here).
      speed[i] = 0.15 + Math.random() * 0.35;
      phase[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    const posBuffer = new THREE.BufferAttribute(positions, 3);
    posBuffer.setUsage(THREE.DynamicDrawUsage); // updated every frame
    geometry.setAttribute("position", posBuffer);
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Soft round sprite so particles read as gentle dots, not squares.
    const sprite = makeCircleTexture();
    const material = new THREE.PointsMaterial({
      size: 0.9,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.NormalBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;

    let raf = 0;
    let looping = false; // guards against double rAF loops
    const clock = new THREE.Clock();

    function frame() {
      const t = clock.getElapsedTime();

      // Each particle drifts on a clearly visible vertical bob + horizontal sway.
      for (let i = 0; i < COUNT; i++) {
        const baseY = positions[i * 3 + 1];
        const baseX = positions[i * 3];
        posAttr.setY(i, baseY + Math.sin(t * speed[i] + phase[i]) * 1.1);
        posAttr.setX(i, baseX + Math.cos(t * speed[i] * 0.7 + phase[i]) * 0.7);
      }
      posAttr.needsUpdate = true;

      // Whole field rotates gently for depth.
      points.rotation.z = Math.sin(t * 0.08) * 0.08;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (looping || reduceMotion) return;
      looping = true;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      looping = false;
      cancelAnimationFrame(raf);
    }

    function renderStatic() {
      renderer.render(scene, camera);
    }

    // Animate only while the section is on screen; pause otherwise.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(el);

    function handleResize() {
      width = el.clientWidth || 1;
      height = el.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (!looping) renderStatic();
    }
    window.addEventListener("resize", handleResize);

    // Always render at least one frame; start the loop unless reduced-motion.
    renderStatic();
    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}

/** Builds a soft radial-gradient circle texture for round particles. */
function makeCircleTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
