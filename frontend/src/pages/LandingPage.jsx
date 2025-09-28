import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@headlessui/react'

const LandingPage = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after a short delay for smooth entrance
    const timer = setTimeout(() => {
      setShowBanner(true);
      // Trigger fade-in animation after state update
      setTimeout(() => setIsVisible(true), 50);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismissBanner = () => {
    // Start fade-out animation
    setIsVisible(false);
    // Remove banner from DOM after animation completes
    setTimeout(() => setShowBanner(false), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-warm via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 pt-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Animated Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="relative z-10">
            {/* Main Heading */}
            <div className="mb-8 mt-8">
              <h1 className="text-2xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-teal bg-clip-text text-transparent ps-px">
                  Upload your M-Pesa statement and get instant credit assessment powered by AI.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                No forms, no waiting - only financial insights. 
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500">
              <Link
                to="/upload"
                className="group relative bg-coral text-white font-semibold text-lg px-8 py-4 rounded-none hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500">
                  Analyze Your M-Pesa
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link
                to="/history"
                className="group relative bg-indigo text-white font-semibold text-lg px-8 py-4 rounded-none hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                View Analysis History
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo mb-2">30s</div>
                <div className="text-gray-600">Average Analysis Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal mb-2">95%</div>
                <div className="text-gray-600">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-coral mb-2">100%</div>
                <div className="text-gray-600">Secure & Private</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-white/50 backdrop-blur-sm py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to get your AI-powered credit assessment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload Statement</h3>
              <p className="text-gray-600">
                Upload your M-Pesa statement in PDF or CSV format. We support statements from the M-Pesa app or SMS exports.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-teal to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your transaction patterns, income consistency, and financial behavior in real-time.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-coral to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Results</h3>
              <p className="text-gray-600">
                Receive instant credit score, personalized insights, and actionable recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-gradient-to-r from-indigo to-teal py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Your Data is 100% Secure</h2>
            <p className="text-indigo-100 text-lg mb-8">
              We use bank-level encryption and never store your personal information.
              Your financial data is processed securely and deleted after analysis.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                End-to-End Encryption
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Data Deleted After Analysis
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No Personal Data Storage
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;