import React from 'react';

interface CreditsScreenProps {
  isActive: boolean;
}

const CreditsScreen: React.FC<CreditsScreenProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="credits-screen fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="credits-bg absolute inset-0" />

      {/* Decorative glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="credits-glow" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8">
        <div className="credits-content">
          {/* Decorative line top */}
          <div className="credits-line credits-line-top" />

          <p className="credits-label">Aplikasi</p>

          <p className="credits-main">
            <span className="credits-word" style={{ animationDelay: '0.15s' }}>Created</span>
            <span className="credits-word" style={{ animationDelay: '0.35s' }}> by</span>
          </p>

          <p className="credits-author" style={{ animationDelay: '0.6s' }}>
            M Rijal Ramdani
          </p>

          {/* Decorative line bottom */}
          <div className="credits-line credits-line-bottom" />
        </div>
      </div>

      {/* Animated particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="credits-particle"
          style={{
            left: `${15 + i * 14}%`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
};

export default CreditsScreen;
