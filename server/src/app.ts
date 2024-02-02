import express from "express";
import http from "http";
import cookieparser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { connectDB } from "./config/db";
import router from "./router";
import axios from 'axios';

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

// Defillama API URLs
const defillamaBaseURL = 'https://api.llama.fi';

// CoinGecko API URLs
const coingeckoBaseURL = 'https://api.coingecko.com/api/v3';

// Defillama API Calls
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

