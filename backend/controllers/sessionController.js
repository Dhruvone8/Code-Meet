import Session from "../models/Session.js";
import { StreamClient } from "../utils/stream.js";
import { chatClient } from "../utils/stream.js";

export async function createSession(req, res) {
    try {

        // Get session data from request body
        const { problem, difficulty } = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        // Input Validation
        if (!problem || !difficulty) {
            return res.status(400).json({ error: 'Problem and difficulty are required' });
        }

        // Generate a unique call Id for stream video
        const callId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 10)}`;

        // Create Session in database
        const session = await Session.create({
            problem,
            difficulty,
            host: userId,
            callId
        })

        // Create Stream Video Call
        await StreamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: { problem, difficulty, sessionId: session._id.toString() }
            }
        });

        // Chat Messaging
        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} - ${difficulty}`,
            created_by_id: clerkId,
            members: [clerkId]
        })

        await channel.create()

        res.status(201).json({ session })

    } catch (error) {
        console.error('Error creating session:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
