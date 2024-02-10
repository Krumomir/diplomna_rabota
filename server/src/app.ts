import express from "express";
import http from "http";
import cookieparser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import dotenv from 'dotenv';
import cron from 'node-cron';

import { connectDB } from "./config/db";
import { historicalTvl, historicalYields } from "./controllers/defilama";
import { coinData } from "./controllers/coingecko";

dotenv.config();

const app = express();

const server = http.createServer(app);

const port = process.env.PORT;

app.use(cors({
  credentials: true,
}));


server.listen(port, () => {
  console.log("Server is running on port " + port);
});

connectDB();


app.use(compression());
app.use(cookieparser());

app.use('/', router());


// Schedule the historicalTvl function to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  const req = { params: { protocol: 'aave' } } as unknown as express.Request;
  const res = { json: (data: any) => console.log(data) } as express.Response;
  console.log("Running historicalTvl cron job for Aave protocol ")
  console.log(await historicalTvl(req, res));
});

// Schedule the historicalYields function to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  const req = { params: { protocol: 'aave-v2' } } as unknown as express.Request;
  const res = { json: (data: any) => console.log(data) } as express.Response;
  console.log("Running historicalYields cron job for Aave protocol ")
  console.log(await historicalYields(req, res));
});

// Schedule the historicalYields function to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  const req = { params: { id: 'aave' } } as unknown as express.Request;
  const res = { json: (data: any) => console.log(data) } as express.Response;
  console.log("Running coinData cron job for Aave protocol ")
  console.log(await coinData(req, res));
});


// app.get('/coingecko-exchanges', async (_, res) => {
//   try {
//     // Exchanges API Call for Aave on CoinGecko with API key
//     const response = await axios.get(`${coingeckoBaseURL}/coins/aave/tickers`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CoinGecko-API-Key': coingeckoApiKey,
//       },
//     });
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
