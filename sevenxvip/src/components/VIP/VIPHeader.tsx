import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import VIPUserMenu from "./VIPUserMenu";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, X } from "lucide-react";

type MenuItem = {
  name: string;
  path: string;
  icon: string;
  external?: boolean;
};

const VIPHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem("Token");
  const name = localStorage.getItem("name") || "";

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/dashboard`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { isAdmin: adminFlag, isVip: vipFlag } = response.data as {
          isAdmin: boolean; isVip: boolean;
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
    if (location.pathname.includes("vip-western")) return " VIP WESTERN";
    if (location.pathname.includes("vip-asian")) return " VIP ASIAN";
    if (location.pathname.includes("vip-banned")) return " VIP BANNED";
    if (location.pathname.includes("vip-unknown")) return " VIP UNKNOWN";
    if (location.pathname.includes("vip")) return " VIP";
    return " VIP";
  };

  const getVIPMenuItems = (): MenuItem[] => {
    const baseItems: MenuItem[] = [
      { name: "VIP Home", path: "/vip", icon: "fa-solid fa-crown" },
      { name: "VIP Asian", path: "/vip-asian", icon: "fa-solid fa-crown" },
      { name: "VIP Western", path: "/vip-western", icon: "fa-solid fa-crown" },
      { name: "VIP Banned", path: "/vip-banned", icon: "fa-solid fa-ban" },
      { name: "VIP Unknown", path: "/vip-unknown", icon: "fa-regular fa-circle-question" },
      { name: "Recommend", path: "/recommend", icon: "fa-regular fa-lightbulb" },
    ];

    const adminItems: MenuItem[] = isAdmin
      ? [
          { name: "Admin Panel", path: "/admin/settings", icon: "fa-solid fa-shield-halved" },
          { name: "Statistics", path: "/admin/stats", icon: "fa-solid fa-chart-line" },
          { name: "Requests", path: "/admin/requests", icon: "fa-solid fa-clipboard-list" },
        ]
      : [];

    const socialItems: MenuItem[] = [
      {
        name: "Discord VIP",
        path: "https://discord.gg/95BKaYTPPS",
        icon: "fa-brands fa-discord",
        external: true,
      },
    ];

    return [...baseItems, ...adminItems, ...socialItems];
  };

  const allMenuItems: MenuItem[] = getVIPMenuItems();

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 via-yellow-900/20 to-gray-900 border-b border-yellow-500/30 sticky top-0 shadow-2xl bg-opacity-100 z-50 backdrop-blur-xl">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* VIP Logo Section */}
          <Link to="/vip" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Crown className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
                </motion.div>
                <div className="absolute inset-0 animate-ping opacity-30">
                  <Crown className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              
              <div className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-wide font-orbitron">
                <span className="text-yellow-400">SEVENXLEAKS</span>
                <span className="text-yellow-300 drop-shadow-lg">{getLogoText()}</span>
              </div>
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </motion.div>
            </motion.div>
          </Link>

          {/* Desktop VIP Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Link 
              to="/vip" 
              className="relative px-4 py-2 text-gray-300 hover:text-yellow-300 transition-all duration-300 group rounded-lg hover:bg-yellow-500/10 backdrop-blur-sm border border-transparent hover:border-yellow-500/30 hover:shadow-yellow-500/20"
            >
              <span className="relative z-10 font-medium font-roboto text-sm flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-400" />
                VIP Home
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              to="/vip-asian" 
              className="relative px-4 py-2 text-gray-300 hover:text-yellow-300 transition-all duration-300 group rounded-lg hover:bg-yellow-500/10 backdrop-blur-sm border border-transparent hover:border-yellow-500/30 hover:shadow-yellow-500/20"
            >
              <span className="relative z-10 font-medium font-roboto text-sm flex items-center gap-2">
                <i className="fa-solid fa-crown text-yellow-400 text-xs"></i>
                VIP Asian
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              to="/vip-western" 
              className="relative px-4 py-2 text-gray-300 hover:text-yellow-300 transition-all duration-300 group rounded-lg hover:bg-yellow-500/10 backdrop-blur-sm border border-transparent hover:border-yellow-500/30 hover:shadow-yellow-500/20"
            >
              <span className="relative z-10 font-medium font-roboto text-sm flex items-center gap-2">
                <i className="fa-solid fa-crown text-yellow-400 text-xs"></i>
                VIP Western
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              to="/vip-banned" 
              className="relative px-4 py-2 text-gray-300 hover:text-yellow-300 transition-all duration-300 group rounded-lg hover:bg-yellow-500/10 backdrop-blur-sm border border-transparent hover:border-red-500/20 hover:shadow-red-500/20"
            >
              <span className="relative z-10 font-medium font-roboto text-sm flex items-center gap-2">
                <i className="fa-solid fa-ban text-yellow-400 text-xs"></i>
                VIP Banned
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              to="/vip-unknown" 
              className="relative px-4 py-2 text-gray-300 hover:text-yellow-300 transition-all duration-300 group rounded-lg hover:bg-yellow-500/10 backdrop-blur-sm border border-transparent hover:border-gray-500/20 hover:shadow-gray-500/20"
            >
              <span className="relative z-10 font-medium font-roboto text-sm flex items-center gap-2">
                <i className="fa-solid fa-question text-yellow-400 text-xs"></i>
                VIP Unknown
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
            </Link>
            
            <a 
              href="https://discord.gg/95BKaYTPPS"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-4 py-2 text-gray-300 hover:text-yellow-300 transition-all duration-300 group rounded-lg hover:bg-yellow-500/10 backdrop-blur-sm border border-transparent hover:border-purple-500/20 hover:shadow-purple-500/20"
            >
              <span className="relative z-10 font-medium font-roboto text-sm flex items-center gap-2">
                <i className="fab fa-discord text-yellow-400 text-xs"></i>
                Discord VIP
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
            </a>
            
            {isAdmin && (
              <Link 
                to="/admin/settings" 
                className="relative px-4 py-2 text-gray-300 hover:text-yellow-300 transition-all duration-300 group rounded-lg hover:bg-yellow-500/10 backdrop-blur-sm border border-transparent hover:border-red-500/20 hover:shadow-red-500/20"
              >
                <span className="relative z-10 font-medium font-roboto text-sm flex items-center gap-2">
                  <i className="fa-solid fa-shield text-red-400 text-sm"></i>
                  Admin
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
              </Link>
            )}
          </nav>

          {/* Actions Section */}
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold rounded-xl shadow-lg border border-yellow-400/30 backdrop-blur-sm"
            >
              <Crown className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-orbitron tracking-wide">VIP ACTIVE</span>
              <Sparkles className="w-4 h-4" />
            </motion.div>

            <VIPUserMenu
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
              className="lg:hidden p-2 text-yellow-300 hover:text-yellow-200 transition-colors duration-200"
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

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-slate-900 z-50 h-[1000px]"
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleMobileMenuToggle}
                className="w-12 h-12 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 rounded-full flex items-center justify-center text-yellow-300 hover:text-yellow-200 transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* VIP Logo */}
            <div className="text-center pt-16 pb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-4 mb-4"
              >
                <Crown className="w-12 h-12 text-yellow-400" />
                <h2 className="text-3xl font-bold text-yellow-400 font-orbitron">VIP MENU</h2>
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </motion.div>
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
            </div>

            {/* Menu Items */}
            <div className="px-8 py-6 space-y-3 max-h-[60vh] overflow-y-auto">
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
                      className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-yellow-500/30 backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center border border-yellow-500/30">
                        <i className={`${item.icon} text-yellow-400`}></i>
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-lg">{item.name}</span>
                        <p className="text-sm text-gray-400">External link</p>
                      </div>
                      <i className="fa-solid fa-external-link text-xs"></i>
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={handleMobileMenuToggle}
                      className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-yellow-500/30 backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center border border-yellow-500/30">
                        <i className={`${item.icon} text-yellow-400`}></i>
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-lg">{item.name}</span>
                        <p className="text-sm text-gray-400">VIP exclusive</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-xs"></i>
                    </Link>
                  )}
                </motion.div>
              ))}
              
              {/* Account Section for Mobile */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8 }}
  className="pt-6 border-t border-yellow-500/30 space-y-3"
>
  <Link to="/account" onClick={handleMobileMenuToggle}>
    <div className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-yellow-500/30 backdrop-blur-sm">
      <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center border border-yellow-500/30">
        <i className="fa-solid fa-user text-yellow-400" />
      </div>
      <div className="flex-1">
        <span className="font-medium text-lg">My VIP Account</span>
        <p className="text-sm text-gray-400">Manage your premium account</p>
      </div>
      <i className="fa-solid fa-chevron-right text-xs" />
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
      <i className="fa-solid fa-sign-out-alt text-red-400" />
    </div>
    <div className="flex-1 text-left">
      <span className="font-medium text-lg">Logout</span>
      <p className="text-sm text-red-300">Sign out of VIP account</p>
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

export default VIPHeader;