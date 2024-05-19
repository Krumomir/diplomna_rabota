import express from 'express';
import axios from 'axios';

import { processResponse } from '../helpers';
import { getCoinByName, updateCoinById, getSimplifiedCoins } from '../services/coinService';

import { getUserById } from "../services/userService";
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

    console.log(recommendation);

    const coin = await getCoinByName(processedResponse.name);
    const updatedCoin = await updateCoinById(coin._id, processedResponse);

    res.json(updatedCoin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCoinInfoByName = async (req: any, res: express.Response) => {
  try {
    const coinName = req.params.name;
    const userId = req.identity._id;
    
    if (!coinName) {
      return res.status(400).json({ message: 'Empty coin name' });
    }

    if (!userId) {
      return res.status(400).json({ message: 'Empty user id' });
    }

    const user = await getUserById(userId);

    let response;
    if (user.subscription.subscribed === false) {
      response = await getCoinByName(coinName);
    } else {
      response = await getCoinByName(coinName).select('+recommendation');
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "There was an error fetching data from the database" });
  }
}

export const getAllCoins = async (req: express.Request, res: express.Response) => {
  try {
    const coins = await getSimplifiedCoins();
    res.json(coins);
  } catch (error) {
    res.status(500).json({ message: "There was an error fetching data from the database" });
  }
};