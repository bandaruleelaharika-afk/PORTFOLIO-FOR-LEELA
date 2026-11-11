import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Cursor.css';

const Cursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Mouse coords & Lerp coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    if (isAdminRoute) return;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      setIsVisible(true);

      // Instantly position the center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Dynamic hover detection for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.btn') ||
        target.closest('.card') ||
        target.closest('.floating-badge') ||
        target.closest('.skill-showcase-card') ||
        target.closest('.internship-showcase-card') ||
        target.closest('.cert-gallery-card') ||
        target.closest('.interactive-target') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Smooth LERP loop for outer ring
    const render = () => {
      // Lerp factor: 0.22 gives instant responsiveness with buttery-smooth fluid trailing feel
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isAdminRoute]);

  if (isTouchDevice || isAdminRoute) return null;

  return (
    <>
      {/* Precision Crystal Dot */}
      <div
        ref={dotRef}
        className={`neo-cursor-dot ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
      />

      {/* Fluid Glowing Ring & Aura */}
      <div
        ref={ringRef}
        className={`neo-cursor-ring ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
      >
        <div className="cursor-ring-pulse"></div>
      </div>
    </>
  );
};

export default Cursor;
