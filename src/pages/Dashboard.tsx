import React from 'react';
import { useAppContext } from '../context/AppContext';
import RecentChanges from '../components/dashboard/RecentChanges';
import ThemeOverview from '../components/dashboard/ThemeOverview';

const Dashboard: React.FC = () => {
  const { state, hasRequiredApiKeys } = useAppContext();
  const { themes, recentChanges } = state;

  if (!hasRequiredApiKeys()) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold mb-4">Welcome to ThemeHub</h2>
          <p className="text-gray-600 mb-6">
            Organize your YouTube subscriptions into themes automatically using AI.
          </p>
          <p className="mb-4 text-gray-700">
            To get started, you need to configure your API keys in the settings.
          </p>
          <button
            onClick={() => window.location.href = '/settings'}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Settings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentChanges changes={recentChanges} />
        <ThemeOverview themes={themes} />
      </div>
    </div>
  );
};

export default Dashboard;