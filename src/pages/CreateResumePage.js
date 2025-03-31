import React, { useState } from "react";
import CreateResumeForm from "../components/forms/CreateResumeForm"
import PreviewResumeLayout from "../components/common/PreviewResumeLayout"
import { useAuth } from "../contexts/AuthContext";
import { useConfig } from "../contexts/ConfigContext"
import { get_keywords_optimization } from "../services/GetKeywordsImprovement"
import { Link } from "react-router-dom";

function CreateResumePage() {

  // DEBUG
  const [debug] = useState(true);

  // Language
  const { config, language } = useConfig();
  const labels = config.labels[language];

  // Const for Form
  const [isLoading, setIsLoading] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);

  // For keyword optimization
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [type, setType] = useState("")
  const [matchScore, setMatchScore] = useState(0);
  const [keywords, setKeywords] = useState([]);

  const { user, logout } = useAuth();

  // Form submission
  const handleOnSubmit = async (data) => {
    setIsLoading(true);

    // YOUR LOGIC HERE - Call your API
    console.log('Form data:', data);

    // Mock response
    setTimeout(() => {
      /*setResume({
        content: `## ${auth.user.name}\n### Experience\n- ${data.jobDescription.substring(0, 30)}...`,
        keywords: ['sample', 'keywords']
      });*/
      setIsLoading(false);
    }, 4000);
  };

  const handleOnOptimization = async () => {

    try {
      await get_keywords_optimization({ job_title: jobTitle, job_description: jobDescription, type: type, lang: language }).then(response => {
        setMatchScore(response.match);
        setKeywords(response.keywords);
        setIsOptimized(!isOptimized)
      }).catch(error => {
        if (error.status === 500) {// token expired
          logout();
        }
      })
    } catch (error) {
      console.log(error, "asd");
    } finally {

    }

  }

  if (debug) {
    return (
      <><img className="min-w-screen" src="/under_construction.jpeg"/></>
    );
  } else {
    return (
      (user.profile ?
        (
          <CreateResumeForm user={user}
            onSubmit={handleOnSubmit}
            onOptimization={handleOnOptimization}
            isLoading={isLoading}
            labels={labels}
            isOptimized={isOptimized}
            setJobTitle={setJobTitle}
            setJobDescription={setJobDescription}
            setType={setType}
            matchScore={matchScore}
            keywords={keywords} />
          //<PreviewResumeLayout resumeData={auth.user}/>
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