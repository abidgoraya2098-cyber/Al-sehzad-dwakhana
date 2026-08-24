import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConsultationSubmission } from '../types';

interface AdminContextType {
  isAdminLoggedIn: boolean;
  adminEmail: string;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  consultations: ConsultationSubmission[];
  addConsultation: (consultation: Omit<ConsultationSubmission, 'id' | 'timestamp' | 'status'>) => void;
  updateConsultationStatus: (id: string, status: 'new' | 'in_progress' | 'completed') => void;
  deleteConsultation: (id: string) => void;
}

const AUTHORIZED_EMAIL = 'abidgoraya2098@gmail.com';
const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('dawakhana_admin_auth') === 'true';
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
    localStorage.setItem('dawakhana_consultations', JSON.stringify(consultations));
  }, [consultations]);

  const loginAdmin = (email: string, pass: string): boolean => {
    if (email.trim().toLowerCase() === AUTHORIZED_EMAIL.toLowerCase() && pass.length >= 4) {
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

  const addConsultation = (item: Omit<ConsultationSubmission, 'id' | 'timestamp' | 'status'>) => {
    const newRecord: ConsultationSubmission = {
      ...item,
      id: 'cons-' + Date.now(),
      timestamp: new Date().toLocaleString('ur-PK'),
      status: 'new'
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
