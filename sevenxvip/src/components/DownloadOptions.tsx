import React from 'react';
import DownloadButton from './DownloadButton';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface DownloadOptionsProps {
  primaryLinks: {
    mega?: string;
    mega2?: string;
    pixeldrain?: string;
  };
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ primaryLinks }) => {
  const { theme } = useTheme();

  const themeColors = {
    asian: {
      primary: 'from-asian-primary to-asian-accent',
      hover: 'hover:from-asian-accent hover:to-asian-primary',
      shadow: 'hover:shadow-asian-primary/20'
    },
    western: {
      primary: 'from-western-primary to-western-accent',
      hover: 'hover:from-western-accent hover:to-western-primary',
      shadow: 'hover:shadow-western-primary/20'
    },
    vip: {
      primary: 'from-vip-primary to-vip-accent',
      hover: 'hover:from-vip-accent hover:to-vip-primary',
      shadow: 'hover:shadow-vip-primary/20'
    }
  };

  const colors = themeColors[theme as keyof typeof themeColors] || themeColors.asian;

  const downloadOptions = [
    {
      name: 'MEGA',
      url: primaryLinks.mega,
    },
    {
      name: 'MEGA 2',
      url: primaryLinks.mega2,
    },
    {
      name: 'Pixeldrain',
      url: primaryLinks.pixeldrain,
    }
  ];

  const availableOptions = downloadOptions.filter(option => option.url);

  if (availableOptions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-400">No download links available</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableOptions.map((option, index) => (
          <motion.div
            key={option.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DownloadButton
              url={option.url!}
              label={option.name}
              bgColor={colors.primary}
              hoverColor={colors.hover}
              shadowColor={colors.shadow}
              textColor="text-white"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DownloadOptions;
