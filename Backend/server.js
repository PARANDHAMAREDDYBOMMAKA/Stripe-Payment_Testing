const express = require('express');
const stripe = require('stripe')('sk_test_51PJd4eSA9XPoRF6Aj6HO884Kf2vMHVWXxYlGu44ryMgsGvpxMzWaxZBXmTPGPWYgbUZ9UyqTVKBrBFcYLUMTNvPL002VJrt70e');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      payment_method_types: ['card'],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).send({ error: error.message });
  }
});

app.listen(4242, () => console.log('Server running on port 4242'));
