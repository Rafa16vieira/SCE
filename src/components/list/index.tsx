import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, FlatList, Image, ScrollView, Pressable, Modal, Alert, TextInput } from 'react-native';
import { FieldPath, QuerySnapshot, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import { RouteProp } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from "@react-navigation/native";
import bg from './../../../assets/images/background.png'




let tst: any = []

export interface AliviarDorscreenProps {
    navigation: any;
}

const getData = async () => {
    tst = []
    const querySnapShot = await getDocs(collection(db, 'projetos'));
    querySnapShot.forEach((doc) => {
        tst.push(doc.data())
    })
}

function makeid() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 200) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export function criacao( nome: string ) {
    const projectDoc = doc(db, "projetos", makeid())
    setDoc(projectDoc, {
        nome: nome,
        id: makeid()

    });
};

export default function Projetos(props: AliviarDorscreenProps ) {
    const [ showAlert, setShowAlert ] = useState(false)
    const [ nome, setNome ] = useState("");
    
    
    

    useEffect(() => {
        getData();
        },[])

    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>
        <ScrollView style={styles.formPoint}> 
            
                <View>
                    {tst.map((projeto: any) =>
                        <View key={projeto.nome}>
                        
                            <Text key={projeto.nome} style={styles.texto}>{projeto.nome}</Text>
                            <Pressable key={projeto.id} onPress={() => {props.navigation.navigate("Itens", {id: projeto.id})}}>
                                <View key={projeto.nome}>
                                    <Text style={{backgroundColor:'#1f3324', color: '#fff', padding: 10, borderRadius: 30}} key={projeto.nome}>clique aqui</Text>
                                </View>
                            </Pressable>
                            <View style={styles.line}/>
                                
                        </View>
                            
                        
                    )}
                    <View style={{marginTop: 100, width: '100%', alignSelf: 'baseline'}}>
                        <View style={{marginBottom:30}}>
                        <Button title={'Criar novo'} color='#1f3324' onPress={() => setShowAlert(true)}/>
                        </View>
                        <Button title={"Menu"} color='#1f3324' onPress={() => {props.navigation.navigate("Main")}}/>
                    </View>
                </View>
                <Modal style={{marginTop: 50, backgroundColor: '#c7ffd8', padding: 80, alignContent: 'center', justifyContent: 'center'}} animationType="slide" transparent={false} visible={showAlert} onRequestClose={() => {Alert.alert('Modal has been closed.'); setShowAlert(!showAlert); }}>
                    <View style={{marginTop: 100, width: '100%', alignContent: 'center', justifyContent: 'center'}}>
                    <Text style={styles.text}>Nome:</Text>
                    <TextInput style={styles.nome} onChangeText={(nome) => setNome(nome)} placeholder='Insira o nome do projeto' placeholderTextColor={'#fff'}/>
                    <View style={{width:'80%', alignSelf: 'center', marginBottom: 40}}>
                    <View style={{marginBottom: 30}}>
                    <Button title='Criar' color={'#9be466'} onPress={() => criacao(nome)}/>
                    </View>
                    <Button title='Fechar' color={'rgb(255,0,0)'} onPress={() => setShowAlert(false)}/>
                    </View>
                    </View>
                </Modal>
        </ScrollView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    formPoint: {
        padding: 20, 
        height: '100%'
    },
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    icon: {
        fontSize: 25,
        color: '#5F5F5F'
    },
    text: {
        alignSelf: 'flex-start',
        width: 320,
        marginTop: -5,
        marginVertical: 30,
        left: 34,
        fontSize: 20,
        textAlign: 'center',
        color: '#1f3324',
        fontWeight: 'bold',
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 40
    },
    textButton: {
        fontWeight: 'bold',
    },
    tagText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tagButton: {
        borderRadius: 9,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        marginHorizontal: 30,
        padding: 10,
        alignItems: 'center'
    },
    textInfo: {
        marginVertical: 30,
        width: 310,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F'
    },
    img: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        objectFit: 'contain'
    },
    autor: {
        fontSize: 12,
        alignSelf: 'center',
        marginTop: 10
    },
    posicaoVideo: {
        alignItems: 'center',
        marginVertical: 40
    },
    texto: {
        color: '#1f3324',
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 2
    },
    nome: {
        borderColor: '#646464',
        borderWidth: 1,
        backgroundColor: '#1f3324',
        width: '60%',
        height: 30,
        alignSelf: 'center',
        borderRadius: 8,
        paddingLeft: 4,
        marginRight: 4,
        marginBottom: 10,
        color: '#c7ffd8',
        
    },
    line: {
        backgroundColor: "#152319",
        width: '50%',
        alignSelf: 'center',
        height: 2,
        margin: 5
    },
});