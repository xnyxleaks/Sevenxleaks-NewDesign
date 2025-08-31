import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import UserMenu from "../components/HeaderLogged/UserMenu";
import { motion, AnimatePresence } from "framer-motion";

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
    if (location.pathname.includes('western')) return ' WESTERN';
    if (location.pathname.includes('asian')) return ' ASIAN';
    if (location.pathname.includes('banned')) return ' BANNED'
    if (location.pathname.includes('unknown')) return ' UNKNOWN'
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

  const getMenuItems = () => {
    const baseItems = [
      { 
        name: 'Home', 
        path: '/', 
        icon: 'fa-home',
        gradient: theme.gradient,
        description: 'Página inicial',
        category: 'navigation'
      },
      { 
        name: 'Banned', 
        path: '/banned', 
        icon: 'fa-ban',
        gradient: 'from-red-500 to-red-600',
        description: 'Conteúdo banido',
        category: 'content'
      },
      { 
        name: 'Unknown', 
        path: '/unknown', 
        icon: 'fa-question',
        gradient: 'from-gray-500 to-gray-600',
        description: 'Conteúdo desconhecido',
        category: 'content'
      }
    ];

    const vipItems = isVip ? [
      { 
        name: 'VIP Content', 
        path: '/vip', 
        icon: 'fa-crown',
        gradient: 'from-yellow-500 to-yellow-600',
        description: 'Conteúdo exclusivo VIP',
        category: 'vip',
        special: true
      },
      { 
        name: 'Recommend', 
        path: '/recommend', 
        icon: 'fa-lightbulb',
        gradient: 'from-purple-500 to-purple-600',
        description: 'Recomendar conteúdo',
        category: 'vip'
      }
    ] : [
      { 
        name: 'Plans', 
        path: '/plans', 
        icon: 'fa-crown',
        gradient: 'from-yellow-500 to-yellow-600',
        description: 'Planos VIP',
        category: 'upgrade'
      }
    ];

    const adminItems = isAdmin ? [
      { 
        name: 'Admin Panel', 
        path: '/admin/settings', 
        icon: 'fa-shield',
        gradient: 'from-red-500 to-red-600',
        description: 'Painel administrativo',
        category: 'admin'
      },
      { 
        name: 'Statistics', 
        path: '/admin/stats', 
        icon: 'fa-chart-line',
        gradient: 'from-green-500 to-green-600',
        description: 'Estatísticas do sistema',
        category: 'admin'
      },
      { 
        name: 'Requests', 
        path: '/admin/requests', 
        icon: 'fa-clipboard-list',
        gradient: 'from-blue-500 to-blue-600',
        description: 'Solicitações de usuários',
        category: 'admin'
      }
    ] : [];

    const socialItems = [
      { 
        name: 'Discord', 
        path: 'https://discord.gg/95BKaYTPPS', 
        icon: 'fab fa-discord',
        gradient: 'from-purple-500 to-purple-600',
        description: 'Comunidade Discord',
        category: 'social',
        external: true
      }
    ];

    return { baseItems, vipItems, adminItems, socialItems };
  };

  const { baseItems, vipItems, adminItems, socialItems } = getMenuItems();

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

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden relative p-3 text-gray-300 hover:text-white rounded-2xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600 bg-gray-800/50 hover:bg-gray-700/70 backdrop-blur-sm shadow-lg"
              onClick={handleMobileMenuToggle}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <motion.div
                  animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-5 h-0.5 bg-current rounded-full"
                />
                <motion.div
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-5 h-0.5 bg-current rounded-full"
                />
                <motion.div
                  animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-5 h-0.5 bg-current rounded-full"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={handleMobileMenuToggle}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                opacity: { duration: 0.2 }
              }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-2xl border-l border-gray-700/50 z-50 lg:hidden shadow-2xl"
            >
              {/* Menu Header */}
              <div className="relative p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-900/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-xl`}>
                        <i className="fa-solid fa-crown text-white text-lg"></i>
                      </div>
                      {isVip && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                          <i className="fa-solid fa-star text-black text-xs animate-pulse"></i>
                        </div>
                      )}
                      {isAdmin && (
                        <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                          <i className="fa-solid fa-shield text-white text-xs"></i>
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white font-orbitron">SEVENXLEAKS</h2>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-400 font-roboto">Olá, {name}</p>
                        {isVip && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30">
                            VIP
                          </span>
                        )}
                        {isAdmin && (
                          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">
                            ADMIN
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleMobileMenuToggle}
                    className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <i className="fa-solid fa-times text-xl"></i>
                  </motion.button>
                </div>
                
                {/* Decorative line */}
                <div className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r ${theme.gradient} opacity-50`}></div>
              </div>

              {/* Menu Content */}
              <div className="flex flex-col h-full">
                {/* Navigation Items */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                  {/* Base Navigation */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3 font-orbitron">
                      Navegação
                    </h3>
                    <div className="space-y-2">
                      {baseItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 300,
                            damping: 25
                          }}
                        >
                          <Link
                            to={item.path}
                            onClick={handleMobileMenuToggle}
                            className="group relative flex items-center gap-4 p-3 rounded-xl bg-gray-800/40 hover:bg-gray-700/60 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 backdrop-blur-sm"
                          >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                              <i className={`${item.icon} text-white text-sm`}></i>
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="text-base font-bold text-white group-hover:text-gray-100 transition-colors duration-300 font-orbitron">
                                {item.name}
                              </h4>
                              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-roboto">
                                {item.description}
                              </p>
                            </div>
                            
                            <i className="fa-solid fa-chevron-right text-gray-500 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300"></i>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* VIP Section */}
                  {vipItems.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3 font-orbitron">
                        {isVip ? 'VIP Features' : 'Upgrade'}
                      </h3>
                      <div className="space-y-2">
                        {vipItems.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              delay: (baseItems.length + index) * 0.1,
                              type: "spring",
                              stiffness: 300,
                              damping: 25
                            }}
                          >
                            <Link
                              to={item.path}
                              onClick={handleMobileMenuToggle}
                              className={`group relative flex items-center gap-4 p-3 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                                item.special 
                                  ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20'
                                  : 'bg-gray-800/40 hover:bg-gray-700/60 border border-gray-700/30 hover:border-gray-600/50'
                              }`}
                            >
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${item.special ? 'animate-pulse' : ''}`}>
                                <i className={`${item.icon} text-white text-sm`}></i>
                              </div>
                              
                              <div className="flex-1">
                                <h4 className={`text-base font-bold transition-colors duration-300 font-orbitron ${
                                  item.special ? 'text-yellow-400 group-hover:text-yellow-300' : 'text-white group-hover:text-gray-100'
                                }`}>
                                  {item.name}
                                </h4>
                                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-roboto">
                                  {item.description}
                                </p>
                              </div>
                              
                              {item.special && (
                                <div className="flex items-center gap-1">
                                  <i className="fa-solid fa-star text-yellow-400 text-xs animate-pulse"></i>
                                  <i className="fa-solid fa-chevron-right text-yellow-400 group-hover:translate-x-1 transition-all duration-300"></i>
                                </div>
                              )}
                              {!item.special && (
                                <i className="fa-solid fa-chevron-right text-gray-500 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300"></i>
                              )}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Admin Section */}
                  {adminItems.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3 font-orbitron">
                        Admin Controls
                      </h3>
                      <div className="space-y-2">
                        {adminItems.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              delay: (baseItems.length + vipItems.length + index) * 0.1,
                              type: "spring",
                              stiffness: 300,
                              damping: 25
                            }}
                          >
                            <Link
                              to={item.path}
                              onClick={handleMobileMenuToggle}
                              className="group relative flex items-center gap-4 p-3 rounded-xl bg-gray-800/40 hover:bg-gray-700/60 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg"
                            >
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                                <i className={`${item.icon} text-white text-sm`}></i>
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="text-base font-bold text-white group-hover:text-gray-100 transition-colors duration-300 font-orbitron">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-roboto">
                                  {item.description}
                                </p>
                              </div>
                              
                              <i className="fa-solid fa-chevron-right text-gray-500 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300"></i>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Section */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3 font-orbitron">
                      Comunidade
                    </h3>
                    <div className="space-y-2">
                      {socialItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: (baseItems.length + vipItems.length + adminItems.length + index) * 0.1,
                            type: "spring",
                            stiffness: 300,
                            damping: 25
                          }}
                        >
                          <a
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleMobileMenuToggle}
                            className="group relative flex items-center gap-4 p-3 rounded-xl bg-gray-800/40 hover:bg-gray-700/60 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10"
                          >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                              <i className={`${item.icon} text-white text-sm`}></i>
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="text-base font-bold text-white group-hover:text-gray-100 transition-colors duration-300 font-orbitron">
                                {item.name}
                              </h4>
                              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-roboto">
                                {item.description}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <i className="fa-solid fa-external-link text-gray-500 group-hover:text-gray-400 text-sm transition-colors duration-300"></i>
                              <i className="fa-solid fa-chevron-right text-gray-500 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300"></i>
                            </div>
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Menu Footer */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="p-6 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50"
                >
                  {/* Account Quick Access */}
                  <Link to="/account" onClick={handleMobileMenuToggle}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-indigo-600/20 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 backdrop-blur-sm group overflow-hidden mb-4"
                    >
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                          <i className="fa-solid fa-user text-white text-lg"></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300 font-orbitron">
                            Minha Conta
                          </h3>
                          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-roboto">
                            Gerenciar perfil e configurações
                          </p>
                        </div>
                        <i className="fa-solid fa-arrow-right text-blue-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-all duration-300"></i>
                      </div>
                    </motion.div>
                  </Link>

                  {/* Logout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      localStorage.removeItem("Token");
                      localStorage.removeItem("name");
                      localStorage.removeItem("email");
                      window.location.href = '/';
                    }}
                    className="w-full p-4 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 backdrop-blur-sm group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <i className="fa-solid fa-sign-out-alt text-white text-lg"></i>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-bold text-red-400 group-hover:text-red-300 transition-colors duration-300 font-orbitron">
                          Sair
                        </h3>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-roboto">
                          Desconectar da conta
                        </p>
                      </div>
                      <i className="fa-solid fa-arrow-right text-red-400 group-hover:text-red-300 group-hover:translate-x-1 transition-all duration-300"></i>
                    </div>
                  </motion.button>

                  {/* Footer info */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 font-roboto">
                      © 2025 SEVENXLEAKS
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderLogged;