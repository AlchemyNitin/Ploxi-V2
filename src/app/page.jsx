'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Shield,
  Users,
  ChevronDown
} from 'lucide-react';
import LocationIndustrySelector from '@/components/common/LocationIndustrySelector';

export default function LandingPage() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  // Handle selection changes - unified approach
  const handleSelectionChange = (selection) => {
    console.log('Selection received:', selection);
    navigateToDashboard(selection);
  };

  const handleComplete = (selection) => {
    console.log('Complete received:', selection);
    navigateToDashboard(selection);
  };

  const onComplete = (location, industry, framework) => {
    console.log('OnComplete received:', { location, industry, framework });
    const selection = { location, industry, framework };
    navigateToDashboard(selection);
  };

  // Navigate and save config
  const navigateToDashboard = (selection) => {
    console.log('Navigating with selection:', selection);

    let location, industry, framework;

    if (selection.location && selection.industry && selection.framework) {
      ({ location, industry, framework } = selection);
    } else if (selection.selectedLocation && selection.selectedIndustry && selection.selectedFramework) {
      location = selection.selectedLocation;
      industry = selection.selectedIndustry;
      framework = selection.selectedFramework;
    } else {
      console.log('Missing required selections:', selection);
      return;
    }

    if (location && industry && framework) {
      setIsNavigating(true);

      const dashboardConfig = {
        location,
        industry,
        framework,
        isQuickAssessment: true,
        configuredAt: new Date().toISOString(),
      };

      localStorage.setItem('dashboardConfig', JSON.stringify(dashboardConfig));

      const dashboardUrl = `/dashboard/${location.id}/${industry.id}/${framework.id}`;
      console.log('Navigating to:', dashboardUrl);

      setTimeout(() => {
        router.push(dashboardUrl);
      }, 500);
    }
  };

  useEffect(() => {
    const savedConfig = localStorage.getItem('dashboardConfig');
    if (savedConfig) console.log('Saved config found:', savedConfig);
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description:
        'AI-powered ESG insights with real-time data visualization and predictive analytics for informed decision-making.',
    },
    {
      icon: Shield,
      title: 'Global Compliance',
      description:
        'Stay compliant with BRSR, GRI, SASB, TCFD and other international sustainability reporting frameworks.',
    },
    {
      icon: Users,
      title: 'Trusted Network',
      description:
        'Access our curated marketplace of verified sustainability solution providers and expert consultants.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Content */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <Image
                  src="https://i.postimg.cc/QM8fvftG/IMG-20250819-WA0002.jpg"
                  alt="Ploxi Consults"
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain rounded-xl mr-4"
                  priority
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Ploxi Sustainability
                  </h1>
                  <p className="text-lg text-gray-600">
                    ESG & Consulting Platform
                  </p>
                </div>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Transform Your</span>
                <span className="block text-green-600">ESG Journey</span>
              </h1>

              <p className="mt-6 text-xl text-gray-600 leading-8">
                Comprehensive sustainability platform for ESG reporting,
                compliance management, and access to verified solution providers.
                Make data-driven decisions with confidence.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-green-600 border border-transparent rounded-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Start Your Corporate Registration
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>

                <button
                  onClick={() => setShowAssessment(!showAssessment)}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-700 bg-white border-2 border-green-600 rounded-xl hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Quick Assessment
                  <ChevronDown
                    className={`ml-3 h-5 w-5 transition-transform duration-200 ${
                      showAssessment ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Right Side Features */}
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-2xl shadow-xl lg:max-w-md bg-white p-8 border border-gray-200">
                <div className="space-y-6">
                  {features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <div key={i} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-green-100">
                            <Icon className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Assessment */}
      {showAssessment && (
        <section className="relative px-4 py-12 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Configure Your ESG Assessment
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Get personalized sustainability insights based on your location,
              industry, and reporting requirements.
            </p>

            {/* Step Guide */}
            <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {[
                  ['1', 'Choose Location', 'Select your region'],
                  ['2', 'Select Industry', 'Pick your sector'],
                  ['3', 'Pick Framework', 'Choose your standard'],
                ].map(([num, title, desc]) => (
                  <div
                    key={num}
                    className="flex flex-col items-center space-y-3"
                  >
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {num}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {isNavigating && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 text-center">
                  <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Preparing Your Dashboard
                  </h3>
                  <p className="text-gray-600">
                    Setting up personalized ESG insights...
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
              <LocationIndustrySelector
                onSelectionChange={handleSelectionChange}
                onComplete={handleComplete}
                handleComplete={onComplete}
                className="p-8"
              />
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Sustainability Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join hundreds of organizations using Ploxi Sustainability to drive
            ESG initiatives forward.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-600 bg-white border border-transparent rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started Today
            <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image
              src="https://i.postimg.cc/QM8fvftG/IMG-20250819-WA0002.jpg"
              alt="Ploxi Consults"
              width={32}
              height={32}
              className="h-8 w-8 object-contain rounded"
            />
            <span className="text-gray-300">
              © 2025 Ploxi Consults. All rights reserved.
            </span>
          </div>
          <div className="text-gray-400 text-sm">
            Bangalore, India • Sustainability Consulting • ESG Solutions
          </div>
        </div>
      </footer>
    </div>
  );
}
