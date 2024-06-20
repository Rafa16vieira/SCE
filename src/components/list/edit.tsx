import { RouteProp } from "@react-navigation/native";
import { View, Text, SafeAreaView, ScrollView, Button, TextInput, Alert, ImageBackground, Pressable, TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SelectList } from 'react-native-dropdown-select-list';
import { params } from "../navigation";
import { HeaderEdit } from "../header";
import { collection, doc, getDoc, onSnapshot, query, where, updateDoc } from "firebase/firestore";
import { auth, firestore } from "@/src/config/firebase-config";
import { useEffect, useState } from "react";
import styles from "./style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Layout, Select, SelectItem, SelectProps } from '@ui-kitten/components';

export interface editProps {
    navigation: any;
    route: RouteProp<params, "Edit">;
}

let selo: string
let evidencia: string
let rcf : number



export default function Edit(props: editProps) {
    const [evids, setEvids] = useState<any>({});
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);


    //@ts-ignore
    const { nome, projectID } = props.route.params;

    const calculateSelo = ( importancia: string, falha: string) => {
    

        switch (importancia) {
            case '1 - insignificante':
            case '2 - insignificante':
            case '3 - insignificante':
            case '4 - insignificante':
                switch (falha) {
                    case '1 - frequente':
                    case '2 - provável':
                    case '3 - ocasional':
                    case '4 - remoto':
                        return 'Bronze'
                        break;
                    case '5 - improvável':
                    case '6 - sem mitigação':
                        return 'Cobre'
                        break;
                }
                break;
            case '5 - marginal':
            case '6  - marginal':
                switch (falha){
                    case '6 - sem mitigação':
                        return 'Cobre'
                        break;
                    case '5 - improvável':
                    case '4 - remoto':
                        return 'Bronze'
                        break;
                    case '3 - ocasional':
                    case '2 - provável':
                    case '1 - frequente':
                        return 'Prata'                   
                        break;
                }
                break;
            case '7 - crítico':
            case '8 - crítico':
                switch (falha){
                    case '6 - sem mitigação':
                    case '5 - improvável':
                        return 'Bronze'
                        break;
                    case '4 - remoto':
                    case '3 - ocasional':
                        return 'Prata'
                        break;
                    case '2 - provável': 
                    case '1 - frequente':
                        return 'Ouro'
                        break;
                }
                break;
            case '9 - catastrófico':
            case '10 - catastrófico':
                switch (falha){
                    case '6 - sem mitigação':
                        return 'Bronze'                   
                        break;
                    case '5 - improvável':
                    case '4 - remoto':
                        return 'Prata'
                        break;
                    case '3 - ocasional':
                    case '2 - provável': 
                    case '1 - frequente':
                        return 'Ouro'
                        
                }
                break;
        }
    }
    
    const calculateEvidencia = (relevancia:number, cobertura:number, forca: number, selo: any) => {
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
    
    
        if (selo == 'Ouro'){
            if (rcf == 1 || rcf == 3)
                    return 'Fraca'
            else if (rcf == 2 || rcf == 4 || rcf == 5 || rcf == 7)
                    return 'Mediana'
            else if (rcf == 6)
                    return 'Importante'
            else
                    return 'Incontestável'
        }
        else if (selo == 'Prata'){
            if (rcf == 1 || rcf == 3) 
                    evidencia = 'Fraca'
            else if (rcf == 2 || rcf == 4 || rcf == 5)
                    return 'Mediana'
            else
                    return 'Importante'
        }
        else if (selo == 'Bronze'){
            if (rcf == 1 || rcf == 3) 
                    return 'Fraca'
            else
                    return 'Mediana' 
        }
        else if (selo == 'Cobre'){
            return 'Fraca'
        }
    }

    
        

        useEffect(() => {
            const newSelo = calculateSelo(evids.importancia, evids.falha);
            const newEvidencia = calculateEvidencia(evids.relevancia || 0, evids.cobertura || 0, evids.forca || 0, newSelo);
    
            setEvids((prev: any) => ({
                ...prev,
                selo: newSelo,
                evidencia: newEvidencia,
            }));
        }, [evids.importancia, evids.falha, evids.relevancia, evids.cobertura, evids.forca]);

        useEffect(() => {
            if (nome) {
                const q = query(collection(firestore, 'forms'), where('nome', '==', nome));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    let newEvid: any = {};
                    let newId: string | null = null;
                    querySnapshot.forEach((doc) => {
                        newEvid = doc.data();
                        newId = doc.id;
                    });
                    setEvids(newEvid);
                    setId(newId);
                });

                return () => unsubscribe();
            }
        }, [nome]);

    const handleUpdate = async () => {
        if (id) {
            const docRef = doc(firestore, 'forms', id);
            try {
                await updateDoc(docRef, evids);
                Alert.alert('Successo', 'Atualização bem sucedida!', [
                    { text: 'OK', onPress: () => {props.navigation.navigate("Itens", {id: projectID})}}
                ]);
            } catch (error) {
                console.error("Error updating document: ", error);
                Alert.alert('Erro', 'Ocorreu um erro tentando atualizar os dados.');
            }
        }
    };
    

    const handleInputChange = (field: string, value: string | number | boolean) => {
        setEvids((prev: any) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleArrayChange = (field: string, value: string) => {
        const arrayValue = value.split(',').map(item => item.trim());
        setEvids((prev: any) => ({
            ...prev,
            [field]: arrayValue
        }));
    };

    const checked = (field: string) => {
        if (field == 'SIM'){
            return true
        }
        else if (field == 'NAO'){
            return false
        }
    }
    
    const check = (field: boolean) => {
        if (field == true){
            return "SIM"
        }
        else{
            return "NAO"
        }
    }
    
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);

    return (
        <ImageBackground style={{flex: 1}} source={require("../../../assets/images/background.png")}>
            <View style={{backgroundColor: 'rgba(255,255,255,0.08)'}}>
            <HeaderEdit />
            </View>
        <SafeAreaView style={styles.formPoint}>
            
            <KeyboardAwareScrollView style={{flex: 1,  backgroundColor: 'rgba(255,255,255,0.08)', padding: 20,}} extraScrollHeight={100}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Text style={styles.texto}>Nome:</Text>
                    <TextInput
                        style={styles.smallField}
                        value={evids.nome || ''}
                        onChangeText={(text) => handleInputChange('nome', text)}
                    />
                    <Text style={styles.texto}>Palavras chave:</Text>
                    <TextInput
                        style={styles.smallField}
                        placeholder="Palavras chave (separadas por vírgula)"
                        placeholderTextColor={'#fff'}
                        value={Array.isArray(evids.palavras) ? evids.palavras.join(', ') : ''}
                        onChangeText={(text) => handleArrayChange('palavras', text)}
                    />
                    <Text style={styles.texto}>Contextualização:</Text>
                    <TextInput multiline={true}
                        style={styles.biggestField}
                        value={evids.descricao || ''}
                        onChangeText={(text) => handleInputChange('descricao', text)}
                    />
                    <Text style={styles.texto}>Propósito:</Text>
                    <TextInput
                    multiline={true}
                        style={styles.bigField}
                        value={evids.proposito || ''}
                        onChangeText={(text) => handleInputChange('proposito', text)}
                    />
                    <Text style={styles.texto}>Identificação:</Text>
                    <TextInput
                        style={styles.bigField}
                        value={evids.identificacao || ''}
                        onChangeText={(text) => handleInputChange('identificacao', text)}
                    />
                    <Text style={styles.texto}>Autores:</Text>
                    <TextInput
                        style={styles.smallField}
                        placeholder="Autores (separados por vírgula)"
                        placeholderTextColor={'#fff'}
                        value={Array.isArray(evids.autores) ? evids.autores.join(', ') : ''}
                        onChangeText={(text) => handleArrayChange('autores', text)}
                    />
                    <Text style={styles.texto}>Data:</Text>
                    <TextInput
                        style={styles.smallField}
                        value={evids.data || ''}
                        onChangeText={(text) => handleInputChange('data', text)}
                    />
                    <Text style={styles.texto}>Tipo:</Text>
                    <TextInput
                        style={styles.smallField}
                        value={evids.tipo || ''}
                        onChangeText={(text) => handleInputChange('tipo', text)}
                    />
                    <Text style={styles.texto}>Norma Regulatória:</Text>
                    <TextInput
                    multiline={true}
                        style={styles.bigField}
                        value={evids.norma || ''}
                        onChangeText={(text) => handleInputChange('norma', text)}
                    />
                    <Text style={styles.texto}>Link da fonte:</Text>
                    <TextInput
                        style={styles.smallField}
                        value={evids.fonte || ''}
                        onChangeText={(text) => handleInputChange('fonte', text)}
                    />
                    <Text style={styles.texto}>Contextualizar:</Text>
                    <TextInput
                    multiline={true}
                        style={styles.bigField}
                        value={evids.relacoes || ''}
                        onChangeText={(text) => handleInputChange('relacoes', text)}
                    />
                    <Text style={styles.texto}>Revisão por pares:</Text>
                    <BouncyCheckbox
                        isChecked={checked(evids.revisao)}
                        onPress={(newValue: boolean) => handleInputChange('revisao', check(newValue))}
                        fillColor="#1f3324"
                    />
                    <Text style={styles.texto}>Consistência:</Text>
                    <TextInput
                        style={styles.smallField}
                        value={evids.consistencia || ''}
                        onChangeText={(text) => handleInputChange('consistencia', text)}
                    />
                    <Text style={styles.texto}>Texto de amostra:</Text>
                    <TextInput
                        multiline={true}
                        style={styles.bigField}
                        value={evids.amostra || ''}
                        onChangeText={(text) => handleInputChange('amostra', text)}
                    />
                    <Text style={styles.texto}>Usos conhecidos:</Text>
                    <TextInput
                        multiline={true}
                        style={styles.bigField}
                        value={evids.usos || ''}
                        onChangeText={(text) => handleInputChange('usos', text)}
                    />
                    <Text style={styles.texto}>Implementação:</Text>
                    <TextInput
                        multiline={true}
                        style={styles.bigField}
                        value={evids.implementacao || ''}
                        onChangeText={(text) => handleInputChange('implementacao', text)}
                    />
                    <Text style={styles.texto}>Possíveis viéses:</Text>
                    <TextInput
                        multiline={true}
                        style={styles.bigField}
                        value={evids.vieses || ''}
                        onChangeText={(text) => handleInputChange('vieses', text)}
                    />
                    <Text style={styles.texto}>Inexistência de conflitos de interesse:</Text>
                    <TextInput
                        style={styles.smallField}
                        value={evids.conflitos || ''}
                        onChangeText={(text) => handleInputChange('conflitos', text)}
                    />
                    <Text style={styles.texto}>Síntese da análise:</Text>
                    <TextInput
                        multiline={true}
                        style={styles.bigField}
                        value={evids.sintese || ''}
                        onChangeText={(text) => handleInputChange('sintese', text)}
                    />
                    
                        <Text style={styles.textocheck}>A evidência...</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textocheck}>Fortalece a compreensão</Text>
                            <BouncyCheckbox
                                isChecked={checked(evids.fortalece)}
                                onPress={(newValue: boolean) => handleInputChange('fortalece', check(newValue))}
                                fillColor="#1f3324"
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textocheck}>Não altera a compreensão</Text>
                            <BouncyCheckbox
                                isChecked={checked(evids.naoAltera)}
                                onPress={(newValue: boolean) => handleInputChange('naoAltera', check(newValue))}
                                fillColor="#1f3324"
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textocheck}>Enfraquece a compreensão</Text>
                            <BouncyCheckbox
                                isChecked={checked(evids.enfraquece)}
                                onPress={(newValue: boolean) => handleInputChange('enfraquece', check(newValue))}
                                fillColor="#1f3324"
                            />
                        </View>
                    
                    <Text style={styles.texto}>Relevância:</Text>
                    <SelectList
                        dropdownShown={open1} dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, width: '100%'}} inputStyles={{color: '#fff'}} search={false} setSelected={(value: number) => handleInputChange('relevancia', value)} data={[{ key: 1, value: 1}, {key: 2, value: 2}, {key: 3, value: 3}, {key: 4, value: 4}, {key: 5, value: 5}]} defaultOption={{ key: (evids.relevancia || '').toString(), value: evids.relevancia || '' }}/>
                    <Text style={styles.texto}>Cobertura:</Text>
                    <SelectList dropdownShown={open2} dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, width: '100%'}} inputStyles={{color: '#fff'}} search={false} setSelected={(value: number) => handleInputChange('cobertura', value)} data={[{ key: 1, value: 1}, {key: 2, value: 2}, {key: 3, value: 3}, {key: 4, value: 4}, {key: 5, value: 5}]} defaultOption={{ key: (evids.cobertura || '').toString(), value: evids.cobertura || '' }}/>
                    <Text style={styles.texto}>Força:</Text>
                    <SelectList dropdownShown={open3} dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, width: '100%'}} inputStyles={{color: '#fff'}} search={false} setSelected={(value: number) => handleInputChange('forca', value)} data={[{ key: 1, value: 1}, {key: 2, value: 2}, {key: 3, value: 3}, {key: 4, value: 4}, {key: 5, value: 5}]} defaultOption={{ key: (evids.forca || '').toString(), value: evids.forca || '' }}/>
                    <Text style={styles.texto}>Grau do Perigo (GP):</Text>
                    <SelectList dropdownShown={open4} dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, width: '100%'}} inputStyles={{color: '#fff'}} search={false} setSelected={(value: number) => handleInputChange('importancia', value)} data={[{ key: '1 - insignificante', value: '1 - insignificante'}, {key: '2 - insignificante', value: '2 - insignificante'}, {key: '3 - insignificante', value: '3 - insignificante'}, {key: '4 - insignificante', value: '4 - insignificante'}, {key: '5 - marginal', value: '5 - marginal'}, {key: '6 - marginal', value: '6 - marginal'}, {key: '7 - crítico', value: '7 - crítico'}, {key: '8 - crítico', value: '8 - crítico'}, {key: '9 - catastrófico', value: '9 - catastrófico'}, {key: '10 - catastrófico', value: '10 - catastrófico'}]} defaultOption={{ key: (evids.importancia || '').toString(), value: evids.importancia || '' }}/>
                    <Text style={styles.texto}>Probabilidade de falhas:</Text>
                    <SelectList dropdownShown={open5} dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, width: '100%'}} inputStyles={{color: '#fff'}} search={false} setSelected={(value: number) => handleInputChange('falha', value)} data={[{ key: '1 - frequente', value: '1 - frequente'}, {key: '2 - provável', value: '2 - provável'}, {key: '3 - ocasional', value: '3 - ocasional'}, {key: '4 - remoto', value: '4 - remoto'}, {key: '5 - improvável', value: '5 - improvável'}, {key: '6 - sem mitigação', value: '6 - sem mitigação'}]} defaultOption={{ key: (evids.falha || '').toString(), value: evids.falha || '' }}/>
                    <Text style={styles.texto}>Selo:</Text>
                    <TextInput
                        style={styles.smallField}
                        value={evids.selo || selo}
                        onChangeText={(text) => handleInputChange('selo', text)}
                        editable={false}
                    />
                    <Text style={styles.texto}>Classificação da Evidencia:</Text>
                    <TextInput
                        style={styles.smallField}
                        value={evids.evidencia || evidencia}
                        onChangeText={(text) => handleInputChange('evidencia', text)}
                        editable={false}
                    />
                    <Text style={styles.texto}>Avaliador:</Text>
                    <TextInput
                        style={styles.smallField}
                        value={evids.avaliador}
                        editable={false}
                    />
                    <View style={{ marginBottom: 100 }}>
                        <Pressable onPress={handleUpdate}>
                            <View style={styles.botao}>
                                <Text style={styles.textoB}>Atualizar</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => props.navigation.goBack()}>
                            <View style={styles.botao}>
                                <Text style={styles.textoB}>Voltar</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => props.navigation.navigate("Main")}>
                            <View style={styles.botao}>
                                <Text style={styles.textoB}>Menu</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}