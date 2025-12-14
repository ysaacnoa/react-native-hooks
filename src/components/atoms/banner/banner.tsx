import { TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { theme } from '../../../theme';

interface BannerProps {
  image: string;
  url: string;
  testID?: string;
}

export function Banner({ image, url, testID }: BannerProps) {
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      style={styles.bannerWrapper}
      onPress={handlePress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel="Banner"
      testID={testID ?? 'banner-touchable'}
    >
      <Image
        source={{ uri: image }}
        style={styles.bannerImage}
        resizeMode="cover"
        accessibilityRole="image"
        accessibilityLabel="Banner image"
        testID="banner-image"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bannerWrapper: {
    width: 400,
    height: 200,
    marginHorizontal: theme.spacing.sm,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.lg,
  },
});
