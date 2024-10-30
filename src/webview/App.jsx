import React, { useState } from 'react';

const App = () => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
        // Send message to VS Code
        window.acquireVsCodeApi().postMessage({
            command: 'textChange',
            text: event.target.value
        });
    };

    return (
        <div style={{ padding: '10px' }}>
          <h1>Heyy</h1>
          <input
            type="text"
            placeholder="Type here..."
            value={text}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
    );
};

export default App;
