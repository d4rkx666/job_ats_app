import React from 'react';
import { useConfig } from '../contexts/ConfigContext';
import { CheckIcon, SparklesIcon, LockClosedIcon, ArrowPathIcon, DocumentTextIcon, CodeBracketIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const PricingPage = () => {

   const {config, language} = useConfig();
   const features = [
      {
         name: 'ATS Optimization',
         description: 'Boost your resume score with keyword matching',
         pro: true,
         free: false
      },
      {
         name: 'Unlimited Resumes',
         description: 'Create and optimize as many resumes as you need',
         pro: true,
         free: false
      },
      {
         name: 'DOCX Export',
         description: 'Download editable Word documents',
         pro: true,
         free: false
      },
      {
         name: 'AI Cover Letters',
         description: 'Generate tailored cover letters in seconds',
         pro: true,
         free: false
      },
      {
         name: 'Advanced Formatting',
         description: 'Full Markdown editor with preview',
         pro: true,
         free: false
      },
      {
         name: 'Basic Optimization',
         description: 'Limited keyword suggestions',
         pro: true,
         free: true
      },
      {
         name: 'PDF Export',
         description: 'Standard PDF downloads',
         pro: true,
         free: true
      },
      {
         name: 'Single Resume',
         description: 'Edit one resume at a time',
         pro: true,
         free: true
      }
   ];

   return (
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
         <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
               <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                  Choose Your Plan
               </h1>
               <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                  {/*Get job-ready with our powerful resume optimization tools*/}
                  Enjoy the free BETA VERSION and get ready for the future prices!
               </p>
            </div>

            {/* Pricing Tiers */}
            <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
               {/* Free Tier */}
               <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <div className="mb-8">
                     <h2 className="text-lg font-medium text-gray-900">Free</h2>
                     <p className="mt-4 flex items-baseline text-gray-900">
                        <span className="text-5xl font-extrabold tracking-tight">$0</span>
                        <span className="ml-1 text-xl font-semibold">/forever</span>
                     </p>
                     <p className="mt-2 text-gray-500">Basic resume optimization</p>
                  </div>
                  <a
                     href="#"
                     className="block w-full py-3 px-6 border border-gray-800 rounded-md text-center font-medium text-gray-800 bg-gray-50 hover:bg-gray-100"
                  >
                     Get started
                  </a>
                  <div className="mt-8">
                     <h3 className="text-sm font-medium text-gray-900">What's included</h3>
                     <ul className="mt-6 space-y-4">
                        {features.filter(f => f.free).map((feature) => (
                           <li key={feature.name} className="flex">
                              <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                              <span className="ml-3 text-base text-gray-500">
                                 <span className="font-medium">{feature.name}</span> - {feature.description}
                              </span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>

               {/* Pro Tier - Featured */}
               <div className="relative p-8 bg-white border-2 border-blue-500 rounded-2xl shadow-lg overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-16 pt-6 pr-1">
                     <div className="bg-blue-500 text-white px-4 py-1 text-xs font-bold uppercase tracking-wide transform rotate-45 translate-x-8">
                        Most Popular
                     </div>
                  </div>
                  <div className="mb-8">
                     <div className="flex items-center">
                        <h2 className="text-lg font-medium text-gray-900">Pro</h2>
                        <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                           Recommended
                        </span>
                     </div>
                     <p className="mt-4 flex items-baseline text-gray-900">
                        <span className="text-5xl font-extrabold tracking-tight">{language == "en" ? "13" : "259"}</span>
                        <span className="ml-1 text-xl font-semibold">/month</span>
                     </p>
                     <p className="mt-2 text-gray-500">Everything you need to land interviews</p>
                  </div>
                  <a
                     href="#"
                     className="block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md"
                  >
                     Start 7-day free trial
                  </a>
                  <div className="mt-8">
                     <h3 className="text-sm font-medium text-gray-900">What's included</h3>
                     <ul className="mt-6 space-y-4">
                        {features.filter(f => f.pro).map((feature) => (
                           <li key={feature.name} className="flex">
                              <CheckIcon className="flex-shrink-0 h-5 w-5 text-blue-500" aria-hidden="true" />
                              <span className="ml-3 text-base text-gray-500">
                                 <span className="font-medium">{feature.name}</span> - {feature.description}
                              </span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>

            {/* Feature Comparison */}
            <div className="mt-24">
               <h2 className="text-3xl font-extrabold text-gray-900 text-center">Feature Comparison</h2>
               <div className="mt-12">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                     <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                           <tr>
                              <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                 Feature
                              </th>
                              <th scope="col" className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                                 Free
                              </th>
                              <th scope="col" className="px-6 py-3 text-center text-sm font-semibold text-blue-600">
                                 Pro
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                           {features.map((feature) => (
                              <tr key={feature.name}>
                                 <td className="px-6 py-4 text-sm text-gray-900">
                                    <div className="font-medium">{feature.name}</div>
                                    <div className="text-gray-500">{feature.description}</div>
                                 </td>
                                 <td className="px-6 py-4 text-center text-sm text-gray-500">
                                    {feature.free ? (
                                       <CheckIcon className="mx-auto h-5 w-5 text-green-500" />
                                    ) : (
                                       <LockClosedIcon className="mx-auto h-5 w-5 text-gray-400" />
                                    )}
                                 </td>
                                 <td className="px-6 py-4 text-center text-sm text-gray-500">
                                    <CheckIcon className="mx-auto h-5 w-5 text-blue-500" />
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>


            {/* Feature Comparison Table */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Keyword Features
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Free
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pro
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Hard Skills
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Soft Skills
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Tools & Technologies
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Certifications
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Keyword Frequency Counts
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            
                {/* Testimonial Nudge */}
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User testimonial" />
                    </div>
                    <div>
                      <blockquote>
                        <p className="text-sm text-gray-600">
                          "Upgrading to Pro helped me discover 12 additional keywords in my job description. 
                          I got interview calls from 3 companies within a week of optimizing my resume!"
                        </p>
                      </blockquote>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                        <p className="text-sm text-gray-500">Product Designer at TechCorp</p>
                      </div>
                    </div>
                  </div>
                </div>

            {/* Testimonials */}
            {/* 
            <div className="mt-24">
               <h2 className="text-3xl font-extrabold text-gray-900 text-center">Trusted by job seekers worldwide</h2>
               <div className="mt-12 grid gap-8 md:grid-cols-3">
                  {[
                     {
                        name: 'Sarah K.',
                        role: 'Marketing Manager',
                        quote: 'Landed 3x more interviews after optimizing my resume with the Pro features.',
                        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                     },
                     {
                        name: 'James L.',
                        role: 'Software Engineer',
                        quote: 'The ATS optimization helped me get past HR filters for the first time.',
                        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                     },
                     {
                        name: 'Priya M.',
                        role: 'Product Designer',
                        quote: 'Worth every penny - got my dream job after using the AI cover letter generator.',
                        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                     }
                  ].map((testimonial) => (
                     <div key={testimonial.name} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center">
                           <img className="h-12 w-12 rounded-full" src={testimonial.avatar} alt="" />
                           <div className="ml-4">
                              <div className="font-medium text-gray-900">{testimonial.name}</div>
                              <div className="text-gray-500 text-sm">{testimonial.role}</div>
                           </div>
                        </div>
                        <p className="mt-6 text-gray-600 italic">"{testimonial.quote}"</p>
                     </div>
                  ))}
               </div>
            </div>
            */}

            {/* FAQ */}
            <div className="mt-24">
               <h2 className="text-3xl font-extrabold text-gray-900 text-center">Frequently asked questions</h2>
               <div className="mt-12 max-w-3xl mx-auto divide-y divide-gray-200">
                  {[
                     {
                        question: 'Can I cancel anytime?',
                        answer: 'Yes, you can cancel your subscription at any time and you\'ll retain access until the end of your billing period.'
                     },
                     {
                        question: 'Is there a money-back guarantee?',
                        answer: 'We offer a 14-day money-back guarantee if you\'re not satisfied with our service.'
                     },
                     {
                        question: 'How does the ATS optimization work?',
                        answer: 'Our system analyzes job descriptions and suggests the best keywords to include in your resume to pass automated screening systems.'
                     },
                     {
                        question: 'Do you store my resume data?',
                        answer: 'We store your data securely and never share it with third parties. You can delete your account and all data at any time.'
                     }
                  ].map((faq, index) => (
                     <div key={index} className="py-6">
                        <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                        <p className="mt-2 text-base text-gray-500">{faq.answer}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default PricingPage;