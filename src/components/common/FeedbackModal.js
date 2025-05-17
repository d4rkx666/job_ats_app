import FeedbackForm from "../forms/FeedbackForm";
import { useConfig } from "../../contexts/ConfigContext";
import { useState } from "react";
import { feedback } from "../../services/SetFeedback";

export default function FeedbackModal() {
   // language
   const { config, language } = useConfig();
   const labels = config.labels[language];

   const [isLoading, setIsLoading] = useState(false);
   const [submitted, setSubmitted] = useState(false);
   const [error, setError] = useState("");

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

   return (
      <div className="fixed w-lg inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
         <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 animate-fade-in">
            {/* Header */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <FeedbackForm
               onSubmit={handleFeedback}
               isLoading={isLoading}
               submitted={submitted}
               labels={labels}
            />
         </div>
      </div>
   )
}