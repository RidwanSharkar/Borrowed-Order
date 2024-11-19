import React, { useState, useContext, useEffect } from 'react';
import { containsDuplicate } from '../Algos/containsDuplicate';
import './ContainsDuplicateVisualizer.css';
import { CodeContext } from '../CodeContent';

interface Step {
  index: number;
  value: number;
  found: boolean;
}

const containsDuplicateTypeScriptCode = `function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  return false;
}`;

const containsDuplicatePythonCode = `def contains_duplicate_sorted(nums):
    nums_sorted = sorted(nums)
    for i in range(1, len(nums_sorted)):
        if nums_sorted[i] == nums_sorted[i - 1]:
            return True
    return False`;

const ContainsDuplicateVisualizer: React.FC = () => {
  const [inputArray, setInputArray] = useState('1,2,3,1');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);

  const { setCode, language } = useContext(CodeContext);

  useEffect(() => {
    setCode(language === 'typescript' ? containsDuplicateTypeScriptCode : containsDuplicatePythonCode);
  }, [language, setCode]);

  const handleRun = () => {
    const nums = inputArray.split(',').map(Number);
    const { hasDuplicate, steps } = containsDuplicate(nums);
    setSteps(steps);
    setResult(hasDuplicate);
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
      <img src="/Borrowed-Order/1.svg" alt="Problem Icon" className="problem-icon" />
      <h1>217 - Contains Duplicate (E)</h1>
      
      {/* Problem Description Section */}
      <div className="problem-description">
        <p>
          Given an integer array <code>nums</code>, return <code>true</code> if any value appears at least twice in
          the array, and <code>false</code> if every element is distinct.
        </p>
        
        <div className="examples">
          <p><strong>Examples:</strong></p>
          <div className="example-pair">
            <pre className="example-input">Input: nums = [1, 2, 3, 1]</pre>
            <pre className="example-output">Output: true</pre>
          </div>

          <div className="example-pair">
            <pre className="example-input">Input: nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]</pre>
            <pre className="example-output">Output: true</pre>
          </div>

          <div className="example-pair">
            <pre className="example-input">Input: nums = [1, 2, 3, 4]</pre>
            <pre className="example-output">Output: false</pre>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          placeholder="Enter array, e.g., 1,2,3,1"
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
              <p><strong>Index:</strong> {currentStep.index}</p>
              <p><strong>Value:</strong> {currentStep.value}</p>
              <p><strong>Duplicate Found:</strong> {currentStep.found ? 'Yes' : 'No'}</p>
            </div>

            {/* Visualization Container */}
            <div className="visualization-container">
              <div className="set-visualization">
                {currentStep.found ? (
                  <div className="found">Duplicate found: {currentStep.value}</div>
                ) : (
                  <div className="not-found">No duplicate at this step.</div>
                )}
              </div>
            </div>
          </div>

          {/* Result Display */}
          {currentStepIndex === steps.length - 1 && result !== null && (
            <div className="result">
              <p>
                <strong>Final Result:</strong> {result ? 'Duplicates exist in the array.' : 'All elements are unique.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContainsDuplicateVisualizer; 