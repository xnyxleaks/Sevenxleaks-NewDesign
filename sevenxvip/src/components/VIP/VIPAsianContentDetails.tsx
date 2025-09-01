import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Download,
  Crown,
  Shield,
  Sparkles,
  Star
} from "lucide-react";
import DownloadOptions from "../DownloadOptions";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import LoadingVip from "../Loaders/LoadingVip";
import VIPHeader from "./VIPHeader";

type ContentItem = {
  id: number;
  name: string;
  mega: string;
  mega2: string;
  pixeldrain: string;
  AdmavenMega: string;
  AdmavenMega2: string;
  AdmavenPixeldrain: string;
  category: string;
  postDate: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
};

const VIPAsianContentDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("Token");
        const response = await axios.get<{ data: string }>(
          `${import.meta.env.VITE_BACKEND_URL}/vip-asiancontent/${slug}`,
          { 
            headers: { 
              Authorization: `Bearer ${token}`, 
              "x-api-key": `${import.meta.env.VITE_FRONTEND_API_KEY}` 
            } 
          }
        );
        if (!response.data || !response.data.data) throw new Error("Resposta inválida do servidor");
        const decoded = decodeModifiedBase64(response.data.data);
        setContent(decoded);
      } catch (error) {
        console.error("Error fetching VIP Asian content details:", error);
        setError("Failed to load VIP content details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchContentDetails();
  }, [slug]);

  function decodeModifiedBase64(encodedStr: string): any {
    const fixedBase64 = encodedStr.slice(0, 2) + encodedStr.slice(3);
    const jsonString = atob(fixedBase64);
    return JSON.parse(jsonString);
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  if (loading) return (
    <div>
      <LoadingVip />
    </div>
  );

  if (error) {
    return (
      <div>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900/10 to-gray-900 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md bg-gray-800/90 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Error</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <Link to="/vip-asian" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black rounded-xl font-semibold transition-all duration-300">
              <ArrowLeft className="w-4 h-4" />
              Back to VIP Asian
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900/10 to-gray-900 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md bg-gray-800/90 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Content Not Found</h2>
            <p className="text-gray-300 mb-6">The VIP Asian content you're looking for doesn't exist or has been removed.</p>
            <Link to="/vip-asian" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black rounded-xl font-semibold transition-all duration-300">
              <ArrowLeft className="w-4 h-4" />
              Back to VIP Asian
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900/10 to-gray-900 overflow-x-clip">
        <Helmet>
          <title>Sevenxleaks - {content.name} (VIP Asian)</title>
          <link rel="canonical" href={`https://sevenxleaks.com/vip-asian/${content.slug}`} />
          <style>{`
            html, body, #root { max-width: 100%; overflow-x: hidden; }
            [data-ads], iframe { width: 100% !important; max-width: 100% !important; }
            * { word-break: break-word; }
          `}</style>
        </Helmet>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-gray-900 to-gray-900" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link to="/vip-asian" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/60 hover:bg-gray-700/80 border border-yellow-500/30 hover:border-yellow-400/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-yellow-500/10">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to VIP Asian</span>
            </Link>
          </motion.div>

          {/* VIP Content Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-gray-800/90 backdrop-blur-xl border border-yellow-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-yellow-500/20">
            {/* VIP Header */}
            <div className="bg-gradient-to-r from-yellow-900/50 to-purple-900/30 px-6 py-6 border-b border-yellow-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-xl">
                  <Crown className="w-6 h-6 text-black" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-500/30 to-purple-500/20 text-yellow-300 rounded-full border border-yellow-500/40 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3" />
                  <span className="font-bold text-xs hidden sm:inline">VIP ASIAN EXCLUSIVE</span>
                  <span className="font-bold text-xs sm:hidden">VIP ASIAN</span>
                </div>
              </div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight break-words">
                {content.name}
              </motion.h1>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-700/50 rounded-lg border border-gray-600/50 backdrop-blur-sm">
                  <Calendar className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300 text-sm">{formatDate(content.postDate)}</span>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-yellow-500/20 text-yellow-300 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
                  <Tag className="w-4 h-4" />
                  <span className="font-medium text-sm break-words">{content.category}</span>
                </motion.div>
              </div>
            </div>

            {/* VIP Download Section */}
            <div className="p-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Download className="w-4 h-4 text-black" />
                  </div>
                  <h2 className="text-xl font-bold text-white">VIP Asian Download Options</h2>
                  <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
                </div>

                <div className="bg-gradient-to-r from-yellow-500/15 to-purple-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-sm">VIP Asian Benefits Active</span>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                  </div>
                  <p className="text-gray-300 text-sm">Enjoy instant access to premium Asian content, no ads, and exclusive download speeds as a VIP member.</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <div className="w-full max-w-full overflow-hidden">
                  <DownloadOptions
                    primaryLinks={{
                      mega: content.mega,
                      mega2: content.mega2,
                      pixeldrain: content.pixeldrain,
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VIPAsianContentDetails;