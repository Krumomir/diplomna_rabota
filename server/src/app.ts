import express from "express";
import http from "http";
import cookieparser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import dotenv from 'dotenv';

import { connectDB } from "./config/db";

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
