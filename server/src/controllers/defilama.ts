import express from 'express';
import axios from 'axios';

import { updateProtocolById, getProtocolByName } from "../db/protocolHistoricalTVL";
import { updatePoolById, getPoolByPool } from "../db/pool";
import { createProtocol } from '../db/protocolHistoricalTVL';
import { createPool } from '../db/pool';

import { filterDataByChainAndProject } from "../helpers";

export const historicalTvl = async (req: express.Request, res: express.Response) => {
  try {
    let protocolName = req.params.protocol;

    const response = await axios.get(`${process.env.DEFLAMA_BASE_URL}/protocol/${protocolName}`);

    let totalTvl = response.data.tvl || [];

    // Convert UNIX timestamps to Date objects
    totalTvl = totalTvl.map((item: any) => ({
      date: new Date(item.date * 1000), // JavaScript Date expects milliseconds
      totalLiquidityUSD: item.totalLiquidityUSD,
    }));

    // Sort by date in descending order
    totalTvl.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Take the first 30 items
    totalTvl = totalTvl.slice(0, 30);


    const protocol = await getProtocolByName(protocolName);
    const updatedProtocol = await updateProtocolById(protocol._id, totalTvl );

   // const updatedProtocol = await createProtocol(protocolName, totalTvl);

    res.json(updatedProtocol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const historicalYields = async (req: express.Request, res: express.Response) => {
  try {
    const protocolName = req.params.protocol;

    const response = await axios.get(`${process.env.DEFILAMA_YIELDS_URL}/pools`);

    const filteredData = filterDataByChainAndProject(response.data.data, protocolName);

    const savedData = [];
    for (const item of filteredData) {
        const pool = await getPoolByPool(item.pool);
        const savedItem = await updatePoolById(pool._id, item);
      // const savedItem = await createPool(item);
      savedData.push(savedItem);
    }

    res.json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
