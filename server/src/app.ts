import express from "express";
import http from "http";
import cookieparser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import dotenv from 'dotenv';

import { connectDB } from "./config/db";
import { historicalTvl, historicalYields } from "./controllers/defilama";
import { coinData, getAllCoins } from "./controllers/coingecko";
import { scheduleTask } from "./controllers/cronjob";

import { OpenAI } from 'openai';
import { analyzeCoin } from "./controllers/cronjob";
import { get } from "lodash";

dotenv.config();

const app = express();

const server = http.createServer(app);

const port = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));


server.listen(port, () => {
  console.log("Server is running on port " + port);
});

connectDB();

app.use(compression());
app.use(cookieparser());

app.use('/', router());

const protocols = ['lido', 'aave', 'Compound-v2'];
protocols.forEach(protocol => scheduleTask(protocol, historicalTvl));

const protocols1 = ['aave-v2', 'lido', 'compound-v2'];
protocols1.forEach(protocol => scheduleTask(protocol, historicalYields));

const coinIds = ['lido-dao', 'aave', 'compound-0x'];
coinIds.forEach(id => scheduleTask(id, coinData));

