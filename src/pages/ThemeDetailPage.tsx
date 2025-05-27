import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ChannelCard from '../components/channels/ChannelCard';
import { ArrowLeft, Layers } from 'lucide-react';
import { getThemeColor, getContrastColor } from '../utils/colors';

const ThemeDetailPage: React.FC = () => {
  const { themeName } = useParams<{ themeName: string }>();
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { channels, themes } = state;

  const decodedThemeName = themeName ? decodeURIComponent(themeName) : '';
  
  const theme = useMemo(() => {
    return themes.find(t => t.name === decodedThemeName);
  }, [themes, decodedThemeName]);
  
  const themeChannels = useMemo(() => {
    return channels.filter(channel => channel.theme === decodedThemeName);
  }, [channels, decodedThemeName]);

  if (!theme) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <Layers size={48} className="mx-auto mb-4 text-blue-500" />
          <h2 className="text-2xl font-bold mb-4">Theme Not Found</h2>
          <p className="text-gray-600 mb-6">
            The theme you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/themes')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Themes
          </button>
        </div>
      </div>
    );
  }

  const themeColor = getThemeColor(theme.name);
  const textColor = getContrastColor(themeColor);

  return (
    <div>
      <button 
        onClick={() => navigate('/themes')}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Themes
      </button>
      
      <div 
        className="rounded-lg shadow-md p-6 mb-6"
        style={{ backgroundColor: themeColor, color: textColor }}
      >
        <h1 className="text-2xl font-bold mb-2">{theme.name}</h1>
        <div className="flex space-x-8">
          <div>
            <p className="text-sm opacity-80">Channels</p>
            <p className="text-2xl font-semibold">{theme.channelCount}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">Videos</p>
            <p className="text-2xl font-semibold">{theme.videoCount}</p>
          </div>
        </div>
      </div>
      
      {themeChannels.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">No channels in this theme</p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Channels in this theme</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {themeChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeDetailPage;