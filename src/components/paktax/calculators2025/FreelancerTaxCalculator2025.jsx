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
  computeSuperTax2025,
} from './taxUtils2025.js';

export function FreelancerTaxCalculator2025() {
  const [taxYear, setTaxYear] = useState('');
  const [psebRegistered, setPsebRegistered] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [yearlyIncome, setYearlyIncome] = useState('');
  const [period, setPeriod] = useState('monthly');
  const [result, setResult] = useState(null);

  const incomeAnnual = useMemo(() => {
    return period === 'monthly' ? parseMoney(monthlyIncome) * 12 : parseMoney(yearlyIncome);
  }, [period, monthlyIncome, yearlyIncome]);

  const handleCalculate = () => {
    const income = clampNonNegative(incomeAnnual);
    if (income <= 0 || !taxYear || !psebRegistered) {
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
    setTaxYear('');
    setPsebRegistered('');
    setResult(null);
  };

  return (
    <TaxCalculatorShell title="Pakistan Freelancer Tax Calculator" subtitle="PSEB-registered vs Non-registered (2025-2026)">
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
                <option value="" disabled>Select tax year</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">PSEB Registered</label>
              <select
                value={psebRegistered}
                onChange={(e) => setPsebRegistered(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="" disabled>Select PSEB status</option>
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

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Welcome to the Freelancer Tax Calculator</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            The Freelancer Tax Calculator helps freelancers in Pakistan estimate monthly and yearly income after tax deductions
            based on the latest government budget (2025-2026). Input your income, select the tax year, and choose PSEB registration
            status to get fast, reliable results.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Who is a Freelancer in Pakistan?</div>
          <div className="text-sm text-gray-700 mb-3">
            A freelancer is an individual providing services independently without a salaried employment contract. Common services include:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
            <div>Software development</div>
            <div>Graphic design</div>
            <div>Digital marketing</div>
            <div>Writing and translation</div>
            <div>Virtual assistance</div>
            <div>Video editing</div>
          </div>
          <div className="text-sm text-gray-700 mt-3">
            Taxes depend on client location and whether income is received locally or internationally.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Why Use the Freelancer Tax Calculator?</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-bold text-gray-900">Streamlined Calculations</div>
              <div className="mt-1">Quick inputs deliver instant results.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Precision and Timely Updates</div>
              <div className="mt-1">Aligned with current FBR slabs and rates.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Tailored Estimations</div>
              <div className="mt-1">Adjust by period and PSEB status.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Strategic Financial Planning</div>
              <div className="mt-1">Estimate tax commitments before planning budgets.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Compliance Assurance</div>
              <div className="mt-1">Reduce legal risks with accurate estimates.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Accessible and Free</div>
              <div className="mt-1">Use it from any device with internet access.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Features of the Pakistan Freelancer Tax Calculator</div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><span className="font-bold text-gray-900">In-Depth Tax Slabs:</span> Detailed rates for 2025-2026.</li>
            <li><span className="font-bold text-gray-900">Monthly and Yearly Insights:</span> Toggle period for clear estimates.</li>
            <li><span className="font-bold text-gray-900">Advanced Customization:</span> Adjust inputs for personalized results.</li>
            <li><span className="font-bold text-gray-900">User-Friendly Interface:</span> Clean layout for quick decisions.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How To Fill Out This Freelancer Tax Calculator</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Enter your monthly income or switch to yearly income.</li>
            <li>Select the tax year from the dropdown.</li>
            <li>Choose your PSEB registration status.</li>
            <li>Click Calculate Tax to view results.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Freelance Income Tax Slabs (PSEB Registration) 2025-2026</div>
          <div className="text-sm text-gray-700 mb-4">Applicable for freelancers exporting services to foreign clients.</div>
          <table className="paktax-table">
            <tbody>
              <tr>
                <th className="text-left">PSEB Registered</th>
                <td className="font-bold">0.25% of taxable income</td>
              </tr>
              <tr>
                <th className="text-left">Not PSEB Registered</th>
                <td className="font-bold">1% of taxable income</td>
              </tr>
            </tbody>
          </table>
          <div className="text-xs text-gray-500 mt-3">
            These rates apply to export services. Local freelancers are taxed on net income under salary slabs.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Local Freelancer Salary Income Tax Slabs</div>
          <table className="paktax-table">
            <thead>
              <tr>
                <th className="text-left">Taxable Salary Income (PKR)</th>
                <th className="text-left">Fixed Tax (PKR)</th>
                <th className="text-left">Rate on Excess Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Up to 600,000</td><td>0</td><td>0%</td></tr>
              <tr><td>600,001 - 1,200,000</td><td>0</td><td>1% of amount exceeding 600,000</td></tr>
              <tr><td>1,200,001 - 2,200,000</td><td>6,000</td><td>11% of amount exceeding 1,200,000</td></tr>
              <tr><td>2,200,001 - 3,200,000</td><td>116,000</td><td>23% of amount exceeding 2,200,000</td></tr>
              <tr><td>3,200,001 - 4,100,000</td><td>346,000</td><td>30% of amount exceeding 3,200,000</td></tr>
              <tr><td>Above 4,100,000</td><td>616,000</td><td>35% of amount exceeding 4,100,000</td></tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Ensuring Security with Our Freelancer Tax Calculator</div>
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
              <div className="font-bold text-gray-900">Do freelancers in Pakistan need to register for an NTN?</div>
              <div className="mt-1">Yes. NTN registration is required to legitimize income and file taxes.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Can freelancers claim tax deductions on their expenses?</div>
              <div className="mt-1">Yes. Common deductions include equipment, internet bills, office supplies, travel, rent, and FBR-approved donations with proper documentation.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">What is the deadline for freelancer tax filing?</div>
              <div className="mt-1">Filing is generally due by September 30, 2025 (subject to FBR extensions).</div>
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
          <div className="text-xl font-extrabold mb-2">Need Help With Freelancer Tax Planning?</div>
          <div className="text-sm text-gray-200">Share your income details and our team can validate the slabs and provide a professional estimate report.</div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

