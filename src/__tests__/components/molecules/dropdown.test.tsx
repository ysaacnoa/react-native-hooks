import { render, fireEvent, screen } from '@testing-library/react-native';
import {
  Dropdown,
  type DropdownOption,
} from '../../../components/molecules/dropdown/dropdown';
import { Text } from 'react-native';
import { theme } from '../../../theme';

describe('Dropdown', () => {
  const options: DropdownOption[] = [
    { label: 'Opción 1', value: '1' },
    { label: 'Opción 2', value: '2' },
    { label: 'Opción 3', value: '3' },
  ];

  const onChange = jest.fn();

  const defaultProps = {
    label: 'Selecciona algo',
    value: '1',
    options,
    onChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el label si se proporciona', () => {
    const { getByText } = render(<Dropdown {...defaultProps} />);

    expect(getByText('Selecciona algo')).toBeTruthy();
  });

  it('muestra el label de la opción seleccionada', () => {
    const { getByText } = render(<Dropdown {...defaultProps} />);

    expect(getByText('Opción 1')).toBeTruthy();
  });

  it('abre el modal al presionar el trigger', () => {
    const { getByTestId, getByText } = render(<Dropdown {...defaultProps} />);

    fireEvent.press(getByTestId('dropdown-trigger'));

    expect(getByText('Opción 2')).toBeTruthy();
  });

  it('renderiza todas las opciones', () => {
    const { getByTestId } = render(<Dropdown {...defaultProps} />);

    fireEvent.press(getByTestId('dropdown-trigger'));

    options.forEach((opt) => {
      const option = getByTestId(`dropdown-option-${opt.value}`);
      expect(option).toBeTruthy();
    });
  });

  it('llama a onChange y cierra el modal al seleccionar una opción', () => {
    const { getByTestId, queryByText } = render(<Dropdown {...defaultProps} />);

    fireEvent.press(getByTestId('dropdown-trigger'));
    fireEvent.press(getByTestId('dropdown-option-2'));

    expect(onChange).toHaveBeenCalledWith('2');
    expect(queryByText('Opción 3')).toBeNull();
  });

  it('cierra el modal al presionar el overlay', () => {
    const { getByTestId, queryByText } = render(<Dropdown {...defaultProps} />);

    fireEvent.press(getByTestId('dropdown-trigger'));
    fireEvent.press(getByTestId('dropdown-overlay'));

    expect(queryByText('Opción 2')).toBeNull();
  });

  it('muestra el label cuando se pasa', () => {
    render(
      <Dropdown
        label="Mi Dropdown"
        value="1"
        options={options}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByTestId('dropdown-label').props.children).toBe(
      'Mi Dropdown'
    );
  });

  it('aplica estilo selected a la opción seleccionada', () => {
    const { getByTestId } = render(
      <Dropdown value="1" options={options} onChange={() => {}} />
    );

    fireEvent.press(getByTestId('dropdown-trigger'));

    const selectedOptionText =
      getByTestId('dropdown-option-1').findByType(Text);

    expect(selectedOptionText.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ fontWeight: '700' })])
    );
  });

  it('renderiza label y valor seleccionado', () => {
    const { getByTestId } = render(
      <Dropdown label="Test" value="1" options={options} onChange={() => {}} />
    );

    expect(getByTestId('dropdown-label').props.children).toBe('Test');
    expect(getByTestId('dropdown-value').props.children).toBe('Opción 1');
  });

  it('abre y cierra el modal al presionar trigger y overlay', () => {
    const { getByTestId, queryByTestId } = render(
      <Dropdown value="1" options={options} onChange={() => {}} />
    );

    // Modal cerrado inicialmente
    expect(queryByTestId('dropdown-modal')).toBeNull();

    fireEvent.press(getByTestId('dropdown-trigger'));
    expect(getByTestId('dropdown-modal')).toBeTruthy();

    fireEvent.press(getByTestId('dropdown-overlay'));
    expect(queryByTestId('dropdown-modal')).toBeNull();
  });

  it('cambia valor al seleccionar opción y aplica estilo selected', () => {
    let selected = '1';
    const onTextChange = (val: string) => {
      selected = val;
    };

    const { getByTestId } = render(
      <Dropdown value={selected} options={options} onChange={onTextChange} />
    );

    fireEvent.press(getByTestId('dropdown-trigger'));

    fireEvent.press(getByTestId('dropdown-option-2'));

    expect(selected).toBe('2');
  });

  it('aplica estilo selected al valor inicial', () => {
    const { getByTestId } = render(
      <Dropdown value="1" options={options} onChange={() => {}} />
    );

    fireEvent.press(getByTestId('dropdown-trigger'));

    const option1Text = getByTestId('dropdown-option-1').findByType(Text);

    expect(option1Text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontWeight: '700',
          color: theme.colors.primary,
        }),
      ])
    );
  });

  it('renderiza "Seleccionar" si el valor no coincide con options', () => {
    const { getByTestId } = render(
      <Dropdown value="99" options={options} onChange={() => {}} />
    );
    expect(getByTestId('dropdown-value').props.children).toBe('Seleccionar');
  });
});
