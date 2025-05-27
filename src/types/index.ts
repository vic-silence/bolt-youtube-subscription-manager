export interface Channel {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  theme: string;
  videoCount: number;
  subscriberCount: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelId: string;
  theme: string;
}

export interface Theme {
  name: string;
  channelCount: number;
  videoCount: number;
  color: string;
}

export interface SubscriptionChange {
  channelId: string;
  channelTitle: string;
  thumbnailUrl: string;
  theme: string;
  type: 'added' | 'removed';
  date: string;
}

export interface AppState {
  channels: Channel[];
  videos: Video[];
  themes: Theme[];
  recentChanges: SubscriptionChange[];
  isLoading: boolean;
  lastUpdated: string | null;
  youtubeApiKey: string;
  openaiApiKey: string;
}