import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useDownload } from '@/contexts/DownloadContext';
import { DownloadItem } from '@/components/DownloadItem';
import { AdBanner } from '@/components/AdBanner';
import { Trash2, RefreshCw } from 'lucide-react-native';

export default function DownloadsTab() {
  const { currentTheme } = useTheme();
  const { downloads, clearCompleted } = useDownload();

  const completedCount = downloads.filter(d => d.status === 'completed').length;
  const downloadingCount = downloads.filter(d => d.status === 'downloading').length;
  const pendingCount = downloads.filter(d => d.status === 'pending').length;

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.colors.text }]}>
            Download Manager
          </Text>
          <Text style={[styles.subtitle, { color: currentTheme.colors.textSecondary }]}>
            Track and manage your downloads
          </Text>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: currentTheme.colors.card }]}>
            <Text style={[styles.statNumber, { color: currentTheme.colors.success }]}>
              {completedCount}
            </Text>
            <Text style={[styles.statLabel, { color: currentTheme.colors.textSecondary }]}>
              Completed
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: currentTheme.colors.card }]}>
            <Text style={[styles.statNumber, { color: currentTheme.colors.primary }]}>
              {downloadingCount}
            </Text>
            <Text style={[styles.statLabel, { color: currentTheme.colors.textSecondary }]}>
              Downloading
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: currentTheme.colors.card }]}>
            <Text style={[styles.statNumber, { color: currentTheme.colors.warning }]}>
              {pendingCount}
            </Text>
            <Text style={[styles.statLabel, { color: currentTheme.colors.textSecondary }]}>
              Pending
            </Text>
          </View>
        </View>

        {/* Ad Banner */}
        <AdBanner size="medium" />

        {/* Actions */}
        {completedCount > 0 && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: currentTheme.colors.error + '20' }
              ]}
              onPress={clearCompleted}
            >
              <Trash2 size={16} color={currentTheme.colors.error} />
              <Text style={[styles.actionButtonText, { color: currentTheme.colors.error }]}>
                Clear Completed
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Downloads List */}
        <View style={styles.downloadsSection}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>
            Downloads ({downloads.length})
          </Text>
          
          {downloads.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: currentTheme.colors.textSecondary }]}>
                No downloads yet. Start downloading from the Download tab!
              </Text>
            </View>
          ) : (
            downloads.map((item) => (
              <DownloadItem key={item.id} item={item} />
            ))
          )}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500'
  },
  actionsContainer: {
    marginBottom: 24
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600'
  },
  downloadsSection: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16
  },
  emptyState: {
    padding: 32,
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24
  },
  spacer: {
    height: 20
  }
});