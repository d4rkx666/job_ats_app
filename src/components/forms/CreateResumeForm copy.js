import React from 'react';
import { useForm } from 'react-hook-form';
import {useAuth} from "../../contexts/AuthContext";
import KeywordOptimizationToggle from "../common/KeywordOptimizationToggle"

const CreateResumeForm = (profileData ) => {
  const auth = useAuth(); // Get user's plan (free/pro/business)
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data) => {
    console.log("Generation options:", data);
    // Will connect to API later
  };

  // Watch plan to gray out features
  const isPro = auth.user.subscription.plan === 'pro' || auth.user.subscription.plan === 'business';
  const isBusiness = auth.user.subscription.plan === 'business';

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg'>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Create
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Job Description Input (Free) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            {...register('jobDescription', { required: true })}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste the job description here..."
          />
        </div>

        {/* Template Selection (Free) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Template Style
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Classic', 'Modern', 'Minimalist'].map((template) => (
              <label key={template} className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...register('template')}
                  value={template.toLowerCase()}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  defaultChecked={template === 'Classic'}
                />
                <span>{template}</span>
              </label>
            ))}
          </div>
        </div>

        {/* PRO FEATURES (Gated) */}
        <div className={`mb-6 ${!isPro && 'opacity-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900">
              AI Optimization
              {!isPro && (
                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  PRO
                </span>
              )}
            </h3>
          </div>

          <div className="space-y-3">
              <KeywordOptimizationToggle jobDescription={"asadada"} profileText={"asdasd"} disabled={!isPro}/>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('quantifyAchievements')}
                disabled={!isPro}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 disabled:text-gray-400"
              />
              <span>Quantify achievements with metrics</span>
            </label>
          </div>
        </div>

        {/* BUSINESS FEATURES (Gated) */}
        <div className={`mb-6 ${!isBusiness && 'opacity-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900">
              Team Features
              {!isBusiness && (
                <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  BUSINESS
                </span>
              )}
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('branding')}
                disabled={!isBusiness}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 disabled:text-gray-400"
              />
              <span>Add company branding</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Generate Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;