import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { withOpacity } from '../../../shared/opacity';

export interface TileProps {
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const formatAmount = (amount: number, type: 'income' | 'expense') =>
  `${type === 'income' ? '+' : '-'} S/.${Math.abs(amount).toFixed(2)}`;

const getColors = (type: 'income' | 'expense') => {
  if (type === 'income') {
    return {
      text: theme.colors.success,
      background: withOpacity(theme.colors.success, 0.15),
    };
  } else {
    return {
      text: theme.colors.danger,
      background: withOpacity(theme.colors.danger, 0.15),
    };
  }
};

export const Tile = ({
  description,
  amount,
  date,
  type,
  category,
}: TileProps) => {
  const colors = getColors(type);

  return (
    <View style={styles.container}>
      <View style={styles.column1}>
        <Text
          style={[
            styles.category,
            { color: colors.text, backgroundColor: colors.background },
          ]}
        >
          {category}
        </Text>
      </View>

      <View style={styles.column2}>
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
        <Text style={styles.date}>{formatDate(date)}</Text>
      </View>

      <View style={styles.column3}>
        <Text style={[styles.amount, { color: colors.text }]}>
          {formatAmount(amount, type)}
        </Text>
      </View>
    </View>
  );
};

/* ------------------------------
  🧱 STYLES
------------------------------- */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  column1: { justifyContent: 'center' },
  category: {
    fontSize: theme.typography.label.fontSize,
    fontWeight: theme.typography.label.fontWeight,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs / 2,
    borderRadius: theme.radius.sm,
  },
  column2: { justifyContent: 'center', flexShrink: 1 },
  description: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    color: theme.colors.black,
    marginBottom: theme.spacing.xs,
  },
  date: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textMuted,
  },
  column3: { justifyContent: 'center', marginLeft: 'auto' },
  amount: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
  },
});
