import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Save, Key, RefreshCw, AlertCircle } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { state, dispatch, fetchSubscriptions, hasRequiredApiKeys } = useAppContext();
  
  const [youtubeApiKey, setYoutubeApiKey] = useState(state.youtubeApiKey);
  const [openaiApiKey, setOpenaiApiKey] = useState(state.openaiApiKey);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSaveApiKeys = () => {
    dispatch({ type: 'SET_YOUTUBE_API_KEY', payload: youtubeApiKey });
    dispatch({ type: 'SET_OPENAI_API_KEY', payload: openaiApiKey });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleRefresh = async () => {
    if (hasRequiredApiKeys()) {
      await fetchSubscriptions();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Key size={20} className="mr-2" />
            API Keys
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="youtube-api-key" className="block text-sm font-medium text-gray-700 mb-1">
                YouTube Data API v3 Key
              </label>
              <input
                id="youtube-api-key"
                type="password"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your YouTube API key"
                value={youtubeApiKey}
                onChange={(e) => setYoutubeApiKey(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">
                Get your API key from the <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a>
              </p>
            </div>
            
            <div>
              <label htmlFor="openai-api-key" className="block text-sm font-medium text-gray-700 mb-1">
                OpenAI API Key
              </label>
              <input
                id="openai-api-key"
                type="password"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your OpenAI API key"
                value={openaiApiKey}
                onChange={(e) => setOpenaiApiKey(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">
                Get your API key from <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI</a>
              </p>
            </div>
            
            <div>
              <button
                onClick={handleSaveApiKeys}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save size={18} className="mr-2" />
                Save API Keys
              </button>
              
              {showSuccessMessage && (
                <span className="ml-3 text-sm text-green-600">API keys saved successfully!</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <RefreshCw size={20} className="mr-2" />
            Data Management
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-700 mb-4">
                Refresh your YouTube subscriptions and categorize them into themes using OpenAI.
              </p>
              
              <button
                onClick={handleRefresh}
                disabled={!hasRequiredApiKeys()}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  hasRequiredApiKeys() 
                    ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <RefreshCw size={18} className="mr-2" />
                Refresh Subscriptions
              </button>
              
              {!hasRequiredApiKeys() && (
                <div className="mt-3 flex items-start">
                  <AlertCircle size={16} className="text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    You need to add your API keys before refreshing data.
                  </p>
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-700 mb-4">
                Clear all local data and start fresh.
              </p>
              
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">About ThemeHub</h2>
          
          <p className="text-sm text-gray-700 mb-2">
            ThemeHub helps you organize your YouTube subscriptions into themes using AI.
          </p>
          
          <p className="text-sm text-gray-700">
            Version 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;