import { render, fireEvent } from '@testing-library/react-native';
import { Banner } from '../../../components/atoms/banner/banner';
import { Linking } from 'react-native';

jest.spyOn(Linking, 'openURL').mockImplementation(jest.fn());

describe('Banner', () => {
  const image = 'https://example.com/banner.png';
  const url = 'https://example.com';

  it('renderiza la imagen con la uri correcta', () => {
    const { getByTestId } = render(<Banner image={image} url={url} />);

    const imageComponent = getByTestId('banner-image');

    expect(imageComponent.props.source).toEqual({ uri: image });
  });

  it('abre la URL al presionar el banner', () => {
    const { getByTestId } = render(<Banner image={image} url={url} />);

    fireEvent.press(getByTestId('banner-touchable'));

    expect(Linking.openURL).toHaveBeenCalledWith(url);
  });
});
