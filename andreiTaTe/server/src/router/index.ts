import express from "express";
import authentication from "./authentication";
import users from "./users";
import stripe from "./stripe";

const router = express.Router();

export default (): express.Router => {
    stripe(router);
    authentication(router);
    users(router);
    return router;
};