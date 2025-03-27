import { useState, useEffect } from 'react';

export default function KeywordOptimizationToggle({ jobDescription, profileText, disabled = false }) {
  const [isOptimized, setIsOptimized] = useState(false);
  const [matchScore, setMatchScore] = useState(0);

  // Simulate score calculation (replace with actual NLP logic later)
  useEffect(() => {
    if (isOptimized && jobDescription && profileText) {
      const fakeScore = Math.min(
        100,
        Math.floor(
          (jobDescription.split(/\s+/).filter(word => 
            profileText.toLowerCase().includes(word.toLowerCase())
          ).length / jobDescription.split(/\s+/).length) * 100
        ) + 20 // Simulate AI boost
      );
      setMatchScore(fakeScore);
    } else {
      setMatchScore(0);
    }
  }, [isOptimized, jobDescription, profileText]);

  return (
    <div className={`space-y-2 p-4 border rounded-lg ${
      disabled ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="keywordOptimization"
            checked={isOptimized}
            onChange={() => setIsOptimized(!isOptimized)}
            disabled={disabled}
            className={`h-5 w-5 rounded ${
              disabled 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-600 focus:ring-blue-500'
            }`}
          />
          <label 
            htmlFor="keywordOptimization" 
            className={`font-medium ${
              disabled ? 'text-gray-500' : 'text-gray-900'
            }`}
          >
            Optimize for Keywords
            {disabled && (
              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                PRO
              </span>
            )}
          </label>
        </div>
        {isOptimized && (
          <span className="text-sm font-medium text-blue-600">
            {matchScore}% Match
          </span>
        )}
      </div>

      {/* Progress bar - only shows when active */}
      {isOptimized && (
        <div className="pt-2">
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full rounded-full progress-fill ${matchScore < 50 ? "bg-red-500" : matchScore >=50 && matchScore < 80 ? "bg-yellow-500" : "bg-green-500"}`}
              style={{ width: `${matchScore}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}