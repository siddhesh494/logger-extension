import React from 'react'
import Editor from '@monaco-editor/react';

const Terminal = ({
  terminalContent,
  setTerminalContent
}) => {
  return (
    <div className='terminal-container'>
      <Editor 
        height="40vh"
        theme="vs-dark" 
        defaultLanguage="bash" 
        defaultValue={terminalContent} 
        onChange={(val) => {
          console.log("===>val")
          setTerminalContent(val)
        }}
      />
    </div>
  )
}

export default Terminal