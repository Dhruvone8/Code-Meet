import React from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { useUser } from '@clerk/react'

const DashboardPage = () => {

  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default DashboardPage