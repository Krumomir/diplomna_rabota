import { coinModel } from '../db/coins';

export const getCoinById = (id: string) => coinModel.findById(id);
export const getCoinByName = (name: string) => {
  const nameMap: Record<string, string> = {
    'lido': 'Lido DAO',
    'compound': 'c0x',
    'aave': 'Aave',
    'lido-dao': 'Lido DAO',
    'compound-0x': 'c0x',
  };
  const coinName = nameMap[name] || name;
  return coinModel.findOne({ name: coinName });
}
export const getSimplifiedCoins = () => coinModel.find({}, { name: 1, symbol: 1, "market_data.current_price": 1 });
export const getCoins = () => coinModel.find({}).then((coins: any) => coins.map((coin: any) => coin.toObject()));
export const createCoin = (data: any): Promise<any> => coinModel.create(data).then((coin: any) => coin.toObject());
export const deleteCoinById = (id: String) => coinModel.findByIdAndDelete(id);
export const updateCoinById = (id: String, values: Record<string, any>) => coinModel.findByIdAndUpdate(id, values, { new: true }).select('+recommendation').then((coin: any) => coin.toObject());