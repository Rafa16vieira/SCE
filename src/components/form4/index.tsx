import React, { useState } from "react";
import { View, Text, Image, Pressable, SafeAreaView, ScrollView, TextInput, ImageBackground, } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style";
import { Icon } from '@rneui/themed';
import { Header1 } from "../header";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase-config";
import { RouteProp } from "@react-navigation/native";
import { params } from "../navigation";
import bg from './../../../assets/images/background.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from 'react-native-element-dropdown';


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

export function criacao(sintese: string, fort: string, nalt: string, enf: string, relevancia: number, cobertura: number, forca: number, id: any){
    updateDoc(doc(firestore, "forms", id), {
        sintese: sintese,
        fortalece: fort,
        naoAltera: nalt,
        enfraquece: enf,
        relevancia: relevancia,
        cobertura: cobertura,
        forca: forca
    })

}


export interface form5props {
    navigation: any;
    route: RouteProp<params, "Form4">;
}


export default function Form4( props: form5props){
    const [ textsint, setTextsint ] = useState("")
    const [fortalece, setFortalece] = useState("NÃO");
    const [naltera, setNAltera] = useState("NÃO");
    const [enfraquece, setEnfraquece] = useState("NÃO");
    const [relevancia, setRelevancia] = useState<string | null>(null);
    const [cobertura, setCobertura] = useState<string | null>(null);
    const [forca, setForca] = useState<string | null>(null);


    //@ts-ignore
    const { id } = props.route.params

    const newid = String(id)

    const sum = (parseInt(relevancia ?? "0") + parseInt(cobertura ?? "0") + parseInt(forca ?? "0"));

    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>
        <KeyboardAwareScrollView style={styles.formPoint}>
        <SafeAreaView style={styles.formPoint}>
        <View style={styles.formPoint}>
            <Header1/>
            <Text style={styles.text}>Síntese da análise</Text>
            <TextInput style={styles.verify} onChangeText={(textsint) => setTextsint(textsint)} multiline={true} placeholder="Digite a sintese" placeholderTextColor={'#fff'}/>
            <View style={styles.sample}>
                <Text style={styles.text}>A evidência...</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>Fortalece a compreensão</Text>
                    <BouncyCheckbox fillColor="#1f3324" iconStyle={{ marginLeft: 10, borderColor: "#1f3324"}} onPress={(isChecked: boolean) => { setFortalece(isChecked ? "SIM" : "NÃO") }} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>Não altera a compreensão</Text>
                    <BouncyCheckbox fillColor="#1f3324" iconStyle={{ marginLeft: 10, borderColor: "#1f3324"}} onPress={(isChecked: boolean) => { setNAltera(isChecked ? "SIM" : "NÃO") }} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>Enfraquece a compreensão</Text>
                    <BouncyCheckbox fillColor="#1f3324" iconStyle={{ marginLeft: 10, borderColor: "#1f3324"}} onPress={(isChecked: boolean) => { setEnfraquece(isChecked ? "SIM" : "NÃO") }} />
                </View>
            </View>
            <View style={styles.sample}>
                <Text style={styles.text}>Verificar relevância</Text>
                <Dropdown
                                style={[styles.dropdown, { backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1 }]}
                                placeholderStyle={{ color: '#fff' }}
                                selectedTextStyle={{ color: '#fff' }}
                                inputSearchStyle={{ color: '#fff' }}
                                data={data2}
                                labelField="key"
                                valueField="value"
                                placeholder="Selecione..."
                                search={false}
                                maxHeight={200}
                                value={relevancia}
                                onChange={item => setRelevancia(item.key.toString())}
                            />
            </View>
            <View style={styles.sample}>
                <Text style={styles.text}>Verificar cobertura</Text>
                <Dropdown
                                style={[styles.dropdown, { backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1 }]}
                                placeholderStyle={{ color: '#fff' }}
                                selectedTextStyle={{ color: '#fff' }}
                                inputSearchStyle={{ color: '#fff' }}
                                data={data3}
                                labelField="value"
                                valueField="key"
                                placeholder="Selecione..."
                                search={false}
                                maxHeight={200}
                                value={cobertura}
                                onChange={item => setCobertura(item.key.toString())}
                            />
            </View>
            <View style={styles.sample}>
                <Text style={styles.text}>Verificar força</Text>
                <Dropdown
                                style={[styles.dropdown, { backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1 }]}
                                placeholderStyle={{ color: '#fff' }}
                                selectedTextStyle={{ color: '#fff' }}
                                inputSearchStyle={{ color: '#fff' }}
                                data={data4}
                                labelField="value"
                                valueField="key"
                                placeholder="Selecione..."
                                search={false}
                                maxHeight={200}
                                value={forca}
                                onChange={item => setForca(item.key.toString())}
                            />
            </View>
            <View style={styles.buttons}>
                <Pressable style={styles.back} onPress={() => props.navigation.navigate("Form3", {id: newid})}>
                    <Text style={styles.buttonTextBack}>Voltar</Text>
                </Pressable>
                <Pressable style={styles.next} onPressIn={() => criacao(textsint, fortalece, naltera, enfraquece, parseInt(relevancia!), parseInt(cobertura!), parseInt(forca!), newid)} onPress={() => props.navigation.navigate("Form5", {id: newid, relevancia: relevancia, cobertura: cobertura, forca: forca})}>
                    <Text style={styles.buttonTextNext}>Avançar</Text>
                </Pressable>
            </View>
        </View>
        </SafeAreaView>
        </KeyboardAwareScrollView>
        </ImageBackground>
    );
}