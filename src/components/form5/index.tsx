import React, { useState } from "react";
import { View, Text, Image, Pressable, SafeAreaView, ScrollView, TextInput, } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style";
import { Icon } from '@rneui/themed';
import { Header1 } from "../header";





export default function Form5({navigation}: any){

    const data = [
        { key: '1', value: '1' },
        { key: '2', value: '2' },
        { key: '3', value: '3' },
        { key: '4', value: '4' },
        { key: '5', value: '5' },
        { key: '6', value: '6' },
        { key: '7', value: '7' },
        { key: '8', value: '8' },
        { key: '9', value: '9' },
        { key: '10', value: '10' },
        ];
        
        const data2 = [
            { key: '1', value: 'Improvável' },
            { key: '2', value: 'Remoto' },
            { key: '3', value: 'Ocasional' },
            { key: '4', value: 'Provável' },
            { key: '5', value: 'Frequente' },
            { key: '6', value: 'Sem mitigação' }
        ];
    
    const [selected, setSelected] = React.useState("");
    
    return(
        <View style={styles.screen}>
            <Header1/>
                <View style={styles.sample}>
                    <Text style={styles.text}>Determinar grau de importância</Text>
                    <SelectList setSelected={(val: any) => setSelected(val)} data={data} save="key" dropdownStyles={{backgroundColor: '#202020', marginBottom: 10, height: 200}} maxHeight={200} dropdownTextStyles={{color: '#bbb'}} boxStyles={{backgroundColor: '#202020', borderColor: '#646464', borderWidth: 1, marginBottom: 20}} inputStyles={{color: '#bbb'}} search={false} placeholder="Selecione..."/>
                    <Text style={styles.text}>Probabilidade de falha</Text>
                    <SelectList setSelected={(val: any) => setSelected(val)} data={data2} save="key" dropdownStyles={{backgroundColor: '#202020', marginBottom: 10, height: 200}} dropdownTextStyles={{color: '#bbb'}} boxStyles={{backgroundColor: '#202020', borderColor: '#646464', borderWidth: 1}} inputStyles={{color: '#bbb'}} search={false} placeholder="Selecione..."/>
                </View>
                <View style={styles.buttons}>
                    <Pressable style={styles.back} onPress={() => navigation.navigate("Form4")}>
                        <Text style={styles.buttonTextBack}>Voltar</Text>
                    </Pressable>
                    <Pressable style={styles.next} onPress={() => navigation.navigate("Main")}>
                        <Text style={styles.buttonTextNext}>Confirmar</Text>
                    </Pressable>
                </View>
        </View>
    );
}