import React, { useMemo, useState } from 'react';
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

export function SalaryTaxCalculator2025() {
  const [taxPeriod, setTaxPeriod] = useState('monthly'); // 'monthly' | 'yearly'
  const [year, setYear] = useState('2025-2026');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [yearlyIncome, setYearlyIncome] = useState('');
  const [result, setResult] = useState(null);

  const incomeAnnual = useMemo(() => {
    if (taxPeriod === 'monthly') return parseMoney(monthlyIncome) * 12;
    return parseMoney(yearlyIncome);
  }, [taxPeriod, monthlyIncome, yearlyIncome]);

  const handleCalculate = () => {
    const income = clampNonNegative(incomeAnnual);
    if (income <= 0) {
      setResult(null);
      return;
    }
    const incomeTax = computeIncomeTaxSlabs2025(income);
    const superTax = computeSuperTax2025(income);
    const totalTax = incomeTax.totalTax + superTax.totalSuperTax;
    setResult({
      incomeAnnual: income,
      incomeTax: incomeTax.totalTax,
      superTax: superTax.totalSuperTax,
      totalTax,
      netAnnual: income - totalTax,
    });
  };

  const handleReset = () => {
    setMonthlyIncome('');
    setYearlyIncome('');
    setResult(null);
  };

  return (
    <TaxCalculatorShell
      title="Pakistan Salary Tax Calculator"
      subtitle="Latest & Accurate calculations for Federal Budget 2025-26"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Salary Period</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="period"
                    checked={taxPeriod === 'monthly'}
                    onChange={() => setTaxPeriod('monthly')}
                    className="accent-[var(--color-gold)]"
                  />
                  Monthly
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="period"
                    checked={taxPeriod === 'yearly'}
                    onChange={() => setTaxPeriod('yearly')}
                    className="accent-[var(--color-gold)]"
                  />
                  Yearly
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Tax Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option>2025-2026</option>
              </select>
            </div>

            {taxPeriod === 'monthly' ? (
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">Monthly Income (PKR)</label>
                <input
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="Enter monthly income"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">Yearly Income (PKR)</label>
                <input
                  value={yearlyIncome}
                  onChange={(e) => setYearlyIncome(e.target.value)}
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="Enter yearly income"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                />
              </div>
            )}

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={handleReset}>Reset</ResetButton>
            <div className="text-xs text-gray-500 mt-4 leading-relaxed">
              Calculates income tax based on slabs and adds super tax where applicable.
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {result ? (
            <>
              <ResultBlock title="Monthly View">
                <div className="overflow-x-auto">
                  <table className="paktax-table">
                    <tbody>
                      <tr>
                        <th className="text-left">Monthly Income</th>
                        <td className="font-bold">{formatPKR(result.incomeAnnual / 12)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Monthly Tax (Income + Super)</th>
                        <td className="font-bold">{formatPKR(result.totalTax / 12)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Salary After Tax</th>
                        <td className="font-bold">{formatPKR(result.netAnnual / 12)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ResultBlock>

              <ResultBlock title="Yearly View">
                <div className="overflow-x-auto">
                  <table className="paktax-table">
                    <tbody>
                      <tr>
                        <th className="text-left">Yearly Income</th>
                        <td className="font-bold">{formatPKR(result.incomeAnnual)}</td>
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
                        <th className="text-left">Net Salary After Tax</th>
                        <td className="font-bold">{formatPKR(result.netAnnual)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ResultBlock>

              <ResultBlock title="Effective Rate">
                <div className="text-2xl font-extrabold text-[var(--color-gold)]">
                  {result.incomeAnnual > 0 ? ((result.totalTax / result.incomeAnnual) * 100).toFixed(2) : '0.00'}%
                </div>
                <div className="text-sm text-gray-600 mt-2">Total tax payable divided by total annual income.</div>
              </ResultBlock>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter your income and click <b>Calculate Tax</b> to view results.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

