import React from "react";
import { useConfig } from "../contexts/ConfigContext";
import { useNavigate } from "react-router-dom";


function Home() {
  const { config, language } = useConfig();
  const labels = config.labels[language];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/resume"); // Redirect to resume
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            {labels.home.header.title}
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            {labels.home.header.subtitle}
          </p>
          <button onClick={handleClick} className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-50 transition duration-300">
            {labels.home.getStartedBtn}
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          {labels.home.chooseUs.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-blue-600 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {labels.home.chooseUs.cardOne.title}
            </h3>
            <p className="text-gray-600">
              {labels.home.chooseUs.cardOne.body}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-blue-600 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {labels.home.chooseUs.cardTwo.title}
            </h3>
            <p className="text-gray-600">
              {labels.home.chooseUs.cardTwo.body}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-blue-600 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {labels.home.chooseUs.cardThree.title}
            </h3>
            <p className="text-gray-600">
              {labels.home.chooseUs.cardThree.body}
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {labels.home.footer.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {labels.home.footer.subtitle}
          </p>
          <button onClick={handleClick} className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-50 transition duration-300">
            {labels.home.getStartedBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;