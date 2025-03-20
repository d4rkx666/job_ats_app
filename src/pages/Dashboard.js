import {useAuth} from "../contexts/AuthContext"
import { useConfig } from "../contexts/ConfigContext";
import FeedbackForm from "../components/forms/FeedbackForm"
import {feedback} from "../services/SetFeedback"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


function Dashboard() {

  // Language
  const {config, language} = useConfig();
  const labels = config.labels[language];

  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  console.log(auth.verified);

  useEffect (()=>{
    if(auth.user.feedback){
      setSubmitted(true);
    }
    
  },[]);

  // Feedback actions
  const handleFeedback = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      await feedback(data.rate, data.feedback);
      setSubmitted(true);
    } catch (error) {
      console.log(error)
      setError(labels.error.universalError);
    } finally {
       setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      
      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {labels.dashboardPage.welcome} {auth.user.name}!
        </h1>
        <p className="text-lg text-gray-600">{labels.dashboardPage.subWelcome}</p>
      </div>

      {/* Improvements Left */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          {labels.dashboardPage.improvementsLeft}
        </h2>
        <p className="text-6xl font-bold text-blue-600">{auth.user.settings.maximumImprovements - auth.user.settings.resumeImprovements}</p>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

      {/* List of improvements */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {labels.dashboardPage.previousImprovements}
        </h2>
        <div className="space-y-4">
          {auth.user.improvements?.map((improvement) => (
            <Link
              to="/improved"
              state={{ response_text: improvement.ai_improvements }}
              className="text-white no-underline"
              key={improvement.id} // Ensure the key is on the outermost element
            >
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {improvement.job_title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {improvement.job_description}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm text-gray-500">
                      {(() => {
                        const createdAt = improvement.createdAt;
                        const jsDate = new Date(
                          createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
                        );
                        return <>{jsDate.toLocaleDateString()}</>;
                      })()}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        improvement.status === "completed"
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
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

      {/* Feedback Form */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <FeedbackForm onSubmit={handleFeedback} isLoading={isLoading} submitted={submitted} labels={labels}/>
    </div>
  );
}

export default Dashboard;