import React, { useContext, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Home from './Home';
import './Layout.css';
import { CodeContext } from './CodeContent';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import gsap from 'gsap';
import { FaBars, FaTimes } from 'react-icons/fa';

SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);

const Layout: React.FC = () => {
  const location = useLocation();
  const { code, highlightedLine, language, setLanguage } = useContext(CodeContext);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);

  // GSAP forRight Panel
  useEffect(() => {
    if (rightPanelRef.current && isRightPanelVisible) {
      gsap.fromTo(
        rightPanelRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [code, language, isRightPanelVisible]);

  // GSAP for Left Panel Toggle
  useEffect(() => {
    if (leftPanelRef.current) {
      if (isLeftPanelVisible) {
        gsap.to(leftPanelRef.current, { x: 0, duration: 0.5, display: 'block', ease: 'power3.out' });
        gsap.to('.center-panel', { marginLeft: '250px', duration: 0.5, ease: 'power3.out' });
        gsap.to('.toggle-button-left', { left: '270px', duration: 0.5, ease: 'power3.out' });
      } else {
        gsap.to(leftPanelRef.current, { x: -250, duration: 0.5, display: 'none', ease: 'power3.in' });
        gsap.to('.center-panel', { marginLeft: '0px', duration: 0.5, ease: 'power3.in' });
        gsap.to('.toggle-button-left', { left: '20px', duration: 0.5, ease: 'power3.in' });
      }
    }
  }, [isLeftPanelVisible]);

  // GSAP for Right Panel Toggle
  useEffect(() => {
    if (rightPanelRef.current) {
      if (isRightPanelVisible) {
        const panelWidth = 520; // Fixed width 
        
        document.documentElement.style.setProperty('--right-panel-width', `${panelWidth}px`);
        
        gsap.to(rightPanelRef.current, { 
          x: 0, 
          duration: 0.5, 
          display: 'block', 
          ease: 'power3.out' 
        });
        gsap.to('.center-panel', { 
          marginRight: `${panelWidth}px`, 
          duration: 0.5, 
          ease: 'power3.out' 
        });
      } else {
        gsap.to(rightPanelRef.current, { 
          x: 250, 
          duration: 0.5, 
          display: 'none', 
          ease: 'power3.in' 
        });
        gsap.to('.center-panel', { 
          marginRight: '0px', 
          duration: 0.5, 
          ease: 'power3.in' 
        });
      }
    }
  }, [isRightPanelVisible]); 

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'typescript' | 'python');
  };

  const toggleLeftPanel = () => {
    setIsLeftPanelVisible(!isLeftPanelVisible);
  };

  const toggleRightPanel = () => {
    setIsRightPanelVisible(!isRightPanelVisible);
  };

  return (
    <div className="layout-container">
      {/* Left Panel */}
      <aside className={`left-panel ${!isLeftPanelVisible ? 'hidden' : ''}`} ref={leftPanelRef}>
        <Home />
      </aside>

      {/* Toggle Button for Left Panel */}
      <button className="toggle-button toggle-button-left" onClick={toggleLeftPanel}>
        {isLeftPanelVisible ? <FaTimes /> : <FaBars />}
      </button>

      {/* Center Panel */}
      <main className="center-panel">
        <Outlet />
      </main>

      {/* Right Panel */}
      {location.pathname !== '/' && (
        <aside className={`right-panel ${!isRightPanelVisible ? 'hidden' : ''}`} ref={rightPanelRef}>
          <div className="right-panel-header">
            <img src="/4.svg" alt="Code Icon" className="app-icon" />
            <div className="language-selector">
              <label htmlFor="language-select">Language: </label>
              <select 
                id="language-select"
                value={language} 
                onChange={handleLanguageChange}
              >
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
              </select>
            </div>
          </div>
          <SyntaxHighlighter
            language={language}
            style={{
              ...github,
              'hljs-keyword': {color: '#C586C0'},    // pink for keywords
              'hljs-function': {color: '#DCDCAA'},    // yellow for function names
              'hljs-string': {color: '#CE9178'},      // orange for strings
              'hljs-comment': {color: '#6A9955'},     // green for comments
              'hljs-number': {color: '#B5CEA8'},      // light green for numbers
              'hljs-operator': {color: '#D4D4D4'},    // white for operators
              'hljs-punctuation': {color: '#D4D4D4'}, // white for punctuation
              'hljs-variable': {color: '#9CDCFE'},    // light blue for variables
              'hljs-title': {color: '#DCDCAA'},       // yellow for function names
              'hljs-params': {color: '#9CDCFE'},      // light blue for parameters
            }}
            showLineNumbers
            wrapLines
            lineProps={(lineNumber) => {
              const style: React.CSSProperties = highlightedLine === lineNumber
                ? { backgroundColor: '#2d2d2d' }
                : {};
              return { style };
            }}
            customStyle={{ 
              width: '100%', 
              maxWidth: '800px',
              margin: '0 auto',
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              fontSize: '0.85rem', // FONT SIZE
              fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace'
            }}
          >
            {code}
          </SyntaxHighlighter>
        </aside>
      )}

      {/* Toggle Button for Right Panel */}
      {location.pathname !== '/' && (
        <button className="toggle-button toggle-button-right" onClick={toggleRightPanel}>
          {isRightPanelVisible ? <FaTimes /> : <FaBars />}
        </button>
      )}
    </div>
  );
};

export default Layout;