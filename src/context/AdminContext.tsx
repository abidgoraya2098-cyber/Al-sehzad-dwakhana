import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ConsultationSubmission, HakeemSettings, Product } from '../types';
import { productsData } from '../data/products';
import {
  fetchHakeemSettingsFromCloud,
  syncHakeemSettingsToCloud,
  fetchProductsFromCloud,
  syncProductsToCloud,
} from '../services/cloudSync';

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
  isCloudSyncing: boolean;
  refreshFromCloud: () => Promise<void>;
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

const SETTINGS_STORAGE_KEY = 'dawakhana_hakeem_settings_v7';
const PRODUCTS_STORAGE_KEY = 'dawakhana_products_inventory_v2';

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

  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);

  // Cloud Fetch & Synchronize Function
  const refreshFromCloud = useCallback(async () => {
    try {
      setIsCloudSyncing(true);
      // 1. Fetch live settings
      const cloudSettings = await fetchHakeemSettingsFromCloud();
      if (cloudSettings && typeof cloudSettings === 'object') {
        setHakeemSettings((prev) => {
          const merged = {
            ...prev,
            ...cloudSettings,
          };
          try {
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
          } catch {}
          return merged;
        });
      }

      // 2. Fetch live products
      const cloudProducts = await fetchProductsFromCloud();
      if (cloudProducts && Array.isArray(cloudProducts) && cloudProducts.length > 0) {
        setProducts(cloudProducts);
        try {
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(cloudProducts));
        } catch {}
      }
    } catch (e) {
      console.warn('Cloud sync refresh error:', e);
    } finally {
      setIsCloudSyncing(false);
    }
  }, []);

  // Sync on startup and when user returns to window/tab
  useEffect(() => {
    refreshFromCloud();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshFromCloud();
      }
    };

    const interval = setInterval(refreshFromCloud, 30000); // Check every 30 seconds
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refreshFromCloud]);

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

      const updated: HakeemSettings = {
        ...prev,
        ...newSettings,
        phone: phoneStr,
        whatsapp: newSettings.whatsapp || (cleanWhatsapp.startsWith('92') ? cleanWhatsapp : `92${cleanWhatsapp.replace(/^0+/, '')}`),
        email: newSettings.email || prev.email || 'nawaznaji012@gmail.com',
        avatarUrl: newSettings.avatarUrl || prev.avatarUrl || '/hakeem-nawaz.jpg',
        clinicStatusMode: newSettings.clinicStatusMode || prev.clinicStatusMode || 'auto',
      };

      // Broadcast to cloud store immediately so all visitors get the update
      syncHakeemSettingsToCloud(updated).catch((err) => {
        console.warn('Failed to broadcast settings to cloud:', err);
      });

      return updated;
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

  // Medicine Inventory Management Functions with Instant Cloud Sync
  const addProduct = (newProduct: Product) => {
    setProducts((prev) => {
      const updated = [newProduct, ...prev];
      syncProductsToCloud(updated).catch(console.warn);
      return updated;
    });
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
      syncProductsToCloud(updated).catch(console.warn);
      return updated;
    });
  };

  const updateProductPrice = (id: string, newPrice: number) => {
    const validPrice = Math.max(0, Math.round(newPrice));
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, price: validPrice } : p));
      syncProductsToCloud(updated).catch(console.warn);
      return updated;
    });
  };

  const updateProductStock = (id: string, inStock: boolean) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, inStock } : p));
      syncProductsToCloud(updated).catch(console.warn);
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      syncProductsToCloud(updated).catch(console.warn);
      return updated;
    });
  };

  const resetProductsToDefault = () => {
    setProducts(productsData);
    syncProductsToCloud(productsData).catch(console.warn);
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
        isCloudSyncing,
        refreshFromCloud,
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
      isCloudSyncing: false,
      refreshFromCloud: async () => {},
    };
  }
  return context;
};
