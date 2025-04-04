import React, { useState } from "react";
import PreviewResumeLayout from "../components/common/PreviewResumeLayout"
import { useAuth } from "../contexts/AuthContext";

const PreviewResumePage = () => {

  const {user} = useAuth();
  const [resumeMarkdown] = useState("");

  const handleExport = async (type, markdown)=>{

  }

  const saveToBackend = async(markdown)=>{

  }

  return (
    <PreviewResumeLayout
      initialMarkdown={resumeMarkdown}
      onExport={(type, markdown) => handleExport(type, markdown)}
      onSave={(markdown) => saveToBackend(markdown)}
    />
  );
};

export default PreviewResumePage;