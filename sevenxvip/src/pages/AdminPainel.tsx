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
  ToggleRight
} from "lucide-react";

interface LinkItem {
  id: number;
  name: string;
  link: string;
  linkP?: string;
  linkG?: string;
  linkMV1?: string;
  linkMV2?: string;
  linkMV3?: string;
  slug?: string;
  category: string;
  postDate?: string;
  createdAt: string;
  updatedAt?: string;
}

interface ApiResponse {
  page: number;
  perPage: number;
  data: LinkItem[];
}

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"free" | "vip">("free");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [newLink, setNewLink] = useState({
    name: "",
    link: "",
    category: "",
    createdAt: "",
  });
  const [categories] = useState<string[]>([
    "Asian",
    "Teen",
    "Big Tits",
    "Tiktok",
    "Instagram",
    "Banned",
    "Conteúdo Gratuito"
  ]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [linkvertiseAccount, setLinkvertiseAccount] = useState<string>('518238');
  const [isUpdatingAccount, setIsUpdatingAccount] = useState(false);
  const token = localStorage.getItem('Token');

  // Carrega a configuração global da conta do Linkvertise
  useEffect(() => {
    fetchLinkvertiseConfig();
  }, []);

  // Busca a configuração global da conta do Linkvertise
  const fetchLinkvertiseConfig = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/linkvertise-config`, {
        headers: {
          'x-api-key': `${import.meta.env.VITE_FRONTEND_API_KEY}`,
        },
      });
      
      if (response.data && response.data.activeAccount) {
        setLinkvertiseAccount(response.data.activeAccount);
      }
    } catch (error) {
      console.error('Erro ao buscar configuração do Linkvertise:', error);
      // Fallback para account1 se não conseguir buscar
      setLinkvertiseAccount('518238');
    }
  };

  // Salva a configuração global da conta do Linkvertise
  const handleLinkvertiseAccountChange = async (account: string) => {
    setIsUpdatingAccount(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/linkvertise-config`,
        { activeAccount: account },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-api-key': `${import.meta.env.VITE_FRONTEND_API_KEY}`,
            'x-admin-key': `${import.meta.env.VITE_ADMIN_KEY}`
          }
        }
      );
      
      setLinkvertiseAccount(account);
      setError(null);
    } catch (error) {
      setError('Erro ao atualizar configuração do Linkvertise');
      console.error('Erro ao atualizar configuração:', error);
    } finally {
      setIsUpdatingAccount(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [activeTab]);

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      const response = await axios.get<{ data: string }>(
        `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
        {
          headers: {
            'x-api-key': `${import.meta.env.VITE_FRONTEND_API_KEY}`
          }
        }
      );

      let base64Data = response.data.data;
      base64Data = base64Data.slice(0, 2) + base64Data.slice(3);
      const jsonString = atob(base64Data);
      const dataObject = JSON.parse(jsonString);
      setLinks(dataObject.data || []);
    } catch (err) {
      setError("Failed to fetch links. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLink = async () => {
    if (!newLink.name || !newLink.link || !newLink.category) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, newLink);
      setNewLink({ name: "", link: "", category: "", createdAt: "" });
      fetchLinks();
    } catch (error) {
      setError("Failed to add link. Please try again.");
      console.error("Error adding link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditLink = (id: number) => {
    const linkToEdit = links.find((link) => link.id === id);
    if (linkToEdit) {
      setNewLink({
        name: linkToEdit.name,
        link: linkToEdit.link,
        category: linkToEdit.category,
        createdAt: linkToEdit.createdAt,
      });
      setIsEditing(id);
    }
  };

  const handleUpdateLink = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}${endpoint}/${isEditing}`,
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
      setNewLink({ name: "", link: "", category: "", createdAt: "" });
      fetchLinks();
    } catch (error) {
      setError("Failed to update link. Please try again.");
      console.error("Error updating link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLink = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = activeTab === "free" ? "/freecontent" : "/vipcontent";
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}${endpoint}/${id}`, {
        headers: {
          "x-api-key": import.meta.env.VITE_FRONTEND_API_KEY,
          "x-admin-key": `${import.meta.env.VITE_ADMIN_KEY}`,
          Authorization: `Bearer ${token}`
        }
      });
      fetchLinks();
    } catch (error) {
      setError("Failed to delete link. Please try again.");
      console.error("Error deleting link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLinks = links
    .filter((link) =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || link.category === selectedCategory)
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin-vip-users")}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Users className="w-5 h-5" />
            Manage VIP Users
          </motion.button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        {/* Configurações do Linkvertise */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">Configurações Globais do Linkvertise</h2>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div className="flex flex-col">
              <span className="font-medium text-white">Conta Ativa Global</span>
              <span className="text-sm text-gray-400">
                {linkvertiseAccount === '518238' ? 'Conta 1 (ID: 518238)' : 'Conta 2 (ID: 1329936)'}
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
                Conta 1
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
                Conta 2
              </motion.button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search links..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <button
                onClick={() => setActiveTab(activeTab === "free" ? "vip" : "free")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "vip"
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {activeTab === "vip" ? "VIP Content" : "Free Content"}
              </button>
            </div>
          </div>

          <div className="grid gap-4 mb-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Link Name"
                  value={newLink.name}
                  onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Link URL"
                  value={newLink.link}
                  onChange={(e) => setNewLink({ ...newLink, link: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={newLink.category}
                  onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={newLink.createdAt}
                  onChange={(e) => setNewLink({ ...newLink, createdAt: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={isEditing ? handleUpdateLink : handleAddLink}
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg transition-colors ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : isEditing
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              {isEditing ? "Update Link" : "Add New Link"}
            </motion.button>
          </div>

          <AnimatePresence>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredLinks.length > 0 ? (
                  filteredLinks.map((link) => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{link.name}</h3>
                        <p className="text-gray-400 text-sm truncate">{link.link}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                            {link.category}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {new Date(link.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditLink(link.id)}
                          className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteLink(link.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    No links found
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;