"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

export default function SetupAIPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [agentScript, setAgentScript] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit the AI agent configuration to the backend
      const response = await fetch('/api/setup-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          companySize,
          agentScript,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save AI configuration');
      }
      
      // Redirect to dashboard after successful setup
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error setting up AI:', error);
      alert(`Error setting up AI: ${error.message || 'Something went wrong'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        <ParticleBackground />
        <div className="w-[90%] sm:w-full max-w-2xl p-6 sm:p-8 space-y-6 sm:space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-md mx-4 sm:mx-0 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Set Up Your AI Agent</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Just two steps to get started with VocaAI.
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Name
                </label>
                <div className="mt-1">
                  <input
                    id="company-name"
                    name="company-name"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., MindCare Clinic"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company-size" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Size
                </label>
                <div className="mt-1">
                  <select
                    id="company-size"
                    name="company-size"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                  >
                    <option value="" disabled>Select company size</option>
                    <option value="solo">Solo / Freelancer</option>
                    <option value="small">Small Team (2–10)</option>
                    <option value="medium">Medium (11–50)</option>
                    <option value="large">Large (50+)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="agent-script" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI Agent Behavior & Script
                </label>
                <div className="mt-1">
                  <textarea
                    id="agent-script"
                    name="agent-script"
                    rows={8}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., You are an AI receptionist for MindCare Clinic. Greet the caller with Welcome to MindCare Clinic. Your role is to collect the patient's name, their preferred date and time for an appointment, and the reason for their visit. Ask one question at a time to ensure clarity. Do not ask for additional contact information, and assume the doctor is available. Be attentive to names — confirm if you're unsure. Maintain a calm, friendly, and professional tone. Ask follow-up questions only if needed to clarify the patient's concern or appointment details."
                    value={agentScript}
                    onChange={(e) => setAgentScript(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Setting up your AI...' : 'Complete Setup'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
