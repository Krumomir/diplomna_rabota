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

export const getProtocols = () => ProtocolHistoricalTVLModel.find({});
export const getProtocolById = (id: String) => ProtocolHistoricalTVLModel.findById(id);
export const createProtocol = async (name: String, values: Record<string, any>) => {
  try {
    const protocol = await ProtocolHistoricalTVLModel.create({ name: name, historicalValues: values });
    return protocol.toObject();
  } catch (error) {
    console.error('Failed to create protocol:', error);
    return null;
  }
};

export const updateProtocolById = (id: String, values: Record<string, any>) =>
  ProtocolHistoricalTVLModel.findByIdAndUpdate(id, { $set: { historicalValues: values } }, { new: true })
    .then((protocol: any) => protocol.toObject());
export const getProtocolByName = (name: String) => ProtocolHistoricalTVLModel.findOne ({ name: name });
export const deleteProtocolById = (id: String) => ProtocolHistoricalTVLModel.findByIdAndDelete(id);