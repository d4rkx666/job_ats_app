import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ProBadge } from "../common/Badge";
import SubmitButton from "../common/SubmitButton";
import KeywordOptimizerModal from '../common/KeywordOptimizerModal';
import { RoundedATSIndicador } from '../common/RoundedATSIndicator';

const CreateResumeForm = ({ 
  user, 
  onSubmit, 
  onOptimization, 
  error, 
  context, 
  isLoading, 
  isOptimized, 
  isOptimizerOpen, 
  setIsOptimizerOpen, 
  setJobTitle, 
  setJobDescription, 
  setType, 
  currentStep, 
  setCurrentStep, 
  matchScore, 
  keywords, 
  draft, 
  labels 
}) => {
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      jobDescription: '',
      language: 'en',
      template: 'classic',
      includeCoverLetter: false
    },
    mode: 'all'
  });

  const isPro = user?.subscription?.plan === 'pro' || user?.subscription?.plan === 'business';
  const job_title = watch("job_title");
  const job_description = watch("job_description");
  const [optimizationType, setOptimizationType] = useState('free');

  // Enhanced templates with visual indicators
  const TEMPLATES = [
    { id: 'classic', name: 'Classic', popular: false },
    { id: 'modern', name: 'Modern', popular: true },
    { id: 'ats', name: 'ATS-Optimized', proOnly: true, badge: 'Best Score' },
    { id: 'executive', name: 'Executive', proOnly: true }
  ];

  const handleOnNextStep = async (step) => {
    if (currentStep === 1) {
      const isValid = await trigger(["job_title", "job_description"]);
      if (!isValid) return;
    }
    setCurrentStep(step);
  };

  const onContinue = () => setCurrentStep(3);

  useEffect(() => {
    setJobTitle(job_title);
    setJobDescription(job_description);
    setType(optimizationType);
  }, [job_title, job_description, optimizationType]);

  useEffect(() => {
    if (draft.isOptimizedDraft) {
      setValue("job_title", draft.item.job_title);
      setValue("job_description", draft.item.job_description);
    }
  }, [draft.isOptimizedDraft]);

  useEffect(() => {
    if (currentStep === 2) setIsOptimizerOpen(true);
  }, [currentStep]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-4">
      {/* Progress Stepper */}
      <div className="flex justify-between mb-8 relative">
        {[1, 2, 3, 4].map((step) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center z-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}
                ${currentStep === step ? 'ring-4 ring-blue-200' : ''}`}>
                {step}
              </div>
              <span className={`text-sm mt-2 ${currentStep >= step ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                {['Job Info', 'Optimize', 'Design', 'Extras'][step - 1]}
              </span>
            </div>
            {step < 4 && (
              <div className={`absolute h-1 w-full top-5 transform -translate-y-1/2 
                ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`} 
                style={{ 
                  left: `calc(${step * 30}% - 24%)`, 
                  width: '30%',
                  zIndex: -1
                }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Step 1: Job Details */}
        {currentStep === 1 && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                1
              </span>
              Tell us about the job
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title*
                </label>
                <input
                  type="text"
                  id="job_title"
                  {...register("job_title", {
                    required: labels.formImproveResume.jobTitle.required,
                  })}
                  placeholder="e.g. 'Senior Product Designer @ Google'"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                {errors.job_title && (
                  <p className="text-red-500 text-sm mt-1">{errors.job_title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description*
                </label>
                <textarea
                  {...register('job_description', {
                    required: 'Job description is required',
                    minLength: {
                      value: 10,
                      message: "Please provide at least 10 characters"
                    }
                  })}
                  className="w-full h-48 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Paste the full job description here..."
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.job_description ? (
                    <p className="text-red-500 text-sm">{errors.job_description.message}</p>
                  ) : (
                    <span className="text-xs text-gray-500">Minimum 10 characters</span>
                  )}
                  {isPro && (
                    <button 
                      type="button" 
                      className="text-xs flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Analyze LinkedIn Job <ProBadge size="xs" className="ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Keyword Optimization */}
        {currentStep === 2 && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                2
              </span>
              Optimize for ATS
            </h2>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">ATS Match Score</h3>
                  <p className="text-sm text-gray-600">How well your resume matches this job</p>
                </div>
                <RoundedATSIndicador score={matchScore} className="relative w-16 h-16" />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsOptimizerOpen(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Optimize Keywords
            </button>

            {isOptimizerOpen && (
              <KeywordOptimizerModal
                jobDescription={job_description}
                currentKeywords={keywords}
                matchScore={matchScore}
                isProUser={isPro}
                onOptimize={onOptimization}
                onClose={() => setIsOptimizerOpen(false)}
                isLoading={isLoading}
                optimizationType={optimizationType}
                setOptimizationType={setOptimizationType}
                context={context}
                onContinue={onContinue}
              />
            )}
          </div>
        )}

        {/* Step 3: Template Selection */}
        {currentStep === 3 && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                3
              </span>
              Choose your design
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEMPLATES.map((template) => (
                <label
                  key={template.id}
                  className={`
                    border rounded-lg p-4 transition-all cursor-pointer
                    ${watch('template') === template.id ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' : ''}
                    ${template.proOnly ? 'border-blue-200' : 'border-gray-200'}
                    ${!isPro && template.proOnly ? 'opacity-60' : 'hover:border-blue-400 hover:shadow-sm'}
                    relative overflow-hidden
                  `}
                >
                  <input
                    type="radio"
                    value={template.id}
                    {...register('template')}
                    className="sr-only"
                    disabled={!isPro && template.proOnly}
                  />
                  <div className="flex items-start">
                    <div className="bg-gray-100 w-16 h-20 rounded mr-4 flex items-center justify-center text-gray-400">
                      Preview
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-800 mr-2">
                          {template.name}
                        </h3>
                        {template.popular && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      {template.badge && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded mt-1">
                          {template.badge}
                        </span>
                      )}
                      {template.proOnly && (
                        <div className="mt-2">
                          <ProBadge size="xs" />
                        </div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Final Touches */}
        {currentStep === 4 && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                4
              </span>
              Final touches
            </h2>
            
            <div className="space-y-5">
              <div className={`p-4 border rounded-lg ${isPro ? 'border-gray-200' : 'border-gray-100 bg-gray-50'}`}>
                <label className={`flex items-center ${!isPro ? 'opacity-75' : ''}`}>
                  <input
                    type="checkbox"
                    {...register('includeCoverLetter')}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    disabled={!isPro}
                  />
                  <span className="ml-3 font-medium text-gray-800">
                    Generate matching cover letter
                  </span>
                  <ProBadge className="ml-2" />
                </label>
                {isPro && (
                  <p className="text-sm text-gray-500 mt-2 ml-7">
                    We'll create a personalized cover letter using your profile and this job description.
                  </p>
                )}
              </div>

              <SubmitButton 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm"
                loading={isLoading}
                loadingLabel="Generating your resume..."
                label="Generate My Resume"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between">
          <button
            type="button"
            onClick={() => handleOnNextStep(currentStep - 1)}
            disabled={currentStep === 1}
            className={`py-2 px-5 rounded-lg font-medium ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
          >
            Back
          </button>
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => handleOnNextStep(currentStep + 1)}
              disabled={currentStep === 2 && !isOptimized}
              className={`py-2 px-5 rounded-lg font-medium text-white ${currentStep === 2 && !isOptimized ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Continue
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default CreateResumeForm;