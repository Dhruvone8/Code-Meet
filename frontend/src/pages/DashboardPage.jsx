import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { useUser } from '@clerk/react'
import { useCreateSession, useActiveSessions, useMyRecentSessions } from '../hooks/useSessions'
import WelcomeSection from '../components/WelcomeSection'
import StatsCard from '../components/StatsCard'
import ActiveSessions from '../components/ActiveSessions'
import RecentSessions from '../components/RecentSessions'
import CreateSessionModal from '../components/CreateSessionModal'

const DashboardPage = () => {

  const navigate = useNavigate()
  const { user } = useUser()
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({
    problem: "",
    difficulty: ""
  });

  const createSessionMutation = useCreateSession()
  const { data: activeSessionsData, isLoading: activeSessionsLoading } = useActiveSessions()
  const { data: myRecentSessionsData, isLoading: myRecentSessionsLoading } = useMyRecentSessions()

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) {
      return;
    }
    createSessionMutation.mutate({
      problem: roomConfig.problem,
      difficulty: roomConfig.difficulty
    }, {
      onSuccess: (data) => {
        console.log("SESSION RESPONSE:", data)
        setShowCreateModal(false)
        navigate(`/session/${data.session._id}`)
      }
    });
  }

  const activeSessions = activeSessionsData?.sessions || []
  const myRecentSessions = myRecentSessionsData?.sessions || []

  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

        {/* GRID LAYOUT */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsCard />
            <ActiveSessions />
          </div>
          <RecentSessions />
        </div>
      </div>
      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  )
}

export default DashboardPage