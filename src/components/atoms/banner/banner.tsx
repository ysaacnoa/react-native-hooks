import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  type ImageSourcePropType,
  type ImageLoadEvent,
  type ImageErrorEvent,
} from 'react-native';

import { radius } from '../../../theme';

export interface BannerProps {
  remoteUrl?: string;
  localSource?: ImageSourcePropType;
  url: string;
  testID?: string;
  onError?: (error: ImageErrorEvent) => void;
  onLoad?: (event: ImageLoadEvent) => void;
  defaultSource?: ImageSourcePropType;
}

export function Banner({
  remoteUrl,
  localSource,
  url,
  testID,
  onError,
  onLoad,
  defaultSource,
}: BannerProps) {
  const source: ImageSourcePropType | undefined = remoteUrl
    ? { uri: remoteUrl }
    : localSource;

  if (!source) {
    console.warn('Banner: Debes proporcionar remoteUrl o localSource');
    return null;
  }

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
      testID={testID ? `${testID}-touchable` : 'banner-touchable'}
    >
      <Image
        source={source}
        defaultSource={defaultSource}
        style={styles.bannerImage}
        resizeMode="cover"
        onError={onError}
        onLoad={onLoad}
        testID="banner-image"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bannerWrapper: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});
