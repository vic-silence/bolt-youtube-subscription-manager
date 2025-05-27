import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme } from '../../types';
import { getContrastColor } from '../../utils/colors';

interface ThemeCardProps {
  theme: Theme;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  const navigate = useNavigate();
  const textColor = getContrastColor(theme.color);

  return (
    <div 
      className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => navigate(`/theme/${encodeURIComponent(theme.name)}`)}
      style={{ backgroundColor: theme.color }}
    >
      <div className="p-6" style={{ color: textColor }}>
        <h3 className="font-bold text-xl mb-3">{theme.name}</h3>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-sm opacity-80">Channels</p>
            <p className="font-semibold text-2xl">{theme.channelCount}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">Videos</p>
            <p className="font-semibold text-2xl">{theme.videoCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCard;