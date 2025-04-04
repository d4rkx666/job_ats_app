import React, { useEffect, useState } from "react";
import CreateResumeForm from "../components/forms/CreateResumeForm"
import {CreditEmptyModal} from "../components/common/CreditEmptyModal"
import { useAuth } from "../contexts/AuthContext";
import { useConfig } from "../contexts/ConfigContext"
import { get_keywords_optimization } from "../services/GetKeywordsImprovement"
import { Link, useLocation, useNavigate } from "react-router-dom";
import {set_new_resume} from "../services/SetNewResume"

// For construction page
import { WrenchScrewdriverIcon, EnvelopeIcon } from '@heroicons/react/24/outline';


function CreateResumePage() {

  // DEBUG
  const [debug] = useState(true);

  // Language
  const { config, language } = useConfig();
  const labels = config.labels[language];

  // Get const from dashboard in case of draft
  const location = useLocation();
  const draft = location.state || {}; 

  // Const for Form
  const [isLoading, setIsLoading] = useState(false);
  const [isOptimized, setIsOptimized] = useState(draft.isOptimizedDraft || false);
  const [error, setError] = useState("");
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [idDraft, setIdDraft] = useState("");
  const navigate = useNavigate();

  // For keyword optimization
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [type, setType] = useState("")
  const [matchScore, setMatchScore] = useState(0);
  const [keywords, setKeywords] = useState([]);
  const [currentStep, setCurrentStep] = useState(1); // 1-4 steps
  const [isOptimizerOpen, setIsOptimizerOpen] = useState(false); // open modal
  const [context, setContext] = useState("create"); // create, draft, preview

  // User auth
  const { user, logout } = useAuth();

  // Detects coming from Drafts
  useEffect(()=>{
    if(draft.isOptimizedDraft){
      setCurrentStep(2) // go to step 2
      setMatchScore(draft.item.ats_score);
      setKeywords(draft.item.keywords);
      setIsOptimized(isOptimized)
      setContext("draft")
      setIdDraft(draft.item.id);
    }
  },[draft.isOptimizedDraft])

  // Form submission
  const handleOnSubmit = async (data) => {
    setIsLoading(true);
    try{
      let to_insert={
        template: data.template,
        lang: language,
        idDraft: idDraft,
        coverLetter: data.includeCoverLetter
      }

      await set_new_resume(to_insert).then(response=>{
        if(response.success === true){
          const item = user.creations.find(i => i.id === to_insert.idDraft);
          item.resume = response.resume;
          item.tips = response.tips;
          item.ats_score = response.ats_score;
          setIsLoading(false)
          return;
          navigate("/preview-resume",{
            state:{
              draft: item
            }
          });
        }
      }).catch(error=>{
        
      })
    }catch(error){

    }finally{
      setIsLoading(false);
    }
  };

  // Click when optimizes keywords
  const handleOnOptimization = async () => {
    setIsLoading(true);
    console.log("on optimize")
    if(user.usage.current_credits < Number(process.env.REACT_APP_KEYWORDS_OPTIMIZATION_COST)){ 
      setShowCreditModal(true);
      setIsLoading(false);
      return;
    }

    try {
      if(draft.isOptimizedDraft){
        await get_keywords_optimization({ job_title: "", job_description: "", lang: language, isDraft: true, idDraft: draft.item.id }).then(response => {
          console.log(response)
          if(response.success){
            setMatchScore(response.score);
            setKeywords(response.keywords);
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
        }).catch(error => {
          if (error.status === 500) {// token expired
            logout();
          }
        })
      }else{
        await get_keywords_optimization({ job_title: jobTitle, job_description: jobDescription, type: type /*free-pro*/, lang: language, isDraft: false }).then(response => {
          if(response.success){
            setMatchScore(response.score);
            setKeywords(response.keywords);
            setIsOptimized(true)
            setIdDraft(response.idDraft);
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
        }).catch(error => {
          if (error.status === 500) {// token expired
            logout();
          }
        })
      }
    } catch (error) {
      console.log(error, "asd");
    } finally {
      setIsLoading(false);
    }

  }

  if (debug) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mb-6">
          <WrenchScrewdriverIcon className="h-10 w-10 text-blue-600" />
        </div>
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Under Construction</h1>
        
        {/* Description */}
        <p className="text-gray-600 mb-6">
          We're working hard to bring you an amazing experience. This page will be available soon!
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-blue-600 h-2 rounded-full animate-pulse" 
            style={{ width: '75%' }}
          ></div>
        </div>
      </div>
      
      {/* Footer */}
      <p className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </div>
    );
  } else {
    return (
      ((user.profile && user.profile?.skills && user.profile?.education && user.profile?.jobs) ?
        (
          <>
          {showCreditModal && <CreditEmptyModal/>}
          <CreateResumeForm user={user}
            onSubmit={handleOnSubmit}
            onOptimization={handleOnOptimization}
            error={error}
            isLoading={isLoading}
            labels={labels}
            isOptimized={isOptimized}
            setJobTitle={setJobTitle}
            setJobDescription={setJobDescription}
            setType={setType}
            matchScore={matchScore}
            keywords={keywords}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            draft={draft}
            isOptimizerOpen={isOptimizerOpen}
            setIsOptimizerOpen={setIsOptimizerOpen}
            context={context} />
          </>
        ) : (
          <div className="max-w-3xl mx-auto m-3 relative isolate overflow-hidden p-6 rounded-xl bg-white border border-gray-200 shadow-2xl transition-all duration-300 hover:shadow-lg">
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-2 bg-gray from-blue-50/50 to-white" />
            <div className="absolute -right-20 -top-20 -z-2 h-64 w-64 rounded-full bg-blue-100/30 blur-2xl" />
            <div className="absolute -left-20 -bottom-20 -z-2 h-64 w-64 rounded-full bg-blue-200/20 blur-2xl" />
            
            {/* Content */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Your Profile</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Unlock personalized recommendations and full access by setting up your professional profile
              </p>
              
              <div className="flex space-x-4">
                <Link
                  to="/profile"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 relative flex items-center justify-center px-6 py-3 font-medium  rounded-lg group"
                >
                    Get Started
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </Link>
              </div>
            </div>
            
            {/* Floating particles */}
            <div className="absolute top-2 right-4 h-2 w-2 rounded-full bg-blue-400 animate-float" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-4 left-6 h-1.5 w-1.5 rounded-full bg-blue-300 animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
        )
      )
    );
  }
}

export default CreateResumePage;