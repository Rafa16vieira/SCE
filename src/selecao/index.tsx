import { RouteProp } from "@react-navigation/native";
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { Header1 } from "../components/header";
import React, { useState, Component, useEffect } from "react";
import { View, Text, Image, Pressable, SafeAreaView, ScrollView, TextInput, ImageBackground, Modal, Button, Alert, } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "../components/list/style";
import bg from './../../assets/images/background.png'

export interface selecaoprops {
    navigation: any;
}

let projetos: any = []
let data = []


export function criacao( id: string, projetoID: any ) {
    const projectDoc = doc(db, "forms", id)
    setDoc(projectDoc, {
        nome: 'new',
        projetoID: projetoID

    });
};

export function criacaoProj( nome: string ) {
    const projectDoc = doc(db, "projetos", makeid())
    setDoc(projectDoc, {
        nome: nome,
        id: makeid()

    });
};

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



const getData = async () => {
    projetos = []
    const querySnapShot = await getDocs(collection(db, 'projetos'));
    querySnapShot.forEach((doc) => {
        projetos.push(doc.data())
        
    })
}






export default function Selecao( props: selecaoprops){
    const [ showAlert, setShowAlert ] = useState(false)
    const id: string = makeid();
    const [ nome, setNome ] = useState("");
    
    useEffect(() => {
        getData();
        },[])

    

    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>
        <SafeAreaView style={styles.formPoint}>
            <Header1/>
            <ScrollView keyboardDismissMode="on-drag" style={styles.formPoint}>
            {projetos.map((projeto: any) =>
                        <View key={projeto.nome}>
                        
                            <Text style={styles.texto} key={projeto.nome}>{projeto.nome}</Text>
                            <Pressable key={projeto.id} onPressIn={() => criacao(id, projeto.id)} onPress={() => {props.navigation.navigate("Form1", {id: id})}}>
                                <View key={projeto.nome}>
                                    <Text style={{backgroundColor:'#1f3324', color: '#fff', padding: 10, borderRadius: 30}} key={projeto.nome}>clique aqui</Text>
                                </View>
                            </Pressable>
                            <View style={styles.line}/>
                        </View>
                            
                        
                    )}
                    <View style={{marginBottom:30, marginTop: 30}}>
                        <Button title={'Criar novo'} color='#1f3324' onPress={() => setShowAlert(true)}/>
                        </View>

                    <Modal style={{marginTop: 50, backgroundColor: '#c7ffd8', padding: 80, alignContent: 'center', justifyContent: 'center'}} animationType="slide" transparent={false} visible={showAlert} onRequestClose={() => {Alert.alert('Modal has been closed.'); setShowAlert(!showAlert); }}>
                        <View style={{marginTop: 100, width: '100%', alignContent: 'center', justifyContent: 'center'}}>
                        <Text style={styles.text}>Nome:</Text>
                        <TextInput style={styles.nome} onChangeText={(nome) => setNome(nome)} placeholder='Insira o nome do projeto' placeholderTextColor={'#fff'}/>
                        <View style={{width:'80%', alignSelf: 'center'}}>
                        <View style={{marginBottom: 30}}>
                        <Button title='Criar' color={'#9be466'} onPress={() => criacaoProj(nome)}/>
                        </View>
                        <Button title='Fechar' color={'rgb(255,0,0)'} onPress={() => setShowAlert(false)}/>
                        </View>
                        </View>
                    </Modal>

            </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    )
}