const mongoose = require('mongoose');

const protocolHistoricalValueSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  historicalValues: [
    {
      date: {
        type: Date,
        required: true,
      },
      totalLiquidityUSD: {
        type: Number,
        required: true,
      },
    }
  ]
}, { timestamps: true });

export const ProtocolHistoricalTVLModel = mongoose.model("ProtocolHistoricalTVL", protocolHistoricalValueSchema);

export const getProtocols = () => ProtocolHistoricalTVLModel.find({});
export const getProtocolById = (id: String) => ProtocolHistoricalTVLModel.findById(id);
export const createProtocol = (data: any) => ProtocolHistoricalTVLModel.create(data).then((protocol: any) => protocol.toObject());
export const updateProtocolById = (id: String, values: Record<string, any>) => ProtocolHistoricalTVLModel.findByIdAndUpdate(id, values);
export const deleteProtocolById = (id: String) => ProtocolHistoricalTVLModel.findByIdAndDelete(id);