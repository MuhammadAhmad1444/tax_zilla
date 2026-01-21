import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import SocialMediaLinks from './SocialMediaLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-dark-blue)] text-white border-t-4 border-[var(--color-gold)]">
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="text-white">Tax </span>
              <span className="text-gradient-gold">Zilla</span>
            </h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Tax Zilla Consultancy is your premier partner for tax and legal solutions in Pakistan. We specialize in FBR compliance, SECP registration, and corporate legal advisory.
            </p>
            <SocialMediaLinks variant="footer" iconSize={18} />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--color-gold)] mb-6 font-heading">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-white hover:pl-2 transition-all">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white hover:pl-2 transition-all">About Us</Link></li>
              <li><Link to="/why-choose-us" className="text-gray-300 hover:text-white hover:pl-2 transition-all">Why Choose Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white hover:pl-2 transition-all">Contact Us</Link></li>
              <li><Link to="/legal/privacy-policy" className="text-gray-300 hover:text-white hover:pl-2 transition-all">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--color-gold)] mb-6 font-heading">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services/income-tax" className="text-gray-300 hover:text-white hover:pl-2 transition-all">Income Tax Filing</Link></li>
              <li><Link to="/services/ntn-registration" className="text-gray-300 hover:text-white hover:pl-2 transition-all">NTN Registration</Link></li>
              <li><Link to="/services/sales-tax" className="text-gray-300 hover:text-white hover:pl-2 transition-all">Sales Tax Returns</Link></li>
              <li><Link to="/services/company-registration" className="text-gray-300 hover:text-white hover:pl-2 transition-all">Company Registration</Link></li>
              <li><Link to="/services/audit-assistance" className="text-gray-300 hover:text-white hover:pl-2 transition-all">Audit Assistance</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--color-gold)] mb-6 font-heading">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[var(--color-gold)] mt-1 flex-shrink-0" />
                <span className="text-gray-300">7A, Malik Park Main Street, Main Canal Road, Mughalpura, Lahore, Pakistan</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[var(--color-gold)] mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+923399993308" className="text-gray-300 hover:text-white">+92 339 9993308</a>
                  <a href="tel:+923009860279" className="text-gray-300 hover:text-white">+92 300 9860279</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[var(--color-gold)] mt-1 flex-shrink-0" />
                <a href="mailto:taxzilla41@gmail.com" className="text-gray-300 hover:text-white">taxzilla41@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-[var(--color-gold)] mt-1 flex-shrink-0" />
                <div className="flex flex-col text-gray-300">
                  <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
                  <span>Sat: 10:00 AM - 2:00 PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-6 border-t border-gray-800">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {currentYear} Tax Zilla Consultancy. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs text-center md:text-right">
            All services are provided in accordance with Pakistan laws and FBR regulations.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link to="/legal/privacy-policy" className="hover:text-[var(--color-gold)] transition-colors">Privacy</Link>
            <Link to="/legal/terms-conditions" className="hover:text-[var(--color-gold)] transition-colors">Terms</Link>
            <Link to="/legal/disclaimer" className="hover:text-[var(--color-gold)] transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;