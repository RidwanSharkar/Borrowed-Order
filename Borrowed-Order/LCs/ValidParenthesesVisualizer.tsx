// src/components/ValidParenthesesVisualizer.tsx

import React, { useState } from 'react';
import { validParentheses, Step } from '../Algos/validParentheses';
import './ValidParenthesesVisualizer.css';
import { Link } from 'react-router-dom';

const ValidParenthesesVisualizer: React.FC = () => {
  const [input, setInput] = useState('()[]{}');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);

  const handleRun = () => {
    const { result, steps } = validParentheses(input);
    setSteps(steps);
    setResult(result);
    setCurrentStepIndex(0);
  };

  const handleNext = () => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const currentStep = steps[currentStepIndex];

  return (
    <div className="container">
      <Link to="/" className="back-button">← Back to Home</Link>
      <h1>Valid Parentheses Visualizer</h1>
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '300px', padding: '8px' }}
        />
        <button onClick={handleRun} style={{ marginLeft: '10px', padding: '8px' }}>
          Run
        </button>
      </div>

      {steps.length > 0 && (
        <div>
          <div className="controls">
            <button onClick={handlePrev} disabled={currentStepIndex === 0}>
              Previous
            </button>
            <span>
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentStepIndex === steps.length - 1}
            >
              Next
            </button>
          </div>

          <div className="visualization">
            <div className="stack">
              <h3>Stack:</h3>
              <div className="stack-content">
                {currentStep.stack.map((char, index) => (
                  <div key={index} className="stack-item">
                    {char}
                  </div>
                ))}
              </div>
            </div>
            <div className="current-char">
              <p>
                Current Character: <strong>{currentStep.char}</strong> ({currentStep.action})
              </p>
            </div>
          </div>

          {currentStepIndex === steps.length - 1 && (
            <h2>
              Result: {result ? 'The string is valid.' : 'The string is invalid.'}
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default ValidParenthesesVisualizer;
