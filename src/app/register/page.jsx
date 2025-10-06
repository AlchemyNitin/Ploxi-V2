'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Building, 
  MapPin, 
  Users, 
  Mail, 
  Phone, 
  User,
  ArrowRight,
  ChevronDown,
  CheckCircle 
} from 'lucide-react';

// Mock data - same as your LocationIndustrySelector
const mockLocations = [
  { id: "india", name: "India", code: "IN", reportingFrameworks: ["BRSR", "GRI"] },
  { id: "usa", name: "United States", code: "US", reportingFrameworks: ["SASB", "GRI", "TCFD"] },
  { id: "eu", name: "European Union", code: "EU", reportingFrameworks: ["TCFD", "ESRS", "GRI"] },
  { id: "uae", name: "United Arab Emirates", code: "AE", reportingFrameworks: ["GRI", "TCFD"] }
];

const mockIndustries = [
  { id: "healthcare", name: "Healthcare" },
  { id: "real_estate", name: "Real Estate" },
  { id: "cement", name: "Cement" },
  { id: "steel", name: "Steel" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "logistics", name: "Logistics" },
  { id: "automotive", name: "Automotive" },
  { id: "education", name: "Education" },
  { id: "finance", name: "Finance" },
  { id: "it_datacenter", name: "IT / Data Center" }
];

const allFrameworks = [
  { id: "brsr", name: "BRSR", fullName: "Business Responsibility and Sustainability Reporting" },
  { id: "gri", name: "GRI", fullName: "Global Reporting Initiative" },
  { id: "sasb", name: "SASB", fullName: "Sustainability Accounting Standards Board" },
  { id: "tcfd", name: "TCFD", fullName: "Task Force on Climate-related Financial Disclosures" },
  { id: "esrs", name: "ESRS", fullName: "European Sustainability Reporting Standards" }
];

