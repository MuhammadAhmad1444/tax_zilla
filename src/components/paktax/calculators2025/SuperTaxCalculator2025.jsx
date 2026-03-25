import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

export function SuperTaxCalculator2025() {
  const [taxCategory, setTaxCategory] = useState('all'); // 'all' | 'bank'
  const [annualIncome, setAnnualIncome] = useState('');
  const [result, setResult] = useState(null);

  const computeSuperTax = (income, category) => {
    if (income <= 0) return { total: 0, effective: 0 };

    const piece = (lower, upper, rate) => {
      const portion = Math.max(0, Math.min(income, upper) - lower);
      return portion * rate;
    };

    let tax = 0;
    if (category === 'bank') {
      tax =
        piece(150e6, 200e6, 0.01) +
        piece(200e6, 250e6, 0.02) +
        piece(250e6, 300e6, 0.03) +
        Math.max(0, income - 300e6) * 0.10;
    } else {
      tax =
        piece(150e6, 200e6, 0.01) +
        piece(200e6, 250e6, 0.02) +
        piece(250e6, 300e6, 0.03) +
        piece(300e6, 350e6, 0.04) +
        piece(350e6, 400e6, 0.06) +
        piece(400e6, 500e6, 0.08) +
        Math.max(0, income - 500e6) * 0.10;
    }

    return { total: tax, effective: tax / income };
  };

  const handleCalculate = () => {
    const income = clampNonNegative(parseMoney(annualIncome));
    if (income <= 0) {
      setResult(null);
      return;
    }
    const superTax = computeSuperTax(income, taxCategory);
    setResult({
      income,
      superTax: superTax.total,
      effective: superTax.effective,
    });
  };

  const handleReset = () => {
    setAnnualIncome('');
    setResult(null);
  };

  return (
    <TaxCalculatorShell title="Super Tax on Annual Income" subtitle="High-income persons (2024-2025)">
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
                        <th className="text-left">Category</th>
                        <td className="font-bold">{taxCategory === 'bank' ? 'Banking Company' : 'All Other Persons'}</td>
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
                  Rates are applied progressively using 2024-2025 brackets. Please validate with FBR/Finance Act text for final compliance.
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

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Advanced Super Tax on Annual Income Calculator</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Welcome to the Super Tax Calculator for high-earning individuals and banking companies in Pakistan for the tax year 2024-2025.
            Use this tool to estimate super tax quickly with a clean interface and category-specific slabs aligned with the latest budget.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Why Use the Super Tax Calculator?</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-bold text-gray-900">Simplicity and Convenience</div>
              <div className="mt-1">Quick inputs and instant calculations simplify estimation.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Accuracy and Real-Time Updates</div>
              <div className="mt-1">Updated slab logic aligns with the current tax year.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Personalized Calculations</div>
              <div className="mt-1">Select the correct category for tailored results.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Strategic Financial Planning</div>
              <div className="mt-1">Use estimates to plan budgets and cash flows.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Compliance Assistance</div>
              <div className="mt-1">Accurate calculations reduce compliance risk.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Free and Accessible</div>
              <div className="mt-1">Use it anytime without specialized software.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Features of Our Super Tax Calculator</div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><span className="font-bold text-gray-900">Detailed Super Tax Slabs:</span> Progressive rates for 2024-2025.</li>
            <li><span className="font-bold text-gray-900">Category Selection:</span> All Other Persons or Banking Company.</li>
            <li><span className="font-bold text-gray-900">User-Friendly Interface:</span> Simple inputs and clear results.</li>
            <li><span className="font-bold text-gray-900">Real-Time Results:</span> Instant calculation as you submit values.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How To Fill Out This Super Tax Calculator</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Enter the annual income in PKR.</li>
            <li>Select the category (All Other Persons or Banking Company).</li>
            <li>Click Calculate Tax to view the super tax results.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Super Tax Slabs in Pakistan (2024-2025)</div>
          <div className="text-sm text-gray-700 mb-4">Rates are applied progressively across brackets.</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="font-bold text-gray-900 mb-2">All Other Persons</div>
              <table className="paktax-table">
                <tbody>
                  <tr><th className="text-left">Up to Rs. 150,000,000</th><td className="font-bold">0%</td></tr>
                  <tr><th className="text-left">Rs. 150,000,001 - 200,000,000</th><td className="font-bold">1%</td></tr>
                  <tr><th className="text-left">Rs. 200,000,001 - 250,000,000</th><td className="font-bold">2%</td></tr>
                  <tr><th className="text-left">Rs. 250,000,001 - 300,000,000</th><td className="font-bold">3%</td></tr>
                  <tr><th className="text-left">Rs. 300,000,001 - 350,000,000</th><td className="font-bold">4%</td></tr>
                  <tr><th className="text-left">Rs. 350,000,001 - 400,000,000</th><td className="font-bold">6%</td></tr>
                  <tr><th className="text-left">Rs. 400,000,001 - 500,000,000</th><td className="font-bold">8%</td></tr>
                  <tr><th className="text-left">Above Rs. 500,000,000</th><td className="font-bold">10%</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-2">Banking Company</div>
              <table className="paktax-table">
                <tbody>
                  <tr><th className="text-left">Up to Rs. 150,000,000</th><td className="font-bold">0%</td></tr>
                  <tr><th className="text-left">Rs. 150,000,001 - 200,000,000</th><td className="font-bold">1%</td></tr>
                  <tr><th className="text-left">Rs. 200,000,001 - 250,000,000</th><td className="font-bold">2%</td></tr>
                  <tr><th className="text-left">Rs. 250,000,001 - 300,000,000</th><td className="font-bold">3%</td></tr>
                  <tr><th className="text-left">Above Rs. 300,000,000</th><td className="font-bold">10%</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How Our Super Tax Calculator Ensures Security</div>
          <div className="text-sm text-gray-700 space-y-2">
            <div>No sensitive personal information is required for calculations.</div>
            <div>All inputs are used only for on-page estimation and are not stored.</div>
            <div>Your privacy is protected and data is not shared with third parties.</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Support and Contact Information</div>
          <div className="text-sm text-gray-700">
            For inquiries or personalized support, contact our team. We are ready to assist you with compliance guidance and calculations.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Quick Facts (2024-2025)</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-500">Entry Threshold</div>
              <div className="text-lg font-extrabold text-gray-900 mt-1">Rs. 150,000,000</div>
              <div className="text-xs text-gray-500 mt-1">0% super tax below this level</div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-500">Highest Slab</div>
              <div className="text-lg font-extrabold text-gray-900 mt-1">10%</div>
              <div className="text-xs text-gray-500 mt-1">Applies above Rs. 500M (All Other)</div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-500">Banking Cap</div>
              <div className="text-lg font-extrabold text-gray-900 mt-1">10%</div>
              <div className="text-xs text-gray-500 mt-1">Applies above Rs. 300M (Banking)</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Compliance & Reporting Notes</div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><span className="font-bold text-gray-900">Category Accuracy:</span> Choose the correct category before calculating.</li>
            <li><span className="font-bold text-gray-900">Progressive Slabs:</span> Rates apply only to the portion in each bracket.</li>
            <li><span className="font-bold text-gray-900">Documentation:</span> Maintain audited accounts for tax filings.</li>
            <li><span className="font-bold text-gray-900">Professional Review:</span> Consult a tax adviser for complex cases.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Related Services</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="font-bold text-gray-900">Tax Filing Services</div>
              <div className="text-xs text-gray-500 mt-1">Annual filings and compliance</div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="font-bold text-gray-900">Corporate Advisory</div>
              <div className="text-xs text-gray-500 mt-1">Strategic tax planning</div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="font-bold text-gray-900">Audit Support</div>
              <div className="text-xs text-gray-500 mt-1">Documentation and responses</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-[var(--color-dark-blue)] text-white p-6">
          <div className="text-xl font-extrabold mb-2">Need Help With Super Tax Planning?</div>
          <div className="text-sm text-gray-200">Share your income details and our team can validate the slabs and provide a professional estimate report.</div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

