import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Sparkles, Flame, Disc as Discord, Menu, X } from 'lucide-react';
import UserMenu from "../components/HeaderLogged/UserMenu";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import RegionToggle from "./RegionToggle";
import { useRegion } from "../contexts/RegionContext";

const HeaderLogged: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem("Token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const { region } = useRegion();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { isAdmin, isVip } = response.data;
        setIsAdmin(isAdmin);
        setIsVip(isVip);
      } catch (error) {
        console.error("Erro ao verificar status do usuário:", error);
      }
    };

    checkUserStatus();
  }, [token]);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg sticky top-0 z-50 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="group flex items-center">
            <Flame className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-all duration-300 transform group-hover:scale-110" />
            <div className="ml-2 text-xl md:text-2xl font-black bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-clip-text text-transparent hover:from-blue-400 hover:via-blue-300 hover:to-blue-400 transition duration-300">
              SEVENXLEAKS
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Region Toggle */}
            <RegionToggle />
            
            {/* Premium Banner */}
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full text-center flex items-center space-x-3 border border-gray-700/50 shadow-xl">
              <button
                onClick={() => window.open("https://sevenxhub.com", "_blank")}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition duration-300 transform hover:scale-105"
              >
                WATCH HERE PREMIUM VIDEOS FOR FREE
              </button>
            </div>

            {/* VIP/Discord Buttons */}
            <div className="flex items-center space-x-4">
              {/* Asian Region Buttons */}
              {region === 'asian' && (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/banned"
                    className="px-4 py-2 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Banned
                  </Link>
                  <Link
                    to="/unknown"
                    className="px-4 py-2 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Unknown
                  </Link>
                </div>
              )}
              
              {isVip ? (
                <Link
                  to="/vip"
                  className={`relative group overflow-hidden px-4 py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    region === 'asian' 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/20'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/20'
                  }`}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>VIP Access</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-500 ease-in-out"></div>
                </Link>
              ) : (
                <Link
                  to="/plans"
                  className={`relative group overflow-hidden px-6 py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    region === 'asian' 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/20'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/20'
                  }`}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Become VIP</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-500 ease-in-out"></div>
                </Link>
              )}

              <a
                href="https://discord.com/invite/95BKaYTPPS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-bold bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Discord className="w-5 h-5" />
                <span>Discord</span>
              </a>
            </div>

            {/* User Menu */}
<UserMenu
  name={name}
  isMenuOpen={isMenuOpen}
  handleMenuToggle={handleMenuToggle}
  isVip={isVip}
  isAdmin={isAdmin}
  setIsMenuOpen={setIsMenuOpen} // ✅ adicione isso
/>

            {/* ThemeToggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button and ThemeToggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={handleMobileMenuToggle}
              className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
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
              className="md:hidden w-full border-t border-gray-700/50 mt-2"
            >
              <div className="py-4 space-y-4">
                {/* Mobile Premium Banner */}
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-800/60 backdrop-blur-sm p-4 rounded-lg text-center space-y-3 border border-gray-700/50 shadow-xl">
                  {/* Mobile Region Toggle */}
                  <div className="flex justify-center mb-3">
                    <RegionToggle />
                  </div>
                  
                  <button
                    onClick={() => window.open("https://sevenxhub.com", "_blank")}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition duration-300"
                  >
                    WATCH HERE PREMIUM VIDEOS FOR FREE
                  </button>
                </div>

                {/* Mobile Asian Region Buttons */}
                {region === 'asian' && (
                  <div className="space-y-3">
                    <Link
                      to="/banned"
                      className="block w-full px-4 py-3 rounded-lg text-center font-bold bg-purple-600 hover:bg-purple-700 transition-all duration-300"
                    >
                      Banned Content
                    </Link>
                    <Link
                      to="/unknown"
                      className="block w-full px-4 py-3 rounded-lg text-center font-bold bg-purple-600 hover:bg-purple-700 transition-all duration-300"
                    >
                      Unknown Content
                    </Link>
                  </div>
                )}

                {/* Mobile VIP Button */}
                {isVip ? (
                  <Link
                    to="/vip"
                    className={`block w-full px-4 py-3 rounded-lg text-center font-bold transition-all duration-300 ${
                      region === 'asian' 
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                    }`}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>VIP Access</span>
                    </span>
                  </Link>
                ) : (
                  <Link
                    to="/plans"
                    className={`block w-full px-4 py-3 rounded-lg text-center font-bold transition-all duration-300 ${
                      region === 'asian' 
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                    }`}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Become VIP</span>
                    </span>
                  </Link>
                )}

                {/* Mobile Discord Button */}
                <a
                  href="https://discord.com/invite/95BKaYTPPS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-3 rounded-lg text-center font-bold bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-300"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Discord className="w-5 h-5" />
                    <span>Join Discord</span>
                  </span>
                </a>

                {/* Mobile User Menu */}
                <div className="pt-4 border-t border-gray-700/50">
<UserMenu
  name={name}
  isMenuOpen={isMenuOpen}
  handleMenuToggle={handleMenuToggle}
  isVip={isVip}
  isAdmin={isAdmin}
  setIsMenuOpen={setIsMenuOpen} // ✅ adicione isso
/>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default HeaderLogged;