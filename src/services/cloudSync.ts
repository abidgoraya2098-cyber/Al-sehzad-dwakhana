// Cloud Synchronization Service for Al-Shehzad Dawakhana & Clinic
// Enables real-time synchronization of Hakeem profile, registration details, clinic open/closed status, and medicine inventory across all devices and visitors.

import { HakeemSettings, Product } from '../types';

const API_BASE = 'https://api.restful-api.dev/objects';
const HAKEEM_SETTINGS_DOC_ID = 'ff808181a04ccf2d01a052dc28de1776';
const PRODUCTS_DOC_ID = 'ff808181a04ccf2d01a052dc72b21777';

// 1. Fetch live Hakeem Settings from Cloud
export async function fetchHakeemSettingsFromCloud(): Promise<Partial<HakeemSettings> | null> {
  try {
    const res = await fetch(`${API_BASE}/${HAKEEM_SETTINGS_DOC_ID}`, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.data && typeof json.data === 'object') {
      return json.data as Partial<HakeemSettings>;
    }
    return null;
  } catch (err) {
    console.warn('CloudSync: Could not fetch Hakeem settings from cloud (using local/cache):', err);
    return null;
  }
}

// 2. Save Hakeem Settings to Cloud (broadcasts to all users)
export async function syncHakeemSettingsToCloud(settings: HakeemSettings): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/${HAKEEM_SETTINGS_DOC_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'al_shehzad_hakeem_settings',
        data: {
          ...settings,
          syncedAt: new Date().toISOString(),
        }
      })
    });
    return res.ok;
  } catch (err) {
    console.error('CloudSync: Failed to upload Hakeem settings to cloud:', err);
    return false;
  }
}

// 3. Fetch live Products from Cloud
export async function fetchProductsFromCloud(): Promise<Product[] | null> {
  try {
    const res = await fetch(`${API_BASE}/${PRODUCTS_DOC_ID}`, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.data && Array.isArray(json.data.products) && json.data.products.length > 0) {
      return json.data.products as Product[];
    }
    return null;
  } catch (err) {
    console.warn('CloudSync: Could not fetch products from cloud (using local/cache):', err);
    return null;
  }
}

// 4. Save Products to Cloud (broadcasts to all users)
export async function syncProductsToCloud(products: Product[]): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/${PRODUCTS_DOC_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'al_shehzad_products_inventory',
        data: {
          products,
          syncedAt: new Date().toISOString(),
        }
      })
    });
    return res.ok;
  } catch (err) {
    console.error('CloudSync: Failed to upload products to cloud:', err);
    return false;
  }
}
