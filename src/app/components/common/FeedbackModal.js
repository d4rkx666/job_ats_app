import FeedbackForm from "./FeedbackForm";
import { useState } from "react";
import { feedback } from "@/app/hooks/SetFeedback";
import { useTranslations } from "next-intl";

export default function FeedbackModal() {
   // language
   const t = useTranslations("");

   const [isLoading, setIsLoading] = useState(false);
   const [submitted, setSubmitted] = useState(false);
   const [error, setError] = useState("error");

   const handleFeedback = async (data) => {
      setIsLoading(true);
      setError("");
      try {
         await feedback(data.rate, data.feedback);
         setSubmitted(true);
      } catch (err) {
         if (err.response?.data?.detail === "403: Email not verified") {
            setError(t("userNotVerified"));
         } else {
            setError(t("universalError"));
         }
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="fixed w-lg inset-0 bg-black/50 flex items-center justify-center z-30">
         <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 animate-fade-in">
            {/* Header */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <FeedbackForm
               onSubmit={handleFeedback}
               isLoading={isLoading}
               submitted={submitted}
            />
         </div>
      </div>
   )
}