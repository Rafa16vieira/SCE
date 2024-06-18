import { doc, getDocs, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../config/firebase-config";
import { HeaderProject } from "../components/header";
import React, { useState, Component, useEffect } from "react";
import { View, Text, Image, Pressable, SafeAreaView, ScrollView, TextInput, ImageBackground, Modal, Button, Alert, ToastAndroid, } from "react-native";

import styles from "../components/list/style";

export interface selecaoprops {
    navigation: any;
}

export default function Selecao( props: selecaoprops){
    const [ nome, setNome ] = useState("");
    
    const criacaoProj = async ( nome: string ) => {
        const projectID: string = makeid();
        const projectDoc = doc(firestore, "projetos", projectID)
        await setDoc(projectDoc, {
            nome: nome,
            id: projectID
        });

        ToastAndroid.show('Projeto criado', ToastAndroid.LONG);
        props.navigation.navigate("Main")
    };
    
    const makeid = () => {
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
            <Pressable onPressIn={() => criacaoProj(nome)}>
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