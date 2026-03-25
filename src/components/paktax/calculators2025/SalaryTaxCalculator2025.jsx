import React, { useMemo, useState } from 'react';
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
      subtitle="Latest & Accurate calculations for Federal Budget 2025-2026"
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
                <option>2024-2025</option>
                <option>2023-2024</option>
                <option>2022-2023</option>
                <option>2021-2022</option>
                <option>2020-2021</option>
                <option>2019-2020</option>
                <option>2018-2019</option>
                <option>2017-2018</option>
                <option>2016-2017</option>
                <option>2015-2016</option>
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

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Welcome to the Pakistan Income Tax Calculator</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Gain valuable insights into your potential income tax liability with our user-friendly salary calculator. Whether you are
            planning your finances or simply curious about your tax obligations, this tool provides quick estimates based on your monthly
            or yearly salary and selected tax year.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Why Use the Salary Tax Calculator?</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-bold text-gray-900">Simplicity and Convenience</div>
              <div className="mt-1">Fast inputs with instant results reduce complexity.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Accuracy and Up-to-Date Information</div>
              <div className="mt-1">Aligned with FBR slabs for current tax years.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Personalized Calculations</div>
              <div className="mt-1">Use monthly or yearly inputs for tailored estimates.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Helpful for Financial Planning</div>
              <div className="mt-1">Plan budgets with a clear picture of tax commitments.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Assists in Compliance</div>
              <div className="mt-1">Accurate calculations help avoid underpayment issues.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Resourceful for Multiple Scenarios</div>
              <div className="mt-1">Evaluate job offers or salary changes quickly.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Free and Accessible</div>
              <div className="mt-1">Use from any device without extra tools.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Features of Pakistan Salary Tax Calculator</div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><span className="font-bold text-gray-900">Comprehensive Tax Slabs:</span> Accurate rates for 2025-2026 slabs.</li>
            <li><span className="font-bold text-gray-900">Monthly and Yearly Breakdown:</span> Understand monthly and annual tax.</li>
            <li><span className="font-bold text-gray-900">Easy to Use:</span> Built for individuals, employers, and payroll teams.</li>
            <li><span className="font-bold text-gray-900">Advanced Features:</span> Switch periods for tailored estimates.</li>
            <li><span className="font-bold text-gray-900">Stay Informed:</span> Helpful information for tax filing timelines.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How To Fill Out This Salary Income Tax Calculator</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Enter your monthly salary and select the tax year.</li>
            <li>Switch to yearly salary if needed and enter yearly income.</li>
            <li>Click Calculate Tax to view monthly and yearly results.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Income Tax Slabs in Pakistan (2025-2026)</div>
          <table className="paktax-table">
            <tbody>
              <tr>
                <th className="text-left">Up to Rs. 600,000</th>
                <td className="font-bold">0%</td>
              </tr>
              <tr>
                <th className="text-left">Rs. 600,001 - 1,200,000</th>
                <td className="font-bold">1% of amount exceeding Rs. 600,000</td>
              </tr>
              <tr>
                <th className="text-left">Rs. 1,200,001 - 2,200,000</th>
                <td className="font-bold">Rs. 6,000 + 11% of amount exceeding Rs. 1,200,000</td>
              </tr>
              <tr>
                <th className="text-left">Rs. 2,200,001 - 3,200,000</th>
                <td className="font-bold">Rs. 116,000 + 23% of amount exceeding Rs. 2,200,000</td>
              </tr>
              <tr>
                <th className="text-left">Rs. 3,200,001 - 4,100,000</th>
                <td className="font-bold">Rs. 346,000 + 30% of amount exceeding Rs. 3,200,000</td>
              </tr>
              <tr>
                <th className="text-left">Above Rs. 4,100,000</th>
                <td className="font-bold">Rs. 616,000 + 35% of amount exceeding Rs. 4,100,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How Our Income Tax Calculator Ensures Security</div>
          <div className="text-sm text-gray-700 space-y-2">
            <div>No sensitive personal information is required for calculations.</div>
            <div>All inputs are used only for on-page estimation and are not stored.</div>
            <div>Your privacy is protected and data is not shared with third parties.</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Support and Contact Information</div>
          <div className="text-sm text-gray-700">
            For inquiries, assistance, or personalized support, contact our team. We are ready to help you navigate any questions you may have.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-[var(--color-dark-blue)] text-white p-6">
          <div className="text-xl font-extrabold mb-2">Need Help With Salary Tax Planning?</div>
          <div className="text-sm text-gray-200">Share your salary details and our team can validate the slabs and provide a professional estimate report.</div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

