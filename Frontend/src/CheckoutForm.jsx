/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import './index.css';

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'IN',
        currency: 'inr',
        total: {
          label: 'Total',
          amount: 1000,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async (ev) => {
        const { error } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: ev.paymentMethod.id,
          },
          { handleActions: false }
        );

        if (error) {
          ev.complete('fail');
          setPaymentStatus('Payment failed: ' + error.message);
        } else {
          ev.complete('success');
          setPaymentStatus('Payment succeeded!');
        }
      });
    }
  }, [clientSecret, stripe]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setPaymentStatus(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentStatus('Payment succeeded!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="payment-form">
        <CardElement className="card-element" />
        <button type="submit" disabled={!stripe} className="pay-button">
          Pay with Card
        </button>
        <div className="payment-status">{paymentStatus}</div>
      </form>
      {paymentRequest && (
        <div className="payment-form">
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
