import React, {useState, useEffect} from 'react';
import { Controller } from 'react-hook-form';
import MonthYearPicker from "./Datepicker"

// Create a separate JobEntry component to use hooks
const JobEntry = ({ index, isCurrentJobCheck, control, register, onDelete, setValue, errors }) => {
  const [isCurrentJob, setIsCurrentJob] = useState(isCurrentJobCheck);

  useEffect(()=>{
    setIsCurrentJob(isCurrentJobCheck);
  }, [isCurrentJobCheck]);

  return (
    <div className="mb-6 p-4 border rounded-lg relative">
      <button
        type="button"
        onClick={onDelete}
        className="absolute top-2 right-1 text-red-500 hover:text-red-700"
      >
        ×
      </button>

      <div className="space-y-4">
        <input
          {...register(`jobs.${index}.title`, {required: "Required"})}
          placeholder="Job Title"
          className={`w-full p-2 border rounded-md ${ errors?.title ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />
        <input
          {...register(`jobs.${index}.company`, {required: "Required"})}
          placeholder="Company"
          className={`w-full p-2 border rounded-md ${ errors?.company ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />

        <div className="grid grid-cols-2 gap-4">
          <MonthYearPicker
            control={control}
            name={`jobs.${index}.startDate`}
            label="Start Date"
            required={true}
          />
          
          <div>
            <MonthYearPicker
              control={control}
              name={`jobs.${index}.endDate`}
              label="End Date"
              disabled={isCurrentJob}
              required={!isCurrentJob}
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id={`current-job-${index}`}
                checked={isCurrentJob}
                onChange={(e) => {
                  setIsCurrentJob(e.target.checked);
                  setValue(`jobs.${index}.endDate`, e.target.checked ? {month: 0, year: 0} : '');
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`current-job-${index}`} className="ml-2 block text-sm text-gray-700">
                I currently work here
              </label>
            </div>
          </div>
        </div>

        <textarea
          {...register(`jobs.${index}.responsibilities`, {required: "Required"})}
          placeholder="Responsibilities"
          className={`w-full p-2 border rounded-md ${ errors?.responsibilities ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          rows={4}
        />
      </div>
    </div>
  );
};

const WorkExperienceSection = ({ control, register, setValue, errors }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-1">Work History</h2>
      <h5 className="text-sm text-gray-500 font-semibold mb-4">*Please save all your changes before leaving with the green button below.</h5>
      
      <Controller
        name="jobs"
        control={control}
        render={({ field }) => (
          <div>
            {field.value.map((job, index) => {
              const check = job.endDate?.month === 0 && job.endDate?.year === 0 ? true : false;

              return(
                <JobEntry
                  key={index}
                  index={index}
                  job={job}
                  control={control}
                  register={register}
                  setValue={setValue}
                  isCurrentJobCheck={check}
                  errors={errors?.jobs?.[index] || {}}
                  onDelete={() => {
                    const newJobs = field.value.filter((_, i) => i !== index);
                    setValue('jobs', newJobs);
                  }}
                />
              )
            })}

            <button
              type="button"
              onClick={() => setValue('jobs', [...field.value, {}])}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add Another Job
            </button>
          </div>
        )}
      />
    </div>
  );
};


export default WorkExperienceSection;