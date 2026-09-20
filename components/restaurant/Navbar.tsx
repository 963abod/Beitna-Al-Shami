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
  PhoneCall,
  Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const { language, setLanguage, dict } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'menu' | 'reservations' | 'contact'>('home');

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

  // IntersectionObserver for Live ScrollSpy
  useEffect(() => {
    const sectionIds: ('home' | 'menu' | 'reservations' | 'contact')[] = ['home', 'menu', 'reservations', 'contact'];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id as 'home' | 'menu' | 'reservations' | 'contact';
          if (sectionIds.includes(id)) {
            setActiveSection(id);
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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

  const tabs = [
    { id: 'home', label: dict.nav.home, icon: Home, href: '#home' },
    { id: 'menu', label: dict.nav.menu, icon: BookOpen, href: '#menu' },
    { id: 'reservations', label: dict.nav.bookTable, icon: Sparkles, href: '#reservations' },
    { id: 'contact', label: dict.nav.contact, icon: PhoneCall, href: '#contact' }
  ];

  const activeIndex = tabs.findIndex((t) => t.id === activeSection);
  const currentActiveIndex = activeIndex >= 0 ? activeIndex : 0;

  const handleTabClick = (id: 'home' | 'menu' | 'reservations' | 'contact', href: string) => {
    setActiveSection(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* Luxury "Magic Curved Cutout" Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 flex justify-center pb-3 pt-2 bg-transparent pointer-events-none"
      >
        <div className="max-w-md w-[92%] h-[70px] bg-[#16120e] rounded-2xl relative border-t border-amber-900/30 backdrop-blur-md shadow-2xl flex items-center justify-around px-2 pointer-events-auto overflow-visible">

          {/* Magic Curved Sliding Cutout Circle Indicator */}
          <div
            className="absolute top-0 w-1/4 h-full flex items-start justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none"
            style={{
              transform:
                language === 'ar'
                  ? `translateX(${-(currentActiveIndex * 100)}%)`
                  : `translateX(${currentActiveIndex * 100}%)`,
              left: language === 'ar' ? 'auto' : '0%',
              right: language === 'ar' ? '0%' : 'auto'
            }}
          >
            {/* SVG Inverted Curved Scoop Dip in Top Border */}
            <div className="absolute -top-6 w-20 h-8 flex justify-center overflow-visible">
              <svg className="w-20 h-8 text-[#16120e] fill-current" viewBox="0 0 80 32">
                <path d="M 0,0 C 22,0 22,32 40,32 C 58,32 58,0 80,0 L 80,32 L 0,32 Z" />
              </svg>
            </div>

            {/* Glowing Golden Circle Badge */}
            <div className="absolute -top-6 w-13 h-13 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 border-2 border-amber-300/50 shadow-lg shadow-amber-500/40 flex items-center justify-center transition-all duration-500" />
          </div>

          {/* Navigation Items */}
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = currentActiveIndex === idx;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as any, tab.href)}
                className="flex-1 h-full flex flex-col items-center justify-center relative z-10 cursor-pointer focus:outline-none"
              >
                {/* Icon Animated Translation */}
                <div
                  className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center ${
                    isActive
                      ? '-translate-y-8 text-stone-950 font-bold scale-110 z-20'
                      : 'translate-y-0 text-amber-200/50 hover:text-amber-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Animated Text Label Reveal */}
                <span
                  className={`absolute bottom-2.5 transition-all duration-500 text-[11px] font-bold ${
                    isActive
                      ? 'opacity-100 translate-y-0 text-[var(--gold)] font-bold'
                      : 'opacity-0 translate-y-3 text-transparent pointer-events-none'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}

        </div>
      </nav>
    </>
  );
};
