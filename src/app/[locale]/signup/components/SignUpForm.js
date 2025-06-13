"use client"
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import SubmitButton from "@/app/components/common/SubmitButton";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/app/contexts/AuthContext";

function SignUpForm({ onSubmit, isLoading}) {
  const {system} = useAuth();
  const locale = useLocale();

  // Translations
  const t = useTranslations("formSignup");
  const v = useTranslations("formPatternValidation");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all"
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {t("name.label")}
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: t("name.required") })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          {t("country.label")}
        </label>
        <select
          id="country"
          {...register("country", { required: t("country.required") })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" defaultValue disabled>{t("country.placeholder")}</option>
          {system.countries[locale].map((c,i) => (
            <option key={i} value={c.code}>{c.name}</option>
          ))}
        </select>
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t("email.label")}
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: t("email.required"),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: v("email"),
            },
           })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          {t("password.label")}
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: t("password.required") })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <SubmitButton className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" loading={isLoading} loadingLabel={t("signupBtn.loading")} label={t("signupBtn.label")} />

      <p className="text-center text-sm text-gray-600">
        <Link href="/login"
          type="button"
          className="text-blue-600 hover:underline"
        >
          { t("loginHere") }
        </Link>
      </p>
    </form>
  );
}

export default SignUpForm;