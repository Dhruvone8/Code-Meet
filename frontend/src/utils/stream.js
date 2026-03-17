import { Call, StreamCall, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk"
const streamKey = import.meta.env.VITE_STREAM_API_KEY

let client = null

export const initializeStreamClient = async (user, token) => {

    // If client exists with same user instead of creating it return it
    if (client && client?.user?.id === user.id) {
        return client
    }

    // Always disconnect existing client before creating new one
    if (client) {
        await disconnectFromStreamClient();
    }

    if (!streamKey) throw new Error("Stream API key is required")

    // Create new client
    client = new StreamVideoClient({
        apiKey: streamKey,
        user,
        token
    })

    return client
}

export const disconnectFromStreamClient = async () => {
    if (client) {
        try {
            await client.disconnectUser();
            client = null;
        } catch (error) {
            console.error("Error disconnecting from Stream:", error);
        }
    }
}