'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { StoreProvider } from '@/context/StoreContext';
import { AdminSection } from '@/components/restaurant/AdminSection';
import { LogOut, Home, ShieldCheck } from 'lucide-react';

export default function ProtectedAdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      router.push('/admin/login');
    }
  };

  return (
    <StoreProvider>
      <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--ivory)] font-sans antialiased selection:bg-[var(--gold)] selection:text-black">

        {/* Admin Header Bar */}
        <header className="glass-nav py-4 px-6 border-b border-[var(--gold)]/30 sticky top-0 z-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-[var(--gold)] bg-[var(--charcoal)] flex items-center justify-center text-[var(--gold)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg text-gold-gradient">
                لوحة إدارة طاولات وحجوزات بيتنا الشامي
              </h1>
              <span className="text-[10px] text-emerald-400 font-semibold block">
                ● جلسة موظفين آمنة (Staff Portal)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="px-3.5 py-1.5 rounded-full border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 text-xs font-semibold flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">الموقع الرئيسي</span>
            </a>

            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-full bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </header>

        <AdminSection />
      </main>
    </StoreProvider>
  );
}
