import express from 'express';
import axios from 'axios';

import { processResponse } from '../helpers';
import { createCoin, getSimplifiedCoins } from '../db/coins';
import { getCoinByName } from "../db/coins";

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

    console.log('Processed Response:', processedResponse);

   //  const coin = await createCoin(processedResponse);

    res.json(processedResponse);
  } catch (error) {
    console.error('Error fetching coin data:', error);
  }
};

export const getCoinInfoByName = async (req: express.Request, res: express.Response) => {
  try {
    const coinName = req.params.name;
    const response = await getCoinByName(coinName);
    res.json(response);
  } catch (error) {
    console.error('Error fetching coin by name:', error);
  }
}

export const getAllCoins = async (req: express.Request, res: express.Response) => {
  try {
    const coins = await getSimplifiedCoins();
    res.json(coins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};