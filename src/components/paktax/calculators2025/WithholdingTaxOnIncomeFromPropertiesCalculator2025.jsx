import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

const PERIOD_OPTIONS = [
  { value: 'monthly', label: 'Monthly', multiplier: 12 },
  { value: 'quarterly', label: 'Quarterly', multiplier: 4 },
  { value: 'biannually', label: 'Biannually', multiplier: 2 },
  { value: 'annually', label: 'Annually', multiplier: 1 },
];

export function WithholdingTaxOnIncomeFromPropertiesCalculator2025() {
  const [taxpayerType, setTaxpayerType] = useState('individual'); // individual|company
  const [atlStatus, setAtlStatus] = useState('active'); // active|non
  const [taxYear, setTaxYear] = useState('2025-2026');
  const [rentPeriod, setRentPeriod] = useState('monthly');
  const [rentAmount, setRentAmount] = useState('');
  const [advanceGiven, setAdvanceGiven] = useState('no');
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [advanceTreatment, setAdvanceTreatment] = useState('adjustable');
  const [result, setResult] = useState(null);

  const annualizedRent = useMemo(() => {
    const base = clampNonNegative(parseMoney(rentAmount));
    const period = PERIOD_OPTIONS.find((option) => option.value === rentPeriod);
    return base * (period ? period.multiplier : 1);
  }, [rentAmount, rentPeriod]);

  const handleCalculate = () => {
    const rent = clampNonNegative(annualizedRent);
    if (rent <= 0) {
      setResult(null);
      return;
    }

    const advance = clampNonNegative(parseMoney(advanceAmount));
    const taxableAdvance =
      advanceGiven === 'yes' && advanceTreatment === 'adjustable' ? advance : 0;
    const taxableRent = rent + taxableAdvance;

    let tax = 0;
    if (taxpayerType === 'company') {
      const rate = atlStatus === 'active' ? 0.15 : 0.30;
      tax = taxableRent * rate;
    } else {
      // Individuals and AOPs (annual gross rent)
      if (taxableRent <= 300000) tax = 0;
      else if (taxableRent <= 600000) {
        const excess = taxableRent - 300000;
        tax = excess * (atlStatus === 'active' ? 0.05 : 0.10);
      } else if (taxableRent <= 2000000) {
        const excess = taxableRent - 600000;
        tax =
          (atlStatus === 'active' ? 15000 : 30000) + excess * (atlStatus === 'active' ? 0.10 : 0.20);
      } else {
        const excess = taxableRent - 2000000;
        tax =
          (atlStatus === 'active' ? 155000 : 310000) + excess * (atlStatus === 'active' ? 0.25 : 0.50);
      }
    }

    setResult({ rent, taxableRent, tax, advance: taxableAdvance });
  };

  return (
    <TaxCalculatorShell title="Withholding Tax on Income from Properties" subtitle="Section 155 WHT on rental income (2025-2026)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Taxpayer Type</label>
              <select
                value={taxpayerType}
                onChange={(e) => setTaxpayerType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="individual">Individual / AOP</option>
                <option value="company">Company</option>
              </select>
            </div>

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
              <label className="block text-sm font-bold text-gray-800 mb-2">Rent Period</label>
              <select
                value={rentPeriod}
                onChange={(e) => setRentPeriod(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                {PERIOD_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>


            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Rental Income (PKR)</label>
              <input
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter rent amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Advance Given</label>
              <select
                value={advanceGiven}
                onChange={(e) => setAdvanceGiven(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="yes">Advance Given - Yes</option>
                <option value="no">Advance Given - No</option>
              </select>
            </div>

            {advanceGiven === 'yes' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-800 mb-2">Advance Amount (PKR)</label>
                  <input
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(e.target.value)}
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="Enter advance amount"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-800 mb-2">Advance Treatment</label>
                  <select
                    value={advanceTreatment}
                    onChange={(e) => setAdvanceTreatment(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                  >
                    <option value="adjustable">Adjustable against Rent</option>
                    <option value="refundable">Refundable to Tenant</option>
                  </select>
                </div>
              </>
            )}

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton
              onClick={() => {
                setRentAmount('');
                setAdvanceAmount('');
                setAdvanceGiven('no');
                setAdvanceTreatment('adjustable');
                setResult(null);
              }}
            >
              Reset
            </ResetButton>
          </div>
        </div>
        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="WHT Result">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Annualized Rent</th>
                      <td className="font-bold">{formatPKR(result.rent)}</td>
                    </tr>
                    {result.advance > 0 && (
                      <tr>
                        <th className="text-left">Advance Included</th>
                        <td className="font-bold">{formatPKR(result.advance)}</td>
                      </tr>
                    )}
                    <tr>
                      <th className="text-left">Taxable Rent</th>
                      <td className="font-bold">{formatPKR(result.taxableRent)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Withholding Tax Payable</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.tax)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ResultBlock>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter rental income and click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Welcome to the Withholding Tax Calculator on Property Income</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            This calculator estimates withholding tax on rental income under Section 155 of the Income Tax Ordinance, 2001. Enter
            your rent amount, period, and advance details to get accurate, budget-aligned results for 2025-2026.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Understanding Withholding Tax on Income from Properties</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Withholding tax on rent is an advance tax withheld by the tenant on payments of rent. It applies to income from
            immovable property such as buildings, land, and commercial units.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Key Features of Our Withholding Tax Calculator</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-bold text-gray-900">Real-Time Calculation</div>
              <div className="mt-1">Instant results with rent period and advance handling.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">FBR Rate Adherence</div>
              <div className="mt-1">Aligned with 2025-2026 Section 155 rates.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Mobile Responsive</div>
              <div className="mt-1">Optimized for desktop and mobile use.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Threshold-Aware Logic</div>
              <div className="mt-1">Calculates tax only when thresholds apply.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">No Registration</div>
              <div className="mt-1">No CNIC or NTN required to use the tool.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How to Use Withholding Tax on Income from Properties</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Select the business profile (Individual/AOP or Company).</li>
            <li>Enter rental income and choose the period (monthly, quarterly, biannually, annually).</li>
            <li>Provide advance amount and select whether it is adjustable or refundable.</li>
            <li>Click Calculate Tax to view results.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Withholding Tax on Income from Properties Slab (2025-2026)</div>
          <table className="paktax-table">
            <thead>
              <tr>
                <th className="text-left">Annual Rent (PKR)</th>
                <th className="text-left">Filer’s Tax Rate</th>
                <th className="text-left">Non-Filer’s Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Up to 300,000</td><td>Exempt</td><td>Exempt</td></tr>
              <tr><td>300,001 – 600,000</td><td>5% on above 300,000</td><td>10% on above 300,000</td></tr>
              <tr><td>600,001 – 2,000,000</td><td>15,000 + 10%</td><td>30,000 + 20%</td></tr>
              <tr><td>Above 2,000,000</td><td>155,000 + 25%</td><td>310,000 + 50%</td></tr>
            </tbody>
          </table>
          <div className="text-sm text-gray-700 mt-4">
            Companies on ATL are taxed at 15%. Non-ATL companies are taxed at 30% of rental income.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How Pak Tax Calculator Provides Data Safety and Integrity</div>
          <div className="text-sm text-gray-700 space-y-2">
            <div>No collection of personal data such as CNIC, NTN, or contact info.</div>
            <div>Secure data transmission using HTTPS/SSL.</div>
            <div>Focus on calculation without registration or storage.</div>
            <div>Regular security updates to protect user confidence.</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">FAQs</div>
          <div className="text-sm text-gray-700 space-y-4">
            <div>
              <div className="font-bold text-gray-900">Do NRPs pay withholding tax?</div>
              <div className="mt-1">NRPs are liable to WHT, unless exempt under a Double Taxation Treaty.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">How can I check that WHT has been paid?</div>
              <div className="mt-1">Verify through the FBR Iris portal or request a WHT certificate.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">What type of properties are subject to WHT?</div>
              <div className="mt-1">Residential, commercial, and certain agricultural properties are subject to WHT on rent.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Is WHT required when rent is paid in advance or arrears?</div>
              <div className="mt-1">Yes. WHT applies on payment or credit, whichever occurs earlier.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Support and Contact Information</div>
          <div className="text-sm text-gray-700">
            For any inquiries, assistance, or personalized support, contact our team. We are ready to help you navigate through any challenges.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-[var(--color-dark-blue)] text-white p-6">
          <div className="text-xl font-extrabold mb-2">Need Help With Property WHT Planning?</div>
          <div className="text-sm text-gray-200">Share your rent details and our team can validate the slabs and provide a professional estimate report.</div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

