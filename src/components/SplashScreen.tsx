import React, { useEffect, useState } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { DawakhanaLogo } from './DawakhanaLogo';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(onFinish, 600);
    }, 1400);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#022319] via-[#064e3b] to-[#022319] text-white select-none transition-opacity duration-600 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-5 animate-pulse text-center px-4">
        <div className="p-3 rounded-full bg-emerald-950/80 border-2 border-amber-400 shadow-2xl">
          <img
            src="/logo.svg"
            alt="Al-Shehzad Dawakhana"
            className="w-24 h-24 object-contain"
          />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
            الشہزاد دواخانہ اینڈ ہربل کلینک
          </h1>
          <span className="text-xs font-bold text-emerald-200 tracking-widest block">
            AL-SHEHZAD DAWAKHANA &amp; CLINIC
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold pt-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>100% خالص دیسی جڑی بوٹیاں و مستند حکمت</span>
        </div>

        <div className="w-28 h-1 bg-emerald-900 rounded-full overflow-hidden mt-4">
          <div className="w-full h-full bg-amber-400 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};
