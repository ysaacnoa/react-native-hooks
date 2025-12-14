import { render } from '@testing-library/react-native';
import { Tile } from '../../../components/organisms/tile';
import { theme } from '../../../theme';
import { withOpacity } from '../../../shared/opacity';
import type { TileProps } from '../../../components/organisms/tile/tile';

describe('Tile', () => {
  const props: TileProps = {
    category: 'Comida',
    description: 'Almuerzo en restaurante',
    date: '2025-12-14',
    amount: 45.5,
    type: 'expense',
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

  it('aplica colores correctos para expense', () => {
    const { getByTestId } = render(<Tile {...props} />);
    const categoryText = getByTestId('tile-category');

    expect(categoryText.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: theme.colors.danger,
          backgroundColor: withOpacity(theme.colors.danger, 0.15),
        }),
      ])
    );
  });

  it('aplica colores correctos para income', () => {
    const incomeProps: TileProps = { ...props, type: 'income', amount: 100 };
    const { getByTestId } = render(<Tile {...incomeProps} />);
    const categoryText = getByTestId('tile-category');

    expect(categoryText.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: theme.colors.success,
          backgroundColor: withOpacity(theme.colors.success, 0.15),
        }),
      ])
    );
  });
});
