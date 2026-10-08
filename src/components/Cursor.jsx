import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Cursor.css';

const Cursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  const cursorRef = useRef(null);
  const trailContainerRef = useRef(null);

  useEffect(() => {
    // Check if it's a touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    if (isAdminRoute) return;

    let trailDrops = [];
    const maxDrops = 8;
    let mouseX = 0;
    let mouseY = 0;
    let lastDropTime = 0;
    let animationFrameId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }

      const now = Date.now();
      // Only create a drop if mouse moved enough or time passed to prevent too many elements
      if (now - lastDropTime > 35) {
        createTrailDrop(mouseX, mouseY);
        lastDropTime = now;
      }
    };

    const createTrailDrop = (x, y) => {
      if (!trailContainerRef.current) return;
      
      const drop = document.createElement('div');
      drop.className = 'water-trail-drop';
      drop.style.left = `${x}px`;
      drop.style.top = `${y}px`;
      
      trailContainerRef.current.appendChild(drop);
      trailDrops.push({ el: drop, createdAt: Date.now() });

      if (trailDrops.length > maxDrops) {
        const oldDrop = trailDrops.shift();
        if (oldDrop.el.parentNode) {
          oldDrop.el.parentNode.removeChild(oldDrop.el);
        }
      }

      // Self cleanup after animation ends (600ms)
      setTimeout(() => {
        if (drop.parentNode) {
          drop.parentNode.removeChild(drop);
        }
        trailDrops = trailDrops.filter(d => d.el !== drop);
      }, 600);
    };

    const onClick = (e) => {
      if (!trailContainerRef.current) return;
      const ripple = document.createElement('div');
      ripple.className = 'water-ripple-click';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      trailContainerRef.current.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAdminRoute]);

  if (isTouchDevice || isAdminRoute) return null;

  return (
    <>
      <div className="water-cursor-main" ref={cursorRef}>
        <div className="water-drop-shape"></div>
      </div>
      <div className="water-cursor-trails" ref={trailContainerRef}></div>
    </>
  );
};

export default Cursor;
