import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Button from './Button';
import { useToast } from './ui/use-toast';

const ContactForm = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const services = [
    'Income Tax Filing (Individuals & Businesses)',
    'NTN Registration & FBR Profile Setup',
    'Sales Tax Registration & Returns',
    'Company Registration (SECP)',
    'Business Compliance & Annual Filings',
    'Audit Assistance & Tax Representation',
    'Freelancers & SMEs Tax Consultancy'
  ];

  // Pre-select service from navigation state
  useEffect(() => {
    if (location.state && location.state.service) {
      setFormData(prev => ({
        ...prev,
        service: location.state.service
      }));
    }
  }, [location.state]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        phone_number: formData.phone,
        service_interested: formData.service,
        message: formData.message,
        sent_time: new Date().toLocaleString(),
        to_name: "Tax Zilla Consultancy"
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      toast({
        title: "Consultation Request Sent!",
        description: "Thank you for contacting Tax Zilla Consultancy. We will review your request and contact you shortly.",
      });
      
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your request. Please try again later or contact us directly by phone.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="rounded-xl border-t-4 border-[var(--color-gold)] bg-white p-5 shadow-2xl sm:p-8 md:p-10"
    >
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            } focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-gray-50 text-gray-900`}
            placeholder="Muhammad Ali"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-gray-50 text-gray-900`}
            placeholder="ali@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            } focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-gray-50 text-gray-900`}
            placeholder="+92 300 1234567"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
            Service Inquiry *
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.service ? 'border-red-500' : 'border-gray-300'
            } focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-gray-50 text-gray-900`}
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          {errors.service && (
            <p className="text-red-500 text-xs mt-1">{errors.service}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            } focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all resize-none bg-gray-50 text-gray-900`}
            placeholder="Please describe your tax or legal requirements..."
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full flex items-center justify-center gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"
            />
            Sending...
          </>
        ) : (
          <>
            <Send size={20} />
            Book Consultation
          </>
        )}
      </Button>
    </motion.form>
  );
};

export default ContactForm;