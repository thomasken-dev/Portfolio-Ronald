import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Link } from 'react-scroll';
import ThemeToggle from './ThemeToggle';

const NAV_HEIGHT = 80;

const navLinks = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Achievements', to: 'achievements' },
  { label: 'Leadership', to: 'leadership' },
  { label: 'Education', to: 'education' },
  { label: 'Certifications', to: 'certifications' },
  { label: 'Contact', to: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef(null);

  // Scroll progress + scrolled state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    const sectionIds = navLinks.map(link => link.to);
    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: `-${NAV_HEIGHT}px 0px -50% 0px`,
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    observerRef.current = observers;
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="hero" smooth duration={600} offset={0} className="cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-black"
                style={{ background: 'linear-gradient(135deg, #4483BE, #7C3AED)' }}>
                R
              </div>
              <span className="font-bold theme-heading text-lg tracking-tight hidden sm:block">
                Ronald Max
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={600}
                offset={0}
                spy
                className={`nav-link ${activeSection === link.to ? 'active' : ''} cursor-pointer`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
          </div>

          {/* Mobile: theme + menu */}
          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="theme-muted hover:text-[var(--text-primary)] transition-colors p-2"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden glass-dark border-t border-slate-200/80 dark:border-white/5 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      smooth
                      duration={600}
                      offset={0}
                      spy
                      onClick={() => setMenuOpen(false)}
                      className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        activeSection === link.to
                          ? 'theme-heading bg-primary/20'
                          : 'theme-muted hover:text-[var(--text-primary)] hover:bg-slate-900/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
