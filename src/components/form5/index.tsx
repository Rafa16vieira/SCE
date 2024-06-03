import React, { useState, Component, useEffect } from "react";
import { View, Text, Image, Pressable, SafeAreaView, ScrollView, TextInput, Share, ImageBackground, } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style";
import { Icon } from '@rneui/themed';
import { Header1 } from "../header";
import { FieldPath, collection, doc, getDoc, getDocs, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import AwesomeAlert from 'react-native-awesome-alerts';
import { RouteProp } from "@react-navigation/native";
import { mainParams } from "../navigation";
import bg from './../../../assets/images/background.png'


export function criacao(importancia: number, falha: number, id: any, selo: string, evidencia: string){
    updateDoc(doc(db, "forms", id ), {
        importancia: importancia,
        falha: falha,
        selo: selo,
        evidencia: evidencia
    })
}


export interface form5props {
    navigation: any;
    route: RouteProp<mainParams, "Form5">;
}


let selo: string
let evidencia: string
let rcf : number

export default function Form5( props: form5props ){
    const [ showAlert, setShowAlert ] = useState(false)

    const data = [
        { key: 1, value: '1' },
        { key: 2, value: '2' },
        { key: 3, value: '3' },
        { key: 4, value: '4' },
        { key: 5, value: '5' },
        { key: 6, value: '6' },
        { key: 7, value: '7' },
        { key: 8, value: '8' },
        { key: 9, value: '9' },
        { key: 10, value: '10' },
        ];
        
        const data2 = [
            { key: 5, value: 'Improvável' },
            { key: 4, value: 'Remoto' },
            { key: 3, value: 'Ocasional' },
            { key: 2, value: 'Provável' },
            { key: 1, value: 'Frequente' },
            { key: 6, value: 'Sem mitigação' }
        ];
    
    const [importancia, setImportancia] = useState(0);
    const [ falha, setFalha ] = useState(0);
    const [user, ] = useState({})

    //@ts-ignore
    const { id, relevancia, cobertura, forca } = props.route.params
    const newid = String(id)

    
    

    if (relevancia > 3 && cobertura > 3 && forca > 3){
        rcf = 8
    }
    else if (relevancia > 3 && cobertura > 3 && forca < 3){
        rcf = 7
    }
    else if (relevancia > 3 && cobertura < 3 && forca > 3){
        rcf = 6
    }
    else if (relevancia > 3 && cobertura < 3 && forca < 3){
        rcf = 5
    }
    else if (relevancia < 3 && cobertura > 3 && forca > 3){
        rcf = 4
    }
    else if (relevancia < 3 && cobertura > 3 && forca < 3){
        rcf = 3
    }
    else if (relevancia < 3 && cobertura < 3 && forca > 3){
        rcf = 2
    }
    else if (relevancia < 3 && cobertura < 3 && forca < 3){
        rcf = 1
    }

    switch (importancia) {
        case 1:
        case 2:
        case 3:
        case 4:
            switch (falha) {
                case 1:
                case 2:
                case 3:
                case 4:
                    selo = 'bronze'
                    switch (rcf) {
                        case 1:
                        case 3:
                            evidencia = 'Fraca'
                        default:
                            evidencia = 'Mediana'
                    }
                    break;
                case 5:
                case 6:
                    selo = 'Cobre'
                    evidencia = 'Fraca'
                    break;
            }
            break;
        case 5:
        case 6:
            switch (falha){
                case 6:
                    selo = 'Cobre'
                    evidencia = 'Fraca'
                    break;
                case 5:
                case 4:
                    selo = 'Bronze'
                    switch (rcf) {
                        case 1:
                        case 3:
                            evidencia = 'Fraca'
                            break;
                        default:
                            evidencia = 'Mediana'
                            break;
                    }
                    break;
                case 3:
                case 2:
                case 1:
                    selo = 'Prata'
                    switch (rcf) {
                        case 1:
                        case 3:
                            evidencia = 'Fraca'
                        case 2:
                        case 4:
                        case 5:
                            evidencia = 'Mediana'
                        default:
                            evidencia = 'Importante'
                    }
                    break;
            }
            break;
        case 7:
        case 8:
            switch (falha){
                case 6:
                case 5:
                    selo = 'Bronze'
                    switch (rcf) {
                        case 1:
                        case 3:
                            evidencia = 'Fraca'
                            break;
                        default:
                            evidencia = 'Mediana'
                            break;
                    }
                    break;
                case 4:
                case 3:
                    selo = 'Prata'
                    switch (rcf) {
                        case 1:
                        case 3:
                            evidencia = 'Fraca'
                        case 2:
                        case 4:
                        case 5:
                            evidencia = 'Mediana'
                        default:
                            evidencia = 'Importante'
                    }
                    break;
                case 2: 
                case 1:
                    selo = 'Ouro'
                    switch (rcf){
                        case 1:
                        case 3:
                            evidencia = 'Fraca'
                        case 2:
                        case 4:
                        case 5:
                        case 7:
                            evidencia = 'Mediana'
                        case 6:
                            evidencia = 'Importante'
                        case 8:
                            evidencia = 'Incontestável'
                    }
                    break;
            }
            break;
        case 9:
        case 10:
            switch (falha){
                case 6:
                    selo = 'Bronze'
                    switch (rcf) {
                        case 1:
                        case 3:
                            evidencia = 'Fraca'
                            break;
                        default:
                            evidencia = 'Mediana'
                            break;
                    }
                    break;
                case 5:
                case 4:
                    selo = 'Prata'
                    switch (rcf) {
                        case 1:
                        case 3:
                            evidencia = 'Fraca'
                        case 2:
                        case 4:
                        case 5:
                            evidencia = 'Mediana'
                        default:
                            evidencia = 'Importante'
                    }
                    break;
                case 3:
                case 2: 
                case 1:
                    selo = 'Ouro'
                    switch (rcf){
                        case 1:
                        case 3:
                            evidencia = 'Fraca'
                        case 2:
                        case 4:
                        case 5:
                        case 7:
                            evidencia = 'Mediana'
                        case 6:
                            evidencia = 'Importante'
                        case 8:
                            evidencia = 'Incontestável'
                    }
                    break;
            }
            break;
    }
    
    const stringfinal: string = "Essa evidência tem selo " + selo
    return(
        <ImageBackground source={bg}>
        <SafeAreaView style={styles.formPoint}>
        
        <View style={styles.formPoint}>
            <Header1/>
                <View style={styles.sample}>
                    <Text style={styles.text}>Determinar grau de importância</Text>
                    <SelectList setSelected={(importancia: number) => setImportancia(importancia)} data={data} save="key" dropdownStyles={{width: '100%', backgroundColor: '#1f3324', marginBottom: 10, height: 200}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{width: '100%', backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, marginBottom: 20}} inputStyles={{color: '#fff'}} search={false} placeholder="Selecione..."/>
                    <Text style={styles.text}>Probabilidade de falha</Text>
                    <SelectList setSelected={(falha: number) => setFalha(falha)} data={data2} save="key" dropdownStyles={{width: '100%', backgroundColor: '#1f3324', marginBottom: 10, height: 200}} dropdownTextStyles={{color: '#fff'}} boxStyles={{width: '100%', backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1}} inputStyles={{color: '#fff'}} search={false} placeholder="Selecione..."/>
                </View>
                <View style={styles.buttons}>
                    <Pressable style={styles.back} onPress={() => props.navigation.navigate("Form4", {id: newid})}>
                        <Text style={styles.buttonTextBack}>Voltar</Text>
                    </Pressable>
                    <Pressable style={styles.next} onPressIn={() => criacao(importancia, falha, newid, selo, evidencia)} onPress={() => setShowAlert(true)}>
                        <Text style={styles.buttonTextNext}>Confirmar</Text>
                    </Pressable>
                </View>
                <AwesomeAlert show={showAlert} showProgress={false} title="Confirmação da evidência" message={stringfinal} closeOnTouchOutside={false} closeOnHardwareBackPress={false} showCancelButton={true} showConfirmButton={true} cancelText="Exportar PDF" confirmText="Voltar ao menu" cancelButtonColor="#152319" confirmButtonColor="#5c996b" onCancelPressed={() => {props.navigation.navigate("Main");}} onConfirmPressed={() => {props.navigation.navigate("Main");}}/>
        </View>
        </SafeAreaView>
        </ImageBackground>
        
    );
}