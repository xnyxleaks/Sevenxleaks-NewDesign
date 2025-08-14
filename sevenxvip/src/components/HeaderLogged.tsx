import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import UserMenu from "../components/HeaderLogged/UserMenu";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const HeaderLogged: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem("Token");
  const name = localStorage.getItem("name") || "";

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { isAdmin, isVip } = response.data;
        setIsAdmin(isAdmin);
        setIsVip(isVip);
      } catch (error) {
        console.error("Erro ao verificar status do usuário:", error);
      }
    };

    if (token) {
      checkUserStatus();
    }
  }, [token]);

  const getLogoText = () => {
    if (location.pathname === '/western') return ' WESTERN';
    if (location.pathname === '/asian') return ' ASIAN';
    if (location.pathname.includes('vip')) return ' VIP';
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
    <header className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 sticky top-0 z-50 backdrop-blur-xl shadow-2xl">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              {isVip && (
                <div className="relative">
                  <i className="fa-solid fa-crown text-yellow-400 text-xl animate-pulse drop-shadow-lg"></i>
                  <div className="absolute inset-0 animate-ping">
                    <i className="fa-solid fa-crown text-yellow-400/50 text-xl"></i>
                  </div>
                </div>
              )}
              <div className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-wide font-['Orbitron']">
                SEVENXLEAKS<span className={`${theme.accent} drop-shadow-lg`}>{getLogoText()}</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:${theme.border} hover:${theme.glow}`}
            >
              <span className="relative z-10 font-medium font-['Roboto'] text-sm">Home</span>
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
            </Link>
            
            <Link 
              to="/banned" 
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-red-500/20 hover:shadow-red-500/20"
            >
              <span className="relative z-10 font-medium font-['Roboto'] text-sm flex items-center gap-2">
                <i className="fa-solid fa-ban text-red-400 text-xs"></i>
                Banned
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              to="/unknown" 
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-gray-500/20 hover:shadow-gray-500/20"
            >
              <span className="relative z-10 font-medium font-['Roboto'] text-sm flex items-center gap-2">
                <i className="fa-solid fa-question text-gray-400 text-xs"></i>
                Unknown
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </Link>
            
            {!isVip && (
              <Link 
                to="/plans" 
                className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-yellow-500/20 hover:shadow-yellow-500/20"
              >
                <span className="relative z-10 font-medium font-['Roboto'] text-sm flex items-center gap-2">
                  <i className="fa-solid fa-crown text-yellow-400 text-xs"></i>
                  Plans
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
              </Link>
            )}
            
            <a 
              href="https://discord.gg/95BKaYTPPS"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-purple-500/20 hover:shadow-purple-500/20"
            >
              <span className="relative z-10 font-medium font-['Roboto'] text-sm flex items-center gap-2">
                <i className="fab fa-discord text-purple-400 text-xs"></i>
                Discord
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </a>
            
            {isAdmin && (
              <>
                <Link 
                  to="/admin/settings" 
                  className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-red-500/20 hover:shadow-red-500/20"
                >
                  <span className="relative z-10 font-medium font-['Roboto'] text-sm flex items-center gap-2">
                    <i className="fa-solid fa-shield text-red-400 text-sm"></i>
                    Admin
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/admin/stats" 
                  className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-green-500/20 hover:shadow-green-500/20"
                >
                  <span className="relative z-10 font-medium font-['Roboto'] text-sm flex items-center gap-2">
                    <i className="fa-solid fa-chart-line text-green-400 text-sm"></i>
                    Stats
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
                </Link>
              </>
            )}
          </nav>

          {/* Actions Section */}
          <div className="flex items-center space-x-4">
            {isVip ? (
              <Link to="/vip">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/30 transition-all duration-300 transform border border-yellow-400/30 backdrop-blur-sm"
                >
                  <div className="relative">
                    <i className="fa-solid fa-crown text-sm animate-pulse"></i>
                    <div className="absolute inset-0 animate-ping">
                      <i className="fa-solid fa-crown text-yellow-600/50 text-sm"></i>
                    </div>
                  </div>
                  <span className="text-sm font-['Orbitron'] tracking-wide">VIP ACCESS</span>
                </motion.button>
              </Link>
            ) : (
              <Link to="/plans">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 transform border border-yellow-400/20"
                >
                  <i className="fa-solid fa-crown text-sm"></i>
                  <span className="text-sm font-['Orbitron'] tracking-wide">VIP ACCESS</span>
                </motion.button>
              </Link>
            )}

            <UserMenu
              name={name}
              isMenuOpen={isMenuOpen}
              handleMenuToggle={handleMenuToggle}
              isVip={isVip}
              isAdmin={isAdmin}
              setIsMenuOpen={setIsMenuOpen}
            />

            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
              onClick={handleMobileMenuToggle}
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-700/50 bg-gray-800/95 backdrop-blur-xl rounded-b-2xl"
            >
              <div className="px-6 py-8 space-y-4">
                <Link 
                  to="/" 
                  onClick={handleMobileMenuToggle} 
                  className={`flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-white ${theme.bg} hover:bg-gray-700/50 rounded-2xl transition-all duration-300 font-medium border border-gray-700/30 hover:${theme.border} backdrop-blur-sm`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}>
                    <i className="fa-solid fa-home text-white text-sm"></i>
                  </div>
                  <span className="font-['Roboto']">Home</span>
                </Link>
                
                <Link 
                  to="/banned" 
                  onClick={handleMobileMenuToggle} 
                  className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-white bg-red-500/10 hover:bg-red-500/20 rounded-2xl transition-all duration-300 font-medium border border-red-500/20 hover:border-red-500/30 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                    <i className="fa-solid fa-ban text-white text-sm"></i>
                  </div>
                  <span className="font-roboto">Banned Content</span>
                </Link>
                
                <Link 
                  to="/unknown" 
                  onClick={handleMobileMenuToggle} 
                  className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-white bg-gray-500/10 hover:bg-gray-500/20 rounded-2xl transition-all duration-300 font-medium border border-gray-500/20 hover:border-gray-500/30 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-lg">
                    <i className="fa-solid fa-question text-white text-sm"></i>
                  </div>
                  <span className="font-roboto">Unknown Content</span>
                </Link>
                
                {!isVip && (
                  <Link 
                    to="/plans" 
                    onClick={handleMobileMenuToggle} 
                    className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-white bg-yellow-500/10 hover:bg-yellow-500/20 rounded-2xl transition-all duration-300 font-medium border border-yellow-500/20 hover:border-yellow-500/30 backdrop-blur-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
                      <i className="fa-solid fa-crown text-black text-sm"></i>
                    </div>
                    <span className="font-roboto">Plans</span>
                  </Link>
                )}
                
                <a 
                  href="https://discord.gg/95BKaYTPPS"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleMobileMenuToggle} 
                  className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 rounded-2xl transition-all duration-300 font-medium border border-purple-500/20 hover:border-purple-500/30 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <i className="fab fa-discord text-white text-sm"></i>
                  </div>
                  <span className="font-roboto">Discord</span>
                </a>
                
                {isAdmin && (
                  <>
                    <Link
                      to="/admin/settings"
                      onClick={handleMobileMenuToggle}
                      className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-white bg-red-500/10 hover:bg-red-500/20 rounded-2xl transition-all duration-300 font-medium border border-red-500/20 hover:border-red-500/30 backdrop-blur-sm"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                        <i className="fa-solid fa-shield text-white text-sm"></i>
                      </div>
                      <span className="font-['Roboto']">Admin Panel</span>
                    </Link>
                    <Link 
                      to="/admin/stats" 
                      onClick={handleMobileMenuToggle}
                      className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-white bg-green-500/10 hover:bg-green-500/20 rounded-2xl transition-all duration-300 font-medium border border-green-500/20 hover:border-green-500/30 backdrop-blur-sm"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                        <i className="fa-solid fa-chart-line text-white text-sm"></i>
                      </div>
                      <span className="font-['Roboto']">Statistics</span>
                    </Link>
                  </>
                )}
                {isVip && (
                  <Link
                    to="/vip"
                    onClick={handleMobileMenuToggle}
                    className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold rounded-2xl shadow-lg transition-all duration-300 border border-yellow-400/30 mt-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center relative">
                      <i className="fa-solid fa-crown text-yellow-300 text-sm animate-pulse"></i>
                      <div className="absolute inset-0 animate-ping">
                        <i className="fa-solid fa-crown text-yellow-600/50 text-sm"></i>
                      </div>
                    </div>
                    <span className="font-['Orbitron'] tracking-wide">VIP ACCESS</span>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default HeaderLogged;
