import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router"
import { useUser } from "@clerk/react"
import { useSessionById, useJoinSession, useEndSession } from "../hooks/useSessions"
import { PROBLEMS } from "../data/problems"
import { executeCode } from "../utils/piston"
import { Panel, Group, Separator } from "react-resizable-panels"
import Navbar from "../components/Navbar"
import { getDifficultyBadgeClass } from "../utils/badge"
import { Loader, LogOut } from "lucide-react"
import CodeEditorPanel from "../components/CodeEditorPanel"
import OutputPanel from "../components/OutputPanel"

const SessionPage = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();

  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);
  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  // Find Problem
  const problemData = session?.problem ? Object.values(PROBLEMS).find(p => p.title === session.problem) : null;

  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");

  // Auto Join Session if user is not already a participant or host
  useEffect(() => {
    if (isHost || isParticipant) return;
    if (!session || !user || loadingSession) return;
    joinSessionMutation.mutate(id, {
      onSuccess: () => {
        refetch();
      }
    });
  }, [session, user, loadingSession, isHost, isParticipant, id])

  // Redirect the participants when sessions ends
  useEffect(() => {
    if (!session || loadingSession) return;
    if (session?.status === "completed") {
      navigate("/dashboard");
    }
  }, [session, navigate, loadingSession]);

  // Update code when problem loads or changes
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    const starterCode = problemData?.starterCode?.[newLang] || "";
    setCode(starterCode);
    setOutput(null);
  }

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  }

  const handleEndSession = () => {
    if (confirm("Are You Sure That You Want To End This Session? All the Participants Will Be Notified")) {
      endSessionMutation.mutate(id, {
        onSuccess: () => {
          navigate("/dashboard")
        }
      });
    }
  }

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1 ">
        <Group orientation="horizontal">
          {/* LEFT PANEL - CODE EDITOR & PROBLEM DETAILS */}
          <Panel defaultSize={50} minSize={30}>
            <Group orientation="vertical">
              {/* PROBLEM DESCRIPTION PANEL */}
              <Panel defaultSize={50} minSize={30}>
                <div className="h-full overflow-y-auto bg-base-200">
                  {/* HEADER SECTION */}
                  <div className="p-6 bg-base-100 border-b border-base-300">
                    <div className="flex flex-wrap items-center justify-between mb-3 gap-y-2">
                      <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-base-content">
                          {session?.problem || "Loading..."}
                        </h1>
                        {problemData?.category && (
                          <p className="text-base-content/60 mt-1">{problemData.category}</p>
                        )}
                        <p className="text-base-content/60 mt-2">
                          Host: {session?.host?.name || "Loading..."} •{" "}
                          {session?.participant ? 2 : 1}/2 participants
                        </p>
                      </div>
                      <div className="flex items-center gap-x-4">
                        {session?.difficulty && (
                          <span
                            className={`badge badge-lg ${getDifficultyBadgeClass(
                              session.difficulty
                            )}`}
                          >
                            {session.difficulty.slice(0, 1).toUpperCase() +
                              session.difficulty.slice(1)}
                          </span>
                        )}
                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="btn btn-info gap-2 hover:scale-103 transition-all duration-300"
                          >
                            {endSessionMutation.isPending ? (
                              <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                              <LogOut className="w-4 h-4" />
                            )}
                            End Session
                          </button>
                        )}
                        {session?.status === "completed" && (
                          <span className="badge badge-ghost badge-lg">Completed</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Problem Description */}
                    {problemData?.description && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4 text-base-content">Description</h2>
                        <div className="space-y-3 text-base leading-relaxed">
                          <p className="text-base-content/90">{problemData.description.text}</p>
                          {problemData.description.notes?.map((note, index) => (
                            <p key={index} className="text-base-content/90">{note}</p>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* EXAMPLES SECTION*/}
                    {problemData?.examples && problemData.examples.length > 0 && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>
                        <div className="space-y-4">
                          {problemData.examples.map((example, idx) => (
                            <div key={idx}>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="badge badge-sm">{idx + 1}</span>
                                <p className="font-semibold text-base-content">Example {idx + 1}</p>
                              </div>
                              <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                                <div className="flex gap-2">
                                  <span className="text-primary font-bold min-w-[70px]">
                                    Input:
                                  </span>
                                  <span>{example.input}</span>
                                </div>
                                <div className="flex gap-2">
                                  <span className="text-secondary font-bold min-w-[70px]">
                                    Output:
                                  </span>
                                  <span>{example.output}</span>
                                </div>
                                {example.explanation && (
                                  <div className="pt-2 border-t border-base-300 mt-2">
                                    <span className="text-base-content/60 font-sans text-xs">
                                      <span className="font-semibold">Explanation:</span>{" "}
                                      {example.explanation}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* EXAMPLES */}
                    {problemData?.constraints && problemData.constraints.length > 0 && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>
                        <ul className="space-y-2 text-base-content/90">
                          {problemData.constraints.map((constraint, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-primary">•</span>
                              <code className="text-sm">{constraint}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <Separator className="h-1 bg-black hover:bg-emerald-400 cursor-row-resize" />

              <Panel defaultSize={50} minSize={30}>
                <Group orientation="vertical">
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={(value) => setCode(value)}
                      onRunCode={handleRunCode}
                    />
                  </Panel>

                  <Separator className="h-1 bg-black hover:bg-emerald-400 cursor-row-resize" />

                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanel output={output} />
                  </Panel>
                </Group>
              </Panel>
            </Group >
          </Panel >

          <Separator className="w-1 bg-black hover:bg-emerald-400 cursor-col-resize" />

          {/* RIGHT PANEL - VIDEO CALLS & CHAT */}
          <Panel defaultSize={50} minSize={30}>
          </Panel>
        </Group>
      </div>
    </div>
  );
}

export default SessionPage