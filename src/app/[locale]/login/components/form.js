"use client"
import React from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "@/app/components/common/SubmitButton";
import { useTranslations } from "use-intl";
import Link from "next/link";

function LoginForm({ onSubmit, isLoading }) {
   const t = useTranslations("formLogin")
   const v = useTranslations("formPatternValidation")

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
               {t("email.label")}
            </label>
            <input
               type="email"
               id="email"
               placeholder={t("email.placeholder")}
               {...register("email", {
                  required: t("email.required"),
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
               placeholder={t("password.placeholder")}
               {...register("password", { required: t("password.required") })}
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
         </div>

         <SubmitButton className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" loading={isLoading} loadingLabel={t("loginBtn.loading")} label={t("loginBtn.label")} />

         <p className="text-center text-sm text-gray-600">
            <button
               type="button"
               className="text-blue-600 hover:underline"
            >
               {t("forgotPassword")}
            </button>
         </p>
         <p className="text-center text-sm text-gray-600">
            <Link href="/signup"
               type="button"
               className="text-blue-600 hover:underline"
            >
               {t("signUpHere")}
            </Link>
         </p>
      </form>
   );
}

export default LoginForm;