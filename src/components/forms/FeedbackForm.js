import React, {useState} from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../common/SubmitButton"

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
        {labels.formFeedback.title}
      </h2>
      {submitted ? (
        <p className="text-green-600 text-lg">{labels.formFeedback.titleSubmitted}</p>
      ) : (

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Rating */}
        <div className="mb-6">
          <label className="block text-lg text-gray-700 mb-2">
            {labels.formFeedback.titleRate}
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
            {labels.formFeedback.titleSuggestions}
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
            placeholder={labels.formFeedback.placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            maxLength={200}
          />
          {errors.feedback && (
            <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <SubmitButton
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        loading={isLoading}
        loadingLabel={labels.formFeedback.btnLoading}
        label={labels.formFeedback.btn} />
      </form>)}
    </div>
  );
}

export default FeedbackForm;