

const PriceTable = ({labels, currentPlan, plan, hadleOnClick, isLoading}) => {

  return (
    <div className="order-2 md:order-1 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Badge section */}
      <div className="flex flex-col items-center p-6">

        {/* Product details */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800">{plan.name}</h2>
          <p className="text-gray-500 mt-2 text-sm">
            {plan.description}
          </p>
        </div>

        {/* Price and button */}
        <div className="w-full mt-6">
          <div className="text-center">
            <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
            <p className="text-gray-500 text-sm">{plan.recurrent}</p>
          </div>
          
            <button onClick={hadleOnClick} disabled={currentPlan || isLoading} className="w-full mt-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition disabled:bg-purple-300">
              {isLoading ? plan.ctaLoading : currentPlan ? labels.pricingPage.currentPlan : plan.cta}
            </button>
        </div>

        {/* Features list */}
        <div className="w-full mt-6 text-left">
          <p className="font-semibold text-gray-700">{labels.pricingPage.includes}</p>
          <ul className="mt-2 space-y-2">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center">
                {feature.included ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 size-3 mr-3" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                  </svg>
                ):(
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 size-3 mr-3" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="text-sm text-gray-600">{feature.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PriceTable;