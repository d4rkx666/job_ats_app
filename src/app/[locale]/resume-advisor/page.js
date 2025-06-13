"use client"
import React, { useEffect, useRef, useState } from "react";
import { CreditEmptyModal } from "@/app/components/common/CreditEmptyModal";
import ResumeAdvisorForm from "./components/ResumeAdvisorForm";
import { getImprovedResume } from "@/app/hooks/GetImprovedResume";
import { useAuth } from "@/app/contexts/AuthContext";
import { ContinueWithLoginModal } from "./components/ContinueWithLoginModal";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

function ResumeAdvisor() {

   // Language
   const d = useTranslations("dashboardPage")
   const e = useTranslations("error")
   const language = useLocale();

   // Const for Form
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [showCreditModal, setShowCreditModal] = useState(false);
   const submitButtonRef = useRef();

   const [showContinueModal, setShowContinueModal] = useState(false);
   const [countCloseModal, setCountCloseModal] = useState(8);

   const router = useRouter();

   // Load user
   const {user, verified, system, logout} = useAuth();

     //cost
   const cost = ()=>{
      if(!system) return ""
      return (
        <>
          {system.action_cost.resume_optimization} {d("credit")}
          {system.action_cost.resume_optimization !== 1 && 's'}
        </>
      )
   }

   const handleSubmit = async (data) => {
      setIsLoading(true);

      // Check credits
      if(user && user.usage.current_credits < Number(system.action_cost.resume_optimization)){ 
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
                  const job_title = response.job_title;
                  router.push("/ai-advice",{ state:{ response_json, job_title}});
               }else{
                  switch(response.type_error){
                     case "no_credits_left":
                        setError(e("withoutImprovements"));
                        break;
                     default:
                        setError(e("universalError"));
                        break;
                  }
               }
            }).catch(err => {
               if(err.response?.data?.detail === "403: Email not verified"){
                  setError(e("userNotVerified"));
               }else if (err.status === 500) {// token expired
                  logout();
               }else{
                  setError(e("universalError"));
               }
            });
         }else{
            setShowContinueModal(true);
            setCountCloseModal(15);
         }
      } catch (error) {
         setError(e("resumeNotUploaded"));
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
         <ResumeAdvisorForm
         onSubmit={handleSubmit}
         isLoading={isLoading}
         error={error}
         submitButtonRef={submitButtonRef}
         cost={cost()}/>

         {(showContinueModal && countCloseModal !== 0) && <ContinueWithLoginModal user={user} verified={verified} count={countCloseModal}/>}
      </>
   );
}

export default ResumeAdvisor;