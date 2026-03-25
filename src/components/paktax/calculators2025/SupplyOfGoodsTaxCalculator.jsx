import React, { useMemo, useState } from 'react';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';

const parseNumber = (value) => {
  const s = String(value ?? '').trim();
  if (!s) return null;
  const normalized = s.replace(/,/g, '');
  const n = Number(normalized);
  if (!Number.isFinite(n)) return null;
  // Sales tax calculations are not defined for negative money/rate in this UI.
  if (n < 0) return null;
  return n;
};

const formatNumber = (n, { maxDecimals = 2 } = {}) => {
  if (n === null || n === undefined || !Number.isFinite(n)) return '—';
  return n.toFixed(maxDecimals);
};

const toSafeTolerance = (value, fallback = 0.01) => {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(fallback, Math.abs(value) * 1e-6);
};

const computeSalesTax = ({ net, tax, gross, rate }) => {
  // Try to compute the full set from any solvable pair.
  // Returns { net, tax, gross, rate, errors, inconsistencies }.
  const errors = [];
  const inconsistencies = [];

  const provided = {
    net: net !== null,
    tax: tax !== null,
    gross: gross !== null,
    rate: rate !== null,
  };

  let computed = { net: null, tax: null, gross: null, rate: null };

  // Pair 1: net + rate
  if (net !== null && rate !== null) {
    const r = rate / 100;
    const taxCalc = net * r;
    const grossCalc = net + taxCalc;
    computed = { net, tax: taxCalc, gross: grossCalc, rate };
  }

  // Pair 2: net + tax
  else if (net !== null && tax !== null) {
    if (net === 0) {
      errors.push('Cannot compute Sales Tax rate because Net Price is 0.');
      computed = { net, tax, gross: net + tax, rate: null };
    } else {
      const rateCalc = (tax / net) * 100;
      computed = { net, tax, gross: net + tax, rate: rateCalc };
    }
  }

  // Pair 3: net + gross
  else if (net !== null && gross !== null) {
    const taxCalc = gross - net;
    if (net === 0) {
      errors.push('Cannot compute Sales Tax rate because Net Price is 0.');
      computed = { net, tax: taxCalc, gross, rate: null };
    } else {
      const rateCalc = (taxCalc / net) * 100;
      computed = { net, tax: taxCalc, gross, rate: rateCalc };
    }
  }

  // Pair 4: tax + rate
  else if (tax !== null && rate !== null) {
    const r = rate / 100;
    if (r === 0) {
      if (tax === 0) {
        errors.push(
          'Sales Tax Rate is 0%, so Net Price and Gross Price cannot be determined from Tax Amount alone.'
        );
        computed = { net: null, tax, gross: null, rate };
      } else {
        errors.push('Sales Tax Rate is 0%, but Tax Amount is not 0. Check inputs.');
        computed = { net: null, tax, gross: null, rate };
      }
    } else {
      const netCalc = tax / r;
      const grossCalc = netCalc + tax;
      computed = { net: netCalc, tax, gross: grossCalc, rate };
    }
  }

  // Pair 5: tax + gross
  else if (tax !== null && gross !== null) {
    const netCalc = gross - tax;
    if (netCalc === 0) {
      errors.push('Cannot compute Sales Tax rate because Net Price becomes 0 (Gross - Tax = 0).');
      computed = { net: netCalc, tax, gross, rate: null };
    } else {
      const rateCalc = (tax / netCalc) * 100;
      computed = { net: netCalc, tax, gross, rate: rateCalc };
    }
  }

  // Pair 6: gross + rate
  else if (gross !== null && rate !== null) {
    const r = rate / 100;
    const denom = 1 + r;
    if (denom === 0) {
      errors.push('Sales Tax Rate results in an invalid denominator for Net/Gross conversion.');
      computed = { net: null, tax: null, gross, rate };
    } else {
      const netCalc = gross / denom;
      const taxCalc = gross - netCalc;
      computed = { net: netCalc, tax: taxCalc, gross, rate };
    }
  } else {
    errors.push('Enter at least two fields (Net Price, Tax Amount, Gross Price, or Sales Tax Rate) to calculate Sales Tax.');
  }

  // Consistency check for any user-provided values that were computed.
  const toleranceFor = (key) => {
    if (key === 'rate') return 0.01; // rate shown with 2 decimals
    return 0.01;
  };

  (['net', 'tax', 'gross', 'rate']).forEach((key) => {
    if (!provided[key]) return;
    const expected = computed[key];
    if (expected === null) return;
    const actual = { net, tax, gross, rate }[key];
    const tol = toleranceFor(key);
    if (Math.abs(expected - actual) > tol + toSafeTolerance(actual, tol) * 0.0001) {
      inconsistencies.push(
        `${key === 'rate' ? 'Sales Tax Rate (%)' : key === 'tax' ? 'Tax Amount' : key === 'gross' ? 'Gross Price' : 'Net Price'} does not match the computed value.`
      );
    }
  });

  return { computed, errors, inconsistencies };
};

