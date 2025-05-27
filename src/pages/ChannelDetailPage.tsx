import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, ExternalLink, Tv2 } from 'lucide-react';
import { formatNumber, formatDate } from '../utils/formatters';
import { getThemeColor, getContrastColor } from '../utils/colors';

const ChannelDetailPage: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { channels, videos } = state;

  const channel = useMemo(() => {
    return channels.find(c => c.id === channelId);
  }, [channels, channelId]);
  
  const channelVideos = useMemo(() => {
    return videos.filter(video => video.channelId === channelId)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [videos, channelId]);

  if (!channel) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <Tv2 size={48} className="mx-auto mb-4 text-blue-500" />
          <h2 className="text-2xl font-bold mb-4">Channel Not Found</h2>
          <p className="text-gray-600 mb-6">
            The channel you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/channels')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Channels
          </button>
        </div>
      </div>
    );
  }

  const themeColor = getThemeColor(channel.theme);
  const textColor = getContrastColor(themeColor);

  return (
    <div>
      <button 
        onClick={() => navigate('/channels')}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Channels
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="h-40 bg-gray-200 relative">
          <img 
            src={channel.thumbnailUrl} 
            alt={channel.title}
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium"
            style={{ backgroundColor: themeColor, color: textColor }}
            onClick={() => navigate(`/theme/${encodeURIComponent(channel.theme)}`)}
            role="button"
          >
            {channel.theme}
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{channel.title}</h1>
            <a 
              href={`https://youtube.com/channel/${channel.id}`}
              className="text-blue-600 hover:text-blue-800 flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="mr-1">YouTube</span>
              <ExternalLink size={16} />
            </a>
          </div>
          
          <p className="text-gray-700 mb-4">{channel.description}</p>
          
          <div className="flex space-x-8 text-gray-600">
            <div>
              <p className="text-sm">Subscribers</p>
              <p className="text-lg font-semibold">{formatNumber(channel.subscriberCount)}</p>
            </div>
            <div>
              <p className="text-sm">Videos</p>
              <p className="text-lg font-semibold">{formatNumber(channel.videoCount)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {channelVideos.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 pb-3">
            <h2 className="text-xl font-semibold">Recent Videos</h2>
          </div>
          <div className="overflow-hidden">
            {channelVideos.map((video, index) => (
              <div 
                key={video.id}
                className={`flex items-center p-4 hover:bg-gray-50 ${
                  index !== channelVideos.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1">{video.title}</h3>
                  <div className="flex items-center">
                    <span 
                      className="text-xs px-2 py-0.5 rounded-full mr-2"
                      style={{ backgroundColor: themeColor, color: textColor }}
                    >
                      {video.theme}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(video.publishedAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelDetailPage;