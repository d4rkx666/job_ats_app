import { useTranslations } from "next-intl"
import UpgradeProButton from "./UpgradeProButton"
export const UpgradeProKeywords = ({keywords}) => {
  // Translation
  const p = useTranslations("proLabel");
  const k = useTranslations("keywordList");

  return (
    <div className="mt-6 mb-6 space-y-4">
      {/* Pro Value Highlight */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-xl p-5">
        <div className="flex items-start">
          <div className="flex-shrink-0 p-2 bg-purple-100 rounded-lg">
            <svg className="h-6 w-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{p("unlockFullKwAnalysis")}</h3>
            <p className="mt-1 text-sm text-gray-600">
              {k("freeUsersSee")} {keywords.filter(kw => ['hard_skill', 'soft_skill'].includes(kw.type)).length} {k("freeUsersSeeKw")}. {k("proMembersGet")} <span className="font-semibold">+{
                keywords.filter(kw => ['tool', 'certification'].includes(kw.type)).length
              } {k("proMembersGetMore")} </span> {k("proMembersGetIncluding")}:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {keywords
                .filter(k => ['tool', 'certification'].includes(k.type))
                .slice(0, 3) // Show top 3 as teaser
                .map((keyword, i) => (
                  <span key={`pro-key-${i}`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {keyword.keyword}
                    {keyword.count > 1 && <span className="ml-1">({keyword.count}x)</span>}
                  </span>
                ))}
              {keywords.filter(k => ['tool', 'certification'].includes(k.type)).length > 3 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  +{keywords.filter(k => ['tool', 'certification'].includes(k.type)).length - 3} more
                </span>
              )}
            </div>
            <div className="mt-4">
              <UpgradeProButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}