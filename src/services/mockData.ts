import { Channel, Video, Theme, SubscriptionChange } from '../types';
import { getThemeColor } from '../utils/colors';

// Generate mock channels
export const generateMockChannels = (): Channel[] => {
  const themes = ['Technology', 'Science', 'Gaming', 'Music', 'Education'];
  
  return [
    {
      id: 'channel1',
      title: 'Tech Insights',
      description: 'The latest in technology news and reviews',
      thumbnailUrl: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      theme: 'Technology',
      videoCount: 120,
      subscriberCount: 50000
    },
    {
      id: 'channel2',
      title: 'Science Explorer',
      description: 'Exploring the wonders of science and nature',
      thumbnailUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      theme: 'Science',
      videoCount: 85,
      subscriberCount: 75000
    },
    {
      id: 'channel3',
      title: 'Gaming Universe',
      description: 'Gaming news, reviews, and walkthroughs',
      thumbnailUrl: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      theme: 'Gaming',
      videoCount: 210,
      subscriberCount: 120000
    },
    {
      id: 'channel4',
      title: 'Music Masters',
      description: 'Music tutorials, covers, and original compositions',
      thumbnailUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      theme: 'Music',
      videoCount: 150,
      subscriberCount: 90000
    },
    {
      id: 'channel5',
      title: 'Learning Hub',
      description: 'Educational content on a variety of subjects',
      thumbnailUrl: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      theme: 'Education',
      videoCount: 95,
      subscriberCount: 60000
    }
  ];
};

// Generate mock videos
export const generateMockVideos = (channels: Channel[]): Video[] => {
  const videos: Video[] = [];
  
  channels.forEach(channel => {
    for (let i = 0; i < 5; i++) {
      videos.push({
        id: `video-${channel.id}-${i}`,
        title: `${channel.title} Video ${i + 1}`,
        description: `This is a video about ${channel.theme.toLowerCase()}`,
        thumbnailUrl: channel.thumbnailUrl,
        publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
        channelId: channel.id,
        theme: channel.theme
      });
    }
  });
  
  return videos;
};

// Generate mock themes
export const generateMockThemes = (channels: Channel[], videos: Video[]): Theme[] => {
  const themeMap = new Map<string, { channelCount: number; videoCount: number; color: string }>();
  
  // Count channels per theme
  channels.forEach(channel => {
    if (!themeMap.has(channel.theme)) {
      themeMap.set(channel.theme, {
        channelCount: 0,
        videoCount: 0,
        color: getThemeColor(channel.theme)
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
        color: getThemeColor(video.theme)
      });
    }
    
    const themeData = themeMap.get(video.theme)!;
    themeData.videoCount += 1;
  });
  
  // Convert to array
  return Array.from(themeMap.entries()).map(([name, data]) => ({
    name,
    channelCount: data.channelCount,
    videoCount: data.videoCount,
    color: data.color
  }));
};

// Generate mock recent changes
export const generateMockRecentChanges = (channels: Channel[]): SubscriptionChange[] => {
  const changes: SubscriptionChange[] = [];
  
  channels.forEach((channel, index) => {
    const daysAgo = index * 2;
    changes.push({
      channelId: channel.id,
      channelTitle: channel.title,
      thumbnailUrl: channel.thumbnailUrl,
      theme: channel.theme,
      type: index % 3 === 0 ? 'removed' : 'added',
      date: new Date(Date.now() - daysAgo * 86400000).toISOString()
    });
  });
  
  return changes;
};

// Initialize mock data
export const initializeMockData = () => {
  const channels = generateMockChannels();
  const videos = generateMockVideos(channels);
  const themes = generateMockThemes(channels, videos);
  const recentChanges = generateMockRecentChanges(channels);
  
  return { channels, videos, themes, recentChanges };
};