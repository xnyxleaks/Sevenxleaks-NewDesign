import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-2xl transition-all duration-300 group border border-gray-700/40 hover:border-gray-600/60 backdrop-blur-sm shadow-lg hover:shadow-xl"
      title="Toggle Theme"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <div className="relative">
        <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-lg transition-all duration-300 group-hover:rotate-12 ${theme === 'dark' ? 'text-yellow-400' : 'text-indigo-400'}`}></i>
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-yellow-400/20' : 'bg-indigo-400/20'} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm animate-pulse`}></div>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;