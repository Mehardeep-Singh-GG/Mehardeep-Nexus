import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-[#05070A] flex flex-col items-center justify-center p-6 text-center font-mono">
          <h1 className="text-2xl font-bold text-red-500 mb-4">System Failure</h1>
          <p className="text-white/60 mb-8 max-w-md">
            The Nexus Core encountered a critical error. This might be due to WebGL limitations or a script failure.
          </p>
          <pre className="bg-white/5 p-4 rounded text-xs text-left overflow-auto max-w-full mb-8">
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest"
          >
            Reboot System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
