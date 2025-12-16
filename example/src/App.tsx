// App.tsx
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import {
  BubbleMessage,
  getConnectionInfo,
  getDeviceInfo,
  getItem,
  setItem,
  type ConnectionInfo,
  Item,
} from 'react-native-hooks';
import { Carousel } from '../../src/components/molecules/banner-carousel/banner-carousel';

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
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
  };

  const handleLoad = async () => {
    try {
      const data = await getItem({ key });
      setResult(data ? `Value: ${data}` : 'Not found');
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
  };

  // === Banners con imágenes locales usando require() directamente ===
  const exampleBanners = [
    {
      id: '1',
      localSource: require('./assets/nestJS.webp'), // ← Ruta real a tu asset
      url: 'https://example.com/promo1',
    },
    {
      id: '2',
      localSource: require('./assets/nestJS.webp'),
      url: 'https://example.com/promo2',
    },
    {
      id: '3',
      localSource: require('./assets/nestJS.webp'),
      url: 'https://example.com/promo3',
    },
    {
      id: '4',
      localSource: require('./assets/nestJS.webp'), // fallback si no tienes 4
      url: 'https://example.com/promo4',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Device Info: {JSON.stringify(getDeviceInfo())}
      </Text>

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

      <Text style={styles.infoText}>
        Connection: {JSON.stringify(connectionInfo)}
      </Text>

      <Item title="hola" caption="hola undo denuevo" />

      <BubbleMessage variant="me">
        <Text>Hola mundo (mensaje mío)</Text>
      </BubbleMessage>
      <BubbleMessage variant="reminder">
        <Text>Hola mundo (recordatorio)</Text>
      </BubbleMessage>

      <View style={styles.carouselContainer}>
        <Carousel data={exampleBanners} testID="example-carousel" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginVertical: 8,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  carouselContainer: {
    width: '100%',
    marginTop: 30,
    height: 200, // Ajusta según el tamaño de tus banners
  },
});
