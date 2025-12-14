import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { theme } from '../../../theme';
import { StyleSheet } from 'react-native';

export interface DropdownOption {
  label: string;
  value: string;
}

interface SimpleDropdownProps {
  label?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  testID?: string;
}

export const Dropdown = ({
  label,
  value,
  options,
  onChange,
  testID,
}: SimpleDropdownProps) => {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ?? 'Seleccionar';

  return (
    <>
      {label && (
        <Text
          style={styles.title}
          testID={testID ? `${testID}-label` : 'dropdown-label'}
        >
          {label}
        </Text>
      )}

      <Pressable
        style={styles.trigger}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        testID={testID ? `${testID}-trigger` : 'dropdown-trigger'} // ID del trigger
      >
        <Text
          style={styles.value}
          testID={testID ? `${testID}-value` : 'dropdown-value'}
        >
          {selectedLabel}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        testID={testID ? `${testID}-modal` : 'dropdown-modal'} // ID del modal
      >
        <TouchableWithoutFeedback
          onPress={() => setOpen(false)}
          testID={testID ? `${testID}-overlay` : 'dropdown-overlay'} // ID del overlay
        >
          <View style={styles.overlay}>
            <View style={styles.dropdown}>
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.option}
                    onPress={() => {
                      onChange(item.value);
                      setOpen(false);
                    }}
                    testID={
                      testID
                        ? `${testID}-option-${item.value}`
                        : `dropdown-option-${item.value}`
                    } // ID de cada opción
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item.value === value && styles.selected,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: theme.spacing.xs,
    fontSize: theme.typography.label.fontSize,
    fontWeight: '600',
    color: theme.colors.text,
  },
  trigger: {
    minWidth: 92,
    height: 36,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    gap: theme.spacing.sm,
  },
  value: {
    fontSize: theme.typography.label.fontSize,
    color: theme.colors.text,
  },
  arrow: {
    fontSize: 12,
    opacity: 0.6,
    color: theme.colors.textMuted,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  dropdown: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
  },
  option: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  optionText: {
    fontSize: theme.typography.label.fontSize,
    color: theme.colors.text,
  },
  selected: {
    fontWeight: '700',
    color: theme.colors.primary,
  },
});
