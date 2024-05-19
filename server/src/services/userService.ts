import { UserModel } from '../db/users';

export const subscribeUser = async (email: String, sub_id: String) => {
    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { email },
            { 'subscription.subscribed': true, 'subscription.sub_id': sub_id },
            { new: true, select: '+subscription.sub_id' } 
        );

        return updatedUser;
    } catch (error) {
        console.error(`Error subscribing user: ${error}`);
        throw error;
    }
};


export const unsubscribeUser = async (sub_id : String) => {
    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { 'subscription.sub_id': sub_id },
            { 'subscription.subscribed': false, 'subscription.sub_id': null },
            { new: true, select: '+subscription.sub_id' } 
        );

        return updatedUser;
    } catch (error) {
        console.error(`Error unsubscribing user: ${error}`);
        throw error;
    }
};

export const getUsers = () => UserModel.find({});
export const getUserByEmail = (email: String) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken: String) => UserModel.findOne(
    {"authentication.sessionToken": sessionToken
});
export const getUserById = (id: String) => UserModel.findById(id);
export const createUser = (data: any) => UserModel.create(data);
export const deleteUserById = (id: String) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id: String, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);