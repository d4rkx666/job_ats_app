import React from "react";
import ProfileForm from "../components/forms/ProfileForm"
import {save_profile} from "../services/SetProfile"
import {useAuth} from "../contexts/AuthContext"


function CreateResume() {

  // Auth to autofill
  const auth = useAuth();

  // Handler for form submission (manual save)
  const handleSubmit = async (data) => {
    console.log('Form Data (Manual Save):', data);
    save_profile(data).then(response =>{

    }).catch(error =>{
      console.log(error)
    })
    // Save data to backend or state management here
  };

  // Auto-save function (simulate API call)
  const autoSave = (field, value) => {
    console.log(`Auto-saving ${field}:`, value);
    // Simulate API call or save to state management
  };

  return (
    <ProfileForm onSubmit={handleSubmit} autoSave={autoSave} userData={auth.user}/>
  );
}

export default CreateResume;