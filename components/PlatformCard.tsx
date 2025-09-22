import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface PlatformCardProps {
  platform: 'whatsapp' | 'tiktok' | 'instagram' | 'youtube';
  onPress: () => void;
}

const platformInfo = {
  whatsapp: {
    name: 'WhatsApp',
    icon: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    description: 'Download status videos and images'
  },
  tiktok: {
    name: 'TikTok',
    icon: 'https://images.pexels.com/photos/5797999/pexels-photo-5797999.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    description: 'Save your favorite TikTok videos'
  },
  instagram: {
    name: 'Instagram',
    icon: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    description: 'Download posts, stories, and reels'
  },
  youtube: {
    name: 'YouTube',
    icon: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    description: 'Save videos for offline viewing'
  }
};

export function PlatformCard({ platform, onPress }: PlatformCardProps) {
  const { currentTheme } = useTheme();
  const info = platformInfo[platform];

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.colors.card,
          borderColor: currentTheme.colors.border
        }
      ]}
      onPress={onPress}
    >
      <Image 
        source={{ uri: info.icon }}
        style={styles.icon}
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: currentTheme.colors.text }]}>
          {info.name}
        </Text>
        <Text style={[styles.description, { color: currentTheme.colors.textSecondary }]}>
          {info.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4
  },
  description: {
    fontSize: 14,
    lineHeight: 20
  }
});