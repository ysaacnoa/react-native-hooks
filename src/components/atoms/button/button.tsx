import {
  Text,
  TouchableOpacity,
  StyleSheet,
  type GestureResponderEvent,
  View,
} from 'react-native';
import { theme } from '../../../theme';
import type { TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  iconChild?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: 'filled' | 'contrast' | 'success' | 'danger';
  disabled?: boolean;
  fit?: boolean;
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
  success: {
    backgroundColor: theme.colors.success,
    textColor: theme.colors.white,
  },
  danger: {
    backgroundColor: theme.colors.danger,
    textColor: theme.colors.white,
  },
} as const;

export const Button = ({
  label,
  iconChild,
  onPress,
  disabled = false,
  variant = 'filled',
  fit = false,
  testID,
  ...rest
}: ButtonProps) => {
  const variantStyle = buttonVariants[variant];
  const hasIcon = !!iconChild;
  const hasLabel = !!label;

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        { backgroundColor: variantStyle.backgroundColor },
        disabled && styles.disabled,
        fit && styles.fit,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      testID={testID ?? 'button-touchable'}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      {...rest}
    >
      <View style={[styles.content, hasIcon && hasLabel && styles.row]}>
        {hasIcon && iconChild}
        {hasLabel && (
          <Text
            style={[
              styles.labelBase,
              { color: variantStyle.textColor },
              hasIcon && hasLabel ? styles.spacingIcon : null,
            ]}
          >
            {label}
          </Text>
        )}
      </View>
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
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacingIcon: {
    marginLeft: theme.spacing.sm,
  },
  labelBase: {
    fontSize: theme.typography.label.fontSize,
    fontWeight: theme.typography.label.fontWeight,
  },
  disabled: {
    opacity: 0.5,
  },
  fit: {
    width: undefined,
  },
});
