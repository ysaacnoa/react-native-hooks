import { render } from '@testing-library/react-native';
import { BubbleMessage } from '../../../components/atoms/bubble-message';

describe('BubbleMessage', () => {
  it('renders correctly with variant "me"', () => {
    const { getByTestId } = render(
      <BubbleMessage variant="me" testID="my-bubble">
        Hola mundo
      </BubbleMessage>
    );

    const bubble = getByTestId('my-bubble');
    const text = getByTestId('my-bubble.text');

    expect(bubble).toHaveStyle({ alignSelf: 'flex-end' });
    expect(text).toHaveTextContent('Hola mundo');
  });

  it('renders correctly with variant "reminder"', () => {
    const { getByTestId } = render(
      <BubbleMessage variant="reminder">Respuesta del bot</BubbleMessage>
    );

    const bubble = getByTestId('bubble-message');
    const text = getByTestId('bubble-message.text');

    expect(bubble).toHaveStyle({ alignSelf: 'flex-start' });
    expect(text).toHaveTextContent('Respuesta del bot');
  });
});
