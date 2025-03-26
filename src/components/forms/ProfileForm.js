import React, {useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import WorkExperienceSection from "../common/JobEntry"
import EducationSection from "../common/EducationEntry"


function CreateResumeForm({ onSubmit, autoSave, isLoading, labels, error, userData}) {
  const { register, handleSubmit, control, watch, reset, setValue, trigger, formState:{errors} } = useForm({
    defaultValues: {
      jobs: [{}], // Initialize with one empty job
      educations: [{}] // Initialize with one empty education
    },
    mode: "all",
  });

  useEffect(()=>{
    setValue("email", userData.email || "");
    setValue("phone", userData.phone || "");
    setValue("linkedin", userData.linkedin || "");
    setValue("website", userData.website || "");
    
  },[autoSave]);

  useEffect(()=>{
    reset({
      educations: userData.profile?.education || [{}],
      jobs: userData.profile?.jobs || [{}]
    });
    setValue('skills', userData.profile?.skills || []);
    setValue('projects', userData.profile?.projects || []);
    
  },[userData, reset]);
  

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
              {...register('email', { required: "Required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              onBlur={async (e) => {
                await trigger('email'); // Validate first
                if (!errors.email) {    // Only save if valid
                  autoSave('email', e.target.value);
                }
              }}
              type="email"
              placeholder={userData.email || "Email"}
              className={`w-full p-2 border rounded ${ errors.email ? "border-red-500" : "border-green-500"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            <input
              {...register('phone', { required: "Required" }, {
                onBlur: (e) => autoSave('phone', e.target.value),
              })}
              type="tel"
              placeholder="Phone"
              className={`w-full p-2 border rounded ${ errors.phone ? "border-red-500" : "border-green-500"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            <input
              {...register('linkedin', {
                onBlur: (e) => autoSave('linkedin', e.target.value),
              })}
              type="url"
              placeholder="LinkedIn URL"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            <input
              {...register('website', {
                onBlur: (e) => autoSave('website', e.target.value),
              })}
              type="url"
              placeholder="Personal website URL"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
        </div>

        {/* Skills (Save on Button Click) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <Controller
            name="skills"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {field.value.map((skill, index) => (
                    <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {skill}
                      <button
                        type="button"
                        onClick={() => {
                          const newSkills = field.value.filter((_, i) => i !== index);
                          setValue('skills', newSkills);
                        }}
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
                  className="w-full p-2 border rounded"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      const newSkill = e.target.value.trim();
                      if (newSkill && !field.value.includes(newSkill)) {
                        setValue('skills', [...field.value, newSkill]);
                        e.target.value = '';
                      }
                    }
                  }}
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
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded"
        >
          Save All
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;