import { useState, useEffect } from "react"
import { StreamChat } from "stream-chat"
import toast from "react-hot-toast"
import { initializeStreamClient, disconnectFromStreamClient } from "../utils/stream"
import { sessionAPI } from "../api/session"

function useStreamClient(session, loadingSession, isHost, isParticipant) {
    const [streamClient, setStreamClient] = useState(null)
    const [call, setCall] = useState(null)
    const [chatClient, setChatClient] = useState(null)
    const [channel, setChannel] = useState(null)
    const [isInitializingCall, setIsInitializingCall] = useState(true)

    useEffect(() => {
        let videoCall = null
        let chatClientInstance = null

        const initCall = async () => {
            if (!session?.callId) return

            if (!isHost && !isParticipant) return

            try {
                const { token, userId, userName, userImage } = await sessionAPI.getStreamToken()
                const client = await initializeStreamClient({
                    id: userId,
                    name: userName,
                    image: userImage
                },
                    token
                )

                setStreamClient(client)

                videoCall = client.call("default", session.callId)
                await videoCall.join({ create: true })
                setCall(videoCall)

                const apiKey = import.meta.env.VITE_STREAM_API_KEY
                chatClientInstance = StreamChat.getInstance(apiKey)

                await chatClientInstance.connectUser({
                    id: userId,
                    name: userName,
                    image: userImage
                },
                    token
                )

                setChatClient(chatClientInstance)

                const chatChannel = chatClientInstance.channel("messaging", session.callId)
                await chatChannel.watch()
                setChannel(chatChannel)
            } catch (error) {
                toast.error("Failed to Join Video Call")
                console.error("Error Init Call", error)
            } finally {
                setIsInitializingCall(false)
            }
        }

        if (session && !loadingSession) initCall()

        // Clean Up Function
        return () => {
            // Synchronous cleanup first
            if (videoCall) {
                videoCall.leave().catch(console.error);
            }
            if (chatClientInstance) {
                chatClientInstance.disconnectUser().catch(console.error);
            }
            
            // Async cleanup for stream client
            disconnectFromStreamClient().catch(console.error);
            
            // Reset state
            setStreamClient(null);
            setCall(null);
            setChatClient(null);
            setChannel(null);
            setIsInitializingCall(true);
        }
    }, [session, loadingSession, isHost, isParticipant])

    return {
        streamClient,
        call,
        chatClient,
        channel,
        isInitializingCall
    }
}

export default useStreamClient