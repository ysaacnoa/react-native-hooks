import { type ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../../theme';
import { withOpacity } from '../../../shared/opacity';

interface CardProps {
  title: string;
  description: string;
  iconChild: ReactNode;
  onPress: () => void;
  testID?: string;
}

export function Card({
  title,
  description,
  iconChild,
  onPress,
  testID,
}: CardProps) {
  const baseId = testID ?? 'card';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      testID={`${baseId}-touchable`}
    >
      <View style={styles.iconCircle} testID={`${baseId}-icon`}>
        {iconChild}
      </View>
      <Text style={styles.title} testID={`${baseId}-title`}>
        {title}
      </Text>
      <Text style={styles.description} testID={`${baseId}-description`}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: withOpacity(theme.colors.primary, 0.2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});
