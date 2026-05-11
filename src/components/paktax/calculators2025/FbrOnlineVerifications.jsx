import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Loader2, RefreshCw, ShieldCheck, CheckCircle } from 'lucide-react';
import { TaxCalculatorShell } from './calculatorUi2025.jsx';

export function FbrOnlineVerifications() {
  const irisUrl = 'https://iris.fbr.gov.pk/#verifications';
  const [btnLoading, setBtnLoading] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const handleOpen = () => {
    setBtnLoading(true);
    window.open(irisUrl, '_blank', 'noopener,noreferrer');
    setTimeout(() => setBtnLoading(false), 2200);
  };

  const handleIframeLoad = () => setIframeLoading(false);

  const handleRetry = () => {
    setIframeLoading(true);
    setIframeError(false);
    // Force iframe reload by toggling key
    setTimeout(() => setIframeLoading(false), 8000);
  };

  return (
    <TaxCalculatorShell
      title="FBR Online Verifications"
      subtitle="Use IRIS 2.0 to verify NTN, ATL status, and other FBR records."
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">

          {/* Header row */}
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div>
              <div className="text-lg md:text-xl font-extrabold text-gray-900">
                Online Verifications
              </div>
              <div className="text-sm text-gray-500 mt-1 leading-relaxed">
                This section embeds FBR IRIS Online Verifications. If the embedded view is blocked by
                the browser, open the portal in a new tab.
              </div>
            </div>

            {/* Open IRIS Portal button with loading */}
            <button
              type="button"
              onClick={handleOpen}
              disabled={btnLoading}
              className="paktax-btn paktax-btn-primary whitespace-nowrap flex items-center gap-2 min-w-[160px] justify-center disabled:opacity-80 disabled:cursor-wait"
            >
              <AnimatePresence mode="wait">
                {btnLoading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 size={15} className="animate-spin" />
                    Opening…
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink size={15} />
                    Open IRIS Portal
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Iframe with loading overlay */}
          <div className="relative rounded-xl border border-gray-100 overflow-hidden bg-gray-50" style={{ height: 760 }}>

            {/* Loading skeleton */}
            <AnimatePresence>
              {iframeLoading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4"
                  style={{ background: 'var(--color-surface-muted)' }}
                >
                  {/* Animated pulse skeleton bars */}
                  <div className="w-full max-w-sm space-y-3 px-8">
                    <div className="h-8 rounded-lg bg-gray-200 animate-pulse" />
                    <div className="h-4 w-3/4 rounded-lg bg-gray-200 animate-pulse" />
                    <div className="h-4 w-1/2 rounded-lg bg-gray-200 animate-pulse" />
                  </div>

                  {/* Spinner + label */}
                  <div className="flex flex-col items-center gap-3 mt-4">
                    <div className="relative">
                      <div className="h-14 w-14 rounded-full border-4 border-gray-200" />
                      <div
                        className="absolute inset-0 h-14 w-14 rounded-full border-4 border-transparent animate-spin"
                        style={{ borderTopColor: 'var(--color-gold)' }}
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-500">Loading FBR IRIS Portal…</p>
                    <p className="text-xs text-gray-400">This may take a few seconds</p>
                  </div>

                  {/* After delay, show "taking long?" hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5 }}
                    className="flex flex-col items-center gap-2 mt-2"
                  >
                    <p className="text-xs text-gray-400">Taking too long?</p>
                    <button
                      type="button"
                      onClick={handleOpen}
                      className="flex items-center gap-1.5 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/8 px-4 py-1.5 text-xs font-bold text-[var(--color-gold)] hover:bg-[var(--color-gold)]/15 transition-all"
                    >
                      <ExternalLink size={12} /> Open in New Tab
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The iframe */}
            <iframe
              title="FBR IRIS Online Verifications"
              src={irisUrl}
              className="w-full h-full"
              style={{ border: 0, height: 760 }}
              loading="lazy"
              onLoad={handleIframeLoad}
            />
          </div>

          <div className="text-xs text-gray-400 mt-3 leading-relaxed">
            Note: FBR IRIS may block embedded views using security headers. If the area is blank, use
            the <strong className="text-[var(--color-gold)]">Open IRIS Portal</strong> button above.
          </div>
        </div>
      </div>

      {/* Info sections */}
      <div className="mt-8 space-y-5">

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">
            Verify NTN, ATL, and Registration Status
          </div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Use the FBR IRIS verification portal to confirm a taxpayer's NTN status, Active Taxpayer
            List (ATL) presence, and registration details. This page keeps the official verification
            experience intact while providing a quick launch point inside our calculator suite.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-4">
            How to Use FBR Online Verification
          </div>
          <ol className="space-y-3">
            {[
              'Click "Open IRIS Portal" if the embedded view does not load.',
              'Choose the verification service (NTN, ATL status, sales tax, or registration).',
              'Enter the required CNIC, NTN, or registration number.',
              'Review the verified status directly from FBR IRIS.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span
                  className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-extrabold flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--color-brand-navy)', color: 'var(--color-gold)' }}
                >
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Why This Matters for Compliance</div>
          <ul className="space-y-2">
            {[
              'Validate vendor status before issuing payments or withholding tax.',
              'Confirm your ATL status before filing returns or applying lower tax rates.',
              'Prevent penalties by ensuring registrations align with your tax profile.',
              'Maintain audit-ready documentation with official FBR confirmations.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 text-xl font-extrabold text-gray-900 mb-3">
            <ShieldCheck size={20} style={{ color: 'var(--color-gold)' }} /> Security & Privacy
          </div>
          <ul className="space-y-2">
            {[
              'No credentials are stored on this page.',
              'All verification happens directly on FBR IRIS.',
              'We do not collect CNIC or NTN details.',
              'Use the official portal for sensitive actions and submissions.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-2">Need Help With FBR Verifications?</div>
          <div className="text-sm text-gray-700 mb-4">
            Our tax professionals can assist with NTN registration, ATL activation, and verification
            workflows for your business or personal compliance needs.
          </div>
          <Link to="/contact" className="paktax-btn paktax-btn-primary inline-flex items-center gap-2">
            Request a Consultation
          </Link>
        </div>

      </div>
    </TaxCalculatorShell>
  );
}
