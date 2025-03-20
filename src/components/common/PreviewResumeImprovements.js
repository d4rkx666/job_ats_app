import React from "react";
import { useLocation } from "react-router-dom";
import { useConfig } from "../../contexts/ConfigContext";

function PreviewResumeImprovements(){

  // Language
  const {config, language} = useConfig();
  const labels = config.labels[language];

  const location = useLocation();
  const { response_text } = location.state || ""; 
  
  // clean response:
  const cleaned_resume = response_text.replace(/\s+/g, " ").trim();
  const improvements = JSON.parse(cleaned_resume);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{labels.previewImprovement.title}</h2>
      <h5 className="font-bold text-gray-800 mb-8">{labels.previewImprovement.subtitle}</h5>
      {improvements.map((category, index) => (
      <div key={index} className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {category.category}
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            {category.suggestions.map((suggestion, idx) => (
            <li key={idx} className="mb-2">
                {suggestion}
            </li>
            ))}
          </ul>
      </div>
      ))}
    </div>
  );
};

export default PreviewResumeImprovements;