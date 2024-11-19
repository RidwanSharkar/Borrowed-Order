import React, { useState, useContext, useEffect } from 'react';
import { groupAnagramsSorting, groupAnagramsHashMap, Step } from '../Algos/groupAnagrams';
import './GroupAnagramsVisualizer.css';
import { CodeContext } from '../CodeContent';

const groupAnagramsSortingCode = `def groupAnagrams_sorting(strs):
    anagram_map = defaultdict(list)
    for s in strs:
        key = ''.join(sorted(s))
        anagram_map[key].append(s)
    return list(anagram_map.values())`;

const groupAnagramsOptimalCode = `def groupAnagrams_hashmap(strs):
    anagram_map = defaultdict(list)
    for s in strs:
        count = [0] * 26
        for char in s:
            count[ord(char) - ord('a')] += 1
        key = tuple(count)
        anagram_map[key].append(s)
    return list(anagram_map.values())`;

const groupAnagramsTypeScriptCode = `function groupAnagramsSorting(strs: string[]): string[][] {
  const anagramMap: { [key: string]: string[] } = {};
  for (const word of strs) {
    const key = word.split('').sort().join('');
    if (!anagramMap[key]) {
      anagramMap[key] = [];
    }
    anagramMap[key].push(word);
  }
  return Object.values(anagramMap);
}

function groupAnagramsHashMap(strs: string[]): string[][] {
  const anagramMap: { [key: string]: string[] } = {};
  for (const word of strs) {
    const count = new Array(26).fill(0);
    for (const char of word) {
      count[char.charCodeAt(0) - 97]++;
    }
    const key = count.join(',');
    if (!anagramMap[key]) {
      anagramMap[key] = [];
    }
    anagramMap[key].push(word);
  }
  return Object.values(anagramMap);
}`;

const GroupAnagramsVisualizer: React.FC = () => {
  const [inputArray, setInputArray] = useState('eat,tea,tan,ate,nat,bat');
  const [grouped, setGrouped] = useState<string[][]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedSolution, setSelectedSolution] = useState<'sorting' | 'hashmap'>('sorting');

  const { setCode, language } = useContext(CodeContext);

  useEffect(() => {
    if (language === 'python') {
      const code = selectedSolution === 'sorting' ? groupAnagramsSortingCode : groupAnagramsOptimalCode;
      setCode(code);
    } else {
      const code = selectedSolution === 'sorting' ? groupAnagramsTypeScriptCode.split('\n').slice(0, -1).join('\n') : groupAnagramsTypeScriptCode.split('\n').slice(-3).join('\n');
      setCode(code);
    }
  }, [language, selectedSolution, setCode]);

  const handleRun = () => {
    const strs = inputArray.split(',').map(s => s.trim());
    let result: { grouped: string[][]; steps: Step[] };
    if (selectedSolution === 'sorting') {
      result = language === 'python' ? { grouped: [], steps: [] } : groupAnagramsSorting(strs);
    } else {
      result = language === 'python' ? { grouped: [], steps: [] } : groupAnagramsHashMap(strs);
    }
    setGrouped(result.grouped);
    setSteps(result.steps);
    setCurrentStepIndex(0);
  };

  const handleNext = () => {
    setCurrentStepIndex(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStepIndex(prev => Math.max(prev - 1, 0));
  };

  const currentStep = steps[currentStepIndex];

  return (
    <div className="container">
      <img src="/Borrowed-Order/1.svg" alt="Problem Icon" className="problem-icon" />
      <h1>49 - Group Anagrams (M)</h1>

      {/* Problem Description */}
      <div className="problem-description">
        <p>
          Given an array of strings <code>strs</code>, group the anagrams together. You can return the answer in any order.
          An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
          typically using all the original letters exactly once.
        </p>

        <div className="examples">
          <p><strong>Examples:</strong></p>
          <div className="example-pair">
            <pre className="example-input">Input: strs = ["eat","tea","tan","ate","nat","bat"]</pre>
            <pre className="example-output">Output: [["bat"],["nat","tan"],["ate","eat","tea"]]</pre>
          </div>

          <div className="example-pair">
            <pre className="example-input">Input: strs = [""]</pre>
            <pre className="example-output">Output: [[""]]</pre>
          </div>

          <div className="example-pair">
            <pre className="example-input">Input: strs = ["a"]</pre>
            <pre className="example-output">Output: [["a"]]</pre>
          </div>
        </div>
      </div>

      {/* Solution Selection */}
      <div className="solution-selection">
        <label>Select Solution:</label>
        <select value={selectedSolution} onChange={(e) => setSelectedSolution(e.target.value as 'sorting' | 'hashmap')}>
          <option value="sorting">Sorting-Based</option>
          <option value="hashmap">Hash Map with Character Count</option>
        </select>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          placeholder="Enter strings, e.g., eat,tea,tan,ate,nat,bat"
        />
        <button onClick={handleRun}>Run</button>
      </div>

      {steps.length > 0 && currentStep && (
        <div className="algorithm-visualization">
          {/* Controls */}
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
              <p><strong>Word:</strong> {currentStep.word}</p>
              <p><strong>Key:</strong> {currentStep.key}</p>
            </div>

            {/* Visualization */}
            <div className="visualization-container">
              <div className="anagram-map glass-effect">
                {currentStep.groups && Object.entries(currentStep.groups).map(([key, words]) => (
                  <div key={key} className="word-container">
                    <strong>{key}:</strong>
                    {words.map((word, index) => (
                      <span key={index} className="word">{word}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Final Grouped Anagrams */}
          {currentStepIndex === steps.length - 1 && (
            <div className="result">
              <p><strong>Grouped Anagrams:</strong></p>
              <pre>{JSON.stringify(grouped, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupAnagramsVisualizer; 