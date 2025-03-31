import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeForm from "../components/forms/ImproveResumeForm";
import {getImprovedResume} from "../services/GetImprovedResume"
import { useConfig } from "../contexts/ConfigContext";

function ImproveResumePage() {

   // Language
   const {config, language} = useConfig();
   const labels = config.labels[language];

   // Const for Form
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");

   const navigate = useNavigate();

   const handleSubmit = async (data) => {
      setIsLoading(true);
      setError("");
      const formData = new FormData();
      formData.append("resume", data.resume[0]);
      formData.append("job_title", data.job_title);
      formData.append("lang", language);
      formData.append("job_description", data.job_description);

      try {
         await getImprovedResume(formData)
         .then((response) => {
            // send json in text
            const response_text = response.optimized_resume;
            navigate("/improved",{ state:{ response_text }});
         })
         .catch(err => {
            if(err.response?.data?.detail === "403: Email not verified"){
               setError(labels.error.userNotVerified);
            }else if(err.response?.data?.detail === "203: You have not improvements left."){
               setError(labels.error.withoutImprovements);
            }else{
               setError(labels.error.universalError);
             }
         });
      } catch (error) {
         setError(labels.error.resumeNotUploaded);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <ResumeForm onSubmit={handleSubmit} isLoading={isLoading} labels={labels} error={error}/>
   );
}

export default ImproveResumePage;