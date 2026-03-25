import React from 'react';
import { TaxCalculatorShell } from './calculatorUi2025.jsx';

export function FbrOnlineVerifications() {
  const irisUrl = 'https://iris.fbr.gov.pk/#verifications';

  return (
    <TaxCalculatorShell
      title="FBR Online Verifications"
      subtitle="Use IRIS 2.0 to verify NTN, ATL status, and other FBR records."
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
            <div>
              <div className="text-lg md:text-xl font-extrabold text-gray-900">
                Online Verifications
              </div>
              <div className="text-sm text-gray-600 mt-1 leading-relaxed">
                This section embeds FBR IRIS Online Verifications. If the embedded view is blocked by the browser,
                open the portal in a new tab.
              </div>
            </div>
            <a
              href={irisUrl}
              target="_blank"
              rel="noreferrer"
              className="paktax-btn paktax-btn-primary whitespace-nowrap"
            >
              Open IRIS Portal
            </a>
          </div>

          <div className="rounded-xl border border-gray-100 overflow-hidden bg-gray-50">
            <iframe
              title="FBR IRIS Online Verifications"
              src={irisUrl}
              className="w-full"
              style={{ height: 760, border: 0 }}
              loading="lazy"
            />
          </div>

          <div className="text-xs text-gray-500 mt-3 leading-relaxed">
            Note: Some websites block iframes using security headers. If you see a blank area, use the “Open IRIS Portal”
            button above.
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

