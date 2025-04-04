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
      (user.profile ?
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
          <div className="ml-3 bg-green-100 p-2 rounded">
            <div className="mt-2 text-sm text-blue-700">
              <p>
                To continue, you need to set up your profile.
              </p>
            </div>
            <div className="mt-4">
              <Link to="/profile"
                type="button"
                className="text-sm font-medium text-blue-700 hover:text-blue-600 underline"
              >
                Go to mi profile →
              </Link>
            </div>
          </div>
        )
      )
    );
  }
}

export default CreateResumePage;