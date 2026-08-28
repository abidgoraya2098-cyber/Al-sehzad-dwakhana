import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const OfflineBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });
  const [showReconnected, setShowReconnected] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline && !showReconnected) {
    return null;
  }

  return (
    <div className="fixed top-2 sm:top-3 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-auto max-w-lg animate-fadeIn select-none">
      {isOffline ? (
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white px-4 py-2.5 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold">
          <WifiOff className="w-4 h-4 text-amber-300 shrink-0 animate-pulse" />
          <span className="text-center">
            {t(
              'آپ اس وقت آف لائن ہیں — محفوظ شدہ ادویات و معلومات دستیاب ہیں',
              'You are offline — cached medicines & info are available'
            )}
          </span>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white px-4 py-2.5 rounded-2xl shadow-2xl border-2 border-emerald-400 flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold">
          <Wifi className="w-4 h-4 text-emerald-300 shrink-0" />
          <span className="text-center">
            {t('انٹرنیٹ بحال ہو گیا ہے!', 'Internet connection restored!')}
          </span>
        </div>
      )}
    </div>
  );
};
