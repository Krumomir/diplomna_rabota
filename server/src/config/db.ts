import mongoose from "mongoose";

const uri = "mongodb+srv://krumastefanov2019:X0cuZHN6hju3E2Pe@cluster0.tljopjw.mongodb.net/?retryWrites=true&w=majority";

async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

export { connectDB }