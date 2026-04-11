import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL } from '../lib/motion.js';

const faqsData = [
  {
    category: "FBR Filing",
    items: [
      { q: "Who is required to file an income tax return in Pakistan?", a: "Every citizen with an annual income exceeding Rs. 600,000, owners of motor vehicles above 1000cc, property owners of 500 sq yards or more, and commercial connection holders with bills exceeding defined limits are required to file returns." },
      { q: "What is the deadline for filing income tax returns?", a: "Typically, the deadline is September 30th each year for salaried individuals and businesses. However, FBR often extends this date. It is best to file early to avoid surcharges." },
      { q: "Can I file my return if I have missed the deadline?", a: "Yes, you can file a late return, but you may be subject to a penalty surcharge for late filing to appear on the Active Taxpayer List (ATL)." },
      { q: "What happens if I don't file my tax return?", a: "Non-filers face higher withholding tax rates on banking transactions, vehicle purchases, and property transfers. FBR may also issue notices and impose penalties." },
      { q: "Do I need to declare my foreign assets?", a: "Yes, resident individuals are required to declare all foreign assets and income in their wealth statement under the Income Tax Ordinance, 2001." }
    ]
  },
  {
    category: "NTN Registration",
    items: [
      { q: "How long does it take to get an NTN?", a: "NTN registration is usually processed instantly or within 24 hours through the FBR Iris portal once the correct information is submitted." },
      { q: "What documents are required for NTN registration?", a: "For individuals: CNIC, mobile number registered in your name, and email address. For businesses: Rental agreement/ownership proof of premises and utility bill." },
      { q: "Is NTN mandatory for opening a business bank account?", a: "Yes, banks in Pakistan require a valid NTN and proof of business registration to open a corporate or business bank account." }
    ]
  },
  {
    category: "Company Registration",
    items: [
      { q: "What is the difference between Sole Proprietorship and Private Limited?", a: "Sole Proprietorship is simple to start but has unlimited liability. Private Limited is a separate legal entity with limited liability, better for raising capital and credibility." },
      { q: "How long does SECP company registration take?", a: "With our assistance, company incorporation can often be completed within 3-5 working days, provided all documents and name availability are cleared." },
      { q: "Do I need a physical office address for company registration?", a: "Yes, you must provide a valid physical address for the registered office. SECP may verify this address." }
    ]
  },
  {
    category: "Sales Tax",
    items: [
      { q: "Who needs to register for Sales Tax (GST)?", a: "Manufacturers, importers, wholesalers, and service providers (PRA/SRB) with turnover exceeding specific thresholds must register for Sales Tax." },
      { q: "Do freelancers need to pay sales tax?", a: "IT export services are often exempt (or taxed at 0%) subject to specific conditions. Local services may be subject to Provincial Sales Tax (e.g., PRA in Punjab)." }
    ]
  },
  {
    category: "General Tax",
    items: [
      { q: "What is the difference between Filer and Non-Filer?", a: "A Filer is someone listed on the Active Taxpayer List (ATL). They pay significantly lower withholding taxes on transactions compared to Non-Filers." },
      { q: "Can I revise my tax return after filing?", a: "Yes, returns can be revised within 60 days of filing with Commissioner approval, or under specific conditions laid out in the Income Tax Ordinance." }
    ]
  }
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => (
  <motion.div 
    initial={false}
    className={`border rounded-lg mb-4 overflow-hidden transition-all ${isOpen ? 'border-[var(--color-gold)] bg-gray-50' : 'border-gray-200 bg-white'}`}
  >
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[52px] w-full items-start justify-between gap-3 p-4 text-left focus:outline-none sm:items-center"
    >
      <span className={`min-w-0 flex-1 font-semibold text-base leading-snug sm:text-lg ${isOpen ? 'text-[var(--color-dark-blue)]' : 'text-gray-700'}`}>{question}</span>
      {isOpen ? <ChevronUp className="shrink-0 text-[var(--color-gold)]" size={22} /> : <ChevronDown className="shrink-0 text-gray-400" size={22} />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 pt-0 text-gray-600 border-t border-gray-100 mt-2 leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQsPage = () => {
  const { reduce, hero } = usePageMotion();
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...faqsData.map(d => d.category)];

  // Flatten for search
  const allFaqs = faqsData.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.category })));

  const filteredFaqs = searchTerm
    ? allFaqs.filter(
        item => 
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : activeCategory === "All"
    ? allFaqs
    : faqsData.find(c => c.category === activeCategory)?.items || [];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions - Tax Zilla Consultancy</title>
        <meta name="description" content="Find answers to common questions about FBR filing, NTN registration, Sales Tax, and Company Registration in Pakistan." />
      </Helmet>

      <section className="relative overflow-hidden bg-brand-dark px-2 pb-16 pt-28 text-white dark-section sm:pb-20 sm:pt-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-a1487473ffd9')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-brand-overlay opacity-75" />
        <motion.div className="container-custom relative z-10 text-center" {...hero}>
          <h1 className="px-2 text-3xl font-bold mb-6 sm:text-4xl md:text-5xl lg:text-6xl break-words" style={{ fontFamily: 'var(--font-heading)' }}>
            Frequently Asked Questions
          </h1>
          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.48, ease: EASE_OUT, delay: reduce ? 0 : 0.1 }}
            className="text-xl max-w-2xl mx-auto text-on-dark-muted mb-8"
          >
            Have questions about taxes or legal compliance? We have answers.
          </motion.p>

          <motion.div
            className="max-w-xl mx-auto relative"
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.5, ease: EASE_OUT, delay: reduce ? 0 : 0.2 }}
          >
            <input
              type="text"
              placeholder="Search for answers (e.g., 'deadline', 'ntn', 'filer')..."
              className="w-full min-h-[48px] rounded-full py-3 pl-4 pr-11 text-sm text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] sm:py-4 sm:pl-6 sm:pr-12 sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 sm:right-4" size={20} aria-hidden />
          </motion.div>
        </motion.div>
      </section>

      <section className="section-padding bg-white min-h-screen">
        <div className="container-custom">
          {/* Category Filter */}
          {!searchTerm && (
            <motion.div
              className="mb-10 flex flex-wrap justify-center gap-2 px-1 sm:gap-2"
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_REVEAL}
              transition={{ duration: reduce ? 0.01 : 0.4, ease: EASE_OUT }}
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                  className={`rounded-full px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${
                    activeCategory === cat
                      ? 'bg-[var(--color-dark-blue)] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_REVEAL}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE_OUT, delay: reduce ? 0 : 0.05 }}
          >
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                />
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>No results found for "{searchTerm}". Try a different keyword.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQsPage;