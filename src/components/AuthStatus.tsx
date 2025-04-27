"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function AuthStatus() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (status === "loading") {
    return <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center space-x-4">
        <Link 
          href="/login"
          className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          Log in
        </Link>
        <Link 
          href="/signup"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
          {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
          {session?.user?.name || 'User'}
        </span>
      </button>

      {isDropdownOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700">
            <p className="font-medium">{session?.user?.name}</p>
            <p className="text-gray-500 dark:text-gray-400 truncate">{session?.user?.email}</p>
          </div>
          <Link 
            href="/dashboard" 
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            role="menuitem"
            onClick={() => setIsDropdownOpen(false)}
          >
            Dashboard
          </Link>
          <button
            onClick={() => {
              signOut({ callbackUrl: '/' });
              setIsDropdownOpen(false);
            }}
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
