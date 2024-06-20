import { Image, Text, StyleSheet, Platform, Pressable, Keyboard, StatusBar } from 'react-native';
import Header from '@/src/components/header';
import { Header1 } from '@/src/components/header';
import { Navegacao } from '@/src/components/navigation';
import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { RootSiblingParent } from 'react-native-root-siblings';


export default function HomeScreen() {

  return (
    <RootSiblingParent>
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <StatusBar hidden={true} />
      <Navegacao/>
    </Pressable>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c7ffd8',
    paddingTop: 0,
  },
})
