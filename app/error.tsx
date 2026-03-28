'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by root boundary:', error);
      console.error('Stack:', error.stack);
      if (error.digest) {
        console.error('Digest:', error.digest);
      }
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <AlertCircle size={32} className="text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-foreground mb-3">
          Something went wrong
        </h1>
        
        <p className="text-muted-foreground mb-8">
          We encountered an unexpected error. Don&apos;t worry, your data is safe.
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <div className="mb-6 p-4 bg-muted rounded-lg text-left">
            <p className="text-sm font-mono text-red-600 dark:text-red-400 mb-2">
              {error.toString()}
            </p>
            {error.stack && (
              <details className="text-xs text-muted-foreground">
                <summary className="cursor-pointer hover:text-foreground">
                  Stack trace
                </summary>
                <pre className="mt-2 overflow-auto max-h-48">
                  {error.stack}
                </pre>
              </details>
            )}
            {error.digest && (
              <p className="text-xs text-muted-foreground mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          
          <Link
            href="/"
            className="px-6 py-3 border border-border rounded-full text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
