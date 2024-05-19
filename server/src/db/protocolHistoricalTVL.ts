const mongoose = require('mongoose');

const historicalValueSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  totalLiquidityUSD: {
    type: Number,
    required: true,
  },
}, { _id: false });

const protocolHistoricalValueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  historicalValues: [historicalValueSchema],
}, { timestamps: true });

export const ProtocolHistoricalTVLModel = mongoose.model("ProtocolHistoricalTVL", protocolHistoricalValueSchema);
