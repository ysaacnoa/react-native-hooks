import { render, fireEvent } from '@testing-library/react-native';
import {
  Dropdown,
  type DropdownOption,
} from '../../../components/molecules/dropdown/dropdown';

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

    // Abrimos el modal
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
});
