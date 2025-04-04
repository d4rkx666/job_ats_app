import { useEffect } from "react";
import { ProBadge } from "./Badge";
import { Link } from "react-router-dom";
import { ArrowPathIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function KeywordOptimizerModal({
  currentKeywords = [],
  matchScore = 0,
  isProUser,
  onOptimize,
  onClose,
  onContinue, // New prop for auto-continue
  isLoading,
  optimizationType,
  setOptimizationType,
  context // 'create' | 'draft' | 'preview'
}) {

   const showReoptimize = context === 'draft' && matchScore < 100;
  // Auto-close and continue if score is good
  useEffect(() => {
    if (matchScore >= 75 && context === 'create') {
      const timer = setTimeout(() => {
        onContinue?.();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [matchScore, context, onContinue]);

  // Close modal when clicking backdrop or pressing Escape
  useEffect(() => {
    const handleKeyDown = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const getContextText = () => {
    switch(context) {
      case 'draft': 
        return { title: "Improve Your Draft", action: "Update Draft" };
      case 'preview':
        return { title: "Re-optimize Resume", action: "Re-optimize" };
      default:
        return { title: "Keyword Optimization", action: "Optimize" };
    }
  };

  const { title, action } = getContextText();

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-5 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg max-w-md w-full p-6 animate-scale-in">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Score Display (when available) */}
          {matchScore > 0 && (
            <div className={`p-4 rounded-lg ${
              matchScore >= 80 ? 'bg-green-50' : 
              matchScore >= 50 ? 'bg-blue-50' : 'bg-yellow-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">ATS Match Score</span>
                <span className="font-bold">{matchScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-full rounded-full ${
                    matchScore >= 80 ? 'bg-green-500' : 
                    matchScore >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${matchScore}%` }}
                />
              </div>
              <p className="mt-2 text-sm">
                {matchScore < 50 ? "Needs significant improvement" : 
                 matchScore < 75 ? "Good but could be better" : 
                 "Excellent match!"}
              </p>
              
              {matchScore >= 75 && context === 'create' && (
                <div className="flex items-center mt-3 text-sm text-green-700">
                  <SparklesIcon className="h-4 w-4 mr-1" />
                  <span>Auto-continuing to templates...</span>
                </div>
              )}
            </div>
          )}

          {/* Keywords List */}
          {currentKeywords.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">
                {context === 'preview' ? "Current Keywords" : "Target Keywords"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentKeywords.map(keyword => (
                  <span 
                    key={keyword} 
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Optimization Options (for initial optimization) */}
          {(!matchScore || context === 'preview') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={optimizationType === 'free'}
                    onChange={() => setOptimizationType('free')}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>Basic Optimization</span>
                </label>
                <span className="text-sm text-gray-500">
                  {process.env.REACT_APP_KEYWORDS_OPTIMIZATION_COST} credit
                </span>
              </div>

              <div className={`flex items-center justify-between p-3 border rounded-lg ${
                !isProUser ? 'opacity-50' : ''
              }`}>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={optimizationType === 'pro'}
                    onChange={() => setOptimizationType('pro')}
                    disabled={!isProUser}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>AI-Powered Optimization</span>
                  <ProBadge />
                </label>
                <span className="text-sm text-gray-500">
                  {process.env.REACT_APP_KEYWORDS_OPTIMIZATION_COST} credits
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* Always show Re-optimize for drafts (unless 100%) */}
            {showReoptimize && context === "draft" && (
              <button
                onClick={() => onOptimize(optimizationType)}
                disabled={isLoading}
                className="flex-1 py-2 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50"
              >
                {isLoading ? (
                  <ArrowPathIcon className="h-4 w-4 mx-auto animate-spin" />
                ) : (
                  'Re-optimize'
                )}
              </button>
            )}

            {matchScore > 0 && matchScore < 75 && context === 'create' && (
              <Link
                to="/profile"
                onClick={onClose}
                className="flex-1 py-2 text-center border border-gray-300 rounded-lg text-sm"
              >
                Improve Profile
              </Link>
            )}
            
            <button
              onClick={() => matchScore > 0 ? onContinue?.() : onOptimize()}
              disabled={isLoading}
              type="button"
              className={`flex-1 py-2 px-4 rounded-lg ${
                isLoading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-medium text-sm`}
            >
              {isLoading && context === "create" ? (
                <>
                  <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                  Optimizing...
                </>
              ) : matchScore > 0 ? (
                context === 'preview' ? 'Save Changes' : 'Continue to Templates'
              ) : (
                `Run ${action}`
              )}
            </button>
          </div>

          {context === 'draft' && (
            <p className="text-xs text-gray-500 mt-2">
              Note: Re-optimizing will overwrite your existing draft
            </p>
          )}
        </div>
      </div>
    </div>
  );
}