import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useDownload } from '@/contexts/DownloadContext';
import { VideoPlayer } from '@/components/VideoPlayer';
import { AdBanner } from '@/components/AdBanner';
import { StreamingVideo } from '@/types/theme';

export default function StreamingTab() {
  const { currentTheme } = useTheme();
  const { streamingVideos, addDownload } = useDownload();

  const handleDownloadVideo = (video: StreamingVideo) => {
    const downloadItem = {
      url: video.url,
      title: video.title,
      platform: 'youtube' as const,
      type: 'video' as const,
      size: video.size,
      thumbnail: video.thumbnail
    };
    addDownload(downloadItem);
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.colors.text }]}>
            Cloud Streaming
          </Text>
          <Text style={[styles.subtitle, { color: currentTheme.colors.textSecondary }]}>
            Stream and download videos from the cloud
          </Text>
        </View>

        {/* Ad Banner */}
        <AdBanner size="medium" />

        {/* Video List */}
        <View style={styles.videosSection}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>
            Available Videos
          </Text>
          
          {streamingVideos.map((video) => (
            <VideoPlayer
              key={video.id}
              video={video}
              onDownload={handleDownloadVideo}
            />
          ))}
        </View>

        {/* Ad Banner */}
        <AdBanner size="large" />

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    padding: 16
  },
  header: {
    marginBottom: 24,
    paddingTop: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24
  },
  videosSection: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16
  },
  spacer: {
    height: 20
  }
});