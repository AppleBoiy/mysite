import { createContext, useContext, useState, useEffect } from 'react';

const LiteModeContext = createContext();

export function LiteModeProvider({ children }) {
  const [liteMode, setLiteMode] = useState(() => {
    // Check localStorage for user preference
    const saved = localStorage.getItem('lite-mode');
    return saved ? JSON.parse(saved) : false;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('lite-mode', JSON.stringify(liteMode));
    
    // Add class to body for CSS optimizations
    if (liteMode) {
      document.body.classList.add('lite-mode');
    } else {
      document.body.classList.remove('lite-mode');
    }
  }, [liteMode]);

  return (
    <LiteModeContext.Provider value={{ liteMode, setLiteMode }}>
      {children}
    </LiteModeContext.Provider>
  );
}

export function useLiteMode() {
  const context = useContext(LiteModeContext);
  if (!context) {
    throw new Error('useLiteMode must be used within LiteModeProvider');
  }
  return context;
}
