import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { ExternalLink } from 'lucide-react-native';

interface AdBannerProps {
  size?: 'small' | 'medium' | 'large';
  style?: any;
}

export function AdBanner({ size = 'medium', style }: AdBannerProps) {
  const { currentTheme } = useTheme();

  const getAdStyles = () => {
    switch (size) {
      case 'small':
        return { height: 50, fontSize: 12 };
      case 'large':
        return { height: 120, fontSize: 16 };
      default:
        return { height: 80, fontSize: 14 };
    }
  };

  const adStyles = getAdStyles();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: currentTheme.colors.card,
          borderColor: currentTheme.colors.border,
          height: adStyles.height
        },
        style
      ]}
      onPress={() => {
        // Handle ad click - implement your ad network integration here
        console.log('Ad clicked');
      }}
    >
      <View style={styles.content}>
        <ExternalLink 
          size={20} 
          color={currentTheme.colors.primary} 
        />
        <Text 
          style={[
            styles.text,
            { 
              color: currentTheme.colors.textSecondary,
              fontSize: adStyles.fontSize
            }
          ]}
        >
          Advertisement Space
        </Text>
      </View>
      <Text 
        style={[
          styles.label,
          { 
            color: currentTheme.colors.textSecondary,
            fontSize: 10
          }
        ]}
      >
        Ad
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  text: {
    fontWeight: '500'
  },
  label: {
    position: 'absolute',
    top: 4,
    right: 6,
    fontWeight: 'bold'
  }
});