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
                <i className="fa-solid  text-red-400 text-xs"></i>
                Banned
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              to="/unknown" 
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-gray-500/20 hover:shadow-gray-500/20"
            >
              <span className="relative z-10 font-medium font-roboto text-sm flex items-center gap-2">
                <i className="fa-solid  text-gray-400 text-xs"></i>
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
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                onClick={toggleMenu}
              />
              
              {/* Menu */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 right-0 bottom-0 md:hidden bg-gray-900/98 backdrop-blur-xl z-50 overflow-y-auto"
            >
              {/* Header do menu mobile */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <i className="fa-solid fa-crown text-white text-sm"></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white font-orbitron">SEVENXLEAKS</h2>
                    <p className="text-xs text-gray-400">Navigation Menu</p>
                  </div>
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                >
                  <i className="fa-solid fa-times text-lg"></i>
                </button>
              </div>

              <div className="px-6 py-8 space-y-6">
                {/* Navigation Links */}
                <div className="space-y-3">
                <Link 
                  to="/" 
                  onClick={toggleMenu} 
                  className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/70 rounded-xl transition-all duration-300 font-medium border border-gray-700/30 hover:border-purple-500/30"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                    <i className="fa-solid fa-home text-white text-sm"></i>
                  </div>
                  <span className="font-roboto text-sm">Home</span>
                </Link>
                
                <Link 
                  to="/banned" 
                  onClick={toggleMenu} 
                  className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all duration-300 font-medium border border-red-500/20 hover:border-red-500/30"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
                    <i className="fa-solid  text-white text-sm"></i>
                  </div>
                  <span className="font-roboto text-sm">Banned</span>
                </Link>
                
                <Link 
                  to="/unknown" 
                  onClick={toggleMenu} 
                  className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white bg-gray-500/10 hover:bg-gray-500/20 rounded-xl transition-all duration-300 font-medium border border-gray-500/20 hover:border-gray-500/30"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-md">
                    <i className="fa-solid  text-white text-sm"></i>
                  </div>
                  <span className="font-roboto text-sm">Unknown</span>
                </Link>
                
                <Link 
                  to="/plans" 
                  onClick={toggleMenu} 
                  className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white bg-yellow-500/10 hover:bg-yellow-500/20 rounded-xl transition-all duration-300 font-medium border border-yellow-500/20 hover:border-yellow-500/30"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-md">
                    <i className="fa-solid fa-crown text-black text-sm"></i>
                  </div>
                  <span className="font-roboto text-sm">Plans</span>
                </Link>
                
                <a 
                  href="https://discord.gg/95BKaYTPPS"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={toggleMenu} 
                  className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 rounded-xl transition-all duration-300 font-medium border border-purple-500/20 hover:border-purple-500/30"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                    <i className="fab fa-discord text-white text-sm"></i>
                  </div>
                  <span className="font-roboto text-sm">Discord</span>
                </a>
                </div>

                {/* Auth Section */}
                <div className="border-t border-gray-700/50 pt-6">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2 font-orbitron">
                    Account Access
                  </h3>
                  <div className="space-y-3">
                    <Link 
                      to="/login" 
                      onClick={toggleMenu} 
                      className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white bg-blue-500/10 hover:bg-blue-500/20 rounded-xl transition-all duration-300 font-medium border border-blue-500/20 hover:border-blue-500/30"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                        <i className="fa-solid fa-sign-in-alt text-white text-sm"></i>
                      </div>
                      <span className="font-roboto text-sm">Login</span>
                    </Link>
                    
                    <Link 
                      to="/register" 
                      onClick={toggleMenu} 
                      className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white bg-green-500/10 hover:bg-green-500/20 rounded-xl transition-all duration-300 font-medium border border-green-500/20 hover:border-green-500/30"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                        <i className="fa-solid fa-user-plus text-white text-sm"></i>
                      </div>
                      <span className="font-roboto text-sm">Register</span>
                    </Link>
                  </div>
                </div>
                
                {/* VIP Access Button */}
                <div className="border-t border-gray-700/50 pt-6">
                  <Link
                    to="/plans"
                    onClick={toggleMenu}
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold rounded-xl shadow-lg transition-all duration-300 border border-yellow-400/30"
                  >
                    <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center relative">
                      <i className="fa-solid fa-crown text-yellow-300 text-sm animate-pulse"></i>
                    </div>
                    <span className="font-orbitron tracking-wide text-sm">GET VIP ACCESS</span>
                  </Link>
                </div>
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;