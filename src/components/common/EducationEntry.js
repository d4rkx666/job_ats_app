import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import MonthYearPicker from "./Datepicker"
import { AcademicCapIcon, XMarkIcon } from "@heroicons/react/24/outline";


// Create a separate EducationEntry component to use hooks
const EducationEntry = ({ index, isCurrentEducationCheck, control, register, onDelete, setValue, labels, errors }) => {
  const [isCurrentEducation, setIsCurrentEducation] = useState(isCurrentEducationCheck);

  useEffect(() => {
    setIsCurrentEducation(isCurrentEducationCheck);
  }, [isCurrentEducationCheck]);

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
          {...register(`educations.${index}.institution`, { required: "Required" })}
          placeholder={labels.formProfile.education.institution}
          className={`w-full p-2 border rounded-md ${errors?.institution ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />
        <input
          {...register(`educations.${index}.degree`, { required: "Required" })}
          placeholder={labels.formProfile.education.degree}
          className={`w-full p-2 border rounded-md ${errors?.degree ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />

        <div className="grid grid-cols-2 gap-4">
          <MonthYearPicker
            control={control}
            name={`educations.${index}.graduationStartDate`}
            label={labels.formProfile.startDate}
            required={true}
          />

          <div>
            <MonthYearPicker
              control={control}
              name={`educations.${index}.graduationEndDate`}
              label={labels.formProfile.endDate}
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
                  setValue(`educations.${index}.graduationEndDate`, e.target.checked ? { month: 0, year: 0 } : '');
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`current-education-${index}`} className="ml-2 block text-sm text-gray-700">
                {labels.formProfile.education.currently}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationSection = ({ control, register, setValue, labels, errors }) => {
  const [educationIds, setEducationIds] = useState([Date.now()]); // Initialize with one job

  const addEducation = () => {
    const newId = Date.now();
    setEducationIds(prev => [...prev, newId]);

    // Initialize new job with all required fields
    const currentEducations = control._formValues.educations || [];
    setValue('educations', [...currentEducations, {
      institution: '',
      degree: '',
      graduationStartDate: null,
      graduationEndDate: null,
    }]);
  };

  const removeEducation = (index) => {
    setEducationIds(prev => prev.filter((_, i) => i !== index));

    const currentEducations = control._formValues.educations || [];
    const newEducations = currentEducations.filter((_, i) => i !== index);
    setValue('educations', newEducations);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <AcademicCapIcon className="h-5 w-5 text-blue-600 mr-2" />
          {labels.formProfile.education.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{labels.formProfile.saveChanges}</p>
      </div>

      <div className="p-6">
        <Controller
          name="educations"
          control={control}
          render={({ field }) => (
            <div className='space-y-4'>
              {field.value.map((education, index) => {
                const check = education.graduationEndDate?.month === 0 && education.graduationEndDate?.year === 0 ? true : false;

                return (
                  <EducationEntry
                    key={index}
                    index={index}
                    education={education}
                    control={control}
                    register={register}
                    setValue={setValue}
                    labels={labels}
                    isCurrentEducationCheck={check}
                    errors={errors?.educations?.[index] || {}}
                    onDelete={() => removeEducation(index)}
                  />
                )
              })}

              <button
                type="button"
                onClick={addEducation}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {labels.formProfile.education.btnAdd}
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};


export default EducationSection;