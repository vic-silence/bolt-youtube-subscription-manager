import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import ChannelCard from '../components/channels/ChannelCard';
import { Search, Tv2 } from 'lucide-react';

const ChannelsPage: React.FC = () => {
  const { state } = useAppContext();
  const { channels, themes } = state;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  // Filter channels based on search query and selected theme
  const filteredChannels = useMemo(() => {
    return channels.filter(channel => {
      const matchesSearch = channel.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTheme = selectedTheme === 'all' || channel.theme === selectedTheme;
      return matchesSearch && matchesTheme;
    });
  }, [channels, searchQuery, selectedTheme]);

  if (channels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <Tv2 size={48} className="mx-auto mb-4 text-blue-500" />
          <h2 className="text-2xl font-bold mb-4">No Channels Yet</h2>
          <p className="text-gray-600 mb-6">
            Your YouTube subscriptions will appear here once you refresh your data.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Sort themes alphabetically
  const sortedThemes = [...themes].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Channels</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="form-select block w-full md:w-48 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
          >
            <option value="all">All Themes</option>
            {sortedThemes.map((theme) => (
              <option key={theme.name} value={theme.name}>
                {theme.name} ({theme.channelCount})
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredChannels.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">No channels match your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredChannels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelsPage;