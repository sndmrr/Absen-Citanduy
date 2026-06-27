import React from 'react';

interface CreditsScreenProps {
  isActive: boolean;
}

const CreditsScreen: React.FC<CreditsScreenProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="credits-screen fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="credits-bg absolute inset-0" />

      <div className="relative z-10 text-center px-8">
        <div className="credits-content">
          <p className="credits-label">Aplikasi</p>
          <p className="credits-main">
            <span className="credits-word" style={{ animationDelay: '0.1s' }}>Created</span>
            <span className="credits-word" style={{ animationDelay: '0.25s' }}> by</span>
          </p>
          <p className="credits-author" style={{ animationDelay: '0.5s' }}>
            M Rijal Ramdani
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditsScreen;
