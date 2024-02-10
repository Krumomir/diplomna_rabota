import crypto from 'crypto';
import { size } from 'lodash';

const SECRET = 'mysecretkey';

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};

export const processResponse = (response: any) => {
    // Extracting only the USD values
    const usdValues = {
        price_change_percentage_1h: response.market_data.price_change_percentage_1h_in_currency.usd,
        price_change_percentage_24h: response.market_data.price_change_percentage_24h_in_currency.usd,
        price_change_percentage_7d: response.market_data.price_change_percentage_7d_in_currency.usd,
        price_change_percentage_14d: response.market_data.price_change_percentage_14d_in_currency.usd,
        price_change_percentage_30d: response.market_data.price_change_percentage_30d_in_currency.usd,
        price_change_percentage_60d: response.market_data.price_change_percentage_60d_in_currency.usd,
        price_change_percentage_200d: response.market_data.price_change_percentage_200d_in_currency.usd,
        price_change_percentage_1y: response.market_data.price_change_percentage_1y_in_currency.usd,
        market_cap_change_24h: response.market_data.market_cap_change_24h_in_currency.usd,
        market_cap_change_percentage_24h: response.market_data.market_cap_change_percentage_24h_in_currency.usd,
        ath: response.market_data.ath.usd,
        ath_change_percentage: response.market_data.ath_change_percentage.usd,
        atl: response.market_data.atl.usd,
        atl_change_percentage: response.market_data.atl_change_percentage.usd,
        market_cap: response.market_data.market_cap.usd,
        fully_diluted_valuation: response.market_data.fully_diluted_valuation.usd,
        total_volume: response.market_data.total_volume.usd,
        high_24h: response.market_data.high_24h.usd,
        low_24h: response.market_data.low_24h.usd,
        current_price: response.market_data.current_price.usd,  
        ath_date: response.market_data.ath_date.usd,
        atl_date: response.market_data.atl_date.usd,
        price_change_24h_in_currency: response.market_data.price_change_24h_in_currency.usd,
        price_change_percentage_1h_in_currency: response.market_data.price_change_percentage_1h_in_currency.usd,
        price_change_percentage_24h_in_currency: response.market_data.price_change_percentage_24h_in_currency.usd,
        price_change_percentage_7d_in_currency: response.market_data.price_change_percentage_7d_in_currency.usd,
        price_change_percentage_14d_in_currency: response.market_data.price_change_percentage_14d_in_currency.usd,
        price_change_percentage_30d_in_currency: response.market_data.price_change_percentage_30d_in_currency.usd,
        price_change_percentage_60d_in_currency: response.market_data.price_change_percentage_60d_in_currency.usd,
        price_change_percentage_200d_in_currency: response.market_data.price_change_percentage_200d_in_currency.usd,
        price_change_percentage_1y_in_currency: response.market_data.price_change_percentage_1y_in_currency.usd,
        market_cap_change_24h_in_currency: response.market_data.market_cap_change_24h_in_currency.usd,
        market_cap_change_percentage_24h_in_currency: response.market_data.market_cap_change_percentage_24h_in_currency.usd
    };

    delete response.image;
    delete response.links.blockchain_site;
    delete response.links.official_forum_url;
    delete response.links.chat_url;
    delete response.links.announcement_url;
    delete response.categories;
    delete response.detail_platforms;
    delete response.market_data.last_updated;
    delete response.last_updated;
    delete response.status_updates;

    // Update the fields within the market_data object with the extracted USD values
    response.market_data = {
        ...response.market_data,
        ...usdValues
    };

    // Return the modified response
    return response;
};

export const filterDataByChainAndProject = (data: any, chain: string, project: string) => {
    if (!Array.isArray(data)) {
        throw new TypeError('data must be an array');
    }

    return data.filter((item: { chain: string; project: string; }) => item.chain === chain && item.project === project);
  }
  
  