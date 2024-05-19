import { PoolModel } from '../db/pool';


const nameMap: Record<string, string> = {
    'compound': 'compound-v2',
    'aave': 'aave-v2',
    'lido-dao': 'lido',
    'compound-0x': 'compound-v2',
};


export const getPools = () => PoolModel.find({});
export const getPoolsByProject = (project: string) => {
    const projectName = nameMap[project] || project;
    return PoolModel.find({  project: projectName }).then((pools: any) => pools.map((pool: any) => pool.toObject()));
}
export const getPoolById = (id: String) => PoolModel.findById(id);
export const getPoolByPool = (pool: String) => PoolModel.findOne({ pool }).then((pool: any) => pool ? pool.toObject() : null);
export const createPool = (data: any) => PoolModel.create(data).then((pool: any) => pool);
export const updatePoolById = (id: String, values: Record<string, any>) => PoolModel.findByIdAndUpdate(id, {$set: values}, {new: true}).then((pool: any) => pool.toObject());
export const deletePoolById = (id: String) => PoolModel.findByIdAndDelete(id);
