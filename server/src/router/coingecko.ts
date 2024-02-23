import express from "express";
import bodyParser from "body-parser";

import { getAllCoins } from "../controllers/coingecko";
import { isAuthenticated } from "../middlewares";
import { getCoinInfoByName } from "../controllers/coingecko";

export default (router: express.Router) => {
    router.use(bodyParser.json());
    router.get("/coingecko/coin-data/:name",isAuthenticated, getCoinInfoByName);
    router.get("/coingecko/coins", isAuthenticated, getAllCoins);
};
