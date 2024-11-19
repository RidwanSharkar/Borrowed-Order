import React, { useState, useContext, useEffect } from 'react';
import { twoSumII, Step } from '../Algos/twoSumII';
import './TwoSumVisualizer.css';
import { CodeContext } from '../CodeContent';

const twoSumITypeScriptCode = `function twoSumII(numbers: number[], target: number): number[] | null {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return null;
}`;

const twoSumIPythonCode = `def two_sum_two_pointers(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return None`;

const TwoSumIIVisualizer: React.FC = () => {
  const [inputArray, setInputArray] = useState('2,7,11,15');
  const [target, setTarget] = useState('9');
  const [steps, setSteps] = useState<Step[]>([]);
  const [result, setResult] = useState<number[] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const { setCode, language } = useContext(CodeContext);

  useEffect(() => {
    setCode(language === 'typescript' ? twoSumITypeScriptCode : twoSumIPythonCode);
  }, [language, setCode]);

  const handleRun = () => {
    const nums = inputArray.split(',').map(Number);
    const targetNum = Number(target);
    const { indices, steps } = twoSumII(nums, targetNum);
    setSteps(steps);
    setResult(indices);
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
      <img src="/2.svg" alt="Problem Icon" className="problem-icon" />
      <h1>167 - Two Sum II (E)</h1>

      {/* Problem Description Section */}
      <div className="problem-description">
        <p>
          Given an array of integers <code>numbers</code> that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.
        </p>
        <p>Return the indices of the two numbers (1-based) as an array of length 2.</p>
        <p>You may assume that each input would have exactly one solution and you may not use the same element twice.</p>
        <p>Example:</p>
        <div className="examples">
          <p><strong>Examples:</strong></p>
          <div className="example-pair">
            <pre className="example-input">Input: numbers = [2,7,11,15], target = 9</pre>
            <pre className="example-output">Output: [1,2]</pre>
          </div>

          <div className="example-pair">
            <pre className="example-input">Input: numbers = [2,3,4], target = 6</pre>
            <pre className="example-output">Output: [1,3]</pre>
          </div>

          <div className="example-pair">
            <pre className="example-input">Input: numbers = [-1,0], target = -1</pre>
            <pre className="example-output">Output: [1,2]</pre>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          placeholder="Enter sorted array, e.g., 2,7,11,15"
        />
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter target, e.g., 9"
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
              <p><strong>Left Pointer:</strong> {currentStep.left}</p>
              <p><strong>Right Pointer:</strong> {currentStep.right}</p>
              <p><strong>Sum:</strong> {currentStep.sum}</p>
              <p><strong>Status:</strong> {currentStep.status}</p>
            </div>

            {/* Visualization Container */}
            <div className="visualization-container">
              <div className="array-visualization">
                {currentStep.array.map((num, index) => (
                  <div
                    key={index}
                    className={`array-element ${
                      index === currentStep.left ? 'active-left' :
                      index === currentStep.right ? 'active-right' : ''
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Result Display */}
          {currentStepIndex === steps.length - 1 && result !== null && (
            <div className="result">
              <p>
                <strong>Final Result:</strong> {result ? `[${result[0]}, ${result[1]}]` : 'No solution found.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TwoSumIIVisualizer; 