import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ErrorBoundary from '@/components/ErrorBoundary'
import { LiteModeProvider } from '@/contexts/LiteModeContext'
import App from '@/App.jsx'
import '@/index.css'
import './i18n'

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <HelmetProvider>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem
        storageKey="chaipat-theme"
      >
        <LiteModeProvider>
          <App />
          <Analytics />
          <SpeedInsights />
        </LiteModeProvider>
      </ThemeProvider>
    </HelmetProvider>
  </ErrorBoundary>
)
