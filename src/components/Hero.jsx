import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-scroll';
import { personalInfo } from '../data/portfolio';
import profileImg from '../assets/profile.jpg';

const socialLinks = [
  { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
  { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: FaXTwitter, href: personalInfo.twitter, label: 'X' },
  { icon: FaInstagram, href: personalInfo.instagram, label: 'Instagram' },
];

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let animId;
    let stars = [];

    const isLight = () => document.documentElement.classList.contains('light');

    const createStars = (width, height) => {
      const count = Math.min(220, Math.floor((width * height) / 8000));
      return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.2,
        baseAlpha: Math.random() * 0.65 + 0.15,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.75 ? 'blue' : 'white',
      }));
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(width, height);
    };

    const draw = (time) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      const light = isLight();

      stars.forEach((star) => {
        const twinkle = 0.55 + 0.45 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.baseAlpha * twinkle * (light ? 0.35 : 1);

        if (star.hue === 'blue' && !light) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(147, 197, 253, 0.8)';
          ctx.fillStyle = `rgba(191, 219, 254, ${alpha})`;
        } else {
          ctx.shadowBlur = star.r > 1.2 && !light ? 4 : 0;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
          ctx.fillStyle = light
            ? `rgba(30, 58, 138, ${alpha * 0.5})`
            : `rgba(255, 255, 255, ${alpha})`;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(draw);

    const observer = new MutationObserver(() => resize());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
};

const Hero = () => {
  const roles = [
    'AI/ML Engineer',
    2000,
    'Full Stack Software Engineer',
    2000,
    'Generative AI Enthusiast',
    2000,
    'Always Learning New Things',
    2000,
  ];

  return (
    <section
      id="hero"
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden hero-galaxy-bg"
    >
      <div className="absolute inset-0 hero-nebula pointer-events-none" aria-hidden />
      <Starfield />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 sm:py-32 flex flex-col lg:flex-row items-center gap-14 lg:gap-20 w-full">
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold mb-8 tracking-[0.2em] uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            Available for Opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl mb-5"
          >
            Hi, I&apos;m{' '}
            <span className="block sm:inline mt-1 sm:mt-0">{personalInfo.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="hero-subtitle text-xl sm:text-2xl md:text-3xl mb-6 min-h-[2.5rem] sm:min-h-[2.75rem]"
          >
            <TypeAnimation
              sequence={roles}
              wrapper="span"
              speed={45}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="hero-description text-base sm:text-lg mb-10 max-w-xl mx-auto lg:mx-0"
          >
            {personalInfo.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
          >
            <Link to="projects" smooth duration={700} offset={0}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="hero-btn-primary"
              >
                View Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center gap-3 justify-center lg:justify-start"
          >
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hero-social-link w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 90 }}
          className="flex-shrink-0 relative order-1 lg:order-2"
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem]">
            <div
              className="hero-profile-halo absolute inset-[-8%] rounded-full pointer-events-none"
              aria-hidden
            />
            <div className="hero-profile-glow absolute inset-0 rounded-full">
              <div className="hero-profile-inner w-full h-full p-1 sm:p-1.5">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={profileImg}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium" style={{ color: 'var(--hero-text-muted)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-9 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: 'rgba(148, 163, 184, 0.45)' }}
        >
          <div className="w-1 h-2 rounded-full bg-blue-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
