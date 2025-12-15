// components/Item.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';
import { colors, spacing, typography } from '../../../theme';

type ItemProps = TouchableOpacityProps & {
  title: string;
  caption?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  testID?: string;
};

export function Item({
  title,
  caption,
  iconLeft,
  iconRight,
  testID,
  ...rest
}: ItemProps) {
  const rootTestID = testID || 'item';

  return (
    <TouchableOpacity
      testID={rootTestID}
      style={styles.container}
      activeOpacity={0.7}
      {...rest}
    >
      <View style={styles.content}>
        {iconLeft && (
          <View testID={`${rootTestID}.icon-left`} style={styles.iconLeft}>
            {iconLeft}
          </View>
        )}

        <View style={styles.textContainer}>
          <Text
            testID={`${rootTestID}.title`}
            style={[typography.body, { color: colors.text }]}
          >
            {title}
          </Text>
          {caption && (
            <Text
              testID={`${rootTestID}.caption`}
              style={[typography.caption, styles.textCaption]}
            >
              {caption}
            </Text>
          )}
        </View>

        {iconRight && (
          <View testID={`${rootTestID}.icon-right`} style={styles.iconRight}>
            {iconRight}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  iconLeft: {
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  textCaption: {
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  iconRight: {
    marginLeft: spacing.md,
  },
});
