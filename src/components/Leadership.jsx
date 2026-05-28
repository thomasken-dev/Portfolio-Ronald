import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronDown } from 'react-icons/hi2';
import { leadership } from '../data/portfolio';
import { SectionHeader } from './About';

const OrgLogo = ({ src, name, color }) => {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold neon-logo-wrap"
        style={{ color, '--accent': color }}
      >
        {name?.charAt(0) || '?'}
      </div>
    );
  }

  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5 neon-logo-wrap"
      style={{ '--accent': color }}
    >
      <img src={src} alt={name} onError={() => setImgError(true)} className="w-full h-full object-contain" />
    </div>
  );
};

const OrgGroup = ({ group, index }) => {
  const [expanded, setExpanded] = useState(true);
  const isMultiRole = group.roles.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="neon-card neon-card-accent-top group relative overflow-hidden h-full flex flex-col"
      style={{ '--accent': group.color }}
    >
      <div className="neon-card-glow-inner" aria-hidden />
      <div className="neon-card-wave" aria-hidden />

      <div
        className={`flex items-center gap-4 p-5 sm:p-6 relative z-10 ${isMultiRole ? 'cursor-pointer select-none' : ''}`}
        onClick={() => isMultiRole && setExpanded(!expanded)}
        onKeyDown={(e) => isMultiRole && e.key === 'Enter' && setExpanded(!expanded)}
        role={isMultiRole ? 'button' : undefined}
        tabIndex={isMultiRole ? 0 : undefined}
      >
        <OrgLogo src={group.logo} name={group.org} color={group.color} />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold theme-heading leading-snug">{group.org}</h3>
          <p className="text-sm theme-muted mt-0.5">
            {group.roles.length} role{group.roles.length > 1 ? 's' : ''}
          </p>
        </div>
        {isMultiRole && (
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: `color-mix(in srgb, ${group.color} 14%, var(--neon-pill-bg))`,
              border: `1px solid color-mix(in srgb, ${group.color} 30%, transparent)`,
            }}
          >
            <HiOutlineChevronDown className="w-5 h-5" style={{ color: group.color }} />
          </motion.div>
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden relative z-10"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              {group.roles.map((role, i) => (
                <div key={i} className="relative flex gap-3 sm:gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 w-4 pt-1">
                    <div
                      className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                      style={{
                        borderColor: role.current ? group.color : `color-mix(in srgb, ${group.color} 50%, transparent)`,
                        background: role.current ? group.color : 'transparent',
                        boxShadow: role.current ? `0 0 10px ${group.color}99` : 'none',
                      }}
                    />
                    {i < group.roles.length - 1 && (
                      <div
                        className="w-px flex-1 min-h-[2rem] mt-1"
                        style={{
                          background: `linear-gradient(to bottom, color-mix(in srgb, ${group.color} 55%, transparent), color-mix(in srgb, ${group.color} 10%, transparent))`,
                        }}
                      />
                    )}
                  </div>

                  <div className={`flex-1 ${i < group.roles.length - 1 ? 'pb-5' : ''}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-semibold theme-heading leading-snug">{role.title}</h4>
                      {role.current && (
                        <span className="neon-badge text-[9px] py-0.5" style={{ '--accent': group.color }}>
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="text-sm neon-meta-accent mt-0.5" style={{ '--accent': group.color }}>
                      {role.period}
                    </p>
                    <p className="text-sm theme-muted leading-relaxed mt-2">{role.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Leadership = () => {
  return (
    <section className="relative py-8 overflow-hidden">
      <div className="section-ambient" style={{ top: '15%', left: '-10%', background: '#7c3aed' }} aria-hidden />
      <div className="section-ambient" style={{ bottom: '5%', right: '-8%', background: '#10b981' }} aria-hidden />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader subtitle="Roles & Positions" title="" accent="Leadership" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {leadership.map((group, i) => (
            <OrgGroup key={group.org} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
