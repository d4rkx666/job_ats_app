import React, { useState } from "react"
import { useAuth } from '../contexts/AuthContext';
import { useConfig } from '../contexts/ConfigContext';
import PriceTable from "../components/common/PriceTable";
import { create_session } from "../services/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const PricingPage = () => {
  const { user, logout } = useAuth();
  const isPro = user && user.subscription.plan === "pro";

  const navigate = useNavigate();

  // Language
  const { config, language } = useConfig();
  const labels = config.labels[language];

  const frequentQuestions = labels.pricingPage.faq;

  const freePlan={
    name: labels.pricingPage.freeTierPlan.plan,
    description: labels.pricingPage.freeTierPlan.description,
    price: labels.pricingPage.freeTierPlan.price,
    recurrent: labels.pricingPage.freeTierPlan.priceRecurrent,
    cta: labels.pricingPage.freeTierPlan.cta,
    ctaLoading: labels.pricingPage.freeTierPlan.ctaLoading,
    features:[
      {
        item: labels.pricingPage.freeTierPlan.items.kwExtraction,
        included: true
      },
      {
        item: labels.pricingPage.freeTierPlan.items.AI,
        included: true
      },
      {
        item: labels.pricingPage.freeTierPlan.items.downloads,
        included: true
      },
      {
        item: labels.pricingPage.freeTierPlan.items.breakdown,
        included: false
      },
      {
        item: labels.pricingPage.freeTierPlan.items.editor,
        included: false
      },
      {
        item: labels.pricingPage.freeTierPlan.items.credits,
        included: true
      },
      {
        item: labels.pricingPage.freeTierPlan.items.templates,
        included: true
      },
    ]
  }

  const proPlan={
    name: labels.pricingPage.proTierPlan.plan,
    description: labels.pricingPage.proTierPlan.description,
    price: labels.pricingPage.proTierPlan.price,
    recurrent: labels.pricingPage.proTierPlan.priceRecurrent,
    cta: labels.pricingPage.proTierPlan.cta,
    ctaLoading: labels.pricingPage.proTierPlan.ctaLoading,
    features:[
      {
        item: labels.pricingPage.proTierPlan.items.kwExtraction,
        included: true
      },
      {
        item: labels.pricingPage.proTierPlan.items.AI,
        included: true
      },
      {
        item: labels.pricingPage.proTierPlan.items.downloads,
        included: true
      },
      {
        item: labels.pricingPage.proTierPlan.items.breakdown,
        included: true
      },
      {
        item: labels.pricingPage.proTierPlan.items.editor,
        included: true
      },
      {
        item: labels.pricingPage.proTierPlan.items.credits,
        included: true
      },
      {
        item: labels.pricingPage.proTierPlan.items.templates,
        included: true
      },
    ]
  }

  const handleFreeOnClick = ()=>{
    if(!user){
      navigate("/signup");
    }
  }

  const [isProLoading, setIsProLoading] = useState(false);
  const handleProOnClick = async()=>{
    setIsProLoading(true);
    if(!user){
      navigate("/signup");
    }
    try {
      const response = await create_session().catch(err=>{
        if (err.status === 500) {// token expired
            logout();
        }
      });

      if(response.success){
        const session = response.session_id

        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        console.log("passing", session)
        await stripe.redirectToCheckout({
          sessionId: session,
        });
      }
    } catch {} finally {
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
                {labels.pricingPage.title}
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                {labels.pricingPage.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="order-2 md:order-1">
                <PriceTable labels={labels} user={user} currentPlan={!isPro ? true : false} plan={freePlan} hadleOnClick={handleFreeOnClick}/>
              </div>

              <div className="order-1 md:order-2">
                <PriceTable labels={labels} user={user} currentPlan={isPro ? true : false} plan={proPlan} hadleOnClick={handleProOnClick} isLoading={isProLoading}/>
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