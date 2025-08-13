import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface DownloadButtonProps {
  url?: string;
  fallbackUrl?: string;
  label: string;
  icon: string;
  bgColor: string;
  hoverColor: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  url,
  fallbackUrl,
  label,
  bgColor,
  hoverColor
}) => {
  const { theme } = useTheme();
  const finalUrl = url || fallbackUrl;

  if (!finalUrl) return null;

  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${bgColor} text-white ${hoverColor}`}
    >
      <img alt={label} className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="text-sm sm:text-base">{label}</span>
      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
    </a>
  );
};

export default DownloadButton;