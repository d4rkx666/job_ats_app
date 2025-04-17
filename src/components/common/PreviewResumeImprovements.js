import React from "react";
import { useLocation } from "react-router-dom";
import { useConfig } from "../../contexts/ConfigContext";
import { motion } from "framer-motion";

function PreviewResumeImprovements() {
  // Language
  const { config, language } = useConfig();
  const labels = config.labels[language];

  const location = useLocation();
  const { response_text, response_json = null } = location.state || "";

  // clean response:
  const cleaned_resume = response_text?.replace(/\s+/g, " ").trim();
  const improvements = cleaned_resume ? JSON.parse(cleaned_resume).improvements : response_json != null ? response_json : [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">{labels.previewImprovement.title}</h2>
            <p className="text-blue-100">{labels.previewImprovement.subtitle}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {improvements.length > 0 && response_text ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {improvements.map((category, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                        <svg
                          className="h-6 w-6 text-indigo-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                          {category.category}
                        </h3>
                        <ul className="space-y-3">
                          {category.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="flex-shrink-0 mt-1 mr-2">
                                <svg
                                  className="h-5 w-5 text-blue-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                  />
                                </svg>
                              </span>
                              <span className="text-gray-700">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : improvements.length > 0 && response_json ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {improvements.map((category, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-lg shadow-sm">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                          {category.category}
                        </h3>
                        <ul className="space-y-4">
                          {category.suggestions.map((suggestion, idx) => (
                            <motion.li
                              key={idx}
                              className="group"
                              whileHover={{ x: 2 }}
                            >
                              <div className="flex items-start">
                                <span className="flex-shrink-0 mt-1 mr-3">
                                  <svg
                                    className="h-5 w-5 text-indigo-400 group-hover:text-indigo-600 transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                                <div>
                                  <p className="text-gray-800 font-medium">{suggestion.suggestion}</p>
                                  {suggestion.advice && (
                                    <p className="text-gray-500 mt-1 text-sm">{suggestion.advice}</p>
                                  )}
                                </div>
                              </div>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No improvements found
                </h3>
                <p className="mt-1 text-gray-500">
                  We couldn't find any resume improvements to display.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Review these suggestions to enhance your resume's impact
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PreviewResumeImprovements;