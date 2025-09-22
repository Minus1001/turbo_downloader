import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useDownload } from '@/contexts/DownloadContext';
import { Trash2, Download, CircleCheck as CheckCircle, Circle as XCircle, Clock } from 'lucide-react-native';
import { DownloadItem as DownloadItemType } from '@/types/theme';

interface DownloadItemProps {
  item: DownloadItemType;
}

export function DownloadItem({ item }: DownloadItemProps) {
  const { currentTheme } = useTheme();
  const { removeDownload } = useDownload();

  const getStatusIcon = () => {
    switch (item.status) {
      case 'completed':
        return <CheckCircle size={20} color={currentTheme.colors.success} />;
      case 'downloading':
        return <Download size={20} color={currentTheme.colors.primary} />;
      case 'error':
        return <XCircle size={20} color={currentTheme.colors.error} />;
      default:
        return <Clock size={20} color={currentTheme.colors.textSecondary} />;
    }
  };

  const getStatusText = () => {
    switch (item.status) {
      case 'completed':
        return 'Completed';
      case 'downloading':
        return `${item.progress}%`;
      case 'error':
        return 'Failed';
      default:
        return 'Pending';
    }
  };

  return (
    <View 
      style={[
        styles.container,
        { 
          backgroundColor: currentTheme.colors.card,
          borderColor: currentTheme.colors.border
        }
      ]}
    >
      <Image 
        source={{ uri: item.thumbnail }}
        style={styles.thumbnail}
      />
      
      <View style={styles.content}>
        <Text 
          style={[styles.title, { color: currentTheme.colors.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        
        <View style={styles.details}>
          <Text style={[styles.platform, { color: currentTheme.colors.primary }]}>
            {item.platform.toUpperCase()}
          </Text>
          <Text style={[styles.size, { color: currentTheme.colors.textSecondary }]}>
            {item.size}
          </Text>
        </View>

        {item.status === 'downloading' && (
          <View style={styles.progressContainer}>
            <View 
              style={[
                styles.progressBar,
                { backgroundColor: currentTheme.colors.border }
              ]}
            >
              <View 
                style={[
                  styles.progressFill,
                  { 
                    backgroundColor: currentTheme.colors.primary,
                    width: `${item.progress}%`
                  }
                ]}
              />
            </View>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <View style={styles.status}>
          {getStatusIcon()}
          <Text 
            style={[
              styles.statusText,
              { color: currentTheme.colors.textSecondary }
            ]}
          >
            {getStatusText()}
          </Text>
        </View>
        
        <TouchableOpacity
          onPress={() => removeDownload(item.id)}
          style={[styles.deleteButton, { backgroundColor: currentTheme.colors.error + '20' }]}
        >
          <Trash2 size={16} color={currentTheme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  platform: {
    fontSize: 12,
    fontWeight: '700'
  },
  size: {
    fontSize: 12
  },
  progressContainer: {
    marginTop: 4
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: 2
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  status: {
    alignItems: 'center',
    marginBottom: 8
  },
  statusText: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: '500'
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8
  }
});