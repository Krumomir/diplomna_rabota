const mongoose = require('mongoose');

const poolSchema = new mongoose.Schema({
    chain: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    symbol: String,
    tvlUsd: Number,
    apyBase: Number,
    apyReward: Number,
    apy: Number,
    rewardTokens: [String],
    pool: String,
    apyPct1D: Number,
    apyPct7D: Number,
    apyPct30D: Number,
    stablecoin: Boolean,
    ilRisk: String,
    exposure: String,
    predictions: {
        predictedClass: String,
        predictedProbability: Number,
        binnedConfidence: Number
    },
    poolMeta: {
        type: String,
        allowNull: true
    },
    mu: Number,
    sigma: Number,
    count: Number,
    outlier: Boolean,
    underlyingTokens: [String],
    il7d: Number,
    apyBase7d: Number,
    apyMean30d: Number,
    volumeUsd1d: Number,
    volumeUsd7d: Number,
    apyBaseInception: Number
});

export const PoolModel = mongoose.model('Pool', poolSchema);
