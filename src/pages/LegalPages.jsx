import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Printer, Shield, FileText, AlertTriangle,
  Phone, Mail, MapPin, ChevronRight, CheckCircle, Clock,
} from 'lucide-react';
import { SITE } from '../data/site.js';

/* ── Decorative grid ────────────────────────── */
const Grid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
    style={{
      backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
    }}
  />
);

/* ── Legal page nav links ───────────────────── */
const LEGAL_PAGES = [
  { path: '/legal/privacy-policy',   label: 'Privacy Policy',    icon: Shield },
  { path: '/legal/terms-conditions', label: 'Terms & Conditions', icon: FileText },
  { path: '/legal/disclaimer',       label: 'Disclaimer',         icon: AlertTriangle },
];

/* ── Contact info card ──────────────────────── */
const ContactCard = () => (
  <div className="rounded-2xl border border-[var(--color-gold)]/20 p-5 mt-4"
    style={{ background: 'rgba(212,175,55,0.04)' }}>
    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3">Contact Us</p>
    <div className="space-y-2.5">
      <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 text-sm text-gray-700 hover:text-[var(--color-gold)] transition-colors group">
        <div className="h-7 w-7 rounded-lg bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
          <Mail size={13} />
        </div>
        {SITE.email}
      </a>
      <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2.5 text-sm text-gray-700 hover:text-[var(--color-gold)] transition-colors group">
        <div className="h-7 w-7 rounded-lg bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
          <Phone size={13} />
        </div>
        {SITE.phone}
      </a>
      <div className="flex items-start gap-2.5 text-sm text-gray-600">
        <div className="h-7 w-7 rounded-lg bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center flex-shrink-0 mt-0.5">
          <MapPin size={13} />
        </div>
        7A, Malik Park Main Street, Main Canal Road, Mughalpura, Lahore, Pakistan
      </div>
    </div>
  </div>
);

/* ── Section component ──────────────────────── */
const Section = ({ number, title, children }) => (
  <div className="mb-10 scroll-mt-8" id={`section-${number}`}>
    <div className="flex items-start gap-3 mb-4">
      <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0 mt-0.5"
        style={{ background: 'var(--color-brand-navy)', color: 'var(--color-gold)' }}>
        {number}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug pt-0.5"
        style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h3>
    </div>
    <div className="ml-11 space-y-3 text-[15px] leading-relaxed text-gray-600">
      {children}
    </div>
  </div>
);

