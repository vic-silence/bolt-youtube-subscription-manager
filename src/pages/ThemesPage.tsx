import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ThemeCard from '../components/themes/ThemeCard';
import { Layers, Grid, List } from 'lucide-react';

const ThemesPage: React.FC = () => {
  const { state } = useAppContext();
  const { themes } = state;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (themes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <Layers size={48} className="mx-auto mb-4 text-blue-500" />
          <h2 className="text-2xl font-bold mb-4">No Themes Yet</h2>
          <p className="text-gray-600 mb-6">
            Your YouTube subscriptions will be organized into themes automatically once you refresh your data.
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

  // Sort themes by channel count (descending)
  const sortedThemes = [...themes].sort((a, b) => b.channelCount - a.channelCount);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Themes</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${
              viewMode === 'grid' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            aria-label="Grid view"
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${
              viewMode === 'list' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            aria-label="List view"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedThemes.map((theme) => (
            <ThemeCard key={theme.name} theme={theme} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Theme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Channels
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Videos
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedThemes.map((theme) => (
                <tr 
                  key={theme.name} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => window.location.href = `/theme/${encodeURIComponent(theme.name)}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: theme.color }}
                      ></div>
                      <div className="text-sm font-medium text-gray-900">{theme.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {theme.channelCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {theme.videoCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ThemesPage;