import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const InstallButton: React.FC<{ className?: string; isIconOnly?: boolean }> = ({
  className = '',
  isIconOnly = false,
}) => {
  const { t } = useLanguage();
  const [canInstall, setCanInstall] = useState<boolean>(() => {
    return !!(window as any).deferredPrompt;
  });

  useEffect(() => {
    const handlePromptReady = () => {
      setCanInstall(true);
    };

    const handleInstalled = () => {
      setCanInstall(false);
    };

    window.addEventListener('pwa-prompt-ready', handlePromptReady);
    window.addEventListener('pwa-installed', handleInstalled);

    // Initial check
    if ((window as any).deferredPrompt) {
      setCanInstall(true);
    }

    return () => {
      window.removeEventListener('pwa-prompt-ready', handlePromptReady);
      window.removeEventListener('pwa-installed', handleInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = (window as any).deferredPrompt;
    if (!promptEvent) {
      return;
    }

    // Directly call native Chrome install dialog
    promptEvent.prompt();
    const choiceResult = await promptEvent.userChoice;
    if (choiceResult && choiceResult.outcome === 'accepted') {
      (window as any).deferredPrompt = null;
      setCanInstall(false);
    }
  };

  if (!canInstall) return null;

  return (
    <button
      onClick={handleInstallClick}
      className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs shadow-md border border-amber-500 transition-all cursor-pointer ${className}`}
      title={t('ایپ انسٹال کریں', 'Install App')}
    >
      <Download className="w-3.5 h-3.5" />
      {!isIconOnly && <span>{t('ایپ انسٹال کریں', 'Install App')}</span>}
    </button>
  );
};
