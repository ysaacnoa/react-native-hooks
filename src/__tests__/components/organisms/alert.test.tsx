import { render, fireEvent } from '@testing-library/react-native';

import { Text } from 'react-native';
import { AlertModal } from '../../../components/organisms/alert';

describe('AlertModal', () => {
  const icon = <Text>🔥</Text>;
  const title = 'Título de alerta';
  const description = 'Este es el mensaje de la alerta';
  const buttonText = 'Cerrar';
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente con todos los elementos', () => {
    const { getByTestId, getByText } = render(
      <AlertModal
        isVisible
        iconChild={icon}
        title={title}
        description={description}
        buttonText={buttonText}
        onClose={onClose}
      />
    );

    expect(getByTestId('alert-modal')).toBeTruthy();
    expect(getByTestId('alert-modal-overlay')).toBeTruthy();
    expect(getByTestId('alert-modal-container')).toBeTruthy();
    expect(getByText('🔥')).toBeTruthy();
    expect(getByTestId('alert-modal-title').props.children).toBe(title);
    expect(getByTestId('alert-modal-description').props.children).toBe(
      description
    );
    expect(getByTestId('alert-modal-button')).toBeTruthy();
    expect(getByText(buttonText)).toBeTruthy();
  });

  it('llama a onClose al presionar el botón', () => {
    const { getByTestId } = render(
      <AlertModal
        isVisible
        iconChild={icon}
        title={title}
        description={description}
        buttonText={buttonText}
        onClose={onClose}
      />
    );

    fireEvent.press(getByTestId('alert-modal-button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
