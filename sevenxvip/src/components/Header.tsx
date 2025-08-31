import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const getLogoText = () => {
    if (location.pathname.includes('western')) return ' WESTERN';
    if (location.pathname.includes('asian')) return ' ASIAN';
    if (location.pathname.includes('banned')) return ' BANNED'
    if (location.pathname.includes('unknown')) return ' UNKNOWN'
    if (location.pathname.includes('vip')) return ' VIP';
    if (location.pathname.includes('plans')) return ' PLANS';
    if (location.pathname.includes('login')) return ' LOGIN';
    if (location.pathname.includes('register')) return ' REGISTER';
    return '';
  };

  const getThemeClasses = () => {
    if (location.pathname === '/western') {
      return {
        accent: 'text-orange-400',
        accentHover: 'hover:text-orange-300',
        gradient: 'from-orange-500 to-orange-600',
        gradientHover: 'hover:from-orange-600 hover:to-orange-700',
        border: 'border-orange-500/20',
        bg: 'bg-orange-500/10',
        glow: 'shadow-orange-500/20'
      };
    }
    if (location.pathname.includes('vip')) {
      return {
        accent: 'text-yellow-400',
        accentHover: 'hover:text-yellow-300',
        gradient: 'from-yellow-500 to-yellow-600',
        gradientHover: 'hover:from-yellow-600 hover:to-yellow-700',
        border: 'border-yellow-500/20',
        bg: 'bg-yellow-500/10',
        glow: 'shadow-yellow-500/20'
      };
    }

     if (location.pathname.includes('banned')) {
      return {
        accent: 'text-red-400',
        accentHover: 'hover:text-red-300',
        gradient: 'from-red-500 to-red-600',
        gradientHover: 'hover:from-red-600 hover:to-red-700',
        border: 'border-red-500/20',
        bg: 'bg-red-500/10',
        glow: 'shadow-red-500/20'
      };
    }

      if (location.pathname.includes('unknown')) {
      return {
        accent: 'text-slate-400',
        accentHover: 'hover:text-slate-300',
        gradient: 'from-slate-500 to-slate-600',
        gradientHover: 'hover:from-slate-600 hover:to-slate-700',
        border: 'border-slate-500/20',
        bg: 'bg-slate-500/10',
        glow: 'shadow-slate-500/20'
      };
    }
    return {
      accent: 'text-purple-400',
      accentHover: 'hover:text-purple-300',
      gradient: 'from-purple-500 to-purple-600',
      gradientHover: 'hover:from-purple-600 hover:to-purple-700',
      border: 'border-purple-500/20',
      bg: 'bg-purple-500/10',
      glow: 'shadow-purple-500/20'
    };
  };

  const theme = getThemeClasses();

const menuItems = [
  { name: 'Home',     path: '/',        icon: 'fa-solid fa-house' },
  { name: 'Banned',   path: '/banned',  icon: 'fa-solid fa-ban' },
  { name: 'Unknown',  path: '/unknown', icon: 'fa-regular fa-circle-question' },
  { name: 'Plans',    path: '/plans',   icon: 'fa-solid fa-crown' },
  { name: 'Discord',  path: 'https://discord.gg/95BKaYTPPS', icon: 'fa-brands fa-discord', external: true },
  { name: 'Login',    path: '/login',   icon: 'fa-solid fa-right-to-bracket' },   // substitui fa-sign-in-alt
  { name: 'Register', path: '/register',icon: 'fa-regular fa-registered' }
];


  return (
    <header className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/30 sticky top-0 z-50 backdrop-blur-xl shadow-2xl">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="text-sm sm:text-base lg:text-lg font-bold text-white tracking-wide font-orbitron">
                <span>SEVENXLEAKS</span>
                {location.pathname !== '/' && (
                  <span className={`ml-2 ${theme.accent} drop-shadow-lg`}>
                    {getLogoText()}
                  </span>
                )}
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:${theme.border} hover:${theme.glow}`}
            >
              <span className="relative z-10 font-medium font-roboto text-sm">Home</span>
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
            </Link>
            
            <Link 
              to="/banned" 
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-red-500/20 hover:shadow-red-500/20"
            >
              <span className="relative z-10 font-medium font-roboto text-sm flex items-center gap-2">
                <i className="fa-solid fa-ban text-red-400 text-xs"></i>
                Banned
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              to="/unknown" 
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-gray-500/20 hover:shadow-gray-500/20"
            >
              <span className="relative z-10 font-medium font-roboto text-sm flex items-center gap-2">
                <i className="fa-solid fa-question text-gray-400 text-xs"></i>
                Unknown
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              to="/plans" 
              className={`relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-yellow-500/20 hover:shadow-yellow-500/20`}
            >
              <span className="relative z-10 font-medium font-roboto text-sm flex items-center gap-2">
                <i className="fa-solid fa-crown text-yellow-400 text-xs"></i>
                Plans
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </Link>
            
            <a 
              href="https://discord.gg/95BKaYTPPS"
              target="_blank"
              rel="noopener noreferrer"
              className={`relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-purple-500/20 hover:shadow-purple-500/20`}
            >
              <span className="relative z-10 font-medium font-roboto text-sm flex items-center gap-2">
                <i className="fab fa-discord text-purple-400 text-xs"></i>
                Discord
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </a>
            
            <Link 
              to="/login" 
              className={`relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:${theme.border} hover:${theme.glow}`}
            >
              <span className="relative z-10 font-medium font-roboto text-sm">Login</span>
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
            </Link>
          </nav>

          {/* Actions Section */}
          <div className="flex items-center space-x-3">
            <Link to="/plans">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 transform border border-yellow-400/20 font-orbitron text-sm"
              >
                <i className="fa-solid fa-crown text-sm animate-pulse"></i>
                <span>VIP ACCESS</span>
              </motion.button>
            </Link>
            
            {/* <ThemeToggle /> */}

            {/* Simple Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
              onClick={toggleMenu}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-current block transition-all duration-300 origin-center"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-current block mt-1.5 transition-all duration-300"
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-current block mt-1.5 transition-all duration-300 origin-center"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Simple Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-gray-800/95 backdrop-blur-xl border-t border-gray-700/50 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={toggleMenu}
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                    >
                      <i className={`${item.icon} w-5 text-center`}></i>
                      <span className="font-medium">{item.name}</span>
                      <i className="fa-solid fa-external-link text-xs ml-auto"></i>
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={toggleMenu}
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                    >
                      <i className={`${item.icon} w-5 text-center`}></i>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </motion.div>
              ))}
              
              {/* VIP Button for Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4 border-t border-gray-700/50"
              >
                <Link to="/plans" onClick={toggleMenu}>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition-all duration-200">
                    <i className="fa-solid fa-crown text-yellow-400 w-5 text-center"></i>
                    <span className="font-bold text-yellow-400">Get VIP Access</span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;