import express from 'express';
import axios from 'axios';

import { processResponse } from '../helpers';
import { createCoin, getSimplifiedCoins, updateCoinById } from '../db/coins';
import { getCoinByName } from "../db/coins";
import { OpenAI } from 'openai';
import { analyzeCoin } from "../controllers/cronjob";

export const coinData = async (req: express.Request, res: express.Response) => {
  try {
    const coinId = req.params.protocol;
    const { data } = await axios.get(`${process.env.COINGECKO_BASE_URL}/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      }
    });

    const processedResponse = processResponse(data);

    const recommendation = await analyzeCoin(coinId, new OpenAI(
      {
        apiKey: process.env.OPENAI_API_KEY,
      }
    )); 

    processedResponse.recommendation = recommendation;

    const coin = await getCoinByName(processedResponse.name);
    const updatedCoin = await updateCoinById(coin._id, processedResponse);

    res.json(updatedCoin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCoinInfoByName = async (req: express.Request, res: express.Response) => {
  try {
    const coinName = req.params.name;
    const response = await getCoinByName(coinName);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
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