import { View, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import { theme } from '../../../theme';

interface Props {
  children: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  focused?: boolean;
  error?: boolean;
  testID?: string;
}

export const InputWrapper = ({
  children,
  left,
  right,
  focused,
  error,
  testID,
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        focused && styles.focused,
        error && styles.error,
      ]}
      testID={testID ?? 'input-wrapper-container'}
    >
      {left && <View style={styles.slot}>{left}</View>}
      <View style={styles.input}>{children}</View>
      {right && <View style={styles.slot}>{right}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    backgroundColor: theme.colors.surface,
  },
  focused: {
    borderColor: theme.colors.primary,
  },
  error: {
    borderColor: theme.colors.danger,
  },
  slot: {
    marginHorizontal: theme.spacing.xs,
  },
  input: {
    flex: 1,
  },
});
