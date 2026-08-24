import React, { createContext, useContext, useState } from 'react';
import { NotificationItem } from '../types';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    titleUr: '🌿 مفت آن لائن طبی مشورہ',
    titleEn: '🌿 Free Online Herbal Consultation',
    messageUr: 'اب آپ گھر بیٹھے حکیم صاحب سے اپنے مرض کی تفصیل اور رپورٹ شیئر کر کے مفت رہنمائی لے سکتے ہیں۔',
    messageEn: 'You can now consult our senior Hakeem and upload your medical reports online for free.',
    time: 'آج',
    type: 'announcement',
    read: false,
  },
  {
    id: 'notif-2',
    titleUr: '🚚 پورے پاکستان میں مفت ہوم ڈلیوری',
    titleEn: '🚚 Free Home Delivery Nationwide',
    messageUr: '3000 روپے یا اس سے زائد کے آرڈر پر فری ڈلیوری اور کیش آن ڈلیوری کی سہولت دستیاب ہے۔',
    messageEn: 'Enjoy free cash-on-delivery across Pakistan on orders of PKR 3000 or above.',
    type: 'discount',
    time: 'گزشتہ کل',
    read: false,
  },
  {
    id: 'notif-3',
    titleUr: '💡 روزمرہ کی صحت بخش طبی ٹپ',
    titleEn: '💡 Daily Herbal Health Tip',
    messageUr: 'صبح نہار منہ ایک چمچ بیری کا شہد نیم گرم پانی میں ملا کر پینے سے پیٹ کی چربی اور بلغم خارج ہوتا ہے۔',
    messageEn: 'Drinking warm water with 1 tbsp raw Sidr honey in the morning flushes toxins and boosts immunity.',
    type: 'health_tip',
    time: '2 دن پہلے',
    read: true,
  }
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        isModalOpen,
        setIsModalOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
