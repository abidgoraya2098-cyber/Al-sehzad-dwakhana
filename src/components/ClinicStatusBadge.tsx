import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const ClinicStatusBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isUrdu, t } = useLanguage();
  const { hakeemSettings } = useAdmin();
  const [isAutoOpen, setIsAutoOpen] = useState(false);
  const [currentTimeText, setCurrentTimeText] = useState('');

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 5 = Friday
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      // Format current time
      const timeString = now.toLocaleTimeString('ur-PK', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentTimeText(timeString);

      // Friday is closed (ناغہ بروز جمعۃ المبارک)
      if (day === 5) {
        setIsAutoOpen(false);
        return;
      }

      // Exact Visiting Card Timings:
      // Morning Shift: 10:00 AM - 02:00 PM (600 - 840 mins)
      // Break: 02:00 PM - 04:00 PM (840 - 960 mins)
      // Evening Shift: 04:00 PM - 08:00 PM (960 - 1200 mins)
      const isMorningShift = currentMinutes >= 600 && currentMinutes <= 840;
      const isEveningShift = currentMinutes >= 960 && currentMinutes <= 1200;

      setIsAutoOpen(isMorningShift || isEveningShift);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // Determine effective status based on manual override vs auto mode
  const mode = hakeemSettings?.clinicStatusMode || 'auto';
  const effectiveIsOpen = mode === 'open' ? true : mode === 'closed' ? false : isAutoOpen;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black shadow-xs select-none border transition-all ${
        effectiveIsOpen
          ? 'bg-emerald-100 text-emerald-950 border-emerald-400'
          : 'bg-amber-100 text-amber-950 border-amber-400'
      } ${className}`}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            effectiveIsOpen ? 'bg-emerald-500' : 'bg-amber-500'
          }`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            effectiveIsOpen ? 'bg-emerald-600' : 'bg-amber-600'
          }`}
        ></span>
      </span>

      <span>
        {effectiveIsOpen
          ? t('🟢 کلینک اس وقت کھلا ہے (اوپن)', '🟢 Clinic is OPEN Now')
          : t('🔴 کلینک فی الوقت بند ہے (آن لائن دستیاب)', '🔴 Clinic Closed (Online Available)')}
      </span>
    </div>
  );
};
