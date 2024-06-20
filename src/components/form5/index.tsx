import React, { useState, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, ImageBackground, TouchableOpacity, } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style";
import { Header1 } from "../header";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore, auth } from "../../config/firebase-config";
import AwesomeAlert from 'react-native-awesome-alerts';
import { RouteProp } from "@react-navigation/native";
import { params } from "../navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export interface form5props {
    navigation: any;
    route: RouteProp<params, "Form5">;
}


let selo: string
let evidencia: string
let rcf : number



export default function Form5( props: form5props ){
    const [ showAlert, setShowAlert ] = useState(false)
    const [ name, setName ] = useState("")

    const criacao = (importancia: any, falha: any, id: any, selo: string, evidencia: string, avaliador: string) => {
        updateDoc(doc(firestore, "forms", id ), {
            importancia: importancia,
            falha: falha,
            selo: selo,
            evidencia: evidencia,
            avaliador: avaliador,
            id: id
        })
    }

    const perigo = (importancia: number) => {
        switch (importancia){
            case 1:
                return '1 - insignificante'
                break;
            case 2:
                return '2 - insignificante'
                break;
            case 3:
                return '3 - insignificante'
                break;
            case 4:
                return '4 - insignificante'
                break;
            case 5:
                return '5 - marginal'
                break;
            case 6:
                return '6 - marginal'
                break;
            case 7:
                return '7 - crítico'
                break;
            case 8:
                return '8 - crítico'
                break;
            case 9:
                return '9 - catastrófico'
                break;
            case 10:
                return '10 - catastrófico'
                break;
        }
    }
    
    const fail = (falha:number) => {
        switch(falha){
            case 1:
                return '1 - frequente'
                break;
            case 2:
                return '2 - provável'
                break;
            case 3: 
                return '3 - ocasional'
                break;
            case 4:
                return '4 - remoto'
                break;
            case 5:
                return '5 - improvável'
                break;
            case 6:
                return '6 - sem mitigação'
                break;
        }
    }

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
    const { id, relevancia, cobertura, forca, projectID } = props.route.params
    const newid = String(id)

    
        useEffect(() => {
            const fetchUserName = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                const userDoc = await getDoc(doc(firestore, 'users', user.uid));
                if (userDoc.exists()) {
                    setName(userDoc.data()?.nome || 'No Name Found');
                }
                } catch (error) {
                console.error("Error fetching user data: ", error);
                }
            }
            };
        
            fetchUserName();
        }, []);
    
    

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
                    if (rcf == 1 || rcf == 3)
                            evidencia = 'Fraca';
                        else
                            evidencia = 'Mediana';
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
                    if(rcf == 1 || rcf == 3)
                            evidencia = 'Fraca'
                        else
                            evidencia = 'Mediana'
                    
                    break;
                case 3:
                case 2:
                case 1:
                    selo = 'Prata'
                    if (rcf == 1 || rcf == 3)
                            evidencia = 'Fraca'
                    else if(rcf == 2 || rcf == 4 || rcf == 5)
                            evidencia = 'Mediana'
                        else
                            evidencia = 'Importante'                    
                    break;
            }
            break;
        case 7:
        case 8:
            switch (falha){
                case 6:
                case 5:
                    selo = 'Bronze'
                    if (rcf == 1 || rcf == 3) 
                            evidencia = 'Fraca'
                    else
                            evidencia = 'Mediana'
                            
                    
                    break;
                case 4:
                case 3:
                    selo = 'Prata'
                    if (rcf == 1 || rcf == 3)
                            evidencia = 'Fraca'
                    else if (rcf == 2 || rcf == 4 || rcf == 5)
                            evidencia = 'Mediana'
                        else
                            evidencia = 'Importante'
                    
                    break;
                case 2: 
                case 1:
                    selo = 'Ouro'
                    if (rcf == 1 || rcf == 3)
                            evidencia = 'Fraca'
                    else if (rcf == 2 || rcf == 4 || rcf == 5 || rcf == 7)
                            evidencia = 'Mediana'
                    else if (rcf == 6)
                            evidencia = 'Importante'
                    else
                            evidencia = 'Incontestável'
                    
            }
            break;
        case 9:
        case 10:
            switch (falha){
                case 6:
                    selo = 'Bronze'
                    if (rcf == 1 || rcf == 3) 
                            evidencia = 'Fraca'
                    else
                            evidencia = 'Mediana'                    
                    break;
                case 5:
                case 4:
                    selo = 'Prata'
                    if (rcf == 1 || rcf == 3) 
                            evidencia = 'Fraca'
                    else if (rcf == 2 || rcf == 4 || rcf == 5)
                            evidencia = 'Mediana'
                    else
                            evidencia = 'Importante'
                            
                    
                    break;
                case 3:
                case 2: 
                case 1:
                    selo = 'Ouro'
                    if (rcf == 1 || rcf == 3)
                            evidencia = 'Fraca'
                    else if (rcf == 2 || rcf == 4 || rcf == 5 || rcf == 7)
                            evidencia = 'Mediana'
                    else if (rcf == 6)
                            evidencia = 'Importante'
                    else
                            evidencia = 'Incontestável'
                            
                    
                    break;
            }
            break;
    }

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    
    const stringfinal: string = "Essa evidência tem selo " + selo
    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>
        <SafeAreaView style={styles.formPoint}>
            <View style={{backgroundColor:'rgba(255,255,255,0.08)'}}>
            <Header1/>
            </View>
            <KeyboardAwareScrollView keyboardDismissMode="on-drag" style={{flex: 1,  backgroundColor: 'rgba(255,255,255,0.08)', padding: 20}} extraScrollHeight={100}>
        
        <View>
                <View style={styles.sample}>
                    <Text style={styles.text}>Determinar grau de importância</Text>
                    <SelectList dropdownShown={open1} setSelected={(importancia: number) => setImportancia(importancia)} data={data} save="key" dropdownStyles={{width: '100%', backgroundColor: '#1f3324', marginBottom: 10, height: 200}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{width: '100%', backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, marginBottom: 20}} inputStyles={{color: '#fff'}} search={false} placeholder="Selecione..."/>
                    <Text style={styles.text}>Probabilidade de falha</Text>
                    <SelectList dropdownShown={open2} setSelected={(falha: number) => setFalha(falha)} data={data2} save="key" dropdownStyles={{width: '100%', backgroundColor: '#1f3324', marginBottom: 10, height: 200}} dropdownTextStyles={{color: '#fff'}} boxStyles={{width: '100%', backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1}} inputStyles={{color: '#fff'}} search={false} placeholder="Selecione..."/>
                </View>

                <View style={styles.buttons}>
                    <Pressable style={styles.back} onPress={() => props.navigation.navigate("Form4", {id: newid})}>
                        <Text style={styles.buttonTextBack}>Voltar</Text>
                    </Pressable>
                    <Pressable style={styles.next} onPressIn={() => criacao(perigo(importancia), fail(falha), newid, selo, evidencia, name)} onPress={() => setShowAlert(true)}>
                        <Text style={styles.buttonTextNext}>Confirmar</Text>
                    </Pressable>
                </View>
                <AwesomeAlert show={showAlert} showProgress={false} title="Confirmação da evidência" message={stringfinal} closeOnTouchOutside={false} closeOnHardwareBackPress={false} showCancelButton={false} showConfirmButton={true} confirmText="Concluir" confirmButtonColor="#5c996b" onConfirmPressed={() => {props.navigation.navigate("Itens", {id: projectID});}}/>
        </View>
        </KeyboardAwareScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}