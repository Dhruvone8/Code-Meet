import { useQuery, useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { sessionAPI } from "../api/session"

export const useCreateSession = () => {
    const result = useMutation({
        mutationFn: sessionAPI.createSession,
        onSuccess: () => {
            toast.success("Session created successfully")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create session")
        }
    });

    return result
}

export const useActiveSessions = () => {
    const result = useQuery({
        queryKey: ["activeSessions"],
        queryFn: () => sessionAPI.getActiveSession()
    });

    return result
}

export const useMyRecentSessions = () => {
    const result = useQuery({
        queryKey: ["myRecentSessions"],
        queryFn: () => sessionAPI.getMyRecentSessions()
    })

    return result
}

export const useSessionById = (id) => {
    const result = useQuery({
        queryKey: ["session", id],
        queryFn: () => sessionAPI.getSessionById(id),
        enabled: !!id,
        refetchInterval: 5000 // Refetch every 5 seconds
    })

    return result
}

export const useJoinSession = (id) => {
    const result = useMutation({
        mutationFn: () => sessionAPI.joinSession(id),
        onSuccess: () => {
            toast.success("Joined session successfully")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to join session")
        }
    })

    return result
}

export const useEndSession = (id) => {
    const result = useMutation({
        mutationFn: () => sessionAPI.endSession(id),
        onSuccess: () => {
            toast.success("Session ended successfully")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to end session")
        }
    })

    return result
}