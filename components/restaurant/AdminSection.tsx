'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Activity,
  Check,
  UserCheck,
  XCircle,
  Users,
  Calendar,
  Clock,
  RefreshCw,
  Search,
  CheckCircle2
} from 'lucide-react';

export const AdminSection = () => {
  const { dict, tables, reservations, updateTableStatus, updateReservationStatus, language } = useStore();
  const [resFilter, setResFilter] = useState<'all' | 'confirmed' | 'seated' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReservations = reservations.filter((r) => {
    if (resFilter !== 'all' && r.status !== resFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        r.guestName.toLowerCase().includes(q) ||
        r.guestPhone.toLowerCase().includes(q) ||
        r.bookingRef.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <section id="admin" className="py-24 bg-[var(--bg-dark)] relative border-t border-[var(--gold)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{dict.admin.title}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {dict.admin.subtitle}
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs max-w-md">
            <p className="font-semibold">{dict.admin.liveSyncNotice}</p>
          </div>
        </div>

        {/* SECTION A: Live Table Control Panel Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl font-bold text-gold-gradient flex items-center gap-2">
              <Activity className="w-5 h-5 text-[var(--gold)]" />
              <span>{dict.admin.tableControl}</span>
            </h3>
            <span className="text-xs text-stone-400 font-mono">
              Total Tables: {tables.length}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tables.map((table) => {
              const isAvailable = table.status === 'available';
              const isOccupied = table.status === 'occupied';
              const isReserved = table.status === 'reserved';

              return (
                <div
                  key={table.id}
                  className={`glass-card rounded-2xl p-4 flex flex-col justify-between transition-all border ${
                    isAvailable
                      ? 'border-emerald-500/40 bg-emerald-950/10'
                      : isOccupied
                      ? 'border-rose-500/40 bg-rose-950/10'
                      : 'border-amber-500/40 bg-amber-950/10'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif font-bold text-base text-white">
                        {dict.admin.tableNum} {table.tableNumber}
                      </span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isAvailable
                            ? 'bg-emerald-500 shadow-emerald-500/50 shadow-md'
                            : isOccupied
                            ? 'bg-rose-500 shadow-rose-500/50 shadow-md'
                            : 'bg-amber-500 shadow-amber-500/50 shadow-md'
                        }`}
                      />
                    </div>
                    <p className="text-[11px] text-stone-400 mb-1">
                      {language === 'ar' ? table.nameAr : table.nameEn}
                    </p>
                    <p className="text-[10px] text-stone-300 font-semibold mb-4">
                      {table.capacity} {dict.reservation.guestsPerson} | {language === 'ar' ? table.sectionAr : table.sectionEn}
                    </p>
                  </div>

                  {/* Quick Action Toggle Buttons */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-800">
                    <span className="text-[10px] text-stone-400 block">{dict.admin.changeStatus}</span>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        type="button"
                        onClick={() => updateTableStatus(table.id, 'available')}
                        className={`py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          isAvailable
                            ? 'bg-emerald-500 text-stone-950'
                            : 'bg-stone-900 text-stone-400 hover:text-white'
                        }`}
                        title="Available"
                      >
                        {dict.admin.statusAvailable}
                      </button>
                      <button
                        type="button"
                        onClick={() => updateTableStatus(table.id, 'reserved')}
                        className={`py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          isReserved
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-stone-900 text-stone-400 hover:text-white'
                        }`}
                        title="Reserved"
                      >
                        {dict.admin.statusReserved}
                      </button>
                      <button
                        type="button"
                        onClick={() => updateTableStatus(table.id, 'occupied')}
                        className={`py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          isOccupied
                            ? 'bg-rose-600 text-white'
                            : 'bg-stone-900 text-stone-400 hover:text-white'
                        }`}
                        title="Occupied"
                      >
                        {dict.admin.statusOccupied}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION B: Reservations List Table */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--gold)]" />
              <span>{dict.admin.reservationsList}</span>
            </h3>

            {/* Filter Tabs & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search name/phone/ref..."
                  className="bg-stone-900 border border-stone-700 text-stone-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs">
                {(['all', 'confirmed', 'seated', 'cancelled'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setResFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer capitalize ${
                      resFilter === st
                        ? 'bg-[var(--gold)] text-stone-950'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {st === 'all' && dict.admin.filterAll}
                    {st === 'confirmed' && dict.admin.filterConfirmed}
                    {st === 'seated' && dict.admin.filterSeated}
                    {st === 'cancelled' && dict.admin.filterCancelled}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reservations Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="bg-stone-900/80 text-[var(--gold)] uppercase font-bold text-[10px] tracking-wider border-b border-stone-800">
                <tr>
                  <th className="py-3.5 px-4">{dict.admin.refHeader}</th>
                  <th className="py-3.5 px-4">{dict.admin.guestHeader}</th>
                  <th className="py-3.5 px-4">{dict.admin.phoneHeader}</th>
                  <th className="py-3.5 px-4">{dict.admin.dateTimeHeader}</th>
                  <th className="py-3.5 px-4">{dict.admin.tableHeader}</th>
                  <th className="py-3.5 px-4">{dict.admin.guestsHeader}</th>
                  <th className="py-3.5 px-4">{dict.admin.statusHeader}</th>
                  <th className="py-3.5 px-4 text-center">{dict.admin.actionsHeader}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-stone-500">
                      No reservations found.
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-stone-900/50 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-[var(--gold)]">
                        {res.bookingRef}
                      </td>
                      <td className="py-4 px-4 font-semibold text-white">
                        {res.guestName}
                      </td>
                      <td className="py-4 px-4 font-mono text-stone-400">
                        {res.guestPhone}
                      </td>
                      <td className="py-4 px-4">
                        <span className="block font-bold text-stone-200">{res.date}</span>
                        <span className="text-stone-400">{res.timeSlot}</span>
                      </td>
                      <td className="py-4 px-4 font-semibold">
                        Table #{res.tableNumber} ({language === 'ar' ? res.sectionAr : res.sectionEn})
                      </td>
                      <td className="py-4 px-4 font-bold text-white">
                        {res.guestsCount} pax
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            res.status === 'confirmed'
                              ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                              : res.status === 'seated'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-950 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {res.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          {res.status !== 'seated' && (
                            <button
                              onClick={() => updateReservationStatus(res.id, 'seated')}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                              title="Mark Seated"
                            >
                              <UserCheck className="w-3 h-3" />
                              <span>{dict.admin.actionSeated}</span>
                            </button>
                          )}
                          {res.status !== 'cancelled' && (
                            <button
                              onClick={() => updateReservationStatus(res.id, 'cancelled')}
                              className="px-2.5 py-1 rounded bg-rose-900 hover:bg-rose-800 text-rose-200 font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                              title="Cancel"
                            >
                              <XCircle className="w-3 h-3" />
                              <span>{dict.admin.actionCancel}</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
