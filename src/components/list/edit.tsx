import { RouteProp } from "@react-navigation/native";
import { View, Text, SafeAreaView, ScrollView, Button, TextInput, Alert, ImageBackground } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SelectList } from 'react-native-dropdown-select-list';
import { params } from "../navigation";
import { HeaderData, HeaderEdit } from "../header";
import { collection, doc, getDoc, onSnapshot, query, where, updateDoc } from "firebase/firestore";
import { auth, firestore } from "@/src/config/firebase-config";
import { useEffect, useState } from "react";
import styles from "./style";
import { perigo, fail } from "../form5";

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
    const { nome } = props.route.params;

    function calculateSelo( importancia: string, falha: string){
    

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
    
    function calculateEvidencia(relevancia:number, cobertura:number, forca: number, selo: any){
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
        const fetchUserName = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const userDoc = await getDoc(doc(firestore, 'users', user.uid));
                    if (userDoc.exists()) {
                        setName(userDoc.data()?.name || 'No Name Found');
                    }
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                }
            }
            setLoading(false);
        };

        useEffect(() => {
            const newImportancia = perigo(evids.importancia || 0);
            const newFalha = fail(evids.falha || 0);
            const newSelo = calculateSelo(evids.importancia, evids.falha);
            const newEvidencia = calculateEvidencia(evids.relevancia || 0, evids.cobertura || 0, evids.forca || 0, newSelo);
    
            setEvids((prev: any) => ({
                ...prev,
                selo: newSelo,
                evidencia: newEvidencia,
            }));
        }, [evids.importancia, evids.falha, evids.relevancia, evids.cobertura, evids.forca]);

        fetchUserName();
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
                Alert.alert('Success', 'Data updated successfully!', [
                    { text: 'OK', onPress: () => props.navigation.navigate("Main") }
                ]);
            } catch (error) {
                console.error("Error updating document: ", error);
                Alert.alert('Error', 'There was an error updating the data.');
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

    if (evids.relevancia > 3 && evids.cobertura > 3 && evids.forca > 3){
        rcf = 8
    }
    else if (evids.relevancia > 3 && evids.cobertura > 3 && evids.forca < 3){
        rcf = 7
    }
    else if (evids.relevancia > 3 && evids.cobertura < 3 && evids.forca > 3){
        rcf = 6
    }
    else if (evids.relevancia > 3 && evids.cobertura < 3 && evids.forca < 3){
        rcf = 5
    }
    else if (evids.relevancia < 3 && evids.cobertura > 3 && evids.forca > 3){
        rcf = 4
    }
    else if (evids.relevancia < 3 && evids.cobertura > 3 && evids.forca < 3){
        rcf = 3
    }
    else if (evids.relevancia < 3 && evids.cobertura < 3 && evids.forca > 3){
        rcf = 2
    }
    else if (evids.relevancia < 3 && evids.cobertura < 3 && evids.forca < 3){
        rcf = 1
    }

    switch (evids.importancia) {
        case '1 - insignificante':
        case '2 - insignificante':
        case '3 - insignificante':
        case '4 - insignificante':
            switch (evids.falha) {
                case '1 - frequente':
                case '2 - provável':
                case '3 - ocasional':
                case '4 - remoto':
                    selo = 'bronze'
                    if (rcf == 1 || rcf == 3)
                            evidencia = 'Fraca';
                        else
                            evidencia = 'Mediana';
                    break;
                case '5 - improvável':
                case '6 - sem mitigação':
                    selo = 'Cobre'
                    evidencia = 'Fraca'
                    break;
            }
            break;
        case '5 - marginal':
        case '6  - marginal':
            switch (evids.falha){
                case '6 - sem mitigação':
                    selo = 'Cobre'
                    evidencia = 'Fraca'
                    break;
                case '5 - improvável':
                case '4 - remoto':
                    selo = 'Bronze'
                    if(rcf == 1 || rcf == 3)
                            evidencia = 'Fraca'
                        else
                            evidencia = 'Mediana'
                    
                    break;
                case '3 - ocasional':
                case '2 - provável':
                case '1 - frequente':
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
        case '7 - crítico':
        case '8 - crítico':
            switch (evids.falha){
                case '6 - sem mitigação':
                case '5 - improvável':
                    selo = 'Bronze'
                    if (rcf == 1 || rcf == 3) 
                            evidencia = 'Fraca'
                    else
                            evidencia = 'Mediana'
                            
                    
                    break;
                case '4 - remoto':
                case '3 - ocasional':
                    selo = 'Prata'
                    if (rcf == 1 || rcf == 3)
                            evidencia = 'Fraca'
                    else if (rcf == 2 || rcf == 4 || rcf == 5)
                            evidencia = 'Mediana'
                        else
                            evidencia = 'Importante'
                    
                    break;
                case '2 - provável': 
                case '1 - frequente':
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
        case '9 - catastrófico':
        case '10 - catastrófico':
            switch (evids.falha){
                case '6 - sem mitigação':
                    selo = 'Bronze'
                    if (rcf == 1 || rcf == 3) 
                            evidencia = 'Fraca'
                    else
                            evidencia = 'Mediana'                    
                    break;
                case '5 - improvável':
                case '4 - remoto':
                    selo = 'Prata'
                    if (rcf == 1 || rcf == 3) 
                            evidencia = 'Fraca'
                    else if (rcf == 2 || rcf == 4 || rcf == 5)
                            evidencia = 'Mediana'
                    else
                            evidencia = 'Importante'
                            
                    
                    break;
                case '3 - ocasional':
                case '2 - provável': 
                case '1 - frequente':
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
    

    return (
        <ImageBackground style={{flex: 1}} source={require("../../../assets/images/background.png")}>
        <SafeAreaView style={styles.formPoint}>
            <HeaderEdit />
            <ScrollView style={styles.formPoint}>
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
                    <Text style={styles.texto}>Fonte:</Text>
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
                    <Text style={styles.texto}>Relações na literatura atual:</Text>
                    <TextInput
                        style={styles.smallField}
                        value={evids.relacoes || ''}
                        onChangeText={(text) => handleInputChange('relacoes', text)}
                    />
                    <Text style={styles.texto}>Revisão por pares:</Text>
                    <BouncyCheckbox
                        isChecked={evids.revisao || false}
                        onPress={(newValue: boolean) => handleInputChange('revisao', newValue)}
                        fillColor="#1f3324"
                    />
                    <Text style={styles.texto}>Consistência com a literatura anterior:</Text>
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
                    <Text style={styles.texto}>Implementação:</Text>
                    <TextInput
                        multiline={true}
                        style={styles.bigField}
                        value={evids.implementacao || ''}
                        onChangeText={(text) => handleInputChange('implementacao', text)}
                    />
                    <Text style={styles.texto}>Usos conhecidos:</Text>
                    <TextInput
                        multiline={true}
                        style={styles.bigField}
                        value={evids.usos || ''}
                        onChangeText={(text) => handleInputChange('usos', text)}
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
                                isChecked={evids.fortalece || false}
                                onPress={(newValue: boolean) => handleInputChange('fortalece', newValue)}
                                fillColor="#1f3324"
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textocheck}>Não altera a compreensão</Text>
                            <BouncyCheckbox
                                isChecked={evids.naoAltera || false}
                                onPress={(newValue: boolean) => handleInputChange('naoAltera', newValue)}
                                fillColor="#1f3324"
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textocheck}>Enfraquece a compreensão</Text>
                            <BouncyCheckbox
                                isChecked={evids.enfraquece || false}
                                onPress={(newValue: boolean) => handleInputChange('enfraquece', newValue)}
                                fillColor="#1f3324"
                            />
                        </View>
                    
                    <Text style={styles.texto}>Relevância:</Text>
                    <SelectList
                        dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, width: '100%'}} inputStyles={{color: '#fff'}} search={false} setSelected={(value: number) => handleInputChange('relevancia', value)} data={[{ key: 1, value: 1}, {key: 2, value: 2}, {key: 3, value: 3}, {key: 4, value: 4}, {key: 5, value: 5}]} defaultOption={{ key: (evids.relevancia || '').toString(), value: evids.relevancia || '' }}/>
                    <Text style={styles.texto}>Cobertura:</Text>
                    <SelectList dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, width: '100%'}} inputStyles={{color: '#fff'}} search={false} setSelected={(value: number) => handleInputChange('cobertura', value)} data={[{ key: 1, value: 1}, {key: 2, value: 2}, {key: 3, value: 3}, {key: 4, value: 4}, {key: 5, value: 5}]} defaultOption={{ key: (evids.cobertura || '').toString(), value: evids.cobertura || '' }}/>
                    <Text style={styles.texto}>Força:</Text>
                    <SelectList dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, width: '100%'}} inputStyles={{color: '#fff'}} search={false} setSelected={(value: number) => handleInputChange('forca', value)} data={[{ key: 1, value: 1}, {key: 2, value: 2}, {key: 3, value: 3}, {key: 4, value: 4}, {key: 5, value: 5}]} defaultOption={{ key: (evids.forca || '').toString(), value: evids.forca || '' }}/>
                    <Text style={styles.texto}>Grau de importância:</Text>
                    <SelectList dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, width: '100%'}} inputStyles={{color: '#fff'}} search={false} setSelected={(value: number) => handleInputChange('importancia', value)} data={[{ key: 1, value: 1}, {key: 2, value: 2}, {key: 3, value: 3}, {key: 4, value: 4}, {key: 5, value: 5}, {key: 6, value: 6}, {key: 7, value: 7}, {key: 8, value: 8}, {key: 9, value: 9}, {key: 10, value: 10}]} defaultOption={{ key: (evids.importancia || '').toString(), value: evids.importancia || '' }}/>
                    <Text style={styles.texto}>Probabilidade de falha:</Text>
                    <SelectList dropdownStyles={{backgroundColor: '#1f3324', height: 100, width: '100%'}} maxHeight={200} dropdownTextStyles={{color: '#fff'}} boxStyles={{backgroundColor: '#1f3324', borderColor: '#646464', borderWidth: 1, width: '100%'}} inputStyles={{color: '#fff'}} search={false} setSelected={(value: number) => handleInputChange('falha', value)} data={[{ key: 1, value: 1}, {key: 2, value: 2}, {key: 3, value: 3}, {key: 4, value: 4}, {key: 5, value: 5}, {key: 6, value: 6}]} defaultOption={{ key: (evids.falha || '').toString(), value: evids.falha || '' }}/>
                    <Text style={styles.texto}>Selo:</Text>
                    <TextInput
                        style={styles.smallField}
                        value={evids.selo || selo}
                        onChangeText={(text) => handleInputChange('selo', text)}
                        editable={false}
                    />
                    <Text style={styles.texto}>Evidencia:</Text>
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
                        <Button title="Atualizar" color={'#1f3324'} onPress={handleUpdate} />
                        <Button title="Voltar" color={'#1f3324'} onPress={() => props.navigation.navigate("Main")} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}