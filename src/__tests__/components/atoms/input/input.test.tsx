import { render, fireEvent, screen } from '@testing-library/react-native';
import { InputText } from '../../../../components/atoms/input/input';
import { act } from 'react';

describe('InputText', () => {
  const defaultProps = {
    placeholder: 'Escribe algo',
    value: '',
    onChangeText: jest.fn(),
    testID: 'input-text',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente el wrapper', () => {
    render(<InputText {...defaultProps} />);
    const wrapper = screen.getByTestId('input-text');
    expect(wrapper).toBeTruthy();
  });

  it('muestra el botón clear cuando clearable=true y hay valor', () => {
    render(<InputText {...defaultProps} clearable value="texto" />);
    expect(screen.getByLabelText('Limpiar campo')).toBeTruthy();
    expect(screen.getByText('×')).toBeTruthy();
  });

  it('no muestra el botón clear cuando no hay valor aunque clearable=true', () => {
    render(<InputText {...defaultProps} clearable value="" />);
    expect(screen.queryByLabelText('Limpiar campo')).toBeNull();
  });

  it('limpia el input al presionar el botón clear', () => {
    const onChangeText = jest.fn();
    render(
      <InputText
        {...defaultProps}
        clearable
        value="texto"
        onChangeText={onChangeText}
      />
    );
    fireEvent.press(screen.getByLabelText('Limpiar campo'));
    expect(onChangeText).toHaveBeenCalledWith('');
  });

  it('togglea la visibilidad de la contraseña al presionar el botón', () => {
    render(<InputText {...defaultProps} password value="secreto" />);
    const input = screen.getByTestId('input-text').findByType('TextInput');
    const toggleButton = screen.getByLabelText('Mostrar contraseña');

    expect(input.props.secureTextEntry).toBe(true);

    fireEvent.press(toggleButton);
    expect(input.props.secureTextEntry).toBe(false);

    fireEvent.press(toggleButton);
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('usa iconos personalizados para show/hide password', () => {
    render(
      <InputText
        {...defaultProps}
        password
        iconPasswordShow={<></>}
        iconPasswordHide={<></>}
      />
    );
  });

  it('muestra ambos botones (password toggle + clear) cuando corresponde', () => {
    render(<InputText {...defaultProps} password clearable value="secreto" />);
    expect(screen.getByLabelText('Mostrar contraseña')).toBeTruthy();
    expect(screen.getByLabelText('Limpiar campo')).toBeTruthy();
  });

  it('pasa props adicionales a InputBase (ej. placeholder)', () => {
    render(<InputText {...defaultProps} placeholder="Mi placeholder" />);
    const input = screen.getByTestId('input-text').findByType('TextInput');
    expect(input.props.placeholder).toBe('Mi placeholder');
  });

  it('maneja focus y blur correctamente', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    render(<InputText {...defaultProps} onFocus={onFocus} onBlur={onBlur} />);

    const wrapper = screen.getByTestId('input-text');
    const input = wrapper.findByType('TextInput');

    act(() => {
      input.props.onFocus?.({});
      input.props.onBlur?.({});
    });

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
