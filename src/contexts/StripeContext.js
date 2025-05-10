import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe outside your component
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function StripeProvider({ children }) {
   return (
     <Elements stripe={stripePromise}>
       {children}
     </Elements>
   );
}