import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Crown, Calendar, Plus, Star, Sparkles, Shield, AlertTriangle } from "lucide-react";
import VIPHeader from "../components/VIP/VIPHeader";
import { useTheme } from "../contexts/ThemeContext";
import MonthFilter from "../components/MonthFilter";

type LinkItem = {
  id: string;
  name: string;
  category: string;
  postDate: string;
  slug: string;
  thumbnail?: string;
  createdAt: string;
  contentType?: string;
  region: string;
};

type Category = {
  id: string;
  name: string;
  category: string;
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-yellow-500/20 rounded-full animate-spin"></div>
      <div className="absolute inset-0 border-4 border-transparent border-t-yellow-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Crown className="w-6 h-6 text-yellow-500 animate-pulse" />
      </div>
    </div>
  </div>
);

const VIPBannedPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [dateFilter, setDateFilter] = useState("all");

  function decodeModifiedBase64<T>(encodedStr: string): T {
    const fixedBase64 = encodedStr.slice(0, 2) + encodedStr.slice(3);
    const jsonString = atob(fixedBase64);
    return JSON.parse(jsonString) as T;
  }

  const fetchContent = async (page: number, isLoadMore = false) => {
    try {
      if (!isLoadMore) setLoading(true);
      setSearchLoading(true);

      const params = new URLSearchParams({
        page: page.toString(),
        sortBy: "postDate",
        sortOrder: "DESC",
        limit: "24",
        contentType: "vip-banned"
      });

      if (searchName) params.append("search", searchName);
      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedRegion) params.append("region", selectedRegion);
      if (selectedMonth) params.append("month", selectedMonth);
      if (dateFilter !== "all") params.append("dateFilter", dateFilter);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/universal-search/search?${params}`,
        {
          headers: {
            "x-api-key": `${import.meta.env.VITE_FRONTEND_API_KEY}`,
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      if (!response.data?.data) {
        throw new Error("Invalid server response");
      }

      const decoded = decodeModifiedBase64<{ data: LinkItem[]; totalPages: number }>(
        response.data.data
      );

      const { data: rawData, totalPages } = decoded;

      if (isLoadMore) {
        setLinks((prev) => [...prev, ...rawData]);
        setFilteredLinks((prev) => [...prev, ...rawData]);
      } else {
        setLinks(rawData);
        setFilteredLinks(rawData);
      }

      setTotalPages(totalPages);
      setHasMoreContent(page < totalPages);

      const uniqueCategories = Array.from(new Set(rawData.map((item) => item.category))).map(
        (category) => ({
          id: category,
          name: category,
          category,
        })
      );

      setCategories((prev) => {
        const existingCategories = new Set(prev.map((c) => c.category));
        const newCategories = uniqueCategories.filter((c) => !existingCategories.has(c.category));
        return [...prev, ...newCategories];
      });
    } catch (error) {
      console.error("Error fetching VIP Banned content:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchContent(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchName, selectedCategory, selectedRegion, selectedMonth, dateFilter]);

  const handleLoadMore = () => {
    if (loadingMore || currentPage >= totalPages) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchContent(nextPage, true);
  };

  const recentLinks = filteredLinks.slice(0, 5);

  const formatDateHeader = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  const groupPostsByDate = (posts: LinkItem[]) => {
    const grouped: { [key: string]: LinkItem[] } = {};

    posts.forEach((post) => {
      const dateKey = formatDateHeader(post.postDate || post.createdAt);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(post);
    });

    return grouped;
  };

  const groupedLinks = groupPostsByDate(filteredLinks);

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-yellow-900/10 to-gray-900 text-white"
          : "bg-gradient-to-br from-gray-50 via-yellow-100/20 to-gray-100 text-gray-900"
      }`}
    >
      <Helmet>
        <title>VIP Banned Content - Sevenxleaks</title>
        <link rel="canonical" href="https://sevenxleaks.com/vip-banned" />
      </Helmet>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          className={`backdrop-blur-xl border rounded-3xl p-6 shadow-2xl ${
            isDark
              ? "bg-gray-800/60 border-yellow-500/30 shadow-yellow-500/10"
              : "bg-white/80 border-yellow-400/40 shadow-yellow-400/10"
          }`}
        >
          <div
            className={`flex flex-col lg:flex-row items-center gap-4 rounded-2xl px-6 py-4 border shadow-inner ${
              isDark ? "bg-gray-700/50 border-yellow-500/20" : "bg-gray-100/50 border-yellow-400/30"
            }`}
          >
            {/* Search Bar */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Crown className="text-yellow-400 w-5 h-5 animate-pulse" />
                <AlertTriangle className="text-red-400 w-4 h-4" />
              </div>
              <input
                type="text"
                className={`flex-1 bg-transparent border-none outline-none text-lg ${
                  isDark ? "text-white placeholder-yellow-300/60" : "text-gray-900 placeholder-yellow-600/60"
                }`}
                placeholder="Search VIP banned content..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              {searchLoading && (
                <div
                  className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${
                    isDark ? "border-yellow-400" : "border-yellow-600"
                  }`}
                ></div>
              )}
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-2">
              {["all", "today", "yesterday", "7days"].map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border whitespace-nowrap ${
                    dateFilter === filter
                      ? isDark
                        ? "bg-yellow-500 text-black border-yellow-400 shadow-lg shadow-yellow-500/30"
                        : "bg-yellow-600 text-white border-yellow-500 shadow-lg shadow-yellow-500/20"
                      : isDark
                        ? "bg-gray-700/50 text-gray-300 hover:bg-yellow-500/20 border-gray-600/50 hover:text-yellow-300"
                        : "bg-gray-200/50 text-gray-700 hover:bg-yellow-100 border-gray-300/50 hover:text-yellow-700"
                  }`}
                  onClick={() => setDateFilter(filter)}
                >
                  {filter === "all"
                    ? "All"
                    : filter === "7days"
                    ? "7 Days"
                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
              
              <div className="month-filter-container">
                <MonthFilter
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
                themeColor="yellow"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-1 transition-all duration-300 min-w-[120px] ${
                  isDark
                    ? "bg-gray-700/50 border-yellow-500/30 text-gray-300 focus:ring-yellow-500/50 hover:bg-gray-600/50"
                    : "bg-gray-200/50 border-yellow-400/40 text-gray-700 focus:ring-yellow-600/50 hover:bg-gray-300/50"
                }`}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.category}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className={`px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-1 transition-all duration-300 min-w-[100px] ${
                  isDark
                    ? "bg-gray-700/50 border-yellow-500/30 text-gray-300 focus:ring-yellow-500/50 hover:bg-gray-600/50"
                    : "bg-gray-200/50 border-yellow-400/40 text-gray-700 focus:ring-yellow-600/50 hover:bg-gray-300/50"
                }`}
              >
                <option value="">All Regions</option>
                <option value="asian">Asian</option>
                <option value="western">Western</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <main>
          {loading ? (
            <LoadingSpinner />
          ) : filteredLinks.length > 0 ? (
            <>
              {Object.entries(groupedLinks)
                .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
                .map(([date, posts]) => (
                  <div key={date} className="mb-8">
                    <h2
                      className={`text-xl font-bold mb-4 pb-2 border-b font-orbitron flex items-center gap-3 ${
                        isDark ? "text-gray-300 border-yellow-500/30" : "text-gray-700 border-yellow-400/40"
                      }`}
                    >
                      <div className="w-3 h-8 bg-gradient-to-b from-yellow-500 to-red-600 rounded-full shadow-lg shadow-yellow-500/30"></div>
                      <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                        VIP Banned - {date}
                      </span>
                      <Shield className="w-4 h-4 text-red-300" />
                    </h2>
                    <div className="space-y-2">
                      {posts
                        .sort(
                          (a, b) =>
                            new Date(b.postDate || b.createdAt).getTime() -
                            new Date(a.postDate || a.createdAt).getTime()
                        )
                        .map((link, index) => (
<motion.div
  key={link.id}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.05 }}
  className={`group rounded-xl p-3 transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-[1.01] ${
    isDark
      ? "bg-gray-800/60 hover:bg-gray-700/80 border-yellow-500/30 hover:border-red-400/60 hover:shadow-red-500/20"
      : "bg-white/60 hover:bg-gray-50/80 border-yellow-400/40 hover:border-red-400/60 hover:shadow-red-400/20"
  } border`}
  onClick={() => {
    const contentType = link.contentType || 'vip-banned';
    switch (contentType) {
      case 'vip-asian':
        navigate(`/vip-asian/${link.slug}`);
        break;
      case 'vip-western':
        navigate(`/vip-western/${link.slug}`);
        break;
      case 'vip-banned':
        navigate(`/vip-banned/${link.slug}`);
        break;
      case 'vip-unknown':
        navigate(`/vip-unknown/${link.slug}`);
        break;
      default:
        navigate(`/vip-banned/${link.slug}`);
    }
  }}
>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                                <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
                                <AlertTriangle className="w-4 h-4 text-red-400" />
                                <h3
                                  className={`text-sm sm:text-lg font-bold transition-colors duration-300 font-orbitron relative truncate ${
                                    isDark ? "text-white group-hover:text-red-300" : "text-gray-900 group-hover:text-red-600"
                                  }`}
                                >
                                  {link.name}
                                  <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-yellow-500 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </h3>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                {recentLinks.includes(link) && (
                                  <span
                                    className={`inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 text-white text-xs font-bold rounded-full shadow-lg animate-pulse border font-roboto ${
                                      isDark
                                        ? "bg-gradient-to-r from-yellow-500 to-red-600 border-yellow-400/30"
                                        : "bg-gradient-to-r from-yellow-600 to-red-700 border-yellow-500/30"
                                    }`}
                                  >
                                    <Star className="w-3 h-3 mr-1" />
                                    NEW VIP
                                  </span>
                                )}

                                {/* Content Type Badge for cross-section results */}
                                {link.contentType && link.contentType !== 'vip-banned' && (
                                  <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${
                                    link.contentType === 'vip-asian' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                                    link.contentType === 'vip-western' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                                    link.contentType === 'vip-unknown' ? 'bg-gray-500/20 text-gray-300 border border-gray-500/30' : ''
                                  }`}>
                                    {link.contentType.replace('vip-', '').toUpperCase()}
                                  </span>
                                )}



                                {/* Category Badge */}
                                <span
                                  className={`inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-full border backdrop-blur-sm font-roboto ${
                                    isDark
                                      ? "bg-gradient-to-r from-yellow-500/20 to-red-500/20 text-yellow-300 border-yellow-500/30"
                                      : "bg-gradient-to-r from-yellow-200/40 to-red-200/30 text-yellow-700 border-yellow-400/40"
                                  }`}
                                >
                                  <Crown className="w-3 h-3 mr-2" />
                                  {link.category}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}

              {hasMoreContent && (
                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/30 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed border border-yellow-400/30 backdrop-blur-sm font-orbitron"
                  >
                    {loadingMore ? (
                      <>
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-3 inline-block"></div>
                        Loading VIP Content...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-3 inline-block" />
                        Load More VIP Banned
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="mb-8 flex items-center justify-center gap-4">
                <Crown className="w-16 h-16 text-yellow-500 animate-pulse" />
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
              <h3
                className={`text-3xl font-bold mb-4 font-orbitron ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                No VIP Banned Content Found
              </h3>
              <p className="text-gray-400 text-lg font-roboto">
                Try adjusting your search or filters to find premium banned content.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default VIPBannedPage;
