import React from 'react'
import { Link } from "react-router"
import { Squirrel, ArrowRight, Zap, Check, Video, CodeXml, UsersRound } from 'lucide-react';
import { SignInButton } from "@clerk/clerk-react"

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300">

      {/* Navbar */}
      <nav className="bg-base-100/70 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">

          {/* Logo */}
          <Link to={"/"}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
              <Squirrel className="size-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                CodeMeet
              </span>
              <span className="text-xs text-base-content/75 font-medium -mt-0.5">Code Together</span>
            </div>
          </Link>

          {/* Auth Btn */}
          <SignInButton mode="modal" >
            <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold 
            text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <span>Get Started</span>
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-17">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="badge badge-primary badge-lg">
              <Zap className="size-4" />
              <span>Real-time Collaboration</span>
            </div>
            <h1 className="test-5xl lg:text-7xl font-black leading-tight">
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Code Together,</span>
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Build Together</span>
              <br />
            </h1>
            <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
              The ultimate platform for collaborative coding interviews and pair programming.
              Connect face-to-face, code in real-time, and ace your technical interviews.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-outline badge-lg">
                <Check className="size-4 text-success" />
                <span>Live Video Call</span>
              </div>
              <div className="badge badge-outline badge-lg">
                <Check className="size-4 text-success" />
                <span>Code Editor</span>
              </div>
              <div className="badge badge-outline badge-lg">
                <Check className="size-4 text-success" />
                <span>Multi-Language Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 ">
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-lg">
                  Start Coding Now
                  <ArrowRight className="size-5" />
                </button>
              </SignInButton>
              <button className="btn btn-outline btn-lg">
                <Video className="size-5" />
                Watch Demo
              </button>
            </div>
            {/* Stats */}
            <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg">
              <div className="stat">
                <div className="stat-value text-primary">10K+</div>
                <div className="stat-title">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-value text-secondary">50K+</div>
                <div className="stat-title">Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-value text-accent">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <img src="/hero.png" alt="" className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100
          hover:scale-105 transition-transform duration-200" />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-17">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to <span className="text-primary font-mono">Succeed</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless and productive
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Video className="size-8 text-primary" />
              </div>
              <h3 className="card-title">HD Video Calls</h3>
              <p className="text-base-content/70">
                Crystal Clear Video & Audio for seamless communication during interviews</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <CodeXml className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Code Editor</h3>
              <p className="text-base-content/70">
                Real-time collaboration with syntax highlighting and code formatting</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <UsersRound className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-base-content/70">
                Share your screen, discuss solutions and learn from each other</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage