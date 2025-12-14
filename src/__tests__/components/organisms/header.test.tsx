import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Header } from '../../../components/organisms/header';

describe('Header', () => {
  const title = 'Página Principal';
  const iconChild = <Text>🔥</Text>;
  const iconBackChild = <Text>←</Text>;
  const onBackPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente con título e icono', () => {
    const { getByTestId, getByText } = render(
      <Header title={title} iconChild={iconChild} />
    );

    expect(getByTestId('header-container')).toBeTruthy();
    expect(getByTestId('header-icon')).toBeTruthy();
    expect(getByTestId('header-title').props.children).toBe(title);
    expect(getByText('🔥')).toBeTruthy();
  });

  it('renderiza correctamente con botón de back y llama onBackPress', () => {
    const { getByTestId, getByText } = render(
      <Header
        title={title}
        canGoBack
        iconBackChild={iconBackChild}
        onBackPress={onBackPress}
      />
    );

    const backButton = getByTestId('header-back-button');
    expect(backButton).toBeTruthy();
    expect(getByText('←')).toBeTruthy();

    fireEvent.press(backButton);
    expect(onBackPress).toHaveBeenCalledTimes(1);
  });
});
