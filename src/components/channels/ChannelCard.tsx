import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Channel } from '../../types';
import { formatNumber } from '../../utils/formatters';
import { getThemeColor, getContrastColor } from '../../utils/colors';

interface ChannelCardProps {
  channel: Channel;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel }) => {
  const navigate = useNavigate();
  const themeColor = getThemeColor(channel.theme);
  const textColor = getContrastColor(themeColor);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/channel/${channel.id}`)}
    >
      <div className="h-24 bg-gray-200 relative">
        <img 
          src={channel.thumbnailUrl} 
          alt={channel.title}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: themeColor, color: textColor }}
        >
          {channel.theme}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{channel.title}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2 h-10">
          {channel.description}
        </p>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-gray-500">
            {formatNumber(channel.subscriberCount)} subscribers
          </span>
          <span className="text-gray-500">
            {formatNumber(channel.videoCount)} videos
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
          <a 
            href={`https://youtube.com/channel/${channel.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mr-1">YouTube</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;