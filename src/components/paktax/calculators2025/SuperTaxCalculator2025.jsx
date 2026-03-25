import React, { useState } from 'react';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney, computeSuperTax2025 } from './taxUtils2025.js';

export function SuperTaxCalculator2025() {
  const [taxCategory, setTaxCategory] = useState('all'); // 'all' | 'bank'
  const [annualIncome, setAnnualIncome] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const income = clampNonNegative(parseMoney(annualIncome));
    if (income <= 0) {
      setResult(null);
      return;
    }
    const superTax = computeSuperTax2025(income);
    setResult({
      income,
      superTax: superTax.totalSuperTax,
      effective: superTax.effectiveRate,
    });
  };

  const handleReset = () => {
    setAnnualIncome('');
    setResult(null);
  };

  return (
    <TaxCalculatorShell title="Super Tax on Annual Income" subtitle="High-income persons (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Category</label>
              <select
                value={taxCategory}
                onChange={(e) => setTaxCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="all">All Other Persons</option>
                <option value="bank">Banking Company</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Annual Income (PKR)</label>
              <input
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                type="number"
                min="0"
                step="100000"
                placeholder="Enter annual income"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={handleReset}>Reset</ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {result ? (
            <>
              <ResultBlock title="Super Tax Result">
                <div className="overflow-x-auto">
                  <table className="paktax-table">
                    <tbody>
                      <tr>
                        <th className="text-left">Annual Income</th>
                        <td className="font-bold">{formatPKR(result.income)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Super Tax Payable</th>
                        <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.superTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Effective Rate</th>
                        <td className="font-bold">{(result.effective * 100).toFixed(2)}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-xs text-gray-500 mt-3">
                  Rate is applied progressively by published 2025-26 brackets. Please validate with FBR/Finance Act text for final compliance.
                </div>
              </ResultBlock>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter annual income and click <b>Calculate Tax</b> to view results.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

