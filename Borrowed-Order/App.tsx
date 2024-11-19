// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import PalindromeVisualizer from './LCs/PalindromeVisualizer';
import ValidParenthesesVisualizer from './LCs/ValidParenthesesVisualizer';
import BinarySearchVisualizer from './LCs/BinarySearchVisualizer';
import ReverseLinkedListVisualizer from './LCs/ReverseLinkedListVisualizer';
import BuySellStockVisualizer from './LCs/BuySellStockVisualizer';
import ContainsDuplicateVisualizer from './LCs/ContainsDuplicateVisualizer';
import TwoSumVisualizer from './LCs/TwoSumVisualizer';
import GroupAnagramsVisualizer from './LCs/GroupAnagramsVisualizer';
import TwoSumIIVisualizer from './LCs/TwoSumIIVisualizer';

const App: React.FC = () => {
  return (
    <Router basename="/Borrowed-Order">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div></div>} />
          <Route path="valid-palindrome" element={<PalindromeVisualizer />} />
          <Route path="valid-parentheses" element={<ValidParenthesesVisualizer />} />
          <Route path="binary-search" element={<BinarySearchVisualizer />} />
          <Route path="reverse-linked-list" element={<ReverseLinkedListVisualizer />} />
          <Route path="best-time-to-buy-sell-stock" element={<BuySellStockVisualizer />} />
          <Route path="contains-duplicate" element={<ContainsDuplicateVisualizer />} />
          <Route path="two-sum" element={<TwoSumVisualizer />} />
          <Route path="two-sum-ii" element={<TwoSumIIVisualizer />} />
          <Route path="group-anagrams" element={<GroupAnagramsVisualizer />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
