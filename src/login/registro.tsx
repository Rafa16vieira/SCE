import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, Pressable, Image } from 'react-native';
import { auth } from '../config/firebase-config';
import { firestore } from '../config/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = ({ navigation }: any) => {
    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const handleRegister = () => {
        const email = `${login}@example.com`;
    
        createUserWithEmailAndPassword(auth, email, senha)
            .then(userCredential => {
                const user = userCredential.user;
                return setDoc(doc(firestore, 'users', user.uid), {
                nome,
                login,
                });
            })
            .then(() => {
                navigation.navigate('Main');
            })
            .catch(error => {
                Alert.alert('Registration Failed', error.message);
            });
        }

    return (
        <ImageBackground style={{flex: 1}} source={require('../../assets/images/background.png')}>
        <View style={styles.container}>
        <Image source={require('../../assets/images/imagem_2024-06-08_142437650-removebg-preview.png')} style={{width: '56%', height: '20%', alignSelf: 'center', marginBottom: 0}}/>
            <Text style={styles.title}>Registrar</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                placeholderTextColor={'#1f3324'}
            />
            <TextInput
                style={styles.input}
                placeholder="Login"
                value={login}
                onChangeText={setLogin}
                placeholderTextColor={'#1f3324'}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                placeholderTextColor={'#1f3324'}
            />
            <Pressable onPress={handleRegister}>
                <View style={styles.botao}>
                    <Text style={styles.texto}>Cadastrar</Text>
                </View>
            </Pressable>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#1f3324',
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

export default RegisterScreen;
