import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, ImageBackground, SafeAreaView, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { firebaseConfig } from '../config/firebase-config'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase-config'; 

const LoginScreen = ({ navigation }: any) => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);

    const handleLogin = () => {
        const email = `${login}@example.com`;

        signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            navigation.navigate('Main');
        })
        .catch(error => {
            Alert.alert('Login Failed', error.message);
        });
    };

    return (
        <ImageBackground style={{flex: 1}} source={require('../../assets/images/background.png')}>
        <SafeAreaView style={styles.containerMain}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            >
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <Image source={require('../../assets/images/imagem_2024-06-08_142437650-removebg-preview.png')} style={{width: '50%', height: '28%', alignSelf: 'center', marginBottom: 50, marginTop: 80}}/>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Login"
                        placeholderTextColor={'#1f3324'}
                        value={login}
                        onChangeText={setLogin}
                        onFocus={() => scrollViewRef.current?.scrollTo({ y: 50, animated: true })}
                        
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                        placeholderTextColor={'#1f3324'}
                        onFocus={() => scrollViewRef.current?.scrollTo({ y: 150, animated: true })}
                    />
                    
                    <Pressable onPress={handleLogin}>
                        <View style={styles.botao}>
                            <Text style={styles.texto}>Login</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Registro')}>
                        <View style={styles.botao}>
                            <Text style={styles.texto}>Criar Conta</Text>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    containerMain: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: "rgba(255,255,255,0.3)",
    },
    scrollContainer: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#0c7434'
    },
    input: {
        height: 40,
        borderColor: '#0c7434',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
    botao: {
        borderRadius: 100,
        alignSelf: 'center',
        height: 30,
        width: '80%',
        backgroundColor: '#0c7434',
        justifyContent: 'center',
        marginTop: 20
    },
    texto: {
        color: '#fff',
        alignSelf: 'center',
        fontWeight: 'bold'
    }
});

export default LoginScreen;
