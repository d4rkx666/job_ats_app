import React, {useState, useRef} from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../common/SubmitButton";

function ImproveResumeForm({ onSubmit, isLoading, labels, cost, submitButtonRef, error}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'all'
  });

  const [filePreview, setFilePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // handle click on div to file input
  const inputFileRef = useRef(HTMLInputElement || null);

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
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-blue-50 border-b border-blue-100 p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            {labels.formImproveResume.title}
          </h1>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {labels.formImproveResume.resumeFile.label}
            </label>
            <div
              className={`flex items-center justify-center w-full rounded-lg border-2 border-dashed transition duration-300 ${
                isDragging 
                  ? "border-blue-400 bg-blue-50" 
                  : "border-gray-300 hover:border-blue-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label className="flex flex-col items-center px-4 py-8 cursor-pointer w-full">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 text-center">
                  {filePreview ? (
                    <span className="text-blue-600 font-medium">{filePreview}</span>
                  ) : (
                    <>
                      <span className="text-blue-600 font-medium">
                        {labels.formImproveResume.resumeFile.actionText}
                      </span>
                      <span className="text-gray-500"> {labels.formImproveResume.resumeFile.placeholder}</span>
                    </>
                  )}
                </span>
                <span className="text-xs text-gray-500 mt-2">
                  PDF, max 5MB
                </span>
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

          {/* Job Title */}
          <div>
            <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 mb-2">
              {labels.formImproveResume.jobTitle.label}
            </label>
            <input
              type="text"
              id="job_title"
              {...register("job_title", {
                required: labels.formImproveResume.jobTitle.required,
              })}
              placeholder={labels.formImproveResume.jobTitle.placeholder}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            {errors.job_title && (
              <p className="text-red-500 text-sm mt-2">{errors.job_title.message}</p>
            )}
          </div>

          {/* Job Description */}
          <div>
            <label htmlFor="job_description" className="block text-sm font-medium text-gray-700 mb-2">
              {labels.formImproveResume.jobDescription.label}
            </label>
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
            <div className="flex justify-between mt-1">
              {errors.job_description ? (
                <p className="text-red-500 text-sm">{errors.job_description.message}</p>
              ) : (
                <span className="text-xs text-gray-500">Max 3000 characters</span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <SubmitButton
              ref={submitButtonRef}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm"
              loading={isLoading}
              loadingLabel={labels.formImproveResume.uploadBtn.loading}
              label={labels.formImproveResume.uploadBtn.label}
              cost={cost}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImproveResumeForm;