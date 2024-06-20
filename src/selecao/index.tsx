import { doc, getDocs, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../config/firebase-config";
import { HeaderProject } from "../components/header";
import React, { useState, Component, useEffect } from "react";
import { View, Text, Image, Pressable, SafeAreaView, ScrollView, TextInput, ImageBackground, Modal, Button, Alert, } from "react-native";
import styles from "../components/list/style";
import Toast from 'react-native-root-toast';

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

        Toast.show('Projeto criado', {duration: Toast.durations.SHORT, position: Toast.positions.CENTER, animation: true, hideOnPress: true});
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
        <SafeAreaView style={{ justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.08)'}}>
            <View>
            <HeaderProject/>
            </View>
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