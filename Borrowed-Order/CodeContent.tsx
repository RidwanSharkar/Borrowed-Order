import React, { createContext, useState, ReactNode } from 'react';

type Language = 'typescript' | 'python';

interface CodeContextProps {
  code: string;
  setCode: (code: string) => void;
  highlightedLine: number | null;
  setHighlightedLine: (line: number | null) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const CodeContext = createContext<CodeContextProps>({
  code: '',
  setCode: () => {},
  highlightedLine: null,
  setHighlightedLine: () => {},
  language: 'typescript',
  setLanguage: () => {},
});

interface CodeProviderProps {
  children: ReactNode;
}

export const CodeProvider: React.FC<CodeProviderProps> = ({ children }) => {
  const [code, setCode] = useState<string>('');
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [language, setLanguage] = useState<Language>('typescript');

  return (
    <CodeContext.Provider value={{ code, setCode, highlightedLine, setHighlightedLine, language, setLanguage }}>
      {children}
    </CodeContext.Provider>
  );
}; 