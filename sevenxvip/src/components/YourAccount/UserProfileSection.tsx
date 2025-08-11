import React, { useRef, useState, useEffect } from "react";
import { User, Mail, Calendar, Edit } from "lucide-react";
import { Userdatatypes } from "../../../types/Userdatatypes";
import { useTheme } from "../../contexts/ThemeContext";
import axios from "axios";

interface UserProfileSectionProps {
  userData: Userdatatypes;
  setUserData: (updatedData: Userdatatypes) => void; // Para atualizar a imagem após envio
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ userData, setUserData }) => {
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    // Busca imagem de perfil do backend ao montar o componente
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("Token");
        if (!token) return;

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/profile-image`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.profileImage && res.data.profileImage !== userData.profileImage) {
          // Atualiza o userData com a imagem vinda do backend
          setUserData({ ...userData, profileImage: res.data.profileImage });
        }
      } catch (error) {
        console.error("Erro ao buscar imagem de perfil:", error);
      }
    };

    fetchProfileImage();
  }, []); // Executa só ao montar

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUDY_NAME);

    try {
      // Envia imagem para o Cloudinary
      const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDY_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const cloudData = await cloudRes.json();
      const imageUrl = cloudData.secure_url;

      // Atualiza a imagem no backend
      const token = localStorage.getItem("Token"); 

      const apiRes = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/auth/update-profile-image`,
        { profileImage: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserData(apiRes.data.user); 

    } catch (error) {
      console.error("Erro ao atualizar imagem:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`overflow-hidden rounded-2xl transition-all duration-300 ${
      isDark
        ? "bg-gray-800/60 border border-gray-700 shadow-lg shadow-indigo-500/10"
        : "bg-white border border-gray-200 shadow-lg shadow-indigo-500/5"
    }`}>
      <div className={`w-full h-32 ${isDark ? "bg-gradient-to-r from-indigo-500/30 to-purple-500/30" : "bg-gradient-to-r from-indigo-100 to-purple-100"}`}></div>

      <div className="p-6 -mt-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <div className={`relative rounded-full w-24 h-24 overflow-hidden border-4 ${
            isDark ? "border-gray-800" : "border-white"
          }`}>
            {userData.profileImage ? (
              <img
                src={userData.profileImage}
                alt={userData.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}>
                <User className={`w-12 h-12 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
              </div>
            )}

            <button
              type="button"
              onClick={handleEditClick}
              className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isDark
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white transition-colors duration-200`}
              disabled={loading}
            >
              <Edit className="w-4 h-4" />
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="flex-1 pt-2 sm:pt-0">
            <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {userData.username}
            </h2>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Member since {new Date(userData.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`flex items-center gap-3 p-3 rounded-lg ${
            isDark ? "bg-gray-700/50" : "bg-gray-100"
          }`}>
            <Mail className={isDark ? "text-indigo-400" : "text-indigo-600"} size={18} />
            <div>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Email Address</p>
              <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                {userData.email || "No email provided"}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-3 p-3 rounded-lg ${
            isDark ? "bg-gray-700/50" : "bg-gray-100"
          }`}>
            <Calendar className={isDark ? "text-indigo-400" : "text-indigo-600"} size={18} />
            <div>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Account Status</p>
              <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                {userData.isVip ? "VIP Member" : "Free Member"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;
