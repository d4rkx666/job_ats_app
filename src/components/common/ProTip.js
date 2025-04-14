const ProTip = ({text})=>{
   return (
      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
         <p className="text-sm text-blue-800 mb-2">
            <span className="font-semibold">Pro Tip:</span> {text}
         </p>
         <button className="w-full mt-2 py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-md shadow-sm transition-all">
            Upgrade to Pro
         </button>
      </div>
   )
}

export default ProTip