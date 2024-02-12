import express from 'express';
import axios from 'axios';

import { processResponse } from '../helpers';
import { updateCoinById, getCoins } from '../db/coins';

export const coinData = async (req: express.Request, res: express.Response) => {
  try {
      const coinId = req.params.id;
      const { data } = await axios.get(`${process.env.COINGECKO_BASE_URL}/coins/${coinId}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
        headers: {
          'Content-Type': 'application/json',
          'X-CoinGecko-API-Key': process.env.COINGECKO_API_KEY,
        },
      });

      const processedResponse = processResponse(data);

      const coin = await updateCoinById(data.id, processedResponse);

      res.json(coin);
    } catch (error) {
      console.error('Error fetching coin data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAllCoins = async (req: express.Request, res: express.Response) => {
  try {
    const coins = await getCoins();
    res.json(coins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};