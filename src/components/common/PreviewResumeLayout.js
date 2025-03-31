import { useEffect, useRef, useState } from 'react';
import ProBadge from './ProBadge';

function PreviewResumeLayout({ resumeData, isPro = false, onRegenerate }) {
  const resumeRef = useRef(null);
  const [resume, setResume] = useState({
    content: `## Felix\n### Experience\n- This is a job description}...`,
    keywords: ['sample', 'keywords']
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Resume</h2>
            <div className="flex space-x-2">
              <button
                type="button"
                className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
              >
                PDF
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded text-sm ${isPro ?
                  'bg-gray-100 hover:bg-gray-200' :
                  'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!isPro}
              >
                Word
                {!isPro && (
                  <ProBadge />
                )}
              </button>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="p-4 border rounded bg-gray-50 whitespace-pre-line">
            {resume.content}
          </div>

          {/* Keywords */}
          {isPro && resume.keywords && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Keyword Optimization</h3>
              <div className="flex flex-wrap gap-2">
                {resume.keywords.map((keyword) => (
                  <span key={keyword} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
  );
}

export default PreviewResumeLayout