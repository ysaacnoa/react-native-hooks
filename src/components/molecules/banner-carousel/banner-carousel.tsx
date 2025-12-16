import {
  FlatList,
  View,
  Dimensions,
  StyleSheet,
  type ImageSourcePropType,
  type ImageErrorEvent,
  type ImageLoadEvent,
} from 'react-native';

import { theme } from '../../../theme';
import { Banner } from '../../atoms/banner';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ITEM_WIDTH = SCREEN_WIDTH * 0.85;
const SIDE_SPACING = (SCREEN_WIDTH - ITEM_WIDTH) / 2;
const ITEM_SPACING = theme.spacing.lg;

export interface CarouselItem {
  id: string | number;
  remoteUrl?: string;
  localSource?: ImageSourcePropType;
  url: string;
  defaultSource?: ImageSourcePropType;
}

interface CarouselProps {
  data: CarouselItem[];
  onItemError?: (itemId: string | number, error: ImageErrorEvent) => void;
  onItemLoad?: (itemId: string | number, event: ImageLoadEvent) => void;
  testID?: string;
}

export function Carousel({
  data,
  onItemError,
  onItemLoad,
  testID,
}: CarouselProps) {
  if (!data || data.length === 0) {
    return null;
  }

  const renderItem = ({ item }: { item: CarouselItem }) => {
    const handleError = (error: ImageErrorEvent) => {
      onItemError?.(item.id, error);
    };

    const handleLoad = (event: ImageLoadEvent) => {
      onItemLoad?.(item.id, event);
    };

    return (
      <View style={styles.itemContainer}>
        <Banner
          remoteUrl={item.remoteUrl}
          localSource={item.localSource}
          url={item.url}
          defaultSource={item.defaultSource}
          onError={handleError}
          onLoad={handleLoad}
          testID={`carousel-item-${item.id}`}
        />
      </View>
    );
  };

  const renderItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH + ITEM_SPACING}
      snapToAlignment="center"
      decelerationRate="fast"
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={renderItemSeparator}
      testID={testID ?? 'carousel'}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingRight: SIDE_SPACING,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
  },
  separator: {
    width: ITEM_SPACING,
  },
});
