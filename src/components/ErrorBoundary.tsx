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

  private handleHardReset = () => {
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
    // Force bypass browser cache and reload fresh bundle
    window.location.href = window.location.origin + '/?cache_bust=' + Date.now();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f4f9f5] text-emerald-950 text-center font-sans">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-4 shadow-md border-2 border-amber-300">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black mb-2 text-slate-900">
            الشہزاد دواخانہ اینڈ ہربل کلینک
          </h1>
          <p className="text-sm text-slate-700 max-w-md mb-6 leading-relaxed font-medium">
            براؤزر میں پرانی کیش کی وجہ سے عارضی رکاوٹ پیش آئی ہے۔ نیچے دیے گئے بٹن پر کلک کر کے ایپ کو فوری بحال کریں۔
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={this.handleHardReset}
              className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm flex items-center gap-2 shadow-xl transition-all cursor-pointer border border-emerald-600"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>ایپ کو فوری بحال کریں (Restore App Now)</span>
            </button>
          </div>

          {this.state.error && (
            <div className="mt-6 p-3 bg-red-50 text-red-700 text-xs font-mono rounded-xl border border-red-200 max-w-md text-left overflow-auto">
              {this.state.error.toString()}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
