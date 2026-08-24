import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Dawakhana App:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-emerald-50 text-emerald-950 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-4 shadow-sm">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold mb-2">الشہزاد دواخانہ — عارضی مسئلہ</h1>
          <p className="text-sm text-slate-600 max-w-md mb-6">
            صفحہ لوڈ کرنے میں عارضی دقت پیش آئی ہے۔ برائے مہربانی صفحہ ریفریش کریں۔
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-md hover:bg-emerald-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>صفحہ ریفریش کریں (Reload App)</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
