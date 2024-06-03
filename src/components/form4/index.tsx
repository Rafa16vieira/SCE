import React, { useState } from "react";
import { View, Text, Image, Pressable, SafeAreaView, ScrollView, TextInput, } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style";
import { Icon } from '@rneui/themed';
import { Header1 } from "../header";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { RouteProp } from "@react-navigation/native";
import { mainParams } from "../navigation";

const data = [
    { key: 1, value: 'Fortalece a compreensão' },
    { key: 2, value: 'Não altera a compreensão' },
    { key: 3, value: 'Enfraquece a compreensão' },
    ];

const data2 = [
    { key: 1, value: '1 (irrelevante)' },
    { key: 2, value: '2' },
    { key: 3, value: '3' },
    { key: 4, value: '4' },
    { key: 5, value: '5 (relevante)' }
];

const data3 = [
    { key: 1, value: '1 (não cobre)' },
    { key: 2, value: '2' },
    { key: 3, value: '3' },
    { key: 4, value: '4' },
    { key: 5, value: '5 (cobre)' }
];

const data4 = [
    { key: 1, value: '1 (fraco)' },
    { key: 2, value: '2' },
    { key: 3, value: '3' },
    { key: 4, value: '4' },
    { key: 5, value: '5 (forte)' }
];

export function criacao(sintese: number, relevancia: number, cobertura: number, forca: number, id: any){
    updateDoc(doc(db, "forms", id), {
        sintese: sintese,
        relevancia: relevancia,
        cobertura: cobertura,
        forca: forca
    })

}

export interface form5props {
    navigation: any;
    route: RouteProp<mainParams, "Form4">;
}


export default function Form4( props: form5props){
    const [sintese, setSintese] = useState(0);
    const [ relevancia, setRelevancia ] = useState(0);
    const [ cobertura, setCobertura ] = useState(0);
    const [ forca, setForca ] = useState(0);

    //@ts-ignore
    const { id } = props.route.params

    const newid = String(id)

    const sum = relevancia + cobertura + relevancia

    return(
        <SafeAreaView style={styles.formPoint}>
        <View style={styles.formPoint}>
            <Header1/>
            <View style={styles.sample}>
                <Text style={styles.text}>Síntese da análise</Text>
                <SelectList setSelected={(sintese: number) => setSintese(sintese)} save="key" data={data} dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, width: '100%'}} inputStyles={{color: '#fff'}} search={false} placeholder="Selecione..."/>
            </View>
            <View style={styles.sample}>
                <Text style={styles.text}>Verificar relevância</Text>
                <SelectList setSelected={(relevancia: number) => setRelevancia(relevancia)} save="key" data={data2} dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, width: '100%'}} inputStyles={{color: '#fff'}} search={false} placeholder="Selecione..."/>
            </View>
            <View style={styles.sample}>
                <Text style={styles.text}>Verificar cobertura</Text>
                <SelectList setSelected={(cobertura: number) => setCobertura(cobertura)} save="key" data={data3} dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, width: '100%'}} inputStyles={{color: '#fff'}} search={false} placeholder="Selecione..."/>
            </View>
            <View style={styles.sample}>
                <Text style={styles.text}>Verificar força</Text>
                <SelectList setSelected={(forca: number) => setForca(forca)} save="key" data={data4} dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{width: '100%', backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1}} inputStyles={{color: '#fff'}} search={false} placeholder="Selecione..."/>
            </View>
            <View style={styles.buttons}>
                <Pressable style={styles.back} onPress={() => props.navigation.navigate("Form3")}>
                    <Text style={styles.buttonTextBack}>Voltar</Text>
                </Pressable>
                <Pressable style={styles.next} onPressIn={() => criacao(sintese, relevancia, cobertura, forca, newid)} onPress={() => props.navigation.navigate("Form5", {id: newid, relevancia: relevancia, cobertura: cobertura, forca: forca})}>
                    <Text style={styles.buttonTextNext}>Avançar</Text>
                </Pressable>
            </View>
        </View>
        </SafeAreaView>
    );
}