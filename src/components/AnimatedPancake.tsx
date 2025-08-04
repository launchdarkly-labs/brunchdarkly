import React from 'react';

export const AnimatedPancake: React.FC = () => {
  return (
    <div className="relative">
      <div className="pancake-stack">
        <div className="pancake pancake-1">🥞</div>
        <div className="pancake pancake-2">🥞</div>
        <div className="pancake pancake-3">🥞</div>
      </div>
      
      <style jsx>{`
        .pancake-stack {
          position: relative;
          width: 32px;
          height: 32px;
        }
        
        .pancake {
          position: absolute;
          font-size: 24px;
          animation: flip 3s ease-in-out infinite;
        }
        
        .pancake-1 {
          animation-delay: 0s;
        }
        
        .pancake-2 {
          animation-delay: 1s;
        }
        
        .pancake-3 {
          animation-delay: 2s;
        }
        
        @keyframes flip {
          0%, 80%, 100% { 
            transform: rotateY(0deg) scale(1);
            opacity: 1;
          }
          10% { 
            transform: rotateY(180deg) scale(1.1);
            opacity: 0.8;
          }
          20% { 
            transform: rotateY(360deg) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};