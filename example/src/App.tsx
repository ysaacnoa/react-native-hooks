import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import {
  getConnectionInfo,
  getDeviceInfo,
  getItem,
  setItem,
  type ConnectionInfo,
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
    return () => {};
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
  return (
    <View style={styles.container}>
      <Text>Result: {JSON.stringify(getDeviceInfo())}</Text>
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
      <Text>{JSON.stringify(connectionInfo)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
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
