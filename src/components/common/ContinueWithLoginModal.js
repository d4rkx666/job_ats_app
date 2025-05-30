import { Link } from "react-router-dom";
import { useConfig } from "../../contexts/ConfigContext"

export function ContinueWithLoginModal({ user, verified, count}) {

   // Language
   const { config, language } = useConfig();
   const labels = config.labels[language];

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
         <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 animate-fade-in" >
            <div className="text-center p-8 max-w-md mx-auto bg-white ">
               <div className="mb-1">
                  {!user ? (
                     <svg
                        className="w-16 h-16 mx-auto text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                     </svg>
                  ) : (
                     <svg
                        className="w-16 h-16 mx-auto text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M5 13l4 4L19 7"
                        />
                     </svg>
                  )}

               </div>
               {!user ? (
                  <>
                     <h1 className="text-2xl font-bold text-gray-800 mb-2">{labels.continueLoginModal.noUserTitle}</h1>
                     <p className="text-gray-600 mb-6">
                        <b>{labels.continueLoginModal.doNotCloseWindow}</b> {labels.continueLoginModal.noUserSubtitle}
                     </p>
                     <p className="text-sm text-gray-500">
                        {labels.continueLoginModal.please} <Link className="text-blue-700" to="/signup?current_work=true" target="_blank">{labels.continueLoginModal.signUp}</Link> {labels.continueLoginModal.or} <Link className="text-blue-700" to="/login?current_work=true" target="_blank">{labels.continueLoginModal.login}</Link> {labels.continueLoginModal.continue}
                     </p>
                  </>
               ):(
                  <>
                     <h1 className="text-2xl font-bold text-gray-800 mb-2">{verified ? labels.continueLoginModal.userVerified : labels.continueLoginModal.notVerified}</h1>
                     <p className="text-gray-600 mb-6">
                        {verified ? labels.continueLoginModal.titleVerified : labels.continueLoginModal.titleNotVerified}
                     </p>
                     <p className="text-sm text-gray-500">
                        {verified && `${labels.continueLoginModal.closingModal} ${count} ${labels.continueLoginModal.seconds}`}
                     </p>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}