// src/components/BinarySearchVisualizer.tsx

import { Link } from 'react-router-dom'; 
import React, { useState } from 'react';
import { binarySearch, Step } from '../Algos/binarySearch';
import './BinarySearchVisualizer.css';

const BinarySearchVisualizer: React.FC = () => {
  const [inputArray, setInputArray] = useState('-1,0,3,5,9,12');
  const [target, setTarget] = useState('9');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [resultIndex, setResultIndex] = useState<number | null>(null);

  const handleRun = () => {
    const nums = inputArray.split(',').map(Number);
    const targetNum = Number(target);
    const { index, steps } = binarySearch(nums, targetNum);
    setSteps(steps);
    setResultIndex(index);
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
      <h1>Binary Search Visualizer</h1>
      <div className="input-section">
        <input
          type="text"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          placeholder="Enter sorted array, e.g., -1,0,3,5,9,12"
          style={{ width: '400px', padding: '8px' }}
        />
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target"
          style={{ width: '100px', padding: '8px', marginLeft: '10px' }}
        />
        <button onClick={handleRun} style={{ marginLeft: '10px', padding: '8px' }}>
          Run
        </button>
      </div>

      {steps.length > 0 && currentStep && (
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
            {currentStep.nums.map((num, index) => {
              let className = 'num-box';
              if (index === currentStep.mid) className += ' mid';
              else if (index >= currentStep.left && index <= currentStep.right)
                className += ' active';
              return (
                <div key={index} className={className}>
                  {num}
                </div>
              );
            })}
          </div>

          <div className="step-info">
            <p>
              Left: {currentStep.left}, Mid: {currentStep.mid}, Right: {currentStep.right}
            </p>
            <p>
              nums[mid]: {currentStep.nums[currentStep.mid]}, Target: {currentStep.target}
            </p>
            <p>
              {currentStep.found
                ? 'Target found!'
                : currentStep.nums[currentStep.mid] < currentStep.target
                ? 'Searching right half.'
                : 'Searching left half.'}
            </p>
          </div>

          {currentStepIndex === steps.length - 1 && (
            <h2>
              Result:{' '}
              {resultIndex !== -1
                ? `Target found at index ${resultIndex}.`
                : 'Target not found.'}
            </h2>
          )}
        </div>
      )}
    </div>
  );


};



export default BinarySearchVisualizer;
