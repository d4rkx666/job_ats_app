import { useTranslations } from "next-intl"
import UpgradeProButton from "./UpgradeProButton"
const ProTip = ({text})=>{
   const t = useTranslations("proLabel");
   return (
      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
         <p className="text-sm text-blue-800 mb-2">
            <span className="font-semibold">{t("proTip")}:</span> {text}
         </p>
         <UpgradeProButton/>
      </div>
   )
}

export default ProTip