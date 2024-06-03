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


export function criacao(fonte: string, autores: any, data: string, tipo: string, relacoes: string, revisao: boolean, consistencia: boolean, id: any) {
    updateDoc(doc(db, "forms", id), {
        fonte: fonte,
        autores: autores,
        data: data,
        tipo: tipo,
        relacoes: relacoes,
        revisao: revisao,
        consistencia: consistencia

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
    const [ revisao, setRevisao ] = useState(false);
    const [ consistencia, setConsistencia ] = useState(false);

    //@ts-ignore
    const { id } = props.route.params

    const newid = String(id)

    
    
    


    return(
        <ImageBackground source={bg}>
        <SafeAreaView style={styles.formPoint}>
            <Header1/>
            <ScrollView keyboardDismissMode="on-drag" style={styles.formPoint}>
            
                <Text style={styles.text}>Fonte</Text>
                <TextInput style={styles.font} onChangeText={(fonte) => setFonte(fonte)} placeholder="Link da fonte" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Autores</Text>
                {autores.map((valor, index) => (<TextInput key={index} style={styles.author} placeholder="Autor" placeholderTextColor={'#fff'} onChangeText={texto => {
                    let novoValor = [...autores]
                    novoValor[index] = texto
                    setAutores(novoValor)
                }} />)) }
                
                <Button color={'#5c996b'}  title="+" onPress={() => {
                    const novoValor = [...autores]
                    novoValor.push('')
                    setAutores(novoValor)
                }} />
                <Text style={styles.text}>Data</Text>
                <TextInput style={styles.date} onChangeText={(data) => setData(data)} placeholder="Insira a data" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Tipo</Text>
                <TextInput style={styles.type} onChangeText={(tipo) => setTipo(tipo)} multiline={true} placeholder="Para que serve a evidência?" placeholderTextColor={'#fff'}/>
                
                <Text style={styles.text}>Relações na literatura atual</Text>
                <TextInput style={styles.relations} onChangeText={(relacoes) => setRelacoes(relacoes)} multiline={true} placeholder="Insira as relações" placeholderTextColor={'#fff'}/>
                <View>
                    <View style={styles.checkBoxArea}>
                        <Text style={styles.text}>Revisão por pares</Text>
                        <BouncyCheckbox fillColor="#1f3324" iconStyle={{borderColor: "#1f3324"}} onPress={(isChecked: boolean) => {setRevisao(true)}} />
                    </View>
                    <View style={styles.checkBoxArea}>
                        <Text style={styles.text}>Consistente a literatura anterior</Text>
                        <BouncyCheckbox fillColor="#1f3324" iconStyle={{borderColor: "#1f3324"}} onPress={(isChecked: boolean) => {setConsistencia(true)}} />
                    </View>
                </View>
                <View style={styles.buttons}>
                    <Pressable style={styles.back} onPress={() => props.navigation.navigate("Form1")}>
                        <Text style={styles.buttonTextBack}>Voltar</Text>
                    </Pressable>
                    <Pressable style={styles.next} onPressIn={() => criacao(fonte, autores, data, tipo, relacoes, revisao, consistencia, newid)} onPress={() => props.navigation.navigate("Form3", {id: newid})}>
                        <Text style={styles.buttonTextNext}>Avançar</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}