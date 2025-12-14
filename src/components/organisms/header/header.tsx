import type { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../../theme';

interface HeaderProps {
  title?: string;
  iconChild?: ReactNode;
  iconBackChild?: ReactNode;
  paddingTop?: number;
  canGoBack?: boolean;
  onBackPress?: () => void;
  testID?: string;
}

export function Header({
  title,
  iconChild,
  iconBackChild,
  paddingTop = 0,
  canGoBack = false,
  onBackPress,
  testID,
}: HeaderProps) {
  const baseId = testID ?? 'header';

  return (
    <View
      style={[styles.container, { paddingTop }]}
      testID={`${baseId}-container`}
    >
      {canGoBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          activeOpacity={0.7}
          testID={`${baseId}-back-button`}
        >
          {iconBackChild || (
            <Text style={styles.backIcon} testID={`${baseId}-back-icon`}>
              ←
            </Text>
          )}
        </TouchableOpacity>
      )}
      {iconChild && !canGoBack && (
        <View style={styles.icon} testID={`${baseId}-icon`}>
          {iconChild}
        </View>
      )}
      <Text
        style={[styles.title, canGoBack && styles.titleWithBack]}
        testID={`${baseId}-title`}
      >
        {title || ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  icon: {
    marginRight: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.title.fontWeight,
    flex: 1,
  },
  titleWithBack: {
    marginLeft: theme.spacing.sm,
  },
});
