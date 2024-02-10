import express from "express";
import { webhook } from "../controllers/stripe";

export default (router: express.Router) => {
    router.post("/stripe/webhook", express.raw({type: 'application/json'}), webhook);
};