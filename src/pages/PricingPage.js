import React from "react"
import { useAuth } from '../contexts/AuthContext';
import { useConfig } from '../contexts/ConfigContext';
import {BoltIcon} from "@heroicons/react/24/outline"

const PricingPage = () => {
  const { user } = useAuth();

  // Language
  const { config, language } = useConfig();
  const labels = config.labels[language];

  const frequentQuestions = labels.pricingPage.faq;

  return (
    <div className="bg-white py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 md:px-6 lg:px-8">

        {/* Pricing Cards */}
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {labels.pricingPage.title}
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                {labels.pricingPage.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <script async src="https://js.stripe.com/v3/pricing-table.js"></script>

              <div className="order-2 md:order-1 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Badge section */}
                <div className="flex flex-col items-center p-6">

                  {/* Product details */}
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-800">{labels.pricingPage.freeTierPlan.plan}</h2>
                    <p className="text-gray-500 mt-2 text-sm">
                      {labels.pricingPage.freeTierPlan.description}
                    </p>
                  </div>

                  {/* Price and button */}
                  <div className="w-full mt-6">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-gray-800">{labels.pricingPage.freeTierPlan.price}</span>
                      <p className="text-gray-500 text-sm">{labels.pricingPage.freeTierPlan.priceRecurrent}</p>
                    </div>
                    {(user && user.subscription.currentPlan === "free") &&
                    <button disabled className="w-full mt-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition disabled:bg-purple-300">
                      {labels.pricingPage.freeTierPlan.currentPlan}
                    </button>
                    }
                  </div>

                  {/* Features list */}
                  <div className="w-full mt-6 text-left">
                    <p className="font-semibold text-gray-700">{labels.pricingPage.freeTierPlan.includes}</p>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 size-3 mr-3" viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600">{labels.pricingPage.freeTierPlan.items.kwExtraction}</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 size-3 mr-3" viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600">{labels.pricingPage.freeTierPlan.items.AI}</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 size-3 mr-3" viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600">{labels.pricingPage.freeTierPlan.items.downloads}</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 size-3 mr-3" viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600">{labels.pricingPage.freeTierPlan.items.breakdown}</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 size-3 mr-3" viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600">{labels.pricingPage.freeTierPlan.items.editor}</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 size-3 mr-3" viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600">+15 {labels.pricingPage.freeTierPlan.items.credits}</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 size-3 mr-3" viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600">{labels.pricingPage.freeTierPlan.items.templates}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className='relative order-1 md:order-2'>
                {(user && user.subscription.currentPlan === "pro") &&
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                    <BoltIcon className="h-4 w-4 mr-1" />
                    Current Plan
                  </span>
                </div>
                }
                {language === "es" ? (
                <stripe-pricing-table pricing-table-id="prctbl_1RNJst4EcbVoOhTGavbD5JlQ"
                  publishable-key="pk_test_51RIgdm4EcbVoOhTGxtbTOcFLkdmrg33fDYPXbHaTTKIkZR3Mj2ZXKObnTWk8EInXc91S0MjJ2VUopGEQOJcBzJeq00csJvyJfw">
                </stripe-pricing-table>
                ):(
                  <stripe-pricing-table pricing-table-id="prctbl_1RNKDM4EcbVoOhTGIBYAquON"
                  publishable-key="pk_test_51RIgdm4EcbVoOhTGxtbTOcFLkdmrg33fDYPXbHaTTKIkZR3Mj2ZXKObnTWk8EInXc91S0MjJ2VUopGEQOJcBzJeq00csJvyJfw">
                  </stripe-pricing-table>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {labels.pricingPage.faqLabel}
          </h2>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {frequentQuestions.map((faq, index) => (
              <div key={index} className="py-6">
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-base text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;