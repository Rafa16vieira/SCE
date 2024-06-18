import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, ImageBackground, SafeAreaView, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { firebaseConfig } from '../config/firebase-config'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase-config'; 

const LoginScreen = ({ navigation }: any) => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const handleLogin = async () => {
        //setIsLoading(true);
        // Supondo que 'login' e 'senha' sejam obtidos de campos de entrada do usuário
        const email = `${login}@example.com`;
        const password = senha;
    
        // Validação de entrada
        if (!login || !senha) {
            Alert.alert('Erro', 'Por favor, insira email e senha.');
            return;
        }
    
        try {
            // Login com email e senha usando a Autenticação Firebase
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    // Navegar para a tela 'Main' após login bem-sucedido
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
                            Alert.alert('Login Falhou', 'O email já está em uso.');
                            break;
                        default:
                            Alert.alert('Login Falhou', 'Ocorreu um erro inesperado. Tente novamente mais tarde.');
                    }
                });
        } catch (e) {

        }
        setIsLoading(false);
    };

    return (
        <ImageBackground style={{flex: 1}} source={require('../../assets/images/background.png')}>
        <SafeAreaView style={styles.containerMain}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}} >
            
                <View style={[styles.container]}>
                    <Image source={require('../../assets/images/imagem_2024-06-08_142437650-removebg-preview.png')} style={{height: 150, objectFit: 'contain',  alignSelf: 'center', marginBottom: 10}}/>
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
                    
                    <Pressable onPress={handleLogin} disabled={isLoading}>
                        <View style={[styles.botao, { opacity: isLoading ? 0.3 : 1}]} >
                            <Text style={styles.texto}>Login</Text>
                        </View>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Registro')}>
                        <View style={styles.botao}>
                            <Text style={styles.texto}>Criar Conta</Text>
                        </View>
                    </Pressable>

                </View>
            
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
        backgroundColor: '#3d6647',
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
