import {
  Text,
  TouchableOpacity,
  StyleSheet,
  type GestureResponderEvent,
} from 'react-native';
import { theme } from '../../../theme';
import type { TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: 'filled' | 'contrast';
  disabled?: boolean;
  testID?: string;
}

const buttonVariants = {
  filled: {
    backgroundColor: theme.colors.primary,
    textColor: theme.colors.white,
  },
  contrast: {
    backgroundColor: theme.colors.white,
    textColor: theme.colors.primary,
  },
} as const;

export const Button = ({
  label,
  onPress,
  disabled = false,
  variant = 'filled',
  testID,
}: ButtonProps) => {
  const variantStyle = buttonVariants[variant];

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        { backgroundColor: variantStyle.backgroundColor },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      testID={testID ?? 'button-touchable'}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
    >
      <Text style={[styles.labelBase, { color: variantStyle.textColor }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
  labelBase: {
    fontSize: theme.typography.label.fontSize,
    fontWeight: theme.typography.label.fontWeight,
  },
  disabled: {
    opacity: 0.5,
  },
});
