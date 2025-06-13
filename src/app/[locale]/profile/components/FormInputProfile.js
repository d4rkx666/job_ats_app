import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const FormInput = ({ 
  name, 
  label, 
  type = "text", 
  placeholder, 
  rules, 
  register, 
  errors, 
  handlePersonalDataBlur, 
  recentlySaved, 
  autoSaving, 
  errorAutoSaved, 
  autoSave = false 
}) => {
  // Extract the field name from nested paths (e.g., "personalData.email" -> "email")
  const fieldName = name.split('.').pop();
  
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          {...register(name, rules)}
          type={type}
          placeholder={placeholder}
          onBlur={autoSave ? () => handlePersonalDataBlur(fieldName) : undefined}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
            errors.personalData?.[fieldName] ? "border-red-500" : "border-gray-300"
          } ${
            recentlySaved === fieldName ? "ring-2 ring-green-500" : ""
          }`}
        />
        {autoSaving === fieldName && (
          <div className="absolute right-3 top-3 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )}
        {recentlySaved === fieldName && (
          <CheckIcon className="absolute right-3 top-3 h-5 w-5 text-green-500" />
        )}
        {errorAutoSaved === fieldName && (
          <XMarkIcon className="absolute right-3 top-3 h-5 w-5 text-red-500" />
        )}
      </div>
      {errors.personalData?.[fieldName] && (
        <p className="mt-1 text-sm text-red-600">{errors.personalData[fieldName].message}</p>
      )}
    </div>
  );
};

export default FormInput;