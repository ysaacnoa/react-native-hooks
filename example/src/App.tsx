// App.tsx (actualizado con BannerCarousel)
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import {
  BubbleMessage,
  getConnectionInfo,
  getDeviceInfo,
  getItem,
  Item,
  setItem,
  type ConnectionInfo,
  BannerCarousel,
} from 'react-native-hooks';

export default function App() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo | null>(
    null
  );

  useEffect(() => {
    getConnectionInfo().then(setConnectionInfo);
  }, []);

  const handleSave = async () => {
    try {
      await setItem({ key, value });
      setResult(`Saved: ${key}`);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const handleLoad = async () => {
    try {
      const data = await getItem({ key });
      setResult(data ? `Value: ${data}` : 'Not found');
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const exampleBanners = [
    {
      id: '1',
      image: 'https://picsum.photos/800/400?random=1',
      url: 'https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w7680-h4320-rw',
    },
    {
      id: '2',
      image: 'https://picsum.photos/800/400?random=2',
      url: 'https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w7680-h4320-rw',
    },
    {
      id: '3',
      image: 'https://picsum.photos/800/400?random=3',
      url: 'https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w7680-h4320-rw',
    },
    {
      id: '4',
      image: 'https://picsum.photos/800/400?random=4',
      url: 'https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w7680-h4320-rw',
    },
  ];

  return (
    <View style={styles.container}>
      <Text>Device Info: {JSON.stringify(getDeviceInfo())}</Text>
      <Text style={styles.title}>Secure Storage</Text>
      <TextInput
        style={styles.input}
        placeholder="Key"
        value={key}
        onChangeText={setKey}
      />
      <TextInput
        style={styles.input}
        placeholder="Value"
        value={value}
        onChangeText={setValue}
        secureTextEntry
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Load" onPress={handleLoad} />
      <Text style={styles.result}>{result}</Text>
      <Text>Connection: {JSON.stringify(connectionInfo)}</Text>

      <Item title="hola" caption="hola undo denuevo" />
      <BubbleMessage variant="me">
        <Text>Hola mundo (mensaje mío)</Text>
      </BubbleMessage>
      <BubbleMessage variant="reminder">
        <Text>Hola mundo (recordatorio)</Text>
      </BubbleMessage>

      <BannerCarousel banners={exampleBanners} testID="example-carousel" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
});
