'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Mail, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    // Load email from registration data
    const regData = sessionStorage.getItem('corporate-registration-complete');
    if (regData) {
      try {
        const data = JSON.parse(regData);
        setEmail(data.email);
      } catch (error) {
        console.error('Failed to load email');
      }
    }

    // Check if coming from verification link
    const token = searchParams.get('token');
    if (token) {
      verifyEmailToken(token);
    }
  }, [searchParams]);

  const verifyEmailToken = async (token) => {
    try {
      /*
      // Backend implementation:
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      if (response.ok) {
        // Email verified successfully
        router.push('/corporate/dashboard');
      } else {
        // Invalid or expired token
        alert('Invalid or expired verification link');
      }
      */
      console.log('Verifying token:', token);
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendMessage('');

    try {
      /*
      // Backend implementation:
      const response = await fetch('/api/auth/resend-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setResendMessage('Verification email sent! Please check your inbox.');
      } else {
        setResendMessage('Failed to send email. Please try again.');
      }
      */
      
      console.log('API Ready - POST /api/auth/resend-verification-email', { email });
      
      // Simulate success
      setTimeout(() => {
        setResendMessage('Verification email sent! Please check your inbox.');
        setIsResending(false);
      }, 2000);
    } catch (error) {
      console.error('Resend error:', error);
      setResendMessage('An error occurred. Please try again.');
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Image
              src="https://i.postimg.cc/QM8fvftG/IMG-20250819-WA0002.jpg"
              alt="Ploxi"
              width={48}
              height={48}
              className="h-12 w-12 object-contain rounded-xl"
              priority
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ploxi Earth</h1>
              <p className="text-sm text-gray-600">Email Verification</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-green-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Verify Your Email Address
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            We've sent a verification email to:
          </p>

          <div className="bg-green-50 rounded-xl p-4 mb-8 border-2 border-green-200">
            <p className="text-xl font-semibold text-green-800">{email}</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8 border-2 border-blue-200">
            <div className="flex items-start text-left">
              <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <div className="text-blue-800">
                <p className="font-semibold mb-2">Next Steps:</p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the verification link in the email</li>
                  <li>You'll be automatically redirected to your dashboard</li>
                </ol>
              </div>
            </div>
          </div>

          {resendMessage && (
            <div className={`mb-6 p-4 rounded-xl flex items-start ${
              resendMessage.includes('sent') 
                ? 'bg-green-50 border-2 border-green-200' 
                : 'bg-red-50 border-2 border-red-200'
            }`}>
              {resendMessage.includes('sent') ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              )}
              <p className={resendMessage.includes('sent') ? 'text-green-800' : 'text-red-800'}>
                {resendMessage}
              </p>
            </div>
          )}

          <button
            onClick={handleResendEmail}
            disabled={isResending}
            className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors flex items-center mx-auto disabled:opacity-50"
          >
            {isResending ? (
              <>
                <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5 mr-2" />
                Resend Verification Email
              </>
            )}
          </button>

          <p className="text-sm text-gray-500 mt-8">
            Need help? <a href="mailto:support@ploxi.com" className="text-green-600 font-semibold hover:text-green-700">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
