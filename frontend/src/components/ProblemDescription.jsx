import React from 'react'
import { getDifficultyBadgeClass } from '../utils/badge.js'

const ProblemDescription = ({ problem, currentProblemId, onProblemChange, allProblems }) => {
  return (
    <div className="h-full overflow-y-auto bg-base-200 p-2">
      {/* HEADER SECTION */}
      <div className="p-6 bg-base-100 border-b border-base-300">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-3xl font-bold text-base-content">{problem.title}</h2>
          <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </div>
        <p className="text-base-content/60">{problem.category}</p>

        {/* Problem Selector */}
        <div className="mt-4">
          <select className="select select-sm w-full"
            value={currentProblemId} onChange={(e) => onProblemChange(e.target.value)}>
            {allProblems.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {problem.title}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="p-6 space-y-6">
        {/* Problem Description */}
        <div className="bg-base-100 rouded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold text-base-content pb-3">Description</h2>
          <div className="space-y-3 text-base leading-relaxed">
            <p className="text-base-content/90">{problem.description.text}</p>
            {problem.description.notes && problem.description.notes.map((note, index) => (
              <p key={index} className="text-base-content/80">{note}</p>
            ))}
          </div>
        </div>

        {/* EXAMPLES SECTION */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>
          <div className="space-y-4">
            {problem.examples.map((example, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-2 ml-2">
                  <p className="font-semibold text-base-content">Example {idx + 1}</p>
                </div>
                <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                  <div className="flex gap-2 items-center">
                    <span className="text-primary font-bold min-w-[70px]">Input:</span>
                    <span>{example.input}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-secondary font-bold min-w-[70px]">Output:</span>
                    <span>{example.output}</span>
                  </div>
                  {example.explanation && (
                    <div className="pt-2 border-t border-base-300 mt-2">
                      <span className="text-base-content/60 font-sans text-xs">
                        <span className="font-semibold">Explanation:</span> {example.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONSTRAINTS SECTION */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>
          <ul className="space-y-2 text-base-content/90">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx} className="flex gap-2 items-center">
                <span className="text-primary">•</span>
                <code className="text-sm">{constraint}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProblemDescription