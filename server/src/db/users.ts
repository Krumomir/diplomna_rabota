import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    subscription: {
        subscribed: {type: Boolean, default: false},
        sub_id: {type: String, select: false},
    },
    authentication: {
        password: {type: String, required: true, select: false},
        sessionToken: {type: String, select: false},
    },
});

export const UserModel = mongoose.model("User", UserSchema);
