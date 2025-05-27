import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Youtube, Settings, RefreshCw } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { state, fetchSubscriptions } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showRefreshAnimation, setShowRefreshAnimation] = useState(false);

  // Page titles based on current route
  const getPageTitle = () => {
    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/themes':
        return 'Themes';
      case '/channels':
        return 'Channels';
      case '/settings':
        return 'Settings';
      default:
        if (pathname.startsWith('/channel/')) {
          const channelId = pathname.split('/').pop();
          const channel = state.channels.find(c => c.id === channelId);
          return channel ? channel.title : 'Channel Details';
        }
        if (pathname.startsWith('/theme/')) {
          const themeName = decodeURIComponent(pathname.split('/').pop() || '');
          return themeName || 'Theme Details';
        }
        return 'YouTube Subscription Manager';
    }
  };

  // Handle scroll events to update header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle refresh button click
  const handleRefresh = async () => {
    setShowRefreshAnimation(true);
    await fetchSubscriptions();
    setTimeout(() => setShowRefreshAnimation(false), 1000);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center space-x-2" onClick={() => navigate('/')} role="button">
            <Youtube size={28} className="text-red-600" />
            <h1 className="text-xl font-semibold hidden sm:block">ThemeHub</h1>
          </div>
        </div>
        
        <h2 className="text-lg font-medium">{getPageTitle()}</h2>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleRefresh}
            className={`p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              state.isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={state.isLoading}
            aria-label="Refresh subscriptions"
          >
            <RefreshCw 
              size={20} 
              className={`${showRefreshAnimation ? 'animate-spin' : ''} ${state.isLoading ? 'animate-spin' : ''}`} 
            />
          </button>
          
          <button 
            onClick={() => navigate('/settings')}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;