"use client";

import React from 'react';
import Link from 'next/link';
import ParticleBackground from './ParticleBackground';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ParticleBackground />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="heading-xl mb-6 text-gray-900 dark:text-white">
              Meet VocaAI – Your AI-Powered Customer Service, On Call 24/7
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              VocaAI gives your business a dedicated number with a smart voice agent that schedules, responds, and organizes — all automatically.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link href="/signup" className="btn-primary text-center text-lg py-3 px-8">
                Get Started
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative h-[500px] w-full">
              {/* Particle background is rendered as the background */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
