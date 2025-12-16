import { render, fireEvent } from '@testing-library/react-native';
import { Banner } from '../../../components/atoms/banner';
import { Linking } from 'react-native';

jest.spyOn(Linking, 'openURL').mockImplementation(jest.fn());

describe('Banner', () => {
  const url = 'https://example.com/promo';
  const remoteUrl = 'https://example.com/remote-banner.jpg';
  const localSource = { uri: 'file://local-banner.png' };
  const defaultSource = { uri: 'file://placeholder.png' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente con remoteUrl', () => {
    const { getByTestId } = render(<Banner remoteUrl={remoteUrl} url={url} />);
    const image = getByTestId('banner-image');
    expect(image.props.source).toEqual({ uri: remoteUrl });
  });

  it('renderiza correctamente con localSource', () => {
    const { getByTestId } = render(
      <Banner localSource={localSource} url={url} />
    );
    const image = getByTestId('banner-image');
    expect(image.props.source).toEqual(localSource);
  });

  it('prioriza remoteUrl sobre localSource si ambos están presentes', () => {
    const { getByTestId } = render(
      <Banner remoteUrl={remoteUrl} localSource={localSource} url={url} />
    );
    const image = getByTestId('banner-image');
    expect(image.props.source).toEqual({ uri: remoteUrl });
  });

  it('pasa defaultSource correctamente', () => {
    const { getByTestId } = render(
      <Banner remoteUrl={remoteUrl} url={url} defaultSource={defaultSource} />
    );
    const image = getByTestId('banner-image');
    expect(image.props.defaultSource).toEqual(defaultSource);
  });

  it('abre la URL al presionar el banner', () => {
    const { getByTestId } = render(<Banner remoteUrl={remoteUrl} url={url} />);
    fireEvent.press(getByTestId('banner-touchable'));
    expect(Linking.openURL).toHaveBeenCalledWith(url);
  });

  it('llama a onError cuando la imagen falla', () => {
    const onErrorMock = jest.fn();
    const { getByTestId } = render(
      <Banner remoteUrl={remoteUrl} url={url} onError={onErrorMock} />
    );

    const image = getByTestId('banner-image');
    fireEvent(image, 'onError'); // ← Forma correcta

    expect(onErrorMock).toHaveBeenCalledTimes(1);
  });

  it('llama a onLoad cuando la imagen carga correctamente', () => {
    const onLoadMock = jest.fn();
    const { getByTestId } = render(
      <Banner remoteUrl={remoteUrl} url={url} onLoad={onLoadMock} />
    );

    const image = getByTestId('banner-image');
    fireEvent(image, 'onLoad'); // ← Forma correcta

    expect(onLoadMock).toHaveBeenCalledTimes(1);
  });

  it('no renderiza nada si no se proporciona remoteUrl ni localSource', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { queryByTestId } = render(<Banner url={url} />);
    expect(queryByTestId('banner-touchable')).toBeNull();
    expect(queryByTestId('banner-image')).toBeNull();
    (console.warn as jest.Mock).mockRestore();
  });

  it('usa testID personalizado correctamente', () => {
    const customId = 'custom-banner';
    const { getByTestId } = render(
      <Banner remoteUrl={remoteUrl} url={url} testID={customId} />
    );

    // El testID se aplica al TouchableOpacity
    expect(getByTestId(`${customId}-touchable`)).toBeTruthy();
    expect(getByTestId('banner-image')).toBeTruthy();
  });
});
