import Session from "../models/Session.js";
import { StreamClient } from "@stream-io/node-sdk"
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

        const call = StreamClient.video.call("default", callId)

        // Create Stream Video Call
        await call.getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: { problem, difficulty, sessionId: session._id.toString() }
            }
        });

        let session;
        try {
            const channel = chatClient.channel("messaging", callId, {
                name: `${problem} - ${difficulty}`,
                created_by_id: clerkId,
                members: [clerkId]
            });

            await channel.create()

            // Only create session in the Database if stream resources succeed
            session = await Session.create({ problem, difficulty, host: userId, callId });
        } catch (channelError) {

            // Rollback: Delete the video call if channel creation fails
            await call.delete({ hard: true }).catch(console.error);
            throw channelError;
        }

        res.status(201).json({ session })

    } catch (error) {
        console.error('Error creating session:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getActiveSessions(req, res) {
    try {
        const sessions = await Session.find({ status: "active" }).
            populate("host", "name profilePic email clerkId").
            sort({ createdAt: -1 }).limit(15) // Descending Order

        res.status(200).json({ sessions })

    } catch (error) {
        console.error('Error fetching active sessions:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getMyRecentSessions(req, res) {
    try {
        const userId = req.user._id;

        // Get Session whether user is either host or participant
        const sessions = await Session.find({ status: "completed", $or: [{ host: userId }, { participants: userId }] }).
            sort({ createdAt: -1 }).limit(15)

        res.status(200).json({ sessions })
    } catch (error) {
        console.error('Error fetching my recent sessions:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getSessionById(req, res) {
    try {
        const { id } = req.params;

        const session = await Session.findById(id)
            .populate("host", "name email profilePic clerkId")
            .populate("participants", "name email profilePic clerkId")

        if (!session) return res.status(404).json({ error: 'Session not found' })

        res.status(200).json({ session })
    } catch (error) {
        console.error('Error fetching session by id:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function joinSession(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        const session = await Session.findById(id)

        // Check if session exists
        if (!session) return res.status(404).json({ error: 'Session not found' })

        // Check if session is active
        if (session.status !== active) {
            return res.status(400).json({ message: "This Session has been Ended" })
        }

        // Validation: Host cannot join their own session as participant
        if (session.host.toString() === userId.toString()) {
            return res.status(400).json({ message: "Host cannot join their own session as participant" })
        }

        // Check if session is full
        if (session.participant) return res.status(400).json({ error: 'Session is full' })

        // Add participant to session
        session.participant = userId;
        await session.save();

        // Add user to stream chat
        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkId]);

        res.status(200).json({ session, message: "Joined Session" })
    } catch (error) {
        console.error('Error joining session:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function endSession(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const session = await Session.findById(id);

        if (!session) return res.status(404).json({ error: 'Session not found' })

        // Check if user is the host - Only Host Can End the Session
        if (session.host.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'Only the host can end the session' })
        }

        // Check if session is already ended
        if (session.status === "completed") {
            return res.status(400).json({ error: 'Session is already ended' })
        }

        session.status = "completed"
        await session.save()

        // Delete Stream Video Call
        const call = StreamClient.call("default", session.callId);
        await call.delete({ hard: true });

        // Delete Stream Chat
        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete();

        res.status(200).json({ session, message: "Session ended successfully" })
    } catch (error) {
        console.error('Error ending session:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}