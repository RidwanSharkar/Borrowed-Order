import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Home from './Home';
import './Layout.css';
import { CodeContext } from './CodeContent';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('typescript', typescript);

const Layout: React.FC = () => {
  const location = useLocation();
  const { code, highlightedLine } = useContext(CodeContext);

  return (
    <div className="layout-container">
      <aside className="left-panel">
        <Home />
      </aside>
      <main className="center-panel">
        <Outlet />
      </main>
      {location.pathname !== '/' && (
        <aside className="right-panel">
          <SyntaxHighlighter
            language="typescript"
            style={github}
            showLineNumbers
            wrapLines
            lineProps={(lineNumber) => {
              const style: React.CSSProperties = highlightedLine === lineNumber
                ? { backgroundColor: 'yellow' }
                : {};
              return { style };
            }}
          >
            {code}
          </SyntaxHighlighter>
        </aside>
      )}
    </div>
  );
};

export default Layout;