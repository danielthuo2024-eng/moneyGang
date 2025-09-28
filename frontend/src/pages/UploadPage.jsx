import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadArea from '../components/UploadArea';
import ResultsCard from '../components/ResultsCard';
import LoadingSpinner from '../components/LoadingSpinner';

const UploadPage = () => {
  const [uploadResult, setUploadResult] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(progress);
      
      // Update step text based on progress
      if (progress < 25) setCurrentStep('uploading');
      else if (progress < 50) setCurrentStep('validating');
      else if (progress < 75) setCurrentStep('analyzing');
      else setCurrentStep('finalizing');
    }, 300);
  };

  const handleFileSelect = (file) => {
    setUploadProgress(0);
    processFileUpload(file);
  };

  const processFileUpload = async (file) => {
    // Validate file
    if (!file) {
      alert("Please upload your M-Pesa statement (.pdf or .csv).");
      return;
    }

    const allowedTypes = ['.pdf', '.csv'];
    const fileExtension = '.' + file.name.toLowerCase().split('.').pop();
    if (!allowedTypes.includes(fileExtension)) {
      alert("Unsupported file type — only PDF and CSV allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File exceeds 5MB limit. Please upload a smaller file.");
      return;
    }

    setIsUploading(true);
    setCurrentStep('uploading');
    simulateProgress();

    try {
      // Simulate API call with progress
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock success response
      const mockResult = {
        credit_score: Math.floor(Math.random() * 30) + 70, // 70-100
        decision_status: "APPROVED",
        interest_rate: 12.5,
        reason_codes: [
          "Strong consistent income pattern",
          "Excellent transaction frequency", 
          "Healthy account balance history",
          "Regular bill payment behavior"
        ],
        extracted_data: {
          monthly_income: 45000,
          monthly_expenses: 32000,
          avg_daily_balance: 125000,
          transaction_consistency: 85,
          savings_rate: 25,
          credit_history_length: 24
        },
        confidence_score: 0.87
      };

      setUploadResult(mockResult);
      saveToHistory(mockResult, file.name);
      
    } catch (err) {
      alert("Upload failed. Please try again or contact support.");
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const saveToHistory = (result, filename) => {
    const historyItem = {
      id: Date.now(),
      filename,
      timestamp: new Date().toISOString(),
      result: result,
      status: result.decision_status || 'processed'
    };

    const existingHistory = JSON.parse(localStorage.getItem('mpesaAnalysisHistory') || '[]');
    existingHistory.unshift(historyItem);
    localStorage.setItem('mpesaAnalysisHistory', JSON.stringify(existingHistory));
  };

  const handleNewUpload = () => {
    setUploadResult(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-warm via-white to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo to-teal rounded-2xl mb-4 shadow-lg">
              <span className="text-2xl text-white font-bold">📊</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              AI-Powered M-Pesa Analysis
            </h1>
            <p className="text-xl text-gray-600">
              Get instant credit assessment from your transaction history
            </p>
          </div>

          {/* Main Content */}
          {uploadResult ? (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Analysis Complete</h2>
                <button 
                  onClick={handleNewUpload}
                  className="bg-white border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:border-indigo hover:text-indigo transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Analyze Another Statement
                </button>
              </div>
              <ResultsCard result={uploadResult} />
            </div>
          ) : isUploading ? (
            <div className="card">
              <LoadingSpinner progress={uploadProgress} currentStep={currentStep} />
            </div>
          ) : (
            <UploadArea 
              onFileSelect={handleFileSelect}
              isUploading={isUploading}
              fileInputRef={fileInputRef}
            />
          )}

          {/* Info Cards */}
          {!uploadResult && !isUploading && (
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-teal/30 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl text-teal">🔒</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Bank-Level Security</h3>
                <p className="text-gray-600 text-sm">Your data is encrypted and deleted immediately after analysis</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-indigo/30 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-indigo/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl text-indigo">⚡</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
                <p className="text-gray-600 text-sm">Get AI-powered insights in under 30 seconds</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl text-amber-600">💡</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart Insights</h3>
                <p className="text-gray-600 text-sm">Understand your financial health with actionable recommendations</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;