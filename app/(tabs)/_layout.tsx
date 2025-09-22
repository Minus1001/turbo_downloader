import { Tabs } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { Download, Play, Palette, Settings } from 'lucide-react-native';

export default function TabLayout() {
  const { currentTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: currentTheme.colors.surface,
          borderTopColor: currentTheme.colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8
        },
        tabBarActiveTintColor: currentTheme.colors.primary,
        tabBarInactiveTintColor: currentTheme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500'
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Download',
          tabBarIcon: ({ size, color }) => (
            <Download size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="streaming"
        options={{
          title: 'Stream',
          tabBarIcon: ({ size, color }) => (
            <Play size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="downloads"
        options={{
          title: 'Manager',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="themes"
        options={{
          title: 'Themes',
          tabBarIcon: ({ size, color }) => (
            <Palette size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}