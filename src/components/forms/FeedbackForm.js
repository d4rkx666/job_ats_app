import React, {useState} from "react";
import { useForm } from "react-hook-form";

function FeedbackForm({ onSubmit, isLoading, submitted, labels}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  
  const [rating, setRating] = useState(0);

  const ratting = (e, star) => {
    e.preventDefault();
    setValue("rate", star);
    setRating(star);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Your Feedback
      </h2>
      {submitted ? (
        <p className="text-green-600 text-lg">Thank you for your feedback!</p>
      ) : (

      <form onSubmit={handleSubmit(onSubmit)}>
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
                onClick={(e) => ratting(e, star)}
              >
                ★
              </button>
            ))}
          </div>
          {errors.rate && (
            <p className="text-red-500 text-sm mt-1">{errors.rate.message}</p>
          )}
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 mb-2">
            Any comments or suggestions?
          </label>
          <input
            type="hidden"
            id="rate"
            {...register("rate", { required: "Required" })}
          >
          </input>
          <textarea
            id="feedback"
            {...register("feedback", { required: "Required" })}
            placeholder="We'd love to hear from you!"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          {errors.feedback && (
            <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isLoading ? "Sending feedback..." : "Send feedback"}
        </button>
      </form>)}
    </div>
  );
}

export default FeedbackForm;