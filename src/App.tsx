import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ThemesPage from './pages/ThemesPage';
import ChannelsPage from './pages/ChannelsPage';
import SettingsPage from './pages/SettingsPage';
import ThemeDetailPage from './pages/ThemeDetailPage';
import ChannelDetailPage from './pages/ChannelDetailPage';
import { AppProvider, useAppContext } from './context/AppContext';
import { initializeMockData } from './services/mockData';

// Initialize App Component
const AppContent: React.FC = () => {
  const { state, dispatch } = useAppContext();

  // Initialize with mock data if the app is empty
  useEffect(() => {
    if (state.channels.length === 0 && state.videos.length === 0) {
      const mockData = initializeMockData();
      
      dispatch({ type: 'SET_CHANNELS', payload: mockData.channels });
      dispatch({ type: 'SET_VIDEOS', payload: mockData.videos });
      dispatch({ type: 'SET_THEMES', payload: mockData.themes });
      dispatch({ type: 'SET_RECENT_CHANGES', payload: mockData.recentChanges });
      dispatch({ type: 'SET_LAST_UPDATED', payload: new Date().toISOString() });
    }
  }, [state.channels.length, state.videos.length, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="themes" element={<ThemesPage />} />
          <Route path="theme/:themeName" element={<ThemeDetailPage />} />
          <Route path="channels" element={<ChannelsPage />} />
          <Route path="channel/:channelId" element={<ChannelDetailPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

// Main App with Context Provider
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;