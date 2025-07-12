const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_your_stripe_secret_key');
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId, userId, userEmail, planName, planPrice, planFeatures } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: {
              name: planName,
              description: planFeatures.join(', '),
            },
            unit_amount: planPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/abonamente?canceled=true`,
      metadata: {
        userId,
        userEmail,
        priceId,
        planName,
        planPrice: planPrice.toString(),
        planFeatures: JSON.stringify(planFeatures)
      }
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/stripe-webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_your_webhook_secret');
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment successful for session:', session.id);
      
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});