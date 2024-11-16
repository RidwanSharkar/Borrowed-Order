// src/components/PalindromeVisualizer.tsx

import React, { useState, useEffect, useContext } from 'react';
import { validPalindrome, Step } from '../Algos/validPalindrome';
import './shared-visualizer.css';
import './PalindromeVisualizer.css';
import { CodeContext } from '../CodeContent';

const validPalindromeTypeScriptCode = `function validPalindrome(s: string): boolean {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}`;

const validPalindromePythonCode = `def validPalindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    
    while left < right:
        # Move left pointer to the next alphanumeric character
        while left < right and not s[left].isalnum():
            left += 1
        # Move right pointer to the previous alphanumeric character
        while left < right and not s[right].isalnum():
            right -= 1
        # Compare characters
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    
    return True
`;

interface EnhancedStep extends Step {
  description: string;
  currentString: string;
  leftPointer: number;
  rightPointer: number;
  comparison: string;
}

const ResultMessage: React.FC<{ isSuccess: boolean }> = ({ isSuccess }) => (
  <div 
    className="result-message"
    style={{
      backgroundColor: isSuccess ? 'rgba(144, 238, 144, 0.1)' : 'rgba(255, 68, 68, 0.1)',
      border: `1px solid ${isSuccess ? '#90ee90' : '#ff4444'}`,
      borderRadius: '4px',
      padding: '10px 20px',
      marginTop: '15px',
      textAlign: 'center',
      color: isSuccess ? '#90ee90' : '#ff4444',
      fontFamily: 'Consolas, monospace',
      animation: 'fadeIn 0.5s ease-in'
    }}
  >
    {isSuccess 
      ? "✓ Valid Palindrome! The string reads the same forwards and backwards."
      : "✗ Not a Palindrome! The string reads differently forwards and backwards."}
  </div>
);

const PalindromeVisualizer: React.FC = () => {
  const [input, setInput] = useState('A man, a plan, a canal: Panama');
  const [steps, setSteps] = useState<EnhancedStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { setCode, setHighlightedLine, language } = useContext(CodeContext);
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    const codeToSet = language === 'typescript' ? validPalindromeTypeScriptCode : validPalindromePythonCode;
    setCode(codeToSet);
  }, [setCode, language]);

  useEffect(() => {
    // Map each step index to the corresponding line number in the code
    // Adjust the line numbers based on the actual code
    const stepToLineMap: number[] = language === 'typescript' ? [
      1, // function signature
      3, // Convert to lowercase...
      4, // const chars = s.split('');
      5, // let left = 0;
      6, // let right = chars.length - 1;
      7, // const steps: Step[] = [];
      9, // let result = true;
      11, // while (left <= right) {
      12, // const isEqual = chars[left] === chars[right];
      13, // steps.push({...});
      14, // if (!isEqual) {
      15, // result = false; break;
      18, // left++;
      19, // right--;
      21, // return { result, steps };
    ] : [
      1, // def validPalindrome(s: str) -> bool:
      2, // left, right = 0, len(s) - 1
      4, // while left < right:
      6, // while left < right and not s[left].isalnum():
      9, // while left < right and not s[right].isalnum():
      12, // if s[left].lower() != s[right].lower():
      14, // return False
      16, // left += 1
      17, // right -= 1
      19, // return True
    ];

    if (currentStepIndex >= 0 && currentStepIndex < stepToLineMap.length) {
      setHighlightedLine(stepToLineMap[currentStepIndex]);
    } else {
      setHighlightedLine(null);
    }
  }, [currentStepIndex, setHighlightedLine, language, steps.length]);

  const handleRun = () => {
    const { result, steps } = validPalindrome(input);
    const enhancedSteps: EnhancedStep[] = steps.map(step => ({
      ...step,
      description: step.isEqual 
        ? "Characters match! Moving pointers inward."
        : "Characters don't match! String is not a palindrome.",
      currentString: step.chars.join(''),
      leftPointer: step.left,
      rightPointer: step.right,
      comparison: `${step.chars[step.left]} ${step.isEqual ? '==' : '!='} ${step.chars[step.right]}`
    }));
    setSteps(enhancedSteps);
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
                  <img src="/1.svg" alt="Problem Icon" className="problem-icon" />
      <h1>125 - Valid Palindrome (E)</h1>
      <div className="problem-description">
        <p>
        A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and 
          removing all non-alphanumeric characters, it reads the same forward and backward.
        </p>
        <p>•  Given a string s, return true if it is a palindrome, or false otherwise.</p>
        
        <div className="examples">
          <p><strong>Examples:</strong></p>
          <div className="example-pair">
            <pre className="example-input">Input: s = "A man, a plan, a canal: Panama"</pre>
            <pre className="example-output">Output: true</pre>
          </div>

          <div className="example-pair">
            <pre className="example-input">Input: s = " "</pre>
            <pre className="example-output">Output: true</pre>
          </div>
        </div>
      </div>
      
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
        {currentStepIndex === 11 && result !== null && (
          <div className="result">
            <p><strong>Final Result:</strong> {result ? 'Valid Palindrome' : 'Not a Palindrome'}</p>
          </div>
        )}
      </div>

      {steps.length > 0 && (
        <div className="algorithm-visualization">
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

          <div className="visualization">
            {currentStep.chars.map((char, index) => {
              const isLeft = index === currentStep.left;
              const isRight = index === currentStep.right;
              const isActive = isLeft || isRight;
              const isMatching = isActive && currentStep.isEqual;
              const isNotMatching = isActive && !currentStep.isEqual;
              
              return (
                <div
                  key={index}
                  className={`char-box ${isActive ? 'active' : ''} 
                             ${isMatching ? 'matching' : ''} 
                             ${isNotMatching ? 'not-matching' : ''}`}
                  data-pointer={isLeft ? 'left' : isRight ? 'right' : ''}
                >
                  {char}
                  <span className="index">{index}</span>
                </div>
              );
            })}
          </div>

          {currentStepIndex === steps.length - 1 && (
            <ResultMessage isSuccess={result || false} />
          )}

          <div className="step-details">
            <h3>Current Step Details:</h3>
            <div className="detail-box">
              <p><strong>Original Input:</strong> "{input}"</p>
              <p><strong>Processed String:</strong> "{currentStep.currentString}"</p>
              <p><strong>Left Pointer (index {currentStep.left}):</strong> '{currentStep.chars[currentStep.left]}'</p>
              <p><strong>Right Pointer (index {currentStep.right}):</strong> '{currentStep.chars[currentStep.right]}'</p>
              <p><strong>Comparison:</strong> {currentStep.chars[currentStep.left]} {currentStep.isEqual ? '==' : '!='} {currentStep.chars[currentStep.right]}</p>
              <p><strong>Action:</strong> {
                currentStep.isEqual 
                  ? "Characters match! Moving pointers inward."
                  : "Characters don't match! String is not a palindrome."
              }</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PalindromeVisualizer;
