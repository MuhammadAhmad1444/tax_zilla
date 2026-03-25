import React, { useMemo, useState } from 'react';
import { TaxCalculatorShell, ResultBlock } from './calculatorUi2025.jsx';
import { clampNonNegative, parseMoney, formatPKR } from './taxUtils2025.js';

const USD_PKR_RATE = 278; // used to convert PKR declared value -> USD brackets (approx)

const BRANDS = {
  Google: [
    'Google Pixel 9',
    'Google Pixel 9 Pro',
    'Google Pixel 8a',
    'Google Pixel 8 Pro',
    'Google Pixel 8',
    'Google Pixel 7a',
    'Google Pixel 7 Pro',
    'Google Pixel 7',
    'Google Pixel 6a',
    'Google Pixel 6 Pro',
    'Google Pixel 6',
    'Google Pixel 5a (5G)',
    'Google Pixel 4',
    'Google Pixel 4 XL',
    'Google Pixel 4a',
    'Google Pixel 4a (5G)',
    'Google Pixel 3, 3XL, 3 LITE',
    'Google Pixel 3, 2 XL',
    'Google Pixel 2 XL',
    'Google Pixel XL',
  ],
  OPPO: [
    'Oppo A11K',
    'Oppo A12 (3+32)',
    'Oppo A12 (4+64)',
    'Oppo A15s',
    'Oppo A16',
    'Oppo A16k',
    'Oppo A5 2020',
    'Oppo A5 2020 (8+128)',
    'Oppo A5s (6+128)',
    'Oppo A7 (4+64)',
    'Oppo A9 (4+64)',
    'Oppo A55 (6+128)',
    'Oppo A57 (4+128)',
    'Oppo A76 (4+128)',
    'Oppo A77 (4+128)',
    'Oppo A78 (8+256)',
    'Oppo F11 Pro',
    'Oppo F11 Pro (6+128)',
    'Oppo F11 Pro (8+256)',
    'Oppo F12 Pro',
    'Oppo F17 Pro',
    'Oppo F19 Pro',
    'Oppo F19s Pro',
    'Oppo F21 Pro',
    'Oppo F22 Pro',
    'Oppo Find X2 Pro',
    'Oppo Find X2 Neo',
    'Oppo Find X3 Pro',
    'Oppo Find X5 Pro',
    'Oppo Reno 4',
    'Oppo Reno 4 Pro',
    'Oppo Reno 5',
    'Oppo Reno 5 Pro',
    'Oppo Reno 5 5G',
    'Oppo Reno 6',
    'Oppo Reno 6 Pro',
    'Oppo Reno 7',
    'Oppo Reno 7 Pro',
    'Oppo Reno 8',
    'Oppo Reno 8 5G',
    'Oppo Reno 8 Pro',
    'Oppo Reno 9',
    'Oppo Reno 9 Pro',
    'Oppo Reno 9 Pro Plus',
  ],
  Realme: [
    'Realme 5i',
    'Realme 6i',
    'Realme 7',
    'Realme 7 Pro',
    'Realme 8',
    'Realme 8 Pro',
    'Realme 9',
    'Realme 9 Pro',
    'Realme C11',
    'Realme C12',
    'Realme C15 (4+64)',
    'Realme C17',
    'Realme C21',
    'Realme C25',
    'Realme C25s',
    'Realme C2',
    'Realme C3',
    'Realme C35',
    'Realme Narzo 30A',
  ],
  Nokia: [
    'Nokia 105',
    'Nokia 108',
    'Nokia 130',
    'Nokia 150',
    'Nokia 215',
    'Nokia 220',
    'Nokia 225',
    'Nokia 230',
    'Nokia 3310',
    'Nokia 8110',
    'Nokia 1',
    'Nokia 2.1',
    'Nokia 2.2',
    'Nokia 2.3',
    'Nokia 2.4',
    'Nokia 3.1',
    'Nokia 3.1 Plus',
    'Nokia 3.2',
    'Nokia 5.1',
    'Nokia 5.1 Plus',
    'Nokia 5.3',
    'Nokia 6.1',
    'Nokia 6.1 Plus',
    'Nokia 6.2',
    'Nokia 7.1',
    'Nokia 7.2',
    'Nokia 8',
    'Nokia 8 Plus',
  ],
  Infinix: [
    'Infinix Smart 2 PTA Tax',
    'Infinix Smart 2 HD PTA Tax',
    'Infinix Smart 2 Pro PTA Tax',
    'Infinix S3X PTA Tax',
    'Infinix Note 5 PTA Tax',
    'Infinix Note 5 Stylus PTA Tax',
    'Infinix Hot 6 Pro PTA Tax',
  ],
  OnePlus: [
    'OnePlus 12',
    'OnePlus 12R',
    'OnePlus 11',
    'OnePlus 11R',
    'OnePlus 10 Pro',
    'OnePlus 10 Pro Ultra',
    'OnePlus 10R',
    'OnePlus 10T',
    'OnePlus 10',
    'OnePlus 9',
    'OnePlus 9 Pro',
    'OnePlus 9RT 5G',
    'OnePlus 9R',
    'OnePlus 8',
    'OnePlus 8T 5G',
    'OnePlus 8 Pro',
    'OnePlus 7',
    'OnePlus 7 Pro 5G McLaren',
    'OnePlus 7T Pro 5G McLaren',
    'OnePlus 7T 5G',
    'OnePlus 7T',
    'OnePlus 6',
    'OnePlus 6T',
    'OnePlus 5',
    'OnePlus 5T',
    'OnePlus 3',
    'OnePlus 3T',
    'OnePlus 2',
  ],
};

