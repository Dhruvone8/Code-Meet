import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/CodeMeet`);

        console.log(`🗄️ MongoDB Connected Successfully ✅`);
        console.log(`🌐 Host: ${conn.connection.host} 🚀`);
    } 
    catch (error) {
        console.error(`❌ Database Connection Failed 💥`);
        console.error(`⚠️ Error: ${error.message}`);

        process.exit(1);
    }
};