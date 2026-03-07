import React from 'react'
import Editor from '@monaco-editor/react'
import { Loader, Play } from 'lucide-react';
import { LANGUAGE_CONFIG } from '../data/problems';

const CodeEditorPanel = ({ selectedLanguage, code, isRunning, onLanguageChange, onCodeChange, onRunCode }) => {
  return (
    <div className="h-full bg-base-300 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-base-300 border-t border-base-300">
        <div className="flex items-center gap-3">
          <img src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="w-10 h-6.5" />
          <select className="select select-sm"
            value={selectedLanguage}
            onChange={onLanguageChange}>
            {Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => (
              <option key={lang} value={lang}>
                {config.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary gap-2" disabled={isRunning} onClick={onRunCode}>
          {isRunning ? (
            <>
              <Loader className="size-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="size-4" />
              Run
            </>
          )}
        </button>
      </div>

      <div className="flex-1">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false }
          }} />
      </div>
    </div>
  )
}

export default CodeEditorPanel