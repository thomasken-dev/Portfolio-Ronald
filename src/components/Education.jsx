import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { education } from '../data/portfolio';
import { SectionHeader } from './About';

const InstitutionLogo = ({ src, name, color }) => {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl neon-logo-wrap"
        style={{ color, '--accent': color }}
      >
        {name?.charAt(0) || '?'}
      </div>
    );
  }

  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden p-2 neon-logo-wrap"
      style={{ '--accent': color }}
    >
      <img src={src} alt={name} onError={() => setImgError(true)} className="w-full h-full object-contain" />
    </div>
  );
};

const EducationCard = ({ edu, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: index * 0.12 }}
    className="relative pl-14 sm:pl-16"
    style={{ '--accent': edu.color }}
  >
    <div
      className="neon-timeline-dot absolute left-3 sm:left-4 top-8 z-10"
      style={{ background: edu.color }}
    />

    <motion.div
      whileHover={{ y: -4 }}
      className="neon-card neon-card-accent-top group overflow-hidden relative"
      style={{ '--accent': edu.color }}
    >
      <div className="neon-card-glow-inner" aria-hidden />

      <div className="relative z-10 p-6 sm:p-7 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4 min-w-0">
          <InstitutionLogo src={edu.logo} name={edu.institution} color={edu.color} />
          <div>
            <h3 className="text-lg font-bold theme-heading mb-1">{edu.degree}</h3>
            <p className="neon-meta">
              <HiOutlineAcademicCap className="w-4 h-4" style={{ color: edu.color }} />
              <span className="theme-body text-sm font-medium">{edu.institution}</span>
            </p>
            <p className="theme-muted text-xs mt-1.5">{edu.period}</p>
          </div>
        </div>

        <div
          className="neon-badge text-sm font-bold normal-case tracking-normal px-4 py-2"
          style={{ '--accent': edu.color }}
        >
          {edu.score}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Education = () => {
  return (
    <section className="relative py-8 overflow-hidden">
      <div className="section-ambient" style={{ top: '5%', right: '-10%', background: '#06b6d4' }} aria-hidden />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeader subtitle="Academic Background" title="My" accent="Education" />

        <div className="relative">
          <div className="neon-timeline-line" style={{ '--accent': '#06b6d4' }} aria-hidden />

          <div className="space-y-8">
            {education.map((edu, i) => (
              <EducationCard key={edu.degree} edu={edu} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
