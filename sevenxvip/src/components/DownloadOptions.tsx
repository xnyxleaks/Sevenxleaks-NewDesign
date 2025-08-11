import React from 'react';
import DownloadButton from './DownloadButton';
import { motion } from 'framer-motion';
import { Download, Shield } from 'lucide-react';
import MEGA from '../assets/MEGA.png';
import Pixeldrain from '../assets/pixeldrain.png';
import Gofile from '../assets/Gofile.jpg';

interface DownloadOptionsProps {
  primaryLinks: {
    mega?: string;
    pixeldrain?: string;
    gofile?: string;
  };
  mirrorLinks: {
    mega?: string;
    pixeldrain?: string;
    gofile?: string;
  };
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ primaryLinks }) => {
  const downloadOptions = [
    {
      name: 'MEGA',
      url: primaryLinks.mega,
      icon: MEGA,
      bgColor: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      shadowColor: 'hover:shadow-red-500/20'
    },
    {
      name: 'Pixeldrain',
      url: primaryLinks.pixeldrain,
      icon: Pixeldrain,
      bgColor: 'from-gray-600 to-gray-700',
      hoverColor: 'hover:from-gray-700 hover:to-gray-800',
      shadowColor: 'hover:shadow-gray-500/20'
    },
    {
      name: 'Gofile',
      url: primaryLinks.gofile,
      icon: Gofile,
      bgColor: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      shadowColor: 'hover:shadow-blue-500/20'
    }
  ];

  const availableOptions = downloadOptions.filter(option => option.url);

  if (availableOptions.length === 0) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <Shield className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-gray-400 text-sm">No download links available</p>
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
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DownloadOptions;