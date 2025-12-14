import type { ReactNode } from 'react';
import { Button } from '../../atoms/button';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

interface AlertModalProps {
  isVisible: boolean;
  iconChild?: ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  onClose: () => void;
  testID?: string;
}

export const AlertModal = ({
  isVisible,
  iconChild,
  title,
  description,
  buttonText = 'Aceptar',
  onClose,
  testID,
}: AlertModalProps) => {
  const baseId = testID ?? 'alert-modal';

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      testID={baseId}
    >
      <View style={styles.overlay} testID={`${baseId}-overlay`}>
        <View style={styles.container} testID={`${baseId}-container`}>
          {iconChild && iconChild}
          <Text style={styles.title} testID={`${baseId}-title`}>
            {title}
          </Text>
          <Text style={styles.description} testID={`${baseId}-description`}>
            {description}
          </Text>

          <Button
            label={buttonText}
            onPress={onClose}
            variant="filled"
            testID={`${baseId}-button`}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  container: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.title.fontWeight,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  description: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    color: theme.colors.textMuted,
  },
});
