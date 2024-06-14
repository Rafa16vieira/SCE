import { Image, Text, StyleSheet, Platform, Pressable, Keyboard, StatusBar } from 'react-native';
import Header from '@/src/components/header';
import { Header1 } from '@/src/components/header';
import { Navegacao } from '@/src/components/navigation';
import React from 'react';


export default function HomeScreen() {

  return (
    
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <StatusBar hidden={true} />
      <Navegacao/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c7ffd8',
    paddingTop: 0,
  },
})
