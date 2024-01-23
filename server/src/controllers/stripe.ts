import express from 'express';
import Stripe from 'stripe';
import { subscribeUser } from '../db/users';

export const webhook = (req: express.Request, res: express.Response) => {
    const sig = req.headers["stripe-signature"];

    const stripeSecretKey = 'sk_test_51OazktFGqGGHwrYICmWSgmo1mrPR1A4I9XobyilmYTwBJzQqAuCQHSZvGxWN0YOuVbbmdvavISpIfjymhc8dTyew004aGfujFK' || process.env.STRIPE_SECRET_KEY;
    const webhookKey = 'whsec_33hVRsdJ6rxSh0UVXXpHcaZTyZYG2IrP' || process.env.STRIPE_WEBHOOK_SECRET;

    let stripe = new Stripe(stripeSecretKey)

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            webhookKey
        );

    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case "checkout.session.completed":
            const checkoutSession = event.data.object;
            const userEmail = checkoutSession.client_reference_id;
            subscribeUser(userEmail);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
}