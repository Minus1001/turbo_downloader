export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
  };
}

export interface DownloadItem {
  id: string;
  url: string;
  title: string;
  platform: 'whatsapp' | 'tiktok' | 'instagram' | 'youtube';
  type: 'video' | 'image';
  progress: number;
  status: 'pending' | 'downloading' | 'completed' | 'error';
  size: string;
  thumbnail: string;
  downloadedAt?: Date;
}

export interface StreamingVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
  quality: '720p' | '1080p' | '4K';
  size: string;
}