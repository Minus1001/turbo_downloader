import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useDownload } from '@/contexts/DownloadContext';
import { PlatformCard } from '@/components/PlatformCard';
import { AdBanner } from '@/components/AdBanner';
import { Link2, Download } from 'lucide-react-native';

export default function DownloadTab() {
  const { currentTheme } = useTheme();
  const { addDownload } = useDownload();
  const [url, setUrl] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'whatsapp' | 'tiktok' | 'instagram' | 'youtube' | null>(null);

  const platforms: Array<'whatsapp' | 'tiktok' | 'instagram' | 'youtube'> = ['whatsapp', 'tiktok', 'instagram', 'youtube'];

  const handleDownload = () => {
    if (!url.trim()) {
      Alert.alert('Error', 'Please enter a valid URL');
      return;
    }

    if (!selectedPlatform) {
      Alert.alert('Error', 'Please select a platform');
      return;
    }

    // Simulate adding a download
    const mockDownload = {
      url: url.trim(),
      title: `${selectedPlatform} content - ${Date.now()}`,
      platform: selectedPlatform,
      type: 'video' as const,
      size: '2.5 MB',
      thumbnail: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=200'
    };

    addDownload(mockDownload);
    setUrl('');
    setSelectedPlatform(null);
    Alert.alert('Success', 'Download added to queue!');
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.colors.text }]}>
            Media Downloader
          </Text>
          <Text style={[styles.subtitle, { color: currentTheme.colors.textSecondary }]}>
            Download videos and images from your favorite platforms
          </Text>
        </View>

        {/* Ad Banner */}
        <AdBanner size="medium" />

        {/* URL Input */}
        <View style={styles.inputSection}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>
            Enter URL
          </Text>
          <View style={styles.inputContainer}>
            <Link2 size={20} color={currentTheme.colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: currentTheme.colors.surface,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text
                }
              ]}
              placeholder="Paste your link here..."
              placeholderTextColor={currentTheme.colors.textSecondary}
              value={url}
              onChangeText={setUrl}
              multiline
            />
          </View>
        </View>

        {/* Platform Selection */}
        <View style={styles.platformSection}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>
            Select Platform
          </Text>
          {platforms.map((platform) => (
            <PlatformCard
              key={platform}
              platform={platform}
              onPress={() => setSelectedPlatform(platform)}
            />
          ))}
        </View>

        {/* Download Button */}
        <TouchableOpacity
          style={[
            styles.downloadButton,
            {
              backgroundColor: currentTheme.colors.primary,
              opacity: url.trim() && selectedPlatform ? 1 : 0.5
            }
          ]}
          onPress={handleDownload}
          disabled={!url.trim() || !selectedPlatform}
        >
          <Download size={20} color="#FFFFFF" />
          <Text style={styles.downloadButtonText}>
            Start Download
          </Text>
        </TouchableOpacity>

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
  inputSection: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  inputIcon: {
    marginTop: 16,
    marginRight: 12
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top'
  },
  platformSection: {
    marginBottom: 24
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  },
  spacer: {
    height: 20
  }
});