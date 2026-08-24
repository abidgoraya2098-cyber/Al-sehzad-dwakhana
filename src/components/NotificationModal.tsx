import React from 'react';
import { X, Bell, Sparkles, CheckCheck, Lightbulb, Tag, Volume2 } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';

export const NotificationModal: React.FC = () => {
  const { isModalOpen, setIsModalOpen, notifications, markAsRead, markAllAsRead } =
    useNotifications();
  const { isUrdu, t } = useLanguage();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-600/30 max-h-[85vh] flex flex-col relative">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-base">
              {t('اعلانات و طبی ٹپس', 'Announcements & Health Tips')}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="text-[11px] font-bold text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{t('سب پڑھ لیے', 'Mark all read')}</span>
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                n.read
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-emerald-50/80 border-emerald-300 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    n.type === 'announcement'
                      ? 'bg-amber-100 text-amber-800'
                      : n.type === 'discount'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-teal-100 text-teal-800'
                  }`}
                >
                  {n.type === 'announcement' && <Sparkles className="w-3.5 h-3.5" />}
                  {n.type === 'discount' && <Tag className="w-3.5 h-3.5" />}
                  {n.type === 'health_tip' && <Lightbulb className="w-3.5 h-3.5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-950">
                      {isUrdu ? n.titleUr : n.titleEn}
                    </h4>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                    {isUrdu ? n.messageUr : n.messageEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
