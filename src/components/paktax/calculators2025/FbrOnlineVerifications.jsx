import React from 'react';
import { Link } from 'react-router-dom';
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

      <div className="mt-8 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Verify NTN, ATL, and Registration Status</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Use the FBR IRIS verification portal to confirm a taxpayer's NTN status, Active Taxpayer List (ATL) presence,
            and registration details. This page keeps the official verification experience intact while providing a quick
            launch point inside our calculator suite.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How to Use FBR Online Verification</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Click the "Open IRIS Portal" button if the embedded view does not load.</li>
            <li>Choose the verification service (NTN, ATL status, sales tax, or registration).</li>
            <li>Enter the required CNIC/NTN or registration number.</li>
            <li>Review the verified status directly from FBR IRIS.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Why This Matters for Compliance</div>
          <div className="text-sm text-gray-700 space-y-2">
            <div>Validate vendor status before issuing payments or withholding tax.</div>
            <div>Confirm your ATL status before filing returns or applying lower tax rates.</div>
            <div>Prevent penalties by ensuring registrations align with your tax profile.</div>
            <div>Maintain audit-ready documentation with official FBR confirmations.</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Security & Privacy</div>
          <div className="text-sm text-gray-700 space-y-2">
            <div>No credentials are stored on this page.</div>
            <div>All verification happens directly on FBR IRIS.</div>
            <div>We do not collect CNIC or NTN details.</div>
            <div>Use the official portal for sensitive actions and submissions.</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Need Help With FBR Verifications?</div>
          <div className="text-sm text-gray-700">
            Our tax professionals can assist with NTN registration, ATL activation, and verification workflows for your
            business or personal compliance needs.
          </div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

