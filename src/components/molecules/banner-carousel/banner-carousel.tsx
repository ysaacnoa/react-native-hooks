// BannerCarousel.tsx
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { Banner } from '../../atoms/banner';

interface BannerData {
  id: string;
  image: string;
  url: string;
}

interface BannerCarouselProps {
  banners?: BannerData[];
  testID?: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const BANNER_WIDTH = SCREEN_WIDTH * 0.8; // 80% del ancho
const BANNER_HEIGHT = BANNER_WIDTH * 0.56; // Ratio 16:9 → 180px aprox en iPhone
// const BANNER_HEIGHT = BANNER_WIDTH * 0.5;       // Ratio 2:1 → más cuadrado
// const BANNER_HEIGHT = BANNER_WIDTH * 0.65;      // Ratio más alto si quieres

const ITEM_SPACING = theme.spacing.lg;

export function BannerCarousel({ banners = [], testID }: BannerCarouselProps) {
  if (banners.length === 0) return null;

  const baseId = testID ?? 'banner-carousel';
  const snapInterval = BANNER_WIDTH + ITEM_SPACING;

  return (
    <View style={styles.container} testID={`${baseId}-container`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={snapInterval}
        decelerationRate="fast"
        contentContainerStyle={styles.contentContainer}
        testID={`${baseId}-scrollview`}
      >
        {banners.map((banner, index) => (
          <View
            key={banner.id}
            style={[
              styles.bannerWrapper,
              index < banners.length - 1 && { marginRight: ITEM_SPACING },
            ]}
            testID={`${baseId}-banner-${banner.id}`}
          >
            <Banner image={banner.image} url={banner.url} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
  },
  contentContainer: {
    paddingHorizontal: 0,
  },
  bannerWrapper: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
  },
});
