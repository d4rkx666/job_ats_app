import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const CreateResumeForm = () => {
  const { register, handleSubmit, control, setValue, watch } = useForm();

  // Watch all form values (for debugging or auto-saving)
  const formValues = watch();

  // Auto-save function (simulate API call)
  const autoSave = (field, value) => {
    console.log(`Auto-saving ${field}:`, value);
    // Simulate API call or save to state management
  };

  // Handler for form submission (manual save)
  const onSubmit = (data) => {
    console.log('Form Data (Manual Save):', data);
    // Save data to backend or state management here
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information (Auto-Save on Blur) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <input
              {...register('name', {
                onBlur: (e) => autoSave('name', e.target.value),
              })}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
            />
            <input
              {...register('email', {
                onBlur: (e) => autoSave('email', e.target.value),
              })}
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            <input
              {...register('phone', {
                onBlur: (e) => autoSave('phone', e.target.value),
              })}
              type="tel"
              placeholder="Phone"
              className="w-full p-2 border rounded"
            />
            <input
              {...register('linkedin', {
                onBlur: (e) => autoSave('linkedin', e.target.value),
              })}
              type="url"
              placeholder="LinkedIn URL"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Skills (Save on Button Click) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <Controller
            name="skills"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {field.value.map((skill, index) => (
                    <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {skill}
                      <button
                        type="button"
                        onClick={() => {
                          const newSkills = field.value.filter((_, i) => i !== index);
                          setValue('skills', newSkills);
                        }}
                        className="ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a skill"
                  className="w-full p-2 border rounded mb-4"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const newSkill = e.target.value.trim();
                      if (newSkill && !field.value.includes(newSkill)) {
                        setValue('skills', [...field.value, newSkill]);
                        e.target.value = '';
                      }
                    }
                  }}
                />
              </div>
            )}
          />
        </div>

        {/* Education (Save on Button Click) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          <div className="space-y-4">
            <input
              {...register('education.institution')}
              placeholder="Institution"
              className="w-full p-2 border rounded"
            />
            <input
              {...register('education.degree')}
              placeholder="Degree"
              className="w-full p-2 border rounded"
            />
            <input
              {...register('education.graduationDate')}
              type="date"
              placeholder="Graduation Date"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Work History (Save on Button Click) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Work History</h2>
          <Controller
            name="jobs"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <div>
                {field.value.map((job, index) => (
                  <div key={index} className="mb-4">
                    <input
                      {...register(`jobs[${index}].title`)}
                      placeholder="Job Title"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <input
                      {...register(`jobs[${index}].company`)}
                      placeholder="Company"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <input
                      {...register(`jobs[${index}].dates`)}
                      placeholder="Dates"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <textarea
                      {...register(`jobs[${index}].responsibilities`)}
                      placeholder="Responsibilities"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setValue('jobs', [...field.value, { title: '', company: '', dates: '', responsibilities: '' }]);
                  }}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Job
                </button>
              </div>
            )}
          />
        </div>

        {/* Projects (Save on Button Click) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <Controller
            name="projects"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <div>
                {field.value.map((project, index) => (
                  <div key={index} className="mb-4">
                    <input
                      {...register(`projects[${index}].name`)}
                      placeholder="Project Name"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <textarea
                      {...register(`projects[${index}].description`)}
                      placeholder="Description"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <input
                      {...register(`projects[${index}].technologies`)}
                      placeholder="Technologies"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setValue('projects', [...field.value, { name: '', description: '', technologies: '' }]);
                  }}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Project
                </button>
              </div>
            )}
          />
        </div>

        {/* Submit Button (Manual Save) */}
        <button
          type="submit"
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded"
        >
          Save All
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;