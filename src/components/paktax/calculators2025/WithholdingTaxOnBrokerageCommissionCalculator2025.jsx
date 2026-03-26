import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

export function WithholdingTaxOnBrokerageCommissionCalculator2025() {
  const [agentType, setAgentType] = useState(''); // advertising|life|other
  const [taxYear, setTaxYear] = useState('');
  const [isFiler, setIsFiler] = useState('');
  const [annualCommission, setAnnualCommission] = useState('');
  const [result, setResult] = useState(null);

  const getRate = () => {
    const filer = isFiler === 'yes';
    if (agentType === 'advertising') return filer ? 0.10 : 0.20;
    if (agentType === 'life') return filer ? 0.08 : 0.16;
    return filer ? 0.12 : 0.24;
  };

  const handleCalculate = () => {
    const amt = clampNonNegative(parseMoney(annualCommission));
    if (amt <= 0 || !agentType || !taxYear || !isFiler) {
      setResult(null);
      return;
    }
    const rate = getRate();
    const tax = amt * rate;
    setResult({ amt, rate, tax });
  };

  return (
    <TaxCalculatorShell title="Withholding Tax on Brokerage & Commission" subtitle="Section 233 (2025-2026)">
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
                <option value="" disabled>Select tax year</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Filer Status</label>
              <select
                value={isFiler}
                onChange={(e) => setIsFiler(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="" disabled>Select filer status</option>
                <option value="yes">Filer – Yes</option>
                <option value="no">Filer – No</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Agent Category</label>
              <select
                value={agentType}
                onChange={(e) => setAgentType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="" disabled>Select agent category</option>
                <option value="advertising">Advertising Agents</option>
                <option value="life">Life Insurance Agents (commission &lt; 0.5M p.a.)</option>
                <option value="other">Persons not covered above (Others)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Annual Commission / Brokerage (PKR)</label>
              <input
                value={annualCommission}
                onChange={(e) => setAnnualCommission(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter annual commission"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton
              onClick={() => {
                setAnnualCommission('');
                setTaxYear('');
                setIsFiler('');
                setAgentType('');
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
                      <th className="text-left">Annual Commission</th>
                      <td className="font-bold">{formatPKR(result.amt)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Rate</th>
                      <td className="font-bold">{(result.rate * 100).toFixed(0)}%</td>
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
              Enter commission/brokerage and click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Withholding Tax On Brokerage & Commission Tax Calculator</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            This calculator estimates withholding tax on brokerage and commission income under Section 233A of the Income Tax Ordinance 2001.
            It supports filers and non-filers and applies the latest 2025-2026 rates for advertising agents, life insurance agents, and other persons.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Why Use the Pak Tax Calculator for Brokerage & Commission?</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-bold text-gray-900">Accuracy and Reliability</div>
              <div className="mt-1">Aligned with FBR slabs for filers and non-filers.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Ease of Use</div>
              <div className="mt-1">No complex formulas required.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Time-Saving</div>
              <div className="mt-1">Instant results for quick decisions.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Compliance Assurance</div>
              <div className="mt-1">Reduce risk of penalties or overpayment.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Accessibility</div>
              <div className="mt-1">Available anytime on desktop or mobile.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Tax Expert Built</div>
              <div className="mt-1">Rates reflect Pakistan tax law expertise.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How to Fill Out the Withholding Tax on Brokerage and Commission Calculator</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Enter the brokerage or commission amount.</li>
            <li>Select your filer status.</li>
            <li>Choose the agent category.</li>
            <li>Click Calculate Tax to view results.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Applicable Withholding Tax Rates (2025-2026)</div>
          <table className="paktax-table">
            <thead>
              <tr>
                <th className="text-left">Type</th>
                <th className="text-left">Filer</th>
                <th className="text-left">Non-Filer</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Advertising Agents</td><td>10%</td><td>20%</td></tr>
              <tr><td>Life Insurance Agents (up to Rs. 0.5M)</td><td>8%</td><td>16%</td></tr>
              <tr><td>Other Agents</td><td>12%</td><td>24%</td></tr>
            </tbody>
          </table>
          <div className="text-xs text-gray-500 mt-3">Rates are applied under Section 233A of the Income Tax Ordinance, 2001.</div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">FAQs</div>
          <div className="text-sm text-gray-700 space-y-4">
            <div>
              <div className="font-bold text-gray-900">Is withholding tax final or adjustable?</div>
              <div className="mt-1">WHT is adjustable and can be claimed as credit against annual tax liability.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">What records should I maintain for WHT?</div>
              <div className="mt-1">Maintain invoices, WHT certificates, payment challans, bank statements, and filer verification.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">What is the difference between brokerage and commission?</div>
              <div className="mt-1">Brokerage is paid to intermediaries for deals, while commission is a percentage-based agent fee.</div>
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
          <div className="text-xl font-extrabold mb-2">Need Help With Commission Tax Planning?</div>
          <div className="text-sm text-gray-200">Share your commission details and our team can validate the slabs and provide a professional estimate report.</div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

