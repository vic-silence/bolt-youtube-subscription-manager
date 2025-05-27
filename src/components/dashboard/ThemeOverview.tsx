import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme } from '../../types';
import { getContrastColor } from '../../utils/colors';

interface ThemeOverviewProps {
  themes: Theme[];
}

const ThemeOverview: React.FC<ThemeOverviewProps> = ({ themes }) => {
  const navigate = useNavigate();

  if (themes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Theme Overview</h2>
        <p className="text-gray-500 text-center py-8">No themes available yet</p>
      </div>
    );
  }

  // Sort themes by channel count (descending)
  const sortedThemes = [...themes].sort((a, b) => b.channelCount - a.channelCount);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 pb-3">
        <h2 className="text-xl font-semibold">Theme Overview</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {sortedThemes.map((theme) => {
          const textColor = getContrastColor(theme.color);
          
          return (
            <div
              key={theme.name}
              className="rounded-lg p-4 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-md"
              style={{ backgroundColor: theme.color, color: textColor }}
              onClick={() => navigate(`/theme/${encodeURIComponent(theme.name)}`)}
            >
              <h3 className="font-bold text-lg mb-2">{theme.name}</h3>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm opacity-90">Channels</p>
                  <p className="font-semibold">{theme.channelCount}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Videos</p>
                  <p className="font-semibold">{theme.videoCount}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeOverview;