import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { PROBLEMS } from '../data/problems.js'
import { Link } from "react-router"
import { CodeXml, ChevronRight } from 'lucide-react';
import { getDifficultyBadgeClass } from "../utils/badge.js"

const ProblemsPage = () => {

  const problems = Object.values(PROBLEMS);

  const easyCount = problems.filter(p => p.difficulty === "Easy").length
  const mediumCount = problems.filter(p => p.difficulty === "Medium").length
  const hardCount = problems.filter(p => p.difficulty === "Hard").length

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
          <p className="text-base-content/70">
            Sharpen your coding skills with these curated problems
          </p>
        </div>

        {/* PROBLEMS LIST */}
        <div className="space-y-4">
          {problems.map((prob) => (
            <Link key={prob.id} to={`/problem/${prob.id}`}
              className="card bg-base-100 hover:scale-[1.02] transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center justify-between gap-4">
                  {/* LEFT SIDE */}
                  <div className="flex-1 ">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CodeXml className="size-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold">{prob.title}</h2>
                          <span className={`badge ${getDifficultyBadgeClass(prob.difficulty)}`}>
                            {prob.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-base-content/60">{prob.category}</p>
                      </div>
                    </div>
                    <p className="text-base-content/80 mb-3">{prob.description.text}</p>
                  </div>
                  {/* Right Side */}
                  <div className="flex items-center gap-2 text-primary">
                    <span className="font-medium">Solve</span>
                    <ChevronRight className="size-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* Stats Footer*/}
        <div className="mt-12 card bg-base-100 shadow-lg">
          <div className="stats stats-vertical lg:stats-horizontal">
            <div className="stat">
              <div className="stat-title">Total Problems</div>
              <div className="stat-value text-info">{problems.length}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Easy</div>
              <div className="stat-value text-success">{easyCount}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Medium</div>
              <div className="stat-value text-warning">{mediumCount}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Hard</div>
              <div className="stat-value text-error">{hardCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemsPage