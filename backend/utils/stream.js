import { StreamChat } from "stream-chat"
import { StreamClient } from "@stream-io/node-sdk"
import dotenv from "dotenv"
dotenv.config({ quiet: true })

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if (!apiKey || !apiSecret) {
    throw new Error('STREAM_API_KEY Or STREAM_API_SECRET is missing')
}

// Video Call Features
export const streamClient = new StreamClient(apiKey, apiSecret);

// Chat Features
export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await chatClient.upsertUser(userData);
        console.log("Stream User Upserted Successfully!", userData);
        return userData;
    } catch (error) {
        console.error('Error upserting Stream user:', error);
        throw error;
    }
}

export const deleteStreamUser = async (userId) => {
    try {
        await chatClient.deleteUser(userId);
        console.log("Stream User Deleted Successfully!", userId);
    } catch (error) {
        console.error('Error deleting Stream user:', error);
        throw error;
    }
}
