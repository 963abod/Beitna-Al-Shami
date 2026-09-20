'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { motion } from 'framer-motion';
import { Sparkles, Flower2, HeartHandshake, History } from 'lucide-react';

export const StorySection = () => {
  const { dict } = useStore();

  const HERITAGE_PHOTOS = [
    {
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      titleAr: 'البحرة الرخامية والنافورة',
      titleEn: 'Marble Fountain Courtyard',
      tagAr: 'الصحن الداخلي',
      tagEn: 'Central Courtyard'
    },
    {
      url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=800&auto=format&fit=crop',
      titleAr: 'الطبخ على أصوله الدمشقية',
      titleEn: 'Authentic Damascene Cooking',
      tagAr: 'حرفة الطهي',
      tagEn: 'Culinary Craft'
    },
    {
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
      titleAr: 'عراقة الضيافة الشامية',
      titleEn: 'Syrian Warm Hospitality',
      tagAr: 'كرم الضيافة',
      tagEn: 'Warm Welcome'
    },
    {
      url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop',
      titleAr: 'عطر الياسمين والحلويات',
      titleEn: 'Sweet Jasmine & Desserts',
      tagAr: 'حلويات الملوك',
      tagEn: 'Royal Sweets'
    }
  ];

  return (
    <section id="story" className="py-24 bg-arabesque relative overflow-hidden border-t border-[var(--gold)]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Story Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--terracotta)]/15 border border-[var(--terracotta)]/30 text-[var(--terracotta)] text-xs font-bold uppercase tracking-wider">
              <History className="w-3.5 h-3.5" />
              <span>{dict.story.tag}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              <span className="block text-gold-gradient">{dict.story.title}</span>
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-sans">
              {dict.story.paragraph1}
            </p>

            <p className="text-stone-400 text-sm sm:text-base leading-relaxed font-sans">
              {dict.story.paragraph2}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-800">
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-gold-gradient block">
                  {dict.story.stat1Number}
                </span>
                <span className="text-xs text-stone-400 block">{dict.story.stat1Label}</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[var(--terracotta)] block">
                  {dict.story.stat2Number}
                </span>
                <span className="text-xs text-stone-400 block">{dict.story.stat2Label}</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-gold-gradient block">
                  {dict.story.stat3Number}
                </span>
                <span className="text-xs text-stone-400 block">{dict.story.stat3Label}</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Image Grid with Hover Reveals */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6"
          >
            {HERITAGE_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                className={`group relative rounded-2xl overflow-hidden border border-[var(--gold)]/20 bg-stone-900 shadow-xl ${
                  idx === 1 ? 'mt-8' : ''
                } ${idx === 2 ? '-mt-8' : ''}`}
              >
                <div className="aspect-4/5 w-full overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content reveal */}
                <div className="absolute bottom-0 inset-x-0 p-4 transform transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[10px] text-[var(--gold-light)] font-medium mb-1">
                    {useStore().language === 'ar' ? photo.tagAr : photo.tagEn}
                  </span>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-[var(--gold-light)] transition-colors">
                    {useStore().language === 'ar' ? photo.titleAr : photo.titleEn}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
