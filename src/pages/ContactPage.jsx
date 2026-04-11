import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import ContactForm from '@/components/ContactForm';
import SocialMediaLinks from '@/components/SocialMediaLinks';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL } from '../lib/motion.js';

const ContactPage = () => {
  const { reduce, hero } = usePageMotion();
  return (
    <>
      <Helmet>
        <title>Contact Us - Tax Zilla Consultancy</title>
        <meta name="description" content="Contact Tax Zilla Consultancy in Lahore. Phone: +92 339 9993308. Address: 7A, Malik Park Main Street, Main Canal Road, Mughalpura." />
      </Helmet>

      <section className="relative overflow-hidden bg-brand-dark px-2 pb-16 pt-28 text-center text-white dark-section sm:pb-20 sm:pt-32">
        <div className="absolute inset-0 bg-brand-overlay opacity-80" />
        <motion.div className="container-custom relative z-10" {...hero}>
          <h1 className="px-2 text-3xl font-bold mb-4 sm:text-4xl md:text-5xl break-words" style={{ fontFamily: 'var(--font-heading)' }}>Get in Touch</h1>
          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE_OUT, delay: reduce ? 0 : 0.12 }}
            className="text-xl text-on-dark-muted"
          >
            We are here to assist you with professional tax and legal advice
          </motion.p>
        </motion.div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            <motion.div
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_REVEAL}
              transition={{ duration: reduce ? 0.01 : 0.5, ease: EASE_OUT }}
            >
              <SectionHeading title="Send us a Message" subtitle="Fill out the form below for a quick consultation" centered={false} />
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_REVEAL}
              transition={{ duration: reduce ? 0.01 : 0.5, ease: EASE_OUT, delay: reduce ? 0 : 0.08 }}
            >
              <SectionHeading title="Contact Information" subtitle="Visit our office or call us directly" centered={false} />
              
              <div className="card-surface p-8 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--color-gold)] p-3 rounded-full text-white">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Phone Numbers</h3>
                    <p><a href="tel:+923399993308" className="text-gray-600 hover:text-[var(--color-dark-blue)]">+92 339 9993308</a></p>
                    <p><a href="tel:+923009860279" className="text-gray-600 hover:text-[var(--color-dark-blue)]">+92 300 9860279</a></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[var(--color-gold)] p-3 rounded-full text-white">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email Address</h3>
                    <p><a href="mailto:taxzilla41@gmail.com" className="text-gray-600 hover:text-[var(--color-dark-blue)]">taxzilla41@gmail.com</a></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[var(--color-gold)] p-3 rounded-full text-white">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Office Address</h3>
                    <p className="text-gray-600">7A, Malik Park Main Street, Main Canal Road, Mughalpura, Lahore, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[var(--color-gold)] p-3 rounded-full text-white">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Business Hours</h3>
                    <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sat: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="mt-8 card-surface p-8">
                <h3 className="font-bold text-xl mb-6 font-heading text-[var(--color-dark-blue)]">Connect With Us</h3>
                <SocialMediaLinks variant="contact" />
              </div>

              {/* Google Map */}
              <div className="mt-8 h-56 min-h-[14rem] overflow-hidden rounded-xl border border-gray-200 shadow-lg sm:h-64 md:h-72">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.916362576402!2d74.3725713!3d31.5265217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905001c2957b9%3A0x6b80140226493a7!2sTax%20Zilla%20Consultancy!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Tax Zilla Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;