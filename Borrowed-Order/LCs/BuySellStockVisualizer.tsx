// src/components/BuySellStockVisualizer.tsx

import React, { useState } from 'react';
import { maxProfit as calculateMaxProfit, Step } from '../Algos/buySellStock';
import './BuySellStockVisualizer.css';
import { Link } from 'react-router-dom';

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
        <Link to="/" className="back-button">← Back to Home</Link>
      <h1>Best Time to Buy and Sell Stock Visualizer</h1>
      <div className="input-section">
        <input
          type="text"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          placeholder="Enter prices, e.g., 7,1,5,3,6,4"
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
              Day {currentStep.day + 1} of {steps.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentStepIndex === steps.length - 1}
            >
              Next
            </button>
          </div>

          <div className="visualization">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`price-box ${
                  index === currentStepIndex ? 'current' : ''
                }`}
              >
                Day {index + 1}: ${step.price}
              </div>
            ))}
          </div>

          <div className="step-info">
            <p>Current Price: ${currentStep.price}</p>
            <p>Minimum Price So Far: ${currentStep.minPrice}</p>
            <p>Maximum Profit So Far: ${currentStep.maxProfit}</p>
          </div>

          {currentStepIndex === steps.length - 1 && (
            <h2>Maximum Profit: ${resultProfit}</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default BuySellStockVisualizer;
