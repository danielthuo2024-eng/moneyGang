import React from 'react';

const ResultsCard = ({ result }) => {
  const getStatusConfig = () => {
    switch (result.decision_status) {
      case 'APPROVED':
        return {
          color: 'text-teal',
          bgColor: 'bg-teal bg-opacity-10',
          icon: '✅',
          title: 'Credit Approved',
          description: 'Your M-Pesa analysis shows strong financial health!'
        };
      case 'DECLINED':
        return {
          color: 'text-coral',
          bgColor: 'bg-coral bg-opacity-10',
          icon: '❌',
          title: 'Credit Declined',
          description: 'Based on your transaction patterns, we cannot approve credit at this time.'
        };
      case 'SECOND_LOOK':
        return {
          color: 'text-amber-600',
          bgColor: 'bg-amber-100',
          icon: '🔍',
          title: 'Further Review Needed',
          description: 'Your application requires additional verification.'
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: '📊',
          title: 'Analysis Complete',
          description: 'Your M-Pesa statement has been processed.'
        };
    }
  };

  const statusConfig = getStatusConfig();

  // Calculate metrics for visualization
  const metrics = [
    { label: 'Income Stability', value: result.extracted_data?.transaction_consistency || 0, color: 'bg-green-500' },
    { label: 'Savings Rate', value: result.extracted_data?.savings_rate || 0, color: 'bg-blue-500' },
    { label: 'Payment Consistency', value: Math.min(100, (result.extracted_data?.transaction_consistency || 0) + 15), color: 'bg-purple-500' },
    { label: 'Financial Health', value: result.credit_score, color: 'bg-teal' }
  ];

  return (
    <div className="card hover:shadow-xl transition-shadow duration-300">
      {/* Status Header */}
      <div className={`${statusConfig.bgColor} p-6 rounded-lg mb-6 text-center transform hover:scale-[1.02] transition-transform duration-300`}>
        <div className="text-4xl mb-2 animate-bounce">{statusConfig.icon}</div>
        <h2 className={`text-2xl font-bold ${statusConfig.color} mb-2`}>
          {statusConfig.title}
        </h2>
        <p className="text-gray-600">{statusConfig.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Score & Metrics */}
        <div className="space-y-6">
          {/* Main Score */}
          <div className="text-center">
            <div className="flex justify-center items-end space-x-2 mb-4">
              <span className="text-5xl font-bold text-indigo">{result.credit_score}</span>
              <span className="text-2xl text-gray-500 mb-1">/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
              <div 
                className="score-bar h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${result.credit_score}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">AI Credit Score</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                  <span className="text-lg font-bold text-indigo">{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${metric.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Interest Rate */}
          {result.interest_rate && (
            <div className="bg-gradient-to-r from-indigo to-teal p-6 rounded-lg text-white transform hover:scale-[1.02] transition-transform duration-300">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">{result.interest_rate}%</div>
                <div className="text-sm opacity-90">Recommended Interest Rate</div>
                <div className="text-xs opacity-75 mt-1">Annual percentage rate</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Insights */}
        <div className="space-y-6">
          {/* Key Factors */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-3 h-3 bg-indigo rounded-full mr-2"></span>
              Key Factors
            </h3>
            <div className="space-y-3">
              {result.reason_codes.map((reason, index) => (
                <div key={index} className="flex items-start bg-white border border-gray-200 p-3 rounded-lg hover:border-indigo/30 transition-all duration-200 group">
                  <span className="w-2 h-2 bg-teal rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Snapshot */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Financial Snapshot</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {result.extracted_data.monthly_income && (
                <div className="text-center p-2 bg-white rounded">
                  <div className="text-gray-500">Monthly Income</div>
                  <div className="font-semibold text-green-600">KSh {result.extracted_data.monthly_income.toLocaleString()}</div>
                </div>
              )}
              {result.extracted_data.monthly_expenses && (
                <div className="text-center p-2 bg-white rounded">
                  <div className="text-gray-500">Monthly Expenses</div>
                  <div className="font-semibold text-coral">KSh {result.extracted_data.monthly_expenses.toLocaleString()}</div>
                </div>
              )}
              {result.extracted_data.avg_daily_balance && (
                <div className="text-center p-2 bg-white rounded">
                  <div className="text-gray-500">Avg Balance</div>
                  <div className="font-semibold text-indigo">KSh {result.extracted_data.avg_daily_balance.toLocaleString()}</div>
                </div>
              )}
              {result.extracted_data.credit_history_length && (
                <div className="text-center p-2 bg-white rounded">
                  <div className="text-gray-500">History</div>
                  <div className="font-semibold text-teal">{result.extracted_data.credit_history_length} months</div>
                </div>
              )}
            </div>
          </div>

          {/* Confidence Score */}
          <div className="flex items-center justify-between p-3 bg-indigo/5 rounded-lg">
            <span className="text-sm text-gray-700">AI Confidence</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-teal h-2 rounded-full"
                  style={{ width: `${result.confidence_score * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-indigo">
                {Math.round(result.confidence_score * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t mt-8">
        <button 
          onClick={() => window.history.back()}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
        >
          ← Back to Upload
        </button>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => window.location.href = '/history'}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
          >
            View History
          </button>
          <button 
            onClick={() => window.print()}
            className="btn-secondary"
          >
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;