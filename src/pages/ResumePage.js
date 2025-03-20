import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeForm from "../components/forms/ImproveResumeForm";
import {getImprovedResume} from "../services/GetImprovedResume"
import { useConfig } from "../contexts/ConfigContext";

function ResumePage() {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");

   const {config, language} = useConfig();
   const labels = config.labels[language];

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
         .catch(error => {
            switch(error.status){
               case 403: setError(labels.error.userNotVerified); break;
               default: setError(labels.error.universalError)
            }
            
         });

         
      } catch (error) {
         setError(labels.error.resumeNotUploaded);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div>
         <ResumeForm onSubmit={handleSubmit} isLoading={isLoading} labels={labels} error={error}/>
      </div>
   );
}

export default ResumePage;