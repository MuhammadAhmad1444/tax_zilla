import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

export function AgriculturalLandPunjabTaxCalculator2025() {
  const [annualAgrIncome, setAnnualAgrIncome] = useState('');
  const [taxYear, setTaxYear] = useState('2025-2026');
  const [taxpayerCategory, setTaxpayerCategory] = useState('farmers');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const income = clampNonNegative(parseMoney(annualAgrIncome));
    if (income <= 0) {
      setResult(null);
      return;
    }

    // Punjab agricultural income slabs (2024-2025):
    // Up to 400,000: 0
    // 400,001 - 800,000: 1,000 + 0% on excess over 400,000
    // 800,001 - 1,200,000: 2,000 + 0% on excess over 800,000
    // 1,200,001 - 2,400,000: 5% on excess over 1,200,000
    // 2,400,001 - 4,800,000: 60,000 + 10% on excess over 2,400,000
    // above 4,800,000: 300,000 + 15% on excess over 4,800,000
    let tax = 0;
    if (income <= 400000) tax = 0;
    else if (income <= 800000) tax = 1000;
    else if (income <= 1200000) tax = 2000;
    else if (income <= 2400000) tax = (income - 1200000) * 0.05;
    else if (income <= 4800000) tax = 60000 + (income - 2400000) * 0.10;
    else tax = 300000 + (income - 4800000) * 0.15;

    setResult({ income, tax, effective: income > 0 ? tax / income : 0 });
  };

  return (
    <TaxCalculatorShell title="Tax On Agricultural Income – Punjab" subtitle="Punjab agricultural income tax (2025-2026)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Tax Year</label>
              <select
                value={taxYear}
                onChange={(e) => setTaxYear(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option>2025-2026</option>
                <option>2024-2025</option>
                <option>2023-2024</option>
                <option>2022-2023</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Taxpayer Category</label>
              <select
                value={taxpayerCategory}
                onChange={(e) => setTaxpayerCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="farmers">Farmers</option>
                <option value="small-company">Small Company</option>
                <option value="any-other-company">Any Other Company</option>
              </select>
            </div>

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
                      <th className="text-left">Taxpayer Category</th>
                      <td className="font-bold">
                        {taxpayerCategory === 'farmers'
                          ? 'Farmers'
                          : taxpayerCategory === 'small-company'
                            ? 'Small Company'
                            : 'Any Other Company'}
                      </td>
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

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Welcome to the Punjab Agricultural Income Tax Calculator</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            This calculator helps farmers and landowners in Punjab estimate agricultural income tax with up-to-date slabs,
            ensuring accuracy, compliance, and privacy without requiring personal details.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Why Use the Punjab Agricultural Income Tax Calculator?</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-bold text-gray-900">Precise Tax Computation</div>
              <div className="mt-1">Accurate calculations aligned with Punjab’s current rates.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Efficiency and Time-Saving</div>
              <div className="mt-1">Instant results without manual errors.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Ensuring Compliance</div>
              <div className="mt-1">Stay aligned with Punjab agricultural income tax rules.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Aid in Financial Planning</div>
              <div className="mt-1">Estimate liabilities to plan cash flow and budgets.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Adaptability to Changes</div>
              <div className="mt-1">Designed to keep pace with updated tax rules.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Free and Available</div>
              <div className="mt-1">Accessible on any device without registration.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Features of Our Punjab Agricultural Income Tax Calculator</div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><span className="font-bold text-gray-900">Current Tax Updates:</span> Uses the latest Punjab slabs.</li>
            <li><span className="font-bold text-gray-900">Fiscal Year Selection:</span> Choose the year for calculations.</li>
            <li><span className="font-bold text-gray-900">Comprehensive Coverage:</span> Works across income ranges.</li>
            <li><span className="font-bold text-gray-900">Responsive Design:</span> Works on mobile and desktop.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How To Fill Out This Punjab Agricultural Income Tax Estimator</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Input your annual agricultural income.</li>
            <li>Choose the fiscal tax year.</li>
            <li>Click Calculate Tax to view results.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Income Tax Slabs in Punjab (2025-2026)</div>
          <table className="paktax-table">
            <tbody>
              <tr><th className="text-left">Up to 400,000</th><td className="font-bold">0%</td></tr>
              <tr><th className="text-left">400,001 – 800,000</th><td className="font-bold">Rs. 1,000 + 0%</td></tr>
              <tr><th className="text-left">800,001 – 1,200,000</th><td className="font-bold">Rs. 2,000 + 0%</td></tr>
              <tr><th className="text-left">1,200,001 – 2,400,000</th><td className="font-bold">5% of amount exceeding 1,200,000</td></tr>
              <tr><th className="text-left">2,400,001 – 4,800,000</th><td className="font-bold">Rs. 60,000 + 10%</td></tr>
              <tr><th className="text-left">Above 4,800,000</th><td className="font-bold">Rs. 300,000 + 15%</td></tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How Our Agricultural Income Tax Tool Ensures Security</div>
          <div className="text-sm text-gray-700 space-y-2">
            <div>No sensitive personal information is required.</div>
            <div>Inputs are used only for on-page estimation and not stored.</div>
            <div>Your privacy is protected and data is not shared with third parties.</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Support and Contact Information</div>
          <div className="text-sm text-gray-700">
            For any inquiries, assistance, or personalized support, contact our team. We are ready to help you navigate through any challenges.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-[var(--color-dark-blue)] text-white p-6">
          <div className="text-xl font-extrabold mb-2">Need Help With Agricultural Income Tax?</div>
          <div className="text-sm text-gray-200">Share your income details and our team can validate the slabs and provide a professional estimate report.</div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

