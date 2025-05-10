import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Aboard!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your plan has been successfully activated.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to your dashboard...
        </p>
      </div>
    </div>
  );
};

export default WelcomePro;