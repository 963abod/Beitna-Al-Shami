'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Table, Reservation, MenuItem } from '@/lib/types';
import { INITIAL_TABLES, INITIAL_RESERVATIONS, MENU_ITEMS } from '@/lib/data';
import { DICTIONARY } from '@/lib/dictionary';

interface StoreContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dict: typeof DICTIONARY['ar'];
  tables: Table[];
  reservations: Reservation[];
  menuItems: MenuItem[];
  updateTableStatus: (tableId: string, status: 'available' | 'reserved' | 'occupied') => void;
  addReservation: (reservation: Omit<Reservation, 'id' | 'bookingRef' | 'createdAt' | 'status'>) => Reservation;
  updateReservationStatus: (resId: string, status: 'confirmed' | 'seated' | 'cancelled') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_TABLES_KEY = 'baitna_alshami_tables_v2';
const LOCAL_STORAGE_RESERVATIONS_KEY = 'baitna_alshami_reservations_v2';
const BROADCAST_CHANNEL_NAME = 'baitna_alshami_sync_channel';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('ar');
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);

  // Initialize from localStorage or fallback to defaults
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('baitna_lang') as Language;
      if (savedLang === 'ar' || savedLang === 'en') {
        setLanguageState(savedLang);
      }

      const savedTables = localStorage.getItem(LOCAL_STORAGE_TABLES_KEY);
      if (savedTables) {
        setTables(JSON.parse(savedTables));
      }

      const savedReservations = localStorage.getItem(LOCAL_STORAGE_RESERVATIONS_KEY);
      if (savedReservations) {
        setReservations(JSON.parse(savedReservations));
      }
    } catch (err) {
      console.error('Error loading state from localStorage:', err);
    }
  }, []);

  // Update HTML dir and lang attributes on language change
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('baitna_lang', lang);
    } catch (e) {}
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Sync across tabs via BroadcastChannel & Storage Event
  useEffect(() => {
    let bc: BroadcastChannel | null = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      bc.onmessage = (event) => {
        if (event.data?.type === 'TABLES_UPDATE') {
          setTables(event.data.payload);
        } else if (event.data?.type === 'RESERVATIONS_UPDATE') {
          setReservations(event.data.payload);
        }
      };
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_TABLES_KEY && e.newValue) {
        setTables(JSON.parse(e.newValue));
      }
      if (e.key === LOCAL_STORAGE_RESERVATIONS_KEY && e.newValue) {
        setReservations(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (bc) bc.close();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Helper function to broadcast updates
  const broadcastTables = (newTables: Table[]) => {
    setTables(newTables);
    try {
      localStorage.setItem(LOCAL_STORAGE_TABLES_KEY, JSON.stringify(newTables));
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        bc.postMessage({ type: 'TABLES_UPDATE', payload: newTables });
        bc.close();
      }
    } catch (e) {}
  };

  const broadcastReservations = (newReservations: Reservation[]) => {
    setReservations(newReservations);
    try {
      localStorage.setItem(LOCAL_STORAGE_RESERVATIONS_KEY, JSON.stringify(newReservations));
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        bc.postMessage({ type: 'RESERVATIONS_UPDATE', payload: newReservations });
        bc.close();
      }
    } catch (e) {}
  };

  // Actions
  const updateTableStatus = (tableId: string, status: 'available' | 'reserved' | 'occupied') => {
    const updated = tables.map((t) => (t.id === tableId ? { ...t, status } : t));
    broadcastTables(updated);
  };

  const addReservation = (
    data: Omit<Reservation, 'id' | 'bookingRef' | 'createdAt' | 'status'>
  ): Reservation => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newReservation: Reservation = {
      ...data,
      id: `res-${Date.now()}`,
      bookingRef: `BS-${randomNum}`,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const updatedRes = [newReservation, ...reservations];
    broadcastReservations(updatedRes);

    // Also mark the booked table as reserved in real-time
    updateTableStatus(data.tableId, 'reserved');

    return newReservation;
  };

  const updateReservationStatus = (resId: string, status: 'confirmed' | 'seated' | 'cancelled') => {
    const targetRes = reservations.find((r) => r.id === resId);
    const updatedRes = reservations.map((r) => (r.id === resId ? { ...r, status } : r));
    broadcastReservations(updatedRes);

    if (targetRes) {
      if (status === 'seated') {
        updateTableStatus(targetRes.tableId, 'occupied');
      } else if (status === 'cancelled') {
        updateTableStatus(targetRes.tableId, 'available');
      }
    }
  };

  const dict = DICTIONARY[language];

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        dict,
        tables,
        reservations,
        menuItems: MENU_ITEMS,
        updateTableStatus,
        addReservation,
        updateReservationStatus
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
