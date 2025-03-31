import React, {useState} from "react";
import ProfileForm from "../components/forms/ProfileForm"
import {save_profile, save_personal_information, save_skills} from "../services/SetProfile"
import {useAuth} from "../contexts/AuthContext"
import { useConfig } from "../contexts/ConfigContext";


function CreateResume() {

  // Language
  const { config, language } = useConfig();
  const labels = config.labels[language];

  // Auth to autofill
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  // Handler for form submission (manual save)
  const handleSubmit = async (data) => {
    setIsLoading(true);

    try {
      await save_profile({educations: data.educations, jobs: data.jobs, projects: data.projects}).then(response =>{
        
      }).catch(error =>{
        console.log(error)
      })
    } catch (error) {
    } finally {
        setIsLoading(false);
    }
  };

  // Auto-save function for personal information
  const autoSavePersonalInformation = async (data) => {
    setIsLoading(true);
    let isSaved = false;

    try {
      isSaved = await save_personal_information(data).then(response =>{
        if(response.data.status === "success"){
          return true;
        }else{
          return false;
        }
      }).catch(error =>{
        return false;
      })
    } catch (error) {
    } finally {
        setIsLoading(false);
        return isSaved
    }
  };

  // Auto-save function for personal information
  const autoSaveSkills = async (data) => {
    setIsLoading(true);
    let isSaved = false;

    try {
      isSaved = await save_skills({skills:data}).then(response =>{
        if(response.data.status === "success"){
          return true;
        }else{
          return false;
        }
      }).catch(error =>{
        return false;
      })
    } catch (error) {
    } finally {
        setIsLoading(false);
        return isSaved;
    }
  };

  return (
    <ProfileForm
    onSubmit={handleSubmit}
    autoSavePersonalInformation={autoSavePersonalInformation}
    autoSaveSkills={autoSaveSkills}
    userData={auth.user}
    isLoading={isLoading}
    labels={labels}
    />
  );
}

export default CreateResume;