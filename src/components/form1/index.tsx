import { Header1 } from "../header";
import styles from "./style";
import { View, ScrollView, Text, TextInput, Button, TouchableOpacity, Pressable, SafeAreaView, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase-config";
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"; 
import { RouteProp } from "@react-navigation/native";
import { mainParams } from "../navigation";
import { Utils } from "@nativescript/core";
import bg from './../../../assets/images/background.png'

export function criacao(nome: string, key: any, descricao: string, proposito: string, id: string) {
    const projectDoc = doc(db, "forms", id)
    updateDoc(projectDoc, {
        nome: nome,
        palavras: key,
        descricao: descricao,
        proposito: proposito
    });
};

export interface form1props {
    navigation: any;
    route: RouteProp<mainParams, "Form1">;
}




export default function Form1(props: form1props){
    const [ nome, setNome ] = useState("");
    const [ key, setKey ] = useState([", "]);
    const [ descricao, setDescricao ] = useState("");
    const [ proposito, setProposito ] = useState("");

    //@ts-ignore
    const { id } = props.route.params
    console.log({id})

    


    
    



    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>
        <SafeAreaView style={styles.formPoint}>
            <Header1/>
        <ScrollView keyboardDismissMode="on-drag" style={styles.formPoint}>
            
            <Text style={styles.text}>Nome</Text>
            <TextInput style={styles.nome} onChangeText={nome => setNome(nome)} placeholder="Nomear evidência" placeholderTextColor={'#fff'}/>
            <Text style={styles.text}>Palavras chave</Text>
            {key.map((valor, index) => (<TextInput style={styles.keywords} key={index} placeholder="Palavras chave" placeholderTextColor={'#fff'} onChangeText={texto => {
                let novoValor = [...key]
                novoValor[index] = texto + ' '
                setKey(novoValor)
            }} />)) }
            <Button title="+" color={"#1f3324"} onPress={() => {
                const novoValor = [...key]
                novoValor.push('')
                setKey(novoValor)
            }} />
            <Text style={styles.text}>Descrição</Text>
            <TextInput style={styles.description} onChangeText={(descricao) => setDescricao(descricao)} multiline={true} numberOfLines={5} placeholder="Descrição breve" placeholderTextColor={'#fff'}/>
            <Text style={styles.text}>Propósito</Text>
            <TextInput style={styles.purpose} onChangeText={(proposito) => setProposito(proposito)} multiline={true} numberOfLines={3} placeholder="Para que o serve?" placeholderTextColor={'#fff'}/>
            <View style={styles.buttons}>
                <Pressable style={styles.back} onPress={() => props.navigation.navigate("Main")}>
                    <Text style={styles.buttonTextBack}>Voltar</Text>
                </Pressable>
                <Pressable style={styles.next} onPressIn={() => criacao(nome, key, descricao, proposito, id)} onPress={() => props.navigation.navigate("Form2", {id: id})}>
                    <Text style={styles.buttonTextNext}>Avançar</Text>
                </Pressable>
            </View>
        </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}