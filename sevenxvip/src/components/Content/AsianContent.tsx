import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

type LinkItem = {
  id: string;
  name: string;
  category: string;
  postDate: string;
  slug: string;
  thumbnail?: string;
  createdAt: string
};

type Category = {
  id: string;
  name: string;
  category: string;
};

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

const AsianContent: React.FC = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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
        search: searchName,
        category: selectedCategory,
        sortBy: "postDate",
        sortOrder: "DESC",
        limit: "24",
      });

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/freecontent/search?${params}`,
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
  }, [searchName, selectedCategory, dateFilter]);

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
    <div className="min-h-screen asian-theme" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Helmet>
        <title>Sevenxleaks Asian - Free Content</title>
        <link rel="canonical" href="https://sevenxleaks.com/" />
      </Helmet>

      {/* Filter Bar */}
      <div className="main-container">
        <div className="filter-bar">
          <div className="search-container">
            <i className="fa-solid fa-search"></i>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            {searchLoading && (
              <div className="ml-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div className="filter-buttons">
            <button
              className={dateFilter === "all" ? "active" : ""}
              onClick={() => setDateFilter("all")}
            >
              All
            </button>
            <button
              className={dateFilter === "today" ? "active" : ""}
              onClick={() => setDateFilter("today")}
            >
              Today
            </button>
            <button
              className={dateFilter === "yesterday" ? "active" : ""}
              onClick={() => setDateFilter("yesterday")}
            >
              Yesterday
            </button>
            <button
              className={dateFilter === "7days" ? "active" : ""}
              onClick={() => setDateFilter("7days")}
            >
              7 Days
            </button>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="date-input"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="view-buttons">
            <button className="icon-button" title="Calendar">
              <i className="fa-regular fa-calendar"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="main-container">
        <main className="content-area">
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
                    <h2 className="date-header">{date}</h2>
                    <div className="post-list">
                      {posts
                        .sort((a, b) => new Date(b.postDate || b.createdAt).getTime() - new Date(a.postDate || a.createdAt).getTime())
                        .map((link, index) => (
                        <motion.div
                          key={link.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="post-item"
                          onClick={() => navigate(`/free/${link.slug}`)}
                        >
                          <div className="post-title-container">
                            <h3>{link.name}</h3>
                            {recentLinks.includes(link) && (
                              <span className="tag tag-new">NEW</span>
                            )}
                          </div>
                          <div className="tags">
                            <span className="tag">{link.category}</span>
                          </div>
                        </motion.div>
                        ))}
                    </div>
                  </div>
                ))}

              {hasMoreContent && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="vip-button px-8 py-3"
                  >
                    {loadingMore ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                        Loading...
                      </>
                    ) : (
                      "Load More Content"
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="mb-6">
                <i
                  className="fa-solid fa-search text-6xl"
                  style={{ color: "var(--text-secondary)" }}
                ></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">No Content Found</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AsianContent;