import React, { useState } from 'react';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

export function ZakatCalculator2025() {
  const [assets, setAssets] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [nisabMode, setNisabMode] = useState('silver'); // gold|silver
  const [goldPricePKR, setGoldPricePKR] = useState('0'); // optional, not used in simplified gram-based
  const [silverPricePKR, setSilverPricePKR] = useState('0');
  const [result, setResult] = useState(null);

  const nisabGoldGrams = 87.48;
  const nisabSilverGrams = 612.36;
  const zakatRate = 0.025;

  const handleCalculate = () => {
    const a = clampNonNegative(parseMoney(assets));
    const l = clampNonNegative(parseMoney(liabilities));
    const net = Math.max(0, a - l);

    // If user provided prices we compute nisab in PKR; otherwise use a default approximation in PKR for typical market rates.
    // For deterministic behavior, we use gram-based nisab with user-supplied per-gram price when available.
    let nisabPKR = 0;
    if (nisabMode === 'gold') {
      const perGram = clampNonNegative(parseMoney(goldPricePKR));
      nisabPKR = perGram > 0 ? perGram * nisabGoldGrams : 0;
    } else {
      const perGram = clampNonNegative(parseMoney(silverPricePKR));
      nisabPKR = perGram > 0 ? perGram * nisabSilverGrams : 0;
    }

    // If neither price is set, fall back to the nisab amounts commonly cited in 2025-26 summaries:
    if (nisabPKR === 0) {
      nisabPKR = nisabMode === 'gold' ? 1696565 : 133601;
    }

    const zakatPayable = net >= nisabPKR ? net * zakatRate : 0;
    setResult({ assets: a, liabilities: l, net, nisabPKR, zakatPayable });
  };

  return (
    <TaxCalculatorShell title="Zakat Tax Calculator" subtitle="2.5% on net zakatable assets (2025-26 Nisab-based)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Total Zakatable Assets (PKR)</label>
              <input
                value={assets}
                onChange={(e) => setAssets(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="e.g., cash, savings, gold value..."
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Immediate Liabilities / Debts (PKR)</label>
              <input
                value={liabilities}
                onChange={(e) => setLiabilities(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="e.g., debts due immediately"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Nisab Mode</label>
              <select
                value={nisabMode}
                onChange={(e) => setNisabMode(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="silver">Silver Nisab</option>
                <option value="gold">Gold Nisab</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">
                {nisabMode === 'gold' ? 'Gold Price (PKR per gram)' : 'Silver Price (PKR per gram)'} (optional)
              </label>
              <input
                value={nisabMode === 'gold' ? goldPricePKR : silverPricePKR}
                onChange={(e) => (nisabMode === 'gold' ? setGoldPricePKR(e.target.value) : setSilverPricePKR(e.target.value))}
                type="number"
                min="0"
                step="1"
                placeholder="e.g., 8500"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={() => { setAssets(''); setLiabilities(''); setResult(null); }}>Reset</ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Zakat Result">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Total Assets</th>
                      <td className="font-bold">{formatPKR(result.assets)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Liabilities</th>
                      <td className="font-bold">{formatPKR(result.liabilities)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Net Zakatable Amount</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.net)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Nisab Threshold</th>
                      <td className="font-bold">{formatPKR(result.nisabPKR)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Zakat Payable (@ 2.5%)</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.zakatPayable)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-xs text-gray-500 mt-3">
                If nisab mode prices are not provided, defaults are used from public 2025-26 summary values.
              </div>
            </ResultBlock>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter your assets/liabilities and click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

