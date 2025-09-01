import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, Sparkles, Star, Shield } from "lucide-react";

const VIPChooser: React.FC = () => {
  const navigate = useNavigate();

  const handleChoice = (type: 'vip-asian' | 'vip-western') => {
    navigate(`/${type}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* VIP Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/30 via-gray-900 to-gray-900"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl animate-pulse"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        {/* VIP Crown Logo */}
        <motion.div
          initial={{ scale: 0.9, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-yellow-500/40 border-4 border-yellow-300/30"
            >
              <Crown className="w-16 h-16 text-black" />
            </motion.div>
            
            {/* Floating sparkles */}
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                x: [-5, 5, -5],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4"
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [10, -10, 10],
                x: [5, -5, 5],
                rotate: [360, 180, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute -bottom-4 -left-4"
            >
              <Star className="w-6 h-6 text-yellow-300" />
            </motion.div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 mb-6 font-orbitron tracking-wider drop-shadow-2xl">
            VIP LOUNGE
          </h1>
          <div className="w-40 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mx-auto rounded-full shadow-lg shadow-yellow-500/50"></div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl sm:text-2xl text-yellow-200 mb-16 font-roboto font-light"
        >
          Choose Your Premium Experience
        </motion.p>
        
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
          {/* VIP Asian Choice */}
          <motion.div
            className="group relative cursor-pointer"
            onClick={() => handleChoice('vip-asian')}
            whileHover={{ y: -15, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="relative bg-gray-800/80 backdrop-blur-xl border border-yellow-500/40 rounded-3xl p-6 sm:p-10 w-72 sm:w-80 h-64 sm:h-80 overflow-hidden shadow-2xl group-hover:shadow-yellow-500/30 transition-all duration-500">
              {/* VIP Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-purple-500/10 to-yellow-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* VIP Glow Effect */}
              <div className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-32 sm:w-40 h-32 sm:h-40 bg-yellow-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <div className="mb-4 sm:mb-8">
                  <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-yellow-400 via-yellow-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-yellow-500/60 transition-all duration-300 group-hover:rotate-6 border-2 border-yellow-400/40">
                    <div className="relative">
                      <Crown className="w-8 sm:w-12 h-8 sm:h-12 text-black" />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1"
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4 font-orbitron">
                  VIP ASIAN
                  <span className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300 block text-base sm:text-xl mt-1">
                    PREMIUM
                  </span>
                </h2>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 font-roboto text-sm sm:text-base px-2">
                  Exclusive Asian premium content
                </p>
                
                {/* VIP Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  VIP
                </div>
                
                {/* Hover Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/60 rounded-3xl transition-all duration-500"></div>
              </div>
            </div>
          </motion.div>
          
          {/* VIP Western Choice */}
          <motion.div
            className="group relative cursor-pointer"
            onClick={() => handleChoice('vip-western')}
            whileHover={{ y: -15, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="relative bg-gray-800/80 backdrop-blur-xl border border-yellow-500/40 rounded-3xl p-6 sm:p-10 w-72 sm:w-80 h-64 sm:h-80 overflow-hidden shadow-2xl group-hover:shadow-yellow-500/30 transition-all duration-500">
              {/* VIP Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-yellow-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* VIP Glow Effect */}
              <div className="absolute -bottom-10 sm:-bottom-20 -right-10 sm:-right-20 w-32 sm:w-40 h-32 sm:h-40 bg-yellow-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <div className="mb-4 sm:mb-8">
                  <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-yellow-500/60 transition-all duration-300 group-hover:rotate-6 border-2 border-yellow-400/40">
                    <div className="relative">
                      <Crown className="w-8 sm:w-12 h-8 sm:h-12 text-black" />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="absolute -top-1 -left-1"
                      >
                        <Star className="w-4 h-4 text-yellow-300" />
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4 font-orbitron">
                  VIP WESTERN
                  <span className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300 block text-base sm:text-xl mt-1">
                    PREMIUM
                  </span>
                </h2>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 font-roboto text-sm sm:text-base px-2">
                  Exclusive Western premium content
                </p>
                
                {/* VIP Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  VIP
                </div>
                
                {/* Hover Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/60 rounded-3xl transition-all duration-500"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* VIP Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-yellow-400 font-orbitron">VIP EXCLUSIVE ACCESS</h3>
              <Shield className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-gray-300 text-sm sm:text-base font-roboto px-4">
              Enjoy premium content with no ads, exclusive downloads, and priority access to all features
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VIPChooser;