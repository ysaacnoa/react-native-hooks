import { render } from '@testing-library/react-native';
import { Tile } from '../../../components/organisms/tile';

describe('Tile', () => {
  const props = {
    category: 'Comida',
    description: 'Almuerzo en restaurante',
    date: '2025-12-14',
    amount: 45.5,
    type: 'expense' as const,
  };

  it('renderiza correctamente todos los elementos', () => {
    const { getByTestId } = render(<Tile {...props} />);

    expect(getByTestId('tile-container')).toBeTruthy();
    expect(getByTestId('tile-category').props.children).toBe(props.category);
    expect(getByTestId('tile-description').props.children).toBe(
      props.description
    );

    const formattedDate = new Date(props.date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    expect(getByTestId('tile-date').props.children).toBe(formattedDate);

    const formattedAmount = `- S/.${Math.abs(props.amount).toFixed(2)}`;
    expect(getByTestId('tile-amount').props.children).toBe(formattedAmount);
  });
});
