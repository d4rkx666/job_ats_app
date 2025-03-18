import React from "react";
import { useForm } from "react-hook-form";

function LoginForm({ onSubmit, onSwitchToSignUp, isLoading, labels}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {labels.form_login.email.label}
        </label>
        <input
          type="email"
          id="email"
          placeholder={ labels.form_login.email.placeholder }
          {...register("email", { required: labels.form_login.email.required })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          {labels.form_login.password.label}
        </label>
        <input
          type="password"
          id="password"
          placeholder={ labels.form_login.password.placeholder }
          {...register("password", { required: labels.form_login.password.required })}
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
        {isLoading ? labels.form_login.login_btn.loading : labels.form_login.login_btn.label}
      </button>

      <p className="text-center text-sm text-gray-600">
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-blue-600 hover:underline"
        >
          Forgot Password?
        </button>
      </p>
      <p className="text-center text-sm text-gray-600">
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-blue-600 hover:underline"
        >
          Sign Up Here
        </button>
      </p>
    </form>
  );
}

export default LoginForm;