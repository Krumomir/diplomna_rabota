import express from 'express';
import cron from 'node-cron';
import { OpenAI } from 'openai';

import { getCoinByName } from '../services/coinService';
import { getPoolsByProject } from '../services/poolService';
import { getProtocolByName } from '../services/historicalValueService';

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
  //const prompt = `Compose a comprehensive analysis of a selected cryptocurrency project within the realm of crypto investments. Your analysis should include an evaluation of the project's technological innovation, team expertise, market potential, and overall viability as an investment opportunity. Ensure your analysis is structured and thoroughly researched, catering to professionals in the field. Utilize formal language and present your findings in a clear and concise manner:\n ${dataString}`;
const prompt = `As a professional in the field of crypto investments, your task is to conduct a thorough analysis of the specified crypto projects. Your analysis should be comprehensive and structured in a clear, formal manner. Please ensure that the text is divided into distinct paragraphs, each focusing on a specific aspect of the projects.\nProject Overview\nProvide a brief introduction to each crypto project. Include essential details such as the project's name, founding team, and launch date.\n\nTechnology and Innovation\nDiscuss the underlying technology of each project. Highlight any unique features or innovations that distinguish it from other crypto projects.\n\nMarket Performance\nAnalyze the historical and current market performance of the projects. Include relevant metrics such as market capitalization, trading volume, and price trends.\n\nUse Case and Adoption\nEvaluate the practical applications and use cases of the projects. Examine their adoption rates and any notable partnerships or endorsements.\n\nRisk Assessment\nIdentify potential risks associated with investing in each project. Consider factors such as regulatory challenges, security concerns, and market volatility.\n\nFuture Prospects\nOffer your insights on the future outlook for the projects. Discuss any upcoming developments, roadmap milestones, or future plans that could impact their success.\n\nBy following this structure, your analysis will be organized and focused, providing valuable insights into the potential of these crypto projects for investment.:\n ${dataString}`
  // Make the API request here...
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      messages: [{ role: 'system', content: prompt }],
      temperature: 0.7
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.log(error.message);
  }
}