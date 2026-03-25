import React, { useState } from 'react';
import {
  TaxCalculatorShell,
  ResetButton,
  ResultBlock,
} from './calculatorUi2025.jsx';
import {
  formatPKR,
  clampNonNegative,
  parseMoney,
  computeIncomeTaxSlabs2025,
  computeSuperTax2025,
} from './taxUtils2025.js';

export function BusinessTaxCalculator2025() {
  const [taxType, setTaxType] = useState('aop'); // 'aop' | 'individual'
  const [year, setYear] = useState('2025-2026');
  const [businessAmount, setBusinessAmount] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const income = clampNonNegative(parseMoney(businessAmount));
    if (income <= 0) {
      setResult(null);
      return;
    }
    const incomeTax = computeIncomeTaxSlabs2025(income);
    const superTax = computeSuperTax2025(income);
    const totalTax = incomeTax.totalTax + superTax.totalSuperTax;
    setResult({
      income,
      incomeTax: incomeTax.totalTax,
      superTax: superTax.totalSuperTax,
      totalTax,
      netAfterTax: income - totalTax,
    });
  };

  const handleReset = () => {
    setBusinessAmount('');
    setResult(null);
  };

  return (
    <TaxCalculatorShell title="Pakistan Business Tax Calculator" subtitle="AOP & Individuals / Other AOPs for 2025-26">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Tax Category</label>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="taxType"
                    checked={taxType === 'aop'}
                    onChange={() => setTaxType('aop')}
                    className="accent-[var(--color-gold)]"
                  />
                  AOP — Law/Rules Restricted
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="taxType"
                    checked={taxType === 'individual'}
                    onChange={() => setTaxType('individual')}
                    className="accent-[var(--color-gold)]"
                  />
                  Individuals &amp; Other AOPs
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Enter Business Amount (PKR)</label>
              <input
                value={businessAmount}
                onChange={(e) => setBusinessAmount(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter business amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Tax Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option>2025-2026</option>
                <option>2024-2025</option>
              </select>
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={handleReset}>Reset</ResetButton>

            <div className="text-xs text-gray-500 mt-4 leading-relaxed">
              Income tax is computed using 2025-26 slabs. Super tax is added where applicable.
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {result ? (
            <>
              <ResultBlock title="Tax Breakdown">
                <div className="overflow-x-auto">
                  <table className="paktax-table">
                    <tbody>
                      <tr>
                        <th className="text-left">Business Amount</th>
                        <td className="font-bold">{formatPKR(result.income)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Income Tax</th>
                        <td className="font-bold">{formatPKR(result.incomeTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Super Tax</th>
                        <td className="font-bold">{formatPKR(result.superTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Total Tax Payable</th>
                        <td className="font-extrabold">{formatPKR(result.totalTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Amount After Tax</th>
                        <td className="font-bold">{formatPKR(result.netAfterTax)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ResultBlock>

              <ResultBlock title="Effective Rate">
                <div className="text-2xl font-extrabold text-[var(--color-gold)]">
                  {result.income > 0 ? ((result.totalTax / result.income) * 100).toFixed(2) : '0.00'}%
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {taxType === 'aop' ? 'AOP — Law/Rules Restricted' : 'Individuals & Other AOPs'} selection applied.
                </div>
              </ResultBlock>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter your business amount and click <b>Calculate Tax</b> to view results.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

