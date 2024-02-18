import express from 'express';
import axios from 'axios';

import { updateProtocolById } from "../db/protocolHistoricalTVL";
import { updatePoolById, getPoolByPool } from "../db/pool";
import { createProtocol } from '../db/protocolHistoricalTVL';
import { createPool } from '../db/pool';

import { filterDataByChainAndProject } from "../helpers";
import { get } from 'lodash';

export const historicalTvl = async (req: express.Request, res: express.Response) => {
  try {
    const protocolName = req.params.protocol;

    const response = await axios.get(`${process.env.DEFLAMA_BASE_URL}/protocol/${protocolName}`);

    let totalTvl = response.data.tvl || [];

    // Convert UNIX timestamps to Date objects
    totalTvl = totalTvl.map((item: any) => ({ // Explicitly specify the type of 'item'
      date: new Date(item.date * 1000), // UNIX timestamp is in seconds, JavaScript Date expects milliseconds
      totalLiquidityUSD: item.totalLiquidityUSD,
    }));

    //  const pool = await createProtocol(protocolName, totalTvl);

    res.json(totalTvl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//uniqe id ?
export const historicalYields = async (req: express.Request, res: express.Response) => {
  try {
    const protocolName = req.params.protocol;

    const response = await axios.get(`${process.env.DEFILAMA_YIELDS_URL}/pools`);

    const filteredData = filterDataByChainAndProject(response.data.data, "Ethereum", protocolName);


    const savedData = [];
    for (const item of filteredData) {
      //  const pool = await getPoolByPool(item.pool);
      //  const savedItem = await updatePoolById(pool._id, item);
     // const savedItem = await createPool(item);
      savedData.push(item);
    }

    res.json(savedData);
  } catch (error) {
    console.error('Error fetching yields:', error);
    res.status(500).json({ error: error.message });
  }
};
