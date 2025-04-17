import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import MonthYearPicker from "./Datepicker"
import { SparklesIcon, DocumentTextIcon, AcademicCapIcon, BriefcaseIcon, CodeBracketIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const JobEntry = ({ id, index, isCurrentJobCheck, control, register, onDelete, labels, setValue, errors }) => {

  const [isCurrentJob, setIsCurrentJob] = useState(isCurrentJobCheck);

  useEffect(()=>{
    setIsCurrentJob(isCurrentJobCheck);
  }, [isCurrentJobCheck]);
  
  return (
    <div className="relative p-4 border rounded-lg hover:border-blue-300 transition-colors">
      <button
        type="button"
        onClick={onDelete}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>

      <div className="space-y-4 mt-4">
        <input
          {...register(`jobs.${index}.title`, {required: "Required"})}
          placeholder={labels.formProfile.work.jobTitle}
          className={`w-full p-2 border rounded-md ${ errors?.title ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />
        <input
          {...register(`jobs.${index}.company`, {required: "Required"})}
          placeholder={labels.formProfile.work.company}
          className={`w-full p-2 border rounded-md ${ errors?.company ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />

        <div className="grid grid-cols-2 gap-4">
          <MonthYearPicker
            control={control}
            name={`jobs.${index}.startDate`}
            label={labels.formProfile.startDate}
            required={true}
          />
          
          <div>
            <MonthYearPicker
              control={control}
              name={`jobs.${index}.endDate`}
              label={labels.formProfile.endDate}
              disabled={isCurrentJob}
              required={!isCurrentJob}
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id={`current-job-${id}`}
                checked={isCurrentJob}
                onChange={(e) => {
                  setIsCurrentJob(e.target.checked);
                  setValue(`jobs.${index}.endDate`, e.target.checked ? {month: 0, year: 0} : '');
                  setValue(`jobs.${index}.isCurrent`, e.target.checked);
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`current-job-${id}`} className="ml-2 block text-sm text-gray-700">
                {labels.formProfile.work.currently}
              </label>
            </div>
          </div>
        </div>

        <textarea
          {...register(`jobs.${index}.responsibilities`, {required: "Required"})}
          placeholder={labels.formProfile.work.responsibilities}
          className={`w-full p-2 border rounded-md ${ errors?.responsibilities ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          rows={4}
        />
      </div>
    </div>
  );
};

const WorkExperienceSection = ({ control, register, setValue, labels, errors }) => {
  const [jobIds, setJobIds] = useState([Date.now()]); // Initialize with one job

  const addJob = () => {
    const newId = Date.now();
    setJobIds(prev => [...prev, newId]);
    
    // Initialize new job with all required fields
    const currentJobs = control._formValues.jobs || [];
    setValue('jobs', [...currentJobs, {
      title: '',
      company: '',
      startDate: null,
      endDate: null,
      responsibilities: '',
    }]);
  };

  const removeJob = (index) => {
    setJobIds(prev => prev.filter((_, i) => i !== index));
    
    const currentJobs = control._formValues.jobs || [];
    const newJobs = currentJobs.filter((_, i) => i !== index);
    setValue('jobs', newJobs);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <DocumentTextIcon className="h-5 w-5 text-blue-600 mr-2" />
          {labels.formProfile.work.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{labels.formProfile.saveChanges}</p>
      </div>
      
      <div className="p-6">
        <Controller
          name="jobs"
          control={control}
          defaultValue={[{}]} // Initialize with one empty job
          render={({ field }) => (
            <div className='space-y-4'>
              {(field.value || []).map((job, index) => {
                const isCurrentJob = job.endDate?.month === 0 && job.endDate?.year === 0 ? true : false;
                
                return (
                  <JobEntry
                    key={jobIds[index]}
                    id={jobIds[index]}
                    index={index}
                    isCurrentJobCheck={isCurrentJob}
                    control={control}
                    register={register}
                    setValue={setValue}
                    labels={labels}
                    errors={errors?.jobs?.[index] || {}}
                    onDelete={() => removeJob(index)}
                  />
                );
              })}

              <button
                type="button"
                onClick={addJob}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {labels.formProfile.work.btnAdd}
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default WorkExperienceSection;