import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const handleCheckout = async (cartItems) => {
  const response = await fetch('/.netlify/functions/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartItems }),
  });

  const { id } = await response.json();

  const stripe = await stripePromise;
  await stripe.redirectToCheckout({ sessionId: id });
};