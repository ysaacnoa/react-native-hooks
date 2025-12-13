import {
  Text,
  TouchableOpacity,
  StyleSheet,
  type GestureResponderEvent,
} from 'react-native';
import { theme } from '../../../theme';

interface ButtonProps {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant: 'filled' | 'contrast';
  disabled?: boolean;
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
