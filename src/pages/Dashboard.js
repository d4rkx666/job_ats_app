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
        <p className="text-6xl font-bold text-blue-600">{auth.user.maximumImprovements - auth.user.resumeImprovements}</p>
      </div>

      {/* List of improvements */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Improvements</h2>
      </div>

      {/* Feedback Form */}
      <FeedbackForm/>
    </div>
  );
}

export default Dashboard;