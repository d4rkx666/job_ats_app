import React from "react";
import PreviewCreateResume from "../components/common/PreviewCreateResume"

const PreviewResumePage = () => {

   const resume = {
      name: "John Doe",
      title: "Software Engineer",
      contact: {
        email: "john.doe@example.com",
        phone: "(123) 456-7890",
        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe"
      },
      summary: "Experienced software engineer with a passion for building scalable and efficient systems.",
      experience: [
        {
          title: "Senior Software Engineer",
          company: "ABC Corp",
          duration: "2020–Present",
          description: "Led a team of engineers to develop a scalable microservices architecture."
        },
        {
          title: "Software Engineer",
          company: "XYZ Inc",
          duration: "2016–2020",
          description: "Developed and maintained web applications using React and Node.js."
        }
      ],
      education: [
        {
          degree: "Bachelor of Science in Computer Science",
          institution: "University of Tech",
          duration: "2012–2016"
        }
      ],
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"]
    }

    console.log("1st", resume);

  return (
    <PreviewCreateResume resume={resume}></PreviewCreateResume>
  );
};

export default PreviewResumePage;