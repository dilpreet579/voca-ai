"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="logo-text">VocaAI</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              AI-Powered Customer Service
              <br />
              On Call 24/7
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Features
                </Link>
              </li>

            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Sign Up
                </Link>
              </li>

            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact</h3>
            <address className="not-italic text-gray-600 dark:text-gray-400">
              {/* <p>123 AI Boulevard</p>
              <p>Tech City, TC 10101</p> */}
              <p className="mt-2"><a href="mailto:contact@vocaai.com" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">contact@vocaai.com</a></p>
              <p><a href="tel:+12566346535" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">+1 (256) 634-6535</a></p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {currentYear} VocaAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
