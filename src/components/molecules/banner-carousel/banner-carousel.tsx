import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { theme } from 'react-native-hooks';
import { Banner } from '../../atoms/banner';

interface BannerData {
  id: string;
  image: string;
  url: string;
}

interface BannerCarouselProps {
  banners?: BannerData[];
  showIndicators?: boolean;
}

export function BannerCarousel({
  banners,
  showIndicators = true,
}: BannerCarouselProps) {
  const scrollViewRef = React.useRef<any>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  if (!banners || banners.length === 0) {
    return null;
  }

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / 400);
    setActiveIndex(currentIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={32}
      >
        {banners.map((banner) => (
          <Banner key={banner.id} image={banner.image} url={banner.url} />
        ))}
      </ScrollView>

      {showIndicators && (
        <View style={styles.indicatorContainer}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                activeIndex === index && styles.indicatorActive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.border,
  },
  indicatorActive: {
    backgroundColor: theme.colors.primary,
    width: 24,
  },
});
