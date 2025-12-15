import { render, fireEvent, screen } from '@testing-library/react-native';
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente con label', () => {
    render(
      <Dropdown
        label="Mi label"
        value="1"
        options={options}
        onChange={onChange}
      />
    );
    expect(screen.getByText('Mi label')).toBeTruthy();
    expect(screen.getByText('Opción 1')).toBeTruthy();
  });

  it('NO renderiza label cuando no se pasa', () => {
    render(<Dropdown value="1" options={options} onChange={onChange} />);
    expect(screen.queryByTestId('dropdown-label')).toBeNull();
  });

  it('muestra "Seleccionar" cuando value no coincide con ninguna opción', () => {
    render(<Dropdown value="99" options={options} onChange={onChange} />);
    expect(screen.getByTestId('dropdown-value')).toHaveTextContent(
      'Seleccionar'
    );
  });

  it('muestra "Seleccionar" cuando value es vacío o no existe', () => {
    render(<Dropdown value="" options={options} onChange={onChange} />);
    expect(screen.getByTestId('dropdown-value')).toHaveTextContent(
      'Seleccionar'
    );

    // @ts-ignore - probamos caso extremo
    render(
      <Dropdown value={null as any} options={options} onChange={onChange} />
    );
    expect(screen.getByTestId('dropdown-value')).toHaveTextContent(
      'Seleccionar'
    );
  });

  it('abre el modal al presionar el trigger', () => {
    render(<Dropdown value="1" options={options} onChange={onChange} />);
    expect(screen.queryByTestId('dropdown-modal')).toBeNull();

    fireEvent.press(screen.getByTestId('dropdown-trigger'));
    expect(screen.getByTestId('dropdown-modal')).toBeTruthy();
    expect(screen.getByText('Opción 2')).toBeTruthy();
  });

  it('cierra el modal al presionar el overlay', () => {
    render(<Dropdown value="1" options={options} onChange={onChange} />);

    fireEvent.press(screen.getByTestId('dropdown-trigger'));
    expect(screen.getByTestId('dropdown-modal')).toBeTruthy();

    fireEvent.press(screen.getByTestId('dropdown-overlay'));
    expect(screen.queryByTestId('dropdown-modal')).toBeNull();
  });

  it('selecciona una opción, llama onChange y cierra el modal', () => {
    let selectedValue = '1';
    const handleChange = jest.fn((val: string) => {
      selectedValue = val;
    });

    const { rerender } = render(
      <Dropdown
        value={selectedValue}
        options={options}
        onChange={handleChange}
      />
    );

    fireEvent.press(screen.getByTestId('dropdown-trigger'));
    fireEvent.press(screen.getByTestId('dropdown-option-3'));

    expect(handleChange).toHaveBeenCalledWith('3');
    expect(screen.queryByTestId('dropdown-modal')).toBeNull();

    // Actualizamos el render con el nuevo valor
    rerender(
      <Dropdown
        value={selectedValue}
        options={options}
        onChange={handleChange}
      />
    );

    expect(screen.getByTestId('dropdown-value')).toHaveTextContent('Opción 3');
  });
  it('aplica estilo selected a la opción actualmente seleccionada', () => {
    render(<Dropdown value="2" options={options} onChange={onChange} />);

    fireEvent.press(screen.getByTestId('dropdown-trigger'));

    const selectedOption = screen.getByTestId('dropdown-option-2');

    // Buscamos el Text dentro de la opción
    const textElement = selectedOption.children[0] as any;
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontWeight: '700',
          color: expect.any(String),
        }),
      ])
    );
  });

  it('renderiza lista vacía cuando options está vacío', () => {
    render(<Dropdown value="1" options={[]} onChange={onChange} />);

    fireEvent.press(screen.getByTestId('dropdown-trigger'));
    expect(screen.getByTestId('dropdown-modal')).toBeTruthy();

    // FlatList con data vacío renderiza nada → no hay opciones
    expect(screen.queryByTestId(/dropdown-option-/)).toBeNull();
  });

  it('mantiene accesibilidad y testIDs personalizados', () => {
    render(
      <Dropdown
        label="Custom"
        value="1"
        options={options}
        onChange={onChange}
        testID="custom-dropdown"
      />
    );

    expect(screen.getByTestId('custom-dropdown-label')).toBeTruthy();
    expect(screen.getByTestId('custom-dropdown-trigger')).toBeTruthy();
    expect(screen.getByTestId('custom-dropdown-value')).toBeTruthy();

    fireEvent.press(screen.getByTestId('custom-dropdown-trigger'));
    expect(screen.getByTestId('custom-dropdown-option-1')).toBeTruthy();
  });
});
