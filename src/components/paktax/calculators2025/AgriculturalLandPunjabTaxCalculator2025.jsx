import React, { useState } from 'react';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

export function AgriculturalLandPunjabTaxCalculator2025() {
  const [annualAgrIncome, setAnnualAgrIncome] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const income = clampNonNegative(parseMoney(annualAgrIncome));
    if (income <= 0) {
      setResult(null);
      return;
    }

    // Punjab AIT progressive brackets (from public summary):
    // Up to 600,000: 0
    // 600,001 - 1,200,000: 15% on excess over 600,000
    // 1,200,001 - 1,600,000: 90,000 + 20% on excess over 1,200,000
    // 1,600,001 - 3,200,000: 170,000 + 30% on excess over 1,600,000
    // 3,200,001 - 5,600,000: 650,000 + 40% on excess over 3,200,000
    // above 5,600,000: 1,610,000 + 45% on excess over 5,600,000
    let tax = 0;
    if (income <= 600000) tax = 0;
    else if (income <= 1200000) tax = (income - 600000) * 0.15;
    else if (income <= 1600000) tax = 90000 + (income - 1200000) * 0.20;
    else if (income <= 3200000) tax = 170000 + (income - 1600000) * 0.30;
    else if (income <= 5600000) tax = 650000 + (income - 3200000) * 0.40;
    else tax = 1610000 + (income - 5600000) * 0.45;

    setResult({ income, tax, effective: income > 0 ? tax / income : 0 });
  };

  return (
    <TaxCalculatorShell title="Tax On Agricultural Land — Punjab" subtitle="Agricultural income tax (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Annual Agricultural Income (PKR)</label>
              <input
                value={annualAgrIncome}
                onChange={(e) => setAnnualAgrIncome(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter annual agricultural income"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={() => { setAnnualAgrIncome(''); setResult(null); }}>Reset</ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Result">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Annual Agricultural Income</th>
                      <td className="font-bold">{formatPKR(result.income)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">AIT Payable</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.tax)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Effective Rate</th>
                      <td className="font-bold">{(result.effective * 100).toFixed(2)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ResultBlock>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter annual agricultural income and click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

