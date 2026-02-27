import { chatClient } from "../utils/stream.js";

export async function getStreamToken(req, res) {
    try {
        const token = chatClient.createToken(req.user.clerkId);
        res.status(200).json({
            token,
            userId: req.user.clerkId,
            username: req.user.username,
            userImage: req.user.imageUrl
        });
    } catch (error) {
        console.error('Error generating Stream token:', error);
        res.status(500).json({ error: 'Failed to generate Stream token' });
    }
}