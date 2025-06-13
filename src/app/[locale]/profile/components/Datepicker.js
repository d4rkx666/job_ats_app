import { Controller } from "react-hook-form";

const MonthYearPicker = ({ control, name, label, disabled,required = false }) => {
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString('default', { month: 'long' })
  }));
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 60 }, (_, i) => currentYear - i);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label} is required` : false,
        validate: (value) => {
          if (!required) return true;
          return (value?.month && value?.year) || 'Both month and year are required';
        }
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        // Parse current value (expecting format: { month: number, year: number } or undefined)
        const currentDate = value || { month: null, year: null };
        
        const handleMonthChange = (e) => {
          onChange({
            ...currentDate,
            month: parseInt(e.target.value)
          });
        };
        
        const handleYearChange = (e) => {
          onChange({
            ...currentDate,
            year: parseInt(e.target.value)
          });
        };

        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  value={currentDate.month || ''}
                  onChange={handleMonthChange}
                  disabled={disabled}
                  className={`w-full p-2 border rounded-md ${ error?.message ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Month</option>
                  {months.map((month, i) => (
                    <option key={i} value={month.value}>{month.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={currentDate.year || ''}
                  onChange={handleYearChange}
                  disabled={disabled}
                  className={`w-full p-2 border rounded-md ${ error?.message ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default MonthYearPicker;