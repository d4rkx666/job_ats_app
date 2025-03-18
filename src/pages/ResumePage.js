import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ResumeForm from "../components/forms/ImproveResumeForm";
import {getImprovedResume} from "../services/GetImprovedResume"
import { useConfig } from "../contexts/ConfigContext";

function ResumePage() {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");

   const {config, language} = useConfig();
   const labels = config.labels[language];

   const improvements = [
      {
        "category": "Keywords",
        "suggestions": [
          "Add 'JavaScript' to the skills section.",
          "Include 'Agile Methodology' in the experience section."
        ]
      },
      {
        "category": "Formatting",
        "suggestions": [
          "Use consistent bullet points for all job descriptions.",
          "Increase font size for section headings."
        ]
      },
      {
        "category": "Experiences",
        "suggestions": [
          "Quantify achievements in the 'Senior Software Engineer' role (e.g., 'Increased system performance by 30%').",
          "Add more details about the 'Software Engineer' role at XYZ Inc."
        ]
      },
      {
        "category": "something",
        "suggestions": [
          "test",
          "test"
        ]
      }
    ];

   const handleSubmit = async (data) => {
      setIsLoading(true);
      setError("");
      const formData = new FormData();
      formData.append("resume", data.resume[0]);
      formData.append("job_title", data.job_title);
      formData.append("lang", language);
      formData.append("job_description", data.job_description);

      try {
         const response = await getImprovedResume(formData);
         console.log("Form submitted successfully:", response);
         return <Navigate to="/improved" state={{ improvements }} />;
      } catch (error) {
         setError("Failed to submit resume. Please try again.");
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