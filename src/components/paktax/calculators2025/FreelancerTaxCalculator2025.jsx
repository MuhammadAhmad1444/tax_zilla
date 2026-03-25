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
  computeSuperTax2025,
} from './taxUtils2025.js';

export function FreelancerTaxCalculator2025() {
  const [taxYear, setTaxYear] = useState('2025-2026');
  const [psebRegistered, setPsebRegistered] = useState('yes');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [yearlyIncome, setYearlyIncome] = useState('');
  const [period, setPeriod] = useState('monthly');
  const [result, setResult] = useState(null);

  const incomeAnnual = useMemo(() => {
    return period === 'monthly' ? parseMoney(monthlyIncome) * 12 : parseMoney(yearlyIncome);
  }, [period, monthlyIncome, yearlyIncome]);

  const handleCalculate = () => {
    const income = clampNonNegative(incomeAnnual);
    if (income <= 0) {
      setResult(null);
      return;
    }
    const baseTax = psebRegistered === 'yes' ? income * 0.0025 : income * 0.01;
    const superTax = computeSuperTax2025(income).totalSuperTax;
    const totalTax = baseTax + superTax;
    setResult({
      income,
      baseTax,
      superTax,
      totalTax,
      net: income - totalTax,
    });
  };

  const handleReset = () => {
    setMonthlyIncome('');
    setYearlyIncome('');
    setResult(null);
  };

  return (
    <TaxCalculatorShell title="Pakistan Freelancer Tax Calculator" subtitle="PSEB-registered vs Non-registered (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Calculation Period</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="period"
                    checked={period === 'monthly'}
                    onChange={() => setPeriod('monthly')}
                    className="accent-[var(--color-gold)]"
                  />
                  Monthly
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="period"
                    checked={period === 'yearly'}
                    onChange={() => setPeriod('yearly')}
                    className="accent-[var(--color-gold)]"
                  />
                  Yearly
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Tax Year</label>
              <select
                value={taxYear}
                onChange={(e) => setTaxYear(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option>2025-2026</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">PSEB Registered</label>
              <select
                value={psebRegistered}
                onChange={(e) => setPsebRegistered(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {period === 'monthly' ? (
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
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {result ? (
            <>
              <ResultBlock title="Freelancer Tax Results">
                <div className="overflow-x-auto">
                  <table className="paktax-table">
                    <tbody>
                      <tr>
                        <th className="text-left">Annual Income</th>
                        <td className="font-bold">{formatPKR(result.income)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Base Tax</th>
                        <td className="font-bold">{formatPKR(result.baseTax)}</td>
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
                        <th className="text-left">Income After Tax</th>
                        <td className="font-bold">{formatPKR(result.net)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ResultBlock>

              <ResultBlock title="Effective Rate">
                <div className="text-2xl font-extrabold text-[var(--color-gold)]">
                  {result.income > 0 ? ((result.totalTax / result.income) * 100).toFixed(2) : '0.00'}%
                </div>
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

