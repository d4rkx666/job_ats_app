import { ProBadge, ProFeatureEnabled } from "./Badge";
export const KeywordList = ({isPro, keywords, labels, profile = false}) => {

   const KeywordPill = ({ keyword, variant = 'primary', showCount = false }) => {
      const variants = {
         primary: `${keyword.matched ? "bg-blue-200" : "bg-blue-50"} text-blue-800 border-blue-100`,
         success: `${keyword.matched ? "bg-green-200" : "bg-green-50"} text-green-800 border-green-100`,
         purple: `${keyword.matched ? "bg-purple-200" : "bg-purple-50"} text-purple-800 border-purple-100`,
         warning: `${keyword.matched ? "bg-yellow-200" : "bg-yellow-50"} text-yellow-800 border-yellow-100`
      };

      return (
         <div className="relative group">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${variants[variant]}`}>
               {keyword.keyword}
               {showCount && keyword.count > 1 && (
                  <span className={`ml-1 text-xs font-medium rounded-full px-1.5 py-0.5 ${variant === 'primary' ? 'bg-blue-300 text-blue-700' :
                        variant === 'success' ? 'bg-green-300 text-green-700' :
                           'bg-yellow-300 text-yellow-700'
                     }`}>
                     {keyword.count}
                  </span>
               )}
            </span>
            {showCount && (
               <div className="absolute z-10 hidden group-hover:block bottom-full mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded whitespace-nowrap">
                  {labels.keywordList.appears} {keyword.count} {labels.keywordList.time}
               </div>
            )}
         </div>
      );
   };

   return (
      <div className="space-y-8">
         {/* Premium Features Badge */}
         {isPro && (
            <ProFeatureEnabled labels={labels} featureText={labels.keywordList.proEnabled}/>
         )}

         {/* Keyword Categories */}
         <div className="space-y-6">
            {/* Hard Skills */}
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-xs">
               <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex items-center">
                  <svg className="h-5 w-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <h3 className="font-medium text-gray-800">{labels.keywordList.coreRequirements}</h3>
                  <span className="ml-auto text-xs font-medium bg-blue-600 text-white px-2 py-0.5 rounded-full">
                  {labels.keywordList.mustInclude}
                  </span>
               </div>
               <div className="p-5">
                  {keywords.filter(k => k.type === 'hard_skill').length > 0 ? (
                     <div className="flex flex-wrap gap-3">
                        {keywords.filter(k => k.type === 'hard_skill').map((keyword, i) => (
                           <KeywordPill
                              key={`hard-${i}`}
                              keyword={keyword}
                              variant="primary"
                              showCount={isPro} // Only show count for Pro users
                           />
                        ))}
                     </div>
                  ) : (
                     <p className="text-sm text-gray-500 italic">{labels.keywordList.noHardSkills}</p>
                  )}
               </div>
            </div>

            {/* Tools & Technologies (Pro-only) */}
            {isPro && (
               <div className="border border-gray-100 rounded-xl overflow-hidden shadow-xs">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex items-center">
                     <svg className="h-5 w-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                     </svg>
                     <h3 className="font-medium text-gray-800">{labels.keywordList.toolsAndTech}</h3>
                     <ProBadge className="ml-auto" size="xs" />
                  </div>
                  <div className="p-5">
                     {keywords.filter(k => k.type === 'tool').length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                           {keywords.filter(k => k.type === 'tool').map((keyword, i) => (
                              <KeywordPill
                                 key={`tool-${i}`}
                                 keyword={keyword}
                                 variant="success"
                                 showCount
                              />
                           ))}
                        </div>
                     ) : (
                        <p className="text-sm text-gray-500 italic">{labels.keywordList.noTools}</p>
                     )}
                  </div>
               </div>
            )}

            {/* Soft Skills */}
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-xs">
               <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex items-center">
                  <svg className="h-5 w-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h3 className="font-medium text-gray-800">{labels.keywordList.softSkills}</h3>
               </div>
               <div className="p-5">
                  {keywords.filter(k => k.type === 'soft_skill').length > 0 ? (
                     <div className="flex flex-wrap gap-3">
                        {keywords.filter(k => k.type === 'soft_skill').map((keyword, i) => (
                           <KeywordPill
                              key={`soft-${i}`}
                              keyword={keyword}
                              variant="purple"
                           />
                        ))}
                     </div>
                  ) : (
                     <p className="text-sm text-gray-500 italic">{labels.keywordList.noSoftSkills}</p>
                  )}
               </div>
            </div>

            {/* Certifications (Pro-only) */}
            {isPro && keywords.filter(k => k.type === 'certification').length > 0 && (
               <div className="border border-gray-100 rounded-xl overflow-hidden shadow-xs">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex items-center">
                     <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     <h3 className="font-medium text-gray-800">{labels.keywordList.certs}</h3>
                     <ProBadge className="ml-auto" size="xs" />
                  </div>
                  <div className="p-5">
                     <div className="flex flex-wrap gap-3">
                        {keywords.filter(k => k.type === 'certification').map((keyword, i) => (
                           <KeywordPill
                              key={`cert-${i}`}
                              keyword={keyword}
                              variant="warning"
                           />
                        ))}
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}