import express from "express";
import bodyParser from "body-parser";
import { getHistoricalTvl, getHistoricalYields } from "../controllers/defilama";

export default (router: express.Router) => {
    router.use(bodyParser.json());
    router.get("/defilama/historical-tvl/:protocol", getHistoricalTvl);
    router.get("/defilama/historical-yields/:protocol", getHistoricalYields);
};
