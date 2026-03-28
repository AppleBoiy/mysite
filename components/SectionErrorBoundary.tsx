'use client';

import React, { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName?: string;
  className?: string;
  errorTitle?: string;
  errorMessage?: string;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): SectionErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `Error in section "${this.props.sectionName || 'unknown'}":`,
        error,
        errorInfo
      );
      console.error('Component stack:', errorInfo.componentStack);
    }

    // Optional: Send to error tracking service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <section className={`py-12 ${this.props.className || ''}`}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-muted/50 border border-border rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <AlertCircle size={24} className="text-red-600 dark:text-red-400" />
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {this.props.errorTitle || 'Unable to load this section'}
              </h3>

              <p className="text-sm text-muted-foreground mb-4">
                {this.props.errorMessage ||
                  'Something went wrong while loading this content.'}
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-4 text-left">
                  <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                    Error details
                  </summary>
                  <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto max-h-48">
                    {this.state.error.toString()}
                    {this.state.error.stack && (
                      <>
                        {'\n\n'}
                        {this.state.error.stack}
                      </>
                    )}
                  </pre>
                </details>
              )}

              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;
