import { useAuth } from "../contexts/AuthContext"
import { useConfig } from "../contexts/ConfigContext";
import FeedbackForm from "../components/forms/FeedbackForm"
import { feedback } from "../services/SetFeedback"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RoundedATSIndicador } from "../components/common/RoundedATSIndicator"

function Dashboard() {
  const { config, language } = useConfig();
  const labels = config.labels[language];
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('improvements'); // 'improvements' or 'drafts'

  // Check for user's feedback
  useEffect(() => {
    if (auth.user.feedback) {
      setSubmitted(true);
    }
  }, [auth.user.feedback]);


  // Handle click when users gives feedback
  const handleFeedback = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      await feedback(data.rate, data.feedback);
      setSubmitted(true);
    } catch (err) {
      if (err.response?.data?.detail === "403: Email not verified") {
        setError(labels.error.userNotVerified);
      } else {
        setError(labels.error.universalError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Credit-based quota calculations
  const creditsUsed = auth.user.usage?.used_credits || 0;
  const totalCredits = auth.user.usage?.total_credits || 6; // Default to 6 for free tier
  const creditsLeft = totalCredits - creditsUsed;
  const usagePercentage = Math.min(100, Math.round((creditsUsed / totalCredits) * 100));

  // Action costs (for tooltips)
  const actionCosts = {
    keyword_optimization: process.env.REACT_APP_KEYWORDS_OPTIMIZATION_COST,
    resume_creation: process.env.REACT_APP_RESUME_CREATION_COST,
    resume_optimization: process.env.REACT_APP_RESUME_OPTIMIZATION_COST
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {labels.dashboardPage.welcome}, <span className="text-blue-600">{auth.user.name}</span>!
        </h1>
        <p className="text-gray-600 mt-2">{labels.dashboardPage.subWelcome}</p>

        {/* New Credit Quota Widget */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium text-gray-700">
              {auth.user.subscription?.plan === 'pro' ? labels.user.proPlan : labels.user.freePlan}
            </h2>
            <span className="text-sm font-medium">
              {creditsLeft}/{totalCredits} {labels.dashboardPage.creditsLeft}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
            <div
              className={`h-2.5 rounded-full ${usagePercentage >= 90 ? 'bg-red-500' :
                usagePercentage >= 70 ? 'bg-yellow-500' : 'bg-blue-600'
                }`}
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>

          {/* Action Costs */}
          <div className="space-y-3 mt-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {labels.dashboardPage.actionCosts}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Keyword Optimization */}
              <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex-shrink-0 w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{labels.dashboardPage.keywordOptimization}</p>
                  <p className="text-xs text-gray-500">
                    {actionCosts.keyword_optimization} {labels.dashboardPage.credit}
                    {actionCosts.keyword_optimization !== 1 && 's'}
                  </p>
                </div>
              </div>

              {/* Resume Creation */}
              <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-indigo-100">
                <div className="flex-shrink-0 w-3 h-3 bg-indigo-400 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{labels.dashboardPage.resumeCreation}</p>
                  <p className="text-xs text-gray-500">
                    {actionCosts.resume_creation} {labels.dashboardPage.credit}
                    {actionCosts.resume_creation !== 1 && 's'}
                  </p>
                </div>
              </div>

              {/* Resume Optimization - Only show if exists */}
              {actionCosts.resume_optimization && (
                <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex-shrink-0 w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{labels.dashboardPage.resumeOptimization}</p>
                    <p className="text-xs text-gray-500">
                      {actionCosts.resume_optimization} {labels.dashboardPage.credit}
                      {actionCosts.resume_optimization !== 1 && 's'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Upgrade Prompt */}
          {auth.user.subscription?.plan !== 'pro' && (
            <div className="mt-4 text-center">
              <Link
                to="/pricing"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {labels.dashboardPage.upgrade}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">

        {/* Improvements button*/}
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'improvements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('improvements')}
        >
          {labels.dashboardPage.improvements}
        </button>

        {/* Creations button*/}
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'creations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('creations')}
        >
          {labels.dashboardPage.creations}
        </button>

        {/* Drafts button*/}
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'drafts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('drafts')}
        >
          {labels.dashboardPage.drafts}
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'improvements' && (
        <div className="space-y-6">

          {auth.user.improvements?.length > 0 ? (
            <div className="space-y-3">
              {auth.user.improvements.map((improvement) => (
                <Link
                  to="/improved"
                  state={{ response_text: improvement.ai_improvements }}
                  className="block no-underline"
                  key={improvement.id}
                >
                  <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-l-4 hover:border-l-blue-500">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                          {improvement.job_title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {improvement.job_description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500">
                          {new Date(
                            improvement.createdAt.seconds * 1000 +
                            improvement.createdAt.nanoseconds / 1000000
                          ).toLocaleDateString()}
                        </span>
                        <span
                          className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${improvement.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {improvement.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg text-center">
              <p className="text-gray-500">{labels.dashboardPage.noImprovements}</p>
            </div>
          )}
        </div>
      )
      }

      {activeTab === 'creations' && (
        <div className="space-y-6">
          {auth.user.creations?.length > 0 ? (
            <div className="space-y-3">
              {auth.user.creations.map((draft) => (
                (draft.status === "created" &&
                  <Link
                    to="/preview-resume"
                    state={{ draft: draft }}
                    className="block no-underline"
                    key={draft.id}
                  >
                    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-l-4 hover:border-l-blue-500">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="hidden lg:flex flex-col items-end">
                          <div className="flex flex-col items-center">
                            <p className="text-xs">ATS</p>
                            <RoundedATSIndicador score={draft.ats_score} className="w-10 h-10" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {draft.job_title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {draft.job_description}
                          </p>
                        </div>
                        <div className="flex flex-row items-center justify-between md:flex-col md:items-end gap-2">
                          <div className="flex lg:hidden flex-col items-center">
                            <p className="text-xs">ATS</p>
                            <RoundedATSIndicador score={draft.ats_score} className="w-10 h-10" />
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-gray-500">
                              {new Date(
                                draft.createdAt.seconds * 1000 +
                                draft.createdAt.nanoseconds / 1000000
                              ).toLocaleDateString()}
                            </span>
                            <span
                              className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${draft.status === "created"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                              {draft.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg text-center">
              <p className="text-gray-500">{labels.dashboardPage.noCreations}</p>
            </div>
          )}
        </div>
      )}


      {activeTab === 'drafts' && (
        <div className="space-y-6">
          {auth.user.creations?.length > 0 ? (
            <div className="space-y-3">
              {auth.user.creations.map((draft) => (
                (draft.status === "draft" &&
                  <Link
                    to="/create-resume"
                    state={{ isOptimizedDraft: true, item: draft }}
                    className="block no-underline"
                    key={draft.id}
                  >
                    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-l-4 hover:border-l-blue-500">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="hidden lg:flex flex-col items-end">
                          <div className="flex flex-col items-center">
                            <p className="text-xs">ATS</p>
                            <RoundedATSIndicador score={draft.ats_score} className="w-10 h-10" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {draft.job_title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {draft.job_description}
                          </p>
                        </div>
                        <div className="flex flex-row items-center justify-between md:flex-col md:items-end gap-2">
                          <div className="flex lg:hidden flex-col items-center">
                            <p className="text-xs">ATS</p>
                            <RoundedATSIndicador score={draft.ats_score} className="w-10 h-10" />
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-gray-500">
                              {new Date(
                                draft.createdAt.seconds * 1000 +
                                draft.createdAt.nanoseconds / 1000000
                              ).toLocaleDateString()}
                            </span>
                            <span
                              className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${draft.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                              {draft.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg text-center">
              <p className="text-gray-500">{labels.dashboardPage.noDrafts}</p>
            </div>
          )}
        </div>
      )}

      {/* Feedback Section */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {labels.formFeedback.title}
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <FeedbackForm
          onSubmit={handleFeedback}
          isLoading={isLoading}
          submitted={submitted}
          labels={labels}
        />
      </div>
    </div>
  );
}

export default Dashboard;