import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  Send, 
  MessageSquare, 
  Lightbulb, 
  CheckCircle, 
  AlertCircle, 
  Star,
  Sparkles,
  Crown,
  Heart,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const RecommendContent: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("Token");
  const email = localStorage.getItem("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/recommendations`,
        {
          title,
          description,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setMessageType("success");
      setTitle("");
      setDescription("");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      setMessage("There was an error submitting your recommendation.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <Helmet>
        <title>Recommend Content - Sevenxleaks</title>
        <link rel="canonical" href="https://sevenxleaks.com/recommend" />
      </Helmet>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700 hover:border-purple-500/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-purple-500/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
            >
              <Lightbulb className="w-8 h-8 text-white" />
            </motion.div>
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 font-orbitron">
                RECOMMEND CONTENT
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/30 mt-2"></div>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-roboto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Have an idea for content you'd like to see? Share your recommendations with us and help shape our community!
          </motion.p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* VIP Header */}
          <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 px-8 py-6 border-b border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-orbitron">VIP Content Recommendation</h2>
                <p className="text-purple-300 text-sm font-roboto">Exclusive feature for VIP members</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Status Messages */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-8 p-6 rounded-2xl flex items-center gap-4 ${
                  messageType === "success" 
                    ? "bg-green-500/10 border border-green-500/20" 
                    : "bg-red-500/10 border border-red-500/20"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  messageType === "success" 
                    ? "bg-green-500/20" 
                    : "bg-red-500/20"
                }`}>
                  {messageType === "success" ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${
                    messageType === "success" ? "text-green-400" : "text-red-400"
                  }`}>
                    {messageType === "success" ? "Success!" : "Error"}
                  </h3>
                  <p className={`${
                    messageType === "success" ? "text-green-300" : "text-red-300"
                  }`}>
                    {message}
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-lg font-bold text-white mb-4 font-orbitron flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                  Content Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 font-roboto text-lg"
                    placeholder="Enter a descriptive title for your content recommendation"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Description Input */}
              <div>
                <label htmlFor="description" className="block text-lg font-bold text-white mb-4 font-orbitron flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Detailed Description
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={8}
                    className="w-full px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none font-roboto text-lg"
                    placeholder="Provide a detailed description of the content you'd like to recommend. Include any specific details, sources, or reasons why this content would be valuable to our community..."
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm text-gray-400 font-roboto">
                    {description.length}/500 characters
                  </div>
                  <div className="flex items-center gap-1 text-xs text-purple-400">
                    <Star className="w-3 h-3" />
                    <span>VIP Feature</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl font-orbitron ${
                  isSubmitting 
                    ? 'bg-gray-700 cursor-not-allowed opacity-75' 
                    : 'bg-gradient-to-r from-purple-500 via-purple-600 to-blue-600 hover:from-purple-600 hover:via-purple-700 hover:to-blue-700 hover:shadow-purple-500/30 transform hover:scale-[1.02]'
                } text-white border border-purple-500/30`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>SUBMITTING RECOMMENDATION...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    <span>SUBMIT RECOMMENDATION</span>
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Tips Card */}
          <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white font-orbitron">
                Recommendation Tips
              </h3>
            </div>
            <ul className="space-y-4 text-gray-300 font-roboto">
              {[
                "Be specific about what type of content you're recommending",
                "Include any relevant sources or references if available", 
                "Explain why this content would be valuable to our community",
                "Check if similar content already exists before submitting"
              ].map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-sm leading-relaxed">{tip}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Benefits Card */}
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white font-orbitron">
                VIP Benefits
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { icon: Star, text: "Priority content consideration" },
                { icon: Heart, text: "Direct communication with admins" },
                { icon: Sparkles, text: "Exclusive content requests" },
                { icon: Crown, text: "VIP community recognition" }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-xl border border-purple-500/20"
                >
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-gray-300 font-roboto text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center shadow-xl"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-pink-400" />
            <h3 className="text-2xl font-bold text-white font-orbitron">Join Our Community</h3>
            <Heart className="w-6 h-6 text-pink-400" />
          </div>
          <p className="text-gray-300 mb-6 font-roboto text-lg">
            Connect with other VIP members and stay updated on the latest content
          </p>
          <motion.a
            href="https://discord.gg/95BKaYTPPS"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 font-orbitron"
          >
            <i className="fab fa-discord text-xl"></i>
            <span>JOIN DISCORD</span>
            <Sparkles className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default RecommendContent;