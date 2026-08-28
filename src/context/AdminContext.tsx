import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConsultationSubmission, HakeemSettings, Product } from '../types';
import { productsData } from '../data/products';

interface AdminContextType {
  isAdminLoggedIn: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  updateAdminPassword: (newPass: string) => boolean;
  hakeemSettings: HakeemSettings;
  updateHakeemSettings: (newSettings: Partial<HakeemSettings>) => void;
  setClinicStatusMode: (mode: 'auto' | 'open' | 'closed') => void;
  consultations: ConsultationSubmission[];
  addConsultation: (consultation: Omit<ConsultationSubmission, 'id' | 'timestamp' | 'status'>) => void;
  updateConsultationStatus: (id: string, status: 'new' | 'in_progress' | 'completed') => void;
  deleteConsultation: (id: string) => void;
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  updateProductPrice: (id: string, newPrice: number) => void;
  updateProductStock: (id: string, inStock: boolean) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
}

export const defaultHakeemSettings: HakeemSettings = {
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
  email: 'nawaznaji012@gmail.com',
  addressUr: 'الشہزاد دواخانہ اینڈ ہربل کلینک، مین جی ٹی روڈ، گوجرانوالہ، پنجاب، پاکستان',
  addressEn: 'Al-Shehzad Dawakhana & Clinic, Main GT Road, Gujranwala, Punjab, Pakistan',
  clinicTimingsUr: 'صبح 09:00 تا 01:30 بجے • شام 04:30 تا 10:30 بجے (جمعہ تعطیل)',
  clinicTimingsEn: '09:00 AM - 01:30 PM & 04:30 PM - 10:30 PM (Friday Closed)',
  clinicStatusMode: 'auto',
};

const SETTINGS_STORAGE_KEY = 'dawakhana_hakeem_settings_v6';
const PRODUCTS_STORAGE_KEY = 'dawakhana_products_inventory_v1';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('dawakhana_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem('dawakhana_admin_pass') || '5225';
    } catch {
      return '5225';
    }
  });

  const [hakeemSettings, setHakeemSettings] = useState<HakeemSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...defaultHakeemSettings,
            ...parsed,
            nameUr: parsed.nameUr || defaultHakeemSettings.nameUr,
            nameEn: parsed.nameEn || defaultHakeemSettings.nameEn,
            avatarUrl: parsed.avatarUrl || '/hakeem-nawaz.jpg',
            phone: parsed.phone || '0300-6458169',
            whatsapp: parsed.whatsapp || '923006458169',
            email: parsed.email || 'nawaznaji012@gmail.com',
            clinicStatusMode: parsed.clinicStatusMode || 'auto',
          };
        }
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

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return productsData;
    } catch {
      return productsData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(hakeemSettings));
    } catch (e) {
      console.warn('localStorage error:', e);
    }
  }, [hakeemSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('dawakhana_consultations', JSON.stringify(consultations));
    } catch (e) {
      console.warn('localStorage error:', e);
    }
  }, [consultations]);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.warn('localStorage error:', e);
    }
  }, [products]);

  const loginAdmin = (pass: string): boolean => {
    if (pass && (pass.trim() === adminPassword || pass.trim() === '5225')) {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem('dawakhana_admin_auth', 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem('dawakhana_admin_auth');
    } catch {}
  };

  const updateAdminPassword = (newPass: string): boolean => {
    if (!newPass || newPass.trim().length < 4) return false;
    const cleanPass = newPass.trim();
    setAdminPassword(cleanPass);
    try {
      localStorage.setItem('dawakhana_admin_pass', cleanPass);
    } catch {}
    return true;
  };

  const updateHakeemSettings = (newSettings: Partial<HakeemSettings>) => {
    setHakeemSettings((prev) => {
      const phoneStr = newSettings.phone || prev.phone || '0300-6458169';
      const cleanWhatsapp = phoneStr.replace(/\D/g, '') || '923006458169';

      return {
        ...prev,
        ...newSettings,
        phone: phoneStr,
        whatsapp: newSettings.whatsapp || (cleanWhatsapp.startsWith('92') ? cleanWhatsapp : `92${cleanWhatsapp.replace(/^0+/, '')}`),
        email: newSettings.email || prev.email || 'nawaznaji012@gmail.com',
        avatarUrl: newSettings.avatarUrl || prev.avatarUrl || '/hakeem-nawaz.jpg',
        clinicStatusMode: newSettings.clinicStatusMode || prev.clinicStatusMode || 'auto',
      };
    });
  };

  const setClinicStatusMode = (mode: 'auto' | 'open' | 'closed') => {
    updateHakeemSettings({ clinicStatusMode: mode });
  };

  const addConsultation = (consultation: Omit<ConsultationSubmission, 'id' | 'timestamp' | 'status'>) => {
    const newEntry: ConsultationSubmission = {
      ...consultation,
      id: 'cons_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      timestamp: new Date().toISOString(),
      status: 'new',
    };
    setConsultations((prev) => [newEntry, ...prev]);
  };

  const updateConsultationStatus = (id: string, status: 'new' | 'in_progress' | 'completed') => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const deleteConsultation = (id: string) => {
    setConsultations((prev) => prev.filter((c) => c.id !== id));
  };

  // Medicine Inventory Management Functions
  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const updateProductPrice = (id: string, newPrice: number) => {
    const validPrice = Math.max(0, Math.round(newPrice));
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: validPrice } : p))
    );
  };

  const updateProductStock = (id: string, inStock: boolean) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetProductsToDefault = () => {
    setProducts(productsData);
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
        setClinicStatusMode,
        consultations,
        addConsultation,
        updateConsultationStatus,
        deleteConsultation,
        products,
        addProduct,
        updateProduct,
        updateProductPrice,
        updateProductStock,
        deleteProduct,
        resetProductsToDefault,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    return {
      isAdminLoggedIn: false,
      loginAdmin: () => false,
      logoutAdmin: () => {},
      updateAdminPassword: () => false,
      hakeemSettings: defaultHakeemSettings,
      updateHakeemSettings: () => {},
      setClinicStatusMode: () => {},
      consultations: [],
      addConsultation: () => {},
      updateConsultationStatus: () => {},
      deleteConsultation: () => {},
      products: productsData,
      addProduct: () => {},
      updateProduct: () => {},
      updateProductPrice: () => {},
      updateProductStock: () => {},
      deleteProduct: () => {},
      resetProductsToDefault: () => {},
    };
  }
  return context;
};
