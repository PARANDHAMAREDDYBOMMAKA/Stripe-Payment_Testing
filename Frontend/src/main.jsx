/* eslint-disable no-unused-vars */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'; 
import App from './App';
import './index.css';

const stripePromise = loadStripe('pk_test_51PJd4eSA9XPoRF6AShj3Y0C5Sjq3gLSHQ0V4XusBFHOnaAU7hwwxnwf0PO7oTxZFo87gE5Q9QTw6flGakRT1NFXg00SwH4Xm6s');
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
);
