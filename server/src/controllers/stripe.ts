import express from 'express';
import Stripe from 'stripe';

import { getUserById } from "../services/userService";
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

    } catch (error) {
        res.status(400).send({message: 'Webhook Error: ' + error.message});
    }
  
    handleStripeEvent(event);

    res.json({ received: true });
}

export const cancelSubscription = async (req: express.Request, res: express.Response) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const userId = req.params.id;
        let user = await getUserById(userId).select("+subscription.sub_id");

        if (!user.subscription.sub_id) {
            return res.status(400).json({ message: 'User does not have a subscription' });
        }

        const subscription = await stripe.subscriptions.cancel(user.subscription.sub_id);

        user = await getUserById(userId);

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}