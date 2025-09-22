import React, { createContext, useContext, useState } from 'react';
import { DownloadItem, StreamingVideo } from '@/types/theme';

interface DownloadContextType {
  downloads: DownloadItem[];
  streamingVideos: StreamingVideo[];
  addDownload: (item: Omit<DownloadItem, 'id' | 'progress' | 'status'>) => void;
  updateDownloadProgress: (id: string, progress: number, status: DownloadItem['status']) => void;
  removeDownload: (id: string) => void;
  clearCompleted: () => void;
}

const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export function DownloadProvider({ children }: { children: React.ReactNode }) {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [streamingVideos] = useState<StreamingVideo[]>([
    {
      id: '1',
      title: 'Sample Video 1',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '0:30',
      quality: '720p',
      size: '1.2 MB'
    },
    {
      id: '2',
      title: 'Sample Video 2',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '1:00',
      quality: '1080p',
      size: '2.5 MB'
    },
    {
      id: '3',
      title: 'Sample Video 3',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
      thumbnail: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '2:30',
      quality: '4K',
      size: '5.8 MB'
    }
  ]);

  const addDownload = (item: Omit<DownloadItem, 'id' | 'progress' | 'status'>) => {
    const newDownload: DownloadItem = {
      ...item,
      id: Date.now().toString(),
      progress: 0,
      status: 'pending'
    };
    setDownloads(prev => [newDownload, ...prev]);
  };

  const updateDownloadProgress = (id: string, progress: number, status: DownloadItem['status']) => {
    setDownloads(prev => prev.map(item => 
      item.id === id 
        ? { ...item, progress, status, downloadedAt: status === 'completed' ? new Date() : item.downloadedAt }
        : item
    ));
  };

  const removeDownload = (id: string) => {
    setDownloads(prev => prev.filter(item => item.id !== id));
  };

  const clearCompleted = () => {
    setDownloads(prev => prev.filter(item => item.status !== 'completed'));
  };

  return (
    <DownloadContext.Provider
      value={{
        downloads,
        streamingVideos,
        addDownload,
        updateDownloadProgress,
        removeDownload,
        clearCompleted
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
}

export const useDownload = () => {
  const context = useContext(DownloadContext);
  if (context === undefined) {
    throw new Error('useDownload must be used within a DownloadProvider');
  }
  return context;
};