import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolio';
import { getSkillIcon } from '../data/skillIcons';
import { SectionHeader } from './About';

const SkillPill = ({ skill, categoryColor, isHovered, onHover, onLeave }) => {
  const { Icon, color } = getSkillIcon(skill.icon);

  return (
    <motion.span
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.04, y: -1 }}
      className={`skill-pill inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium cursor-default transition-all duration-200 ${
        isHovered ? 'skill-pill--active' : ''
      }`}
      style={{
        '--pill-accent': color,
        '--pill-category': categoryColor,
      }}
    >
      <span
        className="skill-pill-icon flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
        style={{ background: `${color}22`, border: `1px solid ${color}44` }}
      >
        <Icon size={13} style={{ color }} aria-hidden />
      </span>
      <span className="skill-pill-label">{skill.name}</span>
    </motion.span>
  );
};

const SkillCategory = ({ category, data, index }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const count = data.items.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="neon-card skill-card neon-card-accent-top rounded-2xl p-6 sm:p-7 relative overflow-hidden group"
      style={{ '--category-color': data.color, '--accent': data.color }}
    >
      <div className="neon-card-glow-inner" aria-hidden />

      <div className="flex items-center gap-3 mb-5 relative z-10">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: `${data.color}20`, border: `1px solid ${data.color}35` }}
        >
          {data.icon}
        </div>
        <div className="min-w-0">
          <h3 className="theme-heading font-bold text-base leading-tight">{category}</h3>
          <p className="theme-muted text-xs mt-0.5">
            {count} skill{count !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 relative z-10">
        {data.items.map((skill) => (
          <SkillPill
            key={`${category}-${skill.icon}`}
            skill={skill}
            categoryColor={data.color}
            isHovered={hoveredId === skill.icon}
            onHover={() => setHoveredId(skill.icon)}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section className="relative py-8 overflow-hidden">
      <div className="section-ambient" style={{ top: '20%', left: '-12%', background: '#4483be' }} aria-hidden />
      <div className="section-ambient" style={{ bottom: '10%', right: '-10%', background: '#a855f7' }} aria-hidden />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader subtitle="What I Know" title="Technical" accent="Skills" />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {Object.entries(skills).map(([category, data], i) => (
            <SkillCategory key={category} category={category} data={data} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
