// DownloadButton.tsx
import React from 'react';
import { ExternalLink, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface DownloadButtonProps {
  url: string;
  label: string;
  bgColor: string;
  hoverColor: string;
  shadowColor: string;
  iconSrc?: string; // opcional
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  url,
  label,
  bgColor,
  hoverColor,
  shadowColor,
  iconSrc
}) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${shadowColor} backdrop-blur-sm border border-white/10 bg-gradient-to-r ${bgColor} ${hoverColor} text-white group`}
    >
      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
        {iconSrc ? (
          <img src={iconSrc} alt="" aria-hidden="true" className="w-4 h-4 object-contain" />
        ) : (
          <Download className="w-4 h-4" aria-hidden="true" />
        )}
      </div>
      <span className="flex-1 text-center text-sm font-medium">{label}</span>
      <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.a>
  );
};

export default DownloadButton;
