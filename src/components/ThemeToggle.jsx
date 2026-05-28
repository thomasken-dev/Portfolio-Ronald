import { motion } from 'framer-motion';
import { HiMoon, HiSun } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 border border-slate-200/80 bg-slate-100/80 text-slate-700 hover:bg-slate-200/90 dark:border-white/10 dark:bg-white/5 dark:text-blue-700 dark:hover:text-white dark:hover:bg-white/10 ${className}`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
    </motion.button>
  );
};

export default ThemeToggle;
