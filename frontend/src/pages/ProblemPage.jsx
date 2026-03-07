import { useParams, useNavigate } from 'react-router'
import React, { useState, useEffect } from 'react'
import { PROBLEMS } from '../data/problems'
import { Panel, Group, Separator } from "react-resizable-panels"
import ProblemDescription from '../components/ProblemDescription'
import Navbar from '../components/Navbar'
import CodeEditorPanel from '../components/CodeEditorPanel'
import OutputPanel from '../components/OutputPanel'
import { executeCode } from "../utils/piston"
import toast from 'react-hot-toast'

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
        const newLang = e.target.value
        setSelectedLanguage(newLang)
        setCode(currentProblem.starterCode[newLang])
        setOutput(null)
    };

    const handleProblemChange = (newProblemId) => {
        navigate(`/problem/${newProblemId}`)
    }

    const normalizeOutput = (output) => {
        // normalize output for comparison (trim whitespace, handle different spacing)
        return output
            .trim()
            .split("\n")
            .map((line) =>
                line
                    .trim()
                    // remove spaces after [ and before ]
                    .replace(/\[\s+/g, "[")
                    .replace(/\s+\]/g, "]")
                    // normalize spaces around commas to single space after comma
                    .replace(/\s*,\s*/g, ", ")
            )
            .filter((line) => line.length > 0)
            .join("\n");
    };

    const checkIfTestsPassed = (actualOutput, expectedOutput) => {
        const normalizeActual = normalizeOutput(actualOutput)
        const normalizeExpected = normalizeOutput(expectedOutput)
        return normalizeActual === normalizeExpected;
    }

    const handleRunCode = async () => {
        setIsRunning(true)
        setOutput(null)
        const result = await executeCode(selectedLanguage, code)
        setOutput(result)
        setIsRunning(false)

        // Check if code executed successfully and matches the expected output
        if (result.success) {
            const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
            const testPassed = checkIfTestsPassed(result.output, expectedOutput)

            if (testPassed) {
                toast.success("All Test Cases Passed! Great Job")
            }
            else {
                toast.error("Test Failed! Check Your Code")
            }
        } else {
            toast.error("Code Execution Failed!")
        }
    }

    return (
        <div className="h-screen bg-base-100 flex flex-col">
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
                                <CodeEditorPanel
                                    selectedLanguage={selectedLanguage}
                                    code={code}
                                    isRunning={isRunning}
                                    onLanguageChange={handleLanguageChange}
                                    onCodeChange={setCode}
                                    onRunCode={handleRunCode}
                                />
                            </Panel>

                            <Separator className="h-1 bg-black hover:bg-emerald-400 cursor-row-resize" />

                            <Panel defaultSize={30} minSize={20}>
                                <OutputPanel output={output} />
                            </Panel>

                        </Group>
                    </Panel>

                </Group>
            </div>
        </div>
    )
}

export default ProblemPage
