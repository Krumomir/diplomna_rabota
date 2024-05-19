import express from "express";
import bodyParser from "body-parser";
import { historicalTvl, historicalYields } from "../controllers/defilama";

export default (router: express.Router) => {
    router.use(bodyParser.json());
    router.get("/defilama/historical-tvl/:protocol", historicalTvl);
    router.get("/defilama/historical-yields/:protocol", historicalYields);
};
