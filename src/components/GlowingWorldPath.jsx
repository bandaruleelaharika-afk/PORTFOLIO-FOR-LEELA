import React, { useEffect, useState } from 'react';
import './GlowingWorldPath.css';

const constellationNodes = [
  { id: 1, top: '12%', left: '18%', delay: '0s', size: 10 },
  { id: 2, top: '22%', left: '82%', delay: '1.2s', size: 12 },
  { id: 3, top: '38%', left: '15%', delay: '2.4s', size: 14 },
  { id: 4, top: '50%', left: '86%', delay: '0.8s', size: 11 },
  { id: 5, top: '65%', left: '12%', delay: '1.8s', size: 13 },
  { id: 6, top: '78%', left: '84%', delay: '2.8s', size: 10 },
  { id: 7, top: '92%', left: '20%', delay: '1.5s', size: 12 },
];

const GlowingWorldPath = () => {
  const [nodes] = useState(constellationNodes);

  return (
    <div className="glowing-world-path-container" aria-hidden="true">
      {/* SVG Canvas for world-class flowing energy paths */}
      <svg
        className="world-path-svg"
        viewBox="0 0 1440 4800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Dark Mode Gradients */}
          <linearGradient id="pathGradientPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#818cf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="glowLaserGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="laserGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="18" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Wide Glow Trace */}
        <path
          className="path-ambient-glow"
          d="M 250 80 
             C 750 400, 1200 600, 1150 1100
             C 1100 1600, 200 1750, 260 2300
             C 320 2850, 1280 2950, 1200 3550
             C 1120 4150, 300 4250, 400 4750"
        />

        {/* Core Crisp Path */}
        <path
          className="path-core-line"
          d="M 250 80 
             C 750 400, 1200 600, 1150 1100
             C 1100 1600, 200 1750, 260 2300
             C 320 2850, 1280 2950, 1200 3550
             C 1120 4150, 300 4250, 400 4750"
        />

        {/* Animated Traveling Laser Pulses */}
        <path
          className="path-traveling-laser laser-1"
          d="M 250 80 
             C 750 400, 1200 600, 1150 1100
             C 1100 1600, 200 1750, 260 2300
             C 320 2850, 1280 2950, 1200 3550
             C 1120 4150, 300 4250, 400 4750"
        />

        <path
          className="path-traveling-laser laser-2"
          d="M 250 80 
             C 750 400, 1200 600, 1150 1100
             C 1100 1600, 200 1750, 260 2300
             C 320 2850, 1280 2950, 1200 3550
             C 1120 4150, 300 4250, 400 4750"
        />

        {/* Secondary Harmonious Wave Path */}
        <path
          className="path-secondary-wave"
          d="M 1200 120
             C 800 650, 300 850, 320 1450
             C 340 2050, 1150 2200, 1120 2750
             C 1090 3300, 250 3450, 300 4050
             C 350 4550, 1050 4650, 1100 4780"
        />
        <path
          className="path-traveling-laser laser-3"
          d="M 1200 120
             C 800 650, 300 850, 320 1450
             C 340 2050, 1150 2200, 1120 2750
             C 1090 3300, 250 3450, 300 4050
             C 350 4550, 1050 4650, 1100 4780"
        />
      </svg>

      {/* Constellation Pulsing Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className="glowing-path-node"
          style={{
            top: node.top,
            left: node.left,
            animationDelay: node.delay,
            width: `${node.size}px`,
            height: `${node.size}px`,
          }}
        >
          <div className="node-core"></div>
          <div className="node-ripple"></div>
          <div className="node-ripple-secondary"></div>
        </div>
      ))}
    </div>
  );
};

export default GlowingWorldPath;
