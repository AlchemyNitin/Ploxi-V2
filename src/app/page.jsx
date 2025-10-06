'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import LocationIndustrySelector from '@/components/common/LocationIndustrySelector';

export default function LandingPage() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  // Handle selection changes from LocationIndustrySelector
  const handleSelectionChange = (selection) => {
    console.log('Selection received:', selection);
    
    // Navigate to dashboard when all three are selected
    if (selection.location && selection.industry && selection.framework) {
      setIsNavigating(true);
      
      // Save to localStorage for persistence
      localStorage.setItem('dashboardConfig', JSON.stringify(selection));
      
      // Navigate to dynamic dashboard route
      const dashboardUrl = `/dashboard/${selection.location.id}/${selection.industry.id}/${selection.framework.id}`;
      
      setTimeout(() => {
        router.push(dashboardUrl);
      }, 500); // Brief delay for UX
    }
  };

  // Load saved configuration on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('dashboardConfig');
    if (savedConfig) {
      // Could pre-populate the selector here if needed
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="https://i.postimg.cc/QM8fvftG/IMG-20250819-WA0002.jpg"
                alt="Ploxi Consults Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain rounded-md"
                priority
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Ploxi Sustainability Platform
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                  Empowering organizations with ESG metrics and trusted vendor solutions.
                </p>
              </div>
            </div>

            {/* Registration CTA in Header */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Navigate Your Sustainability Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get personalized ESG insights, discover verified solution providers, and accelerate your organization's 
              sustainability transformation with our intelligent consulting platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/register"
                className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Start Your Corporate Registration
              </Link>
              <button
                onClick={() => document.getElementById('quick-start').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                Quick Assessment
              </button>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Analytics</h3>
                <p className="text-gray-600">
                  AI-powered sustainability metrics tailored to your industry and reporting framework.
                </p>
              </div>
              
              <div className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Compliance</h3>
                <p className="text-gray-600">
                  Support for BRSR, GRI, SASB, TCFD, and ESRS frameworks across multiple regions.
                </p>
              </div>
              
              <div className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted Network</h3>
                <p className="text-gray-600">
                  Access our curated marketplace of verified sustainability solution providers.
                </p>
              </div>
            </div>
          </div>

          {/* Configuration Section */}
          <div id="quick-start" className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quick Start Assessment
              </h3>
              <div className="flex justify-center items-center space-x-8 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                  <span className="text-gray-700">Choose Location</span>
                </div>
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                  <span className="text-gray-700">Select Industry</span>
                </div>
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                  <span className="text-gray-700">Pick Framework</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                For a full corporate account with data persistence and expert support,
              </p>
              <Link
                href="/register"
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Complete Corporate Registration →
              </Link>
            </div>

            {/* Navigation Loading State */}
            {isNavigating && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 text-center">
                  <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Preparing Your Dashboard</h3>
                  <p className="text-gray-600">Setting up personalized ESG insights...</p>
                </div>
              </div>
            )}

            {/* Location Industry Selector */}
            <LocationIndustrySelector
              onSelectionChange={handleSelectionChange}
              className="mb-12"
            />

            {/* Call to Action */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Complete your configuration above for an instant preview, or register for full access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-8">
            Trusted by organizations worldwide for ESG excellence
          </h3>
          <div className="flex justify-center items-center space-x-8 text-2xl opacity-60">
            <span>🏭</span>
            <span>🏦</span>
            <span>🏥</span>
            <span>🏫</span>
            <span>🚛</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image
                src="https://i.postimg.cc/QM8fvftG/IMG-20250819-WA0002.jpg"
                alt="Ploxi Consults"
                width={32}
                height={32}
                className="h-8 w-8 object-contain rounded"
              />
              <span className="text-gray-300">© 2025 Ploxi Consults. All rights reserved.</span>
            </div>
            <div className="text-gray-400">
              Bangalore, India • Sustainability Consulting • ESG Solutions
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}