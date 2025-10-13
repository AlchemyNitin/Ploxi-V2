'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Info, 
  Handshake, 
  TrendingUp,
  Lightbulb,
  HelpCircle,
  Sparkles
} from 'lucide-react';

// Solution types configuration
const SOLUTION_TYPES = [
  { id: 'energy', label: 'Energy Management', description: 'Efficiency and renewable solutions' },
  { id: 'water', label: 'Water Treatment', description: 'Purification and management' },
  { id: 'waste', label: 'Waste Solutions', description: 'Management and recycling' },
  { id: 'analytics', label: 'Analytics & Monitoring', description: 'IoT and data analytics' },
  { id: 'green-buildings', label: 'Green Buildings', description: 'Sustainable construction' },
  { id: 'renewable', label: 'Renewable Energy', description: 'Solar, wind, clean energy' },
  { id: 'carbon', label: 'Carbon Capture & Offsetting', description: 'Carbon reduction tech' },
  { id: 'ev-charging', label: 'EV Charging', description: 'Electric vehicle infrastructure' },
  { id: 'circular-economy', label: 'Circular Economy', description: 'Waste-to-value solutions' },
  { id: 'other', label: 'Other', description: 'Custom solutions' }
];

// Industries configuration
const INDUSTRIES = [
  'Manufacturing', 'Real Estate', 'Agriculture', 'Transportation', 
  'Utilities', 'Finance', 'Healthcare', 'Education', 
  'IT / Data Center', 'Hospitality', 'Retail', 'Logistics',
  'Automotive', 'Steel', 'Cement', 'Chemicals'
];

// Geographical regions
const REGIONS = [
  { id: 'IN', label: 'India', flag: '🇮🇳' },
  { id: 'US', label: 'United States', flag: '🇺🇸' },
  { id: 'EU', label: 'European Union', flag: '🇪🇺' },
  { id: 'AE', label: 'United Arab Emirates', flag: '🇦🇪' },
  { id: 'SEA', label: 'Southeast Asia', flag: '🌏' },
  { id: 'AF', label: 'Africa', flag: '🌍' },
  { id: 'SA', label: 'South America', flag: '🌎' },
  { id: 'OTHER', label: 'Other', flag: '🌐' }
];

// Tooltip component
const Tooltip = ({ content }) => {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative inline-block ml-2">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="text-gray-400 hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      {show && (
        <div className="absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-8 w-64">
          {content}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -left-1 top-3"></div>
        </div>
      )}
    </div>
  );
};

