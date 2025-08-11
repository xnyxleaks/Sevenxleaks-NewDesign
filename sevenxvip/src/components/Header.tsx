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
    if (location.pathname === '/western') return 'WESTERN';
    if (location.pathname === '/asian') return 'ASIAN';
    return 'SEVENXLEAKS';
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
        glow: 'shadow-orange-500/20',
        buttonGradient: 'from-orange-400 to-orange-500',
        buttonHover: 'hover:from-orange-500 hover:to-orange-600'
      };
    }
    return {
      accent: 'text-purple-400',
      accentHover: 'hover:text-purple-300',
      gradient: 'from-purple-500 to-purple-600',
      gradientHover: 'hover:from-purple-600 hover:to-purple-700',
      border: 'border-purple-500/20',
      bg: 'bg-purple-500/10',
      glow: 'shadow-purple-500/20',
      buttonGradient: 'from-purple-400 to-purple-500',
      buttonHover: 'hover:from-purple-500 hover:to-purple-600'
    };
  };

  const theme = getThemeClasses();

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
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`relative px-6 py-3 text-gray-300 hover:text-white transition-all duration-300 group rounded-xl hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:${theme.border} hover:${theme.glow}`}
            >
              <span className="relative z-10 font-medium font-roboto">Home</span>
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
            </Link>
            <Link 
              to="/login" 
              className={`relative px-6 py-3 text-gray-300 hover:text-white transition-all duration-300 group rounded-xl hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:${theme.border} hover:${theme.glow}`}
            >
              <span className="relative z-10 font-medium font-roboto">Login</span>
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
            </Link>
            <Link 
              to="/register" 
              className={`relative px-6 py-3 text-gray-300 hover:text-white transition-all duration-300 group rounded-xl hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:${theme.border} hover:${theme.glow}`}
            >
              <span className="relative z-10 font-medium font-roboto">Register</span>
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
            </Link>
          </nav>

          {/* Actions Section */}
          <div className="flex items-center space-x-4">
            <Link to="/plans">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 transform border border-yellow-400/20 font-orbitron text-sm lg:text-base"
              >
                <i className="fa-solid fa-crown text-xs lg:text-sm animate-pulse"></i>
                <span>VIP ACCESS</span>
              </motion.button>
            </Link>
            
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
              onClick={toggleMenu}
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-700/50 bg-gray-800/95 backdrop-blur-xl rounded-b-2xl"
            >
              <div className="px-6 py-8 space-y-4">
                <Link 
                  to="/" 
                  onClick={toggleMenu} 
                  className={`flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-white ${theme.bg} hover:bg-gray-700/50 rounded-2xl transition-all duration-300 font-medium border border-gray-700/30 hover:${theme.border} backdrop-blur-sm`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}>
                    <i className="fa-solid fa-home text-white text-sm"></i>
                  </div>
                  <span className="font-roboto">Home</span>
                </Link>
                <Link 
                  to="/login" 
                  onClick={toggleMenu} 
                  className={`flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-white ${theme.bg} hover:bg-gray-700/50 rounded-2xl transition-all duration-300 font-medium border border-gray-700/30 hover:${theme.border} backdrop-blur-sm`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}>
                    <i className="fa-solid fa-sign-in-alt text-white text-sm"></i>
                  </div>
                  <span className="font-roboto">Login</span>
                </Link>
                <Link 
                  to="/register" 
                  onClick={toggleMenu} 
                  className={`flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-white ${theme.bg} hover:bg-gray-700/50 rounded-2xl transition-all duration-300 font-medium border border-gray-700/30 hover:${theme.border} backdrop-blur-sm`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}>
                    <i className="fa-solid fa-user-plus text-white text-sm"></i>
                  </div>
                  <span className="font-roboto">Register</span>
                </Link>
                <Link 
                  to="/plans" 
                  onClick={toggleMenu} 
                  className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-2xl shadow-lg transition-all duration-300 border border-yellow-400/20 font-orbitron"
                >
                  <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center">
                    <i className="fa-solid fa-crown text-yellow-300 text-sm animate-pulse"></i>
                  </div>
                  <span>VIP ACCESS</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;