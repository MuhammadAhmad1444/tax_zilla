import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, ChevronDown, MessageSquare, AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Button from './Button';
import { useToast } from './ui/use-toast';
import { SERVICE_CATEGORIES, SERVICE_SUBSERVICES } from '../data/serviceCatalog.js';

const Field = ({ label, error, icon: FieldIcon, children }) => (
  <div>
    <label className="tz-form-label">{label}</label>
    <div className="tz-input-group">
      {FieldIcon && (
        <FieldIcon size={16} className="tz-input-icon" strokeWidth={1.9} />
      )}
      {children}
    </div>
    {error && (
      <p className="tz-form-error-msg">
        <AlertCircle size={12} strokeWidth={2.2} />
        {error}
      </p>
    )}
  </div>
);

const ContactForm = ({ defaultService }) => {
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
    'General Consultation',
    ...SERVICE_CATEGORIES.map((category) => category.title),
    ...SERVICE_SUBSERVICES.map((service) => service.title),
  ];

  useEffect(() => {
    if (location.state && location.state.service) {
      setFormData((prev) => ({ ...prev, service: location.state.service }));
      return;
    }
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }));
    }
  }, [location.state, defaultService]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone)) newErrors.phone = 'Invalid phone format';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        phone_number: formData.phone,
        service_interested: formData.service,
        message: formData.message,
        sent_time: new Date().toLocaleString(),
        to_name: 'Tax Zilla Consultancy'
      };
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast({
        title: 'Consultation Request Sent!',
        description: 'Thank you for contacting Tax Zilla Consultancy. We will review your request and contact you shortly.',
      });
      setFormData({ fullName: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error sending your request. Please try again later or contact us directly by phone.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (fieldName) =>
    `tz-form-input${errors[fieldName] ? ' has-error' : ''}`;

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl bg-white shadow-[0_4px_32px_rgba(0,0,0,0.1),0_0_0_1px_rgba(212,175,55,0.12)] overflow-hidden"
    >
      {/* Gold top bar */}
      <div
        className="h-1"
        style={{ background: 'linear-gradient(90deg, var(--color-gold-dark), var(--color-gold-light), var(--color-gold-dark))' }}
      />

      <div className="p-5 sm:p-8 md:p-10">
        <div className="grid grid-cols-1 gap-5 mb-5">

          <Field label="Full Name *" error={errors.fullName} icon={User}>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={inputClass('fullName')}
              placeholder="Muhammad Ali"
              autoComplete="name"
            />
          </Field>

          <Field label="Email Address *" error={errors.email} icon={Mail}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass('email')}
              placeholder="ali@example.com"
              autoComplete="email"
            />
          </Field>

          <Field label="Phone Number *" error={errors.phone} icon={Phone}>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass('phone')}
              placeholder="+92 300 1234567"
              autoComplete="tel"
            />
          </Field>

          <Field label="Service Inquiry *" error={errors.service} icon={ChevronDown}>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`${inputClass('service')} tz-form-select`}
            >
              <option value="">Select a service…</option>
              {services.map((service, idx) => (
                <option key={`${service}-${idx}`} value={service}>{service}</option>
              ))}
            </select>
          </Field>

          <Field label="Message *" error={errors.message} icon={MessageSquare}>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`${inputClass('message')} tz-form-textarea`}
              placeholder="Please describe your tax or legal requirements…"
            />
          </Field>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {!isSubmitting && (
            <>
              <Send size={18} />
              Book Consultation
            </>
          )}
        </Button>

        <p className="text-center text-xs text-gray-400 mt-3.5">
          We typically respond within 2–4 business hours.
        </p>
      </div>
    </motion.form>
  );
};

export default ContactForm;
