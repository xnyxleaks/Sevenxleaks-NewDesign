import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Crown, Search, Filter, Calendar, Plus, Star } from "lucide-react";
import { LinkItem } from "../../types/Userdatatypes";

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

const VIPContent: React.FC = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    document.title = "VIP Content - Sevenxleaks";
  }, []);

  const fetchContent = async (page: number, isLoadMore = false) => {
    try {
      if (!isLoadMore) setLoading(true);
      setSearchLoading(true);

      const params = new URLSearchParams({
        page: page.toString(),
        search: searchName,
        category: selectedCategory,
        sortBy: "postDate",
        sortOrder: "DESC",
        limit: "24",
      });

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/vipcontent/search?${params}`,
        {
          headers: {
            "x-api-key": `${import.meta.env.VITE_FRONTEND_API_KEY}`,
          },
        }
      );

      if (!response.data?.data) {
        throw new Error("Invalid server response");
      }

      const decoded = decodeModifiedBase64(response.data.data);
      const { data, totalPages } = decoded as {
        data: LinkItem[];
        totalPages: number;
      };

      if (isLoadMore) {
        setLinks((prev) => [...prev, ...data]);
        setFilteredLinks((prev) => [...prev, ...data]);
      } else {
        setLinks(data);
        setFilteredLinks(data);
      }

      setTotalPages(totalPages);
      setHasMoreContent(page < totalPages);

      const uniqueCategories = Array.from(
        new Set(data.map((item) => item.category))
      ).map((category) => ({
        id: category,
        name: category,
        category: category,
      }));

      setCategories((prev) => {
        const existingCategories = new Set(prev.map((c) => c.category));
        const newCategories = uniqueCategories.filter(
          (c) => !existingCategories.has(c.category)
        );
        return [...prev, ...newCategories];
      });
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setSearchLoading(false);
    }
  };

  function decodeModifiedBase64(encodedStr: string): any {
    const fixedBase64 = encodedStr.slice(0, 2) + encodedStr.slice(3);
    const jsonString = atob(fixedBase64);
    return JSON.parse(jsonString);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchContent(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchName, selectedCategory, dateFilter]);

  const handleLoadMore = () => {
    if (loadingMore || currentPage >= totalPages) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchContent(nextPage, true);
  };

  const recentLinks = filteredLinks.slice(0, 5);

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  const groupPostsByDate = (posts: LinkItem[]) => {
    const grouped: { [key: string]: LinkItem[] } = {};
    
    posts.forEach(post => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Helmet>
        <title>VIP Content - Sevenxleaks</title>
        <link rel="canonical" href="https://sevenxleaks.com/vip" />
      </Helmet>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-gray-900 to-gray-900"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Filter Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-4 bg-gray-700/50 rounded-2xl px-6 py-4 mb-6 border border-gray-600/30 shadow-inner">
            <Search className="text-yellow-400 w-5 h-5" />
            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 font-roboto text-lg"
              placeholder="Search VIP content..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            {searchLoading && (
              <div className="ml-3">
                <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {["all", "today", "yesterday", "7days"].map((filter) => (
              <button
                key={filter}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border backdrop-blur-sm font-roboto ${
                  dateFilter === filter
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/30 border-yellow-400/50 transform scale-105"
                    : "bg-gray-700/50 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-300 border-gray-600/50 hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/10"
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

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-3 bg-gray-700/50 border border-gray-600/50 rounded-2xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm font-roboto hover:bg-gray-600/50"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-4 bg-gray-700/50 hover:bg-yellow-500/20 text-gray-300 hover:text-yellow-300 rounded-2xl transition-all duration-300 border border-gray-600/50 hover:border-yellow-500/50 shadow-lg hover:shadow-yellow-500/10 backdrop-blur-sm">
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
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
                  <div key={date} className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-300 mb-8 pb-4 border-b border-gray-700/50 font-orbitron flex items-center gap-4">
                      <div className="w-3 h-8 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/30"></div>
                      <Crown className="w-6 h-6 text-yellow-400" />
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">VIP Content - {date}</span>
                    </h2>
                    <div className="space-y-4">
                      {posts
                        .sort((a, b) => new Date(b.postDate || b.createdAt).getTime() - new Date(a.postDate || a.createdAt).getTime())
                        .map((link, index) => (
                        <motion.div
                          key={link.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700/50 hover:border-yellow-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 transform hover:scale-[1.02]"
                          onClick={() => navigate(`/vip/${link.slug}`)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
                              <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors duration-300 font-orbitron relative">
                                {link.name}
                                <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </h3>
                              <div className="h-px bg-gradient-to-r from-yellow-500/50 to-transparent flex-1 max-w-20 group-hover:from-yellow-400/70 transition-all duration-300"></div>
                            </div>
                            <div className="flex items-center gap-3">
                              {recentLinks.includes(link) && (
                                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs font-bold rounded-full shadow-lg animate-pulse border border-yellow-400/30 font-roboto">
                                  <Star className="w-3 h-3 mr-1" />
                                  NEW
                                </span>
                              )}
                              <span className="inline-flex items-center px-4 py-2 bg-yellow-500/20 text-yellow-300 text-sm font-medium rounded-full border border-yellow-500/30 backdrop-blur-sm font-roboto">
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
                    className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/30 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed border border-yellow-400/30 backdrop-blur-sm font-orbitron"
                  >
                    {loadingMore ? (
                      <>
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-3 inline-block"></div>
                        Loading VIP Content...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-3 inline-block" />
                        Load More VIP Content
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="mb-8">
                <Crown className="w-16 h-16 text-gray-500 mx-auto" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white font-orbitron">No VIP Content Found</h3>
              <p className="text-gray-400 text-lg font-roboto">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default VIPContent;