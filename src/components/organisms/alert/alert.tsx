import type { ReactNode } from 'react';
import { Button } from '../../atoms/button';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

interface AlertModalProps {
  isVisible: boolean;
  icon: ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  onClose: () => void;
}

export const AlertModal = ({
  isVisible,
  icon,
  title,
  description,
  buttonText = 'Aceptar',
  onClose,
}: AlertModalProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {icon}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <Button label={buttonText} onPress={onClose} variant="filled" />
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
