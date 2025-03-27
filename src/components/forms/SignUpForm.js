import React from "react";
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom"

function LoginForm({ onSubmit, isLoading, labels}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {labels.formSignup.name.label}
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: labels.formSignup.name.required })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          {labels.formSignup.country.label}
        </label>
        <select
          id="country"
          {...register("country", { required: labels.formSignup.country.required })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" selected disabled>{labels.formSignup.country.placeholder}</option>
          {labels.formSignup.country.countries.map((c) => (
            <option value={c.value}>{c.label}</option>
          ))}
        </select>
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {labels.formSignup.email.label}
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: labels.formSignup.email.required })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          {labels.formSignup.password.label}
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: labels.formSignup.password.required })}
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
        {isLoading ? labels.formSignup.signupBtn.loading : labels.formSignup.signupBtn.label}
      </button>

      <p className="text-center text-sm text-gray-600">
        <Link to="/login"
          type="button"
          className="text-blue-600 hover:underline"
        >
          { labels.formSignup.loginHere }
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;