import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConsultationSubmission, HakeemSettings } from '../types';

interface AdminContextType {
  isAdminLoggedIn: boolean;
  adminEmail: string;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  updateAdminPassword: (newPass: string) => boolean;
  hakeemSettings: HakeemSettings;
  updateHakeemSettings: (newSettings: Partial<HakeemSettings>) => void;
  consultations: ConsultationSubmission[];
  addConsultation: (consultation: Omit<ConsultationSubmission, 'id' | 'timestamp' | 'status'>) => void;
  updateConsultationStatus: (id: string, status: 'new' | 'in_progress' | 'completed') => void;
  deleteConsultation: (id: string) => void;
}

const AUTHORIZED_EMAIL = 'abidgoraya2098@gmail.com';

const defaultHakeemSettings: HakeemSettings = {
  nameUr: 'حکیم محمد نواز احمد',
  nameEn: 'Hakim Muhammad Nawaz Ahmad',
  titleUr: 'حکیم حاذق و سینئر نباض',
  titleEn: 'Chief Physician & Pulse Specialist',
  degreeUr: 'فاضل الطب والجراحت (F.T.J / B.U.M.S)',
  degreeEn: 'Faculty of Tibb & Surgery (FTJ / BUMS)',
  regNo: 'NCT-89423',
  experienceYears: '30+',
  avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
  phone: '0300-0000000',
  whatsapp: '923000000000',
  email: 'abidgoraya2098@gmail.com',
  addressUr: 'الشہزاد دواخانہ اینڈ ہربل کلینک، مین جی ٹی روڈ، گوجرانوالہ، پنجاب، پاکستان',
  addressEn: 'Al-Shehzad Dawakhana & Clinic, Main GT Road, Gujranwala, Punjab, Pakistan',
  clinicTimingsUr: 'صبح 09:00 تا 01:30 بجے • شام 04:30 تا 10:30 بجے (جمعہ تعطیل)',
  clinicTimingsEn: '09:00 AM - 01:30 PM & 04:30 PM - 10:30 PM (Friday Closed)',
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('dawakhana_admin_auth') === 'true';
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem('dawakhana_admin_pass') || 'admin123';
  });

  const [hakeemSettings, setHakeemSettings] = useState<HakeemSettings>(() => {
    try {
      const saved = localStorage.getItem('dawakhana_hakeem_settings');
      if (saved) {
        return { ...defaultHakeemSettings, ...JSON.parse(saved) };
      }
      return defaultHakeemSettings;
    } catch {
      return defaultHakeemSettings;
    }
  });

  const [consultations, setConsultations] = useState<ConsultationSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('dawakhana_consultations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('dawakhana_hakeem_settings', JSON.stringify(hakeemSettings));
  }, [hakeemSettings]);

  useEffect(() => {
    localStorage.setItem('dawakhana_consultations', JSON.stringify(consultations));
  }, [consultations]);

  const loginAdmin = (email: string, pass: string): boolean => {
    const isEmailValid =
      email.trim().toLowerCase() === AUTHORIZED_EMAIL.toLowerCase() ||
      email.trim().toLowerCase() === hakeemSettings.email.toLowerCase();

    // Valid if matches custom password or default master admin credentials
    if (isEmailValid && (pass === adminPassword || pass === 'admin123' || pass === '123456')) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('dawakhana_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('dawakhana_admin_auth');
  };

  const updateAdminPassword = (newPass: string): boolean => {
    if (newPass.length >= 4) {
      setAdminPassword(newPass);
      localStorage.setItem('dawakhana_admin_pass', newPass);
      return true;
    }
    return false;
  };

  const updateHakeemSettings = (newSettings: Partial<HakeemSettings>) => {
    setHakeemSettings((prev) => ({
      ...prev,
      ...newSettings,
      whatsapp: newSettings.phone ? newSettings.phone.replace(/\D/g, '') : prev.whatsapp,
    }));
  };

  const addConsultation = (item: Omit<ConsultationSubmission, 'id' | 'timestamp' | 'status'>) => {
    const newRecord: ConsultationSubmission = {
      ...item,
      id: 'cons-' + Date.now(),
      timestamp: new Date().toLocaleString('ur-PK'),
      status: 'new',
    };
    setConsultations((prev) => [newRecord, ...prev]);
  };

  const updateConsultationStatus = (id: string, status: 'new' | 'in_progress' | 'completed') => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const deleteConsultation = (id: string) => {
    setConsultations((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        adminEmail: AUTHORIZED_EMAIL,
        loginAdmin,
        logoutAdmin,
        updateAdminPassword,
        hakeemSettings,
        updateHakeemSettings,
        consultations,
        addConsultation,
        updateConsultationStatus,
        deleteConsultation,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
