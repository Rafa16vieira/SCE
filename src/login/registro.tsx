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
    const [ isLoading, setIsLoading ] = useState(false);
    

    const handleRegister = async () => {
        setIsLoading(true);
        const email = `${login}@example.com`;
    
        await createUserWithEmailAndPassword(auth, email, senha)
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
                // Lidar com erros comuns
                switch (error.code) {
                    case 'auth/user-not-found':
                        Alert.alert('Login Falhou', 'Usuário não encontrado.');
                        break;
                    case 'auth/wrong-password':
                        Alert.alert('Login Falhou', 'Senha incorreta.');
                        break;
                    case 'auth/invalid-email':
                        Alert.alert('Login Falhou', 'Email inválido.');
                        break;
                    case 'auth/user-disabled':
                        Alert.alert('Login Falhou', 'Usuário desativado.');
                        break;
                    case 'auth/network-request-failed':
                        Alert.alert('Login Falhou', 'Conexão instável. Verifique sua conexão de internet.');
                        break;
                    case 'auth/email-already-in-use':
                        Alert.alert('Login Falhou', 'O usuário já está em uso.');
                        break;
                    default:
                        Alert.alert('Login Falhou', 'Ocorreu um erro inesperado. Tente novamente mais tarde.');
                }
            });
            setIsLoading(false);
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
            <Pressable onPress={handleRegister} disabled={isLoading}>
                <View style={[styles.botao, { opacity: isLoading ? 0.3 : 1}]}>
                    <Text style={styles.texto}>Cadastrar</Text>
                </View>
            </Pressable>

            <Pressable onPress={() => navigation.goBack() }>
                <View style={[styles.botao]}>
                    <Text style={styles.texto}>Voltar</Text>
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
