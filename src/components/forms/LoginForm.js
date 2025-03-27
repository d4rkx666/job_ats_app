import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function LoginForm({ onSubmit, isLoading, labels}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {labels.formLogin.email.label}
        </label>
        <input
          type="email"
          id="email"
          placeholder={ labels.formLogin.email.placeholder }
          {...register("email", {
            required: labels.formLogin.email.required,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
          }, })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          {labels.formLogin.password.label}
        </label>
        <input
          type="password"
          id="password"
          placeholder={ labels.formLogin.password.placeholder }
          {...register("password", { required: labels.formLogin.password.required })}
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
        {isLoading ? labels.formLogin.loginBtn.loading : labels.formLogin.loginBtn.label}
      </button>

      <p className="text-center text-sm text-gray-600">
        <button
          type="button"
          className="text-blue-600 hover:underline"
        >
          {labels.formLogin.forgotPassword}
        </button>
      </p>
      <p className="text-center text-sm text-gray-600">
        <Link to="/signup"
          type="button"
          className="text-blue-600 hover:underline"
        >
          {labels.formLogin.signUpHere}
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;