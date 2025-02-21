const express = require('express');
const router = express.Router();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const orderService = require('../services/orderService');
const checkoutService = require('../services/checkoutService');
const UserAuth = require('../middleware/UserAuth');
const logHttpUrl = require('../middleware/HttpUrl');
// make sure to import Stripe after all the other require
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// (2) Router-level Middleware
// Router-level middleware works similarly to application-level middleware but is bound to an instance of express.Router().

// (2) Middleware for applying logHttpUrl to all routes
router.use(logHttpUrl);

// (2) Middleware for applying the UserAuth to router.post route only
router.post('/', UserAuth, async (req, res) => {
    try {
        const session = await checkoutService.checkout(req.user.userId);
        res.json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Webhook for Stripe (Paul's Sample Code)
// router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
//     let event;
//     try {
//        // verify the webhook signature
//         const sig = req.headers['stripe-signature'];
//         event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//     } catch (error) {
//         console.error(`Webhook Error: ${error.message}`);
//         return res.status(400).send(`Webhook Error: ${error.message}`);
//     }

//     // Handling the webhook event
//     switch (event.type) {
//         case 'checkout.session.completed':
//             const session = event.data.object;
//             console.log('Checkout session completed!', session);
//             if (session.metadata && session.metadata.orderId) {
//                 await orderService.updateOrderStatus(session.metadata.orderId, 'processing');
//             }
//             break;
//         default:
//             console.log(`Unhandled event type ${event.type}`);
//     }

//     res.json({ received: true });
// });

// Webhook for Stripe (Stripe's Sample Code)
// https://docs.stripe.com/webhooks?lang=node
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
// This is your Stripe CLI webhook secret for testing your endpoint locally.

router.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  // const sig = request.headers['stripe-signature'];

  // let event;

  // try {
  //   event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  // } catch (err) {
  //   console.log("hello there.");
  //   response.status(400).send(`Webhook Error: ${err.message}`);
  //   console.log(err.message);
  //   return;
  // }

  let event;

  try {
           // verify the webhook signature
            const sig = request.headers['stripe-signature'];
            event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (error) {
          console.log("hello there3.");
          console.log(error.message);
            console.error(`Webhook Error: ${error.message}`);
            return response.status(400).send(`Webhook Error: ${error.message}`);
        }

  // Handle the event
  switch (event.type) {
    // case 'payment_intent.succeeded':
    //   const paymentIntentSucceeded = event.data.object;
    //   // Then define and call a function to handle the event payment_intent.succeeded
    //   break;
    // // ... handle other event types
    // default:
    //   console.log(`Unhandled event type ${event.type}`);

    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntentSucceeded);
      console.log('Payment session succeeded!', paymentIntentSucceeded);
      console.log("hello there2.");
      console.log(session);
      console.log(orderId); // No orderId
      if (paymentIntentSucceeded.metadata && paymentIntentSucceeded.metadata.orderId) {
        await orderService.updateOrderStatus(paymentIntentSucceeded.metadata.orderId, 'completed');
      }
      break;

    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;

    case 'payment_intent.payment_failed':
      const paymentIntentFailed = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      console.log('Payment session failed!', paymentIntentFailed);
      if (paymentIntentFailed.metadata && paymentIntentFailed.metadata.orderId) {
        await orderService.updateOrderStatus(paymentIntentFailed.metadata.orderId, 'cancelled');
      }
      break;

    // ... handle other event types
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Checkout session completed!', session);
      console.log("hello there1.");
      console.log(session);
      console.log(orderId); // Has orderId
      if (session.metadata && session.metadata.orderId) {
        await orderService.updateOrderStatus(session.metadata.orderId, 'processing');
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  // response.send();
  response.json({ received: true });
});

module.exports = router;
