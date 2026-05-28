import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data/portfolio';
import { getSkillIcon } from '../data/skillIcons';
import { resolveTechIconKey } from '../utils/resolveTechIcon';
import { SectionHeader } from './About';
import { TbCode } from 'react-icons/tb';

const TechPill = ({ label, accent }) => {
  const iconKey = resolveTechIconKey(label);
  const { Icon, color } = iconKey ? getSkillIcon(iconKey) : { Icon: TbCode, color: accent };

  return (
    <span className="neon-pill" style={{ '--pill-accent': color, '--accent': accent }}>
      <span
        className="neon-pill-icon"
        style={{ background: `${color}22`, border: `1px solid ${color}44` }}
      >
        <Icon size={11} style={{ color }} aria-hidden />
      </span>
      {label}
    </span>
  );
};

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="h-full"
      style={{ '--accent': project.color }}
    >
      <motion.div
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ duration: 0.35 }}
        className="neon-card neon-card-accent-top group h-full flex flex-col overflow-hidden relative"
        style={{ '--accent': project.color }}
      >
        <div className="neon-card-glow-inner" aria-hidden />
        <div className="neon-card-wave" aria-hidden />

        {project.featured && (
          <div className="absolute top-5 right-5 z-20 neon-badge" style={{ '--accent': project.color }}>
            Featured
          </div>
        )}

        <div className="relative z-10 p-6 sm:p-7 flex flex-col h-full">
          <div className="flex items-start gap-4 mb-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 neon-logo-wrap"
              style={{ '--accent': project.color }}
            >
              {project.icon}
            </div>
            <div className="min-w-0 pr-16 sm:pr-0">
              <span
                className="text-[10px] font-bold tracking-[0.15em] uppercase"
                style={{ color: project.color }}
              >
                {project.category}
              </span>
              <h3 className="text-lg font-bold theme-heading leading-snug mt-1">{project.title}</h3>
            </div>
          </div>

          <p className="theme-muted text-sm leading-relaxed flex-1 mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <TechPill key={tech} label={tech} accent={project.color} />
            ))}
          </div>

          <div className="flex items-center gap-3 mt-auto">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold flex-1 transition-all duration-300 theme-heading"
              style={{
                background: `color-mix(in srgb, ${project.color} 16%, var(--neon-pill-bg))`,
                border: `1px solid color-mix(in srgb, ${project.color} 40%, transparent)`,
                boxShadow: hovered ? `0 0 24px color-mix(in srgb, ${project.color} 25%, transparent)` : 'none',
              }}
            >
              <FaGithub size={16} />
              View on GitHub
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
              style={{
                background: `color-mix(in srgb, ${project.color} 14%, var(--neon-pill-bg))`,
                border: `1px solid color-mix(in srgb, ${project.color} 35%, transparent)`,
                color: project.color,
              }}
              aria-label="Open project"
            >
              <FaExternalLinkAlt size={14} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section className="relative py-8 overflow-hidden">
      <div className="section-ambient" style={{ top: '5%', right: '-8%', background: '#06b6d4' }} aria-hidden />
      <div className="section-ambient" style={{ bottom: '10%', left: '-12%', background: '#a855f7' }} aria-hidden />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader subtitle="What I've Built" title="Featured" accent="Projects" />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <a href="https://github.com/Suraj-G-Rao" target="_blank" rel="noopener noreferrer">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center gap-2.5"
            >
              <FaGithub size={18} />
              View All Projects on GitHub
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
