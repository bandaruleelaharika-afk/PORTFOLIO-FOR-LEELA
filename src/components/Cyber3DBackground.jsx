import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './Cyber3DBackground.css';

// 3D Math Helper: Rotate point in 3D space
function rotateX(p, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
}

function rotateY(p, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
}

function rotateZ(p, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x * cos - p.y * sin, y: p.x * sin + p.y * cos, z: p.z };
}

// 3D Polyhedron geometry templates (Octahedron & Icosahedron)
const octahedronVertices = [
  { x: 0, y: 1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: -1, y: 0, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: -1 },
];

const octahedronEdges = [
  [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 4], [4, 3], [3, 5], [5, 2]
];

const Cyber3DBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tilt tracking
    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;

    const handleMouseMove = (e) => {
      const halfW = width / 2;
      const halfH = height / 2;
      targetRotY = ((e.clientX - halfW) / halfW) * 0.45;
      targetRotX = -((e.clientY - halfH) / halfH) * 0.45;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Generate 3D Constellation Particles
    const PARTICLE_COUNT = Math.min(85, Math.floor((width * height) / 14000));
    const particles = [];
    const fov = 450; // Camera distance

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 100,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 1.2,
        colorIndex: Math.floor(Math.random() * 3),
      });
    }

    // 3D Floating Polyhedral Geometries (Crystalline nodes)
    const shapes = [
      {
        pos: { x: -width * 0.32, y: -height * 0.2, z: 420 },
        scale: 65,
        rot: { x: 0.2, y: 0.4, z: 0 },
        speed: { x: 0.008, y: 0.012, z: 0.005 },
        color: '#14b8a6',
      },
      {
        pos: { x: width * 0.34, y: height * 0.22, z: 380 },
        scale: 75,
        rot: { x: 0.5, y: 0.1, z: 0.3 },
        speed: { x: -0.01, y: 0.008, z: 0.006 },
        color: '#38bdf8',
      },
      {
        pos: { x: width * 0.28, y: -height * 0.3, z: 520 },
        scale: 50,
        rot: { x: 0.1, y: 0.8, z: 0.2 },
        speed: { x: 0.012, y: -0.009, z: 0.007 },
        color: '#a855f7',
      },
      {
        pos: { x: -width * 0.28, y: height * 0.35, z: 460 },
        scale: 55,
        rot: { x: 0.3, y: 0.2, z: 0.5 },
        speed: { x: 0.009, y: 0.011, z: -0.008 },
        color: '#10b981',
      }
    ];

    // Wave Grid Points for 3D Cyber Floor
    const gridCols = 16;
    const gridRows = 10;
    const gridSpacing = 95;

    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth damping interpolation (lerp) for 3D camera
      curRotX += (targetRotX - curRotX) * 0.06;
      curRotY += (targetRotY - curRotY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark' || document.documentElement.getAttribute('data-theme') === 'dark';

      // Colors for Dark vs Light mode
      const primaryColor = isDark ? '#14b8a6' : '#0d9488';
      const secondaryColor = isDark ? '#38bdf8' : '#0284c7';
      const tertiaryColor = isDark ? '#a855f7' : '#9333ea';

      const cx = width / 2;
      const cy = height / 2;

      // --- 1. Draw 3D Receding Horizon Cyber Grid ---
      ctx.lineWidth = 1;
      for (let r = 0; r < gridRows; r++) {
        ctx.beginPath();
        let started = false;

        for (let c = 0; c < gridCols; c++) {
          const rawX = (c - gridCols / 2) * gridSpacing;
          const rawZ = 200 + r * gridSpacing;
          const rawY = height * 0.35 + Math.sin(time + c * 0.4 + r * 0.3) * 16;

          // Camera rotation
          let p = { x: rawX, y: rawY, z: rawZ };
          p = rotateY(p, curRotY * 0.5);
          p = rotateX(p, curRotX * 0.5);

          if (p.z > 20) {
            const scale = fov / p.z;
            const px = p.x * scale + cx;
            const py = p.y * scale + cy;

            if (!started) {
              ctx.moveTo(px, py);
              started = true;
            } else {
              ctx.lineTo(px, py);
            }
          }
        }

        const alpha = Math.max(0, 0.16 - (r / gridRows) * 0.14);
        ctx.strokeStyle = isDark ? `rgba(20, 184, 166, ${alpha})` : `rgba(13, 148, 136, ${alpha * 0.8})`;
        ctx.stroke();
      }

      // --- 2. Update & Draw 3D Constellation Particles ---
      const projectedParticles = [];

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        // Animate
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.z += pt.vz;

        // Wrap around bounds
        if (pt.z < 80) pt.z = 850;
        if (pt.z > 850) pt.z = 80;
        if (pt.x < -width) pt.x = width;
        if (pt.x > width) pt.x = -width;
        if (pt.y < -height) pt.y = height;
        if (pt.y > height) pt.y = -height;

        // 3D Rotation
        let p3d = { x: pt.x, y: pt.y, z: pt.z };
        p3d = rotateY(p3d, curRotY);
        p3d = rotateX(p3d, curRotX);

        if (p3d.z > 50) {
          const scale = fov / p3d.z;
          const px = p3d.x * scale + cx;
          const py = p3d.y * scale + cy;
          const depthAlpha = Math.max(0.12, Math.min(0.85, 1 - p3d.z / 850));

          projectedParticles.push({
            x: px,
            y: py,
            z: p3d.z,
            size: pt.size * scale * 1.5,
            alpha: depthAlpha,
            colorIndex: pt.colorIndex,
          });

          // Draw particle
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.8, pt.size * scale), 0, Math.PI * 2);

          let fillCol = primaryColor;
          if (pt.colorIndex === 1) fillCol = secondaryColor;
          if (pt.colorIndex === 2) fillCol = tertiaryColor;

          ctx.fillStyle = fillCol;
          ctx.globalAlpha = depthAlpha * (isDark ? 0.75 : 0.6);
          ctx.fill();

          // Subtle glow
          if (depthAlpha > 0.45) {
            ctx.shadowBlur = isDark ? 8 : 4;
            ctx.shadowColor = fillCol;
          } else {
            ctx.shadowBlur = 0;
          }
        }
      }

      ctx.shadowBlur = 0;

      // Draw constellation connective lines
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projectedParticles.length; i++) {
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p1 = projectedParticles[i];
          const p2 = projectedParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * Math.min(p1.alpha, p2.alpha) * (isDark ? 0.28 : 0.18);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${lineAlpha})` : `rgba(13, 148, 136, ${lineAlpha})`;
            ctx.globalAlpha = 1;
            ctx.stroke();
          }
        }
      }

      // --- 3. Draw 3D Floating Polyhedral Geometries ---
      shapes.forEach((shape) => {
        shape.rot.x += shape.speed.x;
        shape.rot.y += shape.speed.y;
        shape.rot.z += shape.speed.z;

        // Apply local rotation to vertices
        const rotatedVerts = octahedronVertices.map((v) => {
          let p = { x: v.x * shape.scale, y: v.y * shape.scale, z: v.z * shape.scale };
          p = rotateX(p, shape.rot.x);
          p = rotateY(p, shape.rot.y);
          p = rotateZ(p, shape.rot.z);

          // Translate to shape world position
          p.x += shape.pos.x;
          p.y += shape.pos.y;
          p.z += shape.pos.z;

          // Camera tilt
          p = rotateY(p, curRotY * 0.8);
          p = rotateX(p, curRotX * 0.8);

          // Project to 2D
          const scale = fov / p.z;
          return {
            x: p.x * scale + cx,
            y: p.y * scale + cy,
            z: p.z,
          };
        });

        // Draw edges of the 3D shape
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = shape.color;
        ctx.globalAlpha = isDark ? 0.45 : 0.35;
        ctx.shadowBlur = isDark ? 10 : 0;
        ctx.shadowColor = shape.color;

        octahedronEdges.forEach(([startIdx, endIdx]) => {
          const p1 = rotatedVerts[startIdx];
          const p2 = rotatedVerts[endIdx];

          if (p1.z > 20 && p2.z > 20) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        // Vertex glow dots
        rotatedVerts.forEach((v) => {
          if (v.z > 20) {
            ctx.beginPath();
            ctx.arc(v.x, v.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = isDark ? 0.8 : 0.6;
            ctx.fill();
          }
        });
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <div className="cyber-3d-bg-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="cyber-3d-canvas" />
      <div className="cyber-3d-vignette" />
    </div>
  );
};

export default Cyber3DBackground;

