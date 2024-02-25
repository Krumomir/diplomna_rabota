import express from 'express';
import Stripe from 'stripe';

import { getUserBySessionToken } from '../db/users';
import { handleStripeEvent } from '../helpers';

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
    
    handleStripeEvent(event);

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
        res.status(500).json({ error: error.message });
    }
}