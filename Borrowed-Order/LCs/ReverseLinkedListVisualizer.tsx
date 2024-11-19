// src/components/ReverseLinkedListVisualizer.tsx

import React, { useState, useEffect, useContext } from 'react';
import {
  reverseLinkedList,
  Step,
  createLinkedList,
} from '../Algos/reverseLinkedList';
import './shared-visualizer.css';
import './ReverseLinkedListVisualizer.css';
import { CodeContext } from '../CodeContent';

const reverseLinkedListTypeScriptCode = `function reverseLinkedList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current = head;
  
  while (current) {
    const nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }
  
  return prev;
}`;

const reverseLinkedListPythonCode = `def reverseList(head: ListNode) -> ListNode:
    prev, current = None, head
    
    while current:
        current.next, prev, current = prev, current, current.next
    
    return prev

# Recursive solution
def reverseListRecursive(head: ListNode) -> ListNode:
    if not head or not head.next:
        return head
        
    new_head = reverseListRecursive(head.next)
    head.next.next = head
    head.next = None
    return new_head`;

const ReverseLinkedListVisualizer: React.FC = () => {
  const [inputArray, setInputArray] = useState('1,2,3,4,5');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { setCode, language } = useContext(CodeContext);

  useEffect(() => {
    setCode(language === 'typescript' ? reverseLinkedListTypeScriptCode : reverseLinkedListPythonCode);
  }, [language, setCode]);

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
      <img src="/Borrowed-Order/1.svg" alt="Problem Icon" className="problem-icon" />
      <h1>206 - Reverse Linked List (E)</h1>
      
      <div className="problem-description">
        <p>Given the head of a singly linked list, reverse the list, and return the reversed list.</p>
        
        <div className="examples">
          <p><strong>Examples:</strong></p>
          <div className="example-pair">
            <pre className="example-input">Input: head = [1,2,3,4,5]</pre>
            <pre className="example-output">Output: [5,4,3,2,1]</pre>
          </div>
        </div>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          placeholder="Enter list values, e.g., 1,2,3,4,5"
        />
        <button onClick={handleRun}>Run</button>
      </div>

      {steps.length > 0 && currentStep && (
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

          <div className="step-details">
            <h3>Current Step Details:</h3>
            <div className="detail-box">
              <p><strong>Current Node:</strong> {currentStep.current !== null ? currentStep.current : 'null'}</p>
              <p><strong>Previous Node:</strong> {currentStep.prev !== null ? currentStep.prev : 'null'}</p>
              <p><strong>Next Node:</strong> {currentStep.nextNode !== null ? currentStep.nextNode : 'null'}</p>
            </div>

            <div className="linked-list-visualization">
              {currentStep.list.map((val, index) => (
                <div key={index} className="node-container">
                  <div className={`node ${val === currentStep.current ? 'current' : ''} 
                                      ${val === currentStep.prev ? 'prev' : ''}
                                      ${val === currentStep.nextNode ? 'next' : ''}`}>
                    <div className="value">{val}</div>
                    {index < currentStep.list.length - 1 && (
                      <div className="pointer">→</div>
                    )}
                  </div>
                  <div className="node-label">
                    {val === currentStep.current ? 'current' :
                     val === currentStep.prev ? 'prev' :
                     val === currentStep.nextNode ? 'next' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReverseLinkedListVisualizer;
