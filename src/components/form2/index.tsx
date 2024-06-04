import styles from "./style";
import { View, Text, Button, TextInput , TouchableOpacity, Pressable, ScrollView, SafeAreaView, ImageBackground,   } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Header1 } from "../header";
import react, { useState } from "react";
import { db } from "../../config/firebase-config";
import {  collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"; 
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { mainParams } from "../navigation";
import bg from './../../../assets/images/background.png'


export function criacao(fonte: string, autores: any, data: string, tipo: string, norma: string, relacoes: string, revisao: string, consistencia: string, id: any, ident: string) {
    updateDoc(doc(db, "forms", id), {
        fonte: fonte,
        autores: autores,
        data: data,
        tipo: tipo,
        norma: norma,
        relacoes: relacoes,
        revisao: revisao,
        consistencia: consistencia,
        identificacao: ident

    });
};

export interface form2props {
    navigation: any;
    route: RouteProp<mainParams, "Form2">;
}




export default function Form2( props: form2props ){

    const [ fonte, setFonte ] = useState("");
    const [ autores, setAutores ] = useState([", "]);
    const [ data, setData ] = useState("");
    const [ tipo, setTipo ] = useState("");
    const [ relacoes, setRelacoes ] = useState("");
    const [ revisao, setRevisao ] = useState("NAO");
    const [ consistencia, setConsistencia ] = useState("");
    const [ norma, setNorma ] = useState("");
    const [ ident, setIdent ] = useState("");

    //@ts-ignore
    const { id } = props.route.params

    const newid = String(id)

    
    
    


    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}} style={{flex:1}}>
        <SafeAreaView style={styles.formPoint}>
            <Header1/>
            <ScrollView keyboardDismissMode="on-drag" style={styles.formPoint}>
            
                <Text style={styles.text}>Fonte</Text>
                <TextInput style={styles.font} onChangeText={(fonte) => setFonte(fonte)} placeholder="Link da fonte" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Identificação</Text>
                <TextInput style={styles.type} onChangeText={(ident) => setIdent(ident)} placeholder="Insira a identificação" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Autores</Text>
                {autores.map((valor, index) => (<TextInput key={index} style={styles.author} placeholder="Autor" placeholderTextColor={'#fff'} onChangeText={texto => {
                    let novoValor = [...autores]
                    novoValor[index] = texto + ' '
                    setAutores(novoValor)
                }} />)) }
                
                <Button color={'#1f3324'}  title="+" onPress={() => {
                    const novoValor = [...autores]
                    novoValor.push('')
                    setAutores(novoValor)
                }} />
                <Text style={styles.text}>Data</Text>
                <TextInput style={styles.date} onChangeText={(data) => setData(data)} placeholder="Insira a data" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Tipo</Text>
                <TextInput style={styles.type} onChangeText={(tipo) => setTipo(tipo)} multiline={true} placeholder="Para que serve a evidência?" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Norma Regulatória</Text>
                <TextInput style={styles.type} onChangeText={(norma) => setNorma(norma)} multiline={true} placeholder="Norma Regulatória" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Relações na literatura atual</Text>
                <TextInput style={styles.relations} onChangeText={(relacoes) => setRelacoes(relacoes)} multiline={true} placeholder="Insira as relações" placeholderTextColor={'#fff'}/>
                <View style={styles.checkBoxArea}>
                    <Text style={styles.text}>Revisao por pares</Text>
                    <BouncyCheckbox fillColor="#1f3324" iconStyle={{borderColor: "#1f3324"}} onPress={(isChecked: boolean) => {setRevisao("SIM")}} />
                </View>
                <Text style={styles.text}>Consistência com a literatura anterior</Text>
                <TextInput style={styles.date} onChangeText={(consistencia) => setConsistencia(consistencia)} placeholder="Consistência" placeholderTextColor={'#fff'}/>
                <View style={styles.buttons}>
                    <Pressable style={styles.back} onPress={() => props.navigation.navigate("Form1")}>
                        <Text style={styles.buttonTextBack}>Voltar</Text>
                    </Pressable>
                    <Pressable style={styles.next} onPressIn={() => criacao(fonte, autores, data, tipo, norma, relacoes, revisao, consistencia, newid, ident)} onPress={() => props.navigation.navigate("Form3", {id: newid})}>
                        <Text style={styles.buttonTextNext}>Avançar</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}