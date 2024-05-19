import express from 'express';
import axios from 'axios';

import { updateProtocolById, getProtocolByName } from '../services/historicalValueService';
import { updatePoolById, getPoolByPool, getPoolsByProject, createPool } from '../services/poolService';

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

    res.json(updatedProtocol);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
        let savedItem;
        if (!pool) {
          savedItem = await createPool(item);
        }
        else
          savedItem = await updatePoolById(pool._id, item);

      savedData.push(savedItem);
    }

    res.json(savedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHistoricalTvl = async (req: express.Request, res: express.Response) => {
  try {
    const protocolName = req.params.protocol;

    const protocol = await getProtocolByName(protocolName);

    res.json(protocol);
  } catch (error) {
    res.status(500).json({ message: "There was an error fetching data from the database" });
  }
}

export const getHistoricalYields = async (req: express.Request, res: express.Response) => {
  try {
    const protocolName = req.params.protocol;

    const pools = await getPoolsByProject(protocolName);

    res.json(pools);
  } catch (error) {
    res.status(500).json({ message: "There was an error fetching data from the database" });
  }
}
