import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConsultationSubmission, HakeemSettings } from '../types';

interface AdminContextType {
  isAdminLoggedIn: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  updateAdminPassword: (newPass: string) => boolean;
  hakeemSettings: HakeemSettings;
  updateHakeemSettings: (newSettings: Partial<HakeemSettings>) => void;
  consultations: ConsultationSubmission[];
  addConsultation: (consultation: Omit<ConsultationSubmission, 'id' | 'timestamp' | 'status'>) => void;
  updateConsultationStatus: (id: string, status: 'new' | 'in_progress' | 'completed') => void;
  deleteConsultation: (id: string) => void;
}

const defaultHakeemSettings: HakeemSettings = {
  nameUr: 'حکیم محمد نواز احمد',
  nameEn: 'Hakim Muhammad Nawaz Ahmad',
  titleUr: 'حکیم حاذق و سینئر نباض',
  titleEn: 'Chief Physician & Pulse Specialist',
  degreeUr: 'فاضل الطب والجراحت (F.T.J / B.U.M.S)',
  degreeEn: 'Faculty of Tibb & Surgery (FTJ / BUMS)',
  regNo: 'NCT-89423',
  experienceYears: '30+',
  avatarUrl: '/hakeem-nawaz.jpg',
  phone: '0300-6458169',
  whatsapp: '923006458169',
  email: 'Nawaznaji012@gmail.com',
  addressUr: 'الشہزاد دواخانہ اینڈ ہربل کلینک، مین جی ٹی روڈ، گوجرانوالہ، پنجاب، پاکستان',
  addressEn: 'Al-Shehzad Dawakhana & Clinic, Main GT Road, Gujranwala, Punjab, Pakistan',
  clinicTimingsUr: 'صبح 09:00 تا 01:30 بجے • شام 04:30 تا 10:30 بجے (جمعہ تعطیل)',
  clinicTimingsEn: '09:00 AM - 01:30 PM & 04:30 PM - 10:30 PM (Friday Closed)',
};

const SETTINGS_STORAGE_KEY = 'dawakhana_hakeem_settings_v3';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('dawakhana_admin_auth') === 'true';
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem('dawakhana_admin_pass') || '5225';
  });

  const [hakeemSettings, setHakeemSettings] = useState<HakeemSettings>(() => {
    try {
      // Purge legacy storage keys to guarantee instantaneous sync
      localStorage.removeItem('dawakhana_hakeem_settings');
      localStorage.removeItem('dawakhana_hakeem_settings_v2');

      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          !parsed.phone ||
          parsed.phone === '0300-0000000' ||
          parsed.email === 'abidgoraya2098@gmail.com' ||
          !parsed.nameUr ||
          !parsed.nameUr.includes('نواز')
        ) {
          localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultHakeemSettings));
          return defaultHakeemSettings;
        }
        return {
          ...defaultHakeemSettings,
          ...parsed,
          avatarUrl: parsed.avatarUrl && parsed.avatarUrl !== 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80' ? parsed.avatarUrl : '/hakeem-nawaz.jpg',
        };
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
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(hakeemSettings));
  }, [hakeemSettings]);

  useEffect(() => {
    localStorage.setItem('dawakhana_consultations', JSON.stringify(consultations));
  }, [consultations]);

  const loginAdmin = (pass: string): boolean => {
    // Verified with password '5225' or updated password
    if (pass.trim() === adminPassword || pass.trim() === '5225') {
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
    if (newPass.trim().length >= 4) {
      setAdminPassword(newPass.trim());
      localStorage.setItem('dawakhana_admin_pass', newPass.trim());
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
