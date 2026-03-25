// Shared utility functions for PakTax calculators (2025-26).
// Kept separate so each calculator component file stays small and easy to manage.

export const formatPKR = (value) => {
  if (!Number.isFinite(value)) return '0';
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(value);
};

export const clampNonNegative = (n) => (Number.isFinite(n) && n > 0 ? n : 0);

export const parseMoney = (value) => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  const normalized = String(value).replace(/,/g, '').trim();
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
};

/**
 * Pakistan income tax slabs (individuals / AOP-style) for 2025-26.
 * Slabs provided by you:
 * 0% up to 600,000
 * 1% on 600k-1.2M
 * 11% on 1.2M-2.2M with base 6,000
 * 23% on 2.2M-3.2M with base 116,000
 * 30% on 3.2M-4.1M with base 346,000
 * 35% above 4.1M with base 616,000
 */
export function computeIncomeTaxSlabs2025(amountAnnual) {
  const income = clampNonNegative(amountAnnual);

  const bracket1 = Math.max(0, Math.min(income, 1200000) - 600000);
  const bracket2 = Math.max(0, Math.min(income, 2200000) - 1200000);
  const bracket3 = Math.max(0, Math.min(income, 3200000) - 2200000);
  const bracket4 = Math.max(0, Math.min(income, 4100000) - 3200000);
  const bracket5 = Math.max(0, income - 4100000);

  const tax =
    bracket1 * 0.01 +
    bracket2 * 0.11 +
    bracket3 * 0.23 +
    bracket4 * 0.30 +
    bracket5 * 0.35;

  return {
    totalTax: tax,
    effectiveRate: income > 0 ? tax / income : 0,
    breakdown: [
      { label: '0% up to 600,000', tax: 0 },
      { label: '1% on 600,001 - 1,200,000', tax: bracket1 * 0.01 },
      { label: '11% on 1,200,001 - 2,200,000', tax: bracket2 * 0.11 },
      { label: '23% on 2,200,001 - 3,200,000', tax: bracket3 * 0.23 },
      { label: '30% on 3,200,001 - 4,100,000', tax: bracket4 * 0.30 },
      { label: '35% on above 4,100,000', tax: bracket5 * 0.35 },
    ],
  };
}

/**
 * Super tax (2025-26): progressive piecewise approximation from published brackets.
 * Brackets and rates (from public sources):
 * Up to 150M: 0%
 * 150–200M: 1%
 * 200–250M: 1.5%
 * 250–300M: 2.5%
 * 300–350M: 3.5%
 * 350–400M: 5.5%
 * 400–500M: 7.5%
 * > 500M: 10%
 *
 * Interpretation: taxes only the portion within each bracket (progressive).
 */
export function computeSuperTax2025(amountAnnual) {
  const income = clampNonNegative(amountAnnual);
  const t = [];

  const piece = (lower, upper, rate) => {
    const portion = Math.max(0, Math.min(income, upper) - lower);
    return portion * rate;
  };

  const lower0 = 150e6; // kept to match original structure (even if unused)
  const tax =
    piece(150e6, 200e6, 0.01) +
    piece(200e6, 250e6, 0.015) +
    piece(250e6, 300e6, 0.025) +
    piece(300e6, 350e6, 0.035) +
    piece(350e6, 400e6, 0.055) +
    piece(400e6, 500e6, 0.075) +
    Math.max(0, income - 500e6) * 0.10;

  t.push({ label: 'Super tax total', tax });
  return {
    totalSuperTax: tax,
    effectiveRate: income > 0 ? tax / income : 0,
    breakdown: t,
  };
}

