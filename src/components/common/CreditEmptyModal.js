import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {useConfig} from "../../contexts/ConfigContext"
import { BoltIcon, ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline";

export function CreditEmptyModal() {
   const { user } = useAuth();
   const isPro = user.subscription?.plan === 'pro';

   // Language
  const { config, language } = useConfig();
  const labels = config.labels[language];
  
   return (
      (!isPro ?
         (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
               <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 animate-fade-in">
                  {/* Header */}
                  <div className="text-center mb-4">
                     <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <BoltIcon className="h-6 w-6 text-red-600" />
                     </div>
                     <h3 className="text-lg font-bold text-gray-900 mt-3">
                        {labels.creditEmptyModal.outOf}
                     </h3>
                     <p className="text-sm text-gray-500 mt-1">
                     {labels.creditEmptyModal.used} {user.usage.total_credits} {labels.creditEmptyModal.thisMonth}
                     </p>
                  </div>

                  {/* Progress Bar (Shows Usage) */}
                  <div className="mb-6">
                     <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{labels.creditEmptyModal.noCredits}</span>
                        <span>{user.usage.total_credits}/{user.usage.total_credits}</span>
                     </div>
                     <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                           className="bg-red-500 h-2 rounded-full"
                           style={{ width: '100%' }}
                        ></div>
                     </div>
                  </div>

                  {/* Upgrade Options */}
                  <div className="space-y-3">
                     <Link
                        to="/pro"
                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                     >
                        {labels.proLabel.upgradeToPro} (50 credits/month)
                     </Link>

                     <Link to="/dashboard" className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <ArrowPathIcon className="h-4 w-4 mr-2" />
                        {labels.creditEmptyModal.resetIn} {daysUntilReset()} {labels.creditEmptyModal.days}
                     </Link>
                  </div>

                  {/* Feature Comparison (Subtle Upsell) */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                     <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                     {labels.proLabel.proUnlocks}
                     </h4>
                     <ul className="mt-2 space-y-1">
                        <li className="flex items-center">
                           <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                           <span className="text-sm">{labels.creditEmptyModal.poweredAIKWExtraction}</span>
                        </li>
                        <li className="flex items-center">
                           <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                           <span className="text-sm">{labels.creditEmptyModal.moreCredits}</span>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         ) : (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
               <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                  {/* Header */}
                  <div className="text-center mb-4">
                     <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full 'bg-purple-100`}>
                        <BoltIcon className={`h-6 w-6 text-purple-600`} />
                     </div>
                     <h3 className="text-lg font-bold text-gray-900 mt-3">
                        {isPro ? "Need More Credits?" : "Out of Credits!"}
                     </h3>
                     <p className="text-sm text-gray-500 mt-1">
                        {labels.creditEmptyModal.proUsed} 50 {labels.creditEmptyModal.proThisMonth}
                     </p>
                  </div>

                  {/* Pro-Specific CTA */}
                  <div className="space-y-3">
                     <Link
                        to="/billing"
                        className="block text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md font-medium"
                     >
                        {labels.proLabel.buyExtraCredits}
                     </Link>
                     <p className="text-xs text-gray-500 text-center">
                        {labels.creditEmptyModal.resetIn} {daysUntilReset()} {labels.creditEmptyModal.days}
                     </p>
                  </div>
               </div>
            </div>
         )
      )
   );

   // Helper: Days until credit reset
   function daysUntilReset() {
      const nextReset = new Date(user.usage.next_reset?.toDate());
      const today = new Date();
      return Math.ceil((nextReset - today) / (1000 * 60 * 60 * 24));
   }
}