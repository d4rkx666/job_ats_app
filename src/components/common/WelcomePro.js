const WelcomePro = ({labels}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <div className="mb-6">
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
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{labels.welcomePro.welcome}</h1>
        <p className="text-gray-600 mb-6">
          {labels.welcomePro.text}
        </p>
        <p className="text-sm text-gray-500">
          {labels.welcomePro.redirecting}
        </p>
      </div>
    </div>
  );
};

export default WelcomePro;