import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface UserMenuProps {
  name: string | null;
  isMenuOpen: boolean;
  handleMenuToggle: () => void;
  isVip: boolean;
  isAdmin: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu: React.FC<UserMenuProps> = ({
  name,
  isMenuOpen,
  setIsMenuOpen,
  handleMenuToggle,
  isVip,
  isAdmin,
}) => {
  const Logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.href = '/';
  };

  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if(isMobile){
      navigate('/account');
    } else{
      handleMenuToggle();
    }
  };

  return (
    <nav className="relative z-[9999]">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-3 cursor-pointer px-4 py-3 rounded-2xl bg-gray-800/60 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-700/40 hover:border-gray-600/60 transition-all duration-300 shadow-lg hover:shadow-xl"
        onClick={handleAccountClick}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg ring-2 ring-blue-500/20">
            <i className="fa-solid fa-user text-white text-sm"></i>
          </div>
          {isVip && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-yellow-400/30">
              <i className="fa-solid fa-crown text-black text-xs animate-pulse"></i>
            </div>
          )}
          {isAdmin && (
            <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-red-500/30">
              <i className="fa-solid fa-shield text-white text-xs"></i>
            </div>
          )}
        </div>
        <div className="hidden sm:block">
          <p className="font-semibold text-gray-200 text-sm font-['Roboto']">{name}</p>
          <div className="flex items-center gap-2">
            {isVip ? (
              <span className="text-yellow-400 font-semibold flex items-center gap-1 text-xs">
                <i className="fa-solid fa-crown text-xs animate-pulse"></i>
                VIP Member
              </span>
            ) : (
              <span className="text-gray-400 text-xs">Free Member</span>
            )}
            {isAdmin && (
              <span className="text-red-400 text-xs flex items-center gap-1">
                <i className="fa-solid fa-shield text-xs"></i>
                Admin
              </span>
            )}
          </div>
        </div>
        <i className="fa-solid fa-chevron-down text-gray-400 text-xs hidden sm:block transition-transform duration-200 group-hover:rotate-180"></i>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute right-0 mt-4 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden z-[9999]"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Header do Menu */}
            <div className="p-3 bg-gradient-to-br from-gray-800/80 via-gray-900/60 to-gray-900/80 border-b border-gray-700/50">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg ring-1 ring-blue-500/20">
                    <i className="fa-solid fa-user text-white text-sm"></i>
                  </div>
                  {isVip && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md ring-1 ring-yellow-400/40">
                      <i className="fa-solid fa-crown text-black text-xs animate-pulse"></i>
                    </div>
                  )}
                  {isAdmin && (
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-md ring-1 ring-red-500/40">
                      <i className="fa-solid fa-shield text-white text-xs"></i>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white text-base font-['Orbitron']">{name}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {isVip ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold border border-yellow-400/30 backdrop-blur-sm">
                        <i className="fa-solid fa-crown text-xs animate-pulse"></i>
                        VIP MEMBER
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 bg-gray-700/50 text-gray-300 rounded-full text-xs font-medium border border-gray-600/30">
                        FREE MEMBER
                      </span>
                    )}
                    {isAdmin && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 rounded-full text-xs font-bold border border-red-500/30 backdrop-blur-sm">
                        <i className="fa-solid fa-shield text-xs"></i>
                        ADMIN
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {/* Account Section */}
              <div className="px-2">
                <Link
                  to="/account"
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800/60 rounded-lg transition-all duration-200 group border border-transparent hover:border-blue-500/20"
                  onClick={handleMenuToggle}
                >
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-indigo-500/30 transition-all duration-200">
                    <i className="fa-solid fa-user text-blue-400 text-sm"></i>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-200 group-hover:text-white">Your Account</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-gray-500 text-xs"></i>
                </Link>
              </div>

              {/* VIP Section */}
              {isVip && (
                <div className="px-3 mt-3">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-1 font-['Orbitron']">
                    VIP FEATURES
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/recommend"
                      className="flex items-center gap-3 px-3 py-3 hover:bg-gray-800/60 rounded-xl transition-all duration-200 group border border-transparent hover:border-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/10"
                      onClick={handleMenuToggle}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center group-hover:from-yellow-500/30 group-hover:to-yellow-600/30 transition-all duration-200 border border-yellow-500/20">
                        <i className="fa-solid fa-plus text-yellow-400 text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-bold text-gray-200 group-hover:text-white font-['Orbitron']">Recommend Content</span>
                        <p className="text-xs text-gray-400 font-['Roboto']">Suggest new content ideas</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-gray-500 text-sm group-hover:text-gray-400 transition-all duration-200 group-hover:translate-x-1"></i>
                    </Link>
                    <Link
                      to="/vip"
                      className="flex items-center gap-3 px-3 py-3 hover:bg-gray-800/60 rounded-xl transition-all duration-200 group border border-transparent hover:border-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/10"
                      onClick={handleMenuToggle}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center group-hover:from-yellow-500/30 group-hover:to-yellow-600/30 transition-all duration-200 border border-yellow-500/20 relative">
                        <i className="fa-solid fa-crown text-yellow-400 text-sm group-hover:animate-pulse"></i>
                        <div className="absolute inset-0 animate-ping opacity-20">
                          <i className="fa-solid fa-crown text-yellow-400 text-sm"></i>
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-bold text-gray-200 group-hover:text-white font-['Orbitron']">VIP Content</span>
                        <p className="text-xs text-gray-400 font-['Roboto']">Exclusive premium content</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-gray-500 text-sm group-hover:text-gray-400 transition-all duration-200 group-hover:translate-x-1"></i>
                    </Link>
                  </div>
                </div>
              )}

              {/* Admin Section */}
              {isAdmin && (
                <div className="px-3 mt-3">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-1 font-['Orbitron']">
                    ADMIN CONTROLS
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/admin/requests"
                      className="flex items-center gap-3 px-3 py-3 hover:bg-gray-800/60 rounded-xl transition-all duration-200 group border border-transparent hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/10"
                      onClick={handleMenuToggle}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center group-hover:from-red-500/30 group-hover:to-red-600/30 transition-all duration-200 border border-red-500/20">
                        <i className="fa-solid fa-clipboard-list text-red-400 text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-bold text-gray-200 group-hover:text-white font-['Orbitron']">View Requests</span>
                        <p className="text-xs text-gray-400 font-['Roboto']">Manage user requests</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-gray-500 text-sm group-hover:text-gray-400 transition-all duration-200 group-hover:translate-x-1"></i>
                    </Link>
                    <Link
                      to="/admin/stats"
                      className="flex items-center gap-3 px-3 py-3 hover:bg-gray-800/60 rounded-xl transition-all duration-200 group border border-transparent hover:border-green-500/20 hover:shadow-lg hover:shadow-green-500/10"
                      onClick={handleMenuToggle}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center group-hover:from-green-500/30 group-hover:to-green-600/30 transition-all duration-200 border border-green-500/20">
                        <i className="fa-solid fa-chart-line text-green-400 text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-bold text-gray-200 group-hover:text-white font-['Orbitron']">View Stats</span>
                        <p className="text-xs text-gray-400 font-['Roboto']">Analytics & metrics</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-gray-500 text-sm group-hover:text-gray-400 transition-all duration-200 group-hover:translate-x-1"></i>
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="flex items-center gap-3 px-3 py-3 hover:bg-gray-800/60 rounded-xl transition-all duration-200 group border border-transparent hover:border-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/10"
                      onClick={handleMenuToggle}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-200 border border-indigo-500/20">
                        <i className="fa-solid fa-cog text-indigo-400 text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-bold text-gray-200 group-hover:text-white font-['Orbitron']">Admin Settings</span>
                        <p className="text-xs text-gray-400 font-['Roboto']">System configuration</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-gray-500 text-sm group-hover:text-gray-400 transition-all duration-200 group-hover:translate-x-1"></i>
                    </Link>
                  </div>
                </div>
              )}

              {/* Support & Logout */}
              <div className="px-3 mt-4 pt-3 border-t border-gray-700/50">
                <a
                  href="https://discord.gg/95BKaYTPPS"
                  className="flex items-center gap-3 px-3 py-3 hover:bg-gray-800/60 rounded-xl transition-all duration-200 group border border-transparent hover:border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/10"
                  onClick={handleMenuToggle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-indigo-500/30 transition-all duration-200 border border-purple-500/20">
                    <i className="fab fa-discord text-purple-400 text-sm"></i>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold text-gray-200 group-hover:text-white font-['Orbitron']">Discord Support</span>
                    <p className="text-xs text-gray-400 font-['Roboto']">Get help from community</p>
                  </div>
                  <i className="fa-solid fa-external-link text-gray-500 text-sm"></i>
                </a>

                <button
                  onClick={() => {
                    Logout();
                    handleMenuToggle();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 hover:bg-red-500/20 rounded-xl transition-all duration-200 group mt-2 border border-transparent hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center group-hover:from-red-500/30 group-hover:to-red-600/30 transition-all duration-200 border border-red-500/20">
                    <i className="fa-solid fa-sign-out-alt text-red-400 text-sm"></i>
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-sm font-bold text-gray-200 group-hover:text-white font-['Orbitron']">Logout</span>
                    <p className="text-xs text-gray-400 font-['Roboto']">Sign out of your account</p>
                  </div>
                  <i className="fa-solid fa-chevron-right text-gray-500 text-sm group-hover:text-gray-400 transition-all duration-200 group-hover:translate-x-1"></i>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default UserMenu;