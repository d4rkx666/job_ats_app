import React from 'react';
import { CheckIcon, BoltIcon, SparklesIcon } from '@heroicons/react/24/outline';

const PricingPage = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Basic resume creation with essential features',
      cta: 'Current Plan',
      href: '#',
      features: [
         '15 credits per month',
         'Only PDF resume downloads',
         'Basic keyword analysis',
         'Standard templates',
         'Email support'
      ],
      featured: false
    },
    {
      name: 'Professional',
      price: '$14',
      term: '/month',
      description: 'For job seekers who want to stand out',
      cta: 'Start 7-Day Free Trial',
      href: '#',
      features: [
         '50 credits per month',
         'PDF & DOCX resume downloads',
         'Advanced keyword optimization',
         'ATS score tracking',
         'All premium templates',
         'Priority support',
         'Cover letter generator'
      ],
      featured: true
    }
  ];

  const featureComparison = [
    {
      name: 'Resume Downloads',
      starter: 'PDF',
      professional: 'PDF / DOCX',
    },
    {
      name: 'ATS Optimization',
      starter: 'Basic AI',
      professional: 'Advanced AI',
    },
    {
      name: 'Templates',
      starter: '2 Standard',
      professional: '2 Standard and 2 Premium',
    },
    {
      name: 'Keyword Analysis',
      starter: '✓',
      professional: 'Advanced',
    },
    {
      name: 'Support',
      starter: 'Email',
      professional: 'Priority',
    }
  ];

  return (
    <div className="bg-white py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple Pricing for Every Need
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Whether you're job hunting or building a team, we have a plan that fits.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 border rounded-2xl shadow-sm ${
                plan.featured
                  ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                    <BoltIcon className="h-4 w-4 mr-1" />
                    Recommended
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900">{plan.name}</h2>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.term && (
                    <span className="text-base font-medium text-gray-500">{plan.term}</span>
                  )}
                </p>
              </div>
              <a
                href={plan.href}
                className={`block w-full py-3 px-6 text-center rounded-md font-medium ${
                  plan.featured
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </a>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex">
                    <CheckIcon
                      className={`flex-shrink-0 h-5 w-5 ${
                        plan.featured ? 'text-blue-500' : 'text-gray-400'
                      }`}
                    />
                    <span className="ml-3 text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Plan Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Free Plan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pro Plan
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {featureComparison.map((feature) => (
                  <tr key={feature.name}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {feature.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {feature.starter}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        {feature.professional}
                        {feature.name === 'ATS Optimization' && (
                          <SparklesIcon className="h-4 w-4 ml-1 text-blue-500" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {[
               {
                  question: 'How does the ATS optimization work?',
                  answer: 'Our system analyzes job descriptions and suggests the best keywords to include in your resume to pass automated screening systems.'
               },
              {
                question: "Can I switch plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time."
              },
              {
                question: "Is there a contract or long-term commitment?",
                answer: "No, all plans are month-to-month with no long-term contract."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards and PayPal."
              },
              {
                 question: 'Do you store my resume data?',
                 answer: 'We store your data securely and never share it with third parties. You can delete your account and all data at any time.'
              }
            ].map((faq, index) => (
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