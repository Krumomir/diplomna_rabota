export const API_ENDPOINTS = {
    REGISTER: 'auth/register',
    LOGIN: 'auth/login',
    LOGOUT: '/logout',
    USER: id => `/user/${id}`,
    COIN_DATA: '/coingecko/coins',
    DETAILED_COIN_DATA: name => `/coingecko/coin-data/${name}`,
    COIN_HISTORY: name => `/defilama/historical-tvl/${name}`,
    STRIPE_CANCEL_SUBSCRIPTION: id => `/stripe/cancel-subscription/${id}`
  };