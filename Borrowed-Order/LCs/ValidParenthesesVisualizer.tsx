// src/components/ValidParenthesesVisualizer.tsx

import React, { useState, useEffect, useContext } from 'react';
import { validParentheses, Step } from '../Algos/validParentheses';
import './shared-visualizer.css';
import './ValidParenthesesVisualizer.css';
import { CodeContext } from '../CodeContent';

const validParenthesesTypeScriptCode = `function validParentheses(s: string): boolean {
    const dict: { [key: string]: string } = {
        ')': '(',
        '}': '{',
        ']': '[',
    };
    const stack: string[] = [];
    
    for (const char of s) {
        if (dict[char]) {
            const top = stack.pop();
            if (top !== dict[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`;

const validParenthesesPythonCode = `def validParentheses(s: str) -> bool:
    dict = {')': '(', '}': '{', ']': '['}
    stack = []
    
    for char in s:
        if char in dict:
            if not stack or stack.pop() != dict[char]:
                return False
        else:
            stack.append(char)
    
    return not stack`;

interface EnhancedStep extends Step {
  description: string;
  currentChar: string;
  action: "push" | "pop";
}

const ValidParenthesesVisualizer: React.FC = () => {
  const [input, setInput] = useState('()[]{}');
  const [steps, setSteps] = useState<EnhancedStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { setCode, setHighlightedLine, language } = useContext(CodeContext);
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    const codeToSet = language === 'typescript' ? validParenthesesTypeScriptCode : validParenthesesPythonCode;
    setCode(codeToSet);
  }, [setCode, language]);

  useEffect(() => {
    const stepToLineMap: number[] = language === 'typescript' ? [
      1, // function signature
      2, // dictionary
      3, // stack initialization
      5, // for loop
      6, // if char in dict
      7, // pop stack
      8, // check if top matches
      10, // push to stack
      13, // return statement
    ] : [
      1, // def validParentheses
      2, // dictionary
      3, // stack initialization
      5, // for loop
      6, // if char in dict
      7, // if not stack or pop
      9, // push to stack
      11, // return statement
    ];

    if (currentStepIndex >= 0 && currentStepIndex < stepToLineMap.length) {
      setHighlightedLine(stepToLineMap[currentStepIndex]);
    } else {
      setHighlightedLine(null);
    }
  }, [currentStepIndex, setHighlightedLine, language, steps.length]);

  const handleRun = () => {
    const { result, steps } = validParentheses(input);
    const enhancedSteps: EnhancedStep[] = steps.map(step => ({
      ...step,
      description: step.action === 'push' 
        ? "Pushing character onto the stack."
        : step.action === 'pop' && step.isValid
          ? "Popped matching character from the stack."
          : "Popped non-matching character. String is invalid.",
      currentChar: step.char,
      action: step.action,
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
      <h1>20 - Valid Parentheses (E)</h1>
      <div className="problem-description">
        <p>
          Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, 
          <code>'{'</code>, <code>'}'</code>, <code>'['</code>, and <code>']'</code>, 
          determine if the input string is valid.
        </p>
        <p>An input string is valid if:</p>
        <ul>
          <li>Open brackets must be closed by the same type of brackets.</li>
          <li>Open brackets must be closed in the correct order.</li>
          <li>Every close bracket has a corresponding open bracket of the same type.</li>
        </ul>
        <div className="examples">
          <p><strong>Examples:</strong></p>
          <div className="example-pair">
            <pre className="example-input">Input: s = "()"</pre>
            <pre className="example-output">Output: true</pre>
          </div>
          <div className="example-pair">
            <pre className="example-input">Input: s = "()[]{}"</pre>
            <pre className="example-output">Output: true</pre>
          </div>
          <div className="example-pair">
            <pre className="example-input">Input: s = "(]"</pre>
            <pre className="example-output">Output: false</pre>
          </div>
        </div>
        <p><strong>Constraints:</strong></p>
        <ul>
          <li>1 ≤ s.length ≤ 10<sup>4</sup></li>
          <li>s consists of parentheses only <code>{'()[]{}'}</code>.</li>
        </ul>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter parentheses, e.g., "()[]{}"'
        />
        <button onClick={handleRun}>Run</button>
        {currentStepIndex === steps.length - 1 && result !== null && (
          <div className="result">
            <p><strong>Final Result:</strong> {result ? 'Valid Parentheses' : 'Invalid Parentheses'}</p>
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
            {/* Stack Visualization */}
            <div className="stack">
              <h2>Stack</h2>
              <div className={`stack-visualization ${currentStep.stack.length === 0 ? 'empty' : ''}`}>
                {currentStep.stack.map((char, index) => (
                  <div key={index} className="stack-item">
                    {char}
                  </div>
                ))}
              </div>
            </div>

            {/* Current Character Visualization */}
            <div className="current-char">
              <h2>Current Character</h2>
              <div className={`char-box ${currentStep.action === 'push' ? 'pushing' : 'popping'}`}>
                {currentStep.currentChar}
              </div>
            </div>
          </div>

          <div className="step-details">
            <h3>Current Step Details:</h3>
            <div className="detail-box">
              <p><strong>Input String:</strong> "{input}"</p>
              <p><strong>Current Character:</strong> '{currentStep.currentChar}'</p>
              <p><strong>Action:</strong> {currentStep.description}</p>
              <p><strong>Stack Contents:</strong> [{currentStep.stack.join(', ')}]</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidParenthesesVisualizer;
