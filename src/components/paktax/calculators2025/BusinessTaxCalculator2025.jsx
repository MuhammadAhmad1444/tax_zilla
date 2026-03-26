import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [year, setYear] = useState('');
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
    setYear('');
    setResult(null);
  };

  return (
    <TaxCalculatorShell title="Pakistan Business Tax Calculator" subtitle="Business income estimates (2018-2019 to 2025-2026)">
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
                <option>2023-2024</option>
                <option>2022-2023</option>
                <option>2021-2022</option>
                <option>2020-2021</option>
                <option>2019-2020</option>
                <option>2018-2019</option>
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

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Welcome to Pakistan Business Tax Calculator</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Pakistan business tax calculator is your reliable tool for accurate business tax computations. Designed for Pakistani
            businesses of all sizes, it simplifies tax calculations while keeping your estimates aligned with current regulations.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Why Choose Our Business Tax Estimation Tool?</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-bold text-gray-900">User-Friendly Interface</div>
              <div className="mt-1">Simple inputs for quick and hassle-free calculations.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Precision and Real-Time Updates</div>
              <div className="mt-1">Aligned with the latest tax laws to reduce manual errors.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Tailored for Your Business</div>
              <div className="mt-1">Customize inputs for personalized tax estimates.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Strategic Financial Planning</div>
              <div className="mt-1">Plan budgets with a clear view of tax commitments.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Ensures Regulatory Compliance</div>
              <div className="mt-1">Pay the correct amount and avoid compliance risks.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Versatile for Business Scenarios</div>
              <div className="mt-1">Evaluate investments, growth plans, and tax impact.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Free and Accessible</div>
              <div className="mt-1">Use it from any device without extra software.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Discover the Features of the Business Tax Calculator</div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><span className="font-bold text-gray-900">Comprehensive Tax Slabs:</span> Accurate rates for diverse income ranges.</li>
            <li><span className="font-bold text-gray-900">Fiscal Year Selector:</span> Pick the correct year from the dropdown.</li>
            <li><span className="font-bold text-gray-900">Easy to Use:</span> Built for individuals, employers, and payroll teams.</li>
            <li><span className="font-bold text-gray-900">Advanced Customization:</span> Adjust inputs for tailored estimates.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How to Fill in the Blanks of Business Tax Calculator?</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Enter the total business amount in PKR.</li>
            <li>Select the relevant fiscal year from the dropdown.</li>
            <li>Click Calculate Tax to view Accounting Profit, Tax on Profit, and Profit After Tax.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Tax Slabs for Business Tax Calculation in Pakistan (2025-2026)</div>
          <table className="paktax-table">
            <thead>
              <tr>
                <th className="text-left">Taxable Business Amount (PKR)</th>
                <th className="text-left">Tax Rate</th>
                <th className="text-left">Tax Calculation</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Up to Rs. 600,000</td><td>0%</td><td>No tax</td></tr>
              <tr><td>Rs. 600,001 - Rs. 800,000</td><td>7.5%</td><td>7.5% of amount exceeding Rs. 600,000</td></tr>
              <tr><td>Rs. 800,001 - Rs. 1,200,000</td><td>15%</td><td>15% of amount exceeding Rs. 800,000</td></tr>
              <tr><td>Rs. 1,200,001 - Rs. 2,400,000</td><td>20%</td><td>20% of amount exceeding Rs. 1,200,000</td></tr>
              <tr><td>Rs. 2,400,001 - Rs. 3,000,000</td><td>25%</td><td>25% of amount exceeding Rs. 2,400,000</td></tr>
              <tr><td>Rs. 3,000,001 - Rs. 4,000,000</td><td>30%</td><td>30% of amount exceeding Rs. 3,000,000</td></tr>
              <tr><td>Above Rs. 4,000,000</td><td>35%</td><td>35% of amount exceeding Rs. 4,000,000</td></tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Ensure Security with Our Business Tax Calculator</div>
          <div className="text-sm text-gray-700 space-y-2">
            <div>No sensitive personal information is required for calculations.</div>
            <div>All inputs are used only for on-page estimation and are not stored.</div>
            <div>Your privacy is protected and data is not shared with third parties.</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">FAQs</div>
          <div className="text-sm text-gray-700 space-y-4">
            <div>
              <div className="font-bold text-gray-900">Can I deduct business losses from previous years?</div>
              <div className="mt-1">Yes. Unadjusted business losses can be carried forward up to 6 years under Section 57 of the Income Tax Ordinance.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Which tax year is supported?</div>
              <div className="mt-1">This calculator supports 2018-2019 through 2025-2026 for historical reference.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Who should use this calculator?</div>
              <div className="mt-1">Sole proprietors, AOPs, entrepreneurs, and corporations can use it for quick estimates.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Support and Contact Information</div>
          <div className="text-sm text-gray-700">
            For inquiries or personalized support, contact our team. We are ready to assist you with compliance guidance and calculations.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-[var(--color-dark-blue)] text-white p-6">
          <div className="text-xl font-extrabold mb-2">Need Help With Business Tax Planning?</div>
          <div className="text-sm text-gray-200">Share your business details and our team can validate the slabs and provide a professional estimate report.</div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

