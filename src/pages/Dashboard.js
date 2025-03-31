import { useAuth } from "../contexts/AuthContext"
import { useConfig } from "../contexts/ConfigContext";
import FeedbackForm from "../components/forms/FeedbackForm"
import { feedback } from "../services/SetFeedback"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const { config, language } = useConfig();
  const labels = config.labels[language];
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('improvements'); // 'improvements' or 'drafts'

  useEffect(() => {
    if (auth.user.feedback) {
      setSubmitted(true);
    }
    console.log(auth.user.draft)
  }, [auth.user.feedback]);

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

  // Calculate counts left
  const improvementsLeft = auth.user.settings.maximumImprovements - auth.user.settings.resumeImprovements;
  const creationsLeft = auth.user.settings.maximumCreations - (auth.user.settings.resumeCreations ?? 0);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {labels.dashboardPage.welcome}, <span className="text-blue-600">{auth.user.name}</span>!
        </h1>
        <p className="text-gray-600 mt-2">{labels.dashboardPage.subWelcome}</p>

        <div className="sm:space-x-5">
          {/* Improvements Counter */}
          <div className="mt-6 bg-blue-50 p-4 rounded-lg inline-block">
            <h2 className="text-sm font-medium text-gray-700 mb-1">
              {labels.dashboardPage.creationsLeft}
            </h2>
            <p className={`text-4xl font-bold ${improvementsLeft === 0 ? 'text-red-600' : 'text-blue-600'}`}>
              {improvementsLeft}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {labels.dashboardPage.outOf} {auth.user.settings.maximumImprovements}
            </p>
          </div>

          {/* Creations Counter */}
          <div className="mt-6 bg-blue-50 p-4 rounded-lg inline-block">
            <h2 className="text-sm font-medium text-gray-700 mb-1">
              {labels.dashboardPage.creationsLeft}
            </h2>
            <p className={`text-4xl font-bold ${creationsLeft === 0 ? 'text-red-600' : 'text-blue-600'}`}>
              {creationsLeft}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {labels.dashboardPage.outOf} {auth.user.settings.maximumCreations}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'improvements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('improvements')}
        >
          {labels.dashboardPage.previousImprovements}
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'drafts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('drafts')}
        >
          {labels.dashboardPage.drafts}
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'improvements' ? (
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
      ) : (
        <div className="space-y-6">
          {auth.user.creations?.length > 0 ? (
            <div className="space-y-3">
              {auth.user.creations.map((draft) => (
                (draft.status === "draft" &&
                <Link
                  to="/improved"
                  state={{ response_text: draft.job_title }}
                  className="block no-underline"
                  key={draft.id}
                >
                  <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-l-4 hover:border-l-blue-500">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                          {draft.job_title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {draft.job_description}
                        </p>
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