'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { MenuItem } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Flame, Leaf, Award, Info, X, UtensilsCrossed } from 'lucide-react';

export const MenuSection = () => {
  const { dict, menuItems, language } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vegetarianOnly, setVegetarianOnly] = useState<boolean>(false);
  const [chefSpecialOnly, setChefSpecialOnly] = useState<boolean>(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', label: dict.menu.all },
    { id: 'mezze', label: dict.menu.catMezze },
    { id: 'grills', label: dict.menu.catGrills },
    { id: 'fatteh_kibbeh', label: dict.menu.catFattehKibbeh },
    { id: 'desserts_drinks', label: dict.menu.catDessertsDrinks }
  ];

  const filteredDishes = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchAr = item.nameAr.toLowerCase().includes(q) || item.descriptionAr.toLowerCase().includes(q);
        const matchEn = item.nameEn.toLowerCase().includes(q) || item.descriptionEn.toLowerCase().includes(q);
        if (!matchAr && !matchEn) return false;
      }
      // Vegetarian filter
      if (vegetarianOnly && !item.isVegetarian) return false;
      // Chef Special filter
      if (chefSpecialOnly && !item.isChefSpecial) return false;

      return true;
    });
  }, [menuItems, selectedCategory, searchQuery, vegetarianOnly, chefSpecialOnly]);

  const renderSpiceLevel = (level: 0 | 1 | 2 | 3) => {
    if (level === 0) return null;
    return (
      <div className="flex items-center gap-1 text-xs text-orange-400 font-semibold bg-orange-950/40 px-2 py-0.5 rounded-full border border-orange-500/30">
        <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
        <span>
          {level === 1 && dict.menu.light}
          {level === 2 && dict.menu.medium}
          {level === 3 && dict.menu.hot}
        </span>
      </div>
    );
  };

  return (
    <section id="menu" className="py-24 bg-[var(--bg-dark)] relative border-t border-[var(--gold)]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-bold uppercase tracking-wider mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>{dict.menu.tag}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            <span className="text-gold-gradient">{dict.menu.title}</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-sans">
            {dict.menu.subtitle}
          </p>
        </div>

        {/* Search Bar & Dietary Filter Switches */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 mb-10 max-w-4xl mx-auto space-y-4">
          <div className="relative">
            <Search className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-3.5 w-5 h-5 text-stone-400`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.menu.searchPlaceholder}
              className={`w-full bg-stone-900/90 border border-stone-700/80 focus:border-[var(--gold)] rounded-xl py-3 ${
                language === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'
              } text-sm text-stone-100 placeholder-stone-400 focus:outline-none transition-colors`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute ${language === 'ar' ? 'left-4' : 'right-4'} top-3.5 text-stone-400 hover:text-white`}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-800">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[var(--gold)] text-stone-950 shadow-md font-bold'
                      : 'bg-stone-900/60 text-stone-300 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setVegetarianOnly(!vegetarianOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  vegetarianOnly
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500'
                    : 'bg-stone-900/50 text-stone-400 border-stone-800 hover:border-stone-700'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>{dict.menu.filterVegetarian}</span>
              </button>

              <button
                onClick={() => setChefSpecialOnly(!chefSpecialOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  chefSpecialOnly
                    ? 'bg-amber-950/80 text-amber-300 border-amber-500'
                    : 'bg-stone-900/50 text-stone-400 border-stone-800 hover:border-stone-700'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>{dict.menu.filterChefSpecial}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-2xl max-w-xl mx-auto p-8">
            <p className="text-stone-400 text-base">{dict.menu.noResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => (
              <motion.div
                layout
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl overflow-hidden group hover:border-[var(--gold)]/50 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                    <img
                      src={dish.image}
                      alt={language === 'ar' ? dish.nameAr : dish.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-1.5">
                        {dish.isChefSpecial && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-[10px] font-extrabold shadow-md flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            <span>{dict.menu.filterChefSpecial}</span>
                          </span>
                        )}
                        {dish.isVegetarian && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold shadow-md flex items-center gap-1">
                            <Leaf className="w-3 h-3" />
                            <span>{dict.menu.filterVegetarian}</span>
                          </span>
                        )}
                      </div>
                      {renderSpiceLevel(dish.spiceLevel)}
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-3 right-3 bg-[var(--charcoal)]/90 border border-[var(--gold)]/40 px-3 py-1 rounded-full text-gold-gradient font-serif font-bold text-base shadow-lg">
                      {dish.price} {dish.currency}
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[var(--gold-light)] transition-colors">
                      {language === 'ar' ? dish.nameAr : dish.nameEn}
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {language === 'ar' ? dish.descriptionAr : dish.descriptionEn}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedDish(dish)}
                    className="w-full py-2.5 px-4 rounded-xl border border-[var(--gold)]/30 hover:bg-[var(--gold)] hover:text-stone-950 text-[var(--gold-light)] font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Info className="w-4 h-4" />
                    <span>{dict.menu.viewDetails}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Dish Detail Modal */}
        <AnimatePresence>
          {selectedDish && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="glass-card rounded-3xl max-w-xl w-full overflow-hidden border border-[var(--gold)]/40 relative shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedDish(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-stone-300 hover:text-white border border-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative aspect-16/9">
                  <img
                    src={selectedDish.image}
                    alt={language === 'ar' ? selectedDish.nameAr : selectedDish.nameEn}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                    <span className="text-2xl font-serif font-bold text-gold-gradient bg-black/60 px-4 py-1 rounded-full border border-[var(--gold)]/30">
                      {selectedDish.price} {selectedDish.currency}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">
                      {language === 'ar' ? selectedDish.nameAr : selectedDish.nameEn}
                    </h3>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      {language === 'ar' ? selectedDish.descriptionAr : selectedDish.descriptionEn}
                    </p>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <h4 className="text-xs font-bold text-[var(--gold)] uppercase tracking-wider mb-2">
                      {dict.menu.ingredients}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(language === 'ar' ? selectedDish.ingredientsAr : selectedDish.ingredientsEn).map(
                        (ing, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300"
                          >
                            {ing}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Extra Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-800 text-xs text-stone-400">
                    {selectedDish.calories && (
                      <div>
                        <span className="font-semibold text-stone-200">{dict.menu.calories}</span>{' '}
                        {selectedDish.calories} {dict.menu.kcal}
                      </div>
                    )}
                    {selectedDish.spiceLevel > 0 && renderSpiceLevel(selectedDish.spiceLevel)}
                  </div>

                  <button
                    onClick={() => setSelectedDish(null)}
                    className="w-full py-3 rounded-xl bg-[var(--gold)] text-stone-950 font-bold text-sm hover:bg-[var(--gold-light)] transition-colors cursor-pointer"
                  >
                    {dict.menu.close}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
