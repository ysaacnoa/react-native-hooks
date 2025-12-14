import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

interface InputBaseProps extends TextInputProps {
  testID?: string;
}

export const InputBase = (props: InputBaseProps) => {
  return (
    <TextInput
      testID={props.testID}
      {...props}
      style={styles.input}
      placeholderTextColor={theme.colors.textMuted}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: theme.typography.label.fontSize,
    paddingVertical: theme.spacing.sm,
    color: theme.colors.text,
  },
});
