import { useState } from 'react';
import {
  type TextInputProps,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import type { ReactNode } from 'react';
import { InputWrapper } from './input-wrapper';
import { InputBase } from './input-base';
import { theme } from '../../../theme';

interface InputTextProps extends TextInputProps {
  error?: boolean;
  clearable?: boolean;
  password?: boolean;
  iconPasswordShow?: ReactNode;
  iconPasswordHide?: ReactNode;
  iconClear?: ReactNode;
  testID?: string;
}

export const InputText = ({
  error,
  clearable,
  password,
  value,
  onChangeText,
  iconPasswordShow,
  iconPasswordHide,
  iconClear,
  testID,
  ...props
}: InputTextProps) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const baseId = testID ?? 'input-text';

  const handleClear = () => {
    onChangeText?.('');
  };

  const defaultShow = <Text style={style.defaultPassword}>Show</Text>;
  const defaultHide = <Text style={style.defaultPassword}>Hide</Text>;
  const defaultClear = <Text style={style.defaultClear}>×</Text>;

  const passwordToggle = password && (
    <TouchableOpacity
      testID={`${baseId}-toggle-password`}
      onPress={() => setShowPassword(!showPassword)}
      style={{ paddingHorizontal: theme.spacing.sm }}
      accessibilityRole="button"
      accessibilityLabel={
        showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
      }
    >
      {showPassword
        ? iconPasswordHide ?? defaultHide
        : iconPasswordShow ?? defaultShow}
    </TouchableOpacity>
  );

  const clearButton = clearable && value && (
    <TouchableOpacity
      testID={`${baseId}-clear`}
      onPress={handleClear}
      style={{ paddingHorizontal: theme.spacing.sm }}
      accessibilityRole="button"
      accessibilityLabel="Limpiar campo"
    >
      {iconClear ?? defaultClear}
    </TouchableOpacity>
  );

  const handleFocus = (e: any) => {
    setFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setFocused(false);
    props.onBlur?.(e);
  };

  return (
    <InputWrapper
      testID={baseId}
      focused={focused}
      error={error}
      right={
        <>
          {passwordToggle}
          {clearButton}
        </>
      }
    >
      <InputBase
        {...props}
        secureTextEntry={password && !showPassword}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </InputWrapper>
  );
};

const style = StyleSheet.create({
  defaultPassword: {
    fontSize: 16,
    color: '#666666',
  },
  defaultClear: {
    fontSize: 20,
    color: '#666666',
  },
});
