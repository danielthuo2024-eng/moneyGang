import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HistoryPage = () => {
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      loadAnalyses();
      setIsLoading(false);
    }, 800);
  }, []);

  const loadAnalyses = () => {
    const saved = localStorage.getItem('mpesaAnalysisHistory');
    if (saved) {
      setAnalyses(JSON.parse(saved));
    }
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all analysis history? This action cannot be undone.')) {
      localStorage.removeItem('mpesaAnalysisHistory');
      setAnalyses([]);
      setSelectedAnalysis(null);
    }
  };

  const deleteAnalysis = (id) => {
    const updated = analyses.filter(analysis => analysis.id !== id);
    setAnalyses(updated);
    localStorage.setItem('mpesaAnalysisHistory', JSON.stringify(updated));
    if (selectedAnalysis && selectedAnalysis.id === id) {
      setSelectedAnalysis(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'text-teal';
      case 'DECLINED': return 'text-coral';
      case 'SECOND_LOOK': return 'text-amber-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'APPROVED': return 'bg-teal bg-opacity-10';
      case 'DECLINED': return 'bg-coral bg-opacity-10';
      case 'SECOND_LOOK': return 'bg-amber-100';
      default: return 'bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-warm flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your analysis history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-warm py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis History</h1>
              <p className="text-gray-600">Review your past M-Pesa statement analyses</p>
            </div>
            
            {analyses.length > 0 && (
              <div className="flex space-x-3 mt-4 md:mt-0">
                <Link 
                  to="/upload" 
                  className="btn-secondary"
                >
                  New Analysis
                </Link>
                <button onClick={clearHistory} className="btn-danger">
                  Clear All
                </button>
              </div>
            )}
          </div>

          {analyses.length === 0 ? (
            <div className="card text-center py-16 animate-fade-in">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-gray-400">📊</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No analyses yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                You haven't analyzed any M-Pesa statements yet. Upload your first statement to get AI-powered insights into your financial health.
              </p>
              <Link to="/upload" className="btn-primary inline-block text-lg px-8 py-3">
                Analyze Your First Statement
              </Link>
              <div className="mt-6 text-sm text-gray-500">
                <p>Supported formats: PDF, CSV • Maximum file size: 5MB</p>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
              <div className="lg:col-span-2">
                <div className="card">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 font-semibold text-gray-700">Date</th>
                          <th className="text-left py-4 font-semibold text-gray-700">File</th>
                          <th className="text-left py-4 font-semibold text-gray-700">Status</th>
                          <th className="text-left py-4 font-semibold text-gray-700">Score</th>
                          <th className="text-left py-4 font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analyses.map((analysis) => (
                          <tr 
                            key={analysis.id} 
                            className="border-b hover:bg-gray-50 cursor-pointer transition-colors duration-150 group"
                            onClick={() => setSelectedAnalysis(analysis)}
                          >
                            <td className="py-4">
                              <div className="text-sm text-gray-600">
                                {new Date(analysis.timestamp).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-400">
                                {new Date(analysis.timestamp).toLocaleTimeString()}
                              </div>
                            </td>
                            <td className="py-4">
                              <div className="font-medium truncate max-w-xs group-hover:text-indigo transition-colors">
                                {analysis.filename}
                              </div>
                            </td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(analysis.status)} ${getStatusColor(analysis.status)}`}>
                                {analysis.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
                                  <div 
                                    className="score-bar h-2 rounded-full" 
                                    style={{ width: `${analysis.result.credit_score}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  {analysis.result.credit_score}
                                </span>
                              </div>
                            </td>
                            <td className="py-4">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteAnalysis(analysis.id);
                                }}
                                className="text-coral hover:text-coral-800 text-sm font-medium px-3 py-1 rounded hover:bg-red-50 transition-colors"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                {selectedAnalysis ? (
                  <div className="card sticky top-8 animate-fade-in">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg text-gray-900">Analysis Details</h3>
                      <button
                        onClick={() => setSelectedAnalysis(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Filename</label>
                        <p className="font-medium truncate">{selectedAnalysis.filename}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Analysis Date</label>
                        <p className="font-medium">{new Date(selectedAnalysis.timestamp).toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Status</label>
                        <p className={`font-medium ${getStatusColor(selectedAnalysis.status)}`}>
                          {selectedAnalysis.status.replace('_', ' ')}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Credit Score</label>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="score-bar h-2 rounded-full" 
                              style={{ width: `${selectedAnalysis.result.credit_score}%` }}
                            ></div>
                          </div>
                          <span className="font-medium text-indigo">{selectedAnalysis.result.credit_score}/100</span>
                        </div>
                      </div>
                      {selectedAnalysis.result.interest_rate && (
                        <div>
                          <label className="text-sm text-gray-500">Interest Rate</label>
                          <p className="font-medium text-teal">{selectedAnalysis.result.interest_rate}%</p>
                        </div>
                      )}
                      {selectedAnalysis.result.reason_codes && (
                        <div>
                          <label className="text-sm text-gray-500">Key Factors</label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedAnalysis.result.reason_codes.slice(0, 3).map((code, index) => (
                              <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                                {code.split(' ')[0]}...
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="card text-center py-12">
                    <div className="text-4xl mb-3">👆</div>
                    <p className="text-gray-600 font-medium">Select an analysis</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Click on any analysis in the list to view details
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;