import { render } from '@testing-library/react-native';
import { InputWrapper } from '../../../../components/atoms/input/input-wrapper';
import { theme } from '../../../../theme';
import { Text } from 'react-native';

describe('InputWrapper', () => {
  it('renderiza children y aplica estilos base', () => {
    const { root } = render(
      <InputWrapper>
        <Text>Contenido</Text>
      </InputWrapper>
    );

    // root es directamente el <View> del wrapper
    expect(root).toHaveStyle({
      borderColor: theme.colors.gray,
      backgroundColor: theme.colors.surface,
    });
  });

  it('aplica borde primary cuando focused', () => {
    const { root } = render(<InputWrapper focused>Child</InputWrapper>);

    expect(root).toHaveStyle({ borderColor: theme.colors.primary });
  });

  it('aplica borde danger cuando error', () => {
    const { root } = render(<InputWrapper error>Child</InputWrapper>);

    expect(root).toHaveStyle({ borderColor: theme.colors.danger });
  });

  it('renderiza slots left y right', () => {
    const { getByText } = render(
      <InputWrapper left={<Text>Left</Text>} right={<Text>Right</Text>}>
        <Text>Input</Text>
      </InputWrapper>
    );

    expect(getByText('Left')).toBeTruthy();
    expect(getByText('Right')).toBeTruthy();
    expect(getByText('Input')).toBeTruthy();
  });
});
