import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles, Smartphone, Share, PlusSquare, CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PwaInstallPrompt: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed / running as standalone PWA
    const isRunningStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isRunningStandalone) {
      setIsStandalone(true);
      return;
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Check if previously dismissed in this session
    const dismissed = sessionStorage.getItem('pwa_prompt_dismissed');

    // Listener for custom trigger event
    const handleOpenInstallModal = () => {
      setShowPrompt(true);
    };
    window.addEventListener('open-pwa-install', handleOpenInstallModal);

    // Auto-show prompt after 2.5 seconds on Google Chrome / mobile browsers
    const timer = setTimeout(() => {
      if (!dismissed && !isRunningStandalone) {
        setShowPrompt(true);
      }
    }, 2500);

    const handlePwaInstalled = () => {
      setShowPrompt(false);
      setIsStandalone(true);
    };
    window.addEventListener('pwa-installed', handlePwaInstalled);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-pwa-install', handleOpenInstallModal);
      window.removeEventListener('pwa-installed', handlePwaInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = (window as any).deferredPrompt || (window as any).deferredPwaPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      const choiceResult = await promptEvent.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setShowPrompt(false);
      }
      (window as any).deferredPrompt = null;
      (window as any).deferredPwaPrompt = null;
    } else if (isIos) {
      // iOS handled in modal instructions
    } else {
      // Generic fallback instructions
      alert(
        isUrdu
          ? 'کروم براؤزر کے اوپر دائیں کونے میں تھری ڈاٹس (⋮) پر کلک کریں اور "Install App" یا "Add to Home screen" منتخب کریں۔'
          : 'Click the browser menu (⋮) and choose "Install App" or "Add to Home Screen".'
      );
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 relative animate-slideUp">
        {/* Top Header Banner */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black shadow-md shrink-0">
              <img src="/logo.svg" alt="App Logo" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base leading-tight">
                {t('الشہزاد دواخانہ ایپ انسٹال کریں', 'Install Al-Shehzad App')}
              </h3>
              <span className="text-[11px] text-amber-300 font-bold flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3" />
                <span>{t('گوگل کروم و اینڈرائیڈ آفیشل PWA', 'Official Google Chrome & Mobile App')}</span>
              </span>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              {t('ایپ انسٹال کرنے کے اہم فوائد:', 'Key App Advantages:')}
            </h4>

            <div className="space-y-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-700 font-bold bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
                <Zap className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{t('⚡ بغیر لوڈنگ کے انتہائی تیز رفتار 1-ٹیپ ایکسس', 'Instant 1-tap mobile launch with zero loading lag')}</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700 font-bold bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{t('🌿 آف لائن موڈ میں بھی دیسی ٹوٹکے اور ادویات کیٹلاگ دستیاب', 'Offline access to remedies, medicines & clinic info')}</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700 font-bold bg-teal-50/70 p-2.5 rounded-xl border border-teal-200">
                <Smartphone className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>{t('📱 ہوم اسکرین پر خوبصورت ایپ آئیکن اور لائیو کال کی سہولت', 'Home screen icon with direct Hakim consultation calls')}</span>
              </div>
            </div>
          </div>

          {/* iOS Specific Instructions if on Safari */}
          {isIos && (
            <div className="bg-slate-100 p-3 rounded-2xl border border-slate-300 text-xs text-slate-800 space-y-1.5 font-bold">
              <span className="text-emerald-900 block font-black">
                {t('آئی فون (iPhone/Safari) پر انسٹال کرنے کا طریقہ:', 'How to Install on iPhone:')}
              </span>
              <div className="flex items-center gap-2">
                <Share className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{t('1. نیچے سفاری کے Share بٹن پر کلک کریں۔', '1. Tap the Share button in Safari')}</span>
              </div>
              <div className="flex items-center gap-2">
                <PlusSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('2. "Add to Home Screen ➕" منتخب کریں۔', '2. Select "Add to Home Screen"')}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleInstallClick}
              className="flex-1 py-3.5 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-800 hover:from-emerald-800 hover:to-teal-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400"
            >
              <Download className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>{t('📲 ابھی ایپ انسٹال کریں (Install Now)', 'Install App Now')}</span>
            </button>

            <button
              onClick={handleDismiss}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-colors text-center"
            >
              {t('بعد میں', 'Maybe Later')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
