import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Channel, Theme, Video, SubscriptionChange } from '../types';
import { generateRandomColor } from '../utils/colors';

// Initial state
const initialState: AppState = {
  channels: [],
  videos: [],
  themes: [],
  recentChanges: [],
  isLoading: false,
  lastUpdated: null,
  youtubeApiKey: localStorage.getItem('youtubeApiKey') || '',
  openaiApiKey: localStorage.getItem('openaiApiKey') || ''
};

// Action types
type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CHANNELS'; payload: Channel[] }
  | { type: 'SET_VIDEOS'; payload: Video[] }
  | { type: 'SET_THEMES'; payload: Theme[] }
  | { type: 'SET_RECENT_CHANGES'; payload: SubscriptionChange[] }
  | { type: 'SET_YOUTUBE_API_KEY'; payload: string }
  | { type: 'SET_OPENAI_API_KEY'; payload: string }
  | { type: 'SET_LAST_UPDATED'; payload: string };

// Reducer function
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CHANNELS':
      return { ...state, channels: action.payload };
    case 'SET_VIDEOS':
      return { ...state, videos: action.payload };
    case 'SET_THEMES':
      return { ...state, themes: action.payload };
    case 'SET_RECENT_CHANGES':
      return { ...state, recentChanges: action.payload };
    case 'SET_YOUTUBE_API_KEY':
      localStorage.setItem('youtubeApiKey', action.payload);
      return { ...state, youtubeApiKey: action.payload };
    case 'SET_OPENAI_API_KEY':
      localStorage.setItem('openaiApiKey', action.payload);
      return { ...state, openaiApiKey: action.payload };
    case 'SET_LAST_UPDATED':
      return { ...state, lastUpdated: action.payload };
    default:
      return state;
  }
};

// Create context
interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  fetchSubscriptions: () => Promise<void>;
  categorizeContent: () => Promise<void>;
  hasRequiredApiKeys: () => boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const channelsData = localStorage.getItem('channels');
        const videosData = localStorage.getItem('videos');
        const themesData = localStorage.getItem('themes');
        const recentChangesData = localStorage.getItem('recentChanges');
        const lastUpdated = localStorage.getItem('lastUpdated');

        if (channelsData) dispatch({ type: 'SET_CHANNELS', payload: JSON.parse(channelsData) });
        if (videosData) dispatch({ type: 'SET_VIDEOS', payload: JSON.parse(videosData) });
        if (themesData) dispatch({ type: 'SET_THEMES', payload: JSON.parse(themesData) });
        if (recentChangesData) dispatch({ type: 'SET_RECENT_CHANGES', payload: JSON.parse(recentChangesData) });
        if (lastUpdated) dispatch({ type: 'SET_LAST_UPDATED', payload: lastUpdated });
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('channels', JSON.stringify(state.channels));
    localStorage.setItem('videos', JSON.stringify(state.videos));
    localStorage.setItem('themes', JSON.stringify(state.themes));
    localStorage.setItem('recentChanges', JSON.stringify(state.recentChanges));
    if (state.lastUpdated) {
      localStorage.setItem('lastUpdated', state.lastUpdated);
    }
  }, [state.channels, state.videos, state.themes, state.recentChanges, state.lastUpdated]);

  const hasRequiredApiKeys = () => {
    return !!state.youtubeApiKey && !!state.openaiApiKey;
  };

  // Fetch subscriptions from YouTube API
  const fetchSubscriptions = async () => {
    if (!hasRequiredApiKeys()) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Mock data for now
      const prevChannels = [...state.channels];
      
      // Simulate API call and processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example new channel
      const newChannel: Channel = {
        id: `channel-${Date.now()}`,
        title: 'Tech Insights',
        description: 'The latest in technology news and reviews',
        thumbnailUrl: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        theme: 'Technology',
        videoCount: 120,
        subscriberCount: 50000
      };
      
      const updatedChannels = [...prevChannels, newChannel];
      dispatch({ type: 'SET_CHANNELS', payload: updatedChannels });
      
      // Add to recent changes
      const newChange: SubscriptionChange = {
        channelId: newChannel.id,
        channelTitle: newChannel.title,
        thumbnailUrl: newChannel.thumbnailUrl,
        theme: newChannel.theme,
        type: 'added',
        date: new Date().toISOString()
      };
      
      const updatedChanges = [newChange, ...state.recentChanges].slice(0, 10);
      dispatch({ type: 'SET_RECENT_CHANGES', payload: updatedChanges });
      
      // Update themes
      updateThemes(updatedChannels, state.videos);
      
      // Set last updated
      dispatch({ type: 'SET_LAST_UPDATED', payload: new Date().toISOString() });
      
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Update themes based on channels and videos
  const updateThemes = (channels: Channel[], videos: Video[]) => {
    const themeMap = new Map<string, { channelCount: number; videoCount: number; color: string }>();
    
    // Count channels per theme
    channels.forEach(channel => {
      if (!themeMap.has(channel.theme)) {
        themeMap.set(channel.theme, {
          channelCount: 0,
          videoCount: 0,
          color: generateRandomColor()
        });
      }
      
      const themeData = themeMap.get(channel.theme)!;
      themeData.channelCount += 1;
    });
    
    // Count videos per theme
    videos.forEach(video => {
      if (!themeMap.has(video.theme)) {
        themeMap.set(video.theme, {
          channelCount: 0,
          videoCount: 0,
          color: generateRandomColor()
        });
      }
      
      const themeData = themeMap.get(video.theme)!;
      themeData.videoCount += 1;
    });
    
    // Convert to array
    const themes: Theme[] = Array.from(themeMap.entries()).map(([name, data]) => ({
      name,
      channelCount: data.channelCount,
      videoCount: data.videoCount,
      color: data.color
    }));
    
    dispatch({ type: 'SET_THEMES', payload: themes });
  };

  // Categorize content using OpenAI
  const categorizeContent = async () => {
    if (!hasRequiredApiKeys()) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Mock categorization process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set last updated
      dispatch({ type: 'SET_LAST_UPDATED', payload: new Date().toISOString() });
      
    } catch (error) {
      console.error('Error categorizing content:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        fetchSubscriptions,
        categorizeContent,
        hasRequiredApiKeys
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};