import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'services' | 'tax-calculators' | 'legal' | null

  const location = useLocation();
  const taxMenuWrapperRef = useRef(null);
  const searchParams = new URLSearchParams(location.search);
  const activeCalc = searchParams.get('calc');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close the tax mega-menu when user clicks outside it.
  useEffect(() => {
    if (openDropdown !== 'tax-calculators') return;

    const onDocMouseDown = (e) => {
      const el = taxMenuWrapperRef.current;
      if (!el) return;
      if (el.contains(e.target)) return;
      setOpenDropdown(null);
    };

    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [openDropdown]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Process', path: '/our-process' },
    { name: 'Industries', path: '/industries' },
    { name: 'Services', path: '/services' }, 
    { name: 'Tax Calculators 2025-2026', path: '/pakistan-tax-calculators' },
    { name: 'Resources', path: '/resources' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) =>
    location.pathname === path ||
    (path !== '/' && location.pathname === `${path}/`);

  const isTaxCalculatorsActive = () =>
    location.pathname === '/pakistan-tax-calculators' ||
    location.pathname === '/pakistan-tax-calculators/';

  const isCalcActive = (id) => isTaxCalculatorsActive() && activeCalc === id;

  const TaxCalculatorsMegaMenu = () => (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-[calc(100%_+_14px)] w-[980px] max-w-[95vw] bg-white border border-gray-100 rounded-2xl shadow-2xl p-6"
      role="menu"
      aria-label="Tax Calculators 2025-2026 menu"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="text-[var(--color-gold)] font-extrabold mb-3 border-b border-gray-100 pb-3">
            Verification & Essentials
          </div>
          <div className="flex flex-col">
            <Link
              to="/pakistan-tax-calculators?calc=pta"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('pta')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Pta Tax Calculator
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=zakat"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('zakat')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Zakat Tax Calculator
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=fbr-online"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('fbr-online')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              FBR Online Verifications
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=value-added-tax"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('value-added-tax')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Supply of Goods Tax Calculator
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=agri-land-punjab"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('agri-land-punjab')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Tax On Agricultural Land – Punjab
            </Link>
          </div>
        </div>

        <div>
          <div className="text-[var(--color-gold)] font-extrabold mb-3 border-b border-gray-100 pb-3">
            Capital Gains & Withholding
          </div>
          <div className="flex flex-col">
            <Link
              to="/pakistan-tax-calculators?calc=gain-securities"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('gain-securities')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Gain Tax on Securities
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=gain-mutual-funds"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('gain-mutual-funds')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Gain Tax on Mutual Fund
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=gain-properties"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('gain-properties')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Gain Tax on Properties
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=withholding-income-properties"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('withholding-income-properties')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Withholding Tax on Income from Properties
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=withholding-brokerage-commission"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('withholding-brokerage-commission')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Withholding Tax On Brokerage &amp; Commission Tax Calculator
            </Link>
          </div>
        </div>

        <div>
          <div className="text-[var(--color-gold)] font-extrabold mb-3 border-b border-gray-100 pb-3">
            Income & Business Calculators
          </div>
          <div className="flex flex-col">
            <Link
              to="/pakistan-tax-calculators?calc=salary"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('salary')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Pakistan Salary Tax Calculator
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=business"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('business')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Pakistan Business Tax Calculator
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=freelancer"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('freelancer')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Pakistan Freelancer Tax Calculator
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=super-tax"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('super-tax')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Super Tax On Annual Income
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=company-income"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('company-income')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Tax on Annual Income of Companies
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=builder"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('builder')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Pakistan Builder Tax Calculator
            </Link>
            <Link
              to="/pakistan-tax-calculators?calc=developer"
              className={`block text-[13px] font-semibold py-2 border-b border-gray-100 transition-all ${
                isCalcActive('developer')
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10 pl-2'
                  : 'text-gray-700 hover:text-black hover:pl-1'
              }`}
              onClick={() => setOpenDropdown(null)}
            >
              Pakistan Developer Tax Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[var(--color-dark-blue)] shadow-2xl py-2' : 'bg-black/90 backdrop-blur-md py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-white">Tax </span>
              <span className="text-gradient-gold">Zilla</span>
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-6">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="relative group"
                ref={item.path === '/pakistan-tax-calculators' ? taxMenuWrapperRef : null}
              >
                {item.path === '/pakistan-tax-calculators' ? (
                  <>
                    <Link
                      to="/pakistan-tax-calculators"
                      className="flex items-center"
                      onMouseEnter={() => setOpenDropdown('tax-calculators')}
                      onFocus={() => setOpenDropdown('tax-calculators')}
                      onClick={(e) => {
                        setOpenDropdown(null);
                      }}
                    >
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isTaxCalculatorsActive()
                            ? 'text-[var(--color-gold)]'
                            : 'text-white hover:text-[var(--color-gold)]'
                        }`}
                      >
                        {item.name}
                      </span>
                      <ChevronDown size={14} className="ml-1 text-[var(--color-gold)]/70 group-hover:text-[var(--color-gold)] transition-colors" />
                    </Link>

                    {openDropdown === 'tax-calculators' ? <TaxCalculatorsMegaMenu /> : null}
                  </>
                ) : (
                  <Link to={item.path} className="relative group">
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isActive(item.path)
                          ? 'text-[var(--color-gold)]'
                          : 'text-white hover:text-[var(--color-gold)]'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span
                      className={`absolute bottom-[-4px] left-0 w-full h-0.5 bg-[var(--color-gold)] transform origin-left transition-transform duration-300 ${
                        isActive(item.path)
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden text-white p-2 hover:text-[var(--color-gold)] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-[var(--color-dark-blue)] border-t border-[var(--color-gold)]/20 overflow-hidden absolute w-full"
          >
            <div className="container-custom py-4 space-y-2 h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-[var(--color-gold)] text-black font-semibold'
                      : 'text-white hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-white/10 my-4 pt-4">
                <p className="text-xs text-gray-400 px-4 mb-2 uppercase">Legal</p>
                <Link to="/legal/privacy-policy" className="block py-2 px-4 text-sm text-gray-300 hover:text-white">Privacy Policy</Link>
                <Link to="/legal/terms-conditions" className="block py-2 px-4 text-sm text-gray-300 hover:text-white">Terms & Conditions</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;