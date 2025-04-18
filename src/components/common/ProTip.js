import UpgradeProButton from "./UpgradeProButton"
const ProTip = ({text, labels})=>{
   return (
      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
         <p className="text-sm text-blue-800 mb-2">
            <span className="font-semibold">{labels.proLabel.proTip}:</span> {text}
         </p>
         <UpgradeProButton labels={labels}/>
      </div>
   )
}

export default ProTip