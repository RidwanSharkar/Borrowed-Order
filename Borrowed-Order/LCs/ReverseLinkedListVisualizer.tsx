// src/components/ReverseLinkedListVisualizer.tsx

import React, { useState } from 'react';
import {
  reverseLinkedList,
  Step,
  createLinkedList,
} from '../Algos/reverseLinkedList';
import './ReverseLinkedListVisualizer.css';
import { Link } from 'react-router-dom';


const ReverseLinkedListVisualizer: React.FC = () => {
  const [inputArray, setInputArray] = useState('1,2,3,4,5');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleRun = () => {
    const values = inputArray.split(',').map(Number);
    const head = createLinkedList(values);
    const { steps } = reverseLinkedList(head);
    setSteps(steps);
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
      <h1>Reverse Linked List Visualizer</h1>
      <div className="input-section">
        <input
          type="text"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          placeholder="Enter list values, e.g., 1,2,3,4,5"
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
            {currentStep.list.map((val, index) => (
              <div key={index} className="node">
                {val}
                {index < currentStep.list.length - 1 && <span className="arrow">→</span>}
              </div>
            ))}
          </div>

          <div className="step-info">
            <p>
              Current Node: {currentStep.current !== null ? currentStep.current : 'null'}
            </p>
            <p>Prev Node: {currentStep.prev !== null ? currentStep.prev : 'null'}</p>
            <p>
              Next Node: {currentStep.nextNode !== null ? currentStep.nextNode : 'null'}
            </p>
          </div>

          {currentStepIndex === steps.length - 1 && (
            <h2>Linked List Reversed!</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default ReverseLinkedListVisualizer;
