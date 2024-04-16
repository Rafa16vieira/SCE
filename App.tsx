import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from './src/components/header';
import { Header1 } from './src/components/header';
import Navegacao from './src/components/navigation';

export default function App() {
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Navegacao/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    paddingTop: 60,
  },
});
