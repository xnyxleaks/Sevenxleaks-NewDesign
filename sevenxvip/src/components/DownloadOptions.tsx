// DownloadOptions.tsx
import React from 'react';
import DownloadButton from './DownloadButton';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface DownloadOptionsProps {
  primaryLinks: {
    mega?: string;
    mega2?: string;
    pixeldrain?: string;
  };
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ primaryLinks }) => {
  const downloadOptions = [
    {
      name: 'MEGA',
      url: primaryLinks.mega,
      bgColor: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      shadowColor: 'hover:shadow-red-500/20'
    },
    {
      name: 'MEGA 2',
      url: primaryLinks.mega2,
      bgColor: 'from-red-600 to-red-700',
      hoverColor: 'hover:from-red-700 hover:to-red-800',
      shadowColor: 'hover:shadow-red-600/20'
    },
    {
      name: 'Pixeldrain',
      url: primaryLinks.pixeldrain,
      bgColor: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      shadowColor: 'hover:shadow-blue-500/20'
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
              bgColor={option.bgColor}
              hoverColor={option.hoverColor}
              shadowColor={option.shadowColor}
              // iconSrc="...opcional..."
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DownloadOptions;
