'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, KeyRound, Lock, ArrowRight, UtensilsCrossed } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setErrorMsg(data.message || 'رمز الدخول غير صحيح');
      }
    } catch (err) {
      setErrorMsg('حدث خطأ في الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-arabesque flex items-center justify-center p-4 text-[var(--ivory)]">
      <div className="glass-card rounded-3xl p-8 sm:p-10 max-w-md w-full border border-[var(--gold)]/30 shadow-2xl space-y-6">

        {/* Header Logo */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full border border-[var(--gold)] bg-[var(--charcoal)] flex items-center justify-center text-[var(--gold)] mx-auto shadow-lg">
            <UtensilsCrossed className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-gold-gradient">
            بيتنا الشامي - لوحة الموظفين
          </h1>
          <p className="text-xs text-stone-400">
            يرجى إدخال رمز دخول الموظفين (PIN: <code className="text-[var(--gold)]">1982</code>) أو كلمة المرور للدخول.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs text-center font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>رمز دخول الموظف (PIN)</span>
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="1982"
              className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 text-center tracking-widest font-mono text-base focus:border-[var(--gold)] focus:outline-none"
            />
          </div>

          <div className="text-center text-stone-500 text-[11px] font-semibold">أو / OR</div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>كلمة مرور الإدارة</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin"
              className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 text-center font-mono text-sm focus:border-[var(--gold)] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[var(--gold)] text-stone-950 font-extrabold text-sm hover:bg-[var(--gold-light)] transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? 'جاري التحقق...' : 'تسجيل الدخول'}</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-stone-800">
          <a href="/" className="text-xs text-stone-400 hover:text-[var(--gold)] transition-colors inline-flex items-center gap-1">
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة للموقع الرئيسي</span>
          </a>
        </div>

      </div>
    </main>
  );
}
