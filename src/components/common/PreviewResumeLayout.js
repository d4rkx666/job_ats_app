import React from "react";

function PreviewResumeLayout(resume){
  const getResume = resume.resume;
  return (
    <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{getResume.name}</h1>
        <h2 className="text-2xl text-gray-600">{getResume.title}</h2>
      </div>

      {/* Contact Information */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p>Email: {getResume.contact.email}</p>
          <p>Phone: {getResume.contact.phone}</p>
          <p>LinkedIn: {getResume.contact.linkedin}</p>
          <p>GitHub: {getResume.contact.github}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Summary</h3>
        <p className="text-gray-700">{getResume.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Experience</h3>
        {getResume.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-lg font-bold text-gray-800">{exp.title}</h4>
            <p className="text-gray-600">
              {exp.company} | {exp.duration}
            </p>
            <p className="text-gray-700 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Education</h3>
        {getResume.education.map((edu, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-lg font-bold text-gray-800">{edu.degree}</h4>
            <p className="text-gray-600">
              {edu.institution} | {edu.duration}
            </p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {getResume.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewResumeLayout;