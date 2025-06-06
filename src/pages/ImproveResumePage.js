import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {CreditEmptyModal} from "../components/common/CreditEmptyModal"
import ResumeForm from "../components/forms/ImproveResumeForm";
import {getImprovedResume} from "../services/GetImprovedResume"
import { useConfig } from "../contexts/ConfigContext";
import { useAuth } from "../contexts/AuthContext";
import { ContinueWithLoginModal } from "../components/common/ContinueWithLoginModal";

function ImproveResumePage() {

   // Language
   const {config, language} = useConfig();
   const labels = config.labels[language];

   // Const for Form
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [showCreditModal, setShowCreditModal] = useState(false);
   const submitButtonRef = useRef();

   const [showContinueModal, setShowContinueModal] = useState(false);
   const [countCloseModal, setCountCloseModal] = useState(8);

   const navigate = useNavigate();

   // Load user
   const {user, verified, system, logout} = useAuth();

     //cost
   const cost = ()=>{
      if(!system) return ""
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
      if(user && user.usage.current_credits < Number(system.resume_optimization)){ 
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
         if(user) {
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
            }).catch(err => {
               if (err.status === 500) {// token expired
                  logout();
               }else if(err.response?.data?.detail === "403: Email not verified"){
                  setError(labels.error.userNotVerified);
               }else{
                  setError(labels.error.universalError);
               }
            });
         }else{
            setShowContinueModal(true);
            setCountCloseModal(15);
         }
      } catch (error) {
         setError(labels.error.resumeNotUploaded);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(()=>{
      if(user && verified){
         const intervalId = setInterval(() => {
            setCountCloseModal(prev =>{
               const newCount = prev - 1;

               if(newCount < 0){
                  clearInterval(intervalId);
                  submitButtonRef.current.click();
                  return 0;
               }

               return newCount;
            });
            
         }, 1000);
      }
   },[user,verified])

   return (
      <>
         {showCreditModal && <CreditEmptyModal/>}
         <ResumeForm
         onSubmit={handleSubmit}
         isLoading={isLoading}
         labels={labels}
         error={error}
         submitButtonRef={submitButtonRef}
         cost={cost()}/>

         {(showContinueModal && countCloseModal !== 0) && <ContinueWithLoginModal user={user} verified={verified} count={countCloseModal}/>}
      </>
   );
}

export default ImproveResumePage;