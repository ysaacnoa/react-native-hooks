// components/atoms/banner.tsx
import { TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { radius } from '../../../theme';

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
      accessibilityLabel="Banner promocional"
      testID={testID ?? 'banner-touchable'}
    >
      <Image
        source={{ uri: image }}
        style={styles.bannerImage}
        resizeMode="cover"
        testID="banner-image"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bannerWrapper: {
    // Eliminamos width, height y marginHorizontal
    // Ahora ocupa todo el espacio del padre
    borderRadius: radius.lg,
    overflow: 'hidden', // Necesario para borderRadius en Android
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    // Sin borderRadius aquí (ya lo tiene el wrapper)
  },
});
