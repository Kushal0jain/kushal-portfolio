import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { useContent } from '../content/ContentContext';
import { fillTemplate } from '../content/accents';
import SectionHeader from './SectionHeader';

const Contact = () => {
  const { profile, ui } = useContent();
  const whatsapp = (profile.whatsapp || '').replace(/\D/g, '');
  const vars = { name: profile.name, firstName: (profile.name || '').split(' ')[0], year: new Date().getFullYear() };
  const domains = ui.emailDomains || [];
  const canSend = Boolean(whatsapp || profile.email);

  const contactInfo = [
    profile.email && { icon: FiMail, label: ui.emailLabel, value: profile.email, href: `mailto:${profile.email}` },
    profile.phone && { icon: FiPhone, label: ui.phoneLabel, value: profile.phone, href: `tel:${profile.phone.replace(/[^\d+]/g, '')}` },
    profile.location && { icon: FiMapPin, label: ui.locationLabel, value: profile.location, href: null },
  ].filter(Boolean);

  const emptyForm = { name: '', emailPrefix: '', customDomain: '', message: '' };
  const [formData,       setFormData]       = useState(emptyForm);
  const [pickedDomain,   setSelectedDomain] = useState(domains[0] || 'other');
  const [submitted,      setSubmitted]      = useState(false);
  // If the domain list changes (e.g. saved content loads after first render),
  // fall back to its first entry rather than a domain that's no longer offered.
  const selectedDomain = pickedDomain === 'other' || domains.includes(pickedDomain) ? pickedDomain : domains[0] || 'other';
  // With no domain list configured, visitors type their full email.
  const useCustom = selectedDomain === 'other' || domains.length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'emailPrefix' && value.includes('@')) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleDomainChange = (e) => {
    setSelectedDomain(e.target.value);
    setFormData({ ...formData, emailPrefix: '', customDomain: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullEmail = useCustom ? formData.customDomain : `${formData.emailPrefix}@${selectedDomain}`;
    const msg = `Name: ${formData.name}\nEmail: ${fullEmail}\nMessage: ${formData.message}`;
    if (whatsapp) {
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    } else {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Message from ${formData.name}`)}&body=${encodeURIComponent(msg)}`;
    }
    setFormData(emptyForm);
    setSelectedDomain(domains[0] || 'other');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const successText = whatsapp ? ui.successWhatsapp : ui.successEmail;
  const sendLabel = whatsapp ? ui.sendWhatsappLabel : ui.sendEmailLabel;

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <SectionHeader eyebrow={ui.contactEyebrow} title={ui.contactTitle}>
          {ui.contactIntro && <p className="text-slate-400 mt-4 max-w-md mx-auto text-sm">{ui.contactIntro}</p>}
        </SectionHeader>

        <div className={`grid gap-12 ${canSend ? 'lg:grid-cols-2' : 'max-w-xl mx-auto'}`}>

          {/* Left – Info */}
          <div className="section-reveal-left space-y-8">
            {contactInfo.length > 0 && (
              <div>
                {ui.contactInfoHeading && <h3 className="text-xl font-bold text-white mb-6">{ui.contactInfoHeading}</h3>}
                <div className="space-y-5">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <div key={value} className="flex items-center gap-4">
                      <div className="icon-tile w-11 h-11 flex-shrink-0">
                        <Icon size={16} />
                      </div>
                      <div>
                        {label && <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{label}</p>}
                        {href ? (
                          <a href={href} className="text-white text-sm font-medium hover:text-teal-400 transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-white text-sm font-medium">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp CTA */}
            {whatsapp && ui.whatsappCta && (
              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(fillTemplate(ui.whatsappGreeting, vars))}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-sm !text-white bg-[#1fa855] hover:bg-[#1b974c] transition-colors duration-300"
              >
                <FaWhatsapp size={20} />
                {ui.whatsappCta}
              </a>
            )}
          </div>

          {/* Right – Form */}
          {canSend && (
            <div className="section-reveal-right" style={{ '--reveal-delay': '120ms' }}>
              <div className="rounded-2xl p-7 border border-[var(--border)] bg-[var(--surface)]">
                {ui.formHeading && <h3 className="text-lg font-bold text-white mb-6">{ui.formHeading}</h3>}

                {submitted && successText && (
                  <div className="fade-in mb-5 px-4 py-3 rounded-xl text-sm font-medium bg-teal-500/10 text-teal-500 border border-teal-500/25">
                    {successText}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={ui.namePlaceholder}
                    aria-label={ui.namePlaceholder || 'Name'}
                    className="form-input"
                    required
                  />

                  {domains.length > 0 && (
                    <div className="flex gap-3">
                      <input
                        type="text"
                        name="emailPrefix"
                        value={formData.emailPrefix}
                        onChange={handleChange}
                        placeholder={ui.emailPlaceholder}
                        aria-label={ui.emailPlaceholder || 'Email'}
                        className="form-input flex-1"
                        disabled={useCustom}
                        required={!useCustom}
                      />
                      <select
                        value={selectedDomain}
                        onChange={handleDomainChange}
                        aria-label="Email domain"
                        className="form-input flex-1"
                      >
                        {domains.map((d) => (
                          <option key={d} value={d}>@{d}</option>
                        ))}
                        <option value="other">{ui.otherDomainLabel || 'Other'}</option>
                      </select>
                    </div>
                  )}

                  {useCustom && (
                    <input
                      type="email"
                      name="customDomain"
                      value={formData.customDomain}
                      onChange={handleChange}
                      placeholder={ui.customEmailPlaceholder}
                      aria-label={ui.customEmailPlaceholder || 'Email'}
                      className="form-input"
                      required
                    />
                  )}

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={ui.messagePlaceholder}
                    aria-label={ui.messagePlaceholder || 'Message'}
                    rows={4}
                    className="form-input resize-none"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full btn-primary py-3.5 text-sm flex items-center justify-center gap-2"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <FiSend size={15} />
                      {sendLabel || 'Send'}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
