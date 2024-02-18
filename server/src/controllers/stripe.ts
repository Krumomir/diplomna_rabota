import express from 'express';
import Stripe from 'stripe';

import { subscribeUser, unsubscribeUser } from '../db/users';
import { getUserBySessionToken } from '../db/users';

export const webhook = (req: express.Request, res: express.Response) => {
    const sig = req.headers["stripe-signature"];

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const webhookKey = process.env.STRIPE_WEBHOOK_SECRET;

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
 //  todo https://stripe.com/docs/billing/subscriptions/cancel?dashboard-or-api=api#handle-invoice-items-when-canceling-subscriptions
    switch (event.type) {
        case "checkout.session.completed":
            const checkoutSession = event.data.object;
            const userEmail = checkoutSession.customer_details.email;
            subscribeUser(userEmail, checkoutSession.subscription.toString());
            break;
        case "customer.subscription.deleted":
            const subscription = event.data.object;
            unsubscribeUser(subscription.id.toString());
            break;
        case "invoice.payment_failed":
            const invoice = event.data.object;
            unsubscribeUser(invoice.subscription.toString());
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
}

export const cancelSubscription = async (req: express.Request, res: express.Response) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const sessionToken = req.cookies.sessionToken;
        const user = await getUserBySessionToken(sessionToken).select("+subscription.sub_id");

        const subscription = await stripe.subscriptions.cancel(user.subscription.sub_id);

        res.json(subscription);
    } catch (error) {
        console.error('Error canceling subscription:', error);
        res.status(500).json({ error: error.message });
    }
}