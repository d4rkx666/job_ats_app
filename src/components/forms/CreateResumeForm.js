import React, { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import ProBadge from "../common/ProBadge"
import SubmitButton from "../common/SubmitButton"
import KeywordOptimizationToggle from "../common/KeywordOptimizationToggle"

const CreateResumeForm = ({ user, onSubmit, onOptimization, isLoading, isOptimized, labels }) => {
  // Form state
  const {
    register,
    handleSubmit,
    trigger,
    watch,
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

  // Consts need
  const isPro = user.subscription.plan === 'pro' || user.subscription.plan === 'business';
  const [resume, setResume] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1-4 steps

  const job_description = watch("job_description");

  // Templates data
  const TEMPLATES = [
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'ats', name: 'ATS-Friendly', proOnly: true },
  ];

  // Download handler
  const handleDownload = (format) => {
    alert(`Implement ${format} download`);
  };

  // Control next step
  const handleOnNextStep = async (step) => {

    let isValid = true;
    if (currentStep == 1) {
      const val1 = await trigger("job_title");
      const val2 = await trigger("job_description");

      isValid = val1 && val2;
    }

    if (isValid) {
      setCurrentStep(step)
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6">

      <div className="bg-white p-6 rounded-lg shadow mb-6">


        {/* Job */}
        <div className={`${currentStep !== 1 && 'hidden'}`}>
          <h2 className="text-xl font-bold mb-4">Step 1: Which job position are you applying for?</h2>

          {/* Job title */}
          <div className='mb-3'>
          <input
            type="text"
            id="job_title"
            {...register("job_title", {
              required: labels.formImproveResume.jobTitle.required,
            })}
            placeholder={labels.formImproveResume.jobTitle.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.job_title && (
            <p className="text-red-500 text-sm mt-2">{errors.job_title.message}</p>
          )}
          </div>

          {/* Job description */}
          <div className='mb-3'>
          <textarea
            {...register('job_description', {
              required: 'Job description is required',
              minLength: {
                value: 10,
                message: "Please provide at least 10 characters"
              }
            })}
            className={`w-full h-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Paste the job description here..."
            disabled={isOptimized}
          />
          {errors.job_description && (
            <p className="text-red-500 text-sm mt-2">{errors.job_description.message}</p>
          )}
          </div>
        </div>

        {/* Keywords Optimization */}
        <div className={`${currentStep !== 2 && 'hidden'}`}>
          <div className="items-center mt-4 mb-6">
            <h2 className="text-xl font-bold">Step 2: Let's match the keywords with your profile.</h2>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              First of all, ensure a good score to beat ATS.
            </label>
            <KeywordOptimizationToggle jobDescription={job_description} profileText={"asdasd"} pro={isPro} isOptimized={isOptimized} onOptimization={onOptimization} />
          </div>
        </div>

        {/* Template Selection */}
        <div className={`${currentStep !== 3 && 'hidden'}`}>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Step 3: Choose your favourite template.</h2>
            <label className="block mb-2 font-medium">Template</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {TEMPLATES.map((template) => (
                <label
                  key={template.id}
                  className={`
                  border p-3 rounded transition-colors
                  ${template.proOnly ? 'border-blue-300' : 'border-gray-300'}
                  ${!isPro && template.proOnly ?
                      'opacity-50 cursor-not-allowed' :
                      'hover:border-blue-500'}
                `}
                >
                  <input
                    type="radio"
                    value={template.id}
                    {...register('template')}
                    className="mr-2"
                    disabled={!isPro && template.proOnly}
                  />
                  {template.name}
                  {template.proOnly && (
                    <ProBadge />
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Cover letter */}
        <div className={`${currentStep !== 4 && 'hidden'}`}>
          <div className="mt-6">
            <h2 className="text-xl font-bold">Step 4: Need a cover letter?</h2>
            <label className={`flex items-center mt-4 ${!isPro ? 'opacity-50 cursor-not-allowed' : ''
              }`}>
              <input
                type="checkbox"
                {...register('includeCoverLetter')}
                className="mr-2"
                disabled={!isPro}
              />
              Include Cover Letter
              <ProBadge />
            </label>
          </div>

          {/* Generate Button */}
          <SubmitButton className="w-full mt-5 py-3 px-4 rounded-lg font-bold text-white" loading={isLoading} loadingLabel={"Generating..."} label={"I have beaten ATS. Generate my new Resume"} />
        </div>

        <div className='flex space-x-5 mt-3 justify-center'>
          <button type='button' disabled={currentStep === 2 && isOptimized} className={`py-2 px-5 rounded-lg bg-blue-500 font-bold text-white hover:bg-blue-400 disabled:opacity-50 disabled:hover:bg-blue-500 ${currentStep === 1 && 'hidden'}`} onClick={() => handleOnNextStep(currentStep - 1)}>Step back</button>
          <button type='button' disabled={currentStep === 2 && !isOptimized} className={`py-2 px-5 rounded-lg bg-blue-500 font-bold text-white hover:bg-blue-400 disabled:opacity-50 disabled:hover:bg-blue-500 ${currentStep === 4 && 'hidden'}`} onClick={() => handleOnNextStep(currentStep + 1)}>Next step</button>
        </div>
      </div>


      {/* Results */}
      {resume && (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Resume</h2>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => handleDownload('pdf')}
                className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
              >
                PDF
              </button>
              <button
                type="button"
                onClick={() => handleDownload('docx')}
                className={`px-3 py-1 rounded text-sm ${isPro ?
                  'bg-gray-100 hover:bg-gray-200' :
                  'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!isPro}
              >
                Word
                {!isPro && (
                  <ProBadge />
                )}
              </button>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="p-4 border rounded bg-gray-50 whitespace-pre-line">
            {resume.content}
          </div>

          {/* Keywords */}

        </div>
      )}
    </form>
  );
};

export default CreateResumeForm;