import crypto from 'crypto';
import Stripe from 'stripe';
import dotenv from 'dotenv';

import { subscribeUser, unsubscribeUser } from "../services/userService";
dotenv.config();

const SECRET = process.env.SESSION_TOKEN_SECRET

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};

export const processResponse = (response: any) => {
    const usdKeys = [
        'ath',
        'atl',
        'ath_change_percentage',
        'atl_change_percentage',
        'market_cap',
        'fully_diluted_valuation',
        'total_volume',
        'high_24h',
        'low_24h',
        'current_price',
        'ath_date',
        'atl_date'
    ];

    const deleteKeys = [
        'block_time_in_minutes',
        'hashing_algorithm',
        'preview_listing',
        'public_notice',
        'additional_notices',
        'image',
        'blockchain_site',
        'official_forum_url',
        'chat_url',
        'announcement_url',
        'categories',
        'detail_platforms',
        'last_updated',
        'status_updates',
        'id'
    ];
    const deleteMarketDataKeys = [
        'price_change_24h_in_currency',
        'price_change_percentage_1h_in_currency',
        'price_change_percentage_24h_in_currency',
        'price_change_percentage_7d_in_currency',
        'price_change_percentage_14d_in_currency',
        'price_change_percentage_30d_in_currency',
        'price_change_percentage_60d_in_currency',
        'price_change_percentage_200d_in_currency',
        'price_change_percentage_1y_in_currency',
        'market_cap_change_24h_in_currency',
        'market_cap_change_percentage_24h_in_currency',
    ];

    deleteMarketDataKeys.forEach((key: string) => {
        delete response.market_data[key];
    });

    const usdValues = usdKeys.reduce((acc: any, key: string) => {
        acc[key] = response.market_data[key]?.usd;
        return acc;
    }, {});

    deleteKeys.forEach((key: string) => {
        const keyParts = key.split('.');
        if (keyParts.length === 1) {
            delete response[key];
        } else {
            delete response[keyParts[0]][keyParts[1]];
        }
    });

    response.platforms = Object.keys(response.platforms);
    response.market_data = { ...response.market_data, ...usdValues };

    return response;
};

export const filterDataByChainAndProject = (data: any, project: string) => {
    if (!Array.isArray(data)) {
        throw new TypeError('data must be an array');
    }

    return data.filter((item: { project: string; }) => item.project === project);
}

export const handleStripeEvent = (event: Stripe.Event) => {
    switch (event.type) {
        case "checkout.session.completed":
            const checkoutSession = event.data.object;
            const userEmail = checkoutSession.customer_details.email;
            subscribeUser(userEmail, checkoutSession.subscription.toString());
            break;
        case "customer.subscription.deleted":
            const subscription = event.data.object;
            unsubscribeUser(subscription.id.toString());
            break;
        case "invoice.payment_failed":
            const invoice = event.data.object;
            unsubscribeUser(invoice.subscription.toString());
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
}