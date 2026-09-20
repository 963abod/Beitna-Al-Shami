'use client';

import React from 'react';
import { StoreProvider } from '@/context/StoreContext';
import { Navbar } from '@/components/restaurant/Navbar';
import { HeroSection } from '@/components/restaurant/HeroSection';
import { StorySection } from '@/components/restaurant/StorySection';
import { MenuSection } from '@/components/restaurant/MenuSection';
import { ReservationSection } from '@/components/restaurant/ReservationSection';
import { AdminSection } from '@/components/restaurant/AdminSection';
import { ContactFooterSection } from '@/components/restaurant/ContactFooterSection';

export default function Home() {
  return (
    <StoreProvider>
      <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--ivory)] font-sans antialiased selection:bg-[var(--gold)] selection:text-black">
        <Navbar />
        <HeroSection />
        <StorySection />
        <MenuSection />
        <ReservationSection />
        <AdminSection />
        <ContactFooterSection />
      </main>
    </StoreProvider>
  );
}
