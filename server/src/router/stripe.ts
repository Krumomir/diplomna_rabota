import express from "express";

import { webhook, cancelSubscription } from "../controllers/stripe";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
    router.post("/stripe/webhook", express.raw({type: 'application/json'}), webhook);
    router.put("/stripe/cancel-subscription/:id", isAuthenticated, isOwner, cancelSubscription);
};