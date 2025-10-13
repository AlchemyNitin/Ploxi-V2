'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Zap, 
  ArrowRight, 
  CheckCircle,
  Users,
  TrendingUp,
  Award,
  Globe,
  Sparkles,
  Target,
  BarChart3,
  Lightbulb,
  Star,
  Building2,
  DollarSign
} from 'lucide-react';

export default function CleanTechLandingPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Connect with Corporate Buyers',
      description: 'Access a curated network of enterprises actively seeking clean technology solutions'
    },
    {
      icon: TrendingUp,
      title: 'Showcase Your Innovation',
      description: 'Present your groundbreaking solutions to decision-makers across industries'
    },
    {
      icon: Target,
      title: 'Grow Your Business',
      description: 'Expand your market reach and accelerate revenue growth through strategic partnerships'
    },
    {
      icon: Award,
      title: 'Get Verified & Featured',
      description: 'Build credibility with verified listings and featured placement opportunities'
    }
  ];

  const stats = [
    { value: '500+', label: 'Corporate Buyers', icon: Building2 },
    { value: '150+', label: 'Clean Tech Vendors', icon: Lightbulb },
    { value: '₹200Cr+', label: 'Deals Facilitated', icon: DollarSign },
    { value: '25+', label: 'Countries', icon: Globe }
  ];

  const testimonials = [
    {
      company: 'SolarTech Innovations',
      quote: 'Ploxi helped us connect with 15 enterprise clients in the first quarter. The platform is a game-changer for clean tech vendors.',
      author: 'Rajesh Kumar',
      role: 'CEO',
      rating: 5
    },
    {
      company: 'AquaPure Systems',
      quote: 'The quality of leads and the ease of showcasing our water treatment solutions exceeded our expectations.',
      author: 'Priya Sharma',
      role: 'Founder',
      rating: 5
    },
    {
      company: 'GreenWaste Solutions',
      quote: 'From registration to closing deals, the entire process is seamless. Highly recommend for any clean tech company.',
      author: 'Michael Chen',
      role: 'Director',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Ploxi Branding */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="https://i.postimg.cc/QM8fvftG/IMG-20250819-WA0002.jpg"
                alt="Ploxi"
                width={48}
                height={48}
                className="h-12 w-12 object-contain rounded-xl transition-transform group-hover:scale-105"
                priority
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Ploxi</h1>
                <p className="text-xs text-gray-600">Empowering Sustainable Business Growth</p>
              </div>
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              ← Back to Main
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-8">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Clean Tech Marketplace</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connect Your <span className="text-blue-600">Clean Tech</span>
              <br />Solutions with Enterprise Buyers
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the leading marketplace connecting innovative clean technology providers 
              with corporations committed to sustainability. Showcase your solutions, generate 
              qualified leads, and accelerate your growth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/cleantech/registration"
                className="group inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Clean Tech Registration
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/cleantech/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Quick Access Dashboard
                <BarChart3 className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Free Registration</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No Commission on Deals</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Verified Buyers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Why Join Ploxi Clean Tech?
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock growth opportunities and connect with the right buyers for your clean technology solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h3>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Register Your Company',
                description: 'Complete a simple registration form with your company details and solution offerings',
                icon: Lightbulb
              },
              {
                step: '02',
                title: 'Create Your Listing',
                description: 'Showcase your technology, add images, certifications, and pricing information',
                icon: Sparkles
              },
              {
                step: '03',
                title: 'Connect & Grow',
                description: 'Receive qualified leads, respond to inquiries, and close deals with enterprise buyers',
                icon: TrendingUp
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-6xl font-bold text-blue-100">{item.step}</span>
                      <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h3>
            <p className="text-xl text-gray-600">
              Hear from clean tech vendors who have grown with Ploxi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Clean Tech Vendors
            </h3>
            <p className="text-xl text-gray-600">
              Join industry leaders already on the platform
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'Solar Energy Solutions',
              'Water Treatment Tech',
              'Smart Waste Management',
              'Green Building Systems',
              'EV Charging Networks',
              'Carbon Capture Tech',
              'IoT Monitoring Solutions',
              'Renewable Energy Storage'
            ].map((vendor, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-6 text-center border-2 border-gray-100 hover:border-blue-500 transition-all"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <p className="font-semibold text-gray-900">{vendor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-6">
            Ready to Accelerate Your Growth?
          </h3>
          <p className="text-xl mb-10 text-blue-100">
            Join hundreds of clean tech vendors connecting with enterprise buyers on Ploxi
          </p>
          <Link
            href="/cleantech/registration"
            className="inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            Start Your Registration Now
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image
                src="https://i.postimg.cc/QM8fvftG/IMG-20250819-WA0002.jpg"
                alt="Ploxi"
                width={32}
                height={32}
                className="h-8 w-8 object-contain rounded"
              />
              <div>
                <p className="font-semibold">Ploxi</p>
                <p className="text-xs text-gray-400">Empowering Sustainable Business Growth</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">© 2025 Ploxi. All rights reserved.</p>
              <p className="text-gray-400 text-sm">Bangalore, India</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
