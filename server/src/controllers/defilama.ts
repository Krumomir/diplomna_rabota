import express from 'express';
import axios from 'axios';

import { updateProtocolById } from "../db/protocolHistoricalTVL";
import { updatePoolById } from "../db/pool";
import { filterDataByChainAndProject } from "../helpers";

export const historicalTvl = async (req: express.Request, res: express.Response) => {
    try {
        const protocolName = req.params.protocol;
    
        const response = await axios.get(`${process.env.DEFLAMA_BASE_URL}/protocol/${protocolName}`);
    
        const totalTvl = response.data.tvl || [];
    
        const historicalTvl = await updateProtocolById(protocolName, totalTvl);
    
        res.json(historicalTvl);
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
      //   const savedItem = await updatePool(item);
          savedData.push(item);
        }
    
        res.json(savedData);
      } catch (error) {
        console.error('Error fetching yields:', error);
        res.status(500).json({ error: error.message });
      }
};
