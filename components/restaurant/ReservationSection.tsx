'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Table, Reservation } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  Utensils,
  AlertCircle,
  QrCode,
  Building
} from 'lucide-react';

export const ReservationSection = () => {
  const { dict, tables, language, addReservation } = useStore();

  // Wizard state
  const [step, setStep] = useState<number>(1);

  // Form selections
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>('19:00');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  // Guest Info
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Confirmation state
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const timeSlots = [
    '12:30', '13:30', '14:30', '16:00',
    '18:00', '19:00', '20:00', '21:00', '22:30'
  ];

  const handleSelectTable = (table: Table) => {
    if (table.status !== 'available') return;
    if (table.capacity < guestsCount) {
      setErrorMsg(
        language === 'ar'
          ? `عذراً، هذه الطاولة تسع لـ ${table.capacity} أشخاص فقط ولكنك اخترت ${guestsCount} ضيوف.`
          : `Sorry, this table seats ${table.capacity} guests max, but you selected ${guestsCount} guests.`
      );
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }
    setErrorMsg('');
    setSelectedTable(table);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) return;
    if (!guestName.trim() || !guestPhone.trim()) {
      setErrorMsg(
        language === 'ar'
          ? 'يرجى كتابة الاسم الكامل ورقم الهاتف بشكل صحيح.'
          : 'Please enter your full name and phone number.'
      );
      return;
    }

    const res = addReservation({
      guestName,
      guestPhone,
      guestEmail: guestEmail || undefined,
      date: selectedDate,
      timeSlot: selectedTime,
      guestsCount,
      tableId: selectedTable.id,
      tableNumber: selectedTable.tableNumber,
      sectionAr: selectedTable.sectionAr,
      sectionEn: selectedTable.sectionEn,
      specialRequests: specialRequests || undefined
    });

    setConfirmedReservation(res);
    setStep(4);
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedTable(null);
    setConfirmedReservation(null);
    setGuestName('');
    setGuestPhone('');
    setGuestEmail('');
    setSpecialRequests('');
  };

  const filteredTables = tables.filter((t) => {
    if (selectedSection !== 'all' && t.section !== selectedSection) {
      return false;
    }
    return true;
  });

  return (
    <section id="reservations" className="py-24 bg-arabesque relative border-t border-[var(--gold)]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--terracotta)]/15 border border-[var(--terracotta)]/30 text-[var(--terracotta)] text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>{dict.reservation.tag}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            <span className="text-gold-gradient">{dict.reservation.title}</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-sans">
            {dict.reservation.subtitle}
          </p>
        </div>

        {/* Steps Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-stone-800 z-0" />

            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step >= stepNum
                      ? 'bg-[var(--gold)] text-stone-950 shadow-lg font-extrabold ring-4 ring-[var(--gold)]/20'
                      : 'bg-stone-900 text-stone-500 border border-stone-800'
                  }`}
                >
                  {step > stepNum ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-stone-300 hidden sm:inline">
                  {stepNum === 1 && dict.reservation.step1Title}
                  {stepNum === 2 && dict.reservation.step2Title}
                  {stepNum === 3 && dict.reservation.step3Title}
                  {stepNum === 4 && dict.reservation.step4Title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Error banner if any */}
        {errorMsg && (
          <div className="max-w-3xl mx-auto mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Date, Time & Guests */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto space-y-8 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Picker */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--gold)] uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{dict.reservation.selectDate}</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 focus:border-[var(--gold)] focus:outline-none"
                />
              </div>

              {/* Guests Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--gold)] uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{dict.reservation.guestsCount}</span>
                </label>
                <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded-xl p-1.5">
                  {[2, 4, 6, 8, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestsCount(num)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        guestsCount === num
                          ? 'bg-[var(--terracotta)] text-white shadow-md'
                          : 'text-stone-400 hover:text-white hover:bg-stone-800'
                      }`}
                    >
                      {num} {dict.reservation.guestsPerson}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[var(--gold)] uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{dict.reservation.selectTime}</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedTime === time
                        ? 'bg-[var(--gold)] text-stone-950 border-[var(--gold)] shadow-lg'
                        : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-8 py-3.5 rounded-full bg-[var(--gold)] text-stone-950 font-extrabold text-sm hover:bg-[var(--gold-light)] transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>{dict.reservation.btnNext}</span>
                {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Interactive Visual Floor Plan */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto space-y-6 shadow-2xl"
          >
            {/* Top Info & Section Filter */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {dict.reservation.step2Title}
                </h3>
                <p className="text-stone-400 text-xs">
                  {selectedDate} | {selectedTime} | {guestsCount} {dict.reservation.guestsPerson}
                </p>
              </div>

              {/* Section Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 hidden sm:inline">
                  {dict.reservation.selectSectionFilter}
                </span>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="bg-stone-900 border border-stone-700 text-stone-200 text-xs rounded-xl px-3 py-2 focus:outline-none"
                >
                  <option value="all">{dict.reservation.allSections}</option>
                  <option value="courtyard">{dict.reservation.sectionCourtyard}</option>
                  <option value="balcony">{dict.reservation.sectionBalcony}</option>
                  <option value="vip">{dict.reservation.sectionVip}</option>
                </select>
              </div>
            </div>

            {/* Legend Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300 py-2 bg-stone-900/60 rounded-xl border border-stone-800">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
                <span>{dict.reservation.tableStatusAvailable}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 ring-2 ring-amber-500/30" />
                <span>{dict.reservation.tableStatusReserved}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-600 ring-2 ring-rose-600/30" />
                <span>{dict.reservation.tableStatusOccupied}</span>
              </div>
            </div>

            {/* Visual Floor Layout Plan Container */}
            <div className="relative min-h-[460px] bg-stone-950/90 rounded-2xl border-2 border-[var(--gold)]/20 overflow-hidden p-6 shadow-inner">

              {/* Floor Layout Decorative Elements */}
              {/* Central Fountain (البحرة الدمشقية) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-[var(--gold)]/30 bg-blue-950/30 flex items-center justify-center text-center p-4 shadow-2xl pointer-events-none">
                <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full border-2 border-dashed border-[var(--gold)]/40 bg-blue-900/20 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 animate-pulse mb-1">
                    💧
                  </div>
                  <span className="font-serif text-xs text-[var(--gold-light)] font-bold">
                    البحرة الدمشقية
                  </span>
                  <span className="text-[9px] text-blue-200">Marble Fountain</span>
                </div>
              </div>

              {/* Section Labels */}
              <div className="absolute top-4 left-6 text-[10px] font-bold text-[var(--gold)] tracking-widest uppercase bg-stone-900/80 px-2.5 py-1 rounded border border-[var(--gold)]/20">
                الشرفة الدمشقية (Balcony)
              </div>
              <div className="absolute top-4 right-6 text-[10px] font-bold text-[var(--gold)] tracking-widest uppercase bg-stone-900/80 px-2.5 py-1 rounded border border-[var(--gold)]/20">
                الجناح الملكي VIP
              </div>

              {/* Render Table Elements on Map */}
              {filteredTables.map((table) => {
                const isAvailable = table.status === 'available';
                const isSelected = selectedTable?.id === table.id;

                return (
                  <div
                    key={table.id}
                    style={{
                      left: `${table.position.x}%`,
                      top: `${table.position.y}%`
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
                  >
                    <button
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => handleSelectTable(table)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border-2 ${
                        isSelected
                          ? 'bg-[var(--gold)] text-stone-950 border-white ring-4 ring-[var(--gold)]/50 scale-110 z-20 font-bold'
                          : isAvailable
                          ? 'bg-stone-900/90 text-stone-100 border-emerald-500/60 hover:border-emerald-400 hover:scale-105 shadow-lg'
                          : table.status === 'reserved'
                          ? 'bg-amber-950/60 text-amber-200/50 border-amber-600/40 opacity-75 cursor-not-allowed'
                          : 'bg-rose-950/60 text-rose-200/50 border-rose-600/40 opacity-75 cursor-not-allowed'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-serif font-extrabold">
                        #{table.tableNumber}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-sans opacity-90">
                        {table.capacity} {dict.reservation.guestsPerson}
                      </span>

                      {/* Tooltip for Unavailable Tables */}
                      {!isAvailable && (
                        <div className="absolute bottom-full mb-2 hidden group-hover:block z-30 w-36 p-2 rounded-lg bg-stone-900 border border-stone-700 text-[10px] text-center text-stone-200 shadow-xl pointer-events-none">
                          <p className="font-bold text-rose-400">{dict.reservation.tableUnavailableTooltip}</p>
                          <p className="text-[9px] text-stone-400">
                            {table.status === 'reserved' ? 'محجوزة / Reserved' : 'مشغولة / Occupied'}
                          </p>
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Selected Table Summary & Next Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800">
              <div>
                {selectedTable ? (
                  <div className="flex items-center gap-3 text-sm text-stone-200">
                    <span className="font-bold text-[var(--gold)]">{dict.reservation.tableSelected}</span>
                    <span className="bg-[var(--gold)]/20 border border-[var(--gold)]/40 px-3 py-1 rounded-full font-serif font-bold text-white">
                      #{selectedTable.tableNumber} - {language === 'ar' ? selectedTable.nameAr : selectedTable.nameEn} ({selectedTable.capacity} pax)
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-amber-400 font-semibold animate-pulse">
                    * يرجى النقر على إحدى الطاولات المتاحة باللون الأخضر للاختيار
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-full border border-stone-700 text-stone-300 text-xs font-bold hover:bg-stone-800"
                >
                  {dict.reservation.btnBack}
                </button>

                <button
                  type="button"
                  disabled={!selectedTable}
                  onClick={() => setStep(3)}
                  className="px-8 py-3 rounded-full bg-[var(--gold)] disabled:opacity-40 text-stone-950 font-extrabold text-sm hover:bg-[var(--gold-light)] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>{dict.reservation.btnToDetails}</span>
                  {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Guest Details Form */}
        {step === 3 && (
          <motion.form
            onSubmit={handleSubmitBooking}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto space-y-6 shadow-2xl"
          >
            <h3 className="font-serif text-2xl font-bold text-white border-b border-stone-800 pb-4">
              {dict.reservation.step3Title}
            </h3>

            {/* Selection Summary Box */}
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-[var(--gold)]/30 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-stone-400 block">{dict.reservation.selectDate}:</span>
                <span className="font-bold text-white">{selectedDate} ({selectedTime})</span>
              </div>
              <div>
                <span className="text-stone-400 block">{dict.reservation.guestsCount}:</span>
                <span className="font-bold text-white">{guestsCount} {dict.reservation.guestsPerson}</span>
              </div>
              <div>
                <span className="text-stone-400 block">{dict.reservation.tableSelected}:</span>
                <span className="font-bold text-[var(--gold)]">
                  Table #{selectedTable?.tableNumber} ({selectedTable?.sectionAr})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Guest Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-300">
                  {dict.reservation.guestNameLabel} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={dict.reservation.guestNamePlaceholder}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 focus:border-[var(--gold)] focus:outline-none"
                />
              </div>

              {/* Guest Phone */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-300">
                  {dict.reservation.guestPhoneLabel} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder={dict.reservation.guestPhonePlaceholder}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 focus:border-[var(--gold)] focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-300">
                {dict.reservation.guestEmailLabel}
              </label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder={dict.reservation.guestEmailPlaceholder}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 focus:border-[var(--gold)] focus:outline-none"
              />
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-300">
                {dict.reservation.specialRequestsLabel}
              </label>
              <textarea
                rows={3}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder={dict.reservation.specialRequestsPlaceholder}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 focus:border-[var(--gold)] focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-full border border-stone-700 text-stone-300 text-xs font-bold hover:bg-stone-800"
              >
                {dict.reservation.btnBack}
              </button>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[var(--terracotta)] to-[#d9683f] text-white font-extrabold text-sm hover:opacity-95 transition-all shadow-xl cursor-pointer"
              >
                {dict.reservation.btnConfirm}
              </button>
            </div>
          </motion.form>
        )}

        {/* STEP 4: Confirmation Ticket */}
        {step === 4 && confirmedReservation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-8 max-w-2xl mx-auto text-center space-y-6 border-2 border-[var(--gold)]/40 shadow-2xl relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-3xl font-extrabold text-white">
                {dict.reservation.successTitle}
              </h3>
              <p className="text-stone-300 text-sm max-w-md mx-auto">
                {dict.reservation.successMsg}
              </p>
            </div>

            {/* Ticket Card Details */}
            <div className="p-6 rounded-2xl bg-stone-950 border border-[var(--gold)]/30 text-left relative space-y-4 font-sans">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-[var(--gold)]" />
                  <span className="font-serif font-bold text-lg text-gold-gradient">
                    {dict.brandName}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block">{dict.reservation.bookingRef}</span>
                  <span className="font-mono text-sm font-bold text-[var(--gold)]">
                    {confirmedReservation.bookingRef}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 block">{dict.reservation.guestNameLabel}</span>
                  <span className="font-bold text-stone-100">{confirmedReservation.guestName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">{dict.reservation.selectDate}</span>
                  <span className="font-bold text-stone-100">{confirmedReservation.date}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">{dict.reservation.selectTime}</span>
                  <span className="font-bold text-stone-100">{confirmedReservation.timeSlot}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">{dict.reservation.guestsCount}</span>
                  <span className="font-bold text-stone-100">
                    {confirmedReservation.guestsCount} {dict.reservation.guestsPerson}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block">{dict.reservation.tableSelected}</span>
                  <span className="font-bold text-[var(--gold)]">
                    Table #{confirmedReservation.tableNumber}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block">القسم / Section</span>
                  <span className="font-bold text-stone-100">
                    {language === 'ar' ? confirmedReservation.sectionAr : confirmedReservation.sectionEn}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={resetBooking}
              className="px-8 py-3 rounded-full bg-[var(--gold)] text-stone-950 font-bold text-sm hover:bg-[var(--gold-light)] transition-colors cursor-pointer"
            >
              {dict.reservation.btnNewBooking}
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};
