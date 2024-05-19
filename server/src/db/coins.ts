const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  web_slug: String,
  asset_platform_id: String,
  platforms: [String],
  description: {
    en: String,
  },
  links: {
    homepage: [String],
    whitepaper: String,
    twitter_screen_name: String,
    facebook_username: String,
    bitcointalk_thread_identifier: Number,
    telegram_channel_identifier: String,
    subreddit_url: String,
    repos_url: {
      github: [String],
      bitbucket: [String],
    },
  },
  country_origin: String,
  genesis_date: Date,
  contract_address: String,
  sentiment_votes_up_percentage: Number,
  sentiment_votes_down_percentage: Number,
  watchlist_portfolio_users: Number,
  market_cap_rank: Number,
  market_data: {
    current_price: Number,
    total_value_locked: {
      btc: Number,
      usd: Number,
    },
    mcap_to_tvl_ratio: Number,
    fdv_to_tvl_ratio: Number,
    roi: Number,
    ath: Number,
    ath_change_percentage: Number,
    ath_date: Date,
    atl: Number,
    atl_change_percentage: Number,
    atl_date: Date,
    market_cap: Number,
    market_cap_rank: Number,
    fully_diluted_valuation: Number,
    market_cap_fdv_ratio: Number,
    total_volume: Number,
    high_24h: Number,
    low_24h: Number,
    price_change_24h: Number,
    price_change_percentage_24h: Number,
    price_change_percentage_7d: Number,
    price_change_percentage_14d: Number,
    price_change_percentage_30d: Number,
    price_change_percentage_60d: Number,
    price_change_percentage_200d: Number,
    price_change_percentage_1y: Number,
    market_cap_change_24h: Number,
    market_cap_change_percentage_24h: Number,
    total_supply: Number,
    max_supply: Number,
    circulating_supply: Number,
    price_change_percentage_1h: Number,
  },
  recommendation: {
    type: String,
    default: '',
    select: false
  }
}, { timestamps: true });

export const coinModel = mongoose.model('Coin', coinSchema);

const nameMap: Record<string, string> = {
  'lido': 'Lido DAO',
  'compound': 'c0x',
  'aave': 'Aave',
  'lido-dao': 'Lido DAO',
  'compound-0x': 'c0x',
};

export const getCoinById = (id: string) => coinModel.findById(id);
export const getCoinByName = (name: string) => {
  const coinName = nameMap[name] || name;
  return coinModel.findOne({ name: coinName });
}
export const getSimplifiedCoins = () => coinModel.find({}, { name: 1, symbol: 1, "market_data.current_price": 1 });
export const getCoins = () => coinModel.find({}).then((coins: any) => coins.map((coin: any) => coin.toObject()));
export const createCoin = (data: any): Promise<any> => coinModel.create(data).then((coin: any) => coin.toObject());
export const deleteCoinById = (id: String) => coinModel.findByIdAndDelete(id);
export const updateCoinById = (id: String, values: Record<string, any>) => coinModel.findByIdAndUpdate(id, values).select('+recommendation').then((coin: any) => coin.toObject());
