import express from "express";
import http from "http";
import cookieparser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { connectDB } from "./config/db";
import router from "./router";
import axios from 'axios';
import { processResponse } from './helpers';

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


const coingeckoApiKey = 'CG-G3pobU3E8Q1w1wms5w9x8AVu';

const defillamaBaseURL = 'https://api.llama.fi';

const coingeckoBaseURL = 'https://api.coingecko.com/api/v3';

//TVL: Retrieve current and historical TVL data for Aave
app.get('/defillama-tvl/:protocol', async (req, res) => {
  try {
    const protocolName = req.params.protocol;

    const response = await axios.get(`${defillamaBaseURL}/protocol/${protocolName}`);

    const totalTvl = response.data.tvl || [];

    res.json(totalTvl);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/defillama-current-tvl/:protocol', async (req, res) => {
  try {
    const protocolName = req.params.protocol;

    const response = await axios.get(`${defillamaBaseURL}/tvl/${protocolName}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.get('/defillama-yields/:protocol', async (req, res) => {
//   try {
//     // Extract protocol name from request parameters
//     const protocolName = req.params.protocol;

//     // Yields API Call for the specified protocol
//     const response = await axios.get(`${defillamaBaseURL}/pools/${protocolName}`);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Endpoint to fetch coin data
app.get('/coin/:id', async (req: express.Request, res: express.Response) => {
  try {
    const coinId = req.params.id;
    const { data } = await axios.get(`${coingeckoBaseURL}/coins/${coinId}`, {
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
        'X-CoinGecko-API-Key': coingeckoApiKey, // Include your API key in the request headers
      },
    });
    
    const processedResponse = processResponse(data);

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
