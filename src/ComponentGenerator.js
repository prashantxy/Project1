import React, { useState } from 'react';
import { generateReactComponent } from 'react-codogen';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './ComponentGenerator.css';

const ComponentGenerator = () => {
  const [componentType, setComponentType] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [typewriterCode, setTypewriterCode] = useState('');
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateClick = () => {
    if (!componentType) {
      setError('Please select or describe a component type.');
      return;
    }

    const prompt = `Create a ${componentType} component`;
    const code = generateReactComponent(prompt);

    if (!code) {
      setError('Failed to generate code. Please try again.');
      return;
    }

    setError(''); 
    setTyping(true);
    setGeneratedCode(code);
    setTypewriterCode(''); 

    
    let index = 0;
    const interval = setInterval(() => {
      setTypewriterCode((prev) => prev + (code[index] || ''));
      index++;
      if (index === code.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 20);
  };

  const generateIframeContent = (code) => {
    const componentNameMatch = code.match(/const (\w+)/);
    const componentName = componentNameMatch ? componentNameMatch[1] : 'GeneratedComponent';

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Live Preview</title>
        <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const React = window.React;
          const ReactDOM = window.ReactDOM;

          ${code}

          ReactDOM.render(React.createElement(${componentName}), document.getElementById('root'));
        </script>
      </body>
      </html>
    `;
  };

  return (
    <div className="component-generator">
      <div className="left-section">
      <h2 
  className="header" 
  style={{
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    textTransform: 'uppercase',
    padding: '10px',
    background: 'linear-gradient(90deg, #4A90E2, #50C878)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '20px 0',
    border: '2px solid #4A90E2',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }}
>
  React Component Generator
</h2>


        <div className="input-container">
          <label htmlFor="component-type" className="label">
            Describe a component:
          </label>
          <input
            id="component-type"
            className="input"
            type="text"
            placeholder="e.g., Button, Card, or custom description"
            onChange={(e) => setComponentType(e.target.value)}
            value={componentType}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="generate-btn" onClick={handleGenerateClick}>
          Generate Code
        </button>

        {typewriterCode && (
          <div className="code-output">
            <h3>Generated Code:</h3>
            <SyntaxHighlighter language="javascript" style={docco}>
              {typewriterCode}
            </SyntaxHighlighter>
          </div>
        )}
      </div>

      <div className="right-section">
        {!typing && generatedCode && (
          <div className="live-preview">
            <h3>Live Preview:</h3>
            <iframe
              srcDoc={generateIframeContent(generatedCode)}
              title="Live Preview"
              className="iframe-preview"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentGenerator;
