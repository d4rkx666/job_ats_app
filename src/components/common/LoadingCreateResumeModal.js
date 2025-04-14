import { useEffect, useState } from 'react';

const LoadingCreateResumeModal = ({ progress, currentStep, elapsedTime, labels }) => {
  const [progressWidth, setProgressWidth] = useState('0%');
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Animation for smooth progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(`${progress}%`);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  const steps = [
    labels.createResumePage.modalLoading.step1.title,
    labels.createResumePage.modalLoading.step2.title,
    labels.createResumePage.modalLoading.step3.title,
    labels.createResumePage.modalLoading.step4.title,
    labels.createResumePage.modalLoading.step5.title,
    labels.createResumePage.modalLoading.step6.title,
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm"></div>
        </div>

        {/* Modal container */}
        <div className="inline-block align-bottom bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-6 py-8 sm:px-8 sm:pb-10 sm:pt-8">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {labels.createResumePage.modalLoading.title}
                </h3>
                <p className="mt-1 text-sm text-blue-300">
                  {labels.createResumePage.modalLoading.subtitle}
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 bg-opacity-20">
                <svg className="w-6 h-6 text-blue-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
            </div>

            {/* Add this timer display near the progress bar */}
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>{labels.createResumePage.modalLoading.progress}</span>
              <div className="flex space-x-4">
                <span>{progress}%</span>
                <span className="text-blue-300">Time: {formatTime(elapsedTime)}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-8">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>{labels.createResumePage.modalLoading.progress}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: progressWidth }}
                ></div>
              </div>
            </div>

            {/* Current step indicator */}
            <div className="mt-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">
                    {steps[currentStep - 1] || steps[0]}
                  </p>
                  <p className="text-xs text-gray-400">
                  {labels.createResumePage.modalLoading.step} {currentStep} {labels.createResumePage.modalLoading.stepOf} {steps.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Animated loading graphic */}
            <div className="mt-8 flex justify-center">
              <div className="relative w-32 h-32">
                {/* Outer circle */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-opacity-20 animate-spin-slow"></div>
                
                {/* Middle circle */}
                <div className="absolute inset-4 rounded-full border-4 border-blue-400 border-opacity-30 animate-spin-medium"></div>
                
                {/* Inner circle */}
                <div className="absolute inset-8 rounded-full border-4 border-blue-300 border-opacity-40 animate-spin-fast"></div>
                
                {/* Center icon */}
                <div className="absolute inset-12 flex items-center justify-center rounded-full bg-blue-600">
                  <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-yellow-300">{labels.proLabel.proTip}</h4>
                  <p className="mt-1 text-xs text-gray-300">
                    {labels.createResumePage.modalLoading.proTipInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCreateResumeModal;