import React from "react";
import { useForm } from "react-hook-form";

function LoginForm({ onSubmit, isLoading, onSwitchToLogin, labels}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {labels.form_signup.name.label}
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: labels.form_signup.name.required })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          {labels.form_signup.country.label}
        </label>
        <select
          id="country"
          {...register("country", { required: labels.form_signup.country.required })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" selected disabled>{labels.form_signup.country.placeholder}</option>
          {labels.form_signup.country.countries.map((c) => (
            <option value={c.value}>{c.label}</option>
          ))}
        </select>
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {labels.form_signup.email.label}
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: labels.form_signup.email.required })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          {labels.form_signup.password.label}
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: labels.form_signup.password.required })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isLoading ? labels.form_signup.signup_btn.loading : labels.form_signup.signup_btn.label}
      </button>

      <p className="text-center text-sm text-gray-600">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-600 hover:underline"
        >
          Login Here
        </button>
      </p>
    </form>
  );
}

export default LoginForm;