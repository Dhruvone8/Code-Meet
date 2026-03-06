import { useParams, useNavigate } from 'react-router'
import React, { useState, useEffect } from 'react'
import { PROBLEMS } from '../data/problems'
import { Panel, Group, Separator } from "react-resizable-panels"
import ProblemDescription from '../components/ProblemDescription'
import Navbar from '../components/Navbar'
import CodeEditorPanel from '../components/CodeEditorPanel'
import OutputPanel from '../components/OutputPanel'

const ProblemPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [currentProblemId, setCurrentProblemId] = useState("two-sum")
    const [selectedLanguage, setSelectedLanguage] = useState("cpp")
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.cpp)
    const [output, setOutput] = useState(null)
    const [isRunning, setIsRunning] = useState(false)

    const currentProblem = PROBLEMS[currentProblemId]

    // Runs when problem or language changes
    useEffect(() => {
        if (id && PROBLEMS[id]) {
            setCurrentProblemId(id)
            setCode(PROBLEMS[id].starterCode[selectedLanguage])
            setOutput(null)
        }
    }, [id, selectedLanguage])

    const handleLanguageChange = (e) => {

    }

    const handleProblemChange = () => {

    }

    const triggerConfetti = () => {

    }

    const checkIfTestsPassed = () => {

    }

    const handleRunCode = () => {

    }

    return (
        <div className="h-screen w-screen bg-base-100 flex flex-col">
            <Navbar />

            <div className="flex-1 overflow-hidden">
                <Group orientation="horizontal">
                    <Panel defaultSize={40} minSize={30}>
                        <ProblemDescription
                            problem={currentProblem}
                            currentProblemId={currentProblemId}
                            onProblemChange={handleProblemChange}
                            allProblems={Object.values(PROBLEMS)}
                        />
                    </Panel>

                    <Separator className="w-1 bg-black hover:bg-emerald-400 cursor-col-resize" />

                    <Panel defaultSize={60} minSize={30}>
                        <Group orientation="vertical">

                            <Panel defaultSize={70} minSize={30}>
                                <CodeEditorPanel />
                            </Panel>

                            <Separator className="h-1 bg-black hover:bg-emerald-400 cursor-row-resize" />

                            <Panel defaultSize={30} minSize={20}>
                                <OutputPanel />
                            </Panel>

                        </Group>
                    </Panel>

                </Group>
            </div>
        </div>
    )
}

export default ProblemPage
