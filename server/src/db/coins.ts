const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
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
  platforms: {
    ethereum: String,
    "near-protocol": String,
    avalanche: String,
    sora: String,
    "optimistic-ethereum": String,
    "huobi-token": String,
    "polygon-pos": String,
    fantom: String,
    "harmony-shard-0": String,
    "binance-smart-chain": String,
    energi: String,
  },
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
    price_change_24h_in_currency: Number,
    price_change_percentage_1h_in_currency: Number,
    price_change_percentage_24h_in_currency: Number,
    price_change_percentage_7d_in_currency: Number,
    price_change_percentage_14d_in_currency: Number,
    price_change_percentage_30d_in_currency: Number,
    price_change_percentage_60d_in_currency: Number,
    price_change_percentage_200d_in_currency: Number,
    price_change_percentage_1y_in_currency: Number,
    market_cap_change_24h_in_currency: Number,
    market_cap_change_percentage_24h_in_currency: Number,
    total_supply: Number,
    max_supply: Number,
    circulating_supply: Number,
    price_change_percentage_1h: Number,
  },

}, { timestamps: true, _id: false});

export const coinModel = mongoose.model('Coin', coinSchema);

export const getCoinById = (id: String) => coinModel.findById(id);
export const getCoins = () => coinModel.find({});
export const createCoin = (data: any) => coinModel.create(data).then((coin: any) => coin.toObject());
export const deleteCoinById = (id: String) => coinModel.findByIdAndDelete(id);
export const updateCoinById = (id: String, values: Record<string, any>) => coinModel.findByIdAndUpdate(id, values).then((coin: any) => coin.toObject());
