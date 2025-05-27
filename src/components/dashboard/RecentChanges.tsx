import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { SubscriptionChange } from '../../types';
import { formatRelativeTime } from '../../utils/formatters';
import { getThemeColor, getContrastColor } from '../../utils/colors';

interface RecentChangesProps {
  changes: SubscriptionChange[];
}

const RecentChanges: React.FC<RecentChangesProps> = ({ changes }) => {
  const navigate = useNavigate();

  if (changes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Changes</h2>
        <p className="text-gray-500 text-center py-8">No recent subscription changes</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 pb-3">
        <h2 className="text-xl font-semibold">Recent Changes</h2>
      </div>
      <div className="overflow-hidden">
        {changes.map((change, index) => {
          const themeColor = getThemeColor(change.theme);
          const textColor = getContrastColor(themeColor);
          
          return (
            <div 
              key={`${change.channelId}-${change.date}`}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                index !== changes.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              onClick={() => navigate(`/channel/${change.channelId}`)}
            >
              <div className="flex-shrink-0 mr-3">
                <img 
                  src={change.thumbnailUrl} 
                  alt={change.channelTitle}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{change.channelTitle}</h3>
                <div className="flex items-center mt-1">
                  <span 
                    className="text-xs px-2 py-1 rounded-full mr-2 inline-flex items-center"
                    style={{ backgroundColor: themeColor, color: textColor }}
                  >
                    {change.theme}
                  </span>
                  <span className="text-xs text-gray-500">{formatRelativeTime(change.date)}</span>
                </div>
              </div>
              <div className="flex-shrink-0 ml-2">
                {change.type === 'added' ? (
                  <PlusCircle className="text-green-500\" size={20} />
                ) : (
                  <MinusCircle className="text-red-500" size={20} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentChanges;