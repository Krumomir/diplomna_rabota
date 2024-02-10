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
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  historicalValues: [historicalValueSchema],
}, { timestamps: true, _id: false});

export const ProtocolHistoricalTVLModel = mongoose.model("ProtocolHistoricalTVL", protocolHistoricalValueSchema);

export const getProtocols = () => ProtocolHistoricalTVLModel.find({});
export const getProtocolById = (id: String) => ProtocolHistoricalTVLModel.findById(id);
export const createProtocol = (data: any) => ProtocolHistoricalTVLModel.create(data).then((protocol: any) => protocol.toObject());
export const updateProtocolById = (id: String, values: Record<string, any>) => 
  ProtocolHistoricalTVLModel.findByIdAndUpdate(id, { $set: { historicalValues: values } }, { new: true })
    .then((protocol: any) => protocol.toObject());
export const deleteProtocolById = (id: String) => ProtocolHistoricalTVLModel.findByIdAndDelete(id);