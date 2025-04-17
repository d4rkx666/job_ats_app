import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {CreditEmptyModal} from "../components/common/CreditEmptyModal"
import ResumeForm from "../components/forms/ImproveResumeForm";
import {getImprovedResume} from "../services/GetImprovedResume"
import { useConfig } from "../contexts/ConfigContext";
import { useAuth } from "../contexts/AuthContext";

function ImproveResumePage() {

   // Language
   const {config, language} = useConfig();
   const labels = config.labels[language];

   // Const for Form
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [showCreditModal, setShowCreditModal] = useState(false);

   const navigate = useNavigate();

   // Load user
   const {user, system, logout} = useAuth();

     //cost
     const cost = ()=>{
      return (
        <>
          {system.resume_optimization} {labels.dashboardPage.credit}
          {system.resume_optimization !== 1 && 's'}
        </>
      )
   }

   const handleSubmit = async (data) => {
      setIsLoading(true);

      // Check credits
      if(user.usage.current_credits < Number(system.resume_optimization)){ 
         setShowCreditModal(true);
         setIsLoading(false);
         return;
      }



      setError("");
      const formData = new FormData();
      formData.append("resume", data.resume[0]);
      formData.append("job_title", data.job_title);
      formData.append("lang", language);
      formData.append("job_description", data.job_description);

      try {
         await getImprovedResume(formData)
         .then((response) => {
            if(response.success){
               // send json in text
               const response_json = JSON.parse(response.optimized_resume);
               const job_title = response.job_title
               navigate("/improved",{ state:{ response_json, job_title}});
            }else{
               switch(response.type_error){
                  case "no_credits_left":
                     setError(labels.error.withoutImprovements);
                     break;
                  default:
                     setError(labels.error.universalError);
                     break;
               }
            }
         })
         .catch(err => {
            if (err.status === 500) {// token expired
               logout();
            }else if(err.response?.data?.detail === "403: Email not verified"){
               setError(labels.error.userNotVerified);
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
      <>
         {showCreditModal && <CreditEmptyModal/>}
         <ResumeForm
         onSubmit={handleSubmit}
         isLoading={isLoading}
         labels={labels}
         error={error}
         cost={cost()}/>
      </>
   );
}

export default ImproveResumePage;