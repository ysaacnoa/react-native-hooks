import { useState } from 'react';
import { type TextInputProps, TouchableOpacity, Text } from 'react-native';
import { InputWrapper } from './input-wrapper';
import { InputBase } from './input-base';
import { theme } from '../../../theme';

interface InputTextProps extends TextInputProps {
  error?: boolean;
  clearable?: boolean;
  password?: boolean;
}

export const InputText = ({
  error,
  clearable,
  password,
  value,
  onChangeText,
  ...props
}: InputTextProps) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClear = () => {
    onChangeText?.('');
  };

  return (
    <InputWrapper
      focused={focused}
      error={error}
      right={
        <>
          {password && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ paddingHorizontal: theme.spacing.sm }}
            >
              <Text>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          )}
          {clearable && value ? (
            <TouchableOpacity
              onPress={handleClear}
              style={{ paddingHorizontal: theme.spacing.sm }}
            >
              <Text>❌</Text>
            </TouchableOpacity>
          ) : null}
        </>
      }
    >
      <InputBase
        {...props}
        secureTextEntry={password && !showPassword}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </InputWrapper>
  );
};
