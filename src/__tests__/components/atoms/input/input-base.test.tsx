import { render } from '@testing-library/react-native';
import { InputBase } from '../../../../components/atoms/input/input-base';
import { theme } from '../../../../theme';

describe('InputBase', () => {
  it('renderiza con placeholder y color correcto', () => {
    const { getByPlaceholderText } = render(
      <InputBase placeholder="Escribe aquí" />
    );
    const input = getByPlaceholderText('Escribe aquí');

    expect(input).toBeTruthy();
    expect(input).toHaveStyle({
      flex: 1,
      fontSize: theme.typography.label.fontSize,
      color: theme.colors.text,
    });
    expect(input.props.placeholderTextColor).toBe(theme.colors.textMuted);
  });

  it('pasa props adicionales como value y onChangeText', () => {
    const onChangeTextMock = jest.fn();
    const { getByDisplayValue } = render(
      <InputBase value="Hola" onChangeText={onChangeTextMock} />
    );

    expect(getByDisplayValue('Hola')).toBeTruthy();
  });
});