// Progress Step Indicator
const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: 'Solution Focus' },
    { number: 2, label: 'About You' },
    { number: 3, label: 'Your Goals' }
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                  ${currentStep >= step.number 
                    ? 'bg-blue-600 text-white shadow-lg scale-110' 
                    : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {currentStep > step.number ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  step.number
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-24 h-1 mx-4 transition-all duration-300 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default function CleanTechRegistration() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    solutionTypes: [],
    otherSolution: '',
    industries: [],
    geographies: [],
    pitch: '',
    intent: null
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Toggle array values
  const toggleArrayValue = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Validate current step
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (formData.solutionTypes.length === 0) {
        newErrors.solutionTypes = 'Please select at least one solution type';
      }
      if (formData.industries.length === 0) {
        newErrors.industries = 'Please select at least one industry';
      }
      if (formData.geographies.length === 0) {
        newErrors.geographies = 'Please select at least one region';
      }
    }

    if (step === 2) {
      if (!formData.pitch.trim()) {
        newErrors.pitch = 'Please provide a brief pitch';
      } else if (formData.pitch.length < 50) {
        newErrors.pitch = 'Pitch should be at least 50 characters';
      } else if (formData.pitch.length > 1000) {
        newErrors.pitch = 'Pitch should not exceed 1000 characters';
      }
    }

    if (step === 3) {
      if (!formData.intent) {
        newErrors.intent = 'Please select an option';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle final action
  const handleContinue = () => {
    if (!validateStep(3)) return;

    // Prepare data for next step
    const registrationData = {
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'cleantech'
    };

    // Store in session for passing to next page
    sessionStorage.setItem('cleantech-registration', JSON.stringify(registrationData));

    if (formData.intent === 'listing') {
      router.push('/cleantech/add-listing');
    } else if (formData.intent === 'funding') {
      router.push('/climate-finance/registration');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="https://i.postimg.cc/QM8fvftG/IMG-20250819-WA0002.jpg"
                alt="Ploxi"
                width={40}
                height={40}
                className="h-10 w-10 object-contain rounded-lg"
                priority
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Ploxi Clean Tech</h1>
                <p className="text-xs text-gray-600">Vendor Registration</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/cleantech')}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              ← Cancel
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={3} />

        {/* Form Container */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-8 md:p-12">
          {/* STEP 1: Solution & Market Focus */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Lightbulb className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Tell Us About Your Solutions
                </h2>
                <p className="text-gray-600">
                  Help us understand your clean tech offerings and target markets
                </p>
              </div>

              {/* Solution Types */}
              <div>
                <label className="flex items-center text-base font-semibold text-gray-900 mb-4">
                  Solution Type(s) *
                  <Tooltip content="Select all solution categories that describe your offerings" />
                </label>
                {errors.solutionTypes && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {errors.solutionTypes}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SOLUTION_TYPES.map(type => (
                    <label
                      key={type.id}
                      className={`
                        flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all
                        ${formData.solutionTypes.includes(type.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 bg-white'
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={formData.solutionTypes.includes(type.id)}
                        onChange={() => toggleArrayValue('solutionTypes', type.id)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mt-0.5"
                      />
                      <div className="ml-3">
                        <span className="block font-medium text-gray-900">{type.label}</span>
                        <span className="block text-sm text-gray-600 mt-0.5">{type.description}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {formData.solutionTypes.includes('other') && (
                  <input
                    type="text"
                    value={formData.otherSolution}
                    onChange={(e) => setFormData(prev => ({ ...prev, otherSolution: e.target.value }))}
                    placeholder="Please specify your solution type"
                    className="mt-4 w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>

              {/* Industries */}
              <div>
                <label className="flex items-center text-base font-semibold text-gray-900 mb-4">
                  Target Industries *
                  <Tooltip content="Choose industries your solutions primarily serve" />
                </label>
                {errors.industries && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {errors.industries}
                  </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {INDUSTRIES.map(industry => (
                    <label
                      key={industry}
                      className={`
                        flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all text-center
                        ${formData.industries.includes(industry)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={formData.industries.includes(industry)}
                        onChange={() => toggleArrayValue('industries', industry)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Geography */}
              <div>
                <label className="flex items-center text-base font-semibold text-gray-900 mb-4">
                  Geographic Regions *
                  <Tooltip content="Select where your solutions are available" />
                </label>
                {errors.geographies && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {errors.geographies}
                  </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {REGIONS.map(region => (
                    <label
                      key={region.id}
                      className={`
                        flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all
                        ${formData.geographies.includes(region.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 bg-white'
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={formData.geographies.includes(region.id)}
                        onChange={() => toggleArrayValue('geographies', region.id)}
                        className="sr-only"
                      />
                      <span className="text-4xl mb-2">{region.flag}</span>
                      <span className="text-sm font-medium text-gray-900 text-center">{region.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  onClick={nextStep}
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Platform Benefits & Pitch */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Why Join Ploxi Clean Tech?
                </h2>
                <p className="text-gray-600">
                  Tell us about your innovation and what makes you unique
                </p>
              </div>

              {/* Benefits Section */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-100">
                <div className="flex items-start mb-4">
                  <Info className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      What You&apos;ll Gain
                    </h3>
                    <ul className="space-y-3">
                      {[
                        'Direct access to corporate buyers seeking verified sustainability solutions',
                        'Visibility in the leading clean technology marketplace',
                        'Deal facilitation and matchmaking with enterprise clients',
                        'Funding opportunities through our climate finance network',
                        'Showcase your innovation to decision-makers across industries',
                        'Free listing with no commission on deals (for now)'
                      ].map((benefit, idx) => (
                        <li key={idx} className="flex items-start text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pitch Input */}
              <div>
                <label className="flex items-center text-base font-semibold text-gray-900 mb-4">
                  Your Solution Pitch *
                  <Tooltip content="This will appear on your public profile. Describe your innovation, technology, and value proposition." />
                </label>
                {errors.pitch && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {errors.pitch}
                  </div>
                )}
                <textarea
                  rows={8}
                  value={formData.pitch}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, pitch: e.target.value }));
                    if (errors.pitch) setErrors(prev => ({ ...prev, pitch: null }));
                  }}
                  placeholder="Tell us about your clean tech solution. What problems do you solve? What makes your technology unique? Who are your ideal customers?"
                  maxLength={1000}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-600">Minimum 50 characters</span>
                  <span className={`${formData.pitch.length > 900 ? 'text-red-600' : 'text-gray-600'}`}>
                    {formData.pitch.length}/1000
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Intent Selection */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  What Are You Looking For?
                </h2>
                <p className="text-gray-600">
                  Choose the path that best fits your business goals
                </p>
              </div>

              {errors.intent && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
                  {errors.intent}
                </div>
              )}

              {/* Option Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Option 1: Marketplace Listing */}
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, intent: 'listing' }));
                    if (errors.intent) setErrors(prev => ({ ...prev, intent: null }));
                  }}
                  className={`
                    group relative p-8 border-3 rounded-2xl text-left transition-all
                    ${formData.intent === 'listing'
                      ? 'border-blue-500 bg-blue-50 shadow-xl scale-105'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-lg bg-white'
                    }
                  `}
                >
                  <div className="flex flex-col h-full">
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all
                      ${formData.intent === 'listing' ? 'bg-blue-600' : 'bg-gray-100 group-hover:bg-blue-100'}
                    `}>
                      <Handshake className={`w-8 h-8 ${formData.intent === 'listing' ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Grow Your Business
                    </h3>
                    <p className="text-sm text-blue-600 font-semibold mb-4">
                      Through Marketplace Listing
                    </p>
                    <p className="text-gray-600 mb-6 flex-grow">
                      Get your solutions listed, connect with corporate buyers, and access business leads.
                    </p>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200 text-sm text-gray-700">
                      <p className="font-semibold mb-2">What happens next:</p>
                      <ul className="space-y-1">
                        <li>• Complete vendor listing form</li>
                        <li>• Partnership agreement sent to inbox</li>
                        <li>• Sign agreement to go live</li>
                        <li>• Listing is free (for now)</li>
                      </ul>
                    </div>
                  </div>
                  {formData.intent === 'listing' && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                  )}
                </button>

                {/* Option 2: Funding */}
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, intent: 'funding' }));
                    if (errors.intent) setErrors(prev => ({ ...prev, intent: null }));
                  }}
                  className={`
                    group relative p-8 border-3 rounded-2xl text-left transition-all
                    ${formData.intent === 'funding'
                      ? 'border-purple-500 bg-purple-50 shadow-xl scale-105'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-lg bg-white'
                    }
                  `}
                >
                  <div className="flex flex-col h-full">
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all
                      ${formData.intent === 'funding' ? 'bg-purple-600' : 'bg-gray-100 group-hover:bg-purple-100'}
                    `}>
                      <TrendingUp className={`w-8 h-8 ${formData.intent === 'funding' ? 'text-white' : 'text-gray-600 group-hover:text-purple-600'}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Raise Funding
                    </h3>
                    <p className="text-sm text-purple-600 font-semibold mb-4">
                      For Your Business
                    </p>
                    <p className="text-gray-600 mb-6 flex-grow">
                      Showcase your company to climate-focused investors and access funding programs.
                    </p>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200 text-sm text-gray-700">
                      <p className="font-semibold mb-2">What happens next:</p>
                      <ul className="space-y-1">
                        <li>• Redirect to Climate Finance portal</li>
                        <li>• Profile visible to investors</li>
                        <li>• Access to funding programs</li>
                        <li>• Connect with climate finance partners</li>
                      </ul>
                    </div>
                  </div>
                  {formData.intent === 'funding' && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-8 h-8 text-purple-600" />
                    </div>
                  )}
                </button>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  disabled={!formData.intent}
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
