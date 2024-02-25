import express from 'express';
import cron from 'node-cron';
import { OpenAI } from 'openai';

import { getCoinByName, getCoins } from '../db/coins';
import { getPoolsByProject } from '../db/pool';
import { getProtocolByName } from '../db/protocolHistoricalTVL';

export function scheduleTask(protocol: string, task: Function) {
    cron.schedule('0 * * * *', async () => {
      const req = { params: { protocol } } as unknown as express.Request;
      const res = { json: (data: any) => console.log(data) } as express.Response;
      console.log(await task(req, res));
    });
}

export async function analyzeCoin(coinName: string, openai: OpenAI) {  
    const coin = await getCoinByName(coinName);
    const pools = await getPoolsByProject(coinName);
    const historyTvl = await getProtocolByName(coinName);
    const dataString = `Coin information: ${JSON.stringify(coin)} \n Pools: ${JSON.stringify(pools)} \n Historical TVL: ${JSON.stringify(historyTvl)}`;
    const prompt = `Analyze the following data and say is it worth to invest: ${dataString}`;

    // Make the API request here...
    try {
      const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo-16k',
          messages: [{ role: 'system', content: prompt }],
          temperature: 0.7
      });
      return response.choices[0].message.content;
  } catch (error) {
      throw new Error(error);
  }
}