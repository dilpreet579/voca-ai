"use client";

import React, { useState, useEffect } from 'react';

interface ParticleProps {
  left: string;
  top: string;
  width: string;
  height: string;
  animationDuration: string;
  animationDelay: string;
  opacity: string;
}

// Simple particle background component
const ParticleBackground = () => {
  // Use state to store particles and initialize with empty array
  const [particles, setParticles] = useState<ParticleProps[]>([]);

  // Generate particles only on the client side to avoid hydration errors
  useEffect(() => {
    const generatedParticles = Array.from({ length: 80 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 6 + 2}px`,
      height: `${Math.random() * 6 + 2}px`,
      animationDuration: `${Math.random() * 15 + 10}s`,
      animationDelay: `${Math.random() * 8}s`,
      opacity: `${Math.random() * 0.5 + 0.3}`,
    }));
    
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="particle-background">
      {particles.map((style, i) => (
        <div
          key={i}
          className="particle"
          style={style}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;