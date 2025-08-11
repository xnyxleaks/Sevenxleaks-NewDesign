import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "../components/Plans/PlanCard";
import Loading from "../components/Loading/Loading";
import { motion } from "framer-motion";
import { Crown, Star, Shield } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Helmet } from "react-helmet";

const Plans: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userIsVip, setUserIsVip] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const email = localStorage.getItem("email");
  const { theme } = useTheme();

  useEffect(() => {
    const checkAuthAndVipStatus = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const authResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (authResponse.ok) {
          setIsAuthenticated(true);
          const userData = await authResponse.json();
          setUserIsVip(userData.isVip);
        } else {
          localStorage.removeItem("Token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication or VIP status:", error);
        localStorage.removeItem("Token");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndVipStatus();
  }, [token, email]);

  const handleAccessClick = async (plan: "monthly" | "annual") => {
    const token = localStorage.getItem("Token");
    const email = localStorage.getItem("email");
  
    if (!token) {
      navigate('/register');
      return;
    }
  
    if (!email) {
      navigate('/login');
      return;
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        navigate('/login');
        return;
      }

      const paymentResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pay/vip-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, planType: plan }),
      });
      
      const paymentData = await paymentResponse.json();
  
      if (paymentData.url) {
        window.location.href = paymentData.url;
      } else {
        alert(paymentData.error || "Erro ao redirecionar para o Stripe.");
      }
    } catch (error) {
      console.error("Erro ao iniciar o checkout:", error);
      alert("Erro ao processar pagamento. Veja o console para detalhes.");
    }
  };

  const handleFreeContentClick = (): Promise<void> => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
    return Promise.resolve();
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Helmet>
        <title>Sevenxleaks - Plans</title>
        <link rel="canonical" href={`https://sevenxleaks.com/plans`} />
      </Helmet>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="mb-8">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-yellow-500/30"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Crown className="w-12 h-12 text-black" />
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 font-orbitron bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              VIP LOUNGE
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-roboto">
              Choose Your VIP Experience and unlock exclusive premium content
            </p>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="flex justify-center gap-8 flex-wrap">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <PlanCard
              title="VIP ALL ACCESS"
              price="$10.00"
              description="Monthly Premium Access"
              isPopular={false}
              features={[
                "Exclusive VIP content access",
                "Early access to new content",
                "VIP Discord community badge",
                "Priority support 24/7",
                "Ad-free experience",
                "Exclusive webinars & Q&A",
                "Content recommendation priority",
                "Monthly newsletter",
              ]}
              buttonText="Get VIP Access"
              onButtonClick={() => handleAccessClick("monthly")}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <PlanCard
              title="ANNUAL PREMIUM"
              price="$5.00/mo"
              description="Billed annually ($60.00/year)"
              features={[
                "All VIP features included",
                "50% monthly price savings",
                "Exclusive annual member badge",
                "Premium Discord channels",
                "Priority feature requests",
                "Exclusive annual events",
                "Personal support manager",
                "Advanced content analytics",
              ]}
              buttonText="Get Annual Plan"
              onButtonClick={() => handleAccessClick("annual")}
              isPopular={true}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <PlanCard
              title="FREE ACCESS"
              price="$0.00"
              description="Basic Features"
              features={[
                "Free content with ads",
                "Basic Discord access",
                "Standard support",
                "Community features",
                "Limited content access",
                "Ad-supported experience",
                "Standard response time",
                "Basic analytics",
              ]}
              buttonText="Access Free Content"
              onButtonClick={handleFreeContentClick}
              isPopular={false}
              unPopular={true}
            />
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-12 text-white font-orbitron">
            Why Choose VIP?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Crown,
                title: "Premium Content",
                description: "Access exclusive VIP content and features",
                color: "yellow"
              },
              {
                icon: Star,
                title: "Ad-Free Experience", 
                description: "Enjoy all content without interruptions",
                color: "purple"
              },
              {
                icon: Shield,
                title: "Priority Support",
                description: "Get dedicated support when you need it",
                color: "blue"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  benefit.color === 'yellow' 
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : benefit.color === 'purple'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white font-orbitron">{benefit.title}</h3>
                <p className="text-gray-400 font-roboto">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Plans;