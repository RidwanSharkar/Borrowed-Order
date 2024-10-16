// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PalindromeVisualizer from './LCs/PalindromeVisualizer';
import ValidParenthesesVisualizer from './LCs/ValidParenthesesVisualizer';
import BinarySearchVisualizer from './LCs/BinarySearchVisualizer';
import ReverseLinkedListVisualizer from './LCs/ReverseLinkedListVisualizer';
import BuySellStockVisualizer from './LCs/BuySellStockVisualizer';
import Home from './Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valid-palindrome" element={<PalindromeVisualizer />} />
        <Route path="/valid-parentheses" element={<ValidParenthesesVisualizer />} />
        <Route path="/binary-search" element={<BinarySearchVisualizer />} />
        <Route path="/reverse-linked-list" element={<ReverseLinkedListVisualizer />} />
        <Route path="/best-time-to-buy-sell-stock" element={<BuySellStockVisualizer />} />
      </Routes>
    </Router>
  );
};

export default App;
