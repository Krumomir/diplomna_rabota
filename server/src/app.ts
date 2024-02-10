import express from "express";
import http from "http";
import cookieparser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { connectDB } from "./config/db";
import router from "./router";
import axios from 'axios';
import { processResponse } from './helpers';
import { createCoin } from "./db/coins";
import dotenv from 'dotenv';
import { createPool } from "./db/pool";

dotenv.config();

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 8081;

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




//TVL: Retrieve current and historical TVL data for Aave
app.get('/defillama-tvl/:protocol', async (req, res) => {
  try {
    const protocolName = req.params.protocol;

    const response = await axios.get(`${process.env.DEFLAMA_BASE_URL}/protocol/${protocolName}`);

    const totalTvl = response.data.tvl || [];

    res.json(totalTvl);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/defillama-current-tvl/:protocol', async (req, res) => {
  try {
    const protocolName = req.params.protocol;

    const response = await axios.get(`${process.env.DEFLAMA_BASE_URL}/tvl/${protocolName}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/defillama-yields/:protocol', async (req, res) => {
  try {
    const protocolName = req.params.protocol;

    const response = await axios.get(`${process.env.DEFILAMA_YIELDS_URL}/pools`);

    // Filter the data based on chain and project fields
    const filteredData = response.data.data.filter((item: { chain: string; project: string; }) => item.chain === 'Ethereum' && item.project === protocolName);

    const savedData = [];
    for (const item of filteredData) {
      const savedItem = await createPool(item);
      savedData.push(savedItem);
    }

    res.json(savedData);
  } catch (error) {
    console.error('Error fetching yields:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint to fetch coin data
app.get('/coin/:id', async (req: express.Request, res: express.Response) => {
  try {
    const coinId = req.params.id;
    const { data } = await axios.get(`${process.env.COINGECKO_BASE_URL}/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true, // Set market_data to true
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
      headers: {
        'Content-Type': 'application/json',
        'X-CoinGecko-API-Key': process.env.COINGECKO_API_KEY, // Include your API key in the request headers
      },
    });

    const processedResponse = processResponse(data);

    //   const coin = await createCoin(processedResponse);

    res.json(processedResponse);
  } catch (error) {
    console.error('Error fetching coin data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
