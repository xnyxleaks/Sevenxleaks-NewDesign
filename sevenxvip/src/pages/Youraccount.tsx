import React, { useEffect, useState } from "react";
import { Userdatatypes } from "../../types/Userdatatypes";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useTheme } from "../contexts/ThemeContext";
import UserProfileSection from "../components/YourAccount/UserProfileSection";
import SubscriptionSection from "../components/YourAccount/SubscriptionSection";
import VIPBenefitsSection from "../components/YourAccount/VIPBenefitsSection";
import FavoritesSection from "../components/YourAccount/FavoritesSection";
import ContactSection from "../components/YourAccount/ContactSection";
import AccountOptionsSection from "../components/YourAccount/AccountOptionsSection";
import CancelSubscriptionModal from "../components/YourAccount/CancelSubscriptionModal";
import { motion } from "framer-motion";
import { Crown, User, Shield, Star, Settings } from "lucide-react";
import { Helmet } from "react-helmet";

const YourAccount: React.FC = () => {
  const [userData, setUserData] = useState<Userdatatypes | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isCanceling, setIsCanceling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const token = localStorage.getItem("Token");
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } 
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [token]);

  const calculateDaysLeft = (expirationDate: number): number => {
    const currentDate = new Date();
    const expDate = new Date(expirationDate);
    const timeDiff = expDate.getTime() - currentDate.getTime();
    return Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <ErrorMessage message="User not found or unable to fetch user data." />
      </div>
    );
  }

  const isSubscriptionActive = userData.vipExpirationDate
    ? new Date(userData.vipExpirationDate) > new Date()
    : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Helmet>
        <title>Your Account - Sevenxleaks</title>
        <link rel="canonical" href="https://sevenxleaks.com/account" />
      </Helmet>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl"
            >
              <User className="w-8 h-8 text-white" />
            </motion.div>
            {userData.isVip && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Crown className="w-6 h-6 text-black" />
              </motion.div>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 font-orbitron">
            YOUR ACCOUNT
          </h1>
          <p className="text-lg text-gray-400 font-roboto">
            Manage your profile, subscription, and preferences
          </p>

          {/* Status Badges */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${
              userData.isVip 
                ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                : 'bg-gray-700/50 border-gray-600/30 text-gray-400'
            }`}>
              <Crown className="w-4 h-4" />
              <span className="font-medium text-sm">
                {userData.isVip ? 'VIP Member' : 'Free Member'}
              </span>
            </div>
            
            {userData.isAdmin && (
              <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-full backdrop-blur-sm">
                <Shield className="w-4 h-4" />
                <span className="font-medium text-sm">Administrator</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <UserProfileSection userData={userData} setUserData={setUserData} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <SubscriptionSection 
                userData={userData} 
                isSubscriptionActive={isSubscriptionActive}
                isCanceling={isCanceling}
                setShowCancelModal={setShowCancelModal}
              />
            </motion.div>
            
            {userData.isVip && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <VIPBenefitsSection
                  vipExpirationDate={userData.vipExpirationDate}
                  calculateDaysLeft={calculateDaysLeft}
                />
              </motion.div>
            )}
          
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ContactSection />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AccountOptionsSection userData={userData} />
            </motion.div>

            {/* Quick Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold font-orbitron">Account Stats</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-400 text-sm">Member since</span>
                  <span className="text-white font-medium">
                    {new Date(userData.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-400 text-sm">Account type</span>
                  <span className={`font-medium ${userData.isVip ? 'text-yellow-400' : 'text-gray-300'}`}>
                    {userData.isVip ? 'VIP Premium' : 'Free Account'}
                  </span>
                </div>
                
                {userData.isVip && (
                  <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <span className="text-yellow-400 text-sm">VIP expires in</span>
                    <span className="text-yellow-400 font-bold">
                      {calculateDaysLeft(userData.vipExpirationDate)} days
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {showCancelModal && (
        <CancelSubscriptionModal 
          onCancel={() => setShowCancelModal(false)}
          expirationDate={userData.vipExpirationDate}
        />
      )}
    </div>
  );
};

export default YourAccount;