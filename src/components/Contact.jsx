import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { personalInfo } from '../data/portfolio';
import { SectionHeader } from './About';

const socialLinks = [
  { icon: FaGithub, href: personalInfo.github, label: 'GitHub', color: '#fff' },
  { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn', color: '#0A66C2' },
  { icon: FaXTwitter, href: personalInfo.twitter, label: 'X (Twitter)', color: '#fff' },
  { icon: FaInstagram, href: personalInfo.instagram, label: 'Instagram', color: '#E1306C' },
  { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email', color: '#4483BE' },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject || `Message from ${name}`)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailtoLink);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputCls = (field) =>
    `w-full px-4 py-3.5 rounded-xl theme-heading text-sm outline-none transition-all duration-300 font-medium bg-transparent ${
      focused === field
        ? 'border-primary shadow-[0_0_0_1px_rgba(68,131,190,0.5),0_0_20px_rgba(68,131,190,0.1)]'
        : 'border-white/8 hover:border-white/15'
    }`;

  return (
    <section className="relative py-8 overflow-hidden">
      <div className="section-ambient" style={{ top: '0%', left: '-10%', background: '#4483be' }} aria-hidden />
      <div className="section-ambient" style={{ bottom: '5%', right: '-8%', background: '#7c3aed' }} aria-hidden />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader subtitle="Get In Touch" title="Let's" accent="Connect" />

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Card */}
            <div className="neon-card neon-card-accent-top rounded-3xl p-7 relative overflow-hidden group" style={{ '--accent': '#4483BE' }}>
              <div className="neon-card-glow-inner" aria-hidden />
              <h3 className="text-xl font-bold theme-heading mb-3">Let's Build Something Amazing</h3>
              <p className="theme-muted text-sm leading-relaxed">
                Whether you have a project idea, a research collaboration, or just want to chat about AI/ML and tech — I'd love to hear from you. Great things start with a conversation!
              </p>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 gap-3">
              {socialLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="neon-card rounded-2xl p-4 flex items-center gap-3 group hover:translate-x-1.5 transition-all duration-200"
                  style={{ '--accent': link.color }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center theme-heading flex-shrink-0 transition-all duration-300"
                    style={{ background: 'var(--glass-bg)' }}
                  >
                    <link.icon size={18} />
                  </div>
                  <span className="theme-body text-sm font-medium group-hover:text-[var(--text-primary)] transition-colors">
                    {link.label}
                  </span>
                  <svg className="w-4 h-4 theme-muted ml-auto group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="neon-card neon-card-accent-top rounded-3xl p-8 relative overflow-hidden group" style={{ '--accent': '#7C3AED' }}>
              <div className="neon-card-glow-inner" aria-hidden />

              <h3 className="text-xl font-bold theme-heading mb-7">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs theme-muted font-medium mb-2">Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder="Your name"
                      className={`${inputCls('name')} border`}
                      style={{ borderColor: focused === 'name' ? '#4483BE' : 'var(--input-border)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs theme-muted font-medium mb-2">Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="your@email.com"
                      className={`${inputCls('email')} border`}
                      style={{ borderColor: focused === 'email' ? '#4483BE' : 'var(--input-border)' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs theme-muted font-medium mb-2">Subject</label>
                  <input
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    placeholder="What's this about?"
                    className={`${inputCls('subject')} border`}
                    style={{ borderColor: focused === 'subject' ? '#4483BE' : 'var(--input-border)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs theme-muted font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Your message..."
                    className={`${inputCls('message')} border resize-none`}
                    style={{ borderColor: focused === 'message' ? '#4483BE' : 'var(--input-border)' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary w-full justify-center py-4 text-base relative z-10"
                >
                  {submitted ? (
                    <>✓ Message sent via email!</>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
