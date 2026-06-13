"use client";

import React from 'react';
import Link from 'next/link';

const pricingPlans = [
  {
    name: "Starter",
    price: "$99",
    period: "per month",
    description: "Perfect for small businesses just getting started with automated customer service.",
    features: [
      "1 AI Voice Agent",
      "Up to 100 calls per month",
      "Basic appointment scheduling",
      "Email support",
      "Standard reporting"
    ],
    cta: "Get Started",
    highlighted: false
  },
  {
    name: "Business",
    price: "$299",
    period: "per month",
    description: "Ideal for growing businesses with moderate customer service needs.",
    features: [
      "3 AI Voice Agents",
      "Up to 500 calls per month",
      "Advanced appointment scheduling",
      "Priority email support",
      "Detailed analytics",
      "CRM integration"
    ],
    cta: "Get Started",
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored pricing",
    description: "For large organizations with complex customer service requirements.",
    features: [
      "Unlimited AI Voice Agents",
      "Unlimited calls",
      "Full-featured appointment system",
      "24/7 priority support",
      "Advanced analytics & reporting",
      "Custom integrations",
      "Dedicated account manager"
    ],
    cta: "Contact Sales",
    highlighted: false
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 text-gray-900 dark:text-white">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the plan that works best for your business needs. All plans include our core AI voice technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
                plan.highlighted ? 'ring-2 ring-indigo-600 dark:ring-indigo-400' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="bg-indigo-600 text-white text-center py-2 font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="heading-md mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-300"> {plan.period}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={plan.name === "Enterprise" ? "/contact" : "/signup"} 
                  className={`w-full text-center block py-3 px-6 rounded-md font-medium transition-colors duration-300 ${
                    plan.highlighted 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-600'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
