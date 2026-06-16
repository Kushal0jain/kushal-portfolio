import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const predefinedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];

const contactInfo = [
  { icon: FiMail,    label: 'Email',    value: 'jainkushal0909@gmail.com', href: 'mailto:jainkushal0909@gmail.com' },
  { icon: FiPhone,   label: 'Phone',    value: '+91 7727012340',            href: 'tel:+917727012340' },
  { icon: FiMapPin,  label: 'Location', value: 'Jaipur, Rajasthan, India',  href: null },
];

const Contact = () => {
  const [formData,       setFormData]       = useState({ name: '', emailPrefix: '', customDomain: '', message: '' });
  const [selectedDomain, setSelectedDomain] = useState('gmail.com');
  const [useCustom,      setUseCustom]      = useState(false);
  const [submitted,      setSubmitted]      = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'emailPrefix' && !useCustom && value.includes('@')) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleDomainChange = (e) => {
    const value = e.target.value;
    setSelectedDomain(value);
    if (value === 'other') {
      setUseCustom(true);
      setFormData({ ...formData, emailPrefix: '', customDomain: '' });
    } else {
      setUseCustom(false);
      setFormData({ ...formData, customDomain: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullEmail = useCustom
      ? formData.customDomain
      : `${formData.emailPrefix}@${selectedDomain}`;
    const msg = `Name: ${formData.name}\nEmail: ${fullEmail}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/917727012340?text=${encodeURIComponent(msg)}`, '_blank');
    setFormData({ name: '', emailPrefix: '', customDomain: '', message: '' });
    setSelectedDomain('gmail.com');
    setUseCustom(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 section-reveal">
          <p className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="section-title">Let's Connect</h2>
          <p className="text-slate-400 mt-4 max-w-md mx-auto text-sm">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left – Info */}
          <div className="section-reveal-left space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-teal-500/10 text-teal-500 border border-teal-500/20">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{label}</p>
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

            {/* Socials */}
            {/* <div>
              <h4 className="text-white font-semibold text-sm mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="social-icon"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div> */}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/917727012340?text=Hi%20Kushal!%20I%20want%20to%20connect%20with%20you."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 bg-gradient-to-br from-[#25d366] to-[#128c7e] shadow-[0_6px_25px_rgba(37,211,102,.3)]"
            >
              <FaWhatsapp size={22} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right – Form */}
          <div className="section-reveal-right">
            <div className="glass-card rounded-2xl p-7">
              <h3 className="text-lg font-bold text-white mb-6">Send a Message</h3>

              {submitted && (
                <div className="mb-5 px-4 py-3 rounded-xl text-sm font-medium bg-teal-500/10 text-teal-500 border border-teal-500/25">
                  Message sent via WhatsApp! Thank you 🙌
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="form-input"
                  required
                />

                <div className="flex gap-3">
                  <input
                    type="text"
                    name="emailPrefix"
                    value={formData.emailPrefix}
                    onChange={handleChange}
                    placeholder="Email ID"
                    className="form-input flex-1"
                    disabled={useCustom}
                    required={!useCustom}
                  />
                  <select
                    value={selectedDomain}
                    onChange={handleDomainChange}
                    className="form-input flex-1"
                  >
                    {predefinedDomains.map((d) => (
                      <option key={d} value={d}>@{d}</option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                </div>

                {useCustom && (
                  <input
                    type="email"
                    name="customDomain"
                    value={formData.customDomain}
                    onChange={handleChange}
                    placeholder="Full email (e.g. you@domain.com)"
                    className="form-input"
                    required
                  />
                )}

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message..."
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
                    Send via WhatsApp
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
