"use client";

import React, { useState, useEffect } from 'react';
import NavbarDashboard from '@/components/NavbarDashboard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ParticleBackground from '@/components/ParticleBackground';
import useAuth from '@/hooks/useAuth';

export default function DashboardPage() {
  const { session, loading, authenticated } = useAuth({ required: true });
  const [isLoading, setIsLoading] = useState(true);
  const [callStats, setCallStats] = useState({ totalCalls: 0, issuesSolved: 0 });
  
  // Initialize counter from localStorage or set to 0 if not present
  const [viewAllClickCount, setViewAllClickCount] = useState(0);
  
  // Load the click count from localStorage when the component mounts
  useEffect(() => {
    const storedCount = localStorage.getItem('viewAllClickCount');
    if (storedCount === null) {
      setViewAllClickCount(0);
      setCallStats(prev => ({ ...prev, totalCalls: 0 }));
      localStorage.setItem('viewAllClickCount', '0');
    } else {
      setViewAllClickCount(parseInt(storedCount, 10));
      setCallStats(prev => ({ ...prev, totalCalls: parseInt(storedCount, 10) }));
    }
  }, []);
  
  // Function to handle the 'View All' button click
  const handleViewAllClick = () => {
    const newCount = viewAllClickCount + 1;
    setViewAllClickCount(newCount);
    setCallStats(prev => ({ ...prev, totalCalls: newCount }));
    localStorage.setItem('viewAllClickCount', newCount.toString());
  };
  
  // Fetch call statistics from the API (keeping this for future integration)
  useEffect(() => {
    // Once authentication check is complete and user is authenticated, stop loading
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
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="px-4 py-6 md:px-6 md:py-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Dashboard</h1>
            <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
              Welcome back, <span className="font-medium text-indigo-600 dark:text-indigo-400">{session?.user?.firstName || session?.user?.name?.split(' ')[0] || 'User'}</span> to your VocaAI dashboard
            </p>
          </div>
          
          {/* Dashboard Content */}
          <main className="flex-1 overflow-y-auto px-4 pb-8 md:px-6 md:pb-12">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-bl-full -z-10"></div>
                <div className="flex flex-col items-center text-center relative">
                  <div className="p-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-800 mb-4 shadow-lg">
                    <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Your Allotted Number</h2>
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-3">+1 (256) 634-6535</p>
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                      This is your dedicated VocaAI phone number. Your customers can call this number to interact with your AI assistant.
                    </p>
                  </div>
                  <div className="mt-4 flex justify-center w-full">
                    <a 
                      href="tel:+12566346535" 
                      className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-md transition-all flex items-center justify-center"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Test Call
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-center relative">
                    <div className="p-3 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-800 shadow-md">
                      <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Calls</h2>
                      <p className="text-2xl font-semibold text-gray-800 dark:text-white">{callStats.totalCalls}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                          <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                          </svg>
                          +{callStats.totalCalls}% this month
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 dark:from-green-500/10 dark:to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-center relative">
                    <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-800 shadow-md">
                      <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Issues Solved</h2>
                      {/* <p className="text-2xl font-semibold text-gray-800 dark:text-white">{callStats.issuesSolved}</p> */}
                      <p className="text-2xl font-semibold text-gray-800 dark:text-white">0</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                          <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                          </svg>
                          +0% this month
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Sections */}
            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                    <svg className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Scheduled Appointments
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        localStorage.removeItem('viewAllClickCount');
                        setViewAllClickCount(0);
                        setCallStats(prev => ({ ...prev, totalCalls: 0 }));
                      }}
                      className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center opacity-0"
                    >
                      <span>Reset Counter</span>
                      <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <button 
                      onClick={handleViewAllClick}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors flex items-center"
                    >
                      <span>View all</span>
                      <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                  </div>
                </div>
                <div className="overflow-hidden h-[500px] w-full rounded-lg border border-gray-100 dark:border-gray-700">
                  <iframe 
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTP7plgN46sxUjIMb_eYycr4NfmMGIcbaoJsF20LpY9nixF4uYf3v-ukelP4RkyyvmKtx7dvlNtTjEY/pubhtml?widget=true&amp;headers=false" 
                    className="w-full h-full"
                    title="Scheduled Appointments Spreadsheet"
                  ></iframe>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
