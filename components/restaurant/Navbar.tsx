'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  UtensilsCrossed,
  Globe,
  Calendar,
  Menu,
  X,
  Home,
  BookOpen,
  PhoneCall
} from 'lucide-react';

export const Navbar = () => {
  const { language, setLanguage, dict } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: dict.nav.home, href: '#home' },
    { label: dict.nav.story, href: '#story' },
    { label: dict.nav.menu, href: '#menu' },
    { label: dict.nav.reservations, href: '#reservations' },
    { label: dict.nav.contact, href: '#contact' }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav py-3 shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[var(--gold)]/40 bg-[var(--charcoal)] flex items-center justify-center text-[var(--gold)] group-hover:border-[var(--gold)] transition-colors shadow-lg">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-gold-gradient">
                {dict.brandName}
              </span>
              <span className="text-[10px] sm:text-xs text-[var(--gold-light)]/70 tracking-widest font-sans">
                {dict.brandSubtitle}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-200 hover:text-[var(--gold)] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[var(--gold)] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--gold)]/30 hover:border-[var(--gold)] text-xs font-semibold text-[var(--gold-light)] bg-black/30 hover:bg-[var(--gold)]/10 transition-all cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>{language === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
            </button>

            {/* Book Table CTA */}
            <a
              href="#reservations"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[var(--terracotta)] to-[#d9683f] hover:from-[#b04b26] hover:to-[var(--terracotta)] text-white text-xs font-bold tracking-wider uppercase shadow-lg hover:shadow-orange-950/50 transition-all border border-orange-400/20 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>{dict.nav.bookTable}</span>
            </a>
          </div>

          {/* Mobile Burger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="sm:hidden px-2.5 py-1 text-xs rounded-full border border-[var(--gold)]/30 text-[var(--gold-light)] bg-black/40"
            >
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-200 hover:text-[var(--gold)] transition-colors focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-card border-x-0 border-b border-t border-[var(--gold)]/20 mt-3 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-stone-100 hover:text-[var(--gold)] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-stone-800 flex flex-col gap-3">
              <a
                href="#reservations"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--terracotta)] text-white text-sm font-bold shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>{dict.nav.bookTable}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (Applike UI) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-nav border-t border-[var(--gold)]/20 py-2.5 px-4 flex justify-around items-center bg-[var(--bg-dark)]/95">
        <a href="#home" className="flex flex-col items-center text-stone-300 hover:text-[var(--gold)] text-[10px] gap-1">
          <Home className="w-5 h-5" />
          <span>{dict.nav.home}</span>
        </a>
        <a href="#menu" className="flex flex-col items-center text-stone-300 hover:text-[var(--gold)] text-[10px] gap-1">
          <BookOpen className="w-5 h-5" />
          <span>{dict.nav.menu}</span>
        </a>
        <a href="#reservations" className="flex flex-col items-center text-[var(--gold)] text-[10px] font-bold gap-1 relative">
          <div className="p-2 rounded-full bg-[var(--terracotta)] text-white -mt-5 shadow-lg border border-orange-400/30">
            <Calendar className="w-5 h-5" />
          </div>
          <span>{dict.nav.bookTable}</span>
        </a>
        <a href="#contact" className="flex flex-col items-center text-stone-300 hover:text-[var(--gold)] text-[10px] gap-1">
          <PhoneCall className="w-5 h-5" />
          <span>{dict.nav.contact}</span>
        </a>
      </nav>
    </>
  );
};
