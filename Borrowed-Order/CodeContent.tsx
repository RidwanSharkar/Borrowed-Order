import React, { createContext, useState, ReactNode } from 'react';

interface CodeContextProps {
  code: string;
  setCode: (code: string) => void;
  highlightedLine: number | null;
  setHighlightedLine: (line: number | null) => void;
}

export const CodeContext = createContext<CodeContextProps>({
  code: '',
  setCode: () => {},
  highlightedLine: null,
  setHighlightedLine: () => {},
});

interface CodeProviderProps {
  children: ReactNode;
}

export const CodeProvider: React.FC<CodeProviderProps> = ({ children }) => {
  const [code, setCode] = useState<string>('');
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);

  return (
    <CodeContext.Provider value={{ code, setCode, highlightedLine, setHighlightedLine }}>
      {children}
    </CodeContext.Provider>
  );
}; 