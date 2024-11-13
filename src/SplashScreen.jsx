import React, { useEffect, useState } from 'react';
import './css/plashScreen.css';
import LogoM from './img/LogoM.png';

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simula la pantalla de introducción durante 3 segundos
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? (
        <div className="splash-screen">
          <div className="splash-logo-container">
            <div className="glow-circle">
              <img src={LogoM} alt="EduControl Logo" className="splash-logo" />
            </div>
          </div>
          <h1 className="splash-title">Bienvenido...</h1>
        </div>
      ) : null}
    </>
  );
};

export default SplashScreen;