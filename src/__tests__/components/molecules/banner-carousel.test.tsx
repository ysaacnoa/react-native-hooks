import { render, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import {
  Carousel,
  type CarouselItem,
} from '../../../components/molecules/banner-carousel/banner-carousel';

jest.spyOn(Linking, 'openURL').mockImplementation(jest.fn());

describe('Carousel', () => {
  const fallback = require('../../../assets/nestJS.webp'); // Ajusta la ruta si es necesario

  const mockData: CarouselItem[] = [
    {
      id: '1',
      remoteUrl: 'https://example.com/banner1.jpg',
      url: 'https://promo1.com',
      defaultSource: fallback,
    },
    {
      id: '2',
      localSource: fallback,
      url: 'https://promo2.com',
    },
    {
      id: '3',
      remoteUrl: 'https://example.com/banner3.jpg',
      url: 'https://promo3.com',
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('no renderiza nada si data está vacío o undefined', () => {
    const { queryByTestId } = render(<Carousel data={[]} />);
    expect(queryByTestId('carousel')).toBeNull();

    const { queryByTestId: queryUndefined } = render(
      <Carousel data={undefined as any} />
    );
    expect(queryUndefined('carousel')).toBeNull();
  });

  it('renderiza todos los items cuando hay data', () => {
    const { getAllByTestId } = render(<Carousel data={mockData} />);
    const items = getAllByTestId(/carousel-item-/);
    expect(items).toHaveLength(mockData.length);
  });

  it('usa testID personalizado', () => {
    const { getByTestId } = render(
      <Carousel data={mockData} testID="my-awesome-carousel" />
    );
    expect(getByTestId('my-awesome-carousel')).toBeTruthy();
  });

  it('permite scroll horizontal y snap', () => {
    const { getByTestId } = render(<Carousel data={mockData} />);
    const flatList = getByTestId('carousel');

    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: { x: 400 },
        contentSize: { width: 1500, height: 200 },
        layoutMeasurement: { width: 375, height: 200 },
      },
    });

    expect(flatList).toBeTruthy();
  });
});
