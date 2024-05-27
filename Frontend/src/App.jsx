/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CheckoutForm from './CheckoutForm';

const App = () => {
  const [clientSecret, setClientSecret] = useState('');

  const createPaymentIntent = async () => {
    const response = await fetch('http://localhost:4242/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1000 }), 
    });
    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);
  };

// use Card Number : 4000003560000008
// Expiry and CvC as anything

  return (
    <div className="App">
      <h1>Stripe Payment Testing</h1>
      <button onClick={createPaymentIntent}>Initialize Payment</button>
      {clientSecret && <CheckoutForm clientSecret={clientSecret} />}
    </div>
  );
};

export default App;
