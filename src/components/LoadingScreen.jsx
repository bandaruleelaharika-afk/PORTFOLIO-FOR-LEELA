import React, { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';
import localProfileImg from '../assets/profile.jpg';
import './LoadingScreen.css';

const LoadingScreen = ({ onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { data } = useData();

  const settings = data?.settings?.[0] || {};
  const profileImageSrc = settings.profileImageUrl || localProfileImg;

  useEffect(() => {
    // Total duration ~ 1800ms. Fade out starts at 1500ms.
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 300); // 300ms fade out
    }, 1500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`loading-screen ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-profile-container">
          <div className="loading-profile-wrapper">
            <img src={profileImageSrc} alt="Loading" className="loading-profile-img" />
          </div>
        </div>
        
        <h2 className="loading-name">Leela Harika</h2>

        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
