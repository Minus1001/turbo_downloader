import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { DownloadProvider } from '@/contexts/DownloadContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <DownloadProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </DownloadProvider>
    </ThemeProvider>
  );
}