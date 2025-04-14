import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ProBadge } from "../common/Badge";
import SubmitButton from "../common/SubmitButton";
import { UpgradeProKeywords } from '../common/UpgradeProKeywords';
import { KeywordList } from '../common/KeywordList';

const CreateResumeForm = ({
  user,
  onSubmit,
  onExtraction,
  isLoading,
  isLoadingKeywords,
  isOptimized,
  setIsOptimizerOpen,
  setJobTitle,
  setJobDescription,
  currentStep,
  setCurrentStep,
  keywords,
  draft,
  labels,
  costKeywords,
  costCreateResume
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

  // Enhanced templates with visual indicators
  const TEMPLATES = [
    { id: 'classic', name: labels.createResumePage.form.templates.template1, popular: false },
    { id: 'modern', name: labels.createResumePage.form.templates.template2, popular: true },
    { id: 'ats', name: labels.createResumePage.form.templates.template3, proOnly: true, badge: labels.createResumePage.form.templates.bestScore },
    { id: 'executive', name: labels.createResumePage.form.templates.template4, proOnly: true }
  ];

  const handleOnNextStep = async (step) => {
    if (currentStep === 1) {
      const isValid = await trigger(["job_title", "job_description"]);
      if (!isValid) return;
    }
    setCurrentStep(step);
  };

  useEffect(() => {
    setJobTitle(job_title);
    setJobDescription(job_description);
  }, [job_title, job_description]);

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
                {[labels.createResumePage.form.steps.step1.step, labels.createResumePage.form.steps.step2.step, labels.createResumePage.form.steps.step3.step, labels.createResumePage.form.steps.step4.step][step - 1]}
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
              {labels.createResumePage.form.steps.step1.title}
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                {labels.createResumePage.form.jobTitle}
                </label>
                <input
                  type="text"
                  id="job_title"
                  {...register("job_title", {
                    required: labels.formImproveResume.jobTitle.required,
                  })}
                  placeholder={labels.createResumePage.form.jobTitlePlaceholder}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                {errors.job_title && (
                  <p className="text-red-500 text-sm mt-1">{errors.job_title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                {labels.createResumePage.form.jobDescription}
                </label>
                <textarea
                  {...register('job_description', {
                    required: labels.formImproveResume.jobDescription.required,
                    minLength: {
                      value: 10,
                      message: labels.createResumePage.form.jobDescriptionMinimumError
                    }
                  })}
                  className="w-full h-48 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={labels.createResumePage.form.jobDescriptionPlaceholder}
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">{labels.createResumePage.form.jobDescriptionMinimum}</span>
                  {false && (
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

        {/* Step 2: Keyword Extraction - Pro Upgrade Nudges */}
        {currentStep === 2 && (
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  2
                </span>
                <h2 className="text-2xl font-bold text-gray-800">
                  {draft.isOptimizedDraft ? labels.createResumePage.form.steps.step2.title2 : labels.createResumePage.form.steps.step2.title}
                </h2>
              </div>
              {keywords?.length > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {keywords.length} {labels.createResumePage.form.steps.step2.keywordsAmount}
                </span>
              )}
            </div>

            {keywords?.length > 0 && !isPro && (
              <UpgradeProKeywords keywords={keywords}/>
            )}

            {/* Extraction Panel (Shows when no keywords exist) */}
            {(!keywords || keywords.length === 0) && (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  {draft.isOptimizedDraft ? labels.createResumePage.form.steps.step2.withoutKeywords :labels.createResumePage.form.steps.step2.subtitle}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {draft.isOptimizedDraft
                    ? "This draft was created before keyword analysis was available."
                    : labels.createResumePage.form.steps.step2.extractInfo}
                </p>
                <div className="mt-6">
                <SubmitButton
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  loading={isLoadingKeywords}
                  loadingLabel="Analyzing..."
                  label={draft.isOptimizedDraft ? "Extract Keywords Now" : labels.createResumePage.form.steps.step2.extractBtn}
                  cost={costKeywords}
                  type={"button"}
                  onClick={onExtraction}
                />
                </div>
              </div>
            )}

            {/* Keyword Display (Shows when keywords exist) */}
            {keywords?.length > 0 && (
              <>
              <KeywordList isPro={isPro} keywords={keywords} labels={labels}/>

              {/* Re-extract Button */}
              <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onExtraction}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {labels.createResumePage.form.steps.step2.reExtractBtn} (2 credits)
                </button>
              </div>
              </>
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
              {labels.createResumePage.form.steps.step3.title}
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
                    {labels.createResumePage.form.steps.step3.preview}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-800 mr-2">
                          {template.name}
                        </h3>
                        {template.popular && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            {labels.createResumePage.form.steps.step3.popular}
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
              {labels.createResumePage.form.steps.step4.title}
            </h2>

            <div className="space-y-5">
              <div className={`p-4 border rounded-lg ${isPro ? 'border-gray-200' : 'border-gray-100 bg-gray-50'}`}>
                <label className={`flex items-center ${!isPro ? 'opacity-75' : ''}`}>
                  <input
                    type="checkbox"
                    {...register('includeCoverLetter')}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    //disabled={!isPro}
                    disabled={true}
                  />
                  <span className="ml-3 font-medium text-gray-800">
                  {labels.createResumePage.form.steps.step4.coverLetter}
                  </span>
                  <ProBadge className="ml-2" />
                </label>
                {isPro && (
                  <p className="text-sm text-gray-500 mt-2 ml-7">
                  {labels.createResumePage.form.steps.step3.coverLetterInfo}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2 ml-7">
                We are on construction... / Estamos en construcción...
                </p>
              </div>

              <SubmitButton
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm"
                loading={isLoading}
                loadingLabel={labels.createResumePage.form.steps.step4.creatingButton}
                label={labels.createResumePage.form.steps.step4.createButton}
                cost={costCreateResume}
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
            {labels.createResumePage.form.steps.stepBack}
          </button>
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => handleOnNextStep(currentStep + 1)}
              disabled={currentStep === 2 && !isOptimized}
              className={`py-2 px-5 rounded-lg font-medium text-white ${currentStep === 2 && !isOptimized ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {labels.createResumePage.form.steps.stepFoward}
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default CreateResumeForm;