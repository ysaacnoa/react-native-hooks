import { TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { theme } from 'react-native-hooks';

interface BannerProps {
  image: string;
  url: string;
}

export function Banner({ image, url }: BannerProps) {
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      style={styles.bannerWrapper}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: image }}
        style={styles.bannerImage}
        resizeMode="cover"
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
