import React, { useState } from "react";
import { View, Text, Image, Pressable, SafeAreaView, ScrollView, TextInput, } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style";
import { Icon } from '@rneui/themed';
import { Header1 } from "../header";

const data = [
    { key: '1', value: 'Fortalece a compreensão' },
    { key: '2', value: 'Não altera a compreensão' },
    { key: '3', value: 'Enfraquece a compreensão' },
    ];

const data2 = [
    { key: '1', value: '1 (irrelevante)' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5 (relevante)' }
];

const data3 = [
    { key: '1', value: '1 (não cobre)' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5 (cobre)' }
];

const data4 = [
    { key: '1', value: '1 (fraco)' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5 (forte)' }
];


export default function Form4({navigation}: any){
    const [selected, setSelected] = React.useState("");
    return(
        <View style={styles.screen}>
            <Header1/>
            <View style={styles.sample}>
                <Text style={styles.text}>Síntese da análise</Text>
                <SelectList setSelected={(val: any) => setSelected(val)} save="key" data={data} dropdownStyles={{backgroundColor: '#202020', height: 100}} maxHeight={200} dropdownTextStyles={{color: '#bbb'}} boxStyles={{backgroundColor: '#202020', borderColor: '#646464', borderWidth: 1}} inputStyles={{color: '#bbb'}} search={false} placeholder="Selecione..."/>
            </View>
            <View style={styles.sample}>
                <Text style={styles.text}>Verificar relevância</Text>
                <SelectList setSelected={(val: any) => setSelected(val)} save="key" data={data2} dropdownStyles={{backgroundColor: '#202020', height: 100}} maxHeight={200} dropdownTextStyles={{color: '#bbb'}} boxStyles={{backgroundColor: '#202020', borderColor: '#646464', borderWidth: 1}} inputStyles={{color: '#bbb'}} search={false} placeholder="Selecione..."/>
            </View>
            <View style={styles.sample}>
                <Text style={styles.text}>Verificar cobertura</Text>
                <SelectList setSelected={(val: any) => setSelected(val)} save="key" data={data3} dropdownStyles={{backgroundColor: '#202020', height: 100}} maxHeight={200} dropdownTextStyles={{color: '#bbb'}} boxStyles={{backgroundColor: '#202020', borderColor: '#646464', borderWidth: 1}} inputStyles={{color: '#bbb'}} search={false} placeholder="Selecione..."/>
            </View>
            <View style={styles.sample}>
                <Text style={styles.text}>Verificar força</Text>
                <SelectList setSelected={(val: any) => setSelected(val)} save="key" data={data4} dropdownStyles={{backgroundColor: '#202020', height: 100}} maxHeight={200} dropdownTextStyles={{color: '#bbb'}} boxStyles={{backgroundColor: '#202020', borderColor: '#646464', borderWidth: 1}} inputStyles={{color: '#bbb'}} search={false} placeholder="Selecione..."/>
            </View>
            <View style={styles.buttons}>
                <Pressable style={styles.back} onPress={() => navigation.navigate("Form3")}>
                    <Text style={styles.buttonTextBack}>Voltar</Text>
                </Pressable>
                <Pressable style={styles.next} onPress={() => navigation.navigate("Form5")}>
                    <Text style={styles.buttonTextNext}>Avançar</Text>
                </Pressable>
            </View>
        </View>
    );
}