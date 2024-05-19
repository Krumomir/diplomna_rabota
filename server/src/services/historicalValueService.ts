import { ProtocolHistoricalTVLModel } from '../db/protocolHistoricalTVL';


const nameMap: Record<string, string> = {
    'compound': 'Compound-v2',
    'lido-dao': 'lido',
    'compound-0x': 'Compound-v2',
  };
  
  export const getProtocols = () => ProtocolHistoricalTVLModel.find({});
  export const getProtocolById = (id: String) => ProtocolHistoricalTVLModel.findById(id);
  export const createProtocol = async (name: String, values: Record<string, any>) => {
    try {
      const protocol = await ProtocolHistoricalTVLModel.create({ name: name, historicalValues: values });
      return protocol.toObject();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const updateProtocolById = (id: String, values: Record<string, any>) =>
    ProtocolHistoricalTVLModel.findByIdAndUpdate(id, { $set: { historicalValues: values } }, { new: true })
      .then((protocol: any) => protocol.toObject());
  export const getProtocolByName = (name: string) => {
    const protocolName = nameMap[name] || name;
    return ProtocolHistoricalTVLModel.findOne ({ name: protocolName });}
  export const deleteProtocolById = (id: String) => ProtocolHistoricalTVLModel.findByIdAndDelete(id);