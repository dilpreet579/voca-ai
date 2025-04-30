"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarDashboard from '@/components/NavbarDashboard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ParticleBackground from '@/components/ParticleBackground';
import useAuth from '@/hooks/useAuth';

export default function ProfilePage() {
  const { session, loading, authenticated } = useAuth({ required: true });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && authenticated) {
      setIsLoading(false);
    }
  }, [loading, authenticated]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <ParticleBackground />
      <NavbarDashboard />
      <div className="flex flex-1 relative z-10 pt-16">
        <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="px-4 py-6 md:px-6 md:py-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Your Profile</h1>
            <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
              Manage your account information and preferences
            </p>
          </div>

          {/* Profile Content */}
          <main className="flex-1 overflow-y-auto px-4 pb-8 md:px-6 md:pb-12">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl mb-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-semibold">
                      {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : session?.user?.firstName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {session?.user?.name || `${session?.user?.firstName || ''} ${session?.user?.lastName || ''}`}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                        VocaAI User
                      </span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                        Active Account
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Account Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">First Name</label>
                      <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        {session?.user?.firstName || session?.user?.name?.split(' ')?.[0] || 'N/A'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Last Name</label>
                      <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        {session?.user?.lastName || 
                          (session?.user?.name && session.user.name.split(' ').length > 1 
                            ? session.user.name.split(' ').slice(1).join(' ') 
                            : 'N/A')}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Email Address</label>
                    <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      {session?.user?.email || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Account Created</label>
                    <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Linked Numbers */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  Your VocaAI Number
                </h3>
                <div className="mt-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-gray-800 dark:text-white">+1 (256) 634-6535</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Your dedicated VocaAI phone number</p>
                      </div>
                      <div className="mt-3 md:mt-0">
                        <a 
                          href="tel:+12566346535" 
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-colors inline-flex items-center"
                        >
                          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Call
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 