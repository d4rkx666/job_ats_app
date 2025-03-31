import React, { useState } from "react";
import CreateResumeForm from "../components/forms/CreateResumeForm"
import PreviewResumeLayout from "../components/common/PreviewResumeLayout"
import { useAuth } from "../contexts/AuthContext";
import { useConfig } from "../contexts/ConfigContext"


function CreateResume() {

  // Language
  const { config, language } = useConfig();
  const labels = config.labels[language];

  // Const for Form
  const [isLoading, setIsLoading] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);

  const auth = useAuth();

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
    setIsOptimized(!isOptimized)

  }

  return (
    <CreateResumeForm user={auth.user} onSubmit={handleOnSubmit} onOptimization={handleOnOptimization} isLoading={isLoading} labels={labels} isOptimized={isOptimized} />
    //<PreviewResumeLayout resumeData={auth.user}/>
  );
}

export default CreateResume;