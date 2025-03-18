import React, {useState} from "react";
import { useForm } from "react-hook-form";

function FeedbackForm({ onSubmit, isLoading, onSwitchToLogin, labels}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // Simulate feedback submission
    console.log("Feedback submitted:", { feedback, rating });
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Your Feedback
      </h2>
      {submitted ? (
        <p className="text-green-600 text-lg">Thank you for your feedback!</p>
      ) : (

      <form onSubmit={handleSubmitFeedback}>
        {/* Rating */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 mb-2">
            How would you rate your experience?
          </label>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`text-3xl ${
                  rating >= star ? "text-yellow-400" : "text-gray-300"
                } hover:text-yellow-500 focus:outline-none`}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 mb-2">
            Any comments or suggestions?
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="We'd love to hear from you!"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Feedback
        </button>
      </form>)}
    </div>
  );
}

export default FeedbackForm;