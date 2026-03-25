import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

export function ZakatCalculator2025() {
  const [nisabMode, setNisabMode] = useState('silver');
  const [inHand, setInHand] = useState('');
  const [savings, setSavings] = useState('');
  const [debtOwed, setDebtOwed] = useState('');
  const [investments, setInvestments] = useState('');
  const [stockAssets, setStockAssets] = useState('');
  const [moneyOwed, setMoneyOwed] = useState('');
  const [businessLiabilities, setBusinessLiabilities] = useState('');
  const [otherOutgoings, setOtherOutgoings] = useState('');
  const [result, setResult] = useState(null);

  const nisabGoldPKR = 2250000;
  const nisabSilverPKR = 175000;
  const zakatRate = 0.025;

  const handleCalculate = () => {
    const totalAssets =
      clampNonNegative(parseMoney(inHand)) +
      clampNonNegative(parseMoney(savings)) +
      clampNonNegative(parseMoney(debtOwed)) +
      clampNonNegative(parseMoney(investments)) +
      clampNonNegative(parseMoney(stockAssets));

    const totalLiabilities =
      clampNonNegative(parseMoney(moneyOwed)) +
      clampNonNegative(parseMoney(businessLiabilities)) +
      clampNonNegative(parseMoney(otherOutgoings));

    const net = Math.max(0, totalAssets - totalLiabilities);
    const nisabPKR = nisabMode === 'gold' ? nisabGoldPKR : nisabSilverPKR;
    const zakatPayable = net >= nisabPKR ? net * zakatRate : 0;

    setResult({
      totalAssets,
      totalLiabilities,
      net,
      nisabPKR,
      zakatPayable,
    });
  };

  return (
    <TaxCalculatorShell title="Zakat Tax Calculator" subtitle="Simplifying Zakat Calculation in Pakistan">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Choose Your Nisab Threshold</label>
              <select
                value={nisabMode}
                onChange={(e) => setNisabMode(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="silver">Silver Nisab</option>
                <option value="gold">Gold Nisab</option>
              </select>
              <div className="text-xs text-gray-500 mt-2">
                {nisabMode === 'silver'
                  ? `Value of Silver (approx ${formatPKR(nisabSilverPKR)})`
                  : `Value of Gold (approx ${formatPKR(nisabGoldPKR)})`}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-extrabold text-gray-900 mb-2">Enter Zakatable Assets</div>

              <label className="block text-xs font-bold text-gray-700 mb-1">In Hand</label>
              <input
                value={inHand}
                onChange={(e) => setInHand(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white mb-3"
              />

              <label className="block text-xs font-bold text-gray-700 mb-1">Savings</label>
              <input
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white mb-3"
              />

              <label className="block text-xs font-bold text-gray-700 mb-1">Debt Owed to You</label>
              <input
                value={debtOwed}
                onChange={(e) => setDebtOwed(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white mb-3"
              />

              <label className="block text-xs font-bold text-gray-700 mb-1">Investments</label>
              <input
                value={investments}
                onChange={(e) => setInvestments(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white mb-3"
              />

              <label className="block text-xs font-bold text-gray-700 mb-1">Stock Assets</label>
              <input
                value={stockAssets}
                onChange={(e) => setStockAssets(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <div className="text-sm font-extrabold text-gray-900 mb-2">Enter Your Liabilities</div>

              <label className="block text-xs font-bold text-gray-700 mb-1">Money Owed</label>
              <input
                value={moneyOwed}
                onChange={(e) => setMoneyOwed(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white mb-3"
              />

              <label className="block text-xs font-bold text-gray-700 mb-1">Business Liabilities</label>
              <input
                value={businessLiabilities}
                onChange={(e) => setBusinessLiabilities(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white mb-3"
              />

              <label className="block text-xs font-bold text-gray-700 mb-1">Other Outgoings Due</label>
              <input
                value={otherOutgoings}
                onChange={(e) => setOtherOutgoings(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton
              onClick={() => {
                setInHand('');
                setSavings('');
                setDebtOwed('');
                setInvestments('');
                setStockAssets('');
                setMoneyOwed('');
                setBusinessLiabilities('');
                setOtherOutgoings('');
                setResult(null);
              }}
            >
              Reset
            </ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Zakat Result">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Total Zakatable Assets</th>
                      <td className="font-bold">{formatPKR(result.totalAssets)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Total Liabilities</th>
                      <td className="font-bold">{formatPKR(result.totalLiabilities)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Total Net Worth</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.net)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Nisab Threshold</th>
                      <td className="font-bold">{formatPKR(result.nisabPKR)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Zakat Payable Amount</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.zakatPayable)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ResultBlock>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter your assets, liabilities, and nisab threshold to calculate Zakat.
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Zakat Tax Calculator</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Welcome to the premier online Zakat calculator Pakistan, designed to bring precision and ease to your
            religious and financial obligations. This free tool helps you quickly determine your Zakat liability by
            comparing your net Zakatable assets against the latest Nisab.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">What is Zakat?</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Zakat is one of the five pillars of Islam and a mandatory act of worship for Muslims whose wealth exceeds
            the Nisab threshold. It is a purification of wealth, calculated annually on eligible assets at 2.5%.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Discover the Features of Our Online Zakat Calculator</div>
          <div className="text-sm text-gray-700 space-y-3">
            <div><span className="font-semibold">Accurate Zakat Calculation:</span> Applies the 2.5% rate to net assets after deducting eligible liabilities.</div>
            <div><span className="font-semibold">Compliant with Sharia Law:</span> Designed with core fiqh rules around Nisab and deductible obligations.</div>
            <div><span className="font-semibold">User-Friendly Interface:</span> Clear asset and liability inputs to reduce mistakes.</div>
            <div><span className="font-semibold">Real-Time Updates:</span> Built to reflect updated Nisab values and guidelines as they change.</div>
            <div><span className="font-semibold">Up-to-Date Nisab Values:</span> Silver and gold thresholds are shown for quick reference.</div>
            <div><span className="font-semibold">Data Security:</span> No login required and no financial data stored.</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How to Use Our Online Zakat Calculator</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Choose the Nisab threshold based on the value of silver or gold.</li>
            <li>Enter your Zakatable assets: cash, savings, receivables, investments, and stock assets.</li>
            <li>Enter deductible liabilities such as money owed, business liabilities, and due outgoings.</li>
            <li>The calculator will display your total net worth and payable Zakat amount.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">What is Nisab for Zakat in Islam?</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Nisab is the minimum wealth threshold required before Zakat becomes obligatory. It is tied to the value of
            87.48 grams of gold or 612.36 grams of silver. Use the selected Nisab value to determine eligibility.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How to Calculate Zakat on Your Income?</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Add your assets, subtract eligible liabilities, and if the remaining amount exceeds Nisab, apply 2.5%.
            Example: PKR 2,800,000 assets minus PKR 500,000 liabilities equals PKR 2,300,000. Zakat payable is 2.5%
            of PKR 2,300,000, which is PKR 57,500.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Debts and Liabilities in Zakat</div>
          <div className="text-sm text-gray-700 space-y-3">
            <div className="font-semibold">Deductible liabilities include:</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Debts payable within 12 months</li>
              <li>Up to 12 months of installments on long-term debts</li>
              <li>Arrears or overdue payments</li>
            </ul>
            <div className="font-semibold">Non-deductible liabilities include:</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Expenses and bills not yet due</li>
              <li>Debts not payable within the next 12 months</li>
              <li>Interest payments</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">FAQs</div>
          <div className="text-sm text-gray-700 space-y-3">
            <div>
              <div className="font-semibold">Who is eligible to receive Zakat?</div>
              <div>Eligible recipients include the poor, needy, Zakat collectors, those whose hearts are to be reconciled, those in bondage, debtors, those in the path of Allah, and travelers in need.</div>
            </div>
            <div>
              <div className="font-semibold">What assets are subject to Zakat?</div>
              <div>Cash, trading assets, gold and silver, investments, receivables, and certain agricultural outputs.</div>
            </div>
            <div>
              <div className="font-semibold">What are the benefits of Zakat?</div>
              <div>Beyond spiritual reward, Zakat reduces wealth disparity and supports community welfare in Pakistan.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Support and Contact Information</div>
          <div className="text-sm text-gray-700">
            For any inquiries, assistance, or personalized support, please contact our dedicated support team. Our
            experts are ready to help you navigate any questions about Zakat compliance.
          </div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

