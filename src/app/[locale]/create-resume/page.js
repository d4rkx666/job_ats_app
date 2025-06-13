"use client"
import { useState, useRef, useMemo, useEffect } from "react";
import CreateResumeForm from "./components/CreateResumeForm";
import { CreditEmptyModal } from "@/app/components/common/CreditEmptyModal";
import { useAuth } from "@/app/contexts/AuthContext";
import { get_keywords_extraction } from "@/app/hooks/GetKeywordsExtraction";
import { set_new_resume } from "@/app/hooks/SetNewResume";
import LoadingCreateResumeModal from "./components/LoadingCreateResumeModal";
import { useLocale, useTranslations } from "use-intl";
import RequireAuth from "@/utils/RequireAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";


function CreateResumePage() {

  // Language
  const t = useTranslations("dashboardPage");
  const e = useTranslations("error");
  const c = useTranslations("createResumePage");
  const language = useLocale();

  // Router
  const router = useRouter();

  // Get const from dashboard in case of draft
  const draft = useMemo(()=>{
    const data = JSON.parse(localStorage.getItem("draft")) || "";
    localStorage.removeItem("draft");
    return data;
  },[localStorage])

  // Const for Form
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingKeywords, setIsLoadingKeywords] = useState(false);
  const [isOptimized, setIsOptimized] = useState(draft.isOptimizedDraft || false);
  const [error, setError] = useState("");
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [idDraft, setIdDraft] = useState("");

  // For keyword optimization
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [matchScore, setMatchScore] = useState(0);
  const [keywords, setKeywords] = useState([]);
  const [currentStep, setCurrentStep] = useState(1); // 1-4 steps
  const [isOptimizerOpen, setIsOptimizerOpen] = useState(false); // open modal
  const [context, setContext] = useState("create"); // create, draft, preview

  // Loading 
  const [progress, setProgress] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);
  const [currentStepLoading, setCurrentStepLoading] = useState(1);
  const progressIntervalRef = useRef(null);

  // User auth
  const { user, system, logout } = useAuth();

  //cost
  const cost = (type) => {
    return (type === "keywords" ?
      <>
        {system.action_cost.keyword_extraction} {t("credit")}
        {system.action_cost.keyword_extraction !== 1 && 's'}
      </>
      :
      <>
        {system.action_cost.resume_creation} {t("credit")}
        {system.action_cost.resume_creation !== 1 && 's'}
      </>
    )
  }

  // Detects coming from Drafts
  useEffect(() => {
    if (draft.isOptimizedDraft) {
      setCurrentStep(2) // go to step 2
      setMatchScore(draft.item.ats_score);
      setKeywords(draft.item.keywords);
      setIsOptimized(isOptimized)
      setContext("draft")
      setIdDraft(draft.item.id);
    }
  }, [draft, isOptimized])

  // Form submission
  const handleOnSubmit = async (data) => {
    setIsLoading(true);
    setElapsedTime(0);
    setProgress(0);
    setCurrentStepLoading(1);

    // Start timer
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);


    if (user.usage.current_credits < Number(system.action_cost.resume_creation)) {
      setShowCreditModal(true);
      setIsLoading(false);
      return;
    }
    try {


      // Simulate progress updates - will stop at 99%
      const steps = 6;
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          // Stop at 99% (100% will be set when API completes)
          const maxProgress = 99;
          const increment = maxProgress / steps;
          const newProgress = prev + increment;
          return newProgress > maxProgress ? maxProgress : newProgress;
        });

        setCurrentStepLoading(prev => {
          if (prev >= steps) return steps;
          return prev + 1;
        });
      }, 2500);

      let to_insert = {
        template: data.template,
        lang: language,
        idDraft: idDraft,
        coverLetter: data.includeCoverLetter
      }

      const timeSolve = Math.floor(Math.random() * (20000 - 15000 + 1)) + 15000;
      await new Promise(resolve => setTimeout(resolve, timeSolve));
      const response = await set_new_resume(to_insert).catch(error => {
        if (error.status === 500) {// token expired
          logout();
        }
      })

      if (response.success === true) {
        // API completed, 100% and close modal
        setCurrentStepLoading(6)
        setProgress(100);
        await new Promise(resolve => setTimeout(resolve, 2000));

        router.push("/preview-new-resume", {
          state: {
            idCreation: idDraft
          }
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      clearInterval(timerRef.current);
      clearInterval(progressIntervalRef.current);
      setIsLoading(false);
    }
  };

  // Click when extracts keywords
  const handleOnExtraction = async () => {
    setIsLoadingKeywords(true);
    if (user.usage.current_credits < Number(system.action_cost.keyword_extraction)) {
      setShowCreditModal(true);
      setIsLoadingKeywords(false);
      return;
    }

    try {
      if (draft.isOptimizedDraft) {
        await get_keywords_extraction({ job_title: "", job_description: "", lang: language, isDraft: true, idDraft: draft.item.id }).then(response => {
          console.log(response)
          if (response.success) {
            setMatchScore(response.score);
            setKeywords(response.keywords);
          } else {
            switch (response.type_error) {
              case "no_credits_left":
                setError(e("withoutImprovements"));
                break;
              default:
                setError(e("universalError"));
                break;
            }
          }
        }).catch(error => {
          if (error.status === 500) {// token expired
            logout();
          }
        })
      } else {
        await get_keywords_extraction({ job_title: jobTitle, job_description: jobDescription, lang: language, isDraft: false }).then(response => {
          if (response.success) {
            setMatchScore(response.score);
            setKeywords(response.keywords);
            setIsOptimized(true)
            setIdDraft(response.idDraft);
          } else {
            switch (response.type_error) {
              case "no_credits_left":
                setError(e("withoutImprovements"));
                break;
              default:
                setError(e("universalError"));
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
      console.log(error);
    } finally {
      setIsLoadingKeywords(false);
    }

  }

  return (
    ((user.profile && user.profile?.skills && user.profile?.education && user.profile?.jobs) ?
      (
        <>
          {showCreditModal && <CreditEmptyModal />}
          <CreateResumeForm user={user}
            onSubmit={handleOnSubmit}
            onExtraction={handleOnExtraction}
            error={error}
            isLoading={isLoading}
            isLoadingKeywords={isLoadingKeywords}
            isOptimized={isOptimized}
            setJobTitle={setJobTitle}
            setJobDescription={setJobDescription}
            matchScore={matchScore}
            keywords={keywords}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            draft={draft}
            isOptimizerOpen={isOptimizerOpen}
            setIsOptimizerOpen={setIsOptimizerOpen}
            costKeywords={cost("keywords")}
            costCreateResume={cost("create")}
            context={context}
            progress={progress}
          />

          {/* LOADING MODAL*/}
          {isLoading && (
            <LoadingCreateResumeModal
              progress={progress}
              currentStep={currentStepLoading}
              elapsedTime={elapsedTime}
            />
          )}
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

            <h3 className="text-xl font-bold text-gray-900 mb-2">{c("title")}</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              {c("subtitle")}
            </p>

            <div className="flex space-x-4">
              <Link
                href="/profile"
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 relative flex items-center justify-center px-6 py-3 font-medium  rounded-lg group"
              >
                {c("getStartedBtn")}
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

export default RequireAuth(CreateResumePage);