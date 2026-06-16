import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(timer); return 100; }
        return p + 1.2;
      });
    }, 30);
    const phaseTimer1 = setTimeout(() => setPhase(1), 600);
    const phaseTimer2 = setTimeout(() => setPhase(2), 1400);
    const phaseTimer3 = setTimeout(() => setPhase(3), 2200);
    return () => {
      clearInterval(timer);
      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);
      clearTimeout(phaseTimer3);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="splash-screen fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Layered background */}
      <div className="splash-bg-layer1 absolute inset-0" />
      <div className="splash-bg-layer2 absolute inset-0" />
      <div className="splash-bg-layer3 absolute inset-0" />

      {/* Decorative circles */}
      <div className="splash-circle splash-circle-1 absolute" />
      <div className="splash-circle splash-circle-2 absolute" />
      <div className="splash-circle splash-circle-3 absolute" />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="splash-particle absolute"
          style={{
            left: `${8 + (i * 7.5) % 85}%`,
            top: `${10 + (i * 11) % 75}%`,
            animationDelay: `${(i * 0.25) % 2}s`,
            animationDuration: `${3 + (i % 3)}s`,
            width: i % 3 === 0 ? '8px' : i % 3 === 1 ? '5px' : '3px',
            height: i % 3 === 0 ? '8px' : i % 3 === 1 ? '5px' : '3px',
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-8 w-full max-w-xs">

        {/* Tree illustration */}
        <div className="splash-tree-container mb-6">
          {/* Ground */}
          <div className="splash-ground" />

          {/* Trunk */}
          <div className="splash-trunk" style={{ height: phase >= 1 ? '56px' : '0px' }} />

          {/* Branch left */}
          <div
            className="splash-branch splash-branch-left"
            style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'rotate(-35deg) scaleX(1)' : 'rotate(-35deg) scaleX(0)' }}
          />

          {/* Branch right */}
          <div
            className="splash-branch splash-branch-right"
            style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'rotate(35deg) scaleX(1)' : 'rotate(35deg) scaleX(0)' }}
          />

          {/* Canopy layers */}
          <div
            className="splash-canopy splash-canopy-bottom"
            style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'scale(1)' : 'scale(0)' }}
          />
          <div
            className="splash-canopy splash-canopy-mid"
            style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'scale(1)' : 'scale(0)' }}
          />
          <div
            className="splash-canopy splash-canopy-top"
            style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'scale(1)' : 'scale(0)' }}
          />

          {/* Fruit dots */}
          {phase >= 3 && (
            <>
              <div className="splash-fruit" style={{ left: '28%', top: '32%' }} />
              <div className="splash-fruit splash-fruit-alt" style={{ left: '58%', top: '28%' }} />
              <div className="splash-fruit" style={{ left: '45%', top: '45%' }} />
            </>
          )}

          {/* Leaf particles */}
          {phase >= 2 && [0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="splash-leaf-particle"
              style={{
                left: `${20 + i * 18}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Logo image */}
        <div className="splash-logo-ring mb-5">
          <img
            src="https://i.postimg.cc/ZnWHPbw9/T4-T-Logo-Baru-2-1.jpg"
            alt="Logo"
            className="splash-logo-img"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        {/* Title */}
        <div className="text-center mb-1" style={{ opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <h1 className="splash-title">YAYASAN BUMI</h1>
          <h1 className="splash-title splash-title-accent">HIJAU LESTARI</h1>
        </div>

        {/* Tagline */}
        <p className="splash-tagline mb-6" style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}>
          Planting Trees for Tomorrow
        </p>

        {/* Progress bar */}
        <div className="splash-progress-track">
          <div
            className="splash-progress-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Loading dots */}
        <div className="flex items-center space-x-1.5 mt-4">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="splash-dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Status text */}
        <p className="splash-status mt-3" style={{ opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          {phase < 2 ? 'Memuat aplikasi...' : phase < 3 ? 'Menyiapkan data...' : 'Hampir selesai...'}
        </p>
      </div>

      {/* Bottom wave */}
      <div className="splash-bottom-wave absolute bottom-0 left-0 right-0" />
    </div>
  );
};

export default LoadingScreen;
