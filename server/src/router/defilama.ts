import express from "express";
import bodyParser from "body-parser";
import { isAuthenticated } from "../middlewares";
import { getHistoricalTvl, getHistoricalYields } from "../controllers/defilama";

export default (router: express.Router) => {
    router.use(bodyParser.json());
    router.get("/defilama/historical-tvl/:protocol",isAuthenticated, getHistoricalTvl);
    router.get("/defilama/historical-yields/:protocol",isAuthenticated, getHistoricalYields);
};
