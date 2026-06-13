"use client";

import React from 'react';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-indigo-600 dark:bg-indigo-800">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6 text-white">Ready to Transform Your Customer Service?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join hundreds of businesses that have revolutionized their customer service with VocaAI. Get started today and see the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white hover:bg-gray-100 text-indigo-600 font-medium py-3 px-8 rounded-md transition-all duration-300 text-lg">
              Get Started
            </Link>
            <Link href="/contact" className="bg-transparent hover:bg-indigo-700 text-white border border-white font-medium py-3 px-8 rounded-md transition-all duration-300 text-lg">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