const uniqueList = (arr) => Array.from(new Set(arr));

const computePtaTaxByUsd = (usdValue) => {
  const v = clampNonNegative(usdValue);
  if (!Number.isFinite(v) || v <= 0) return null;

  // PTA taxes are estimated based on the phone's C&F value (USD).
  // Sources vary by month/year; verify on PTA DIRBS for exact current amounts.
  // Rates used here follow commonly published PTA tax bracket tables (approx).
  if (v <= 30) {
    return { bracket: 'Up to $30', passportBase: 430, cnicBase: 550, passportTax: 430, cnicTax: 550 };
  }
  if (v <= 100) {
    return { bracket: '$30 - $100', passportBase: 3200, cnicBase: 4323, passportTax: 3200, cnicTax: 4323 };
  }
  if (v <= 200) {
    return { bracket: '$100 - $200', passportBase: 9580, cnicBase: 11561, passportTax: 9580, cnicTax: 11561 };
  }
  if (v <= 350) {
    const passportBase = 12200;
    const cnicBase = 14661;
    const passportTax = passportBase * 1.17;
    const cnicTax = cnicBase * 1.17;
    return { bracket: '$200 - $350 (+17% sales tax)', passportBase, cnicBase, passportTax, cnicTax };
  }
  if (v <= 500) {
    const passportBase = 17800;
    const cnicBase = 23420;
    const passportTax = passportBase * 1.17;
    const cnicTax = cnicBase * 1.17;
    return { bracket: '$350 - $500 (+17% sales tax)', passportBase, cnicBase, passportTax, cnicTax };
  }

  const passportBase = 27600;
  const cnicBase = 37007;
  const passportTax = passportBase * 1.17;
  const cnicTax = cnicBase * 1.17;
  return { bracket: 'Over $500 (+17% sales tax)', passportBase, cnicBase, passportTax, cnicTax };
};

const computePtaTaxByPkr = (pkrValue) => {
  const v = clampNonNegative(pkrValue);
  if (!Number.isFinite(v) || v <= 0) return null;
  const usdValue = v / USD_PKR_RATE;
  return computePtaTaxByUsd(usdValue);
};

