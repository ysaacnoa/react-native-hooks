import { render, fireEvent } from '@testing-library/react-native';
import { Item } from '../../../components/atoms/item';

// Mock simple de iconos para los tests
const MockIcon = () => <></>;

describe('Item', () => {
  it('renders title correctly', () => {
    const { getByTestId } = render(
      <Item title="Seguridad" testID="settings-item" />
    );

    expect(getByTestId('settings-item.title')).toHaveTextContent('Seguridad');
  });

  it('renders caption when provided', () => {
    const { getByTestId } = render(
      <Item title="Servicio" caption="375 Fill × 44 Hug" />
    );

    expect(getByTestId('item.caption')).toHaveTextContent('375 Fill × 44 Hug');
  });

  it('renders left icon when provided', () => {
    const { getByTestId } = render(
      <Item title="Perfil" iconLeft={<MockIcon />} testID="profile-item" />
    );

    expect(getByTestId('profile-item.icon-left')).toBeOnTheScreen();
  });

  it('renders right icon when provided', () => {
    const { getByTestId } = render(
      <Item
        title="Notificaciones"
        iconRight={<MockIcon />}
        testID="notif-item"
      />
    );

    expect(getByTestId('notif-item.icon-right')).toBeOnTheScreen();
  });

  it('calls onPress when tapped', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Item title="Cerrar sesión" onPress={onPressMock} />
    );

    fireEvent.press(getByTestId('item'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not render caption or icons when not provided', () => {
    const { queryByTestId } = render(<Item title="Solo título" />);

    expect(queryByTestId('item.caption')).toBeNull();
    expect(queryByTestId('item.icon-left')).toBeNull();
    expect(queryByTestId('item.icon-right')).toBeNull();
  });
});
