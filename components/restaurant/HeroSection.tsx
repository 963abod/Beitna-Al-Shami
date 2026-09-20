'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Utensils, Calendar, ChevronDown, Award, Compass } from 'lucide-react';

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1920&auto=format&fit=crop',
    titleAr: 'عراقة المشاوي الدمشقية',
    titleEn: 'Charcoal Grilled Perfection'
  },
  {
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1920&auto=format&fit=crop',
    titleAr: 'سحر الصحن الداخلي والبحرة',
    titleEn: 'Enchanting Courtyard & Fountain'
  },
  {
    url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1920&auto=format&fit=crop',
    titleAr: 'مقبلات شامية بأيدي ماهرة',
    titleEn: 'Artisanal Damascene Mezze'
  }
];

export const HeroSection = () => {
  const { dict } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background Ken Burns Animated Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${HERO_IMAGES[currentSlide].url}')` }}
          />
        </AnimatePresence>

        {/* Gradient Overlays for High Contrast & Luxury Vibe */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] via-[var(--bg-dark)]/70 to-black/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-arabesque opacity-30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Floating Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <div className="glass-badge px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-[var(--gold-light)] shadow-md">
            <Award className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>{dict.hero.badge1}</span>
          </div>
          <div className="glass-badge px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-[var(--gold-light)] shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[var(--terracotta)]" />
            <span>{dict.hero.badge2}</span>
          </div>
        </motion.div>

        {/* Headlines */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white mb-6"
        >
          <span className="block text-gold-gradient">{dict.hero.title1}</span>
          <span className="block mt-2 text-stone-100">{dict.hero.title2}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="max-w-2xl text-sm sm:text-lg text-stone-300 font-sans leading-relaxed mb-10 text-balance"
        >
          {dict.hero.subtitle}
        </motion.p>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#menu"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--charcoal)] border border-[var(--gold)]/40 hover:border-[var(--gold)] text-[var(--gold-light)] font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all hover:bg-[var(--gold)]/10 shadow-lg"
          >
            <Utensils className="w-5 h-5 text-[var(--gold)]" />
            <span>{dict.hero.ctaMenu}</span>
          </a>

          <a
            href="#reservations"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[var(--terracotta)] to-[#d9683f] hover:from-[#b04b26] hover:to-[var(--terracotta)] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all gold-glow-hover shadow-xl border border-orange-400/20"
          >
            <Calendar className="w-5 h-5" />
            <span>{dict.hero.ctaReserve}</span>
          </a>
        </motion.div>

        {/* Carousel Indicators */}
        <div className="flex items-center gap-2 mt-12">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-[var(--gold)]' : 'w-2 bg-stone-600 hover:bg-stone-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down Hint */}
        <a
          href="#story"
          className="mt-8 text-stone-400 hover:text-[var(--gold)] transition-colors animate-bounce p-2"
          aria-label="Scroll Down"
        >
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};
