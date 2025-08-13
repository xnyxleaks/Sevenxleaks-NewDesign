import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Calendar, LayoutGrid, SortDesc, ChevronDown, Shield, AlertTriangle, Filter } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useRegion } from "../contexts/RegionContext";
import ContentCard from "../components/ContentCard";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

type LinkItem = {
  id: string;
  name: string;
  category: string;
  postDate: string;
  slug: string;
  link: string;
  thumbnail?: string;
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

const DreamyLoading = () => (
  <div className="dreamy-loading">
    <div className="dreamy-spinner"></div>
  </div>
);

const BannedContent: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("mostRecent");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const { theme } = useTheme();
  const { region } = useRegion();

  // Mock data for banned content - replace with actual API call
  useEffect(() => {
    const fetchBannedContent = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockData: LinkItem[] = [
          {
            id: "1",
            name: "Banned Content Example 1",
            category: "Banned",
            postDate: "2024-01-15",
            slug: "banned-content-1",
            link: "https://example.com/banned1",
            thumbnail: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400"
          },
          {
            id: "2", 
            name: "Banned Content Example 2",
            category: "Banned",
            postDate: "2024-01-10",
            slug: "banned-content-2",
            link: "https://example.com/banned2",
            thumbnail: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400"
          }
        ];
        
        setLinks(mockData);
        setFilteredLinks(mockData);
        setLoading(false);
      }, 1000);
    };

    fetchBannedContent();
  }, []);

  useEffect(() => {
    let filtered = links.filter(link => 
      link.name.toLowerCase().includes(searchName.toLowerCase())
    );

    if (selectedMonth) {
      filtered = filtered.filter(link => {
        const linkMonth = new Date(link.postDate).getMonth() + 1;
        return linkMonth.toString().padStart(2, '0') === selectedMonth;
      });
    }

    if (sortOption === 'oldest') {
      filtered.sort((a, b) => new Date(a.postDate).getTime() - new Date(b.postDate).getTime());
    } else {
      filtered.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
    }

    setFilteredLinks(filtered);
  }, [searchName, selectedMonth, sortOption, links]);

  return (
    <div className="dreamy-page">
      <Helmet>
        <title>Banned Content - Sevenxleaks</title>
        <link rel="canonical" href="https://sevenxleaks.com/banned" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-12 h-12 text-purple-500" />
            </motion.div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700">
              Banned Content
            </h1>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <AlertTriangle className="w-12 h-12 text-purple-500" />
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Content that has been restricted or banned from regular distribution.
          </motion.p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="dreamy-section mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Filter className="w-5 h-5 text-purple-500" />
            Search & Filter
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="dreamy-input w-full pl-12 pr-4 text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="dreamy-input w-full pl-12 pr-4 appearance-none cursor-pointer text-gray-900"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative group">
              <SortDesc className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="dreamy-input w-full pl-12 pr-4 appearance-none cursor-pointer text-gray-900"
              >
                <option value="mostRecent">Most Recent</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="space-y-8">
          {loading ? (
            <DreamyLoading />
          ) : filteredLinks.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="dreamy-grid"
            >
              {filteredLinks.map((link: LinkItem, index: number) => (
                <ContentCard
                  key={link.id}
                  id={link.id}
                  name={link.name}
                  category={link.category}
                  postDate={link.postDate}
                  slug={link.slug}
                  thumbnail={link.thumbnail}
                  isBanned={true}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dreamy-section text-center py-12"
            >
              <div className="text-gray-400 mb-6">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                No Banned Content Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannedContent;