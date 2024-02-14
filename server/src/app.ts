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
import { getCoinByName } from "./db/coins";

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

const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
getCoinByName('aave')
  .then((document: any) => {
    const dataString = `Coin information: ${JSON.stringify(document)}`;
    // Include the data in the prompt
    const prompt = `Analyze the following data and say is it worth to invest: ${dataString}`;

    // Define the prompt message
    const promptMessage = {
      role: 'system',//?????????????
      content: prompt
    };

    // Make the API request
    // openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo-16k',
    //   messages: [promptMessage],
    //   temperature: 0.7
    // })
    //   .then((response: any) => {
    //     console.log(response.choices[0].message.content);
    //   })
    //   .catch((error: any) => {
    //     console.error(error);
    //   });
  })

  const protocols = ['Lido', 'aave']; 

  protocols.forEach(async (protocol) => {
    cron.schedule('*/1 * * * *', async () => {
      // Schedule the historicalTvl function to run every hour
      const req = { params: { protocol } } as unknown as express.Request;
      const res = { json: (data: any) => console.log(data) } as express.Response;

      console.log(await historicalTvl(req, res));
   });
  });

  const protocols1 = ['aave-v2', 'lido']; 
  
  protocols1.forEach(protocol => {
    // Schedule the historicalYields function to run every hour
    cron.schedule('*/1 * * * *', async () => {
      const req = { params: { protocol } } as unknown as express.Request;
      const res = { json: (data: any) => console.log(data) } as express.Response;
      console.log(await historicalYields(req, res));
    });
  });

  const coinIds = ['lido-dao', 'aave']; // Add more coin IDs as needed
  
  coinIds.forEach(async id => {
    // Schedule the coinData function to run every hour
    cron.schedule('*/2 * * * *', async () => {
      const req = { params: { id } } as unknown as express.Request;
      const res = { json: (data: any) => console.log(data) } as express.Response;
      console.log(await coinData(req, res));
    });
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
