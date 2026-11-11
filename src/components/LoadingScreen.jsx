import React, { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';
import localProfileImg from '../assets/profile.jpg';
import { Cpu } from 'lucide-react';
import './LoadingScreen.css';

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { data } = useData();

  const settings = data?.settings?.[0] || {};
  const profileImageSrc = settings.profileImageUrl || localProfileImg;

  useEffect(() => {
    const duration = 1400; // snappy, cinematic duration
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Smooth non-linear acceleration curve
      const ratio = currentStep / steps;
      const eased = Math.min(100, Math.round((Math.sin((ratio - 0.5) * Math.PI) * 0.5 + 0.5) * 100));
      setProgress(eased);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 450);
        }, 220);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className={`loading-screen ${isFadingOut ? 'fade-out' : ''}`}>
      {/* Dynamic 3D Quantum Shockwave Ring */}
      <div className="loading-shockwave-ring" aria-hidden="true"></div>

      {/* Cyber Ambient Radiance */}
      <div className="loading-bg-glow orb-left"></div>
      <div className="loading-bg-glow orb-right"></div>

      <div className="loading-content">
        {/* Holographic 3D Avatar Centerpiece with Multi-Axis Rings */}
        <div className="loading-avatar-hub">
          <div className="loading-orbit ring-outer"></div>
          <div className="loading-orbit ring-middle"></div>
          <div className="loading-orbit ring-inner"></div>
          <div className="loading-orbit ring-pulse"></div>

          <div className="loading-avatar-frame">
            <img src={profileImageSrc} alt="Leela Harika" className="loading-avatar-img" />
            <div className="loading-scanline-laser"></div>
            <div className="loading-avatar-sheen"></div>
          </div>
        </div>

        {/* Name and Subtitle */}
        <div className="loading-text-group">
          <h1 className="loading-title">
            <span className="loading-title-glow">BANDARU</span> LEELA HARIKA
          </h1>
          <p className="loading-subtitle">
            <Cpu size={14} className="loading-icon-inline" /> MCA • AI & MACHINE LEARNING • FULL STACK
          </p>
        </div>

        {/* Progress Bar */}
        <div className="loading-bar-wrapper">
          <div className="loading-counter-row">
            <span className="loading-percentage">{progress}%</span>
          </div>

          <div className="loading-progress-track">
            <div
              className="loading-progress-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="loading-laser-head"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
