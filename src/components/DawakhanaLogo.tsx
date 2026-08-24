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
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div
        className="relative flex items-center justify-center shrink-0 rounded-full shadow-md overflow-hidden bg-emerald-900 border-2 border-amber-400 p-0.5"
        style={{ width: size, height: size }}
      >
        <img
          src="/logo.svg"
          alt="Al-Shehzad Dawakhana Logo"
          className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback if SVG fails to load
            const target = e.target as HTMLImageElement;
            target.src = '/logo.png';
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col text-right rtl:text-right ltr:text-left leading-tight">
          <span className="font-bold text-lg md:text-xl tracking-tight text-emerald-950">
            الشہزاد دواخانہ
          </span>
          <span className="text-[11px] md:text-xs font-semibold text-amber-700 tracking-wide">
            AL-SHEHZAD DAWAKHANA
          </span>
        </div>
      )}
    </div>
  );
};
