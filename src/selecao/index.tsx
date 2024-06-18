import { RouteProp } from "@react-navigation/native";
import { collection, doc, getDocs, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../config/firebase-config";
import { HeaderProject } from "../components/header";
import React, { useState, Component, useEffect } from "react";
import { View, Text, Image, Pressable, SafeAreaView, ScrollView, TextInput, ImageBackground, Modal, Button, Alert, } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "../components/list/style";
import bg from './../../assets/images/background.png'

export interface selecaoprops {
    navigation: any;
}



export function criacao( projetoID: any, id: string ) {
    const projectDoc = doc(firestore, "forms", id)
    setDoc(projectDoc, {
        nome: 'new',
        projetoID: projetoID

    });
};

const projects : any = []
const unsubscribe = onSnapshot(collection(firestore, 'projetos'), (querySnapshot) => {
    projects.length = 0;
    querySnapshot.forEach((doc) => {
        projects.push(doc.data());
    });
})

export function criacaoProj( nome: string, projectID: string ) {
    const projectDoc = doc(firestore, "projetos", projectID)
    setDoc(projectDoc, {
        nome: nome,
        id: projectID
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












export default function Selecao( props: selecaoprops){
    const projectID: string = makeid();
    const id: string = makeid()
    const [ nome, setNome ] = useState("");

    

    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>
        <SafeAreaView style={styles.projeto}>
            <HeaderProject/>
            <ScrollView keyboardDismissMode="on-drag" style={styles.formPoint}>
                <View style={{marginTop: 200}}>
            <Text style={styles.texto}>Nome do projeto:</Text>
            <View>
                <TextInput style={styles.nome} onChangeText={(nome) => setNome(nome)} placeholder="Nome do projeto" placeholderTextColor={'#fff'} />
            </View>
            <Pressable onPressIn={() => criacaoProj(nome, projectID)} onPress={() => props.navigation.navigate("Main")}>
                <View style={styles.botao}>
                    <Text style={styles.textoB}>Criar Projeto</Text>
                </View>
            </Pressable>  
            </View>   

            </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    )
}