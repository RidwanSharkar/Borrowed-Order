// src/components/BinarySearchVisualizer.tsx


import React, { useState, useContext, useEffect } from 'react';
import { binarySearch } from '../Algos/binarySearch';
import './BinarySearchVisualizer.css';
import { CodeContext } from '../CodeContent';

const binarySearchTypeScriptCode = `function binarySearch(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
            return mid;
        }
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`;

const binarySearchPythonCode = `def binary_search(nums: List[int], target: int) -> int:
    left = 0
    right = len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1`;

interface Step {
  nums: number[];
  left: number;
  right: number;
  mid: number;
  target: number;
  found: boolean;
}

const BinarySearchVisualizer: React.FC = () => {
  const [inputArray, setInputArray] = useState('-1,0,3,5,9,12');
  const [target, setTarget] = useState('9');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [resultIndex, setResultIndex] = useState<number | null>(null);

  const { setCode, language } = useContext(CodeContext);

  useEffect(() => {
    setCode(language === 'typescript' ? binarySearchTypeScriptCode : binarySearchPythonCode);
  }, [language, setCode]);

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
      <img src="/1.svg" alt="Problem Icon" className="problem-icon" />
      <h1>704 - Binary Search (E)</h1>
      
      {/* Problem Description Section */}
      <div className="problem-description">
        <p>
          Given an array of integers nums which is sorted in ascending order, and an integer target,
          write a function to search target in nums. If target exists, then return its index.
          Otherwise, return -1.
        </p>
        <p>You must write an algorithm with O(log n) runtime complexity.</p>
        
        <div className="examples">
          <p><strong>Examples:</strong></p>
          <div className="example-pair">
            <pre className="example-input">Input: nums = [-1,0,3,5,9,12], target = 9</pre>
            <pre className="example-output">Output: 4</pre>
          </div>

          <div className="example-pair">
            <pre className="example-input">Input: nums = [-1,0,3,5,9,12], target = 2</pre>
            <pre className="example-output">Output: -1</pre>

          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          placeholder="Enter sorted array, e.g., -1,0,3,5,9,12"
        />
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target"
        />
        <button onClick={handleRun}>Run</button>
      </div>

      {steps.length > 0 && currentStep && (
        <div className="algorithm-visualization">
          {/* Controls Container */}
          <div className="controls-container">
            <div className="controls">
              <button onClick={handlePrev} disabled={currentStepIndex === 0}>
                Previous
              </button>
              <span>Step {currentStepIndex + 1} of {steps.length}</span>
              <button onClick={handleNext} disabled={currentStepIndex === steps.length - 1}>
                Next
              </button>
            </div>
          </div>

          {/* Step Details */}
          <div className="step-details">
            <h3>Current Step Details:</h3>
            <div className="detail-box">
              <p><strong>Search Range:</strong> Left: {currentStep.left}, Right: {currentStep.right}</p>
              <p><strong>Middle Index:</strong> {currentStep.mid}</p>
              <p><strong>Middle Value:</strong> {currentStep.nums[currentStep.mid]}</p>
              <p><strong>Target:</strong> {currentStep.target}</p>
            </div>

            <div className="visualization-container">
              <div className="binary-search-visualization">
                {currentStep.nums.map((num, index) => (
                  <div key={index} className="number-container">
                    <div
                      className={`num-box ${index === currentStep.mid ? 'mid' : ''} 
                        ${index >= currentStep.left && index <= currentStep.right ? 'active' : ''}`}
                    >
                      {num}
                    </div>
                    <div className="index-label">{index}</div>
                  </div>
                ))}
                {/* Add comparison indicator */}
                <div className="comparison-indicator">
                  {currentStep.nums[currentStep.mid] < currentStep.target ? '< Target' : 
                   currentStep.nums[currentStep.mid] > currentStep.target ? '> Target' : 
                   currentStep.nums[currentStep.mid] === currentStep.target ? '= Target' : ''}
                </div>
              </div>
              
              {/* Add range indicators */}
              <div className="range-indicators">
                <div className="left-arrow" style={{ left: `${currentStep.left * 60}px` }}>↑<br/>L</div>
                <div className="right-arrow" style={{ left: `${currentStep.right * 60}px` }}>↑<br/>R</div>
                <div className="mid-arrow" style={{ left: `${currentStep.mid * 60}px` }}>↑<br/>M</div>
              </div>
            </div>
          </div>

          {/* Result Display */}
          {currentStepIndex === steps.length - 1 && (
            <div className="result">
              <p>
                <strong>Final Result:</strong>{' '}
                {resultIndex !== -1
                  ? `Target found at index ${resultIndex}`
                  : 'Target not found'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};



export default BinarySearchVisualizer;
