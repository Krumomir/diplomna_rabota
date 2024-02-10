import express from "express";
import authentication from "./authentication";
import users from "./users";
import stripe from "./stripe";
import defilama from "./defilama";
import coingecko from "./coingecko";

const router = express.Router();

export default (): express.Router => {
    stripe(router);
    authentication(router);
    users(router);
    defilama(router);
    coingecko(router);
    
    return router;
};