import React, {useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import WorkExperienceSection from "../common/JobEntry"
import EducationSection from "../common/EducationEntry"


function CreateResumeForm({ onSubmit, autoSavePersonalInformation, autoSaveSkills, isLoading, labels, error, userData}) {
  const { register, handleSubmit, control, reset, watch, setValue, trigger, formState:{errors} } = useForm({
    defaultValues: {
      jobs: userData.profile?.jobs || [{}], // Initialize with one empty job
      educations: userData.profile?.education || [{}], // Initialize with one empty education
      personalData: {
        email: userData.email || "",
        phone: userData.phone || "",
        linkedin: userData.linkedin || "",
        website: userData.website || ""
      }
    },
    mode: "all",
  });

  const [recentlySaved, setRecentlySaved] = useState("" || null);
  const [skillSaved, setSkillSaved] = useState("" || null);

  useEffect(()=>{
    setValue('skills', userData.profile?.skills || []);
    setValue('projects', userData.profile?.projects || []);
    
  },[userData, reset]);

  // Watch personalData && skills fields
  const personalData = watch("personalData");

  // Generic onBlur handler for personalData fields
  const handlePersonalDataBlur = async (fieldName) => {
    await trigger(`personalData.${fieldName}`);
    if (!errors.personalData?.[fieldName]) {
      const currentValue = personalData[fieldName];
      if (currentValue !== userData?.[fieldName]) {
        setRecentlySaved(fieldName);
        await autoSavePersonalInformation(personalData);
        setTimeout(() => setRecentlySaved(null), 2000); // Reset after 2 seconds
      }
    }
  };

  // Handle onclick for skills
  const handleActionSkills = async (action, field, index, e)=>{
    await trigger("skills");
    if(action === "delete"){
      const newSkills = field.value.filter((_, i) => i !== index);
      setValue('skills', newSkills);

      setRecentlySaved(field.name);
      await autoSaveSkills(newSkills);
      setTimeout(() => setRecentlySaved(null), 2000); // Reset after 2 seconds
    }else if(action === "insert"){
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const newSkill = e.target.value.trim();
        if (newSkill && !field.value.includes(newSkill)) {
          setValue('skills', [...field.value, newSkill]);
          e.target.value = '';
          setRecentlySaved(field.name);
          setSkillSaved(newSkill)
          await autoSaveSkills([...field.value, newSkill]);
          setTimeout(() => setRecentlySaved(null), 3000); // Reset after 2 seconds
        }
      }
    }
  }
  

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information (Auto-Save on Blur) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-1">Personal Information</h2>
          <h5 className="text-sm text-gray-500 font-semibold">*This information will be saved automatically, except the name</h5>
          <h5 className="text-sm text-gray-500 font-semibold mb-4">*Email field is not your username for login.</h5>
          <div className="space-y-4">
            <input
              type='text'
              value={userData.name}
              disabled={true}
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            <input
              {...register('personalData.email', { required: "Required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              onBlur={() => handlePersonalDataBlur('email')}
              type="email"
              placeholder={userData.email || "Email"}
              className={`w-full p-2 border rounded ${ errors.personalData?.email ? "border-red-500" : "border-green-500"} ${recentlySaved === 'email' ? 'ring-2 ring-green-500 animate-pulse-once' : 'ring-1 ring-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            <input
              {...register('personalData.phone', { required: "Required",
                pattern: {
                value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                message: "Entered value does not match phone format",
              }},)}
              onBlur={() => handlePersonalDataBlur('phone')}
              type="tel"
              placeholder={userData.phone || "Phone"}
              className={`w-full p-2 border rounded ${ errors.personalData?.phone ? "border-red-500" : "border-green-500"} ${recentlySaved === 'phone' ? 'ring-2 ring-green-500 animate-pulse-once' : 'ring-1 ring-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            <input
              {...register('personalData.linkedin', {
                pattern: {
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: 'Invalid URL format'
                }
              })}
              onBlur={() => handlePersonalDataBlur('linkedin')}
              type="url"
              placeholder={userData.linkedin || "LinkedIn URL"}
              className={`w-full p-2 border rounded ${ errors.personalData?.linkedin ? "border-red-500" : "border-green-500"} ${recentlySaved === 'linkedin' ? 'ring-2 ring-green-500 animate-pulse-once' : 'ring-1 ring-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            <input
              {...register('personalData.website', {
                pattern: {
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: 'Invalid URL format'
                }
              })}
              onBlur={() => handlePersonalDataBlur('website')}
              type="url"
              placeholder={userData.linkedin || "Personal website URL"}
              className={`w-full p-2 border rounded ${ errors.personalData?.website ? "border-red-500" : "border-green-500"} ${recentlySaved === 'website' ? 'ring-2 ring-green-500 animate-pulse-once' : 'ring-1 ring-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
        </div>

        {/* Skills (Save on Button Click) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-1">Skills</h2>
          <h5 className="text-sm text-gray-500 font-semibold mb-4">*This information will be saved automatically.</h5>
          <Controller
            name="skills"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {field.value.map((skill, index) => (
                    <div key={index} className={`bg-blue-100 text-blue-800 px-3 py-1 rounded-full ${recentlySaved === 'skills' && skill===skillSaved ? 'ring-2 ring-green-500 animate-pulse-once' : 'ring-1 ring-gray-300'}`} >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleActionSkills("delete", field, index)}
                        className="ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a skill"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyDown={(e) => handleActionSkills("insert", field, 0, e)}
                />
                <p className="text-gray-500 mt-1 font-semibold text-sm">Use "Enter" or "Comma" key to register a new skill</p>
              </div>
            )}
          />
        </div>

        {/* Education Section */}
        <EducationSection
        control={control}
        register={register}
        setValue={setValue}
        errors={errors}
        />

        {/* Work History Section */}
        <WorkExperienceSection 
          control={control}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        {/* Projects (Save on Button Click) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <Controller
            name="projects"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <div>
                {field.value.map((project, index) => {
                  const err = errors?.projects?.[index] || {};

                  return (
                    <div key={index} className="space-y-4 mb-6 p-4 border rounded-lg relative">
                      <button
                        type="button"
                        onClick={() => {
                          const newProjects = field.value.filter((_, i) => i !== index);
                          setValue('projects', newProjects);
                        }}
                        className="absolute top-2 right-1 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                      <input
                        {...register(`projects[${index}].name`, {required: "Required"})}
                        placeholder="Project Name"
                        className={`w-full p-2 border rounded-md ${ err?.name ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                      <textarea
                        {...register(`projects[${index}].description`, {required: "Required"})}
                        placeholder="Description"
                        className={`w-full p-2 border rounded-md ${ err?.description ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                      <input
                        {...register(`projects[${index}].technologies`, {required: "Required"})}
                        placeholder="Technologies"
                        className={`w-full p-2 border rounded-md ${ err?.technologies ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    setValue('projects', [...field.value, { name: '', description: '', technologies: '' }]);
                  }}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Project
                </button>
              </div>
            )}
          />
        </div>

        {/* Submit Button (Manual Save) */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-5 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {isLoading ? "Saving data" : "Save all"}
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;