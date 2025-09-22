import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Play, Pause, Volume2, Maximize, RotateCcw, Download } from 'lucide-react-native';
import { StreamingVideo } from '@/types/theme';

interface VideoPlayerProps {
  video: StreamingVideo;
  onDownload: (video: StreamingVideo) => void;
}

const { width: screenWidth } = Dimensions.get('window');

export function VideoPlayer({ video, onDownload }: VideoPlayerProps) {
  const { currentTheme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you would control the video player here
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Video Container */}
      <View 
        style={[
          styles.videoContainer,
          { backgroundColor: currentTheme.colors.surface }
        ]}
      >
        <TouchableOpacity
          style={styles.videoTouchable}
          onPress={() => setShowControls(!showControls)}
        >
          {/* Video would render here - using placeholder */}
          <View style={styles.videoPlaceholder}>
            <Text style={[styles.placeholderText, { color: currentTheme.colors.text }]}>
              📹 Video Player
            </Text>
            <Text style={[styles.videoTitle, { color: currentTheme.colors.textSecondary }]}>
              {video.title}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Video Controls Overlay */}
        {showControls && (
          <View style={styles.controlsOverlay}>
            <View style={styles.topControls}>
              <Text style={[styles.qualityBadge, { backgroundColor: currentTheme.colors.primary }]}>
                {video.quality}
              </Text>
              <TouchableOpacity
                onPress={() => onDownload(video)}
                style={[styles.downloadButton, { backgroundColor: currentTheme.colors.success }]}
              >
                <Download size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.centerControls}>
              <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
                {isPlaying ? (
                  <Pause size={48} color="#FFFFFF" />
                ) : (
                  <Play size={48} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.bottomControls}>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill,
                      { 
                        backgroundColor: currentTheme.colors.primary,
                        width: '30%' // Placeholder progress
                      }
                    ]}
                  />
                </View>
                <Text style={styles.timeText}>
                  {formatTime(currentTime)} / {video.duration}
                </Text>
              </View>

              <View style={styles.controlButtons}>
                <TouchableOpacity style={styles.controlButton}>
                  <RotateCcw size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <Volume2 size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <Maximize size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Video Info */}
      <View style={[styles.videoInfo, { backgroundColor: currentTheme.colors.card }]}>
        <Text style={[styles.title, { color: currentTheme.colors.text }]}>
          {video.title}
        </Text>
        <View style={styles.videoDetails}>
          <Text style={[styles.detail, { color: currentTheme.colors.textSecondary }]}>
            Quality: {video.quality}
          </Text>
          <Text style={[styles.detail, { color: currentTheme.colors.textSecondary }]}>
            Size: {video.size}
          </Text>
          <Text style={[styles.detail, { color: currentTheme.colors.textSecondary }]}>
            Duration: {video.duration}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  videoContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative'
  },
  videoTouchable: {
    flex: 1
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  placeholderText: {
    fontSize: 24,
    marginBottom: 8
  },
  videoTitle: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 16
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between'
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12
  },
  qualityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600'
  },
  downloadButton: {
    padding: 8,
    borderRadius: 6
  },
  centerControls: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 40,
    padding: 16
  },
  bottomControls: {
    padding: 12
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginRight: 8
  },
  progressFill: {
    height: '100%',
    borderRadius: 2
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 12,
    minWidth: 80,
    textAlign: 'right'
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16
  },
  controlButton: {
    padding: 4
  },
  videoInfo: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  videoDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detail: {
    fontSize: 12
  }
});