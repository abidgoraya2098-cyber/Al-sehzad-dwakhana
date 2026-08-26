import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AppNotification {
  id: string;
  titleUr: string;
  titleEn: string;
  descUr: string;
  descEn: string;
  time: string;
  read: boolean;
  type: 'order' | 'consultation' | 'alert' | 'discount';
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const defaultNotifications: AppNotification[] = [
  {
    id: '1',
    titleUr: 'طبی مشورہ و نبض شناسی',
    titleEn: 'Free Pulse Consultation',
    descUr: 'آن لائن حکیم صاحب سے مفت نبض شناسی و طبی مشورہ حاصل کریں۔',
    descEn: 'Get free pulse diagnosis & clinical consultation online from Chief Hakim.',
    time: 'ابھی',
    read: false,
    type: 'consultation',
  },
  {
    id: '2',
    titleUr: '100% خالص جڑی بوٹیاں',
    titleEn: '100% Pure Natural Herbs',
    descUr: 'تمام ادویات خالص قدرتی جڑی بوٹیوں سے تیار کی جاتی ہیں۔',
    descEn: 'All herbal medicines are made from 100% natural, lab-tested herbs.',
    time: '2 گھنٹے پہلے',
    read: false,
    type: 'alert',
  },
  {
    id: '3',
    titleUr: 'پورے پاکستان میں ہوم ڈلیوری',
    titleEn: 'Cash on Delivery Across Pakistan',
    descUr: 'کیش آن ڈلیوری کے ساتھ ادویات گھر کی دہلیز پر حاصل کریں۔',
    descEn: 'Order easily with cash on delivery anywhere in Pakistan.',
    time: '1 دن پہلے',
    read: true,
    type: 'discount',
  },
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('dawakhana_notifications');
      return saved ? JSON.parse(saved) : defaultNotifications;
    } catch {
      return defaultNotifications;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('dawakhana_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

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
    return {
      notifications: defaultNotifications,
      unreadCount: 0,
      markAsRead: () => {},
      markAllAsRead: () => {},
      isModalOpen: false,
      setIsModalOpen: () => {},
      toastMessage: null,
      showToast: () => {},
    };
  }
  return context;
};
