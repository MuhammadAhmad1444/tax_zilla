import React, { useState } from 'react';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

export function WithholdingTaxOnBrokerageCommissionCalculator2025() {
  const [agentType, setAgentType] = useState('other'); // advertising|life|other
  const [annualCommission, setAnnualCommission] = useState('');
  const [result, setResult] = useState(null);

  const getRate = () => {
    if (agentType === 'advertising') return 0.10;
    if (agentType === 'life') return 0.08;
    return 0.12;
  };

  const handleCalculate = () => {
    const amt = clampNonNegative(parseMoney(annualCommission));
    if (amt <= 0) {
      setResult(null);
      return;
    }
    const rate = getRate();
    const tax = amt * rate;
    setResult({ amt, rate, tax });
  };

  return (
    <TaxCalculatorShell title="Withholding Tax on Brokerage & Commission" subtitle="Section 233 (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Agent Category</label>
              <select
                value={agentType}
                onChange={(e) => setAgentType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="advertising">Advertising Agents (10%)</option>
                <option value="life">Life Insurance Agents (commission &lt; 0.5M) (8%)</option>
                <option value="other">Other Persons (12%)</option>
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
            <ResetButton onClick={() => { setAnnualCommission(''); setResult(null); }}>Reset</ResetButton>
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
    </TaxCalculatorShell>
  );
}

