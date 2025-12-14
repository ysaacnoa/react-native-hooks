import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from '../../../components/organisms/card';

describe('Card', () => {
  const title = 'Card Title';
  const description = 'Card Description';
  const iconChild = <Text>🔥</Text>;
  const onPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente todos los elementos', () => {
    const { getByTestId, getByText } = render(
      <Card
        title={title}
        description={description}
        iconChild={iconChild}
        onPress={onPress}
      />
    );

    expect(getByTestId('card-touchable')).toBeTruthy();
    expect(getByTestId('card-icon')).toBeTruthy();
    expect(getByTestId('card-title').props.children).toBe(title);
    expect(getByTestId('card-description').props.children).toBe(description);
    expect(getByText('🔥')).toBeTruthy();
  });

  it('llama a onPress cuando se toca el card', () => {
    const { getByTestId } = render(
      <Card
        title={title}
        description={description}
        iconChild={iconChild}
        onPress={onPress}
      />
    );

    fireEvent.press(getByTestId('card-touchable'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
