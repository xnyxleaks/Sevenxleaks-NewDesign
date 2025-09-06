import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
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
};

type Category = {
  id: string;
  name: string;
  category: string;
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-orange-500/20 rounded-full animate-spin"></div>
      <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <i className="fa-solid fa-spinner text-orange-500 animate-spin text-xl"></i>
      </div>
    </div>
  </div>
);

const WesternPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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
        contentType: "western"
      });

      if (searchName) params.append('search', searchName);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedMonth) params.append('month', selectedMonth);
      if (dateFilter !== 'all') params.append('dateFilter', dateFilter);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/universal-search/search?${params}`,
        {
          headers: {
            "x-api-key": `${import.meta.env.VITE_FRONTEND_API_KEY}`,
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
      console.error("Error fetching content:", error);
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
  }, [searchName, selectedCategory, selectedMonth, dateFilter]);

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
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      <Helmet>
        <title>Sevenxleaks Western - Free Content</title>
        <link rel="canonical" href="https://sevenxleaks.com/western" />
      </Helmet>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`backdrop-blur-xl border rounded-3xl p-6 shadow-2xl ${
          isDark 
            ? 'bg-gray-800/60 border-gray-700/50' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <div className={`flex flex-col lg:flex-row items-center gap-4 rounded-2xl px-6 py-4 border shadow-inner ${
            isDark 
              ? 'bg-gray-700/50 border-gray-600/30' 
              : 'bg-gray-100/50 border-gray-300/30'
          }`}>
            {/* Search Bar */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
            <i className={`fa-solid fa-search text-lg ${
              isDark ? 'text-orange-400' : 'text-orange-600'
            }`}></i>
            <input
              type="text"
              className={`flex-1 bg-transparent border-none outline-none text-lg ${
                isDark 
                  ? 'text-white placeholder-gray-400' 
                  : 'text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Search by name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            {searchLoading && (
              <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${
                isDark ? 'border-orange-400' : 'border-orange-600'
              }`}></div>
            )}
            </div>

                            <div className="flex items-center gap-2">
              {["all", "today", "yesterday", "7days"].map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border whitespace-nowrap ${
                    dateFilter === filter
                      ? isDark
                        ? "bg-orange-500 text-white border-orange-400"
                        : "bg-orange-600 text-white border-orange-500"
                      : isDark
                        ? "bg-gray-700/50 text-gray-300 hover:bg-orange-500/20 border-gray-600/50"
                        : "bg-gray-200/50 text-gray-700 hover:bg-orange-100 border-gray-300/50"
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
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <MonthFilter
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
                themeColor="orange"
              />
            </div>


            {/* Category Select */}
            <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-1 transition-all duration-300 min-w-[120px] ${
                isDark 
                  ? 'bg-gray-700/50 border-gray-600/50 text-gray-300 focus:ring-orange-500/50 hover:bg-gray-600/50'
                  : 'bg-gray-200/50 border-gray-300/50 text-gray-700 focus:ring-orange-600/50 hover:bg-gray-300/50'
              }`}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Action Buttons */}
            <button 
              className={`p-2 rounded-lg transition-all duration-300 border ${
                isDark 
                  ? 'bg-gray-700/50 hover:bg-orange-500/20 text-gray-300 hover:text-orange-300 border-gray-600/50'
                  : 'bg-gray-200/50 hover:bg-orange-100 text-gray-700 hover:text-orange-700 border-gray-300/50'
              }`}
              title="Calendar View"
            >
              <i className="fa-regular fa-calendar text-sm"></i>
            </button>
            <button 
              className={`p-2 rounded-lg transition-all duration-300 border ${
                isDark 
                  ? 'bg-gray-700/50 hover:bg-orange-500/20 text-gray-300 hover:text-orange-300 border-gray-600/50'
                  : 'bg-gray-200/50 hover:bg-orange-100 text-gray-700 hover:text-orange-700 border-gray-300/50'
              }`}
              title="Switch to Asian"
              onClick={() => navigate('/asian')}
            >
              <i className="fa-solid fa-repeat text-sm"></i>
            </button>
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
                .sort(([dateA], [dateB]) => {
                  const parseDateA = new Date(dateA);
                  const parseDateB = new Date(dateB);
                  return parseDateB.getTime() - parseDateA.getTime();
                })
                .map(([date, posts]) => (
                  <div key={date} className="mb-8">
                    <h2 className={`text-xl font-bold mb-4 pb-2 border-b font-orbitron flex items-center gap-3 ${
                      isDark 
                        ? 'text-gray-300 border-gray-700/50' 
                        : 'text-gray-700 border-gray-300/50'
                    }`}>
                      <div className="w-3 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/30"></div>
                      <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">{date}</span>
                    </h2>
                    <div className="space-y-2">
                      {posts
                        .sort((a, b) => new Date(b.postDate || b.createdAt).getTime() - new Date(a.postDate || a.createdAt).getTime())
                        .map((link, index) => (
                        <motion.div
                          key={link.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`group rounded-xl p-3 transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-[1.01] ${
                            isDark 
                              ? 'bg-gray-800/60 hover:bg-gray-700/80 border-gray-700/50 hover:border-orange-500/50 hover:shadow-orange-500/10'
                              : 'bg-white/60 hover:bg-gray-50/80 border-gray-200/50 hover:border-orange-400/50 hover:shadow-orange-400/10'
                          } border`}
                          onClick={() => {
                            const contentType = link.contentType || 'western';
                            switch (contentType) {
                              case 'asian':
                                navigate(`/asian/${link.slug}`);
                                break;
                              case 'banned':
                                navigate(`/banned/${link.slug}`);
                                break;
                              case 'unknown':
                                navigate(`/unknown/${link.slug}`);
                                break;
                              case 'vip':
                                navigate(`/vip/${link.slug}`);
                                break;
                              default:
                                navigate(`/western/${link.slug}`);
                            }
                          }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                              {link.contentType && link.contentType !== 'western' && (
                                <div className={`w-2 h-2 rounded-full ${
                                  link.contentType === 'asian' ? 'bg-purple-400' :
                                  link.contentType === 'banned' ? 'bg-red-400' :
                                  link.contentType === 'unknown' ? 'bg-gray-400' :
                                  link.contentType === 'vip' ? 'bg-yellow-400' : 'bg-orange-400'
                                }`}></div>
                              )}
                              <h3 className={`text-sm sm:text-lg font-bold transition-colors duration-300 font-orbitron relative truncate ${
                                isDark ? 'text-white group-hover:text-orange-300' : 'text-gray-900 group-hover:text-orange-600'
                              }`}>
                                {link.name}
                                <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </h3>
                              <div className={`hidden sm:block h-px bg-gradient-to-r to-transparent flex-1 max-w-20 transition-all duration-300 ${
                                isDark 
                                  ? 'from-orange-500/50 group-hover:from-orange-400/70'
                                  : 'from-orange-400/50 group-hover:from-orange-500/70'
                              }`}></div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                              {recentLinks.includes(link) && (
                                <span className={`inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 text-white text-xs font-bold rounded-full shadow-lg animate-pulse border font-roboto ${
                                  isDark 
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 border-orange-400/30'
                                    : 'bg-gradient-to-r from-orange-600 to-orange-700 border-orange-500/30'
                                }`}>
                                  <i className="fa-solid fa-star mr-1 text-xs hidden sm:inline"></i>
                                  NEW
                                </span>
                              )}
                              {link.contentType && link.contentType !== 'western' && (
                                <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${
                                  link.contentType === 'asian' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                                  link.contentType === 'banned' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                                  link.contentType === 'unknown' ? 'bg-gray-500/20 text-gray-300 border border-gray-500/30' :
                                  link.contentType === 'vip' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' : ''
                                }`}>
                                  {link.contentType.toUpperCase()}
                                </span>
                              )}
                              <span className={`inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-full border backdrop-blur-sm font-roboto ${
                                isDark 
                                  ? 'bg-gray-700/70 text-gray-300 border-gray-600/50'
                                  : 'bg-gray-200/70 text-gray-700 border-gray-300/50'
                              }`}>
                                <i className="fa-solid fa-tag mr-1 sm:mr-2 text-xs"></i>
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
                    className={`px-10 py-4 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed border backdrop-blur-sm font-orbitron ${
                      isDark 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/30 border-orange-400/30'
                        : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 hover:shadow-orange-500/20 border-orange-500/30'
                    }`}
                  >
                    {loadingMore ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin mr-3"></i>
                        Loading More...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-plus mr-3"></i>
                        Load More Content
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="mb-8">
                <i className="fa-solid fa-search text-6xl text-gray-500"></i>
              </div>
              <h3 className={`text-3xl font-bold mb-4 font-orbitron ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>No Content Found</h3>
              <p className={`text-lg font-roboto ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default WesternPage;