/* ── Professional bullet list ───────────────── */
const BulletList = ({ items }) => (
  <ul className="space-y-2.5">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2.5">
        <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

/* ── Notice/Warning box ─────────────────────── */
const NoticeBox = ({ children }) => (
  <div className="rounded-xl border border-[var(--color-gold)]/30 p-5 mb-8 flex items-start gap-3"
    style={{ background: 'rgba(212,175,55,0.06)' }}>
    <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
    <div className="text-sm leading-relaxed text-gray-700">{children}</div>
  </div>
);

/* ── Warning text (inline) ──────────────────── */
const Warning = ({ children }) => (
  <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800 mt-3">
    ⚠️ {children}
  </div>
);

/* ══════════════════════════════════════════════
   MAIN LAYOUT
══════════════════════════════════════════════ */
const LegalLayout = ({ title, lastUpdated, pageIcon: PageIcon, badge, children }) => {
  const [printing, setPrinting] = useState(false);

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => { window.print(); setPrinting(false); }, 100);
  };

  return (
    <>
      <Helmet>
        <title>{title} — Tax Zilla Consultancy</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* ── Hero ──────────────────────────────── */}
      <section className="relative overflow-hidden px-2 pb-14 pt-28 text-white dark-section sm:pb-16 sm:pt-32"
        style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(212,175,55,0.15),_transparent_60%)]" />
        <Grid />

        <div className="container-custom relative z-10 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <Link to="/" className="hover:text-[var(--color-gold)] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-gray-600" />
            <span className="text-white font-medium">{title}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/35 bg-[var(--color-gold)]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)] mb-4">
                {badge}
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {title}
              </h1>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                <Clock size={12} className="text-[var(--color-gold)]" />
                <span>Last Updated: {lastUpdated}</span>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex gap-3 print:hidden flex-shrink-0">
              <Link to="/" className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/8 px-4 py-2.5 text-xs font-semibold text-white/80 hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)] transition-all">
                <ArrowLeft size={14} /> Home
              </Link>
              <button type="button" onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-xl bg-[var(--color-gold)] text-black px-4 py-2.5 text-xs font-bold hover:bg-[var(--color-gold-dark)] transition-all">
                <Printer size={14} /> Print
              </button>
            </div>
          </div>

          {/* Legal pages nav */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/10 print:hidden">
            {LEGAL_PAGES.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  typeof window !== 'undefined' && window.location.pathname === path
                    ? 'bg-[var(--color-gold)] text-black'
                    : 'border border-white/15 bg-white/8 text-white/70 hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]'
                }`}
              >
                <Icon size={12} /> {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ───────────────────────────── */}
      <section className="py-10 sm:py-14" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom max-w-4xl">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">

            {/* Gold top bar */}
            <div className="h-1" style={{ background: 'linear-gradient(to right, var(--color-gold), var(--color-gold-dark))' }} />

            <div className="p-6 sm:p-10 md:p-14">
              {children}
            </div>
          </div>

          {/* Bottom legal nav */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 print:hidden">
            {LEGAL_PAGES.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all shadow-sm">
                <Icon size={12} /> {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* ══════════════════════════════════════════════
   PRIVACY POLICY
══════════════════════════════════════════════ */
export const PrivacyPolicyPage = () => (
  <LegalLayout title="Privacy Policy" lastUpdated="January 19, 2026" badge="Data Protection · Pakistan" pageIcon={Shield}>
    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-10 pb-8 border-b border-gray-100">
      <strong className="text-gray-900">Tax Zilla Consultancy</strong> ("we", "our", "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy outlines our practices regarding data collection, use, and protection in compliance with the laws of Pakistan.
    </p>

    <Section number="1" title="Information We Collect">
      <p>We collect personal information necessary to provide professional tax and legal services. This may include:</p>
      <BulletList items={[
        'Personal Identity: Name, CNIC, Passport details, and photographs.',
        'Contact Information: Mailing address, email address, and phone numbers.',
        'Financial Information: Bank statements, income records, asset details, and expense proofs.',
        'Business Information: Company registration documents, NTN/STRN certificates, and financial statements.',
        'Authentication Data: FBR Iris portal credentials provided by you strictly for filing purposes.',
      ]} />
    </Section>

    <Section number="2" title="How We Use Your Information">
      <p>Your information is used strictly for the following purposes:</p>
      <BulletList items={[
        'Preparation and filing of Income Tax and Sales Tax returns with the Federal Board of Revenue (FBR).',
        'Company incorporation and compliance filings with the Securities and Exchange Commission of Pakistan (SECP).',
        'Responding to legal notices and audit proceedings on your behalf.',
        'Communicating important regulatory updates, tax deadlines, and service-related information.',
        'Internal record keeping and client management.',
      ]} />
    </Section>

    <Section number="3" title="Data Security & Protection">
      <p>We implement robust security measures to safeguard your sensitive data:</p>
      <BulletList items={[
        'Encryption: Digital records are stored in encrypted environments.',
        'Access Control: Only authorized personnel handling your case have access to your data.',
        'Physical Security: Physical documents are stored in secure, locked facilities with restricted access.',
        'Network Security: We use firewalls and secure protocols for all digital communication.',
      ]} />
    </Section>

    <Section number="4" title="Client Confidentiality">
      <p>As professional consultants, we adhere to strict standards of client confidentiality. We do not discuss your financial affairs with unauthorized third parties. All employees and consultants at Tax Zilla are bound by non-disclosure agreements regarding client information.</p>
    </Section>

    <Section number="5" title="Third-Party Sharing">
      <p>We do not sell or rent your personal information. Data is shared only when necessary with:</p>
      <BulletList items={[
        'Government Authorities: FBR, SECP, PRA, and other regulatory bodies — strictly for compliance purposes mandated by law.',
        'Legal Counsel: If specialized legal representation is required for your case.',
        'Service Providers: Secure cloud storage or software providers who assist in our operations (bound by confidentiality).',
      ]} />
    </Section>

    <Section number="6" title="Data Retention">
      <p>We retain your personal and financial data for as long as necessary to fulfill the purposes outlined in this policy or as required by Pakistan's tax laws, which typically require record retention for up to 6 years. Upon termination of services, data may be archived securely or destroyed as per your request, subject to legal retention obligations.</p>
    </Section>

    <Section number="7" title="Your Rights">
      <p>Under applicable data protection principles, you have the right to:</p>
      <BulletList items={[
        'Request access to the personal data we hold about you.',
        'Request correction of any inaccurate or incomplete information.',
        'Request deletion of your data, subject to our legal obligations to maintain records for tax authorities.',
        'Withdraw consent for optional communications at any time.',
      ]} />
    </Section>

    <Section number="8" title="Cookies & Tracking">
      <p>Our website may use cookies to enhance user experience and analyze site traffic. These cookies do not collect sensitive personal or financial information. You can choose to disable cookies through your browser settings, though this may affect website functionality.</p>
    </Section>

    <Section number="9" title="Compliance with Pakistan Laws">
      <p>This Privacy Policy is governed by the laws of Pakistan, including the Electronic Transactions Ordinance 2002 and relevant provisions of the Prevention of Electronic Crimes Act (PECA) 2016 regarding data privacy.</p>
    </Section>

    <Section number="10" title="Contact for Privacy Concerns">
      <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us:</p>
      <ContactCard />
    </Section>
  </LegalLayout>
);

/* ══════════════════════════════════════════════
   TERMS & CONDITIONS
══════════════════════════════════════════════ */
export const TermsConditionsPage = () => (
  <LegalLayout title="Terms & Conditions" lastUpdated="January 19, 2026" badge="Service Agreement · Pakistan" pageIcon={FileText}>
    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-10 pb-8 border-b border-gray-100">
      Welcome to <strong className="text-gray-900">Tax Zilla Consultancy</strong>. By accessing our website or engaging our services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.
    </p>

    <Section number="1" title="Acceptance of Terms">
      <p>By using our services, you acknowledge that you have read, understood, and agreed to these Terms & Conditions. If you do not agree with any part of these terms, you must not use our services.</p>
    </Section>

    <Section number="2" title="Service Description">
      <p>Tax Zilla Consultancy provides professional services including but not limited to:</p>
      <BulletList items={[
        'Income Tax and Sales Tax registration and filing.',
        'Corporate registration and secretarial services (SECP).',
        'Audit assistance and legal representation before tax authorities.',
        'Business compliance and advisory services.',
        'International tax services (UAE, USA, Saudi Arabia).',
      ]} />
      <p className="mt-3">We act as your authorized representatives (Intermediaries) based on the specific scope of work agreed upon in our engagement letter or confirmed via email/WhatsApp.</p>
    </Section>

    <Section number="3" title="Client Responsibilities">
      <p>To ensure accurate and timely service, you agree to:</p>
      <BulletList items={[
        'Provide accurate, complete, and authentic documents and information.',
        'Disclose all relevant financial facts and income sources.',
        'Respond promptly to our queries and requests for information.',
        'Pay government challans and fees directly or reimburse us immediately upon request.',
      ]} />
      <Warning>We are not responsible for any penalties, fines, or legal consequences resulting from false, misleading, or incomplete information provided by you.</Warning>
    </Section>

    <Section number="4" title="Fees & Payment Terms">
      <p>Service charges are determined based on the complexity of the case and scope of work.</p>
      <BulletList items={[
        'Billing: Invoices will be issued upon agreement of service.',
        'Payment Terms: 50% advance payment is required for most services, with the balance due upon completion.',
        'Government Fees: All government taxes, challan fees, and regulatory charges are separate from our professional fees and must be borne by the client.',
        'Late Payment: We reserve the right to withhold final deliverables or filing confirmations until full payment is received.',
      ]} />
    </Section>

    <Section number="5" title="Limitation of Liability">
      <p>Tax Zilla Consultancy strives for excellence, but we cannot guarantee specific outcomes as final decisions rest with government authorities. To the fullest extent permitted by law:</p>
      <BulletList items={[
        'We shall not be liable for indirect, incidental, or consequential damages.',
        'Our total liability for any claim shall not exceed the professional fees paid for the specific service in dispute.',
        'We are not liable for system errors or downtimes of government portals (FBR/SECP).',
      ]} />
    </Section>

    <Section number="6" title="Intellectual Property Rights">
      <p>All content, reports, and advisory documents prepared by us remain the intellectual property of Tax Zilla Consultancy until full payment is received. You are granted a non-exclusive license to use these documents for your business compliance purposes only.</p>
    </Section>

    <Section number="7" title="Confidentiality">
      <p>Both parties agree to keep all non-public information confidential. We will not disclose your sensitive data to third parties except as required by law or necessary for the performance of our services (e.g., filings with FBR).</p>
    </Section>

    <Section number="8" title="Termination of Services">
      <p>Either party may terminate the engagement with written notice.</p>
      <BulletList items={[
        'By Client: You may terminate services at any time. You will be liable to pay for all work completed up to the date of termination.',
        'By Us: We may terminate services if you fail to cooperate, provide fraudulent information, or fail to pay fees.',
      ]} />
    </Section>

    <Section number="9" title="Dispute Resolution">
      <p>Any disputes arising from these terms shall first be attempted to be resolved through amicable negotiation. If unresolved, the dispute shall be referred to arbitration in Lahore, Pakistan, in accordance with the Arbitration Act, 1940.</p>
    </Section>

    <Section number="10" title="Amendments">
      <p>We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting on this website. Continued use of our services constitutes acceptance of the modified terms.</p>
    </Section>

    <Section number="11" title="Governing Law">
      <p>These Terms & Conditions are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan. The courts of Lahore shall have exclusive jurisdiction over any disputes.</p>
    </Section>

    <Section number="12" title="Contact Information">
      <p>For any questions regarding these terms:</p>
      <ContactCard />
    </Section>
  </LegalLayout>
);

/* ══════════════════════════════════════════════
   DISCLAIMER
══════════════════════════════════════════════ */
export const DisclaimerPage = () => (
  <LegalLayout title="Disclaimer" lastUpdated="January 19, 2026" badge="Legal Notice · Pakistan" pageIcon={AlertTriangle}>
    <NoticeBox>
      <strong>Important Notice:</strong> The information provided on this website does not constitute legal or financial advice and should not be relied upon as a substitute for professional consultation tailored to your specific circumstances.
    </NoticeBox>

    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-10 pb-8 border-b border-gray-100">
      <strong className="text-gray-900">Tax Zilla Consultancy</strong> makes every effort to provide accurate and up-to-date information. However, tax and legal matters in Pakistan are complex and subject to frequent amendment. Please read this disclaimer carefully before relying on any information from this website.
    </p>

    <Section number="1" title="Professional Advice Disclaimer">
      <p>The content on the Tax Zilla Consultancy website is for general informational purposes only. While we specialise in tax and corporate law, reading this information does not create a consultant-client relationship. You should not act upon this information without seeking professional advice tailored to your specific facts and circumstances.</p>
    </Section>

    <Section number="2" title="Regulatory Compliance">
      <p>Our services aim to assist clients in complying with:</p>
      <BulletList items={[
        'Income Tax Ordinance, 2001',
        'Sales Tax Act, 1990',
        'Companies Act, 2017',
        'Provincial Sales Tax Acts (PRA, SRB, KPRA, BRA)',
        'UAE VAT Law and Corporate Tax Law',
        'US IRS Regulations (for USA LLC services)',
        'ZATCA Regulations (for Saudi Arabia services)',
      ]} />
      <p className="mt-3">Interpretations of these laws can vary, and regulatory bodies (FBR, SECP) may change their policies. We advise based on current statutes and prevailing practices.</p>
    </Section>

    <Section number="3" title="No Guarantee of Results">
      <p>While we employ our full expertise to achieve the best possible outcomes, Tax Zilla Consultancy <strong>does not guarantee</strong> specific results, such as a specific tax refund amount, waiver of penalties, or successful audit defence. Outcomes depend on the merits of the case and the discretion of the relevant authorities.</p>
    </Section>

    <Section number="4" title="Client Responsibility">
      <p>The client is ultimately responsible for the accuracy of financial data provided to us and for the final tax returns filed. We prepare returns based solely on the information you provide. You bear the sole responsibility for any decisions made based on our advice or the content of this website.</p>
    </Section>

    <Section number="5" title="Accuracy of Information">
      <p>We make every effort to ensure information on our website is accurate and up-to-date. However, tax laws in Pakistan change frequently — often via annual Finance Acts. We make no representations or warranties of any kind about the completeness, accuracy, reliability, or suitability of the information on this website.</p>
    </Section>

    <Section number="6" title="Third-Party Links">
      <p>This website may contain links to external websites (e.g., FBR IRIS, SECP portals). These links are provided for convenience only. We have no control over the content and availability of those sites and accept no responsibility for them or any loss you may suffer from using them.</p>
    </Section>

    <Section number="7" title="Limitation of Liability">
      <p>In no event will Tax Zilla Consultancy be liable for any loss or damage — including without limitation, indirect or consequential loss or damage, or any loss or damage arising from loss of data or profits — arising out of, or in connection with, the use of this website or our services.</p>
    </Section>

    <Section number="8" title="Professional Consultation Required">
      <p>Tax matters are highly technical. Laws such as the Income Tax Ordinance 2001 are complex and subject to frequent amendments. We strongly urge you to book a formal consultation with our team before taking significant financial actions or filing statutory returns.</p>
    </Section>

    <Section number="9" title="Jurisdiction">
      <p>This disclaimer is governed by the laws of Pakistan. Any legal action or proceeding related to this website or our services shall be brought exclusively in the courts of Lahore, Pakistan.</p>
    </Section>

    <Section number="10" title="Contact for Clarifications">
      <p>If you require clarification on any point in this disclaimer, please contact us directly:</p>
      <ContactCard />
    </Section>
  </LegalLayout>
);
