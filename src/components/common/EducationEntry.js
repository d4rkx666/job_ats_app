import React, {useEffect, useState} from 'react';
import { Controller } from 'react-hook-form';
import MonthYearPicker from "./Datepicker"

// Create a separate EducationEntry component to use hooks
const EducationEntry = ({ index, isCurrentEducationCheck, control, register, onDelete, setValue, errors}) => {
  const [isCurrentEducation, setIsCurrentEducation] = useState(isCurrentEducationCheck);

  useEffect(()=>{
    setIsCurrentEducation(isCurrentEducationCheck);
  }, [isCurrentEducationCheck]);

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
          {...register(`educations.${index}.institution`, {required: "Required"})}
          placeholder="Institution"
          className={`w-full p-2 border rounded-md ${ errors?.institution ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />
        <input
          {...register(`educations.${index}.degree`, {required: "Required"})}
          placeholder="Degree"
          className={`w-full p-2 border rounded-md ${ errors?.degree ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />

        <div className="grid grid-cols-2 gap-4">
          <MonthYearPicker
            control={control}
            name={`educations.${index}.graduationStartDate`}
            label="Start Date"
            required={true}
          />
          
          <div>
            <MonthYearPicker
              control={control}
              name={`educations.${index}.graduationEndDate`}
              label="End Date"
              disabled={isCurrentEducation}
              required={!isCurrentEducation}
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id={`current-education-${index}`}
                checked={isCurrentEducation}
                onChange={(e) => {
                  setIsCurrentEducation(e.target.checked);
                  setValue(`educations.${index}.graduationEndDate`, e.target.checked ? {month:0, year:0} : '');
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`current-education-${index}`} className="ml-2 block text-sm text-gray-700">
                I currently study here
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationSection = ({ control, register, setValue, errors }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-1">Education</h2>
      <h5 className="text-sm text-gray-500 font-semibold mb-4">*Please save all your changes before leaving with the green button below.</h5>
      
      <Controller
        name="educations"
        control={control}
        render={({ field }) => (
          <div>
            {field.value.map((education, index) => {
              const check = education.graduationEndDate?.month === 0 && education.graduationEndDate?.year === 0 ? true : false;
              
              return(
              <EducationEntry
                key={index}
                index={index}
                education={education}
                control={control}
                register={register}
                setValue={setValue}
                isCurrentEducationCheck={check}
                errors={errors?.educations?.[index] || {}}
                onDelete={() => {
                  const newJobs = field.value.filter((_, i) => i !== index);
                  setValue('educations', newJobs);
                }}
              />
            )
            })}

            <button
              type="button"
              onClick={() => setValue('educations', [...field.value, {}])}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add Another Education
            </button>
          </div>
        )}
      />
    </div>
  );
};


export default EducationSection;