export function PtaTaxCalculator2025() {
  const brandKeys = Object.keys(BRANDS);
  // Use placeholders by default (so the user sees "Choose Brand" / "Choose Phone").
  const [brand, setBrand] = useState('');
  const modelList = uniqueList(BRANDS[brand] || []);
  const [model, setModel] = useState('');
  const [pkrValue, setPkrValue] = useState('');

  const declaredPkr = parseMoney(pkrValue);
  const declaredUsd = declaredPkr > 0 ? declaredPkr / USD_PKR_RATE : null;

  const result = useMemo(() => {
    const parsed = parseMoney(pkrValue);
    return computePtaTaxByPkr(parsed);
  }, [pkrValue]);

  const effectiveModel = modelList.includes(model) ? model : 'Other';

  return (
    <TaxCalculatorShell
      title="PTA Tax Calculator"
      subtitle="PTA tax estimate for registering non-PTA mobile phones in Pakistan (Passport vs CNIC)"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Brand</label>
              <select
                value={brand}
                onChange={(e) => {
                  const nextBrand = e.target.value;
                  setBrand(nextBrand);
                  const nextModelList = uniqueList(BRANDS[nextBrand] || []);
                  // Reset model so the "Choose Phone" placeholder is shown.
                  setModel('');
                }}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="" disabled>
                  Choose Brand
                </option>
                {brandKeys.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="" disabled>
                  Choose Phone
                </option>
                {modelList.map((m) => (
                  <option key={m} value={m}>
                    {m.replace(/ PTA Tax$/g, '')}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
              <div className="text-xs text-gray-500 mt-2 leading-relaxed">
                Select your phone brand and model. If your exact model is not listed, choose <b>Other</b>.
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">
                {effectiveModel === 'Other' ? 'Declared / Resale Value (PKR) - required' : 'Declared / Resale Value (PKR)'}
              </label>
              <input
                value={pkrValue}
                onChange={(e) => setPkrValue(e.target.value)}
                type="number"
                min="0"
                step="1"
                placeholder="e.g., 300000"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
              <div className="text-xs text-gray-500 mt-2 leading-relaxed">
                This calculator converts PKR to USD using <b>1 USD = {USD_PKR_RATE} PKR</b> to match the PTA bracket table used for estimation.
              </div>
            </div>

          </div>

          {result ? (
            <div className="mt-6">
              <ResultBlock title="Estimated PTA Tax Bracket">
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Device: <b className="font-semibold">{brand || '—'}</b> /{' '}
                    <b className="font-semibold">{model !== '' ? model : 'Other'}</b>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Declared value: <b className="text-[var(--color-gold)]">{formatPKR(declaredPkr)}</b>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Approx (USD):{' '}
                    <b className="text-[var(--color-gold)]">{declaredUsd ? `$${declaredUsd.toFixed(2)}` : '—'}</b>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Selected bracket: <b className="text-[var(--color-gold)]">{result.bracket}</b>
                  </div>
                </div>
              </ResultBlock>
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-2 space-y-4">
          {!result ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              <div className="font-semibold text-gray-800">Enter your declared / resale value in PKR</div>
              <div className="text-sm mt-2 leading-relaxed">
                Choose your device <b>Brand</b> and <b>Phone model</b> (or <b>Other</b>), then type a value to see an estimated PTA tax for:
              </div>
              <div className="mt-3 font-semibold">Passport registration</div>
              <div className="font-semibold">CNIC registration</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultBlock title="PTA Tax With Passport">
                <div className="text-2xl font-extrabold text-[var(--color-gold)]">{formatPKR(result.passportTax)}</div>
                <div className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Base: {formatPKR(result.passportBase)}
                  {result.passportTax !== result.passportBase ? ' + 17% sales tax' : ''}
                </div>
              </ResultBlock>

              <ResultBlock title="PTA Tax With CNIC">
                <div className="text-2xl font-extrabold text-[var(--color-gold)]">{formatPKR(result.cnicTax)}</div>
                <div className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Base: {formatPKR(result.cnicBase)}
                  {result.cnicTax !== result.cnicBase ? ' + 17% sales tax' : ''}
                </div>
              </ResultBlock>
            </div>
          )}

          <div className="space-y-4">
            <ResultBlock title="Deadlines (from PTA guidance)">
              <div className="text-sm text-gray-700 leading-relaxed">
                <b>Passport:</b> within 30 days from the first use of the SIM in the mobile phone.
                <br />
                <b>CNIC:</b> within 60 days from the first use of the SIM in the mobile phone.
              </div>
            </ResultBlock>

            <ResultBlock title="How to Pay Online">
              <ol className="list-decimal list-inside text-sm text-gray-700 leading-relaxed space-y-1">
                <li>Visit PTA DIRBS and login/register via CNIC.</li>
                <li>Submit IMEI to receive PSID.</li>
                <li>Pay via online banking/ATMs or wallets like JazzCash/EasyPaisa.</li>
                <li>After payment, registration completes in ~24–72 hours.</li>
              </ol>
              <div className="text-xs text-gray-500 mt-3">
                DIRBS portal:{' '}
                <a
                  className="text-[var(--color-gold)] font-semibold"
                  href="https://dirbs.pta.gov.pk/drs/auth/login"
                  target="_blank"
                  rel="noreferrer"
                >
                  dirbs.pta.gov.pk
                </a>
              </div>
            </ResultBlock>

            <ResultBlock title="Important Notes">
              <div className="text-sm text-gray-700 leading-relaxed">
                Tax rates can change. This calculator provides an estimate based on commonly published PTA tax brackets. For final confirmation,
                always verify the exact amount on PTA DIRBS.
              </div>
            </ResultBlock>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

