import React, { useState } from "react";
import CheckoutForm from "../components/forms/CheckoutForm"
import {create_subscription, attach_payment_method} from "../services/Checkout"
import { useConfig } from "../contexts/ConfigContext";
import { useAuth } from "../contexts/AuthContext";
import {useStripe, useElements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import WelcomePro from "../components/common/WelcomePro"

const CheckoutPage = () => {

  // User auth
  const { user, system, logout } = useAuth();
  const currentPlan = user.subscription.plan;

  // Language
  const { config, language } = useConfig();
  const labels = config.labels[language];

  // Init stripe
  const stripe = useStripe();
  const elements = useElements();

  const handleOnSubmit = async (data) => {
    try {

      // Create payment method
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        alert(error.message);
        return;
      }

      const response = await create_subscription({payment_method_id: paymentMethod.id}).catch(error=>{
        if (error.status === 500) {// token expired
          logout();
        }
      })

      if (response.success) {
        alert('Subscription started! Check your email for confirmation.');
      } else {
        alert("error");
      }
    } catch (err) {
      console.log(err)
    } finally {
    }
  };

  return (
    <>
    {currentPlan == "pro" ? (
      <WelcomePro/>
    ):(
      <CheckoutForm handleOnSubmit={handleOnSubmit} currentPlan={currentPlan} CardElement={CardElement}/>
    )
    }
    </>
  );
};

export default CheckoutPage;