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

/* ── Result block (used for individual result cards) */
export const ResultBlock = ({ title, children }) => (
  <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm border-l-4 border-l-[var(--color-gold)]">
    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{title}</div>
    {children}
  </div>
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
            <span className="paktax-trust-badge paktax-trust-badge-gold">
              FY 2025–26
            </span>
            <span className="paktax-trust-badge paktax-trust-badge-gray">
              <ShieldCheck size={11} style={{ display: 'inline', marginRight: 4 }} />
              FBR Official Rates
            </span>
            <span className="paktax-trust-badge paktax-trust-badge-gray">
              <Zap size={11} style={{ display: 'inline', marginRight: 4 }} />
              Instant Results
            </span>
            <span className="paktax-trust-badge paktax-trust-badge-gray">
              <Lock size={11} style={{ display: 'inline', marginRight: 4 }} />
              Free &amp; Private
            </span>
          </div>

          {/* Title + subtitle */}
          <h1 className="paktax-shell-title">{title}</h1>
          {subtitle && (
            <p className="paktax-shell-subtitle">{subtitle}</p>
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
