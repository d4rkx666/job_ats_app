import {useAuth} from "../contexts/AuthContext"
import FeedbackForm from "../components/forms/FeedbackForm"
import { Link } from "react-router-dom";


function Dashboard() {

  const auth = useAuth();
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      
      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome {auth.user.name}!
        </h1>
        <p className="text-lg text-gray-600">We're glad to have you here.</p>
      </div>

      {/* Improvements Left */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Resume Improvements Left
        </h2>
        <p className="text-6xl font-bold text-blue-600">{auth.user.settings.maximumImprovements - auth.user.settings.resumeImprovements}</p>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

      {/* List of improvements */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Previous Improvements
        </h2>
        <div className="space-y-4">
          {auth.user.improvements.map((improvement) => (
            <Link to="/improved" state={{ response_text: improvement.ai_improvements }} className="text-white no-underline">
              <div
                key={improvement.id}
                className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {improvement.job_title}
                    </h3>
                    <p className="text-sm text-gray-600">{improvement.job_description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                    {
                      (() => {
                        const createdAt = improvement.createdAt;
                        const jsDate = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000);

                        return(
                          <>
                            {jsDate.toLocaleDateString()}
                          </>
                        )
                      })()
                    }
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        improvement.status === "Completed"
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
      <FeedbackForm/>
    </div>
  );
}

export default Dashboard;