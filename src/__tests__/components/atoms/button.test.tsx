import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../../components/atoms/button';
import { theme } from '../../../theme';
import { Text } from 'react-native';

describe('Button', () => {
  it('renderiza el label correctamente', () => {
    const { getByText } = render(<Button label="Aceptar" />);
    expect(getByText('Aceptar')).toBeTruthy();
  });

  it('aplica estilos según variant filled (por defecto)', () => {
    const { getByRole, getByText } = render(<Button label="Filled" />);
    const button = getByRole('button');
    const label = getByText('Filled');

    expect(button).toHaveStyle({ backgroundColor: theme.colors.primary });
    expect(label).toHaveStyle({ color: theme.colors.white });
  });

  it('aplica estilos según variant contrast', () => {
    const { getByRole, getByText } = render(
      <Button label="Contrast" variant="contrast" />
    );
    const button = getByRole('button');
    const label = getByText('Contrast');

    expect(button).toHaveStyle({ backgroundColor: theme.colors.white });
    expect(label).toHaveStyle({ color: theme.colors.primary });
  });

  it('se deshabilita correctamente', () => {
    const { getByRole } = render(<Button label="Disabled" disabled />);
    const button = getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveStyle({ opacity: 0.5 });
  });

  it('llama onPress cuando se presiona', () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <Button label="Press me" onPress={onPressMock} />
    );
    fireEvent.press(getByRole('button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('no llama onPress si está disabled', () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <Button label="Disabled Press" onPress={onPressMock} disabled />
    );
    fireEvent.press(getByRole('button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('aplica estilos variant success', () => {
    const { getByRole, getByText } = render(
      <Button label="Success" variant="success" />
    );

    expect(getByRole('button')).toHaveStyle({
      backgroundColor: theme.colors.success,
    });

    expect(getByText('Success')).toHaveStyle({
      color: theme.colors.white,
    });
  });

  it('aplica estilos variant danger', () => {
    const { getByRole } = render(<Button label="Danger" variant="danger" />);

    expect(getByRole('button')).toHaveStyle({
      backgroundColor: theme.colors.danger,
    });
  });

  it('renderiza icono y label correctamente', () => {
    const IconMock = <Text testID="icon">🔥</Text>;

    const { getByTestId, getByText } = render(
      <Button label="Icon Button" iconChild={IconMock} />
    );

    expect(getByTestId('icon')).toBeTruthy();
    expect(getByText('Icon Button')).toBeTruthy();
  });

  it('expone correctamente propiedades de accesibilidad', () => {
    const { getByRole } = render(<Button label="Accesible" />);

    const button = getByRole('button');

    expect(button.props.accessibilityRole).toBe('button');
    expect(button.props.accessibilityLabel).toBe('Accesible');
  });

  it('marca accessibilityState.disabled cuando está disabled', () => {
    const { getByRole } = render(<Button label="Disabled" disabled />);

    expect(getByRole('button').props.accessibilityState).toEqual({
      disabled: true,
    });
  });

  it('usa testID por defecto', () => {
    const { getByTestId } = render(<Button label="Default ID" />);
    expect(getByTestId('button-touchable')).toBeTruthy();
  });

  it('usa testID personalizado', () => {
    const { getByTestId } = render(
      <Button label="Custom ID" testID="my-button" />
    );
    expect(getByTestId('my-button')).toBeTruthy();
  });
});
