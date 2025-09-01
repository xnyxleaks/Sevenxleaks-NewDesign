import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Edit2,
  Trash2,
  Plus,
  Users,
  AlertCircle,
  Loader2,
  ChevronDown,
  Filter,
  Calendar,
  Link as LinkIcon,
  Tag,
  Settings,
  ToggleLeft,
  ToggleRight,
  Shield,
  Database,
  Activity,
  Globe,
  Crown,
  Ban,
  HelpCircle
} from "lucide-react";
import AdminLinkForm from "../components/Admin/AdminLinkForm";
import AdminLinkList from "../components/Admin/AdminLinkList";
import { LinkItem } from "../utils/index";

interface ApiResponse {
  page: number;
  perPage: number;
  data: LinkItem[];
  totalPages: number;
}

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"asian" | "western" | "vip" | "banned" | "unknown">("asian");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [newLink, setNewLink] = useState<LinkItem>({
    id: 0,
    name: "",
    mega: "",
    mega2: "",
    pixeldrain: "",
    AdmavenMega: "",
    AdmavenMega2: "",
    AdmavenPixeldrain: "",
    category: "",
    postDate: new Date().toISOString().split('T')[0],
    createdAt: "",
    updatedAt: "",
    slug: "",
    thumbnail: ""
  });
  const [categories] = useState<string[]>([
    "Asian",
    "Teen", 
    "Big Tits",
    "Tiktok",
    "Instagram",
    "Banned",
    "Unknown",
    "Western",
    "VIP Content"
  ]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [linkvertiseAccount, setLinkvertiseAccount] = useState<string>('518238');
  const [isUpdatingAccount, setIsUpdatingAccount] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem('Token');

  const tabConfig = {
    asian: {
      endpoint: "/asiancontent",
      icon: Globe,
      color: "purple",
      gradient: "from-purple-500 to-purple-600"
    },
    western: {
      endpoint: "/westerncontent", 
      icon: Globe,
      color: "orange",
      gradient: "from-orange-500 to-orange-600"
    },
    vip: {
      endpoint: "/vipcontent",
      icon: Crown,
      color: "yellow", 
      gradient: "from-yellow-500 to-yellow-600"
    },
    banned: {
      endpoint: "/bannedcontent",
      icon: Ban,
      color: "red",
      gradient: "from-red-500 to-red-600"
    },
    unknown: {
      endpoint: "/unknowncontent",
      icon: HelpCircle,
      color: "gray",
      gradient: "from-gray-500 to-gray-600"
    }
  };

  // Carrega a configuração global da conta do Linkvertise
  // useEffect(() => {
  //   fetchLinkvertiseConfig();
  // }, []);

  // // Busca a configuração global da conta do Linkvertise
  // const fetchLinkvertiseConfig = async () => {
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/linkvertise-config`, {
  //       headers: {
  //         'x-api-key': `${import.meta.env.VITE_FRONTEND_API_KEY}`,
  //       },
  //     });
      
  //     if (response.data && response.data.activeAccount) {
  //       setLinkvertiseAccount(response.data.activeAccount);
  //     }
  //   } catch (error) {
  //     console.error('Erro ao buscar configuração do Linkvertise:', error);
  //     setLinkvertiseAccount('518238');
  //   }
  // };

  // // Salva a configuração global da conta do Linkvertise
  // const handleLinkvertiseAccountChange = async (account: string) => {
  //   setIsUpdatingAccount(true);
  //   try {
  //     await axios.put(
  //       `${import.meta.env.VITE_BACKEND_URL}/linkvertise-config`,
  //       { activeAccount: account },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'x-api-key': `${import.meta.env.VITE_FRONTEND_API_KEY}`,
  //           'x-admin-key': `${import.meta.env.VITE_ADMIN_KEY}`
  //         }
  //       }
  //     );
      
  //     setLinkvertiseAccount(account);
  //     setError(null);
  //   } catch (error) {
  //     setError('Erro ao atualizar configuração do Linkvertise');
  //     console.error('Erro ao atualizar configuração:', error);
  //   } finally {
  //     setIsUpdatingAccount(false);
  //   }
  // };

  useEffect(() => {
    setCurrentPage(1);
    setLinks([]);
    fetchLinks(1);
  }, [activeTab]);

  const fetchLinks = async (page: number = 1, isLoadMore = false) => {
    try {
      setIsLoading(!isLoadMore);
      setError(null);
      
      const config = tabConfig[activeTab];
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20"
      });

      const response = await axios.get<{ data: string }>(
        `${import.meta.env.VITE_BACKEND_URL}${config.endpoint}?${params}`,
        {
          headers: {
            'x-api-key': `${import.meta.env.VITE_FRONTEND_API_KEY}`,
            'Authorization': `Bearer ${token}`
          }
        }
      );

      let base64Data = response.data.data;
      base64Data = base64Data.slice(0, 2) + base64Data.slice(3);
      const jsonString = atob(base64Data);
      const dataObject: ApiResponse = JSON.parse(jsonString);
      
      if (isLoadMore) {
        setLinks(prev => [...prev, ...(dataObject.data || [])]);
      } else {
        setLinks(dataObject.data || []);
      }
      
      setTotalPages(dataObject.totalPages || 1);
      setHasMore(page < (dataObject.totalPages || 1));
    } catch (err) {
      setError("Failed to fetch content. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLink = async () => {
    if (!newLink.name || !newLink.mega || !newLink.category) {
      setError("Please fill in all required fields (name, mega link, category)");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const config = tabConfig[activeTab];
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}${config.endpoint}`, newLink, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': `${import.meta.env.VITE_FRONTEND_API_KEY}`,
          'x-admin-key': `${import.meta.env.VITE_ADMIN_KEY}`
        }
      });
      
      setNewLink({
        id: 0,
        name: "",
        mega: "",
        mega2: "",
        pixeldrain: "",
        AdmavenMega: "",
        AdmavenMega2: "",
        AdmavenPixeldrain: "",
        category: "",
        postDate: new Date().toISOString().split('T')[0],
        createdAt: "",
        updatedAt: "",
        slug: "",
        thumbnail: ""
      });
      
      setCurrentPage(1);
      fetchLinks(1);
    } catch (error) {
      setError("Failed to add content. Please try again.");
      console.error("Error adding content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditLink = (id: number) => {
    const linkToEdit = links.find((link) => link.id === id);
    if (linkToEdit) {
      setNewLink(linkToEdit);
      setIsEditing(id);
    }
  };

  const handleUpdateLink = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const config = tabConfig[activeTab];
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}${config.endpoint}/${isEditing}`,
        newLink,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-api-key': `${import.meta.env.VITE_FRONTEND_API_KEY}`,
            'x-admin-key': `${import.meta.env.VITE_ADMIN_KEY}`
          }
        }
      );

      setIsEditing(null);
      setNewLink({
        id: 0,
        name: "",
        mega: "",
        mega2: "",
        pixeldrain: "",
        AdmavenMega: "",
        AdmavenMega2: "",
        AdmavenPixeldrain: "",
        category: "",
        postDate: new Date().toISOString().split('T')[0],
        createdAt: "",
        updatedAt: "",
        slug: "",
        thumbnail: ""
      });
      
      fetchLinks(1);
    } catch (error) {
      setError("Failed to update content. Please try again.");
      console.error("Error updating content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLink = async (id: number) => {
    if (!confirm("Are you sure you want to delete this content?")) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const config = tabConfig[activeTab];
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}${config.endpoint}/${id}`, {
        headers: {
          "x-api-key": import.meta.env.VITE_FRONTEND_API_KEY,
          "x-admin-key": `${import.meta.env.VITE_ADMIN_KEY}`,
          Authorization: `Bearer ${token}`
        }
      });
      
      fetchLinks(1);
    } catch (error) {
      setError("Failed to delete content. Please try again.");
      console.error("Error deleting content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !isLoading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchLinks(nextPage, true);
    }
  };

  const filteredLinks = links.filter((link) =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedCategory || link.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-orbitron bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-2 font-roboto">Manage content across all platforms</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/admin-vip-users")}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition-colors shadow-lg"
            >
              <Users className="w-5 h-5" />
              <span className="hidden sm:inline">Manage VIP Users</span>
              <span className="sm:hidden">VIP Users</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/admin/stats")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition-colors shadow-lg"
            >
              <Activity className="w-5 h-5" />
              <span className="hidden sm:inline">Statistics</span>
              <span className="sm:hidden">Stats</span>
            </motion.button>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl mb-6 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        {/* Configurações do Linkvertise
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 mb-8 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold font-orbitron">Global Linkvertise Settings</h2>
              <p className="text-gray-400 text-sm">Configure active account for all content</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
            <div className="flex flex-col">
              <span className="font-medium text-white">Active Global Account</span>
              <span className="text-sm text-gray-400">
                {linkvertiseAccount === '518238' ? 'Account 1 (ID: 518238)' : 'Account 2 (ID: 1329936)'}
              </span>
            </div>
            
            <div className="flex items-center gap-4 relative">
              {isUpdatingAccount && (
                <div className="absolute inset-0 bg-gray-800/50 rounded-lg flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLinkvertiseAccountChange('518238')}
                disabled={isUpdatingAccount}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  linkvertiseAccount === '518238'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500 disabled:opacity-50'
                }`}
              >
                Account 1
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleLinkvertiseAccountChange(
                  linkvertiseAccount === '518238' ? '1329936' : '518238'
                )}
                style={{ pointerEvents: isUpdatingAccount ? 'none' : 'auto' }}
                className="cursor-pointer p-1"
              >
                {linkvertiseAccount === '518238' ? (
                  <ToggleLeft className="w-8 h-8 text-blue-400" />
                ) : (
                  <ToggleRight className="w-8 h-8 text-green-400" />
                )}
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLinkvertiseAccountChange('1329936')}
                disabled={isUpdatingAccount}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  linkvertiseAccount === '1329936'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500 disabled:opacity-50'
                }`}
              >
                Account 2
              </motion.button>
            </div>
          </div>
        </motion.div> */}

        {/* Content Type Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(tabConfig).map(([key, config]) => {
            const IconComponent = config.icon;
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === key
                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/30'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="capitalize font-roboto">{key}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
          {/* Filter Bar */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none min-w-[150px]"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Add/Edit Form */}
          <div className="p-6 border-b border-gray-700/50">
            <AdminLinkForm
              newLink={newLink}
              setNewLink={setNewLink}
              isLoading={isLoading}
              isEditing={isEditing}
              handleAddLink={handleAddLink}
              handleUpdateLink={handleUpdateLink}
              categories={categories}
            />
          </div>

          {/* Content List */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold font-orbitron">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content ({filteredLinks.length})
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Database className="w-4 h-4" />
                <span>Page {currentPage} of {totalPages}</span>
              </div>
            </div>
            
            <AdminLinkList
              links={filteredLinks}
              isLoading={isLoading}
              handleEditLink={handleEditLink}
              handleDeleteLink={handleDeleteLink}
              hasMore={hasMore}
              loadMore={loadMore}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;