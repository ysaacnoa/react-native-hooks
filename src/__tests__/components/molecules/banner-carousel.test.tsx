import { render, fireEvent } from '@testing-library/react-native';
import { BannerCarousel } from '../../../components/molecules/banner-carousel';

describe('BannerCarousel', () => {
  const banners = [
    { id: '1', image: 'img1', url: 'url1' },
    { id: '2', image: 'img2', url: 'url2' },
    { id: '3', image: 'img3', url: 'url3' },
  ];

  const baseId = 'banner-carousel';

  it('renderiza todos los banners', () => {
    const { getByTestId } = render(<BannerCarousel banners={banners} />);

    banners.forEach((banner) => {
      const bannerContainer = getByTestId(`${baseId}-banner-${banner.id}`);
      expect(bannerContainer).toBeTruthy();
    });
  });

  it('renderiza el ScrollView horizontal', () => {
    const { getByTestId } = render(<BannerCarousel banners={banners} />);
    const scrollView = getByTestId(`${baseId}-scrollview`);
    expect(scrollView).toBeTruthy();
  });

  it('simula scroll horizontal', () => {
    const { getByTestId } = render(<BannerCarousel banners={banners} />);
    const scrollView = getByTestId(`${baseId}-scrollview`);

    fireEvent.scroll(scrollView, {
      nativeEvent: {
        contentOffset: { x: 320, y: 0 },
        contentSize: { width: 1000, height: 200 },
        layoutMeasurement: { width: 300, height: 200 },
      },
    });

    expect(scrollView).toBeTruthy();
  });

  it('no renderiza nada si banners es undefined o vacío', () => {
    const { queryByTestId } = render(<BannerCarousel />);
    expect(queryByTestId('banner-carousel-container')).toBeNull();

    const { queryByTestId: queryEmpty } = render(
      <BannerCarousel banners={[]} />
    );
    expect(queryEmpty('banner-carousel-container')).toBeNull();
  });

  it('aplica baseId correctamente en testID', () => {
    const { getByTestId } = render(
      <BannerCarousel
        banners={[{ id: '1', image: 'img', url: 'url' }]}
        testID="my-carousel"
      />
    );
    expect(getByTestId('my-carousel-container')).toBeTruthy();
    expect(getByTestId('my-carousel-scrollview')).toBeTruthy();
    expect(getByTestId('my-carousel-banner-1')).toBeTruthy();
  });
});
