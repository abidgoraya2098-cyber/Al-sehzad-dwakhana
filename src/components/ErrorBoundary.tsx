import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle, RotateCcw } from 'lucide-react';

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

  private handleReload = () => {
    try {
      this.setState({ hasError: false, error: null });
      window.location.reload();
    } catch {
      window.location.href = '/';
    }
  };

  private handleResetCache = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((r) => r.unregister());
        });
      }
    } catch (e) {
      console.warn(e);
    }
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-emerald-50 text-emerald-950 text-center font-sans">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-4 shadow-sm border border-amber-300">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold mb-2 text-slate-900">الشہزاد دواخانہ اینڈ ہربل کلینک</h1>
          <p className="text-sm text-slate-600 max-w-md mb-4 leading-relaxed">
            صفحہ لوڈ کرنے میں عارضی دقت پیش آئی ہے۔ آپ صفحہ ریفریش کر سکتے ہیں یا کیش ری سیٹ کر کے دوبارہ کھول سکتے ہیں۔
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={this.handleReload}
              className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>صفحہ ریفریش کریں (Reload)</span>
            </button>

            <button
              onClick={this.handleResetCache}
              className="px-5 py-2.5 rounded-xl bg-amber-400 text-emerald-950 font-black text-xs flex items-center gap-2 shadow-md hover:bg-amber-300 transition-all border border-amber-500 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>کیش صاف کر کے ری سیٹ کریں (Clear Cache)</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
