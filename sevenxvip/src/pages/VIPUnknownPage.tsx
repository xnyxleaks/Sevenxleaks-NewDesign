import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Crown, Calendar, Plus, Star, Sparkles, HelpCircle } from "lucide-react";
import VIPHeader from "../components/VIP/VIPHeader";
import { useTheme } from "../contexts/ThemeContext";

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

const VIPUnknownPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

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
      });

      if (searchName) params.append("search", searchName);
      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedRegion) params.append("region", selectedRegion);

      if (dateFilter !== "all") {
        const today = new Date();
        let targetDate = new Date();

        switch (dateFilter) {
          case "yesterday":
            targetDate.setDate(today.getDate() - 1);
            break;
          case "7days":
            targetDate.setDate(today.getDate() - 7);
            break;
        }

        params.append(
          "month",
          (targetDate.getMonth() + 1).toString().padStart(2, "0")
        );
      }

      const endpoint = searchName
        ? "/vip-unknowncontent/search"
        : "/vip-unknowncontent";
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}${endpoint}?${params}`,
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

      const decoded = decodeModifiedBase64<{
        data: LinkItem[];
        totalPages: number;
      }>(response.data.data);

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

      const uniqueCategories = Array.from(
        new Set(rawData.map((item) => item.category))
      ).map((category) => ({
        id: category,
        name: category,
        category,
      }));

      setCategories((prev) => {
        const existingCategories = new Set(prev.map((c) => c.category));
        const newCategories = uniqueCategories.filter(
          (c) => !existingCategories.has(c.category)
        );
        return [...prev, ...newCategories];
      });
    } catch (error) {
      console.error("Error fetching VIP Unknown content:", error);
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
  }, [searchName, selectedCategory, selectedRegion, dateFilter]);

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
      if (!grouped[dateKey]) grouped[dateKey] = [];
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
        <title>VIP Unknown Content - Sevenxleaks</title>
        <link rel="canonical" href="https://sevenxleaks.com/vip-unknown" />
      </Helmet>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <main>
          {loading ? (
            <LoadingSpinner />
          ) : filteredLinks.length > 0 ? (
            <>
              {Object.entries(groupedLinks)
                .sort(([dateA], [dateB]) => {
                  const parseDateA = new Date(dateA);
                  const parseDateB = new Date(dateB);
                  return parseDateB.getTime() - parseDateA.getTime();
                })
                .map(([date, posts]) => (
                  <div key={date} className="mb-8">
                    <h2
                      className={`text-xl font-bold mb-4 pb-2 border-b font-orbitron flex items-center gap-3 ${
                        isDark
                          ? "text-gray-300 border-yellow-500/30"
                          : "text-gray-700 border-yellow-400/40"
                      }`}
                    >
                      <div className="w-3 h-8 bg-gradient-to-b from-yellow-500 to-gray-600 rounded-full shadow-lg shadow-yellow-500/30"></div>
                      <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                      <span className="bg-gradient-to-r from-yellow-400 to-gray-400 bg-clip-text text-transparent">
                        VIP Unknown - {date}
                      </span>
                      <Sparkles className="w-4 h-4 text-yellow-300" />
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
                                ? "bg-gray-800/60 hover:bg-gray-700/80 border-yellow-500/30 hover:border-gray-400/60 hover:shadow-gray-500/20"
                                : "bg-white/60 hover:bg-gray-50/80 border-yellow-400/40 hover:border-gray-400/60 hover:shadow-gray-400/20"
                            } border`}
                            onClick={() =>
                              navigate(`/vip-unknown/${link.slug}`)
                            }
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                                <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
                                <HelpCircle className="w-4 h-4 text-gray-400" />
                                <h3
                                  className={`text-sm sm:text-lg font-bold transition-colors duration-300 font-orbitron relative truncate ${
                                    isDark
                                      ? "text-white group-hover:text-gray-300"
                                      : "text-gray-900 group-hover:text-gray-600"
                                  }`}
                                >
                                  {link.name}
                                  <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-yellow-500 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </h3>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                {recentLinks.includes(link) && (
                                  <span
                                    className={`inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 text-white text-xs font-bold rounded-full shadow-lg animate-pulse border font-roboto ${
                                      isDark
                                        ? "bg-gradient-to-r from-yellow-500 to-gray-600 border-yellow-400/30"
                                        : "bg-gradient-to-r from-yellow-600 to-gray-700 border-yellow-500/30"
                                    }`}
                                  >
                                    <Star className="w-3 h-3 mr-1" />
                                    NEW VIP
                                  </span>
                                )}

                                {/* Region Badge */}
                                <span
                                  className={`inline-flex items-center px-2 py-1 text-xs font-bold rounded-full ${
                                    link.region === "asian"
                                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                      : "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                                  }`}
                                >
                                  {link.region.toUpperCase()}
                                </span>

                                <span
                                  className={`inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-full border backdrop-blur-sm font-roboto ${
                                    isDark
                                      ? "bg-gradient-to-r from-yellow-500/20 to-gray-500/20 text-yellow-300 border-yellow-500/30"
                                      : "bg-gradient-to-r from-yellow-200/40 to-gray-200/30 text-yellow-700 border-yellow-400/40"
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
                    className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-gray-600 hover:from-yellow-600 hover:to-gray-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/30 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed border border-yellow-400/30 backdrop-blur-sm font-orbitron"
                  >
                    {loadingMore ? (
                      <>
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-3 inline-block"></div>
                        Loading VIP Content...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-3 inline-block" />
                        Load More VIP Unknown
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
                <HelpCircle className="w-12 h-12 text-gray-500" />
              </div>
              <h3
                className={`text-3xl font-bold mb-4 font-orbitron ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                No VIP Unknown Content Found
              </h3>
              <p className="text-gray-400 text-lg font-roboto">
                Try adjusting your search or filters to find premium unknown
                content.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default VIPUnknownPage;
