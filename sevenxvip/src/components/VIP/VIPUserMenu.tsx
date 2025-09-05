import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, Star, Shield } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface VIPUserMenuProps {
  name: string | null;
  isMenuOpen: boolean;
  handleMenuToggle: () => void;
  isVip: boolean;
  isAdmin: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VIPUserMenu: React.FC<VIPUserMenuProps> = ({
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

  
      const { theme } = useTheme();
      const isDark = theme === "dark";

  const handleAccountClick = () => {
    if(isMobile){
      navigate('/account');
    } else{
      handleMenuToggle();
    }
  };

  return (
    <nav className="relative z-50">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="hidden sm:flex items-center gap-3 cursor-pointer px-4 py-3 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500/30 hover:to-yellow-600/30 backdrop-blur-sm border border-yellow-500/40 hover:border-yellow-400/60 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/20"
        onClick={handleAccountClick}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg ring-2 ring-yellow-400/30">
            <i className="fa-solid fa-user text-black text-sm font-bold"></i>
          </div>
          
          {/* VIP Crown Badge */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center shadow-lg ring-2 ring-yellow-300/40">
            <Crown className="w-3 h-3 text-black animate-pulse" />
          </div>
          
          {isAdmin && (
            <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-red-500/30">
              <Shield className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="hidden sm:block">
<p className={`${isDark ? "font-semibold text-yellow-200 text-sm font-['Roboto']" : "font-semibold text-black text-sm font-['Roboto']"}`}>
  {name}
</p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 font-bold flex items-center gap-1 text-xs">
              <Crown className="w-3 h-3 animate-pulse" />
              VIP MEMBER
            </span>
            {isAdmin && (
              <span className="text-red-400 text-xs flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Admin
              </span>
            )}
          </div>
        </div>
        <i className="fa-solid fa-chevron-down text-yellow-400 text-xs hidden sm:block transition-transform duration-200 group-hover:rotate-180"></i>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute right-0 mt-4 w-72 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-yellow-500/30 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* VIP Header do Menu */}
            <div className="p-4 bg-gradient-to-br from-yellow-900/60 via-yellow-800/40 to-gray-900/80 border-b border-yellow-500/30">
              <div className="flex items-center gap-4">
                <div className="relative max-w-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg ring-1 ring-yellow-400/30">
                    <i className="fa-solid fa-user text-black text-sm font-bold"></i>
                  </div>
                  
                  {/* VIP Crown */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center shadow-md ring-1 ring-yellow-300/50">
                    <Crown className="w-3 h-3 text-black animate-pulse" />
                  </div>
                  
                  {isAdmin && (
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-md ring-1 ring-red-500/40">
                      <Shield className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="font-bold text-yellow-200 text-base font-['Roboto]">{name}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400/30 to-yellow-500/30 text-yellow-300 rounded-full text-xs font-bold border border-yellow-400/40 backdrop-blur-sm">
                      <Crown className="w-3 h-3 animate-pulse" />
                      VIP PREMIUM
                    </span>
                    {isAdmin && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 rounded-full text-xs font-bold border border-red-500/30 backdrop-blur-sm">
                        <Shield className="w-3 h-3" />
                        ADMIN
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* VIP Menu Items */}
            <div className="py-2">
              {/* Account Section */}
              <div className="px-2">
                <Link
                  to="/account"
                  className="flex items-center gap-3 px-3 py-3 hover:bg-yellow-500/10 rounded-lg transition-all duration-200 group border border-transparent hover:border-yellow-500/30"
                  onClick={handleMenuToggle}
                >
                  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-yellow-500/30 to-yellow-600/30 flex items-center justify-center group-hover:from-yellow-500/40 group-hover:to-yellow-600/40 transition-all duration-200 border border-yellow-500/30">
                    <i className="fa-solid fa-user text-yellow-400 text-sm"></i>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-yellow-200 group-hover:text-yellow-100">VIP Account</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-yellow-500 text-xs"></i>
                </Link>
              </div>

              {/* VIP Features Section */}
              <div className="px-3 mt-3">
                <div className="text-xs font-bold text-yellow-500 uppercase tracking-wider px-3 py-1 font-['Roboto]">
                  VIP EXCLUSIVE
                </div>
                <div className="space-y-1">
                  <Link
                    to="/recommend"
                    className="flex items-center gap-3 px-3 py-3 hover:bg-yellow-500/10 rounded-xl transition-all duration-200 group border border-transparent hover:border-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/10"
                    onClick={handleMenuToggle}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center group-hover:from-yellow-500/30 group-hover:to-yellow-600/30 transition-all duration-200 border border-yellow-500/20">
                      <i className="fa-solid fa-plus text-yellow-400 text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-bold text-yellow-200 group-hover:text-yellow-100 font-['Roboto]">Recommend Content</span>
                      <p className="text-xs text-yellow-400 font-roboto">Suggest premium content</p>
                    </div>
                    <i className="fa-solid fa-chevron-right text-yellow-500 text-sm group-hover:text-yellow-400 transition-all duration-200 group-hover:translate-x-1"></i>
                  </Link>
                  
                  <Link
                    to="/vip-asian"
                    className="flex items-center gap-3 px-3 py-3 hover:bg-yellow-500/10 rounded-xl transition-all duration-200 group border border-transparent hover:border-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/10"
                    onClick={handleMenuToggle}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-yellow-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-yellow-500/30 transition-all duration-200 border border-purple-500/20">
                      <i className="fa-solid fa-crown text-purple-400 text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-bold text-yellow-200 group-hover:text-yellow-100 font-['Roboto]">VIP Asian</span>
                      <p className="text-xs text-yellow-400 font-roboto">Premium Asian content</p>
                    </div>
                    <i className="fa-solid fa-chevron-right text-yellow-500 text-sm group-hover:text-yellow-400 transition-all duration-200 group-hover:translate-x-1"></i>
                  </Link>
                  
                  <Link
                    to="/vip-western"
                    className="flex items-center gap-3 px-3 py-3 hover:bg-yellow-500/10 rounded-xl transition-all duration-200 group border border-transparent hover:border-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/10"
                    onClick={handleMenuToggle}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-yellow-500/30 transition-all duration-200 border border-orange-500/20">
                      <i className="fa-solid fa-crown text-orange-400 text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-bold text-yellow-200 group-hover:text-yellow-100 font-['Roboto]">VIP Western</span>
                      <p className="text-xs text-yellow-400 font-roboto">Premium Western content</p>
                    </div>
                    <i className="fa-solid fa-chevron-right text-yellow-500 text-sm group-hover:text-yellow-400 transition-all duration-200 group-hover:translate-x-1"></i>
                  </Link>
                </div>
              </div>

              {/* Admin Section */}
              {isAdmin && (
                <div className="px-3 mt-3">
                  <div className="text-xs font-bold text-red-500 uppercase tracking-wider px-3 py-1 font-['Roboto]">
                    ADMIN CONTROLS
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/admin/requests"
                      className="flex items-center gap-3 px-3 py-3 hover:bg-red-500/10 rounded-xl transition-all duration-200 group border border-transparent hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/10"
                      onClick={handleMenuToggle}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center group-hover:from-red-500/30 group-hover:to-red-600/30 transition-all duration-200 border border-red-500/20">
                        <i className="fa-solid fa-clipboard-list text-red-400 text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-bold text-yellow-200 group-hover:text-yellow-100 font-['Roboto]">View Requests</span>
                        <p className="text-xs text-yellow-400 font-roboto">Manage user requests</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-yellow-500 text-sm group-hover:text-yellow-400 transition-all duration-200 group-hover:translate-x-1"></i>
                    </Link>
                    
                    <Link
                      to="/admin/stats"
                      className="flex items-center gap-3 px-3 py-3 hover:bg-green-500/10 rounded-xl transition-all duration-200 group border border-transparent hover:border-green-500/20 hover:shadow-lg hover:shadow-green-500/10"
                      onClick={handleMenuToggle}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center group-hover:from-green-500/30 group-hover:to-green-600/30 transition-all duration-200 border border-green-500/20">
                        <i className="fa-solid fa-chart-line text-green-400 text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-bold text-yellow-200 group-hover:text-yellow-100 font-['Roboto]">View Stats</span>
                        <p className="text-xs text-yellow-400 font-roboto">Analytics & metrics</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-yellow-500 text-sm group-hover:text-yellow-400 transition-all duration-200 group-hover:translate-x-1"></i>
                    </Link>
                    
                    <Link
                      to="/admin/settings"
                      className="flex items-center gap-3 px-3 py-3 hover:bg-indigo-500/10 rounded-xl transition-all duration-200 group border border-transparent hover:border-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/10"
                      onClick={handleMenuToggle}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-200 border border-indigo-500/20">
                        <i className="fa-solid fa-cog text-indigo-400 text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-bold text-yellow-200 group-hover:text-yellow-100 font-['Roboto]">Admin Settings</span>
                        <p className="text-xs text-yellow-400 font-roboto">System configuration</p>
                      </div>
                      <i className="fa-solid fa-chevron-right text-yellow-500 text-sm group-hover:text-yellow-400 transition-all duration-200 group-hover:translate-x-1"></i>
                    </Link>
                  </div>
                </div>
              )}

              {/* Support & Logout */}
              <div className="px-3 mt-4 pt-3 border-t border-yellow-500/30">
                <a
                  href="https://discord.gg/95BKaYTPPS"
                  className="flex items-center gap-3 px-3 py-3 hover:bg-purple-500/10 rounded-xl transition-all duration-200 group border border-transparent hover:border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/10"
                  onClick={handleMenuToggle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-indigo-500/30 transition-all duration-200 border border-purple-500/20">
                    <i className="fab fa-discord text-purple-400 text-sm"></i>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold text-yellow-200 group-hover:text-yellow-100 font-['Roboto]">VIP Discord</span>
                    <p className="text-xs text-yellow-400 font-roboto">Exclusive VIP community</p>
                  </div>
                  <i className="fa-solid fa-external-link text-yellow-500 text-sm"></i>
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
                    <span className="text-sm font-bold text-yellow-200 group-hover:text-yellow-100 font-['Roboto]">Logout</span>
                    <p className="text-xs text-yellow-400 font-roboto">Sign out of VIP account</p>
                  </div>
                  <i className="fa-solid fa-chevron-right text-yellow-500 text-sm group-hover:text-yellow-400 transition-all duration-200 group-hover:translate-x-1"></i>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default VIPUserMenu;