import React, { useState } from "react";
import { Settings, Download, Trash2, LogOut, Shield, AlertTriangle } from "lucide-react";
import { Userdatatypes } from "../../../types/Userdatatypes";
import { useTheme } from "../../contexts/ThemeContext";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import DeleteAccountModal from "./modals/DeleteAccountModal";

interface AccountOptionsSectionProps {
  userData: Userdatatypes;
}

const AccountOptionsSection: React.FC<AccountOptionsSectionProps> = ({ userData }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSignout = () => {
    localStorage.removeItem('Token');
    window.location.href = '/';
  };

  return (
    <div className={`overflow-hidden rounded-2xl transition-colors duration-300 ${
      isDark 
        ? "bg-gray-800/60 border border-gray-700" 
        : "bg-white border border-gray-200"
    }`}>
      <div className={`px-6 py-4 border-b ${
        isDark ? "border-gray-700" : "border-gray-200"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
            isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600"
          }`}>
            <Settings size={20} />
          </div>
          <h3 className="text-xl font-semibold">Account Options</h3>
        </div>
      </div>
      
      <div className="p-6">
        {/* Maintenance notice - removed since we're implementing these features */}
        
        <div className="space-y-6">
          {/* Security */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={18} className={isDark ? "text-purple-400" : "text-purple-600"} />
              <h4 className="font-medium">Security</h4>
            </div>
            
            <button 
              onClick={() => setIsPasswordModalOpen(true)}
              className={`w-full p-2 text-left rounded-lg text-sm transition-colors duration-200 ${
                isDark 
                  ? "text-gray-300 hover:bg-gray-700" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Change password
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Settings size={18} className={isDark ? "text-purple-400" : "text-purple-600"} />
              <h4 className="font-medium">More Options</h4>
            </div>


            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className={`w-full p-2 text-left rounded-lg text-sm transition-colors duration-200 flex items-center gap-2 ${
                isDark 
                  ? "text-red-400 hover:bg-red-500/10" 
                  : "text-red-600 hover:bg-red-50"
              }`}
            >
              <Trash2 size={16} />
              <span>Delete account</span>
            </button>

            <button 
              onClick={handleSignout} 
              className={`w-full p-2 text-left rounded-lg text-sm transition-colors duration-200 flex items-center gap-2 ${
                isDark 
                  ? "text-gray-300 hover:bg-gray-700" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userEmail={userData.email}
      />
      
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        userEmail={userData.email}
      />
    </div>
  );
};

export default AccountOptionsSection;