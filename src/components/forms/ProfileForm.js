import React, {useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import WorkExperienceSection from "../common/JobEntry"
import EducationSection from "../common/EducationEntry"


function CreateResumeForm({ onSubmit, autoSavePersonalInformation, autoSaveSkills, isLoading, labels, userData}) {
  const { register, handleSubmit, control, reset, watch, setValue, trigger, formState:{errors} } = useForm({
    defaultValues: {
      jobs: userData.profile?.jobs || [{}], // Initialize with one empty job
      educations: userData.profile?.education || [{}], // Initialize with one empty education
      personalData: {
        email: userData.profile?.contact?.email || "",
        phone: userData.profile?.contact?.phone || "",
        linkedin: userData.profile?.contact?.linkedin || "",
        website: userData.profile?.contact?.website || ""
      }
    },
    mode: "all",
  });

  const [recentlySaved, setRecentlySaved] = useState("" || null);
  const [errorAutoSaved, setErrorAutoSaved] = useState("" || null);
  const [autoSaving, setAutoSaving] = useState("" || null)
  const [skillSaved, setSkillSaved] = useState("" || null);

  useEffect(()=>{
    setValue('skills', userData.profile?.skills || []);
    setValue('projects', userData.profile?.projects || []);
    
  },[userData, reset]);

  // Watch personalData && skills fields
  const personalData = watch("personalData");

  // onBlur handler for personalData fields
  const handlePersonalDataBlur = async (fieldName) => {
    await trigger(`personalData.${fieldName}`);

    // Check for validations
    if (!errors.personalData?.[fieldName]) {
      const currentValue = personalData[fieldName];

      // Don't save if no changes
      if (currentValue !== userData?.[fieldName]) {
        setAutoSaving(fieldName); // Saving

        // Save info
        const isSaved = await autoSavePersonalInformation(personalData);
        setAutoSaving(null); //stop
        
        if(isSaved){
          setRecentlySaved(fieldName);
          setTimeout(() => setRecentlySaved(null), 2000); // Reset after 2 seconds
          setErrorAutoSaved(null)
        }else{
          setErrorAutoSaved(fieldName)
          setValue(`personalData.${fieldName}`, userData?.[fieldName])
        }
      }
    }
  };

  // Handle onclick for skills
  const handleActionSkills = async (action, field, index, e)=>{
    await trigger("skills");

    // Delete action
    if(action === "delete"){
      const newSkills = field.value.filter((_, i) => i !== index);
      setValue('skills', newSkills);

      const isSaved = await autoSaveSkills(newSkills);
      if(!isSaved){
        setValue('skills', userData.profile?.skills);
      }


    // Insert action
    }else if(action === "insert"){
      if (e.target.value.endsWith(",") || e.key === 'Enter') {
      //if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        let newSkill = e.target.value.trim();
        if(e.target.value.endsWith(",")){
          newSkill = e.target.value.slice(0, -1).trim();
        }
        

        // Don't save if no changes
        if (newSkill && !field.value.includes(newSkill)) {
          setAutoSaving(field.name); // Saving

          //set new values
          setValue('skills', [...field.value, newSkill]);

          //Delete values from field
          e.target.value = '';

          setSkillSaved(newSkill)
          const isSaved = await autoSaveSkills([...field.value, newSkill]);
          setAutoSaving(null);
          if(isSaved){
            setRecentlySaved(field.name);
            setTimeout(() => setRecentlySaved(null), 2000); // Reset after 2 seconds
            setErrorAutoSaved(null)
          }else{
            setErrorAutoSaved(field)
            setValue(`skills`, userData.profile?.skills)
          }
        }
      }
    }
  }
  

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information (Auto-Save on Blur) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-1">{labels.formProfile.personalInformation.title}</h2>
          <h5 className="text-sm text-gray-500 font-semibold">{labels.formProfile.personalInformation.subtitle}</h5>
          <h5 className="text-sm text-gray-500 font-semibold mb-4">{labels.formProfile.personalInformation.subtitle2}</h5>
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
                  message: labels.formPatternValidation.email,
                },
              })}
              onBlur={() => handlePersonalDataBlur('email')}
              type="email"
              placeholder={userData.profile?.contact?.email || labels.formProfile.personalInformation.email}
              className={`w-full p-2 border rounded ${ (errors.personalData?.email || errorAutoSaved === "email") ? "border-red-500" : "border-green-500"} ${recentlySaved === 'email' && 'ring-2 ring-green-500 animate-pulse-once'} ${autoSaving === "email" && "animate-auto-saving"}  ${recentlySaved === 'email' && "animate-pulse-once"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            <input
              {...register('personalData.phone', { required: "Required",
                pattern: {
                value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                message: "Entered value does not match phone format",
              }},)}
              onBlur={() => handlePersonalDataBlur('phone')}
              type="tel"
              placeholder={userData.profile?.contact?.phone || labels.formProfile.personalInformation.phone}
              className={`w-full p-2 border rounded ${ (errors.personalData?.phone || errorAutoSaved === "phone") ? "border-red-500" : "border-green-500"} ${recentlySaved === 'phone' && 'ring-2 ring-green-500 animate-pulse-once'} ${autoSaving === "phone" && "animate-auto-saving"}  ${recentlySaved === 'phone' && "animate-pulse-once"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            <input
              {...register('personalData.linkedin', {
                pattern: {
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: 'Invalid URL format'
                }
              })}
              onBlur={() => handlePersonalDataBlur('linkedin')}
              type="text"
              placeholder={userData.profile?.contact?.linkedin || labels.formProfile.personalInformation.linkedin}
              className={`w-full p-2 border rounded ${ (errors.personalData?.linkedin || errorAutoSaved === "linkedin") ? "border-red-500" : "border-green-500"} ${recentlySaved === 'linkedin' && 'ring-2 ring-green-500 animate-pulse-once'} ${autoSaving === "linkedin" && "animate-auto-saving"}  ${recentlySaved === 'linkedin' && "animate-pulse-once"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            <input
              {...register('personalData.website', {
                pattern: {
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: 'Invalid URL format'
                }
              })}
              onBlur={() => handlePersonalDataBlur('website')}
              type="text"
              placeholder={userData.website || labels.formProfile.personalInformation.website}
              className={`w-full p-2 border rounded ${ (errors.personalData?.website || errorAutoSaved === "website") ? "border-red-500" : "border-green-500"} ${recentlySaved === 'website' && 'ring-2 ring-green-500 animate-pulse-once'} ${autoSaving === "website" && "animate-auto-saving"}  ${recentlySaved === 'website' && "animate-pulse-once"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
        </div>

        {/* Skills (Save on Button Click) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-1">{labels.formProfile.skills.title}</h2>
          <h5 className="text-sm text-gray-500 font-semibold mb-4">{labels.formProfile.skills.subtitle}</h5>
          <Controller
            name="skills"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {field.value.map((skill, index) => (
                    <div key={index} className={`bg-blue-100 text-blue-800 px-3 py-1 rounded-full ${(recentlySaved === 'skills' && skill===skillSaved) && 'animate-pulse-once'} ${(autoSaving === "skills" && skill===skillSaved) && "animate-auto-saving"}`} >
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
                  placeholder={labels.formProfile.skills.addSkill}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => handleActionSkills("insert", field, 0, e)}
                  onKeyPress={(e) => {if (e.key === 'Enter') {handleActionSkills("insert", field, 0, e)}
                  }}
                />
                <p className="text-gray-500 mt-1 font-semibold text-sm">{labels.formProfile.skills.subtitle2}</p>
              </div>
            )}
          />
        </div>

        {/* Education Section */}
        <EducationSection
          control={control}
          register={register}
          setValue={setValue}
          labels={labels}
          errors={errors}
        />

        {/* Work History Section */}
        <WorkExperienceSection 
          control={control}
          register={register}
          setValue={setValue}
          labels={labels}
          errors={errors}
        />

        {/* Projects (Save on Button Click) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{labels.formProfile.project.title}</h2>
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
                        placeholder={labels.formProfile.project.name}
                        className={`w-full p-2 border rounded-md ${ err?.name ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                      <textarea
                        {...register(`projects[${index}].description`, {required: "Required"})}
                        placeholder={labels.formProfile.project.description}
                        className={`w-full p-2 border rounded-md ${ err?.description ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                      <input
                        {...register(`projects[${index}].technologies`, {required: "Required"})}
                        placeholder={labels.formProfile.project.technologies}
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
                  {labels.formProfile.project.btnAdd}
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
          {isLoading ? labels.formProfile.btnSaving : labels.formProfile.btnSave}
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;