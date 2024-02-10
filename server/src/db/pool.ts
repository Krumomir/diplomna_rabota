const mongoose = require('mongoose');

const schema = new mongoose.Schema({
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

export const PoolModel = mongoose.model('Pool', schema);

export const getPools = () => PoolModel.find({});
export const getPoolById = (id: String) => PoolModel.findById(id);
export const createPool = (data: any) => PoolModel.create(data).then((pool: any) => pool);
export const updatePoolById = (id: String, values: Record<string, any>) => PoolModel.findByIdAndUpdate(id, values);
export const deletePoolById = (id: String) => PoolModel.findByIdAndDelete(id);
