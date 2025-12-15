// components/BubbleMessage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../../theme';
import { withOpacity } from '../../../shared/opacity';

type BubbleMessageProps = {
  children: React.ReactNode;
  variant: 'me' | 'reminder';
  testID?: string;
};

export function BubbleMessage({
  children,
  variant,
  testID,
}: BubbleMessageProps) {
  const isMe = variant === 'me';

  return (
    <View
      testID={testID || 'bubble-message'}
      style={[styles.container, isMe ? styles.me : styles.reminder]}
    >
      <Text
        testID={testID ? `${testID}.text` : 'bubble-message.text'}
        style={[typography.body, isMe ? styles.textMe : styles.textReminder]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.xl,
    marginVertical: spacing.xs,
  },
  me: {
    alignSelf: 'flex-end',
    backgroundColor: withOpacity(colors.primary, 0.15),
  },
  reminder: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textMe: {
    color: colors.text,
  },
  textReminder: {
    color: colors.text,
  },
});
