import express from "express";
import bodyParser from "body-parser";

import { coinData, getAllCoins } from "../controllers/coingecko";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
    router.use(bodyParser.json());
    router.get("/coingecko/coin-data/:id", coinData);
    router.get("/coingecko/coins", isAuthenticated, getAllCoins);
};
