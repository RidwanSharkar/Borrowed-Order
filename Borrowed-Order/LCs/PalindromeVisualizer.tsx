// src/components/PalindromeVisualizer.tsx

import React, { useState } from 'react';
import { validPalindrome, Step } from '../Algos/validPalindrome';
import './PalindromeVisualizer.css';
import { Link } from 'react-router-dom';

const PalindromeVisualizer: React.FC = () => {
  const [input, setInput] = useState('A man, a plan, a canal: Panama');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);

  const handleRun = () => {
    const { result, steps } = validPalindrome(input);
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
      <h1>Valid Palindrome Visualizer</h1>
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '400px', padding: '8px' }}
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
            {currentStep.chars.map((char, index) => {
              const isActive = index === currentStep.left || index === currentStep.right;
              return (
                <div
                  key={index}
                  className={`char-box ${isActive ? 'active' : ''}`}
                >
                  {char}
                </div>
              );
            })}
          </div>

          <div className="step-info">
            <p>
              Comparing characters at positions {currentStep.left} and{' '}
              {currentStep.right}:
            </p>
            <p>
              '{currentStep.chars[currentStep.left]}'{' '}
              {currentStep.isEqual ? '==' : '!='} '{' '}
              {currentStep.chars[currentStep.right]}'
            </p>
          </div>

          {currentStepIndex === steps.length - 1 && (
            <h2>
              Result: {result ? 'The string is a palindrome.' : 'The string is not a palindrome.'}
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default PalindromeVisualizer;
