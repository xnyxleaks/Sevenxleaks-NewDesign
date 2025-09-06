import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search, Calendar, LayoutGrid, SortDesc, ChevronDown, HelpCircle, Zap, Filter } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useRegion } from "../contexts/RegionContext";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import LoadingUnknown from "../components/Loaders/LoadingUnknown";

type LinkItem = {
  id: string;
  name: string;
  category: string;
  postDate: string;
  slug: string;
  mega: string;
  mega2?: string;
  pixeldrain?: string;
  thumbnail?: string;
  createdAt: string;
  region: string;
  contentType?: string;
};

const months = [
  { value: "", label: "All Months" },
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];


const UnknownContent: React.FC = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("mostRecent");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const { theme } = useTheme();
  const { region } = useRegion();
  const isDark = theme === "dark";

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
        contentType: "unknown"
      });

      if (searchName) params.append('search', searchName);
      if (selectedMonth) params.append('month', selectedMonth);
      if (sortOption !== 'mostRecent') params.append('dateFilter', sortOption);

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
    } catch (error) {
      console.error("Error fetching unknown content:", error);
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
  }, [searchName, selectedMonth, sortOption, region]);

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

  const getMinimalistTheme = () => ({
    bg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    card: 'bg-slate-800/60 hover:bg-slate-700/80 border-slate-700/50 hover:border-slate-500/50',
    accent: 'text-slate-400',
    accentHover: 'hover:text-slate-300',
    button: 'from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700',
    glow: 'shadow-slate-500/20',
    border: 'border-slate-500/30'
  });

  const minimalistTheme = getMinimalistTheme();

  return (
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      <Helmet>
        <title>Unknown Content - Sevenxleaks</title>
        <link rel="canonical" href="https://sevenxleaks.com/unknown" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`backdrop-blur-xl border rounded-3xl p-6 shadow-2xl ${
            isDark 
              ? 'bg-slate-800/60 border-slate-700/50' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <div className={`flex flex-col lg:flex-row items-center gap-4 rounded-2xl px-6 py-4 border shadow-inner ${
              isDark 
                ? 'bg-slate-700/50 border-slate-600/30' 
                : 'bg-gray-100/50 border-gray-300/30'
            }`}>
              {/* Search Bar */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <HelpCircle className={`w-5 h-5 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`} />
                <input
                  type="text"
                  className={`flex-1 bg-transparent border-none outline-none text-lg ${
                    isDark 
                      ? 'text-white placeholder-gray-400' 
                      : 'text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Search unknown content..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                {searchLoading && (
                  <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${
                    isDark ? 'border-slate-400' : 'border-slate-600'
                  }`}></div>
                )}
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className={`px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-1 transition-all duration-300 min-w-[120px] ${
                    isDark 
                      ? 'bg-slate-700/50 border-slate-600/50 text-gray-300 focus:ring-slate-500/50 hover:bg-slate-600/50'
                      : 'bg-gray-200/50 border-gray-300/50 text-gray-700 focus:ring-slate-600/50 hover:bg-gray-300/50'
                  }`}
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className={`px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-1 transition-all duration-300 min-w-[120px] ${
                    isDark 
                      ? 'bg-slate-700/50 border-slate-600/50 text-gray-300 focus:ring-slate-500/50 hover:bg-slate-600/50'
                      : 'bg-gray-200/50 border-gray-300/50 text-gray-700 focus:ring-slate-600/50 hover:bg-gray-300/50'
                  }`}
                >
                  <option value="mostRecent">Most Recent</option>
                  <option value="oldest">Oldest</option>
                </select>

                <button 
                  className={`p-2 rounded-lg transition-all duration-300 border ${
                    isDark 
                      ? 'bg-slate-700/50 hover:bg-slate-500/20 text-gray-300 hover:text-slate-300 border-slate-600/50'
                      : 'bg-gray-200/50 hover:bg-slate-100 text-gray-700 hover:text-slate-700 border-gray-300/50'
                  }`}
                  title="Additional Filters"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <main>
            {loading ? (
              <LoadingUnknown/>
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
                          ? 'text-gray-300 border-slate-700/50' 
                          : 'text-gray-700 border-gray-300/50'
                      }`}>
                        <div className={`w-3 h-8 rounded-full shadow-lg ${
                          isDark 
                            ? 'bg-gradient-to-b from-slate-500 to-slate-600 shadow-slate-500/30'
                            : 'bg-gradient-to-b from-slate-600 to-slate-700 shadow-slate-500/20'
                        }`}></div>
                        <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                          isDark 
                            ? 'from-slate-400 to-slate-300'
                            : 'from-slate-600 to-slate-500'
                        }`}>{date}</span>
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
                                ? 'bg-slate-800/60 hover:bg-slate-700/80 border-slate-700/50 hover:border-slate-500/50 hover:shadow-slate-500/20'
                                : 'bg-white/60 hover:bg-gray-50/80 border-gray-200/50 hover:border-slate-400/50 hover:shadow-slate-400/10'
                            } border`}
                            onClick={() => {
                              const contentType = link.contentType || 'unknown';
                              switch (contentType) {
                                case 'asian':
                                  navigate(`/asian/${link.slug}`);
                                  break;
                                case 'western':
                                  navigate(`/western/${link.slug}`);
                                  break;
                                case 'banned':
                                  navigate(`/banned/${link.slug}`);
                                  break;
                                case 'vip':
                                  navigate(`/vip/${link.slug}`);
                                  break;
                                default:
                                  navigate(`/unknown/${link.slug}`);
                              }
                            }}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                                {link.contentType && link.contentType !== 'unknown' && (
                                  <div className={`w-2 h-2 rounded-full ${
                                    link.contentType === 'asian' ? 'bg-purple-400' :
                                    link.contentType === 'western' ? 'bg-orange-400' :
                                    link.contentType === 'banned' ? 'bg-red-400' :
                                    link.contentType === 'vip' ? 'bg-yellow-400' : 'bg-gray-400'
                                  }`}></div>
                                )}
                                <HelpCircle className={`w-5 h-5 ${
                                  isDark ? 'text-slate-400' : 'text-slate-600'
                                }`} />
                                <h3 className={`text-sm sm:text-lg font-bold transition-colors duration-300 font-orbitron relative truncate ${
                                  isDark ? 'text-white group-hover:text-slate-300' : 'text-gray-900 group-hover:text-slate-600'
                                }`}>
                                  {link.name}
                                  <div className={`absolute -bottom-1 left-0 w-16 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                    isDark 
                                      ? 'bg-gradient-to-r from-slate-500 to-slate-300'
                                      : 'bg-gradient-to-r from-slate-600 to-slate-500'
                                  }`}></div>
                                </h3>
                                <div className={`hidden sm:block h-px bg-gradient-to-r to-transparent flex-1 max-w-20 transition-all duration-300 ${
                                  isDark 
                                    ? 'from-slate-500/50 group-hover:from-slate-400/70'
                                    : 'from-slate-400/50 group-hover:from-slate-500/70'
                                }`}></div>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                {recentLinks.includes(link) && (
                                  <span className={`inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 text-white text-xs font-bold rounded-full shadow-lg animate-pulse border font-roboto ${
                                    isDark 
                                      ? 'bg-gradient-to-r from-slate-500 to-slate-600 border-slate-400/30'
                                      : 'bg-gradient-to-r from-slate-600 to-slate-700 border-slate-500/30'
                                  }`}>
                                    <i className="fa-solid fa-star mr-1 text-xs hidden sm:inline"></i>
                                    NEW
                                  </span>
                                )}
                                {link.contentType && link.contentType !== 'unknown' && (
                                  <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${
                                    link.contentType === 'asian' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                                    link.contentType === 'western' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                                    link.contentType === 'banned' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
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
                          ? 'bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 hover:shadow-slate-500/20 border-slate-500/30'
                          : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 hover:shadow-slate-500/10 border-slate-600/30'
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
                  <HelpCircle className="w-16 h-16 text-slate-500 mx-auto" />
                </div>
                <h3 className={`text-3xl font-bold mb-4 font-orbitron ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  No Unknown Content Found
                </h3>
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
    </div>
  );
};

export default UnknownContent;