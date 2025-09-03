import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import UserMenu from "../components/HeaderLogged/UserMenu";
import { motion, AnimatePresence } from "framer-motion";

type MenuItem = {
  name: string;
  path: string;
  icon: string;
  external?: boolean;
};

const HeaderLogged: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem("Token");
  const name = localStorage.getItem("name") || "";

  const handleMenuToggle = () => setIsMenuOpen((v) => !v);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen((v) => !v);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/dashboard`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { isAdmin: adminFlag, isVip: vipFlag } = response.data as {
          isAdmin: boolean;
          isVip: boolean;
        };
        setIsAdmin(adminFlag);
        setIsVip(vipFlag);
      } catch (error) {
        console.error("Erro ao verificar status do usuário:", error);
      }
    };
    if (token) checkUserStatus();
  }, [token]);

  const getLogoText = () => {
    if (location.pathname.includes("western")) return " WESTERN";
    if (location.pathname.includes("asian")) return " ASIAN";
    if (location.pathname.includes("banned")) return " BANNED";
    if (location.pathname.includes("unknown")) return " UNKNOWN";
    if (location.pathname.includes("vip")) return " VIP";
    return "";
  };

  const getThemeClasses = () => {
    if (location.pathname === "/western") {
      return {
        accent: "text-orange-400",
        accentHover: "hover:text-orange-300",
        gradient: "from-orange-500 to-orange-600",
        gradientHover: "hover:from-orange-600 hover:to-orange-700",
        border: "border-orange-500/20",
        bg: "bg-orange-500/10",
        glow: "shadow-orange-500/20",
      };
    }
    if (location.pathname.includes("vip")) {
      return {
        accent: "text-yellow-400",
        accentHover: "hover:text-yellow-300",
        gradient: "from-yellow-500 to-yellow-600",
        gradientHover: "hover:from-yellow-600 hover:to-yellow-700",
        border: "border-yellow-500/20",
        bg: "bg-yellow-500/10",
        glow: "shadow-yellow-500/20",
      };
    }
    if (location.pathname.includes("banned")) {
      return {
        accent: "text-red-400",
        accentHover: "hover:text-red-300",
        gradient: "from-red-500 to-red-600",
        gradientHover: "hover:from-red-600 hover:to-red-700",
        border: "border-red-500/20",
        bg: "bg-red-500/10",
        glow: "shadow-red-500/20",
      };
    }
    if (location.pathname.includes("unknown")) {
      return {
        accent: "text-slate-400",
        accentHover: "hover:text-slate-300",
        gradient: "from-slate-500 to-slate-600",
        gradientHover: "hover:from-slate-600 hover:to-slate-700",
        border: "border-slate-500/20",
        bg: "bg-slate-500/10",
        glow: "shadow-slate-500/20",
      };
    }
    return {
      accent: "text-purple-400",
      accentHover: "hover:text-purple-300",
      gradient: "from-purple-500 to-purple-600",
      gradientHover: "hover:from-purple-600 hover:to-purple-700",
      border: "border-purple-500/20",
      bg: "bg-purple-500/10",
      glow: "shadow-purple-500/20",
    };
  };

  const theme = getThemeClasses();

  const getMenuItems = (): MenuItem[] => {
    const baseItems: MenuItem[] = [
      { name: "Home", path: "/", icon: "fa-solid fa-house" },
      { name: "Banned", path: "/banned", icon: "fa-solid fa-ban" },
      { name: "Unknown", path: "/unknown", icon: "fa-regular fa-circle-question" },
    ];

    const vipItems: MenuItem[] = isVip
      ? [
          { name: "VIP Content", path: "/vip", icon: "fa-solid fa-crown" },
          { name: "Recommend", path: "/recommend", icon: "fa-regular fa-lightbulb" },
        ]
      : [{ name: "Plans", path: "/plans", icon: "fa-solid fa-crown" }];

    const adminItems: MenuItem[] = isAdmin
      ? [
          { name: "Admin Panel", path: "/admin/settings", icon: "fa-solid fa-shield-halved" },
          { name: "Statistics", path: "/admin/stats", icon: "fa-solid fa-chart-line" },
          { name: "Requests", path: "/admin/requests", icon: "fa-solid fa-clipboard-list" },
        ]
      : [];

    const socialItems: MenuItem[] = [
      {
        name: "Discord",
        path: "https://discord.gg/95BKaYTPPS",
        icon: "fa-brands fa-discord",
        external: true,
      },
    ];

    return [...baseItems, ...vipItems, ...adminItems, ...socialItems];
  };

  const allMenuItems: MenuItem[] = getMenuItems();

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 sticky top-0 shadow-2xl bg-opacity-100 z-50">
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
                  <i className="fa-solid fa-crown text-yellow-400 text-xl animate-pulse drop-shadow-lg" />
                  <div className="absolute inset-0 animate-ping">
                    <i className="fa-solid fa-crown text-yellow-400/50 text-xl" />
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
              className={`relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent`}
            >
              <span className="relative z-10 font-medium font-['Roboto'] text-sm">Home</span>
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
            </Link>

            <Link
              to="/banned"
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-red-500/20 hover:shadow-red-500/20"
            >
              <span className="relative z-10 font-medium font-['Roboto'] text-sm flex items-center gap-2">
                <i className="fa-solid fa-ban text-red-400 text-xs" />
                Banned
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300" />
            </Link>

            <Link
              to="/unknown"
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-gray-500/20 hover:shadow-gray-500/20"
            >
              <span className="relative z-10 font-medium font-['Roboto'] text-sm flex items-center gap-2">
                <i className="fa-solid fa-question text-gray-400 text-xs" />
                Unknown
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300" />
            </Link>

            {!isVip && (
              <Link
                to="/plans"
                className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-yellow-500/20 hover:shadow-yellow-500/20"
              >
                <span className="relative z-10 font-medium font-['Roboto'] text-sm flex items-center gap-2">
                  <i className="fa-solid fa-crown text-yellow-400 text-xs" />
                  Plans
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300" />
              </Link>
            )}

            <a
              href="https://discord.gg/95BKaYTPPS"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-purple-500/20 hover:shadow-purple-500/20"
            >
              <span className="relative z-10 font-medium font-['Roboto'] text-sm flex items-center gap-2">
                <i className="fab fa-discord text-purple-400 text-xs" />
                Discord
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300" />
            </a>

            {isAdmin && (
              <>
                <Link
                  to="/admin/settings"
                  className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-red-500/20 hover:shadow-red-500/20"
                >
                  <span className="relative z-10 font-medium font-['Roboto'] text-sm flex items-center gap-2">
                    <i className="fa-solid fa-shield-halved text-red-400 text-sm" />
                    Admin
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300" />
                </Link>
                <Link
                  to="/admin/stats"
                  className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-green-500/20 hover:shadow-green-500/20"
                >
                  <span className="relative z-10 font-medium font-['Roboto'] text-sm flex items-center gap-2">
                    <i className="fa-solid fa-chart-line text-green-400 text-sm" />
                    Stats
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300" />
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
                    <i className="fa-solid fa-crown text-sm animate-pulse" />
                    <div className="absolute inset-0 animate-ping">
                      <i className="fa-solid fa-crown text-yellow-600/50 text-sm" />
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
                  <i className="fa-solid fa-crown text-sm" />
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

            {/* Simple Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
              onClick={handleMobileMenuToggle}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-current block transition-all duration-300 origin-center"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-current block mt-1.5 transition-all duration-300"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-current block mt-1.5 transition-all duration-300 origin-center"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Simple Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-gray-900 z-50"
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleMobileMenuToggle}
                className="w-12 h-12 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300"
              >
                <i className="fa-solid fa-xmark text-xl" />
              </motion.button>
            </div>

            {/* Logo with VIP Status */}
            <div className="text-center pt-16 pb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-4 mb-4"
              >
                {isVip && (
                  <div className="relative">
                    <i className="fa-solid fa-crown w-12 h-12 text-yellow-400 animate-pulse text-3xl" />
                    <div className="absolute inset-0 animate-ping">
                      <i className="fa-solid fa-crown w-12 h-12 text-yellow-400/50 text-3xl" />
                    </div>
                  </div>
                )}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br ${theme.gradient}`}>
                  <i className="fa-solid fa-crown text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white font-['Orbitron']">
                  {isVip ? "VIP MENU" : "MENU"}
                </h2>
              </motion.div>
              <div className={`w-32 h-1 mx-auto rounded-full ${isVip ? "bg-gradient-to-r from-yellow-400 to-yellow-500" : `bg-gradient-to-r ${theme.gradient}`}`} />
            </div>

            <div className="px-4 space-y-2">
              {allMenuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleMobileMenuToggle}
                      className={`flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-white rounded-xl transition-all duration-300 border border-transparent backdrop-blur-sm`}
                    >
                      <div className={`w-12 h-12 ${theme.bg} rounded-xl flex items-center justify-center border ${theme.border}`}>
                        <i className={item.icon} />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-lg">{item.name}</span>
                        <p className="text-sm text-gray-400">External link</p>
                      </div>
                      <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={handleMobileMenuToggle}
                      className={`flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-white rounded-xl transition-all duration-300 border border-transparent backdrop-blur-sm`}
                    >
                      <div className={`w-12 h-12 ${theme.bg} rounded-xl flex items-center justify-center border ${theme.border}`}>
                        <i className={item.icon} />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-lg">{item.name}</span>
                        <p className="text-sm text-gray-400">Navigate to page</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-xs" />
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Special Actions for Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`pt-6 border-t ${theme.border} space-y-3`}
              >
                <Link to="/account" onClick={handleMobileMenuToggle}>
                  <div className={`flex items-center gap-4 px-6 py-4 bg-gradient-to-r ${theme.gradient} border ${theme.border} rounded-xl hover:opacity-90 transition-all duration-300`}>
                    <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center border border-blue-500/40">
                      <i className="fa-solid fa-user text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-white text-lg">My Account</span>
                      <p className="text-sm text-gray-200">Manage your profile</p>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("Token");
                    localStorage.removeItem("name");
                    localStorage.removeItem("email");
                    window.location.href = "/";
                  }}
                  className="w-full flex items-center gap-4 px-6 py-4 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/30"
                >
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/30">
                    <i className="fa-solid fa-right-from-bracket text-red-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-medium text-lg">Logout</span>
                    <p className="text-sm text-red-300">Sign out of account</p>
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderLogged;
