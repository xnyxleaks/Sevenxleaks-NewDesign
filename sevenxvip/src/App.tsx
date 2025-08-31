import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Chooser from "./components/Chooser/Chooser";
import AsianPage from "./pages/AsianPage";
import WesternPage from "./pages/WesternPage";
import Header from "./components/Header";
import HeaderLogged from "./components/HeaderLogged";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import YourAccount from "./pages/Youraccount";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import ForgotPassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";
import Plans from "./pages/Plans";
import VIPcontent from "./pages/VIPcontent";
import FreeContentDetails from "./components/AsianContentDetails";
import VIPContentDetails from "./components/FreeContent/VIPContentDetails";
import AdminPainel from "./pages/AdminPainel";
import AdminVipUsers from "./pages/AdminVipUsers";
import SupportPage from "./pages/SupportPage";
import RecommendContent from "./pages/RecommendContent";
import ViewStats from "./pages/Viewstats";
import ViewRequests from "./pages/ViewRequests";
import AccessDenied from "./pages/AccessDenied";
import AdminDisabledVipUsers from "./pages/AdminDisabledVipUsers";
import BannedContent from "./pages/BannedContent";
import UnknownContent from "./pages/UnknownContent";
import BannedContentDetails from "./pages/BannedContentDetails";
import UnknownContentDetails from "./pages/UnknownContentDetails";
import WesternContentDetails from "./pages/WesternContentDetails";
import AsianContentDetails from "./components/AsianContentDetails";

const App = () => {
  const [hasPermission, setHasPermission] = useState({ vip: false, admin: false });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const checkPermissions = async () => {
      if (!token) {
        setHasPermission({ vip: false, admin: false });
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { isAdmin, isVip } = response.data;
        setHasPermission({ vip: isVip, admin: isAdmin });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Erro ao verificar permissões:", error);
        setHasPermission({ vip: false, admin: false });
        setIsAuthenticated(false);
        localStorage.removeItem("Token");
      }
    };

    checkPermissions();
  }, [token]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {isAuthenticated ? <HeaderLogged /> : <Header />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Chooser />} />
            <Route path="/asian" element={<AsianPage />} />
            <Route path="/asian/:slug" element={<AsianContentDetails />} />
            <Route path="/western" element={<WesternPage />} />
            <Route path="/western/:slug" element={<WesternContentDetails />} />
            <Route path="/banned" element={<BannedContent />} />
            <Route path="/banned/:slug" element={<BannedContentDetails />} />
            <Route path="/unknown" element={<UnknownContent />} />
            <Route path="/unknown/:slug" element={<UnknownContentDetails />} />
            
            <Route 
              path="/vip" 
              element={
                hasPermission.vip ? (
                  <VIPcontent />
                ) : (
                  <AccessDenied message="You are not a VIP to access this page." />
                )
              } 
            />
            
            <Route 
              path="/vip/:slug" 
              element={
                hasPermission.vip ? (
                  <VIPContentDetails />
                ) : (
                  <AccessDenied message="You are not a VIP to access this page." />
                )
              } 
            />
            
            <Route 
              path="/admin/settings" 
              element={
                hasPermission.admin ? (
                  <AdminPainel />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              } 
            />
            <Route 
              path="/admin/stats" 
              element={
                hasPermission.admin ? (
                  <ViewStats />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              } 
            />
            <Route 
              path="/admin/requests" 
              element={
                hasPermission.admin ? (
                  <ViewRequests />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              } 
            />
            <Route 
              path="/admin-vip-users" 
              element={
                hasPermission.admin ? (
                  <AdminVipUsers />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              } 
            />
            <Route 
              path="/admin-vip-disabled" 
              element={
                hasPermission.admin ? (
                  <AdminDisabledVipUsers />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              } 
            />
            
            <Route path="/chooser" element={<Chooser />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<YourAccount />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/recommend" element={<RecommendContent />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;