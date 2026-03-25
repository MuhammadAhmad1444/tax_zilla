import React, { useState } from 'react';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney, computeIncomeTaxSlabs2025 } from './taxUtils2025.js';

const BUSINESS_CATEGORIES = [
  { value: 'rice-cotton-oil', label: 'Sale of rice, cottonseed & edible oil' },
  { value: 'cigarettes-pharma-gold-silver', label: 'Sale of cigarettes, pharma products, gold & silver' },
  {
    value: 'fmcg-fertilizer-electronics-sugar-cement-steel-oil',
    label: 'FMCG, fertilizer, electronics (excl. mobile phones), sugar, cement, steel & edible oil',
  },
  { value: 'other-goods-companies-toll', label: 'Other goods by companies including toll manufacturers' },
  { value: 'other-goods-aops-individuals-toll', label: 'Other goods by AOPs & individuals including toll manufacturers' },
  {
    value: 'textile-carpets-leather-footwear-surgical-sports',
    label: 'Textile, Carpets, Leather, Footwear, Surgical & Sports goods',
  },
  { value: 'local-supplies-yarn-traders', label: 'Local supplies by yarn traders' },
];

export function GainTaxOnSecuritiesCalculator2025() {
  const [gain, setGain] = useState('');
  const [isAtl, setIsAtl] = useState(true);
  const [businessCategory, setBusinessCategory] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const g = clampNonNegative(parseMoney(gain));
    if (g <= 0) {
      setResult(null);
      return;
    }
    const atlTax = g * 0.15;
    const progressiveTax = computeIncomeTaxSlabs2025(g).totalTax;
    const tax = isAtl ? atlTax : Math.max(atlTax, progressiveTax);
    setResult({
      gain: g,
      atlTax,
      progressiveTax,
      tax,
      businessCategory: businessCategory || null,
    });
  };

  return (
    <TaxCalculatorShell title="Gain Tax on Securities" subtitle="Active Taxpayer List vs Non-ATL (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">ATL Status</label>
              <select
                value={isAtl ? 'yes' : 'no'}
                onChange={(e) => setIsAtl(e.target.value === 'yes')}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="yes">ATL filer</option>
                <option value="no">Non-ATL filer</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Gain Amount (PKR)</label>
              <input
                value={gain}
                onChange={(e) => setGain(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter gain amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Business Category</label>
              <select
                value={businessCategory}
                onChange={(e) => setBusinessCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="" disabled>
                  Select Business Category
                </option>
                {BUSINESS_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <div className="text-xs text-gray-500 mt-2 leading-relaxed">
                Category is shown for reference in this calculator UI. If you want category-specific rates, share the official rate rules you want to apply.
              </div>
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton
              onClick={() => {
                setGain('');
                setBusinessCategory('');
                setResult(null);
              }}
            >
              Reset
            </ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Tax Breakdown">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    {result.businessCategory ? (
                      <tr>
                        <th className="text-left">Business Category</th>
                        <td className="font-bold">
                          {BUSINESS_CATEGORIES.find((c) => c.value === result.businessCategory)?.label || result.businessCategory}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <th className="text-left">Gain Amount</th>
                      <td className="font-bold">{formatPKR(result.gain)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">ATL Rate Tax (15%)</th>
                      <td className="font-bold">{formatPKR(result.atlTax)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Progressive Min Tax (slabs)</th>
                      <td className="font-bold">{formatPKR(result.progressiveTax)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Total Tax Payable</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.tax)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ResultBlock>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter gain amount, select <b>ATL/Non-ATL</b> and (optional) <b>Business Category</b>, then click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

