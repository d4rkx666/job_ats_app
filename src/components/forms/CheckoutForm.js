import React from "react";
import { useForm } from "react-hook-form";
import {
  CreditCardIcon,
  UserIcon,
  CheckIcon,
  BanknotesIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import SubmitButton from "../common/SubmitButton"


const CheckoutForm = ({ handleOnSubmit, isFreeTrial = true, currentPlan, CardElement }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const paymentMethod = watch("paymentMethod", "stripe");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <h1 className="text-2xl font-bold">
            {isFreeTrial ? "Start Your Free Trial" : "Upgrade Your Plan"}
          </h1>
          <p className="text-purple-100 mt-1">
            {isFreeTrial 
              ? "No payment required now. Your card won't be charged until the trial ends."
              : "Get access to premium features immediately"}
          </p>
        </div>

        {/* Plan Summary */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-800">
              {isFreeTrial ? "Premium Trial" : "Premium Plan"}
            </h2>
            <span className="text-lg font-bold text-gray-900">
              {isFreeTrial ? "FREE for 14 days" : "$29.99/month"}
            </span>
          </div>
          {currentPlan && (
            <div className="text-sm text-gray-500 mb-2">
              Current plan: Pro Plan ($13/month)
            </div>
          )}
          <ul className="text-sm text-gray-600 space-y-1">
            <li className="flex items-center">
              <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
              Unlimited projects
            </li>
            <li className="flex items-center">
              <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
              Advanced analytics
            </li>
            <li className="flex items-center">
              <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
              Priority support
            </li>
          </ul>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit(handleOnSubmit)} className="p-6 space-y-6">
          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="radio"
                  id="stripe"
                  {...register("paymentMethod")}
                  value="stripe"
                  className="hidden peer"
                />
                <label
                  htmlFor="stripe"
                  className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "stripe"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="flex space-x-2">
                    <CreditCardIcon className="h-5 w-5 text-gray-700" />
                    <span>Credit Card</span>
                  </div>
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="paypal"
                  {...register("paymentMethod")}
                  value="paypal"
                  className="hidden peer"
                />
                <label
                  htmlFor="paypal"
                  className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "paypal"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="flex space-x-2">
                    <BanknotesIcon className="h-5 w-5 text-blue-600" />
                    <span>PayPal</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Credit Card Form (Conditional) */}
          {paymentMethod === "stripe" && (
            <div className="space-y-4">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Details
                </label>
                <div className="border border-gray-300 rounded-lg p-3">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                          fontFamily: 'Inter, system-ui, sans-serif',
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                      hidePostalCode: true,
                    }}
                  />
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    {...register("cardholderName", {
                      required: "Cardholder name is required",
                    })}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                {errors.cardholderName && (
                  <p className="mt-1 text-sm text-red-600">{errors.cardholderName.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Security Info */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <ShieldCheckIcon className="h-4 w-4 text-gray-400" />
            </div>
            <div className="ml-2 text-sm text-gray-500">
              Your payment is secured with 256-bit SSL encryption. We never store your credit card details.
            </div>
          </div>

          {/* Submit Button */}
          <SubmitButton
          
          label={isFreeTrial ? "Start Free Trial" : "Upgrade Now"}
          cost={isFreeTrial ? "No charge now" : `$${isFreeTrial ? "0.00" : "29.99"}/month`}
          loadingLabel={"Processing..."}
          loading={isSubmitting}
          className={"w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg shadow-md font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"}/>
          

          {/* Billing Info */}
          <p className="text-xs text-center text-gray-500">
            {isFreeTrial ? (
              "Your card will be charged $29.99/month after the 14-day trial unless you cancel."
            ) : (
              "You'll be charged immediately. Cancel anytime."
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;