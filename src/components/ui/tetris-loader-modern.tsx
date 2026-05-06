'use client';
import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  speed?: 'slow' | 'normal' | 'fast';
  text?: string;
}

export const TetrisLoaderModern: React.FC<LoaderProps> = ({
  text = 'Analizando tu perfil...',
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '2rem',
      background: 'rgba(10,10,10,0.85)',
      borderRadius: '16px',
      border: '1px solid rgba(201,168,76,0.2)',
      backdropFilter: 'blur(10px)',
    }}>
      <style>{`
        .cvitae-loader {
          --duration: 2.8s;
          --primary: #c9a84c;
          --primary-light: #e8d4a0;
          width: 160px;
          height: 260px;
          position: relative;
          transform-style: preserve-3d;
        }
        .cvitae-box {
          position: absolute;
          left: 50%;
          top: 50%;
          transform-style: preserve-3d;
          animation: cvitae-box var(--duration) ease infinite;
        }
        .cvitae-box div {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 3px;
        }
        .cvitae-box div:nth-child(1) {
          transform: translateZ(22px);
          background: var(--primary-light);
        }
        .cvitae-box div:nth-child(2) {
          transform: rotateY(90deg) translateZ(22px);
          background: var(--primary);
          filter: brightness(0.85);
        }
        .cvitae-box div:nth-child(3) {
          transform: rotateX(-90deg) translateZ(22px);
          background: var(--primary);
          filter: brightness(0.65);
        }
        .cvitae-box div:nth-child(4) {
          transform: translateZ(-22px) rotateY(180deg);
          background: rgba(201,168,76,0.25);
        }
        .cvitae-box div:nth-child(5) {
          transform: rotateY(-90deg) translateZ(-22px) rotateY(180deg);
          background: rgba(201,168,76,0.15);
        }
        .cvitae-box div:nth-child(6) {
          transform: rotateX(90deg) translateZ(-22px) rotateX(-180deg);
          background: rgba(201,168,76,0.1);
        }
        .b1 { --x: -50px; --y: -72px; animation-delay: 0s; }
        .b2 { --x: 6px;  --y: -72px; animation-delay: 0.1s; }
        .b3 { --x: -50px; --y: -14px; animation-delay: 0.2s; }
        .b4 { --x: 6px;  --y: -14px; animation-delay: 0.3s; }
        .b5 { --x: -50px; --y: 44px; animation-delay: 0.4s; }
        .b6 { --x: 6px;  --y: 44px; animation-delay: 0.5s; }
        .b7 { --x: -108px; --y: -14px; animation-delay: 0.15s; }
        .b8 { --x: 64px;  --y: -14px; animation-delay: 0.35s; }
        @keyframes cvitae-box {
          0% {
            transform: translate(var(--x), calc(var(--y) - 60px))
              rotateY(-47.5deg) rotateX(-15deg) rotateZ(15deg)
              scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          50% {
            transform: translate(var(--x), var(--y))
              rotateY(-47.5deg) rotateX(-15deg) rotateZ(15deg)
              scale(1);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), calc(var(--y) + 20px))
              rotateY(-47.5deg) rotateX(-15deg) rotateZ(15deg)
              scale(1);
            opacity: 0;
          }
        }
        .cvitae-loader-text {
          color: #c9a84c;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          animation: cvitae-pulse 2s ease-in-out infinite;
        }
        @keyframes cvitae-pulse {
          0%,100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="cvitae-loader">
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className={`cvitae-box b${i}`}>
            <div/><div/><div/><div/><div/><div/>
          </div>
        ))}
      </div>

      {text && (
        <div className="cvitae-loader-text">{text}</div>
      )}
    </div>
  );
};

export default TetrisLoaderModern;
