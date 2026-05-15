import React from 'react';
import { ShieldCheck, Zap, Lock } from 'lucide-react';

/* ── Shared reset button ─────────────────────────── */
export const ResetButton = ({ onClick, children = 'Reset' }) => (
  <button
    type="button"
    className="paktax-btn paktax-btn-secondary w-full mt-3"
    onClick={onClick}
  >
    {children}
  </button>
);

/* ── Result block (individual result cards) ─────── */
export const ResultBlock = ({ title, children }) => (
  <div
    className="rounded-xl bg-white p-5 overflow-hidden"
    style={{
      border: '1px solid #e8eaf2',
      borderLeft: '3px solid var(--color-gold)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      transition: 'box-shadow 0.2s ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.09)'; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; }}
  >
    <div
      className="text-[10px] font-black uppercase tracking-[0.15em] mb-3 pb-2"
      style={{
        color: 'var(--color-gold-dark)',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
      }}
    >
      {title}
    </div>
    {children}
  </div>
);

/* ── Trust badge pill ─────────────────────────────── */
const TrustBadge = ({ icon: Icon, label, gold = false }) => (
  <span
    className="paktax-trust-badge"
    style={gold ? {
      background: 'rgba(212,175,55,0.12)',
      border: '1px solid rgba(212,175,55,0.3)',
      color: '#8a6d00',
    } : {
      background: '#f3f4f6',
      border: '1px solid #e5e7eb',
      color: '#4b5563',
    }}
  >
    {Icon && <Icon size={11} style={{ display: 'inline', marginRight: 4 }} />}
    {label}
  </span>
);

/* ── Main calculator shell ───────────────────────── */
export const TaxCalculatorShell = ({ title, subtitle, onBack, children }) => {
  return (
    <section className="paktax-root min-w-0">

      {/* ── Professional Header ── */}
      <div className="paktax-shell-header">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-8">

          {/* Trust badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <TrustBadge label="FY 2025–26" gold />
            <TrustBadge icon={ShieldCheck} label="FBR Official Rates" />
            <TrustBadge icon={Zap} label="Instant Results" />
            <TrustBadge icon={Lock} label="Free & Private" />
          </div>

          {/* Title + subtitle */}
          <h1 className="paktax-shell-title">{title}</h1>
          {subtitle && (
            <p className="paktax-shell-subtitle mt-1.5">{subtitle}</p>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-6xl min-w-0 px-3 py-6 sm:px-4 sm:py-8">
        {children}
      </div>

    </section>
  );
};
