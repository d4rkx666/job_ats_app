"use client"
import React, { useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import WorkExperienceSection from './JobEntry';
import EducationSection from './EducationEntry';
import FormInput from './FormInputProfile';
import { DocumentTextIcon, BriefcaseIcon, CodeBracketIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from 'next-intl';


function ProfileForm({ onSubmit, autoSavePersonalInformation, autoSaveSkills, isLoading, isSavedForms, userData}) {
  // translation
  const t = useTranslations("formProfile");
  const v = useTranslations("formPatternValidation");

  const { register, handleSubmit, control, reset, watch, setValue, trigger, formState:{errors} } = useForm({
    defaultValues: {
      jobs: userData.profile?.jobs || [{}], // Initialize with one empty job
      educations: userData.profile?.education || [{}], // Initialize with one empty education
      personalData: {
        email: userData.profile?.contact?.email || "",
        phone: userData.profile?.contact?.phone || "",
        linkedin: userData.profile?.contact?.linkedin || "",
        website: userData.profile?.contact?.website || ""
      },
      skills: userData.profile?.skills || [],
      projects: userData.profile?.projects || []
    },
    mode: "all",
  });

  const [recentlySaved, setRecentlySaved] = useState("" || null);
  const [errorAutoSaved, setErrorAutoSaved] = useState("" || null);
  const [autoSaving, setAutoSaving] = useState("" || null)
  const [skillSaved, setSkillSaved] = useState("" || null);

  // Watch personalData && skills fields
  const personalData = watch("personalData");

  // onBlur handler for personalData fields
  const handlePersonalDataBlur = async (fieldName) => {
    await trigger(`personalData.${fieldName}`);

    // Check for validations
    if (!errors.personalData?.[fieldName]) {
      const currentValue = personalData[fieldName];

      // Don't save if no changes
      if (currentValue !== userData?.profile?.contact?.[fieldName]) {
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
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <DocumentTextIcon className="h-5 w-5 text-blue-600 mr-2" />
              {t("personalInformation.title")}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{t("personalInformation.subtitle")}</p>
          </div>
          <div className="p-6">
            <FormInput
              name="personalData.email"
              register={register}
              errors={errors}
              recentlySaved={recentlySaved}
              autoSaving={autoSaving}
              errorAutoSaved={errorAutoSaved}
              handlePersonalDataBlur={handlePersonalDataBlur}
              label="Email"
              type="text"
              placeholder={userData.profile?.contact?.email || t("personalInformation.email")}
              rules={{ 
                required: "Required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: v("email"),
                }
              }}
              autoSave
            />
            
            <FormInput
              name="personalData.phone"
              register={register}
              errors={errors}
              recentlySaved={recentlySaved}
              autoSaving={autoSaving}
              errorAutoSaved={errorAutoSaved}
              handlePersonalDataBlur={handlePersonalDataBlur}
              label="Phone"
              type="tel"
              placeholder={userData.profile?.contact?.phone || t("personalInformation.phone")}
              rules={{ 
                required: "Required",
                pattern: {
                  value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                  message: v("phone"),
                }
              }}
              autoSave
            />
            
            <FormInput
              name="personalData.linkedin"
              register={register}
              errors={errors}
              recentlySaved={recentlySaved}
              autoSaving={autoSaving}
              errorAutoSaved={errorAutoSaved}
              handlePersonalDataBlur={handlePersonalDataBlur}
              label="LinkedIn"
              placeholder={userData.profile?.contact?.linkedin || t("personalInformation.linkedin")}
              rules={{
                pattern: {
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: v("url"),
                }
              }}
              autoSave
            />
            
            <FormInput
              name="personalData.website"
              register={register}
              errors={errors}
              recentlySaved={recentlySaved}
              autoSaving={autoSaving}
              errorAutoSaved={errorAutoSaved}
              handlePersonalDataBlur={handlePersonalDataBlur}
              label="Website"
              placeholder={userData.website || t("personalInformation.website")}
              rules={{
                pattern: {
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: v("url"),
                }
              }}
              autoSave
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <CodeBracketIcon className="h-5 w-5 text-blue-600 mr-2" />
              {t("skills.title")}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{t("skills.subtitle")}</p>
          </div>
          <div className="p-6">
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {field.value.map((skill, index) => (
                      <div 
                        key={index} 
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          (recentlySaved === 'skills' && skill === skillSaved) ? 
                          'bg-green-100 text-green-800 animate-pulse-once' : 
                          'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleActionSkills("delete", field, index)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t("skills.addSkill")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => handleActionSkills("insert", field, 0, e)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleActionSkills("insert", field, 0, e);
                        }
                      }}
                    />
                    {autoSaving === "skills" && (
                      <div className="absolute right-3 top-3 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{t("skills.subtitle2")}</p>
                </div>
              )}
            />
          </div>
        </div>

        {/* Education Section */}
        <EducationSection
          control={control}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        {/* Work Experience Section */}
        <WorkExperienceSection 
          control={control}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        {/* Projects Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <BriefcaseIcon className="h-5 w-5 text-blue-600 mr-2" />
              {t("project.title")}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{t("saveChanges")}</p>
          </div>
          <div className="p-6">
            <Controller
              name="projects"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  {field.value.map((project, index) => {
                    const err = errors?.projects?.[index] || {};
                    return (
                      <div key={index} className="relative p-4 border rounded-lg hover:border-blue-300 transition-colors">
                        <button
                          type="button"
                          onClick={() => {
                            const newProjects = field.value.filter((_, i) => i !== index);
                            setValue('projects', newProjects);
                          }}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                        
                        <FormInput
                          name={`projects[${index}].name`}
                          register={register}
                          errors={errors}
                          recentlySaved={recentlySaved}
                          autoSaving={autoSaving}
                          errorAutoSaved={errorAutoSaved}
                          label={t("project.name")}
                          rules={{ required: "Required" }}
                        />
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t("project.description")}
                          </label>
                          <textarea
                            {...register(`projects[${index}].description`, { required: "Required" })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              err?.description ? "border-red-500" : "border-gray-300"
                            }`}
                            rows={3}
                          />
                        </div>
                        
                        <FormInput
                          name={`projects[${index}].technologies`}
                          register={register}
                          errors={errors}
                          recentlySaved={recentlySaved}
                          autoSaving={autoSaving}
                          errorAutoSaved={errorAutoSaved}
                          label={t("project.technologies")}
                          rules={{ required: "Required" }}
                        />
                      </div>
                    );
                  })}
                  
                  <button
                    type="button"
                    onClick={() => {
                      setValue('projects', [...field.value, { name: '', description: '', technologies: '' }]);
                    }}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {t("project.btnAdd")}
                  </button>
                </div>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-3 ${isSavedForms 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'} `}
          >
            {isLoading ? (
              <div className='flex justify-center'>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t("btnSaving")}
              </div>
            ) : isSavedForms ? (
              <div className='flex justify-center'>
                  <CheckIcon className="h-5 w-5" />
                  {t("btnSaved")}
              </div>
            ) : (
              t("btnSave")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;