export function SupplyOfGoodsTaxCalculator() {
  const [netStr, setNetStr] = useState('');
  const [taxStr, setTaxStr] = useState('');
  const [grossStr, setGrossStr] = useState('');
  const [rateStr, setRateStr] = useState('');

  const parsed = useMemo(
    () => ({
      net: parseNumber(netStr),
      tax: parseNumber(taxStr),
      gross: parseNumber(grossStr),
      rate: parseNumber(rateStr),
    }),
    [netStr, taxStr, grossStr, rateStr]
  );

  const providedCount = useMemo(() => Object.values(parsed).filter((v) => v !== null).length, [parsed]);

  const result = useMemo(() => {
    if (providedCount < 2) return null;
    return computeSalesTax(parsed);
  }, [parsed, providedCount]);

  return (
    <TaxCalculatorShell
      title="Supply of Goods Tax Calculator"
      subtitle="Enter any two values. The missing fields will be calculated using standard sales tax formulas."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Net Price (Before Sales Tax)</label>
              <input
                value={netStr}
                onChange={(e) => setNetStr(e.target.value)}
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 10000"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Tax Amount (Sales Tax)</label>
              <input
                value={taxStr}
                onChange={(e) => setTaxStr(e.target.value)}
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 1700"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Gross Price (Including Sales Tax)</label>
              <input
                value={grossStr}
                onChange={(e) => setGrossStr(e.target.value)}
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 11700"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Sales Tax Rate (%)</label>
              <input
                value={rateStr}
                onChange={(e) => setRateStr(e.target.value)}
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 17"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="text-xs text-gray-500 mt-2 leading-relaxed">
              Tip: leave the other fields blank and enter any 2 values. Example: Net Price + Sales Tax Rate, or Gross Price + Tax Amount.
            </div>

            <ResetButton
              onClick={() => {
                setNetStr('');
                setTaxStr('');
                setGrossStr('');
                setRateStr('');
              }}
            >
              Reset
            </ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {providedCount < 2 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              <div className="font-extrabold text-gray-900 text-lg mb-2">Enter any 2 values</div>
              <div className="text-sm leading-relaxed">
                Select two fields from:
                <span className="font-semibold text-gray-800"> Net Price</span>,{' '}
                <span className="font-semibold text-gray-800">Tax Amount</span>,{' '}
                <span className="font-semibold text-gray-800">Gross Price</span>,{' '}
                <span className="font-semibold text-gray-800">Sales Tax Rate (%)</span>.
              </div>

              <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-sm font-bold text-gray-800 mb-2">Example</div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  If <span className="font-semibold">Net Price = 10,000</span> and{' '}
                  <span className="font-semibold">Sales Tax Rate = 17%</span>:
                  <br />
                  Tax Amount = 10,000 × 17% = 1,700
                  <br />
                  Gross Price = 10,000 + 1,700 = 11,700
                </div>
              </div>

              <div className="text-xs text-gray-500 mt-3 leading-relaxed">
                We use standard sales tax formulas to calculate the remaining fields automatically.
              </div>
            </div>
          ) : null}

          {result ? (
            <>
              <ResultBlock title="Sales Tax Results">
                <div className="overflow-x-auto">
                  <table className="paktax-table">
                    <tbody>
                      <tr>
                        <th className="text-left">Net Price</th>
                        <td className="font-extrabold text-[var(--color-gold)]">
                          {result.computed.net === null ? '—' : formatNumber(result.computed.net)}
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left">Sales Tax Rate (%)</th>
                        <td className="font-extrabold text-[var(--color-gold)]">
                          {result.computed.rate === null ? '—' : formatNumber(result.computed.rate)}
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left">Tax Amount</th>
                        <td className="font-extrabold text-[var(--color-gold)]">
                          {result.computed.tax === null ? '—' : formatNumber(result.computed.tax)}
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left">Gross Price</th>
                        <td className="font-extrabold text-[var(--color-gold)]">
                          {result.computed.gross === null ? '—' : formatNumber(result.computed.gross)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-xs text-gray-500 mt-3 leading-relaxed">
                  Computed from your inputs. If you entered more than two fields, we also check for consistency.
                </div>
              </ResultBlock>

              {result.errors.length ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
                  <div className="font-bold mb-2">Input issue</div>
                  <ul className="list-disc list-inside text-sm leading-relaxed">
                    {result.errors.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {result.inconsistencies.length ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900">
                  <div className="font-bold mb-2">Consistency check</div>
                  <ul className="list-disc list-inside text-sm leading-relaxed">
                    {result.inconsistencies.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

