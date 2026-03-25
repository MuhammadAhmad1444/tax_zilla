import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <TaxCalculatorShell title="Tax on Annual Income of Companies" subtitle="All Other / Banking / Small Company (2024-2025)">
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

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Welcome to the Pakistan Annual Income of Companies Tax Calculator</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Our Pakistan Annual Income of Companies Tax Calculator helps you assess corporate tax liabilities with clarity and confidence.
            Designed for businesses of every size, it streamlines the process of estimating annual income tax so you can plan budgets,
            maintain compliance, and make informed financial decisions under the 2024-2025 budget framework.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Why Use the Annual Income of Companies Tax Calculator?</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-bold text-gray-900">Tax Compliance</div>
              <div className="mt-1">Accurate tax estimates help avoid filing errors and penalties.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Investor Confidence</div>
              <div className="mt-1">Clear tax projections support financial transparency.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Budgeting</div>
              <div className="mt-1">Plan cash flow by setting aside tax obligations early.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Financial Planning</div>
              <div className="mt-1">Estimate liabilities to allocate resources confidently.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Government Revenue Alignment</div>
              <div className="mt-1">Consistent reporting aligns with federal revenue planning.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Legal Compliance</div>
              <div className="mt-1">Stay aligned with corporate tax regulations in Pakistan.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Tax Credits & Deductions</div>
              <div className="mt-1">Identify potential optimization opportunities in advance.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Features of the Pakistan Annual Income of Companies Tax Calculator</div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><span className="font-bold text-gray-900">User-Friendly Interface:</span> Simple inputs and instant results.</li>
            <li><span className="font-bold text-gray-900">Real-Time Updates:</span> Adjust inputs to see changes immediately.</li>
            <li><span className="font-bold text-gray-900">Multi-Category Support:</span> All Other, Banking, and Small Company options.</li>
            <li><span className="font-bold text-gray-900">Dynamic Inputs:</span> Inputs adapt to company category selections.</li>
            <li><span className="font-bold text-gray-900">Comprehensive Calculation:</span> Includes base tax and applicable super tax.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How To Fill Out This Annual Income of Companies Tax Calculator</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Choose the company category (All Other Companies, Banking Company, Small Company).</li>
            <li>Enter the annual income in PKR.</li>
            <li>Click Calculate Tax to view the results instantly.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Annual Income of Companies Tax Slabs in Pakistan (2024-2025)</div>
          <div className="text-sm text-gray-700 mb-4">Rates below apply to annual income for each company category.</div>
          <table className="paktax-table">
            <tbody>
              <tr>
                <th className="text-left">All Other Companies</th>
                <td className="font-bold">29% of annual income</td>
              </tr>
              <tr>
                <th className="text-left">Banking Company</th>
                <td className="font-bold">39% of annual income</td>
              </tr>
              <tr>
                <th className="text-left">Small Company</th>
                <td className="font-bold">20% of annual income</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Secure and Updated Annual Income of Companies Tax Estimator</div>
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
              <div className="text-xs uppercase tracking-wide text-gray-500">All Other Companies</div>
              <div className="text-lg font-extrabold text-gray-900 mt-1">29% Base Rate</div>
              <div className="text-xs text-gray-500 mt-1">Plus applicable super tax</div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-500">Banking Company</div>
              <div className="text-lg font-extrabold text-gray-900 mt-1">39% Base Rate</div>
              <div className="text-xs text-gray-500 mt-1">Plus applicable super tax</div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-500">Small Company</div>
              <div className="text-lg font-extrabold text-gray-900 mt-1">20% Base Rate</div>
              <div className="text-xs text-gray-500 mt-1">Plus applicable super tax</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Compliance & Reporting Notes</div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><span className="font-bold text-gray-900">Category Selection:</span> Choose the correct company type to apply the right base rate.</li>
            <li><span className="font-bold text-gray-900">Super Tax:</span> Applies based on income thresholds and is included in calculations.</li>
            <li><span className="font-bold text-gray-900">Documentation:</span> Maintain audited statements and income schedules for filing.</li>
            <li><span className="font-bold text-gray-900">Professional Review:</span> Consult a tax adviser for complex structures or group filings.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Related Services</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="font-bold text-gray-900">Corporate Tax Filing</div>
              <div className="text-xs text-gray-500 mt-1">End-to-end annual filings</div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="font-bold text-gray-900">Compliance Advisory</div>
              <div className="text-xs text-gray-500 mt-1">Regulatory guidance and planning</div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="font-bold text-gray-900">Audit Support</div>
              <div className="text-xs text-gray-500 mt-1">Assistance with documentation</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-[var(--color-dark-blue)] text-white p-6">
          <div className="text-xl font-extrabold mb-2">Need Help With Corporate Tax Planning?</div>
          <div className="text-sm text-gray-200">Share your company details and our team can validate inputs and provide a professional tax estimate report.</div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

