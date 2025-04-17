import { useAuth } from "../contexts/AuthContext";
import { useConfig } from "../contexts/ConfigContext";
import FeedbackForm from "../components/forms/FeedbackForm";
import { feedback } from "../services/SetFeedback";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RoundedATSIndicador } from "../components/common/RoundedATSIndicator";
import { ProBadge } from "../components/common/Badge";
import { SparklesIcon, ArrowUpRightIcon, ClockIcon, CalendarIcon, DocumentTextIcon, ChartBarIcon } from "@heroicons/react/24/outline";

function Dashboard() {
  const { config, language } = useConfig();
  const labels = config.labels[language];
  const { user, system } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('improvements');
  const [sortOrder, setSortOrder] = useState('newest');

  // Check for user's feedback
  useEffect(() => {
    if (user.feedback) {
      setSubmitted(true);
    }
  }, [user.feedback]);

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
  const creditsUsed = user.usage?.used_credits || 0;
  const totalCredits = user.usage?.total_credits || 6;
  const creditsLeft = totalCredits - creditsUsed;
  const usagePercentage = Math.min(100, Math.round((creditsUsed / totalCredits) * 100));

  // Sort function for items
  const sortItems = (items) => {
    if (!items) return [];
    return [...items].sort((a, b) => {
      const dateA = new Date(a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000);
      const dateB = new Date(b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

  // Format date with time
  const formatDate = (timestamp, time=true) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    if(time){
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }else{
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-xl shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {labels.dashboardPage.welcome}, <span className="text-blue-200">{user.name}</span>!
            </h1>
            <p className="text-blue-100 mt-2">{labels.dashboardPage.subWelcome}</p>
          </div>
          
          {/* Plan Status */}
          <div className="mt-4 md:mt-0 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
            <div className="flex items-center">
              <SparklesIcon className="h-5 w-5 text-yellow-300 mr-2" />
              <span className="font-medium">
                {user.subscription?.plan === 'pro' ? (
                  <>
                    Pro Plan <ProBadge className="ml-2" />
                    <span className="block text-xs font-normal mt-1">
                      {labels.dashboardPage.expires} {formatDate(user.subscription.current_period_end, false)}
                    </span>
                  </>
                ) : (
                  <>
                    Free Plan
                    <span className="block text-xs font-normal mt-1">
                    {labels.dashboardPage.nextReset}: {formatDate(user.usage.next_reset, false)}
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Credit Quota Widget */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium">
              {user.subscription?.plan === 'pro' ? 'Unlimited credits' : 'Monthly credits'}
            </h2>
            <span className="text-sm font-medium">
              {creditsLeft}/{totalCredits} {labels.dashboardPage.creditsLeft}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2.5 mb-3">
            <div
              className={`h-2.5 rounded-full ${usagePercentage >= 90 ? 'bg-red-400' :
                usagePercentage >= 70 ? 'bg-yellow-400' : 'bg-green-400'
                }`}
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>

          {/* Upgrade Prompt */}
          {user.subscription?.plan !== 'pro' && (
            <div className="mt-4 text-center">
              <Link
                to="/pricing"
                className="inline-flex items-center text-sm font-medium text-white hover:text-blue-200"
              >
                {labels.dashboardPage.upgrade} <ArrowUpRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          {/* Action Costs */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-2" />
              {labels.dashboardPage.actionCosts}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-2 hover:bg-blue-50 rounded-lg transition-colors">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{labels.dashboardPage.keywordOptimization}</p>
                </div>
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {system.keyword_extraction} {labels.dashboardPage.credit}{system.keyword_extraction !== 1 && 's'}
                </span>
              </div>

              <div className="flex items-center p-2 hover:bg-blue-50 rounded-lg transition-colors">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{labels.dashboardPage.atsReoptimization}</p>
                </div>
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {system.ats_analysis} {labels.dashboardPage.credit}{system.ats_analysis !== 1 && 's'}
                </span>
              </div>

              <div className="flex items-center p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                <div className="flex-shrink-0 w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{labels.dashboardPage.resumeCreation}</p>
                </div>
                <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                  {system.resume_creation} {labels.dashboardPage.credit}{system.resume_creation !== 1 && 's'}
                </span>
              </div>

              {system.resume_optimization && (
                <div className="flex items-center p-2 hover:bg-purple-50 rounded-lg transition-colors">
                  <div className="flex-shrink-0 w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">{labels.dashboardPage.resumeOptimization}</p>
                  </div>
                  <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    {system.resume_optimization} {labels.dashboardPage.credit}{system.resume_optimization !== 1 && 's'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">{labels.dashboardPage.quickActions}</h3>
            <div className="space-y-2">
              <Link
                to="/create-resume"
                className="flex items-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <SparklesIcon className="h-5 w-5 mr-2" />
                {labels.dashboardPage.newResume}
              </Link>
              <Link
                to="/resume"
                className="flex items-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                {labels.dashboardPage.improveCurrent}
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Tab Navigation with Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-4 py-2 font-medium flex items-center ${activeTab === 'improvements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('improvements')}
              >
                <SparklesIcon className="h-4 w-4 mr-2" />
                {labels.dashboardPage.improvements}
              </button>
              <button
                className={`px-4 py-2 font-medium flex items-center ${activeTab === 'creations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('creations')}
              >
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                {labels.dashboardPage.creations}
              </button>
              <button
                className={`px-4 py-2 font-medium flex items-center ${activeTab === 'drafts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('drafts')}
              >
                <ClockIcon className="h-4 w-4 mr-2" />
                {labels.dashboardPage.drafts}
              </button>
            </div>

            <div className="flex items-center text-sm">
              <span className="mr-2 text-gray-500">{labels.dashboardPage.sort}:</span>
              <button
                onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                {sortOrder === 'newest' ? labels.dashboardPage.newest : labels.dashboardPage.oldest}
                <CalendarIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'improvements' && (
            <div className="space-y-3">
              {user.improvements?.length > 0 ? (
                sortItems(user.improvements).map((improvement) => (
                  <Link
                    to="/improved"
                    state={{
                      response_text: improvement.ai_improvements ? improvement.ai_improvements : null,
                      response_json: improvement.improvements_list ? improvement.improvements_list : null,
                      job_title: improvement.job_title,
                    }}
                    className="block no-underline group"
                    key={improvement.id}
                  >
                    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group-hover:ring-2 group-hover:ring-blue-200">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {improvement.job_title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {improvement.job_description}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-xs text-gray-500 flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {formatDate(improvement.createdAt)}
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
                    </div>
                  </Link>
                ))
              ) : (
                <div className="bg-white p-8 rounded-lg text-center">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="text-gray-500 mt-4">{labels.dashboardPage.noImprovements}</p>
                  <Link
                    to="/resume"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {labels.dashboardPage.noImprovements}
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'creations' && (
            <div className="space-y-3">
              {user.creations?.filter(c => c.status === "created").length > 0 ? (
                sortItems(user.creations.filter(c => c.status === "created")).map((draft) => (
                  <Link
                    to="/preview-resume"
                    state={{ idCreation: draft.id }}
                    className="block no-underline group"
                    key={draft.id}
                  >
                    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group-hover:ring-2 group-hover:ring-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <RoundedATSIndicador score={draft.ats?.ats_score || 0} size="md" className={"w-10 h-10"} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {draft.job_title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {draft.job_description}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500 flex items-center justify-end">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {formatDate(draft.createdAt)}
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
                  </Link>
                ))
              ) : (
                <div className="bg-white p-8 rounded-lg text-center">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="text-gray-500 mt-4">{labels.dashboardPage.noCreations}</p>
                  <Link
                    to="/create-resume"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {labels.dashboardPage.noCreations}
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'drafts' && (
            <div className="space-y-3">
              {user.creations?.filter(c => c.status === "draft").length > 0 ? (
                sortItems(user.creations.filter(c => c.status === "draft")).map((draft) => (
                  <Link
                    to="/create-resume"
                    state={{ isOptimizedDraft: true, item: draft }}
                    className="block no-underline group"
                    key={draft.id}
                  >
                    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group-hover:ring-2 group-hover:ring-blue-200">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {draft.job_title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {draft.job_description}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500 flex items-center justify-end">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {formatDate(draft.createdAt)}
                          </span>
                          <span
                            className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${draft.status === "draft"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {draft.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="bg-white p-8 rounded-lg text-center">
                  <ClockIcon className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="text-gray-500 mt-4">{labels.dashboardPage.noDrafts}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <SparklesIcon className="h-5 w-5 text-blue-500 mr-2" />
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