const ProBadge = () => {

  return (
    <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
      PRO
    </span>
  );
};

const ProIco = ()=>{
  return(
    <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  )
}

const FreeBadge = () => {

  return (
    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
      FREE
    </span>
  );
};

const ProFeatureEnabled = ({featureText, labels}) =>{
  return(
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 flex items-center">
        <ProIco/>
        <span className="text-sm font-medium text-gray-800 ml-3">
          {labels.proLabel.proFeature} {featureText}
        </span>
    </div>
  )
}
export {ProBadge, FreeBadge, ProFeatureEnabled, ProIco};