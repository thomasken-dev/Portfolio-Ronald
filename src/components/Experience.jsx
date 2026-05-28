import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineBuildingOffice2, HiOutlineCalendar, HiOutlineClock } from 'react-icons/hi2';
import { experience } from '../data/portfolio';
import { SectionHeader } from './About';

const CompanyLogo = ({ src, name, color }) => {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold neon-logo-wrap"
        style={{ color, '--accent': color }}
      >
        {name?.charAt(0) || '?'}
      </div>
    );
  }

  return (
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden p-2 neon-logo-wrap"
      style={{ '--accent': color }}
    >
      <img
        src={src}
        alt={name}
        onError={() => setImgError(true)}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

const ExperienceCard = ({ exp, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: index * 0.12 }}
    className="relative pl-14 sm:pl-16"
    style={{ '--accent': exp.color }}
  >
    <div
      className="neon-timeline-dot absolute left-3 sm:left-4 top-8 z-10"
      style={{ background: exp.color, '--accent': exp.color }}
    />

    <motion.div
      whileHover={{ y: -4 }}
      className="neon-card neon-card-accent-top group overflow-hidden"
      style={{ '--accent': exp.color }}
    >
      <div className="neon-card-glow-inner" aria-hidden />
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl opacity-80" style={{ background: `linear-gradient(180deg, ${exp.color}, transparent)` }} aria-hidden />

      <div className="relative z-10 p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4 min-w-0">
            <CompanyLogo src={exp.logo} name={exp.company} color={exp.color} />
            <div className="min-w-0">
              <h3 className="text-xl font-bold theme-heading leading-tight">{exp.role}</h3>
              <p className="neon-meta mt-1.5">
                <HiOutlineBuildingOffice2 className="w-4 h-4 flex-shrink-0" style={{ color: exp.color }} />
                <span className="theme-body font-medium">{exp.company}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className="neon-badge" style={{ '--accent': exp.color }}>
              {exp.icon && <span aria-hidden>{exp.icon}</span>}
              {exp.type}
            </span>
            <span className="neon-meta neon-meta-accent" style={{ '--accent': exp.color }}>
              <HiOutlineCalendar className="w-3.5 h-3.5" />
              {exp.period}
            </span>
            {exp.duration && (
              <span className="neon-meta text-xs">
                <HiOutlineClock className="w-3.5 h-3.5" />
                {exp.duration}
              </span>
            )}
          </div>
        </div>

        <ul className="space-y-3">
          {exp.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3 theme-body text-sm leading-relaxed">
              <span className="neon-bullet" style={{ background: exp.color, '--accent': exp.color }} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  </motion.div>
);

const Experience = () => {
  return (
    <section className="relative py-8 overflow-hidden">
      <div className="section-ambient" style={{ top: '10%', right: '-10%', background: '#7c3aed' }} aria-hidden />
      <div className="section-ambient" style={{ bottom: '0%', left: '-15%', background: '#4483be' }} aria-hidden />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionHeader subtitle="Work History" title="Professional" accent="Experience" />

        <div className="relative">
          <div className="neon-timeline-line" style={{ '--accent': '#4483be' }} aria-hidden />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <ExperienceCard key={`${exp.company}-${exp.role}`} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
