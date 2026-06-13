"use client";

import React from 'react';
import Image from 'next/image';

const features = [
  {
    title: "24/7 Customer Service",
    description: "Our AI voice agents handle customer inquiries around the clock, ensuring your business is always available.",
    icon: "/icons/24-hours.svg"
  },
  {
    title: "Smart Appointment Scheduling",
    description: "Automatically schedule and manage appointments without any human intervention.",
    icon: "/icons/calendar.svg"
  },
  {
    title: "Personalized Responses",
    description: "AI agents are configured to your business needs and respond with your brand voice.",
    icon: "/icons/chat.svg"
  },
  {
    title: "Secure Data Handling",
    description: "All customer data is encrypted and securely stored, accessible only to your business.",
    icon: "/icons/shield.svg"
  },
  {
    title: "Seamless Integration",
    description: "Easily integrate with your existing systems and workflows.",
    icon: "/icons/integration.svg"
  },
  {
    title: "Detailed Analytics",
    description: "Get insights into customer interactions and service performance.",
    icon: "/icons/analytics.svg"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 text-gray-900 dark:text-white">Powerful Features for Your Business</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            VocaAI comes packed with everything you need to automate and enhance your customer service experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-indigo-600 dark:bg-indigo-700 rounded-full flex items-center justify-center mb-6">
                <div className="relative w-8 h-8">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain brightness-0 invert"
                  />
                </div>
              </div>
              <h3 className="heading-sm mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