export default function RegistrationPage() {
  const router = useRouter();

  // Company information state
  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    employees: ''
  });

  // ESG configuration state
  const [esgConfig, setEsgConfig] = useState({
    location: null,
    industry: null,
    framework: null
  });

  const [availableFrameworks, setAvailableFrameworks] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Update available frameworks when location changes
  React.useEffect(() => {
    if (esgConfig.location) {
      setIsLoading(true);
      setTimeout(() => {
        const location = mockLocations.find(loc => loc.id === esgConfig.location.id);
        const frameworks = allFrameworks.filter(framework => 
          location.reportingFrameworks.includes(framework.name)
        );
        setAvailableFrameworks(frameworks);
        setIsLoading(false);
      }, 300);
    } else {
      setAvailableFrameworks([]);
      setEsgConfig(prev => ({ ...prev, framework: null }));
    }
  }, [esgConfig.location]);

  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleEsgSelect = (type, item) => {
    let newConfig = { ...esgConfig };

    switch (type) {
      case 'location':
        newConfig.location = item;
        newConfig.framework = null; // Reset framework when location changes
        break;
      case 'industry':
        newConfig.industry = item;
        break;
      case 'framework':
        newConfig.framework = item;
        break;
    }

    setEsgConfig(newConfig);
    setOpenDropdown(null);
    
    // Clear error
    if (errors[type]) {
      setErrors(prev => ({ ...prev, [type]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Company info validation
    if (!companyInfo.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!companyInfo.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!companyInfo.email.trim()) newErrors.email = 'Email is required';
    if (companyInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // ESG config validation
    if (!esgConfig.location) newErrors.location = 'Location is required';
    if (!esgConfig.industry) newErrors.industry = 'Industry is required';
    if (!esgConfig.framework) newErrors.framework = 'Framework is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Store registration data with improved structure for consistency
    const registrationData = {
      ...companyInfo,
      location: esgConfig.location,
      industry: esgConfig.industry,
      framework: esgConfig.framework,
      registeredAt: new Date().toISOString()
    };

    // Save to localStorage for onboarding step
    localStorage.setItem('registrationData', JSON.stringify(registrationData));

    // Clear any existing cart or dashboard data to start fresh
    localStorage.removeItem('ploxi-cart');
    localStorage.removeItem('complianceProgress');

    // Navigate to onboarding page
    router.push('/onboarding');
  };

  const isFormComplete = companyInfo.companyName && companyInfo.contactPerson && 
    companyInfo.email && esgConfig.location && esgConfig.industry && esgConfig.framework;

  // Dropdown component (reused from LocationIndustrySelector)
  const Dropdown = ({ type, options, selected, placeholder, disabled = false, loading = false }) => {
    const isOpen = openDropdown === type;
    const isCompleted = selected !== null;
    const hasError = errors[type];
    
    return (
      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!disabled && !loading) {
              setOpenDropdown(isOpen ? null : type);
            }
          }}
          disabled={disabled || loading}
          className={`
            w-full px-4 py-3 text-left bg-white border rounded-lg 
            shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500
            hover:border-gray-400 transition-all duration-200
            disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400
            ${isOpen ? 'border-green-500 ring-2 ring-green-500' : ''}
            ${isCompleted ? 'border-green-300 bg-green-50' : ''}
            ${hasError ? 'border-red-300' : 'border-gray-300'}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isCompleted && <CheckCircle className="w-4 h-4 text-green-600" />}
              <span className={selected ? 'text-gray-900' : 'text-gray-500'}>
                {loading ? 'Loading...' : selected?.name || placeholder}
              </span>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`} 
            />
          </div>
        </button>
        
        {hasError && (
          <p className="mt-1 text-sm text-red-600">{hasError}</p>
        )}
        
        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleEsgSelect(type, option);
                }}
                className={`
                  w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-green-50 
                  focus:text-green-900 transition-colors duration-150
                  ${selected?.id === option.id ? 'bg-green-50 text-green-900' : 'text-gray-900'}
                `}
              >
                <div>
                  <div className="font-medium">{option.name}</div>
                  {option.fullName && (
                    <div className="text-sm text-gray-500 mt-1">{option.fullName}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
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
                Corporate Registration
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
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="text-sm font-medium">Registration</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
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
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Welcome to Ploxi Sustainability Platform
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Register your organization to access personalized ESG insights, compliance tracking, 
              and our curated marketplace of sustainability solution providers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Information Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Building className="w-5 h-5 text-green-600" />
                <span>Company Information</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={companyInfo.companyName}
                    onChange={handleCompanyInfoChange}
                    className={`
                      w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500
                      ${errors.companyName ? 'border-red-300' : 'border-gray-300'}
                    `}
                    placeholder="Enter your company name"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={companyInfo.contactPerson}
                    onChange={handleCompanyInfoChange}
                    className={`
                      w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500
                      ${errors.contactPerson ? 'border-red-300' : 'border-gray-300'}
                    `}
                    placeholder="Enter contact person name"
                  />
                  {errors.contactPerson && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactPerson}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={companyInfo.email}
                    onChange={handleCompanyInfoChange}
                    className={`
                      w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500
                      ${errors.email ? 'border-red-300' : 'border-gray-300'}
                    `}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={companyInfo.phone}
                    onChange={handleCompanyInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Employees
                  </label>
                  <select
                    id="employees"
                    name="employees"
                    value={companyInfo.employees}
                    onChange={handleCompanyInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ESG Configuration Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>ESG Configuration</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Geographic Location *
                  </label>
                  <Dropdown
                    type="location"
                    options={mockLocations}
                    selected={esgConfig.location}
                    placeholder="Select Location"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Industry Sector *
                  </label>
                  <Dropdown
                    type="industry"
                    options={mockIndustries}
                    selected={esgConfig.industry}
                    placeholder="Select Industry"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Reporting Framework *
                  </label>
                  <Dropdown
                    type="framework"
                    options={availableFrameworks}
                    selected={esgConfig.framework}
                    placeholder="Select Framework"
                    disabled={!esgConfig.location}
                    loading={isLoading}
                  />
                </div>
              </div>

              {/* Framework Information */}
              {esgConfig.framework && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">
                    Selected Framework: {esgConfig.framework.name}
                  </h4>
                  <p className="text-sm text-blue-800">
                    {esgConfig.framework.fullName}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={!isFormComplete}
                className={`
                  w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-semibold text-lg
                  transition-all duration-200 transform hover:scale-[1.02]
                  ${isFormComplete 
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <span>Continue to Onboarding</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              {!isFormComplete && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  Please complete all required fields to continue
                </p>
              )}
            </div>
          </form>
        </div>
      </main>

      {/* Click outside to close dropdowns */}
      {openDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpenDropdown(null);
          }}
          aria-hidden="true"
          style={{ pointerEvents: 'auto' }}
        />
      )}
    </div>
  );
}
