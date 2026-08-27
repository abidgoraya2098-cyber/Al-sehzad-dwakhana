import React from 'react';

interface DawakhanaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const DawakhanaLogo: React.FC<DawakhanaLogoProps> = ({
  className = '',
  size = 48,
  showText = true,
  textColor = 'text-slate-900',
}) => {
  return (
    <div className={`flex items-center gap-1.5 sm:gap-2.5 select-none shrink-0 ${className}`}>
      <div
        className="relative flex items-center justify-center shrink-0 rounded-full shadow-md overflow-hidden bg-emerald-900 border-2 border-amber-400 p-0.5"
        style={{ width: size, height: size }}
      >
        <img
          src="/logo.svg"
          alt="Al-Shehzad Dawakhana Logo"
          className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/logo.png';
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col text-right rtl:text-right ltr:text-left leading-tight shrink-0">
          <span className="font-bold text-sm sm:text-base md:text-xl tracking-tight text-emerald-950 whitespace-nowrap">
            الشہزاد دواخانہ
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-amber-700 tracking-wide whitespace-nowrap hidden sm:block">
            AL-SHEHZAD DAWAKHANA
          </span>
        </div>
      )}
    </div>
  );
};
