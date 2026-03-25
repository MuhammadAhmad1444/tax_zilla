import React, { useState } from 'react';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney, computeSuperTax2025 } from './taxUtils2025.js';

export function CompanyIncomeTaxCalculator2025() {
  const [companyType, setCompanyType] = useState('all'); // all|bank|small
  const [annualIncome, setAnnualIncome] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const income = clampNonNegative(parseMoney(annualIncome));
    if (income <= 0) {
      setResult(null);
      return;
    }
    const baseRate = companyType === 'bank' ? 0.39 : companyType === 'small' ? 0.20 : 0.29;
    const baseTax = income * baseRate;
    const superTax = computeSuperTax2025(income).totalSuperTax;
    const totalTax = baseTax + superTax;
    setResult({
      income,
      baseRate,
      baseTax,
      superTax,
      totalTax,
      net: income - totalTax,
    });
  };

  const handleReset = () => {
    setAnnualIncome('');
    setResult(null);
  };

  return (
    <TaxCalculatorShell title="Tax on Annual Income of Companies" subtitle="All Other / Banking / Small Company (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Company Category</label>
              <select
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="all">All Other Companies</option>
                <option value="bank">Banking Company</option>
                <option value="small">Small Company</option>
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
              <ResultBlock title="Company Tax Results">
                <div className="overflow-x-auto">
                  <table className="paktax-table">
                    <tbody>
                      <tr>
                        <th className="text-left">Annual Income</th>
                        <td className="font-bold">{formatPKR(result.income)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Base Tax Rate</th>
                        <td className="font-bold">{(result.baseRate * 100).toFixed(0)}%</td>
                      </tr>
                      <tr>
                        <th className="text-left">Income Tax</th>
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
                        <th className="text-left">Net After Tax</th>
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
              Enter annual income and click <b>Calculate Tax</b> to view results.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

