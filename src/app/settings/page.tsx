"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarDashboard from '@/components/NavbarDashboard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ParticleBackground from '@/components/ParticleBackground';
import useAuth from '@/hooks/useAuth';

export default function SettingsPage() {
  const { session, loading, authenticated } = useAuth({ required: true });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ai');
  const router = useRouter();
  
  // Form states
  const [aiSettings, setAiSettings] = useState({
    companyName: '',
    companySize: 'small',
    agentScript: ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    callSummaries: true,
    marketingEmails: false
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: '', message: '' });
  
  // Load user settings
  useEffect(() => {
    if (!loading && authenticated) {
      setIsLoading(false);
      // You would normally fetch these from your API
      // For now, we'll use placeholder data
      setAiSettings({
        companyName: 'Your Company',
        companySize: 'small',
        agentScript: 'You are a helpful assistant for our company. Please be professional and friendly when answering calls.'
      });
    }
  }, [loading, authenticated]);
  
  // Handle save settings
  const handleSaveAISettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage({ type: '', message: '' });
    
    try {
      // Call your API to save settings
      const response = await fetch('/api/setup-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aiSettings),
      });
      
      if (response.ok) {
        setSaveMessage({ type: 'success', message: 'AI settings saved successfully!' });
      } else {
        const data = await response.json();
        setSaveMessage({ type: 'error', message: data.error || 'Failed to save settings.' });
      }
    } catch (error) {
      setSaveMessage({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'An error occurred while saving settings.' 
      });
    } finally {
      setIsSaving(false);
      // Clear message after 5 seconds
      setTimeout(() => {
        setSaveMessage({ type: '', message: '' });
      }, 5000);
    }
  };
  
  const handleSaveNotificationSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage({ type: '', message: '' });
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage({ type: 'success', message: 'Notification settings saved successfully!' });
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setSaveMessage({ type: '', message: '' });
      }, 5000);
    }, 1000);
  };

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
          {/* Settings Header */}
          <div className="px-4 py-6 md:px-6 md:py-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Settings</h1>
            <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
              Customize your VocaAI experience
            </p>
          </div>

          {/* Settings Content */}
          <main className="flex-1 overflow-y-auto px-4 pb-8 md:px-6 md:pb-12">
            <div className="max-w-4xl mx-auto">
              {/* Settings Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'ai'
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  AI Configuration
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'notifications'
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'account'
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Account
                </button>
              </div>

              {/* Status Message */}
              {saveMessage.message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  saveMessage.type === 'success' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                }`}>
                  {saveMessage.message}
                </div>
              )}

              {/* AI Configuration Settings */}
              {activeTab === 'ai' && (
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <svg className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    AI Configuration
                  </h3>
                  <form onSubmit={handleSaveAISettings}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
                          value={aiSettings.companyName}
                          onChange={(e) => setAiSettings({...aiSettings, companyName: e.target.value})}
                          placeholder="Your Company Name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Company Size
                        </label>
                        <select
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
                          value={aiSettings.companySize}
                          onChange={(e) => setAiSettings({...aiSettings, companySize: e.target.value})}
                          required
                        >
                          <option value="small">Small (1-10 employees)</option>
                          <option value="medium">Medium (11-50 employees)</option>
                          <option value="large">Large (51-200 employees)</option>
                          <option value="enterprise">Enterprise (200+ employees)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          AI Agent Instructions
                        </label>
                        <textarea
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent h-40"
                          value={aiSettings.agentScript}
                          onChange={(e) => setAiSettings({...aiSettings, agentScript: e.target.value})}
                          placeholder="Instructions for how your AI assistant should behave..."
                          required
                        />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          These instructions will guide how your AI assistant interacts with callers.
                        </p>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-colors flex items-center"
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <>
                              <LoadingSpinner size="small" />
                              <span className="ml-2">Saving...</span>
                            </>
                          ) : 'Save Changes'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <svg className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    Notification Preferences
                  </h3>
                  <form onSubmit={handleSaveNotificationSettings}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Receive notifications about calls and activities via email</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            name="emailNotifications"
                            id="emailNotifications"
                            checked={notificationSettings.emailNotifications}
                            onChange={() => setNotificationSettings({
                              ...notificationSettings,
                              emailNotifications: !notificationSettings.emailNotifications
                            })}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:right-0 checked:border-indigo-600 dark:checked:border-indigo-400"
                          />
                          <label
                            htmlFor="emailNotifications"
                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer"
                          ></label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Call Summaries</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Receive summaries of calls handled by your AI assistant</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            name="callSummaries"
                            id="callSummaries"
                            checked={notificationSettings.callSummaries}
                            onChange={() => setNotificationSettings({
                              ...notificationSettings,
                              callSummaries: !notificationSettings.callSummaries
                            })}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:right-0 checked:border-indigo-600 dark:checked:border-indigo-400"
                          />
                          <label
                            htmlFor="callSummaries"
                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer"
                          ></label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Marketing Emails</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Receive promotional emails about VocaAI features and updates</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            name="marketingEmails"
                            id="marketingEmails"
                            checked={notificationSettings.marketingEmails}
                            onChange={() => setNotificationSettings({
                              ...notificationSettings,
                              marketingEmails: !notificationSettings.marketingEmails
                            })}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:right-0 checked:border-indigo-600 dark:checked:border-indigo-400"
                          />
                          <label
                            htmlFor="marketingEmails"
                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer"
                          ></label>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-colors flex items-center"
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <>
                              <LoadingSpinner size="small" />
                              <span className="ml-2">Saving...</span>
                            </>
                          ) : 'Save Changes'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Account Settings */}
              {activeTab === 'account' && (
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <svg className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    Account Settings
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</h4>
                      <button className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors">
                        Change Password
                      </button>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subscription</h4>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-white">Free Plan</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">You are currently on the free plan</p>
                          </div>
                          <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-sm transition-colors">
                            Upgrade
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Danger Zone</h4>
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800/30">
                        <p className="text-sm text-red-600 dark:text-red-400 mb-3">Once you delete your account, there is no going back. Please be certain.</p>
                        <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 