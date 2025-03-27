import React, {useState, useRef} from "react";
import { useForm } from "react-hook-form";

function ImproveResumeForm({ onSubmit, isLoading, labels, error}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

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
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {labels.formImproveResume.title}
      </h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels.formImproveResume.resumeFile.label}
          </label>
          <div
            className={`flex items-center justify-center w-full ${
              isDragging ? "bg-blue-100" : "bg-blue-50"
            } rounded-lg border-2 border-dashed border-blue-300 transition duration-300`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label className="flex flex-col items-center px-4 py-6 cursor-pointer">
              <svg
                className="w-12 h-12 text-blue-500 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                ></path>
              </svg>
              <span className="text-blue-600 font-semibold">
                {filePreview ? filePreview : labels.formImproveResume.resumeFile.placeholder}
              </span>
              <input
                type="file"
                id="resume"
                {
                  ...register("resume")
                }
                ref={(e) => {
                  // Merge react-hook-form's ref with your custom ref
                  register("resume", {
                    required: labels.formImproveResume.resumeFile.required,
                    validate: () =>{
                      let file = inputFileRef.current.files[0];
                      if(file.type !== "application/pdf"){
                        return labels.formImproveResume.resumeFile.invalidType
                      }
                      if(file.size > 5 * 1024 * 1024){
                        return labels.formImproveResume.resumeFile.invalidSize
                      }
                      return true
                    },
                  }).ref(e);
                  inputFileRef.current = e;
                }}
                onChange={handleFileChange}
                style={{zIndex: -1}}
              />
            </label>
          </div>
          {errors.resume && (
            <p className="text-red-500 text-sm mt-2">{errors.resume.message}</p>
          )}
        </div>

        {/* Job title */}
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.job_description && (
            <p className="text-red-500 text-sm mt-2">{errors.job_description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
        >
          {isLoading ? labels.formImproveResume.uploadBtn.loading : labels.formImproveResume.uploadBtn.label}
        </button>
      </form>
    </div>
  );
}

export default ImproveResumeForm;