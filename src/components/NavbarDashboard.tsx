"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const NavbarDashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm dark:bg-gray-900 fixed top-0 left-0 right-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="logo-text">VocaAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="relative group">
              <button className="flex items-center focus:outline-none">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                  {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : session?.user?.firstName?.charAt(0).toUpperCase() || 'U'}
                </div>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700">
                  <p className="font-medium">{session?.user?.name || `${session?.user?.firstName || ''} ${session?.user?.lastName || ''}`}</p>
                  <p className="text-gray-500 dark:text-gray-400 truncate">{session?.user?.email}</p>
                </div>
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Settings
                </Link>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4 pb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-semibold">
                  {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : session?.user?.firstName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800 dark:text-white">
                    {session?.user?.name || `${session?.user?.firstName || ''} ${session?.user?.lastName || ''}`}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{session?.user?.email}</p>
                </div>
              </div>

              <Link href="/profile" className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Profile
              </Link>
              <Link href="/settings" className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                Settings
              </Link>
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
              <button 
                onClick={handleLogout}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarDashboard;
