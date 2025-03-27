import React from "react";

// Mockup in React + Tailwind (simplified for clarity)
function PreviewCreateResume() {
  // State management
  const [jobDescription, setJobDescription] = useState('');
  const [optimizeEnabled, setOptimizeEnabled] = useState(false);
  const [resumeVersion, setResumeVersion] = useState('default');
  const [missingSkills, setMissingSkills] = useState([]);

  // Generate resume handler
  const handleGenerate = () => {
    // 1. Call API to generate baseline resume from profile
    // 2. If optimized, call AI to tailor it
    // 3. Compare before/after and identify missing skills
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      {/* Left Column: Inputs */}
      <div className="space-y-6">
        {/* Job Description Input */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-2">Job Description</h3>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full h-40 p-3 border rounded"
          />
        </div>

        {/* Customization Panel */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-3">Optimization</h3>
          
          {/* Keyword Optimization Toggle */}
          <ToggleSwitch
            label="Optimize for this job"
            checked={optimizeEnabled}
            onChange={setOptimizeEnabled}
            proFeature={true}
          />

          {/* Missing Skills Alert */}
          {missingSkills.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
              <h4 className="font-medium">Suggested Skills to Add:</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {missingSkills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-yellow-100 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Output */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Resume Preview Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${resumeVersion === 'default' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setResumeVersion('default')}
          >
            Original
          </button>
          <button
            className={`px-4 py-2 font-medium ${resumeVersion === 'optimized' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setResumeVersion('optimized')}
            disabled={!optimizeEnabled}
          >
            Optimized {optimizeEnabled && "(82% Match)"}
          </button>
        </div>

        {/* Before/After Comparison */}
        <div className="p-4 h-96 overflow-auto">
          {resumeVersion === 'default' ? (
            // Original resume from profile
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p>Web Developer</p>
              <h3 className="font-bold mt-4">Experience</h3>
              <ul className="list-disc pl-5">
                <li>Built websites using JavaScript</li>
                <li>Worked on customer support at Walmart</li>
              </ul>
            </div>
          ) : (
            // AI-Optimized resume
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p>React Developer</p> {/* Job-specific title */}
              <h3 className="font-bold mt-4">Relevant Experience</h3> {/* Rewritten section header */}
              <ul className="list-disc pl-5">
                <li>
                  <span className="bg-blue-100 px-1">Developed 3 React applications</span> {/* Highlighted change */}
                </li>
                {/* Irrelevant job omitted */}
              </ul>
              <div className="mt-4 p-2 bg-green-50 border-l-4 border-green-400">
                <p className="text-sm">AI added: <strong>"React"</strong> and <strong>"AWS"</strong> based on job requirements</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-gray-50 flex justify-between">
          <button className="px-4 py-2 border rounded">
            Save as New Version
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewCreateResume;