import { useRouter } from "next/navigation";
import { useTranslations } from "use-intl";

const UpgradeProButton = ()=>{
   // Translation
   const t = useTranslations("proLabel");
   const router = useRouter();
   const handleOnClick = ()=>{
      router.push("/pricing");
   }
   return (
      <button
         type="button"
         onClick={handleOnClick}
         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
         {t("upgradeToPro")}
         <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
         <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
         </svg>
      </button>
   )
}

export default UpgradeProButton