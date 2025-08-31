import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Crown, 
  TrendingUp, 
  Calendar, 
  Percent, 
  Activity,
  BarChart3,
  PieChart,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface StatsData {
  totalUsers: number;
  totalVIPs: number;
  totalContentRecommendations: number;
  usersLastMonth: number;
  vipPercentage: number;
}

const ViewStats: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    totalVIPs: 0,
    totalContentRecommendations: 0,
    usersLastMonth: 0,
    vipPercentage: 0,
  });
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchStats = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stats`, {
        headers: {
          'x-api-key': `${import.meta.env.VITE_FRONTEND_API_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }
      
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setError('Failed to load statistics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      description: "Registered users"
    },
    {
      title: "VIP Members",
      value: stats.totalVIPs,
      icon: Crown,
      color: "yellow",
      gradient: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      description: "Active VIP subscriptions"
    },
    {
      title: "New Users (30d)",
      value: stats.usersLastMonth,
      icon: TrendingUp,
      color: "green",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      description: "Users joined last month"
    },
    {
      title: "VIP Conversion",
      value: `${stats.vipPercentage}%`,
      icon: Percent,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      description: "VIP conversion rate"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold font-orbitron bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 text-lg font-roboto">
            Real-time insights and platform statistics
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchStats}
            disabled={loading}
            className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl transition-colors border border-gray-600/30"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-sm">Refresh Data</span>
          </motion.button>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </motion.div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-gray-400">Loading statistics...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
              {statCards.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`${stat.bgColor} ${stat.borderColor} border backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-orbitron text-white">
                          {typeof stat.value === 'string' ? stat.value : stat.value.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1 font-orbitron">
                        {stat.title}
                      </h3>
                      <p className="text-gray-400 text-sm font-roboto">
                        {stat.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Growth Chart Placeholder */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-orbitron">User Growth</h3>
                    <p className="text-gray-400 text-sm">Monthly registration trends</p>
                  </div>
                </div>
                
                <div className="h-48 bg-gray-700/30 rounded-xl flex items-center justify-center border border-gray-600/30">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Chart visualization coming soon</p>
                  </div>
                </div>
              </motion.div>

              {/* VIP Analytics */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-orbitron">VIP Analytics</h3>
                    <p className="text-gray-400 text-sm">Subscription insights</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="text-gray-300 font-roboto">Active VIPs</span>
                    </div>
                    <span className="text-xl font-bold text-yellow-400 font-orbitron">
                      {stats.totalVIPs}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Percent className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300 font-roboto">Conversion Rate</span>
                    </div>
                    <span className="text-xl font-bold text-purple-400 font-orbitron">
                      {stats.vipPercentage}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-gray-300 font-roboto">New This Month</span>
                    </div>
                    <span className="text-xl font-bold text-green-400 font-orbitron">
                      {stats.usersLastMonth}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-orbitron">Quick Actions</h3>
                  <p className="text-gray-400 text-sm">Administrative shortcuts</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/admin/settings'}
                  className="flex items-center gap-3 p-4 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl transition-all duration-300 border border-gray-600/30 hover:border-blue-500/30"
                >
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">Manage Content</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/admin-vip-users'}
                  className="flex items-center gap-3 p-4 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl transition-all duration-300 border border-gray-600/30 hover:border-yellow-500/30"
                >
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Crown className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">VIP Users</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/admin/requests'}
                  className="flex items-center gap-3 p-4 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl transition-all duration-300 border border-gray-600/30 hover:border-green-500/30"
                >
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">View Requests</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={fetchStats}
                  disabled={loading}
                  className="flex items-center gap-3 p-4 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl transition-all duration-300 border border-gray-600/30 hover:border-purple-500/30"
                >
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <RefreshCw className={`w-4 h-4 text-purple-400 ${loading ? 'animate-spin' : ''}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-300">Refresh</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewStats;