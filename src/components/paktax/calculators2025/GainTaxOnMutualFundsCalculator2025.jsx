import React, { useState } from 'react';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

export function GainTaxOnMutualFundsCalculator2025() {
  const [gain, setGain] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const g = clampNonNegative(parseMoney(gain));
    if (g <= 0) {
      setResult(null);
      return;
    }
    const tax = g * 0.15; // flat (simplified for 2025-26)
    setResult({ gain: g, tax });
  };

  return (
    <TaxCalculatorShell title="Gain Tax on Mutual Funds" subtitle="Flat 15% capital gains tax (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>
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
            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={() => { setGain(''); setResult(null); }}>Reset</ResetButton>
          </div>
        </div>
        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Result">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Gain Amount</th>
                      <td className="font-bold">{formatPKR(result.gain)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Tax @ 15%</th>
                      <td className="font-bold">{formatPKR(result.tax)}</td>
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
              Enter gain amount and click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

