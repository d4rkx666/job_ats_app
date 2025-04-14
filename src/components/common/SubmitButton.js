function SubmitButton({ className, label, loading, loadingLabel, type="submit", onClick = null, cost = null }) {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={()=> onClick !== null ? onClick() : ""}
      className={`
        relative
        flex items-center justify-center
        px-4 py-2
        text-sm font-medium text-white
        rounded-md
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${className}
        ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }
      `}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {loadingLabel}
        </span>
      ) : (
        <>
          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {label}
          {cost && (
            <span className="ml-1.5 px-1.5 py-0.5 text-xs font-medium bg-blue-800 bg-opacity-60 rounded">
              {cost}
            </span>
          )}
        </>
      )}
    </button>
  );
}

export default SubmitButton;