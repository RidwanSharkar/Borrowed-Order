// src/components/BuySellStockVisualizer.tsx

import React, { useState } from 'react';
import { maxProfit as calculateMaxProfit, Step } from '../Algos/buySellStock';
import './shared-visualizer.css';
import './BuySellStockVisualizer.css';

const BuySellStockVisualizer: React.FC = () => {
  const [inputArray, setInputArray] = useState('7,1,5,3,6,4');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [resultProfit, setResultProfit] = useState<number | null>(null);

  const handleRun = () => {
    const prices = inputArray.split(',').map(Number);
    const { maxProfit, steps } = calculateMaxProfit(prices);
    setSteps(steps);
    setResultProfit(maxProfit);
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
      <h1>121 - Best Time to Buy and Sell Stock (E)</h1>
      
      {/* Problem Description Section */}
      <div className="problem-description">
        <p>
          You are given an array prices where prices[i] is the price of a given stock on the ith day.
          You want to maximize your profit by choosing a single day to buy one stock and choosing a 
          different day in the future to sell that stock.
        </p>
        <p>Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.</p>
        
        <div className="examples">
          <p><strong>Examples:</strong></p>
          <div className="example-pair">
            <pre className="example-input">Input: prices = [7,1,5,3,6,4]</pre>
            <pre className="example-output">Output: 5</pre>          </div>

          <div className="example-pair">
            <pre className="example-input">Input: prices = [7,6,4,3,1]</pre>
            <pre className="example-output">Output: 0</pre>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          placeholder="Enter prices, e.g., 7,1,5,3,6,4"
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
              <span>Day {currentStepIndex + 1} of {steps.length}</span>
              <button onClick={handleNext} disabled={currentStepIndex === steps.length - 1}>
                Next
              </button>
            </div>
          </div>

          {/* Step Details */}
          <div className="step-details">
            <h3>Current Step Details:</h3>
            <div className="detail-box">
              <p><strong>Current Day:</strong> {currentStep.day + 1}</p>
              <p><strong>Current Price:</strong> ${currentStep.price}</p>
              <p><strong>Minimum Price So Far:</strong> ${currentStep.minPrice}</p>
              <p><strong>Maximum Profit So Far:</strong> ${currentStep.maxProfit}</p>
              <p><strong>Action:</strong> {currentStep.description}</p>
            </div>

            <div className="visualization-container">
              <div className="stock-price-visualization">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`price-box ${
                      index === currentStepIndex ? 'current' : ''
                    } ${index === currentStep.day ? 'active' : ''}`}
                  >
                    <div className="price-value">${step.price}</div>
                    <div className="day-label">Day {index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Result Display */}
          {currentStepIndex === steps.length - 1 && (
            <div className="result">
              <p>
                <strong>Maximum Profit:</strong> ${resultProfit}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BuySellStockVisualizer;
