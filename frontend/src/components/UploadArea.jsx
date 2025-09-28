import React, { useState, useRef } from 'react';
import { DocumentIcon, CheckIcon, EyeIcon, LockIcon } from './Icons';

const UploadArea = ({ onFileSelect, isUploading, fileInputRef }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dropAreaRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleAreaClick = () => {
    if (!isUploading && !selectedFile) {
      fileInputRef.current?.click();
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Card - Now fully clickable */}
      <div 
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={handleAreaClick}
      >
        <div 
          ref={dropAreaRef}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            isDragOver 
              ? 'border-indigo bg-indigo bg-opacity-5 scale-105' 
              : 'border-gray-300 hover:border-indigo/50 hover:bg-gray-50/50'
          } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-gray-600 font-semibold">Analyzing your M-Pesa statement...</p>
              <p className="text-sm text-gray-500 mt-2">AI is processing your transaction data</p>
            </div>
          ) : selectedFile ? (
            <div className="py-4" onClick={(e) => e.stopPropagation()}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">File Selected</h3>
              <p className="text-gray-600 mb-4 truncate">{selectedFile.name}</p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => onFileSelect(selectedFile)}
                  className="bg-teal hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Analyze Now
                </button>
                <button 
                  onClick={removeFile}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-red-300 hover:text-red-600 transition-colors"
                >
                  Change File
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 bg-gradient-to-br from-indigo to-teal rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
                <DocumentIcon className="text-3xl text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Upload M-Pesa Statement
              </h3>
              
              <p className="text-gray-600 mb-6 text-lg">
                Click anywhere or drag and drop your statement here
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.csv"
                onChange={handleFileInputChange}
                className="hidden"
                id="mpesa-upload"
              />
              
              <label
                htmlFor="mpesa-upload"
                className="bg-teal hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 cursor-pointer inline-block text-lg"
                onClick={(e) => e.stopPropagation()}
              >
                Choose File
              </label>
              
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: PDF, CSV • Max size: 5MB
              </p>
            </>
          )}
        </div>
      </div>

      {/* Instructions */}
      {!selectedFile && !isUploading && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
              <EyeIcon className="w-5 h-5 mr-2" />
              How to Get Your Statement
            </h4>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li>• <strong>M-Pesa App:</strong> Statements → Download PDF</li>
              <li>• <strong>USSD:</strong> Dial *234# → M-Pesa Statements</li>
              <li>• <strong>Online:</strong> M-Pesa website → Export CSV</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="font-semibold text-green-900 mb-3 flex items-center">
              <LockIcon className="w-5 h-5 mr-2" />
              What We Analyze
            </h4>
            <ul className="text-green-800 space-y-2 text-sm">
              <li>• Income consistency and patterns</li>
              <li>• Spending habits and categories</li>
              <li>• Savings and financial behavior</li>
              <li>• Transaction frequency and amounts</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;