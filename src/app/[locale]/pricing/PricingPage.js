"use client"
import React, { useState } from "react"
import { useAuth } from "@/app/contexts/AuthContext";
import PriceTable from "./components/PriceTable";
import { create_session } from "@/app/hooks/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const PricingPage = () => {
  const { user, logout, system } = useAuth();
  const isPro = user && user.subscription.plan === "pro";

  const router = useRouter();

  // Language
  const t = useTranslations("pricingPage");
  const d = useTranslations("dashboardPage");

  const freePlan={
    name: t("freeTierPlan.plan"),
    description: t("freeTierPlan.description"),
    price: t("freeTierPlan.price"),
    recurrent: t("freeTierPlan.priceRecurrent"),
    cta: t("freeTierPlan.cta"),
    ctaLoading: t("freeTierPlan.cta"),
    features:[
      {
        item: t("freeTierPlan.items.kwExtraction"),
        included: true
      },
      {
        item: t("freeTierPlan.items.AI"),
        included: true
      },
      {
        item: t("freeTierPlan.items.downloads"),
        included: true
      },
      {
        item: t("freeTierPlan.items.breakdown"),
        included: false
      },
      {
        item: t("freeTierPlan.items.editor"),
        included: false
      },
      {
        item: t("freeTierPlan.items.credits"),
        included: true
      },
      {
        item: t("freeTierPlan.items.templates"),
        included: true
      },
    ]
  }

  const proPlan={
    name: t("proTierPlan.plan"),
    description: t("proTierPlan.description"),
    price: t("proTierPlan.price"),
    recurrent: t("proTierPlan.priceRecurrent"),
    cta: t("proTierPlan.cta"),
    ctaLoading: t("proTierPlan.ctaLoading"),
    features:[
      {
        item: t("proTierPlan.items.kwExtraction"),
        included: true
      },
      {
        item: t("proTierPlan.items.AI"),
        included: true
      },
      {
        item: t("proTierPlan.items.downloads"),
        included: true
      },
      {
        item: t("proTierPlan.items.breakdown"),
        included: true
      },
      {
        item: t("proTierPlan.items.editor"),
        included: true
      },
      {
        item: t("proTierPlan.items.credits"),
        included: true
      },
      {
        item: t("proTierPlan.items.templates"),
        included: true
      },
    ]
  }

  const handleFreeOnClick = ()=>{
    if(!user){
      router.push("/signup");
    }
  }

  const [isProLoading, setIsProLoading] = useState(false);
  const handleProOnClick = async()=>{
    setIsProLoading(true);
    if(!user){
      router.push("/signup");
    }
    try {
      const response = await create_session().catch(err=>{
        if (err.status === 500) {// token expired
            logout();
        }
      });

      if(response.success){
        const session = response.session_id

        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
        console.log("passing", session)
        await stripe.redirectToCheckout({
          sessionId: session,
        });
      }
    } catch(error){
      console.error(error);
    } finally {
      setIsProLoading(false);
    }
  }

  return (
    <div className="bg-white py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 md:px-6 lg:px-8">

        {/* Pricing Cards */}
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {t("title")}
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                {t("subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="order-2 md:order-1">
                <PriceTable user={user} currentPlan={!user ? false : isPro ? false : true} plan={freePlan} hadleOnClick={handleFreeOnClick}/>
              </div>

              <div className="order-1 md:order-2">
                <PriceTable user={user} currentPlan={isPro ? true : false} plan={proPlan} hadleOnClick={handleProOnClick} isLoading={isProLoading}/>
              </div>
              
            </div>
          </div>
        </div>

        {/* Action Costs */}
          <div className="w-full max-w-3xl mx-auto bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-2" />
              {d("actionCosts")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-2 hover:bg-blue-50 rounded-lg transition-colors">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{d("keywordOptimization")}</p>
                </div>
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {system.action_cost.keyword_extraction} {d("credit")}{system.action_cost.keyword_extraction !== 1 && 's'}
                </span>
              </div>

              <div className="flex items-center p-2 hover:bg-blue-50 rounded-lg transition-colors">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{d("atsReoptimization")}</p>
                </div>
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {system.action_cost.ats_analysis} {d("credit")}{system.action_cost.ats_analysis !== 1 && 's'}
                </span>
              </div>

              <div className="flex items-center p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                <div className="flex-shrink-0 w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{d("resumeCreation")}</p>
                </div>
                <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                  {system.action_cost.resume_creation} {d("credit")}{system.action_cost.resume_creation !== 1 && 's'}
                </span>
              </div>

              {system.action_cost.resume_optimization && (
                <div className="flex items-center p-2 hover:bg-purple-50 rounded-lg transition-colors">
                  <div className="flex-shrink-0 w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">{d("resumeOptimization")}</p>
                  </div>
                  <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    {system.action_cost.resume_optimization} {d("credit")}{system.action_cost.resume_optimization !== 1 && 's'}
                  </span>
                </div>
              )}
            </div>
          </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {t("faqLabel")}
          </h2>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
              <div className="py-6">
                <h3 className="text-lg font-medium text-gray-900">{t("faq.one.question")}</h3>
                <p className="mt-2 text-base text-gray-600">{t("faq.one.answer")}</p>
              </div>

              <div className="py-6">
                <h3 className="text-lg font-medium text-gray-900">{t("faq.two.question")}</h3>
                <p className="mt-2 text-base text-gray-600">{t("faq.two.answer")}</p>
              </div>

              <div className="py-6">
                <h3 className="text-lg font-medium text-gray-900">{t("faq.three.question")}</h3>
                <p className="mt-2 text-base text-gray-600">{t("faq.three.answer")}</p>
              </div>

              <div className="py-6">
                <h3 className="text-lg font-medium text-gray-900">{t("faq.four.question")}</h3>
                <p className="mt-2 text-base text-gray-600">{t("faq.four.answer")}</p>
              </div>
              
              <div className="py-6">
                <h3 className="text-lg font-medium text-gray-900">{t("faq.five.question")}</h3>
                <p className="mt-2 text-base text-gray-600">{t("faq.five.answer")}</p>
              </div>

              <div className="py-6">
                <h3 className="text-lg font-medium text-gray-900">{t("faq.six.question")}</h3>
                <p className="mt-2 text-base text-gray-600">{t("faq.six.answer")}</p>
              </div>

              <div className="py-6">
                <h3 className="text-lg font-medium text-gray-900">{t("faq.seven.question")}</h3>
                <p className="mt-2 text-base text-gray-600">{t("faq.seven.answer")}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;