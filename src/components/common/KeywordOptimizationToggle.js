import { useState, useEffect } from 'react';
import ProBadge from "../common/ProBadge"
import { Link } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';

export default function KeywordOptimizationToggle({ register, pro, matchScore, keywords, isOptimized, onOptimization }) {

  return (
    <>
      {isOptimized &&
        <div className="ml-3 bg-green-100 p-2 rounded">
          <h3 className="text-sm font-medium text-blue-800">This job has been saved as a draft in your <Link className='underline' to="/dashboard">Dashboard</Link>.</h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              {matchScore < 50 ? "We recommend you to update your profile or study the keywords you are missing." : matchScore >= 50 && matchScore < 80 ? "You're doing well! But you can do it better! Check back your profile to match these Keywords." : "You are ready to apply for this role! Go to Step 3."}
            </p>
          </div>
          <div className="mt-4">
            {matchScore < 80 ? 
              <Link to="/profile"
                type="button"
                className="text-sm font-medium text-blue-700 hover:text-blue-600 underline"
              >
                Go to mi profile →
              </Link>
              :""
            }
          </div>
        </div>
      }
      <div className={`space-y-2 p-3 mt-3 border rounded-lg ${pro ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'}`}>
        {!isOptimized &&
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <label className={`flex items-center`}>
                  <input
                    type="radio"
                    name="plan"
                    value="free"
                    defaultChecked="true"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    {...register("type")}
                  />
                  <span className="ml-2">Basic Keyword Optimization</span>
                </label>

                <label className={`flex items-center ${!pro ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <input
                    type="radio"
                    name="plan"
                    value="pro"
                    disabled={!pro}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    {...register("type")}
                  />
                  <span className="ml-2">AI-Powered Keyword Optimization</span>
                  <ProBadge className="ml-1" />
                </label>
              </div>
            </div>
            <button type='button' disabled={isOptimized} onClick={()=> onOptimization()}  className={`w-full  ${isOptimized ? "opacity-50" : "hover:bg-yellow-300"} bg-yellow-200 text-gray-700 py-1 rounded-full`}>
              Run Keyword Optimization
            </button>
          </>
        }

        {/* Progress bar - only shows when active */}
        {isOptimized && (
          <div className="pt-3">
            <p className="text-md font-medium text-center text-blue-600 mb-1">
              Your've got {matchScore}% for this position.
            </p>
            <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden text-center">
              <div
                className={`absolute top-0 left-0 h-full rounded-full progress-fill ${matchScore < 50 ? "bg-red-500" : matchScore >= 50 && matchScore < 80 ? "bg-yellow-500" : "bg-green-500"}`}
                style={{ width: `${matchScore}%` }}
              />
              <span className='absolute text-white'>{matchScore}%</span>
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Keyword Optimization</h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map(keyword => (
                  <span key={keyword} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}