'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Globe,
  Mail,
  UtensilsCrossed,
  Share2
} from 'lucide-react';

export const ContactFooterSection = () => {
  const { dict, language } = useStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '', subject: '', message: '' });
    }, 5000);
  };

  const whatsappNumber = '+963944123456';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    language === 'ar'
      ? 'مرحباً بيتنا الشامي، أود الاستفسار عن حجز طاولة.'
      : 'Hello Baitna Al-Shami, I would like to inquire about a table reservation.'
  )}`;

  return (
    <>
      {/* Floating WhatsApp Quick-Chat Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat"
        className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 border border-emerald-400/40 cursor-pointer"
      >
        <MessageSquare className="w-6 h-6" />
      </a>

      {/* Contact & Inquiries Section */}
      <section id="contact" className="py-24 bg-arabesque relative border-t border-[var(--gold)]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-bold uppercase tracking-wider mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{dict.contact.tag}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
              <span className="text-gold-gradient">{dict.contact.title}</span>
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-sans">
              {dict.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Contact Details & Info Card */}
            <div className="lg:col-span-5 space-y-6">

              <div className="glass-card rounded-3xl p-8 space-y-8 shadow-xl">

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white text-lg mb-1">
                      {dict.contact.locationTitle}
                    </h3>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      {dict.contact.locationDetail}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--terracotta)]/15 border border-[var(--terracotta)]/30 flex items-center justify-center text-[var(--terracotta)] shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white text-lg mb-1">
                      {dict.contact.hoursTitle}
                    </h3>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      {dict.contact.hoursDetail}
                    </p>
                  </div>
                </div>

                {/* WhatsApp Chat Button */}
                <div className="pt-4 border-t border-stone-800">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-lg cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>{dict.contact.whatsappChat}</span>
                  </a>
                </div>

              </div>

              {/* Embedded Interactive Map Preview Style */}
              <div className="rounded-3xl overflow-hidden border border-[var(--gold)]/30 bg-stone-900 aspect-16/9 relative shadow-xl">
                <iframe
                  title="Baitna Al-Shami Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.687635902123!2d36.3082!3d33.5138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e0a1338a0815%3A0xb3bd7d65b796d1ff!2sAl-Qaymariyya%2C%20Damascus%2C%20Syria!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.6) contrast(1.2) invert(0.9)' }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>

            </div>

            {/* Direct Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl relative"
              >
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  {dict.contact.formTitle}
                </h3>

                {formSubmitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <p className="font-bold text-lg">{dict.contact.successMsg}</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-stone-300">
                          {dict.contact.name} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="مثال: أحمد الدمشقي"
                          className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 focus:border-[var(--gold)] focus:outline-none text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-stone-300">
                          {dict.contact.phone} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+963 9XX XXX XXX"
                          className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 focus:border-[var(--gold)] focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-300">
                        {dict.contact.subject}
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="حجز مناسبة خاصة / حجز عائلي"
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 focus:border-[var(--gold)] focus:outline-none text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-300">
                        {dict.contact.message} <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="اكتب رسالتك أو استفسارك هنا..."
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 focus:border-[var(--gold)] focus:outline-none text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[var(--gold)] text-stone-950 font-extrabold text-sm hover:bg-[var(--gold-light)] transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{dict.contact.btnSubmit}</span>
                    </button>
                  </>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-stone-300 border-t border-[var(--gold)]/20 pt-16 pb-28 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">

            {/* Col 1: Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-[var(--gold)] bg-[var(--charcoal)] flex items-center justify-center text-[var(--gold)]">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <span className="font-serif text-2xl font-bold text-gold-gradient">
                  {dict.brandName}
                </span>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed">
                {dict.footer.about}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="#" className="w-8 h-8 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                {dict.footer.quickLinks}
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li><a href="#home" className="hover:text-[var(--gold)] transition-colors">{dict.nav.home}</a></li>
                <li><a href="#story" className="hover:text-[var(--gold)] transition-colors">{dict.nav.story}</a></li>
                <li><a href="#menu" className="hover:text-[var(--gold)] transition-colors">{dict.nav.menu}</a></li>
                <li><a href="#reservations" className="hover:text-[var(--gold)] transition-colors">{dict.nav.reservations}</a></li>
                <li><a href="#contact" className="hover:text-[var(--gold)] transition-colors">{dict.nav.contact}</a></li>
              </ul>
            </div>

            {/* Col 3: Hours */}
            <div className="space-y-3">
              <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                {dict.footer.workingHours}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                {dict.footer.dailyHours}
              </p>
              <div className="pt-2 text-xs text-[var(--gold)] font-bold">
                {dict.contact.locationDetail}
              </div>
            </div>

            {/* Col 4: Newsletter */}
            <div className="space-y-3">
              <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                {dict.footer.newsletterTitle}
              </h4>
              <p className="text-xs text-stone-400">
                {dict.footer.newsletterSub}
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Email..."
                  className="bg-stone-900 border border-stone-700 text-xs rounded-xl px-3 py-2 text-stone-200 focus:outline-none w-full"
                />
                <button className="px-3 py-2 rounded-xl bg-[var(--gold)] text-stone-950 font-bold text-xs hover:bg-[var(--gold-light)] shrink-0">
                  {dict.footer.subscribeBtn}
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Developer Credits (STRICT REQUIREMENT) */}
          <div className="pt-8 text-center text-xs text-stone-400 font-sans">
            <p>
              {dict.footer.copyright}
              <a
                href={dict.footer.devUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--gold)] font-bold underline hover:text-[var(--gold-light)] transition-all gold-glow-hover inline-block px-1"
              >
                {dict.footer.devName}
              </a>
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};
