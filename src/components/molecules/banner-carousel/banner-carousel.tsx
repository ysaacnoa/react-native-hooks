import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { Banner } from '../../atoms/banner';

interface BannerData {
  id: string;
  image: string;
  url: string;
}

interface BannerSliderProps {
  banners?: BannerData[];
  testID?: string;
}

const SCREEN_WIDTH = Dimensions.get('window')?.width ?? 360; // fallback en Jest
const BANNER_WIDTH = SCREEN_WIDTH * 0.75;
const BANNER_MARGIN = 12;

export function BannerCarousel({ banners, testID }: BannerSliderProps) {
  if (!banners || banners.length === 0) return null;

  const baseId = testID ?? 'banner-carousel';

  return (
    <View style={styles.container} testID={`${baseId}-container`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={BANNER_WIDTH + BANNER_MARGIN * 2}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: BANNER_MARGIN }}
        testID={`${baseId}-scrollview`}
      >
        {banners.map((banner) => (
          <View
            key={banner.id}
            style={{ width: BANNER_WIDTH, marginHorizontal: BANNER_MARGIN }}
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
});
