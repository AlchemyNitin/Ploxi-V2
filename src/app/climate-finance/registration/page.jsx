'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  TrendingUp, 
  DollarSign, 
  Users,
  Target,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Building2,
  Lightbulb,
  AlertCircle,
  Info,
  Upload,
  X,
  HelpCircle,
  Briefcase,
  PiggyBank,
  CreditCard,
  Calendar,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

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
        className="text-gray-400 hover:text-purple-400 focus:text-purple-400 focus:outline-none"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      {show && (
        <div className="absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-8 w-64 border border-gray-700">
          {content}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -left-1 top-3 border-l border-b border-gray-700"></div>
        </div>
      )}
    </div>
  );
};

// Info Modal component
const InfoModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl border-2 border-gray-800 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="text-gray-300 space-y-3">
            {content}
          </div>
          <button
            onClick={onClose}
            className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ClimateFinanceRegistration() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0: user type, 1+: based on flow
  const [vendorContext, setVendorContext] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [userType, setUserType] = useState(null); // 'vendor', 'investor', 'participant'

  // Form state
  const [formData, setFormData] = useState({
    // User type
    registrationType: '', // vendor, investor, participant
    
    // From Clean Tech vendor context
    companyName: '',
    solutionTypes: [],
    industries: [],
    geographies: [],
    pitch: '',
    
    // For vendors (Clean Tech)
    fundingStage: '',
    fundingAmount: '',
    fundingPurpose: '',
    currentRevenue: '',
    projectedRevenue: '',
    equityOffered: '',
    useOfFunds: '',
    previousFunding: '',
    investors: '',
    pitchDeck: null,
    financials: null,
    
    // For investors/finance professionals
    engagementType: '', // project-finance, raise-equity
    financeSubType: [], // debt, equity, credit, project-finance
    intentType: [], // events, consultation
    
    // Personal/Company details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    designation: '',
    website: '',
    
    // Investor specific
    fundName: '',
    fundSize: '',
    sectorsOfInterest: [],
    financingTypes: [],
    ticketSize: '',
    geographicFocus: [],
    
    // Consultation request
    consultationMessage: '',
    preferredDate: ''
  });

  const [errors, setErrors] = useState({});

  // Load vendor context on mount
  useEffect(() => {
    const context = sessionStorage.getItem('cleantech-registration');
    if (context) {
      try {
        const data = JSON.parse(context);
        setVendorContext(data);
        setUserType('vendor');
        setFormData(prev => ({
          ...prev,
          registrationType: 'vendor',
          companyName: data.companyName || '',
          solutionTypes: data.solutionTypes || [],
          industries: data.industries || [],
          geographies: data.geographies || [],
          pitch: data.pitch || ''
        }));
        setStep(1); // Skip user type selection
      } catch (error) {
        console.error('Failed to load vendor context');
      }
    }
  }, []);

  const FUNDING_STAGES = [
    'Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C+', 
    'Growth/Expansion', 'Bridge Financing'
  ];

  const FUNDING_PURPOSES = [
    'Product Development', 'Market Expansion', 'Team Building',
    'Manufacturing Scale-up', 'R&D', 'Marketing & Sales',
    'Working Capital', 'Infrastructure'
  ];

  const FINANCE_SUBTYPES = [
    { value: 'debt', label: 'Debt Financing', description: 'Loans and bonds that must be repaid' },
    { value: 'equity', label: 'Equity Investment', description: 'Ownership stake in return for capital' },
    { value: 'credit', label: 'Credit Facilities', description: 'Lines of credit and trade finance' },
    { value: 'project-finance', label: 'Project Finance', description: 'Financing for specific projects/assets' }
  ];

  const SECTORS = [
    'Renewable Energy', 'Energy Storage', 'EV & Mobility', 'Green Buildings',
    'Water & Wastewater', 'Waste Management', 'Carbon Capture', 'Agriculture Tech',
    'Clean Manufacturing', 'Circular Economy', 'Climate Tech', 'Sustainability Software'
  ];

  const FINANCING_TYPES = [
    'Early Stage', 'Growth Stage', 'Late Stage', 'Debt', 'Equity',
    'Mezzanine', 'Project Finance', 'Green Bonds', 'Impact Investment'
  ];

  const FUND_SIZES = [
    'Under ₹10 Cr', '₹10-50 Cr', '₹50-100 Cr', '₹100-500 Cr',
    '₹500 Cr - ₹1000 Cr', 'Above ₹1000 Cr'
  ];

  // Validation
  const validateStep = (currentStep) => {
    const newErrors = {};

    // Vendor flow validation
    if (userType === 'vendor') {
      if (currentStep === 1) {
        if (!formData.fundingStage) newErrors.fundingStage = 'Required';
        if (!formData.fundingAmount) newErrors.fundingAmount = 'Required';
        if (!formData.fundingPurpose) newErrors.fundingPurpose = 'Required';
      }
      if (currentStep === 2) {
        if (!formData.useOfFunds) newErrors.useOfFunds = 'Required';
        if (!formData.currentRevenue) newErrors.currentRevenue = 'Required';
      }
    }

    // Investor/Participant flow validation
    if (userType === 'investor' || userType === 'participant') {
      if (currentStep === 1) {
        if (!formData.firstName.trim()) newErrors.firstName = 'Required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Required';
        if (!formData.email.trim()) newErrors.email = 'Required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Valid email required';
        }
      }
      if (currentStep === 2 && userType === 'investor') {
        if (!formData.engagementType) newErrors.engagementType = 'Required';
        if (formData.financeSubType.length === 0) newErrors.financeSubType = 'Select at least one';
      }
      if (currentStep === 3 && userType === 'investor') {
        if (formData.sectorsOfInterest.length === 0) newErrors.sectorsOfInterest = 'Select at least one sector';
        if (!formData.fundSize) newErrors.fundSize = 'Required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 0 || validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle file upload
  const handleFileUpload = (field, files) => {
    const file = files[0];
    setFormData(prev => ({
      ...prev,
      [field]: {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      }
    }));
  };

  // Submit
  const handleSubmit = () => {
    if (!validateStep(step)) return;

    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      vendorContext,
      userType,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      id: `cf_${Date.now()}`
    };

    // Store based on type
    if (userType === 'vendor') {
      const requests = JSON.parse(sessionStorage.getItem('funding-requests') || '[]');
      requests.push(submissionData);
      sessionStorage.setItem('funding-requests', JSON.stringify(requests));
    } else if (userType === 'investor') {
      const investors = JSON.parse(sessionStorage.getItem('climate-investors') || '[]');
      investors.push(submissionData);
      sessionStorage.setItem('climate-investors', JSON.stringify(investors));
    } else {
      const participants = JSON.parse(sessionStorage.getItem('climate-participants') || '[]');
      participants.push(submissionData);
      sessionStorage.setItem('climate-participants', JSON.stringify(participants));
    }

    console.log('API Ready - POST /api/climate-finance/register', submissionData);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(999); // Success step
    }, 2000);
  };

  // Modal content
  const modalContent = {
    'project-finance': (
      <>
        <p><strong>Project Finance (On Assets)</strong></p>
        <p>Financing structured around specific projects or assets, where repayment comes from project cash flows.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Debt:</strong> Loans repaid with interest</li>
          <li><strong>Equity:</strong> Ownership stake in the project</li>
          <li><strong>Credit:</strong> Lines of credit for operations</li>
          <li><strong>Project Finance:</strong> Non-recourse financing for infrastructure</li>
        </ul>
      </>
    ),
    'raise-equity': (
      <>
        <p><strong>Raise Equity</strong></p>
        <p>Raising capital by selling ownership stakes in your company to investors.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Suitable for growth-stage companies</li>
          <li>No repayment obligation</li>
          <li>Investors get ownership and potential returns</li>
          <li>Ideal for scaling operations</li>
        </ul>
      </>
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="https://i.postimg.cc/QM8fvftG/IMG-20250819-WA0002.jpg"
                alt="Ploxi"
                width={48}
                height={48}
                className="h-12 w-12 object-contain rounded-xl bg-white p-1"
                priority
              />
              <div>
                <h1 className="text-3xl font-bold text-white">Ploxi Climate Finance</h1>
                <p className="text-purple-300">Registration</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/climate-finance')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      {/* Context Banner for Clean Tech vendors */}
      {vendorContext && (
        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-b border-green-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-12 h-12 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Welcome, Clean Tech Solution Provider!
                </h3>
                <p className="text-gray-300 mb-3">
                  You have been identified as a <strong className="text-green-400">Clean Tech solution provider seeking funding</strong>. 
                  Complete this registration to connect with climate-focused investors.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                    {vendorContext.companyName || 'Your Company'}
                  </span>
                  {vendorContext.solutionTypes?.slice(0, 3).map(type => (
                    <span key={type} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* STEP 0: User Type Selection (Skip if from Clean Tech) */}
        {step === 0 && !vendorContext && (
          <div className="bg-gray-900 rounded-2xl border-2 border-gray-800 shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome to Climate Finance</h2>
              <p className="text-gray-400">How would you like to engage with us?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Raise Funding */}
              <button
                onClick={() => {
                  setUserType('vendor');
                  setFormData(prev => ({ ...prev, registrationType: 'vendor' }));
                  nextStep();
                }}
                className="p-8 bg-gray-800 border-2 border-gray-700 rounded-2xl hover:border-green-500 hover:bg-gray-800/50 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Raise Funding</h3>
                <p className="text-gray-400 text-sm">Seeking investment for your clean tech venture</p>
              </button>

              {/* Investor */}
              <button
                onClick={() => {
                  setUserType('investor');
                  setFormData(prev => ({ ...prev, registrationType: 'investor' }));
                  nextStep();
                }}
                className="p-8 bg-gray-800 border-2 border-gray-700 rounded-2xl hover:border-purple-500 hover:bg-gray-800/50 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30">
                  <Briefcase className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">I&apos;m an Investor</h3>
                <p className="text-gray-400 text-sm">Looking to invest in climate solutions</p>
              </button>

              {/* Participant */}
              <button
                onClick={() => {
                  setUserType('participant');
                  setFormData(prev => ({ ...prev, registrationType: 'participant' }));
                  nextStep();
                }}
                className="p-8 bg-gray-800 border-2 border-gray-700 rounded-2xl hover:border-blue-500 hover:bg-gray-800/50 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Participate</h3>
                <p className="text-gray-400 text-sm">Join events and seek consultation</p>
              </button>
            </div>
          </div>
        )}

        {/* VENDOR FLOW (Clean Tech) - Steps 1-2 */}
        {userType === 'vendor' && step >= 1 && step <= 2 && (
          <>
            {/* Same as previous implementation for vendor funding */}
            {step === 1 && (
              <div className="bg-gray-900 rounded-2xl border-2 border-gray-800 shadow-2xl p-8">
                <div className="flex items-center mb-8">
                  <TrendingUp className="w-8 h-8 text-purple-400 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Funding Requirements</h2>
                    <p className="text-gray-400">Tell us about your funding needs</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Funding Stage */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Funding Stage *
                    </label>
                    <select
                      value={formData.fundingStage}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, fundingStage: e.target.value }));
                        if (errors.fundingStage) setErrors(prev => ({ ...prev, fundingStage: null }));
                      }}
                      className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 text-white ${
                        errors.fundingStage ? 'border-red-500' : 'border-gray-700'
                      }`}
                    >
                      <option value="">Select funding stage</option>
                      {FUNDING_STAGES.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                    {errors.fundingStage && (
                      <p className="mt-1 text-sm text-red-400">{errors.fundingStage}</p>
                    )}
                  </div>

                  {/* Funding Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Funding Amount Required (INR) *
                    </label>
                    <input
                      type="text"
                      value={formData.fundingAmount}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, fundingAmount: e.target.value }));
                        if (errors.fundingAmount) setErrors(prev => ({ ...prev, fundingAmount: null }));
                      }}
                      className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 text-white ${
                        errors.fundingAmount ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="e.g., 5,00,00,000"
                    />
                    {errors.fundingAmount && (
                      <p className="mt-1 text-sm text-red-400">{errors.fundingAmount}</p>
                    )}
                  </div>

                  {/* Funding Purpose */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Primary Funding Purpose *
                    </label>
                    <select
                      value={formData.fundingPurpose}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, fundingPurpose: e.target.value }));
                        if (errors.fundingPurpose) setErrors(prev => ({ ...prev, fundingPurpose: null }));
                      }}
                      className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 text-white ${
                        errors.fundingPurpose ? 'border-red-500' : 'border-gray-700'
                      }`}
                    >
                      <option value="">Select purpose</option>
                      {FUNDING_PURPOSES.map(purpose => (
                        <option key={purpose} value={purpose}>{purpose}</option>
                      ))}
                    </select>
                    {errors.fundingPurpose && (
                      <p className="mt-1 text-sm text-red-400">{errors.fundingPurpose}</p>
                    )}
                  </div>

                  {/* Equity Offered */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Equity Offered (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.equityOffered}
                      onChange={(e) => setFormData(prev => ({ ...prev, equityOffered: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 text-white"
                      placeholder="e.g., 15"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-800">
                  {step > 1 && (
                    <button
                      onClick={prevStep}
                      className="px-6 py-3 border-2 border-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center shadow-lg"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-gray-900 rounded-2xl border-2 border-gray-800 shadow-2xl p-8">
                <div className="flex items-center mb-8">
                  <DollarSign className="w-8 h-8 text-green-400 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Financial Information</h2>
                    <p className="text-gray-400">Share your financial details</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Current Revenue */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Current Annual Revenue (INR) *
                    </label>
                    <input
                      type="text"
                      value={formData.currentRevenue}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, currentRevenue: e.target.value }));
                        if (errors.currentRevenue) setErrors(prev => ({ ...prev, currentRevenue: null }));
                      }}
                      className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 text-white ${
                        errors.currentRevenue ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="e.g., ₹ 1.5 Crore"
                    />
                    {errors.currentRevenue && (
                      <p className="mt-1 text-sm text-red-400">{errors.currentRevenue}</p>
                    )}
                  </div>

                  {/* Use of Funds */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Detailed Use of Funds *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.useOfFunds}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, useOfFunds: e.target.value }));
                        if (errors.useOfFunds) setErrors(prev => ({ ...prev, useOfFunds: null }));
                      }}
                      className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 text-white ${
                        errors.useOfFunds ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="Describe how you plan to use the investment..."
                    />
                    {errors.useOfFunds && (
                      <p className="mt-1 text-sm text-red-400">{errors.useOfFunds}</p>
                    )}
                  </div>

                  {/* Pitch Deck */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Pitch Deck (Optional)
                    </label>
                    {!formData.pitchDeck ? (
                      <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-purple-500 transition-colors bg-gray-800">
                        <FileText className="w-6 h-6 text-gray-400 mr-2" />
                        <span className="text-gray-400">Upload Pitch Deck (PDF)</span>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload('pitchDeck', e.target.files)}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between p-4 bg-purple-900/20 rounded-xl border border-purple-500/30">
                        <span className="text-sm text-gray-300">{formData.pitchDeck.name}</span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, pitchDeck: null }))}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-800">
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit
                        <CheckCircle className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* INVESTOR FLOW - Steps 1-4 */}
        {userType === 'investor' && step >= 1 && step <= 4 && (
          <>
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="bg-gray-900 rounded-2xl border-2 border-gray-800 shadow-2xl p-8">
                <div className="flex items-center mb-8">
                  <Users className="w-8 h-8 text-purple-400 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Personal Details</h2>
                    <p className="text-gray-400">Tell us about yourself</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, firstName: e.target.value }));
                        if (errors.firstName) setErrors(prev => ({ ...prev, firstName: null }));
                      }}
                      className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 text-white ${
                        errors.firstName ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, lastName: e.target.value }));
                        if (errors.lastName) setErrors(prev => ({ ...prev, lastName: null }));
                      }}
                      className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 text-white ${
                        errors.lastName ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                        }}
                        className={`w-full pl-11 pr-4 py-3 bg-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 text-white ${
                          errors.email ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 text-white"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Organization
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 text-white"
                        placeholder="Your fund/organization"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 text-white"
                      placeholder="e.g., Managing Partner"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-800">
                  <button
                    onClick={() => setStep(0)}
                    className="px-6 py-3 border-2 border-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center shadow-lg"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Engagement Type */}
            {step === 2 && (
              <div className="bg-gray-900 rounded-2xl border-2 border-gray-800 shadow-2xl p-8">
                <div className="flex items-center mb-8">
                  <Briefcase className="w-8 h-8 text-purple-400 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Engagement Type</h2>
                    <p className="text-gray-400">How would you like to engage?</p>
                  </div>
                </div>

                {/* Engagement Type Selection */}
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-300 mb-4">
                      Select Engagement Type *
                      <Tooltip content="Choose the type of financing you're interested in" />
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { value: 'project-finance', label: 'Project Finance (On Assets)', icon: PiggyBank, modal: 'project-finance' },
                        { value: 'raise-equity', label: 'Raise Equity', icon: TrendingUp, modal: 'raise-equity' }
                      ].map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, engagementType: option.value }));
                            if (errors.engagementType) setErrors(prev => ({ ...prev, engagementType: null }));
                          }}
                          className={`p-6 border-2 rounded-xl text-left transition-all ${
                            formData.engagementType === option.value
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <option.icon className="w-8 h-8 text-purple-400" />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowModal(option.modal);
                              }}
                              className="text-gray-400 hover:text-purple-400"
                            >
                              <Info className="w-5 h-5" />
                            </button>
                          </div>
                          <h3 className="text-white font-bold mb-2">{option.label}</h3>
                          {formData.engagementType === option.value && (
                            <CheckCircle className="w-6 h-6 text-purple-400 absolute top-4 right-4" />
                          )}
                        </button>
                      ))}
                    </div>
                    {errors.engagementType && <p className="mt-2 text-sm text-red-400">{errors.engagementType}</p>}
                  </div>

                  {/* Finance Sub-types */}
                  {formData.engagementType && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-4">
                        Select Financing Types *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {FINANCE_SUBTYPES.map(type => (
                          <label
                            key={type.value}
                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                              formData.financeSubType.includes(type.value)
                                ? 'border-purple-500 bg-purple-500/10'
                                : 'border-gray-700 hover:border-gray-600'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.financeSubType.includes(type.value)}
                              onChange={(e) => {
                                const newTypes = e.target.checked
                                  ? [...formData.financeSubType, type.value]
                                  : formData.financeSubType.filter(t => t !== type.value);
                                setFormData(prev => ({ ...prev, financeSubType: newTypes }));
                                if (errors.financeSubType) setErrors(prev => ({ ...prev, financeSubType: null }));
                              }}
                              className="sr-only"
                            />
                            <div className="flex items-start">
                              <CreditCard className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-white font-semibold">{type.label}</p>
                                <p className="text-gray-400 text-sm mt-1">{type.description}</p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.financeSubType && <p className="mt-2 text-sm text-red-400">{errors.financeSubType}</p>}
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-6 border-t-2 border-gray-800">
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center shadow-lg"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Fund Details */}
            {step === 3 && (
              <div className="bg-gray-900 rounded-2xl border-2 border-gray-800 shadow-2xl p-8">
                <div className="flex items-center mb-8">
                  <DollarSign className="w-8 h-8 text-green-400 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Fund Details</h2>
                    <p className="text-gray-400">Tell us about your investment focus</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Fund Size */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Fund Size *
                    </label>
                    <select
                      value={formData.fundSize}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, fundSize: e.target.value }));
                        if (errors.fundSize) setErrors(prev => ({ ...prev, fundSize: null }));
                      }}
                      className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 text-white ${
                        errors.fundSize ? 'border-red-500' : 'border-gray-700'
                      }`}
                    >
                      <option value="">Select fund size</option>
                      {FUND_SIZES.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    {errors.fundSize && <p className="mt-1 text-sm text-red-400">{errors.fundSize}</p>}
                  </div>

                  {/* Sectors of Interest */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-4">
                      Sectors of Interest *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {SECTORS.map(sector => (
                        <label
                          key={sector}
                          className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all ${
                            formData.sectorsOfInterest.includes(sector)
                              ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                              : 'border-gray-700 text-gray-400 hover:border-gray-600'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.sectorsOfInterest.includes(sector)}
                            onChange={(e) => {
                              const newSectors = e.target.checked
                                ? [...formData.sectorsOfInterest, sector]
                                : formData.sectorsOfInterest.filter(s => s !== sector);
                              setFormData(prev => ({ ...prev, sectorsOfInterest: newSectors }));
                              if (errors.sectorsOfInterest) setErrors(prev => ({ ...prev, sectorsOfInterest: null }));
                            }}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">{sector}</span>
                        </label>
                      ))}
                    </div>
                    {errors.sectorsOfInterest && <p className="mt-2 text-sm text-red-400">{errors.sectorsOfInterest}</p>}
                  </div>

                  {/* Financing Types */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-4">
                      Types of Financing You Offer
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {FINANCING_TYPES.map(type => (
                        <label
                          key={type}
                          className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all ${
                            formData.financingTypes.includes(type)
                              ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                              : 'border-gray-700 text-gray-400 hover:border-gray-600'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.financingTypes.includes(type)}
                            onChange={(e) => {
                              const newTypes = e.target.checked
                                ? [...formData.financingTypes, type]
                                : formData.financingTypes.filter(t => t !== type);
                              setFormData(prev => ({ ...prev, financingTypes: newTypes }));
                            }}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Ticket Size */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Typical Ticket Size (INR)
                    </label>
                    <input
                      type="text"
                      value={formData.ticketSize}
                      onChange={(e) => setFormData(prev => ({ ...prev, ticketSize: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 text-white"
                      placeholder="e.g., ₹50 Lakh - ₹5 Crore"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-800">
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center shadow-lg"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Intent */}
            {step === 4 && (
              <div className="bg-gray-900 rounded-2xl border-2 border-gray-800 shadow-2xl p-8">
                <div className="flex items-center mb-8">
                  <Target className="w-8 h-8 text-blue-400 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Your Intent</h2>
                    <p className="text-gray-400">How would you like to engage with the ecosystem?</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { value: 'events', label: 'Participate in Events & Pitching Opportunities', icon: Calendar },
                    { value: 'consultation', label: 'Request Consultation for Fundraising', icon: Users }
                  ].map(intent => {
                    const Icon = intent.icon;
                    return (
                      <label
                        key={intent.value}
                        className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.intentType.includes(intent.value)
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.intentType.includes(intent.value)}
                          onChange={(e) => {
                            const newIntents = e.target.checked
                              ? [...formData.intentType, intent.value]
                              : formData.intentType.filter(i => i !== intent.value);
                            setFormData(prev => ({ ...prev, intentType: newIntents }));
                          }}
                          className="w-5 h-5 text-purple-600 border-gray-600 rounded focus:ring-2 focus:ring-purple-500"
                        />
                        <Icon className="w-6 h-6 text-purple-400 mx-4" />
                        <span className="text-white font-medium">{intent.label}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Consultation Message */}
                {formData.intentType.includes('consultation') && (
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Tell us about your consultation needs
                    </label>
                    <textarea
                      rows={4}
                      value={formData.consultationMessage}
                      onChange={(e) => setFormData(prev => ({ ...prev, consultationMessage: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 text-white"
                      placeholder="Describe what you're looking for..."
                    />
                  </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-800">
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit
                        <CheckCircle className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* PARTICIPANT FLOW - Similar to investor but simpler */}
        {userType === 'participant' && step >= 1 && step <= 2 && (
          <>
            {/* Step 1: Personal Details (same as investor step 1) */}
            {step === 1 && (
              <div className="bg-gray-900 rounded-2xl border-2 border-gray-800 shadow-2xl p-8">
                {/* Same personal details form as investor */}
                <div className="flex items-center mb-8">
                  <Users className="w-8 h-8 text-blue-400 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Personal Details</h2>
                    <p className="text-gray-400">Tell us about yourself</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, firstName: e.target.value }));
                        if (errors.firstName) setErrors(prev => ({ ...prev, firstName: null }));
                      }}
                      className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 text-white ${
                        errors.firstName ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, lastName: e.target.value }));
                        if (errors.lastName) setErrors(prev => ({ ...prev, lastName: null }));
                      }}
                      className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 text-white ${
                        errors.lastName ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                      }}
                      className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 text-white ${
                        errors.email ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Organization</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Your organization"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-800">
                  <button
                    onClick={() => setStep(0)}
                    className="px-6 py-3 border-2 border-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center shadow-lg"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Intent */}
            {step === 2 && (
              <div className="bg-gray-900 rounded-2xl border-2 border-gray-800 shadow-2xl p-8">
                <div className="flex items-center mb-8">
                  <Target className="w-8 h-8 text-blue-400 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Your Intent</h2>
                    <p className="text-gray-400">What brings you to our platform?</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { value: 'events', label: 'Participate in Events & Pitching Opportunities', icon: Calendar },
                    { value: 'consultation', label: 'Request Consultation', icon: Users }
                  ].map(intent => {
                    const Icon = intent.icon;
                    return (
                      <label
                        key={intent.value}
                        className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.intentType.includes(intent.value)
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.intentType.includes(intent.value)}
                          onChange={(e) => {
                            const newIntents = e.target.checked
                              ? [...formData.intentType, intent.value]
                              : formData.intentType.filter(i => i !== intent.value);
                            setFormData(prev => ({ ...prev, intentType: newIntents }));
                          }}
                          className="w-5 h-5 text-blue-600 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <Icon className="w-6 h-6 text-blue-400 mx-4" />
                        <span className="text-white font-medium">{intent.label}</span>
                      </label>
                    );
                  })}
                </div>

                {formData.intentType.includes('consultation') && (
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Tell us what you need help with
                    </label>
                    <textarea
                      rows={4}
                      value={formData.consultationMessage}
                      onChange={(e) => setFormData(prev => ({ ...prev, consultationMessage: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Describe your needs..."
                    />
                  </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-800">
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit
                        <CheckCircle className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* SUCCESS STEP */}
        {step === 999 && (
          <div className="bg-gray-900 rounded-2xl border-2 border-gray-800 shadow-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Registration Successful!
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {userType === 'vendor' 
                ? 'Your funding application has been submitted. Investors can now view your profile.'
                : userType === 'investor'
                ? 'Welcome to the Climate Finance network. You can now access funding opportunities.'
                : 'Thank you for joining! We\'ll keep you updated on events and opportunities.'}
            </p>

            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-6 mb-8 border border-purple-500/30">
              <h3 className="font-semibold text-white mb-4">What&apos;s Next?</h3>
              <div className="space-y-3 text-left max-w-xl mx-auto">
                {userType === 'vendor' && [
                  'Your profile is visible to investors',
                  'Investors can contact you directly',
                  'Your Clean Tech listing is linked',
                  'You\'ll receive notifications for interest'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
                {userType === 'investor' && [
                  'Access the investor dashboard',
                  'Browse funding opportunities',
                  'Connect with clean tech ventures',
                  'Participate in pitch events'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
                {userType === 'participant' && [
                  'You\'ll receive event invitations',
                  'Access consultation services',
                  'Network with ecosystem partners',
                  'Stay updated on opportunities'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/climate-finance/dashboard')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
              >
                {userType === 'investor' ? 'View Dashboard' : 'Explore Platform'}
              </button>
              <button
                onClick={() => router.push('/climate-finance')}
                className="px-8 py-4 border-2 border-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info Modals */}
      <InfoModal
        isOpen={showModal === 'project-finance'}
        onClose={() => setShowModal(null)}
        title="Project Finance (On Assets)"
        content={modalContent['project-finance']}
      />
      <InfoModal
        isOpen={showModal === 'raise-equity'}
        onClose={() => setShowModal(null)}
        title="Raise Equity"
        content={modalContent['raise-equity']}
      />
    </div>
  );
}
