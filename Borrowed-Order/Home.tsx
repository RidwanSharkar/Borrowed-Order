// src/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Algorithm Visualizer</h1>
      <ul className="problem-list">
        <li>
          <Link to="/valid-palindrome">Valid Palindrome</Link>
        </li>
        <li>
          <Link to="/valid-parentheses">Valid Parentheses</Link>
        </li>
        <li>
          <Link to="/binary-search">Binary Search</Link>
        </li>
        <li>
          <Link to="/reverse-linked-list">Reverse Linked List</Link>
        </li>
        <li>
          <Link to="/best-time-to-buy-sell-stock">Best Time to Buy and Sell Stock</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
