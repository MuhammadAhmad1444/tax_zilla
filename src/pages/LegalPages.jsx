import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';

const LegalLayout = ({ title, lastUpdated, children }) => (
  <>
    <Helmet>
      <title>{title} - Tax Zilla Consultancy</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <section className="pt-32 pb-16 bg-gray-50 min-h-screen print:bg-white print:pt-0">
      <div className="container-custom max-w-4xl">
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center mb-8 print:hidden">
          <Link to="/" className="flex items-center text-gray-600 hover:text-[var(--color-gold)] transition-colors">
            <ArrowLeft size={18} className="mr-2" /> Back to Home
          </Link>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 transition-all shadow-sm"
          >
            <Printer size={18} /> Print
          </button>
        </div>

        {/* Document Content */}
        <div className="bg-white p-8 md:p-16 rounded-xl shadow-lg border-t-4 border-[var(--color-gold)] print:shadow-none print:border-none print:p-0">
          <div className="mb-10 border-b border-gray-100 pb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--color-dark-blue)]" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h1>
            <p className="text-gray-500 italic">Last Updated: {lastUpdated}</p>
          </div>
          
          <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
            {children}
          </div>

          {/* Legal Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap gap-4 text-sm print:hidden">
             <Link to="/legal/privacy-policy" className="text-[var(--color-dark-blue)] hover:text-[var(--color-gold)] font-medium">Privacy Policy</Link>
             <span className="text-gray-300">|</span>
             <Link to="/legal/terms-conditions" className="text-[var(--color-dark-blue)] hover:text-[var(--color-gold)] font-medium">Terms & Conditions</Link>
             <span className="text-gray-300">|</span>
             <Link to="/legal/disclaimer" className="text-[var(--color-dark-blue)] hover:text-[var(--color-gold)] font-medium">Disclaimer</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

const Section = ({ title, children }) => (
  <div className="mb-8 break-inside-avoid">
    <h3 className="text-xl md:text-2xl font-bold mb-4 text-[var(--color-dark-blue)] flex items-center gap-2">
      {title}
    </h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

export const PrivacyPolicyPage = () => (
  <LegalLayout title="Privacy Policy" lastUpdated="January 19, 2026">
    <p className="font-medium text-xl text-gray-800 mb-6">
      Tax Zilla Consultancy ("we", "our", "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy outlines our practices regarding data collection, use, and protection in compliance with the laws of Pakistan.
    </p>

    <Section title="1. Information Collection">
      <p>We collect personal information necessary to provide professional tax and legal services. This may include:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Personal Identity Information:</strong> Name, CNIC, Passport details, and photographs.</li>
        <li><strong>Contact Information:</strong> Mailing address, email address, and phone numbers.</li>
        <li><strong>Financial Information:</strong> Bank statements, income records, asset details, and expense proofs.</li>
        <li><strong>Business Information:</strong> Company registration documents, NTN/STRN certificates, and financial statements.</li>
        <li><strong>Authentication Data:</strong> FBR Iris portal credentials and other regulatory login details provided by you for filing purposes.</li>
      </ul>
    </Section>

    <Section title="2. Use of Information">
      <p>Your information is used strictly for the following purposes:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Preparation and filing of Income Tax and Sales Tax returns with the Federal Board of Revenue (FBR).</li>
        <li>Company incorporation and compliance filings with the Securities and Exchange Commission of Pakistan (SECP).</li>
        <li>Responding to legal notices and audit proceedings on your behalf.</li>
        <li>Communicating important regulatory updates, tax deadlines, and service-related information.</li>
        <li>Internal record keeping and client management.</li>
      </ul>
    </Section>

    <Section title="3. Data Security & Protection">
      <p>We implement robust security measures to safeguard your sensitive data:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Encryption:</strong> Digital records are stored in encrypted environments.</li>
        <li><strong>Access Control:</strong> Only authorized personnel handling your case have access to your data.</li>
        <li><strong>Physical Security:</strong> Physical documents are stored in secure, locked facilities with restricted access.</li>
        <li><strong>Network Security:</strong> We use firewalls and secure protocols for digital communication.</li>
      </ul>
    </Section>

    <Section title="4. Client Confidentiality">
      <p>
        As professional consultants, we adhere to strict standards of client confidentiality. We do not discuss your financial affairs with unauthorized third parties. All employees and consultants at Tax Zilla adhere to non-disclosure agreements regarding client information.
      </p>
    </Section>

    <Section title="5. Third-Party Sharing">
      <p>We do not sell or rent your personal information. Data is shared only when necessary with:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Government Authorities:</strong> FBR, SECP, PRA, and other regulatory bodies strictly for compliance purposes mandated by law.</li>
        <li><strong>Legal Counsel:</strong> If specialized legal representation is required for your case.</li>
        <li><strong>Service Providers:</strong> Secure cloud storage or software providers who assist in our operations (bound by confidentiality).</li>
      </ul>
    </Section>

    <Section title="6. Data Retention">
      <p>
        We retain your personal and financial data for as long as necessary to fulfill the purposes outlined in this policy or as required by Pakistan's tax laws (which typically require record retention for up to 6 years). Upon termination of services, data may be archived securely or destroyed as per your request, subject to legal retention obligations.
      </p>
    </Section>

    <Section title="7. User Rights">
      <p>Under applicable data protection principles, you have the right to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Request access to the personal data we hold about you.</li>
        <li>Request correction of any inaccurate or incomplete information.</li>
        <li>Request deletion of your data, subject to our legal obligations to maintain records for tax authorities.</li>
        <li>Withdraw consent for optional communications at any time.</li>
      </ul>
    </Section>

    <Section title="8. Cookies & Tracking">
      <p>
        Our website may use cookies to enhance user experience and analyze site traffic. These cookies do not collect sensitive personal or financial information. You can choose to disable cookies through your browser settings, though this may affect website functionality.
      </p>
    </Section>

    <Section title="9. Compliance with Pakistan Laws">
      <p>
        This Privacy Policy is governed by the laws of Pakistan, including the Electronic Transactions Ordinance 2002 and relevant provisions of the Prevention of Electronic Crimes Act (PECA) 2016 regarding data privacy.
      </p>
    </Section>

    <Section title="10. Contact for Privacy Concerns">
      <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us:</p>
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-4">
        <p><strong>Email:</strong> taxzilla41@gmail.com</p>
        <p><strong>Phone:</strong> +92 339 9993308</p>
        <p><strong>Address:</strong> 7A, Malik Park Main Street, Main Canal Road, Mughalpura, Lahore, Pakistan</p>
      </div>
    </Section>
  </LegalLayout>
);

export const TermsConditionsPage = () => (
  <LegalLayout title="Terms & Conditions" lastUpdated="January 19, 2026">
    <p className="font-medium text-xl text-gray-800 mb-6">
      Welcome to Tax Zilla Consultancy. By accessing our website or engaging our services, you agree to comply with and be bound by the following Terms and Conditions.
    </p>

    <Section title="1. Acceptance of Terms">
      <p>
        By using our services, you acknowledge that you have read, understood, and agreed to these Terms & Conditions. If you do not agree with any part of these terms, you must not use our services.
      </p>
    </Section>

    <Section title="2. Service Description">
      <p>Tax Zilla Consultancy provides professional services including but not limited to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Income Tax and Sales Tax registration and filing.</li>
        <li>Corporate registration and secretarial services (SECP).</li>
        <li>Audit assistance and legal representation before tax authorities.</li>
        <li>Business compliance and advisory services.</li>
      </ul>
      <p className="mt-2">
        We act as your authorized representatives (Intermediaries) based on the specific scope of work agreed upon in our engagement letter or verbal agreement confirmed via email/text.
      </p>
    </Section>

    <Section title="3. Client Responsibilities">
      <p>To ensure accurate and timely service, you agree to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Provide accurate, complete, and authentic documents and information.</li>
        <li>Disclose all relevant financial facts and income sources.</li>
        <li>Respond promptly to our queries and requests for information.</li>
        <li>Pay government challans and fees directly or reimburse us immediately upon request.</li>
      </ul>
      <p className="mt-2 text-red-600 italic">
        We are not responsible for any penalties, fines, or legal consequences resulting from false, misleading, or incomplete information provided by you.
      </p>
    </Section>

    <Section title="4. Fees & Payment Terms">
      <p>
        Service charges are determined based on the complexity of the case and scope of work.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Billing:</strong> Invoices will be issued upon agreement of service.</li>
        <li><strong>Payment Terms:</strong> 50% advance payment is required for most services, with the balance due upon completion/filing.</li>
        <li><strong>Government Fees:</strong> All government taxes, challan fees, and regulatory charges are separate from our professional fees and must be borne by the client.</li>
        <li><strong>Late Payment:</strong> We reserve the right to withhold final deliverables or filing confirmations until full payment is received.</li>
      </ul>
    </Section>

    <Section title="5. Limitation of Liability">
      <p>
        Tax Zilla Consultancy strives for excellence, but we cannot guarantee specific outcomes in tax or legal matters as final decisions rest with government authorities. To the fullest extent permitted by law:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>We shall not be liable for indirect, incidental, or consequential damages.</li>
        <li>Our total liability for any claim shall not exceed the professional fees paid by you for the specific service in dispute.</li>
        <li>We are not liable for system errors or downtimes of government portals (FBR/SECP).</li>
      </ul>
    </Section>

    <Section title="6. Intellectual Property Rights">
      <p>
        All content, reports, and advisory documents prepared by us remain the intellectual property of Tax Zilla Consultancy until full payment is received. You are granted a non-exclusive license to use these documents for your business compliance purposes.
      </p>
    </Section>

    <Section title="7. Confidentiality">
      <p>
        Both parties agree to keep all non-public information confidential. We will not disclose your sensitive data to third parties except as required by law or necessary for the performance of our services (e.g., filings with FBR).
      </p>
    </Section>

    <Section title="8. Termination of Services">
      <p>
        Either party may terminate the engagement with written notice.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>By Client:</strong> You may terminate services at any time. You will be liable to pay for all work completed up to the date of termination.</li>
        <li><strong>By Us:</strong> We may terminate services if you fail to cooperate, provide fraudulent information, or fail to pay fees.</li>
      </ul>
    </Section>

    <Section title="9. Dispute Resolution">
      <p>
        Any disputes arising from these terms shall first be attempted to be resolved through amicable negotiation. If unresolved, the dispute shall be referred to arbitration in Lahore, Pakistan, in accordance with the Arbitration Act, 1940.
      </p>
    </Section>

    <Section title="10. Amendments">
      <p>
        We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting on this website. Continued use of our services constitutes acceptance of the modified terms.
      </p>
    </Section>

    <Section title="11. Governing Law">
      <p>
        These Terms & Conditions are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan. The courts of Lahore shall have exclusive jurisdiction.
      </p>
    </Section>

    <Section title="12. Contact Information">
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <p><strong>Tax Zilla Consultancy</strong></p>
        <p>7A, Malik Park Main Street, Main Canal Road, Mughalpura, Lahore, Pakistan</p>
        <p>Email: taxzilla41@gmail.com</p>
      </div>
    </Section>
  </LegalLayout>
);

export const DisclaimerPage = () => (
  <LegalLayout title="Disclaimer" lastUpdated="January 19, 2026">
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
      <p className="text-yellow-800 font-medium text-lg">
        <strong>Important Notice:</strong> The information provided on this website does not constitute legal or financial advice and should not be relied upon as a substitute for professional consultation.
      </p>
    </div>

    <Section title="1. Professional Advice Disclaimer">
      <p>
        The content on the Tax Zilla Consultancy website is for general informational purposes only. While we specialize in tax and corporate law, reading this information does not create a consultant-client relationship. You should not act upon this information without seeking advice from a professional accountant or legal expert tailored to your specific facts and circumstances.
      </p>
    </Section>

    <Section title="2. Regulatory Compliance">
      <p>
        Our services aim to assist clients in complying with:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Income Tax Ordinance, 2001</li>
        <li>Sales Tax Act, 1990</li>
        <li>Companies Act, 2017</li>
        <li>Provincial Sales Tax Acts (PRA, SRB, etc.)</li>
      </ul>
      <p className="mt-2">
        Interpretations of these laws can vary, and regulatory bodies (FBR, SECP) may change their policies. We advise based on the current statutes and prevailing practices.
      </p>
    </Section>

    <Section title="3. No Guarantee of Results">
      <p>
        While we employ our expertise to achieve the best possible outcomes for our clients, Tax Zilla Consultancy <strong>does not guarantee</strong> specific results, such as a specific amount of tax refund, waiver of penalties, or successful audit defense. Outcomes depend on the merits of the case and the discretion of the relevant authorities.
      </p>
    </Section>

    <Section title="4. Client Responsibility">
      <p>
        The client is ultimately responsible for the accuracy of the financial data provided to us and for the final tax returns filed. We prepare returns based on the information you provide. You bear the sole responsibility for any decisions you make based on our advice or the content of this website.
      </p>
    </Section>

    <Section title="5. Accuracy of Information">
      <p>
        We make every effort to ensure the information on our website is accurate and up-to-date. However, tax laws in Pakistan change frequently. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information contained on the website.
      </p>
    </Section>

    <Section title="6. Third-Party Links">
      <p>
        This website may contain links to external websites (e.g., FBR, SECP portals). These links are provided for convenience only. We have no control over the nature, content, and availability of those sites and accept no responsibility for them.
      </p>
    </Section>

    <Section title="7. Limitation of Liability">
      <p>
        In no event will Tax Zilla Consultancy be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
      </p>
    </Section>

    <Section title="8. Professional Consultation Required">
      <p>
        Tax matters are highly technical. Laws such as the Income Tax Ordinance 2001 are complex and subject to frequent amendments (Finance Acts). We strongly urge you to book a formal consultation with our team before taking significant financial actions or filing statutory returns.
      </p>
    </Section>

    <Section title="9. Jurisdiction">
      <p>
        This disclaimer is governed by the laws of Pakistan. Any legal action or proceeding related to this website or our services shall be brought exclusively in the courts of Lahore, Pakistan.
      </p>
    </Section>

    <Section title="10. Contact for Clarifications">
      <p>If you require clarification on any point mentioned in this disclaimer, please contact us:</p>
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-4">
        <p><strong>Email:</strong> taxzilla41@gmail.com</p>
        <p><strong>Phone:</strong> +92 339 9993308</p>
      </div>
    </Section>
  </LegalLayout>
);