import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { AdBanner } from '@/components/AdBanner';
import { Check } from 'lucide-react-native';

export default function ThemesTab() {
  const { currentTheme, availableThemes, setTheme } = useTheme();

  const groupedThemes = availableThemes.reduce((groups, theme) => {
    const category = theme.id.split('-')[0];
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(theme);
    return groups;
  }, {} as Record<string, typeof availableThemes>);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.colors.text }]}>
            Themes
          </Text>
          <Text style={[styles.subtitle, { color: currentTheme.colors.textSecondary }]}>
            Customize your app appearance
          </Text>
        </View>

        {/* Current Theme Preview */}
        <View style={[styles.currentTheme, { backgroundColor: currentTheme.colors.card }]}>
          <Text style={[styles.currentThemeTitle, { color: currentTheme.colors.text }]}>
            Current Theme
          </Text>
          <Text style={[styles.currentThemeName, { color: currentTheme.colors.primary }]}>
            {currentTheme.name}
          </Text>
          
          {/* Color Preview */}
          <View style={styles.colorPreview}>
            <View style={[styles.colorSwatch, { backgroundColor: currentTheme.colors.primary }]} />
            <View style={[styles.colorSwatch, { backgroundColor: currentTheme.colors.primaryLight }]} />
            <View style={[styles.colorSwatch, { backgroundColor: currentTheme.colors.primaryDark }]} />
            <View style={[styles.colorSwatch, { backgroundColor: currentTheme.colors.accent }]} />
          </View>
        </View>

        {/* Ad Banner */}
        <AdBanner size="medium" />

        {/* Theme Categories */}
        {Object.entries(groupedThemes).map(([category, themes]) => (
          <View key={category} style={styles.categorySection}>
            <Text style={[styles.categoryTitle, { color: currentTheme.colors.text }]}>
              {category.charAt(0).toUpperCase() + category.slice(1)} Themes
            </Text>
            
            <View style={styles.themesGrid}>
              {themes.map((theme) => (
                <TouchableOpacity
                  key={theme.id}
                  style={[
                    styles.themeCard,
                    { 
                      backgroundColor: theme.colors.surface,
                      borderColor: currentTheme.id === theme.id ? currentTheme.colors.primary : theme.colors.border
                    }
                  ]}
                  onPress={() => setTheme(theme.id)}
                >
                  {/* Theme Preview */}
                  <View style={styles.themePreview}>
                    <View style={[styles.previewHeader, { backgroundColor: theme.colors.primary }]} />
                    <View style={[styles.previewBody, { backgroundColor: theme.colors.background }]} />
                  </View>
                  
                  {/* Theme Info */}
                  <View style={styles.themeInfo}>
                    <Text style={[styles.themeName, { color: theme.colors.text }]}>
                      {theme.name}
                    </Text>
                    
                    {/* Color Swatches */}
                    <View style={styles.themeColors}>
                      <View style={[styles.miniSwatch, { backgroundColor: theme.colors.primary }]} />
                      <View style={[styles.miniSwatch, { backgroundColor: theme.colors.primaryLight }]} />
                      <View style={[styles.miniSwatch, { backgroundColor: theme.colors.primaryDark }]} />
                    </View>
                  </View>
                  
                  {/* Selected Indicator */}
                  {currentTheme.id === theme.id && (
                    <View style={[styles.selectedIndicator, { backgroundColor: currentTheme.colors.primary }]}>
                      <Check size={12} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

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
  currentTheme: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center'
  },
  currentThemeTitle: {
    fontSize: 16,
    marginBottom: 4
  },
  currentThemeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  colorPreview: {
    flexDirection: 'row',
    gap: 8
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  categorySection: {
    marginBottom: 32
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16
  },
  themesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  themeCard: {
    width: '47%',
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
    position: 'relative'
  },
  themePreview: {
    height: 80
  },
  previewHeader: {
    height: 24,
    width: '100%'
  },
  previewBody: {
    flex: 1,
    width: '100%'
  },
  themeInfo: {
    padding: 12
  },
  themeName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8
  },
  themeColors: {
    flexDirection: 'row',
    gap: 4
  },
  miniSwatch: {
    width: 16,
    height: 16,
    borderRadius: 8
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spacer: {
    height: 20
  }
});