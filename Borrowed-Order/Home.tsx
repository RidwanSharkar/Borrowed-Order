// src/Home.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <img src="/Borrowed-Order/3.svg" alt="App Icon" className="app-icon" />
      <ul className="problem-list">
        <li>
          <NavLink 
            to="/valid-palindrome" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Valid Palindrome
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/valid-parentheses" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Valid Parentheses
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/binary-search" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Binary Search
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/reverse-linked-list" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Reverse Linked List
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/best-time-to-buy-sell-stock" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Best Time to Buy & Sell Stock
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/group-anagrams" 
            className={({ isActive }) => 
              `medium-difficulty ${isActive ? 'active-link' : ''}`
            }
          >
            Group Anagrams
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/two-sum-ii" 
            className={({ isActive }) => 
              `medium-difficulty ${isActive ? 'active-link' : ''}`
            }
          >
            Two Sum II
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contains-duplicate" 
            className={({ isActive }) => 
              `easy-problem ${isActive ? 'active-link' : ''}`
            }
          >
            Contains Duplicate
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/two-sum" 
            className={({ isActive }) => 
              `easy-problem ${isActive ? 'active-link' : ''}`
            }
          >
            Two Sum
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Home;
