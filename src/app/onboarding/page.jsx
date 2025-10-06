'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Zap, 
  PenTool, 
  Check, 
  ArrowRight, 
  Building, 
  MapPin, 
  FileText,
  X,
  Info,
  Users,
  Bot,
  ClipboardList
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [registrationData, setRegistrationData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  // Load registration data on mount
  useEffect(() => {
    const data = localStorage.getItem('registrationData');
    if (data) {
      try {
        setRegistrationData(JSON.parse(data));
      } catch (err) {
        console.error('Failed to load registration data:', err);
        // Redirect back to registration if data is invalid
        router.push('/register');
      }
    } else {
      // Redirect to registration if no data
      router.push('/register');
    }
  }, [router]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setModalType(option);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  const handleSubmit = () => {
    if (!registrationData) return;

    // Store onboarding choice and dashboard configuration
    const dashboardConfig = {
      location: registrationData.location,
      industry: registrationData.industry,
      framework: registrationData.framework,
      companyInfo: {
        companyName: registrationData.companyName,
        contactPerson: registrationData.contactPerson,
        email: registrationData.email,
        phone: registrationData.phone,
        employees: registrationData.employees
      },
      onboardingChoice: selectedOption,
      configuredAt: new Date().toISOString()
    };

    // Store dashboard configuration
    localStorage.setItem('dashboardConfig', JSON.stringify(dashboardConfig));

    // Store complete onboarding data
    const completeOnboardingData = {
      ...registrationData,
      onboardingChoice: selectedOption,
      onboardedAt: new Date().toISOString()
    };
    localStorage.setItem('onboardingData', JSON.stringify(completeOnboardingData));

    // Navigate to dashboard with proper URL structure
    const { location, industry, framework } = registrationData;
    router.push(`/dashboard/${location.id}/${industry.id}/${framework.id}`);
  };

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const Modal = ({ type, onClose }) => {
    const modalContent = {
      auto: {
        title: "Automatic ESG Integration",
        icon: <Bot className="w-8 h-8 text-blue-600" />,
        content: (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">🚀 Coming Soon!</h4>
              <p className="text-blue-800 text-sm">
                Our AI-powered automatic integration feature is currently in development. 
                This will allow seamless connection with your existing systems.
              </p>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <h4 className="font-semibold text-gray-900">What this will include:</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Automatic data synchronization from your ERP/CRM systems</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Real-time ESG metric calculations and updates</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Automated compliance reporting and alerts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>API integrations with major sustainability platforms</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>For now:</strong> You can proceed with manual entry and we will upgrade 
                your account automatically when this feature becomes available.
              </p>
            </div>
          </div>
        )
      },
      manual: {
        title: "Manual ESG Data Entry",
        icon: <ClipboardList className="w-8 h-8 text-green-600" />,
        content: (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">👥 Our team will contact you!</h4>
              <p className="text-green-800 text-sm">
                Within 24 hours, one of our ESG specialists will reach out to guide you through 
                the manual data entry process and help set up your sustainability metrics.
              </p>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <h4 className="font-semibold text-gray-900">What happens next:</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Users className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Personal consultation call to understand your specific needs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Custom data collection templates for your industry and framework</span>
                </li>
                <li className="flex items-start space-x-2">
                  <PenTool className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Guided data entry sessions with our ESG experts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Quality assurance and validation of your ESG data</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Contact details:</strong> We will use the email address you provided 
                ({registrationData.email}) to schedule your consultation.
              </p>
            </div>
          </div>
        )
      }
    };

    const content = modalContent[type];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                {content.icon}
                <h3 className="text-xl font-semibold text-gray-900">{content.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            {content.content}
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                Welcome Onboarding
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Registration</span>
              </div>
              <div className="w-12 h-0.5 bg-green-600"></div>
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-sm font-medium">Onboarding</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="text-sm font-medium">Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Company Summary */}
          <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
            <h2 className="text-lg font-semibold text-green-900 mb-4">Registration Complete! 🎉</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-green-700" />
                <span className="text-green-800 font-medium">{registrationData.companyName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-green-700" />
                <span className="text-green-800">{registrationData.location.name} • {registrationData.industry.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-green-700" />
                <span className="text-green-800">{registrationData.framework.name}</span>
              </div>
            </div>
          </div>

          {/* Onboarding Options */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How would you like to get started?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your preferred method for setting up your ESG data and metrics. 
              Both options will get you to your personalized sustainability dashboard.
            </p>
          </div>

          {/* Option Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Auto Integration Option */}
            <div 
              className={`
                relative p-8 border-2 rounded-2xl cursor-pointer transition-all duration-200 transform hover:scale-[1.02]
                ${selectedOption === 'auto' 
                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                }
              `}
              onClick={() => handleOptionSelect('auto')}
            >
              {selectedOption === 'auto' && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Integrate your ESG dashboard
                </h3>
                <p className="text-gray-600 text-sm">
                  Automatic integration with your existing systems for real-time ESG monitoring 
                  and seamless data synchronization.
                </p>
                <div className="inline-flex items-center space-x-1 text-blue-600 text-sm font-medium">
                  <span>Coming Soon</span>
                  <Info className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Manual Entry Option */}
            <div 
              className={`
                relative p-8 border-2 rounded-2xl cursor-pointer transition-all duration-200 transform hover:scale-[1.02]
                ${selectedOption === 'manual' 
                  ? 'border-green-500 bg-green-50 shadow-lg' 
                  : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                }
              `}
              onClick={() => handleOptionSelect('manual')}
            >
              {selectedOption === 'manual' && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <PenTool className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Input the ESG metrics
                </h3>
                <p className="text-gray-600 text-sm">
                  Work with our ESG specialists for guided data entry and personalized 
                  setup of your sustainability metrics.
                </p>
                <div className="inline-flex items-center space-x-1 text-green-600 text-sm font-medium">
                  <span>Expert Support Available</span>
                  <Users className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Selected Option Info */}
          {selectedOption && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 text-gray-700">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">
                  You have selected: <strong>
                    {selectedOption === 'auto' ? 'Automatic Integration' : 'Manual Entry with Expert Support'}
                  </strong>
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`
                inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg
                transition-all duration-200 transform hover:scale-[1.02]
                ${selectedOption 
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <span>Continue to Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            {!selectedOption && (
              <p className="text-center text-sm text-gray-500 mt-3">
                Please select an option above to continue
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && <Modal type={modalType} onClose={handleCloseModal} />}
    </div>
  );
}
