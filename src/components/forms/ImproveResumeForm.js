import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../common/SubmitButton";
import { useAuth } from "../../contexts/AuthContext"

function ImproveResumeForm({ onSubmit, isLoading, labels, cost, submitButtonRef, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    mode: 'all'
  });

  const { user } = useAuth();

  // credits
  const creditsUsed = user?.usage?.used_credits || 0;
  const totalCredits = user?.usage?.total_credits || 15;
  const creditsLeft = totalCredits - creditsUsed;

  const [filePreview, setFilePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showBenefits, setShowBenefits] = useState(false);
  const inputFileRef = useRef(null);
  const jobDescription = watch("job_description", "");

  // Character count for job description
  useEffect(() => {
    setCharCount(jobDescription.length);
  }, [jobDescription]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilePreview(file.name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setFilePreview(file.name);
      setValue("resume", e.dataTransfer.files);

      if (inputFileRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        inputFileRef.current.files = dataTransfer.files;
        const changeEvent = new Event("change", { bubbles: true });
        inputFileRef.current.dispatchEvent(changeEvent);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{labels.formImproveResume.title}</h1>
              <p className="mt-1 opacity-90">{labels.formImproveResume.subtitle} <b>{creditsLeft} {labels.formImproveResume.credits}</b></p>
            </div>
            <button
              type="button"
              onClick={() => setShowBenefits(!showBenefits)}
              className="mt-3 md:mt-0 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all flex items-center"
            >
              {showBenefits ? labels.formImproveResume.hide : labels.formImproveResume.show}
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${showBenefits ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {showBenefits && (
            <div className="mt-4 pt-4 border-t border-blue-400 border-opacity-30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{labels.formImproveResume.step1.title}</h3>
                    <p className="text-sm opacity-90">{labels.formImproveResume.step1.description}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{labels.formImproveResume.step2.title}</h3>
                    <p className="text-sm opacity-90">{labels.formImproveResume.step2.description}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 6H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2zM10 2h4v4h-4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{labels.formImproveResume.step3.title}</h3>
                    <p className="text-sm opacity-90">{labels.formImproveResume.step3.description}</p>
                  </div>
                </div>
              </div>
            </div>

          )}

          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700 rounded">
              <p>{error}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Resume Upload - Enhanced */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {labels.formImproveResume.resumeFile.label}
              </label>
              <span className="text-xs text-gray-500">{labels.formImproveResume.resumeFile.max}</span>
            </div>

            <div
              className={`relative flex items-center justify-center w-full rounded-lg border-2 border-dashed transition duration-300 ${isDragging
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-blue-300"
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label className="flex flex-col items-center px-4 py-8 cursor-pointer w-full">
                {filePreview ? (
                  <div className="text-center">
                    <div className="bg-green-100 p-4 rounded-xl mb-3 flex flex-col items-center justify-center shadow-md">
                      <svg className="w-10 h-10 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-green-600 font-medium text-base">{filePreview}</span>
                    </div>
                    <span className="block text-sm text-gray-500 mt-1">{labels.formImproveResume.resumeFile.change}</span>
                  </div>

                ) : (
                  <>
                    <div className="bg-blue-100 p-3 rounded-full mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <span className="text-blue-600 font-medium">
                        {labels.formImproveResume.resumeFile.actionText}
                      </span>
                      <span className="text-gray-500"> {labels.formImproveResume.resumeFile.placeholder}</span>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  id="resume"
                  {...register("resume", {
                    required: labels.formImproveResume.resumeFile.required,
                    validate: () => {
                      if (!inputFileRef.current?.files?.[0]) return true;
                      const file = inputFileRef.current.files[0];
                      if (file.type !== "application/pdf") {
                        return labels.formImproveResume.resumeFile.invalidType;
                      }
                      if (file.size > 5 * 1024 * 1024) {
                        return labels.formImproveResume.resumeFile.invalidSize;
                      }
                      return true;
                    },
                  })}
                  ref={(e) => {
                    register("resume").ref(e);
                    inputFileRef.current = e;
                  }}
                  onChange={handleFileChange}
                  className="absolute opacity-0 w-px h-px overflow-hidden"
                  accept=".pdf"
                />
              </label>
            </div>
            {errors.resume && (
              <p className="text-red-500 text-sm mt-2">{errors.resume.message}</p>
            )}
          </div>

          {/* Job Title - Enhanced */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="job_title" className="block text-sm font-medium text-gray-700">
                {labels.formImproveResume.jobTitle.label}
              </label>
              <span className="text-xs text-gray-500">{labels.formImproveResume.eg}</span>
            </div>
            <div className="relative">
              <input
                type="text"
                id="job_title"
                {...register("job_title", {
                  required: labels.formImproveResume.jobTitle.required,
                })}
                placeholder={labels.formImproveResume.jobTitle.placeholder}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-10"
              />
            </div>
            {errors.job_title && (
              <p className="text-red-500 text-sm mt-2">{errors.job_title.message}</p>
            )}
          </div>

          {/* Job Description - Enhanced */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="job_description" className="block text-sm font-medium text-gray-700">
                {labels.formImproveResume.jobDescription.label}
              </label>
            </div>
            <div className="relative">
              <textarea
                id="job_description"
                {...register("job_description", {
                  required: labels.formImproveResume.jobDescription.required,
                })}
                rows="6"
                maxLength={3000}
                placeholder={labels.formImproveResume.jobDescription.placeholder}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <div className="absolute bottom-3 right-3 bg-white px-2 py-1 rounded text-xs text-gray-500">
                {charCount}/3000
              </div>
            </div>
            {errors.job_description && (
              <p className="text-red-500 text-sm mt-2">{errors.job_description.message}</p>
            )}
          </div>

          {/* Submit Button - Enhanced */}
          <div className="pt-2">
            <SubmitButton
              ref={submitButtonRef}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-4 rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
              loading={isLoading}
              loadingLabel={labels.formImproveResume.uploadBtn.loading}
              label={
                <div className="flex items-center justify-center">
                  <span>{labels.formImproveResume.uploadBtn.label}</span>
                  <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
                    {cost}
                  </span>
                </div>
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImproveResumeForm;