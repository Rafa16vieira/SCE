import React, { useState } from "react";
import { View, Text, Pressable, SafeAreaView, TextInput, ImageBackground, } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style";
import { Header1 } from "../header";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase-config";
import { RouteProp } from "@react-navigation/native";
import { params } from "../navigation";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from 'react-native-element-dropdown';


const data2 = [
    { key: 1, value: '1 (irrelevante)', label: '1 (irrelevante)' },
    { key: 2, value: '2', label: '2' },
    { key: 3, value: '3', label: '3' },
    { key: 4, value: '4', label: '4' },
    { key: 5, value: '5 (relevante)', label: '5 (relevante)' }
];

const data3 = [
    { key: 1, value: '1 (não cobre)', label: '1 (não cobre)' },
    { key: 2, value: '2', label: '2' },
    { key: 3, value: '3', label: '3' },
    { key: 4, value: '4', label: '4' },
    { key: 5, value: '5 (cobre)', label: '5 (cobre)' }
];

const data4 = [
    { key: 1, value: '1 (fraco)', label: '1 (fraco)' },
    { key: 2, value: '2', label: '2' },
    { key: 3, value: '3', label: '3' },
    { key: 4, value: '4', label: '4' },
    { key: 5, value: '5 (forte)', label: '5 (forte)' }
];


export interface form5props {
    navigation: any;
    route: RouteProp<params, "Form4">;
}


export default function Form4( props: form5props){
    const [ textsint, setTextsint ] = useState("")
    const [fortalece, setFortalece] = useState("NÃO");
    const [naltera, setNAltera] = useState("NÃO");
    const [enfraquece, setEnfraquece] = useState("NÃO");
    const [relevancia, setRelevancia] = useState(0);
    const [cobertura, setCobertura] = useState(0);
    const [forca, setForca] = useState(0);

    const criacao = async (sintese: string, fort: string, nalt: string, enf: string, relevancia: number, cobertura: number, forca: number, id: any) => {
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


    //@ts-ignore
    const { id, projectID } = props.route.params

    const newid = String(id)

    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>
        <SafeAreaView style={styles.formPoint}>
            <View style={{backgroundColor:'rgba(255,255,255,0.08)', marginTop: 1}}>
            <Header1/>
            </View>
            <KeyboardAwareScrollView keyboardDismissMode="on-drag" style={{flex: 1,  backgroundColor: 'rgba(255,255,255,0.08)'}} extraScrollHeight={100}>
        <View style={styles.formPoint}>
            <Text style={styles.text}>Síntese da análise</Text>
            <TextInput style={styles.verify} onChangeText={(textsint) => setTextsint(textsint)} multiline={true} placeholder="Digite a sintese" placeholderTextColor={'#fff'}/>
            <View style={styles.sample}>
                <Text style={styles.text}>A evidência...</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>Fortalece a compreensão</Text>
                    <BouncyCheckbox fillColor="#1f3324" iconStyle={{ marginLeft: 40, borderColor: "#1f3324"}} onPress={(isChecked: boolean) => { setFortalece(isChecked ? "SIM" : "NÃO") }} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>Não altera a compreensão</Text>
                    <BouncyCheckbox fillColor="#1f3324" iconStyle={{ marginLeft: 33, borderColor: "#1f3324"}} onPress={(isChecked: boolean) => { setNAltera(isChecked ? "SIM" : "NÃO") }} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>Enfraquece a compreensão</Text>
                    <BouncyCheckbox fillColor="#1f3324" iconStyle={{ marginLeft: 22, borderColor: "#1f3324"}} onPress={(isChecked: boolean) => { setEnfraquece(isChecked ? "SIM" : "NÃO") }} />
                </View>
            </View>
            <View style={styles.sample}>
                <Text style={styles.text}>Verificar relevância</Text>
                <SelectList setSelected={(relevancia: number) => setRelevancia(relevancia)} data={data2} save="key" dropdownStyles={{width: '100%', backgroundColor: '#1f3324', marginBottom: 10, height: 200}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{width: '100%', backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, marginBottom: 20}} inputStyles={{color: '#fff'}} search={false} placeholder="Selecione..."/>
            </View>
            <View style={styles.sample}>
                <Text style={styles.text}>Verificar cobertura</Text>
                <SelectList setSelected={(cobertura: number) => setCobertura(cobertura)} data={data3} save="key" dropdownStyles={{width: '100%', backgroundColor: '#1f3324', marginBottom: 10, height: 200}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{width: '100%', backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, marginBottom: 20}} inputStyles={{color: '#fff'}} search={false} placeholder="Selecione..."/>
            </View>
            <View style={styles.sample}>
                <Text style={styles.text}>Verificar força</Text>
                <SelectList setSelected={(forca: number) => setForca(forca)} data={data4} save="key" dropdownStyles={{width: '100%', backgroundColor: '#1f3324', marginBottom: 10, height: 200}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{width: '100%', backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, marginBottom: 20}} inputStyles={{color: '#fff'}} search={false} placeholder="Selecione..."/>
            </View>
            <View style={styles.buttons}>
                <Pressable style={styles.back} onPress={() => props.navigation.navigate("Form3", {id: newid})}>
                    <Text style={styles.buttonTextBack}>Voltar</Text>
                </Pressable>
                <Pressable style={styles.next} onPressIn={() => criacao(textsint, fortalece, naltera, enfraquece, relevancia, cobertura, forca, newid)} onPress={() => props.navigation.navigate("Form5", {id: newid, relevancia: relevancia, cobertura: cobertura, forca: forca, projectID: projectID})}>
                    <Text style={styles.buttonTextNext}>Avançar</Text>
                </Pressable>
            </View>
        </View>
        </KeyboardAwareScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}