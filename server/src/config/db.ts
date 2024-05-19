import mongoose from "mongoose";

async function connectDB(retries = 1) {
    while (retries) {
        try {
            await mongoose.connect(`${process.env.MONGO_URI}`);
            console.log("Connected to MongoDB");
            return;
        } catch (error) {
            retries -= 1;
            console.log(`Retrying to connect to MongoDB... ${retries} retries left.`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
    console.error("Failed to connect to MongoDB");
    process.exit(1);
}

export { connectDB }